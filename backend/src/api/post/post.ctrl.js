import Post from '../../models/post';
import User from '../../models/user';
import Comment from '../../models/comment';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'em',
    'strong',
    'blockquote',
    'a',
    'video',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

/**
 * @brief Id를 통하여 Post 검증 후 존재 시 ctx.state.post로 전달
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
export const checkPostById = async (ctx, next) => {
  const { postId } = ctx.params;
  if (!ObjectId.isValid(postId)) {
    ctx.status = 400;
    return;
  }

  try {
    const post = await Post.findById(postId);

    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404;
    }
    ctx.state.post = post.toJSON();
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// User가 Post의 Owner인지 확인
export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id.toString()) {
    ctx.status = 403;
    return;
  }
  return next();
};

/**
 * 특정 포스트 조회
 * GET /api/post/read/:postId?cpage=
 */
export const read = async (ctx) => {
  const post = ctx.state.post;

  const commentsNum = 10;
  let commentCount;
  const cpage = parseInt(ctx.query.cpage || '1', 10);
  if (cpage < 1) {
    ctx.status = 400;
    return;
  }

  // 1. 조회 수 증가
  try {
    // 조회 수 증가
    const result = await Post.findOneAndUpdate(
      { _id: post._id },
      { $inc: { views: 1 } },
      { new: true },
    );

    // comment 개수 획득
    commentCount = result.comments.length;

    if (!result) {
      console.log('findOneAndUpdate Error');
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  // 2. cpage에 맞춘 comments획득, comments 전체 길이 획득
  try {
    const _ = await Post.findOne(
      { _id: post._id },
      { comments: { $slice: [(cpage - 1) * commentsNum, commentsNum] } },
      { new: true },
    );
  } catch (e) {
    ctx.throw(500, e);
  }

  // Responese
  const responseData = {
    commentTotalCnt: commentCount,
    data: {
      post,
      // comments: post.comments,
    },
  };

  ctx.body = responseData;
};

/**
 * 포스트 작성
 * POST /api/post/write
 * {
 *    title: '제목',
 *    body:  '내용',
 *    category: '카테고리',
 *    tags: ['태그1', '태그2', ...],
 * }
 */
export const write = async (ctx) => {
  // REST API의 Reuqest Body는 ctx.request.body에서 조회 가능
  const { title, body, category, tags } = ctx.request.body;
  // TODO : body 검증하도록 변경하기

  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOption),
    category,
    views: 1,
    likes: 0,
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 포스트 수정 (특정 필드 변경)
 * PATCH /api/posts/:postId
 * {
 *    title: '수정'
 *    body:  '수정 내용'
 *    category: '수정 카테고리'
 * }
 */
export const update = async (ctx) => {
  const { postId } = ctx.params;

  const nextData = { ...ctx.request.body }; // 객체를 복사하고

  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }
  try {
    const post = await Post.findByIdAndUpdate(postId, nextData, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
    }).exec();
    console.log(post);
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 특정 포스트 제거
 * DELETE /api/post/:postId
 */
export const remove = async (ctx) => {
  /**
   * 데이터 삭제 함수
   *
   * remove : 특정 조건을 만족하는 데이터를 모두 지운다.
   * findByIdAndRemove : id를 찾아서 지운다.
   * findOneAndRemove : 특정 조건을 만족하는 데이터 하나를 찾아서 제거한다.
   */
  const { postId } = ctx.params;
  try {
    await Post.findByIdAndRemove(postId).exec();
    ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 포스트 좋아요
 * POST /api/post/:postId/like
 */
export const like = async (ctx) => {
  const { postId } = ctx.params;
  const user = ctx.state.user;
  let ExistUser;

  // 해당 post에 좋아요를 눌렀던 사람인지 확인
  try {
    [ExistUser] = await Post.find({
      _id: postId,
      likeMe: { $all: [user._id] },
    });
  } catch (e) {
    ctx.throw(500, e);
  }

  // 좋아요를 누르지 않았던 User일 경우
  if (!ExistUser) {
    // 1. 좋아요 증가, User 저장
    try {
      const result = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { likeMe: user._id }, $inc: { likes: 1 } },
        { new: true },
      );

      if (!result) {
        console.log('findOneAndUpdate Error');
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  } else {
    // 1. 좋아요 감소, User pull
    try {
      const result = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { likeMe: user._id }, $inc: { likes: -1 } },
        { new: true },
      );

      console.log('[TEST] result:', result);
      if (!result) {
        console.log('findOneAndUpdate Error');
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  }

  ctx.status = 204;
};

/**
 * 서버 경로에 이미지 업로드
 * @param {*} ctx
 * @param {*} next
 */
export const upLoadImage = async (ctx, next) => {
  try {
    const files = ctx.request.files.map((item) => {
      return `/src/api/post/uploads/${item.filename}`;
    });

    ctx.body = files;
  } catch (e) {
    console.log(e);
  }
};
