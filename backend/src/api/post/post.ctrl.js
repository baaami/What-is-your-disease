import Post from '../../models/post';
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
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

// post id 검증
export const checkPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    const post = await Post.findById(id);

    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404;
    }
    ctx.state.post = post;
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
 * GET /api/post/:id
 */
export const read = async (ctx) => {
  const post = ctx.state.post;

  try {
    // 조회 수 증가
    const result = await Post.findOneAndUpdate(
      { _id: post._id },
      { $inc: { views: 1 } },
      { new: true },
    );

    if (!result) {
      console.log('findOneAndUpdate Error');
    }
  } catch (e) {
    ctx.throw(500, e);
  }
  ctx.body = post;
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
    comments: [],
    tags,
    user: ctx.state.user,
  });
  try {
    // async/await 문법으로 데이터베이스 저장 요청을 완료할 때 까지 대기
    // await를 사용하는 방법 다시 정리
    // 1. await를 사용하려는 함수 앞에 async키워드를 넣어야함
    // 2. await 는 try~catch 문을 사용해야함
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 포스트 수정 (특정 필드 변경)
 * PATCH /api/posts/:id
 * {
 *    title: '수정'
 *    body:  '수정 내용'
 *    category: '수정 카테고리'
 * }
 */
export const update = async (ctx) => {
  const id = ctx.state.post._id;

  const nextData = { ...ctx.request.body }; // 객체를 복사하고

  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }
  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
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
 * DELETE /api/post/:id
 */
export const remove = async (ctx) => {
  /**
   * 데이터 삭제 함수
   *
   * remove : 특정 조건을 만족하는 데이터를 모두 지운다.
   * findByIdAndRemove : id를 찾아서 지운다.
   * findOneAndRemove : 특정 조건을 만족하는 데이터 하나를 찾아서 제거한다.
   */
  const id = ctx.state.post._id;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 댓글 등록
 * PATCH /api/post/:id/comments/
 */
export const cmUpload = async (ctx) => {};

/**
 * 댓글 삭제
 * DELETE /api/post/:id/comments/:commentId
 */
export const cmDelete = async (ctx) => {};

/**
 * 답글 등록
 * PATCH /api/post/:id/comments/:commentId/replies
 */
export const rpUpload = async (ctx) => {};

/**
 * 답글 삭제
 * DELETE /api/post/:id/comments/:commentId/replies/:replyId
 */
export const rpDelete = async (ctx) => {};
