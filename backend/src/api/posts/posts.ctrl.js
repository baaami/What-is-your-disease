import Post from '../../models/post';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import User from '../../models/user';

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

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered;
};

export const getOldestPosts = async (ctx, query, page, postNum) => {
  let posts;
  try {
    posts = await Post.find(query)
      .sort({ publishedDate: 1 })
      .limit(postNum)
      .skip((page - 1) * postNum)
      .lean()
      .exec();
  } catch (err) {
    ctx.throw(500, e);
  }

  return posts;
};

export const getLatestPosts = async (ctx, query, page, postNum) => {
  let posts;
  try {
    posts = await Post.find(query)
      .sort({ publishedDate: -1 })
      .limit(postNum)
      .skip((page - 1) * postNum)
      .lean()
      .exec();
  } catch (e) {
    ctx.throw(500, e);
  }

  return posts;
};

export const getHotPosts = async (ctx, query, page, postNum) => {
  let posts;
  try {
    posts = await Post.find(query)
      .sort({ views: -1 })
      .limit(postNum)
      .skip((page - 1) * postNum)
      .lean()
      .exec();
  } catch (err) {
    ctx.throw(500, e);
  }
  return posts;
};

/**
 * GET /api/posts/filter/:orderBy?diseasePeriod=&tag=&page=&postNum=
 *
 * @brief     필터링된 포스트 리스트를 전달
 * @param {*} ctx
 */
export const filter = async (ctx) => {
  const { orderBy } = ctx.params;

  // filter를 직접 불렀을 경우 사용
  const { diseasePeriod } = ctx.query;
  const page = parseInt(ctx.query.page || '1', 10);
  const postNum = parseInt(ctx.query.postNum || '10', 10);

  const { tag } = ctx.query;

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  let posts;

  const query = {
    ...(ctx.state.query ? ctx.state.query : {}),
    ...(tag ? { tags: tag } : {}),
    ...(diseasePeriod ? { diseasePeriod: diseasePeriod } : {}),
  };

  switch (orderBy) {
    case 'latest': {
      try {
        posts = await getLatestPosts(ctx, query, page, postNum);
      } catch (err) {
        ctx.throw(500, err);
      }
      break;
    }
    case 'oldest': {
      try {
        posts = await getOldestPosts(ctx, query, page, postNum);
      } catch (err) {
        ctx.throw(500, err);
      }
      break;
    }
    case 'hotest': {
      // 인기순
      try {
        posts = await getHotPosts(ctx, query, page, postNum);
      } catch (err) {
        ctx.throw(500, err);
      }
      break;
    }
    default: {
      try {
        posts = await getLatestPosts(ctx, query, page, postNum);
      } catch (err) {
        ctx.throw(500, err);
      }
    }
  }

  const postCount = await Post.countDocuments(query).exec();
  const responseData = {
    postTotalCnt: postCount,
    data: {
      post: posts.map((post) => ({
        ...post,
        body: removeHtmlAndShorten(post.body),
      })),
    },
  };

  ctx.body = responseData;
};

/**
 * GET /api/posts/user/:userId?diseasePeriod=&page=&postNum=
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const user = async (ctx) => {
  const { userId } = ctx.params;
  const { diseasePeriod } = ctx.query;

  let user, posts;
  try {
    user = await User.findById(userId);
  } catch (e) {
    ctx.throw(500, e);
  }

  const query = {
    ...(user._id ? { 'user._id': user._id } : {}),
    ...(diseasePeriod ? { diseasePeriod: diseasePeriod } : {}),
  };

  ctx.state.query = query;
  next();
};

/**
 * GET /api/posts?category=&diseasePeriod=&page=&postNum=
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const category = async (ctx) => {
  const { diseasePeriod, category } = ctx.query;

  if (!category) {
    ctx.status = 400;
    return;
  }

  // category 값이 존재할 경우 category 필드에서 확인 후 획득
  const query = {
    ...(category ? { category: category } : {}),
    ...(diseasePeriod ? { diseasePeriod: diseasePeriod } : {}),
  };

  ctx.state.query = query;
  next();
};

/**
 * GET /api/posts/user/:userId?diseasePeriod=&page=&postNum=
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const follow = async (ctx) => {
  const { diseasePeriod } = ctx.query;
  const followIds = [...ctx.state.user.followingIds];

  const query = {
    'user._id': { $in: followIds },
    ...(diseasePeriod ? { diseasePeriod: diseasePeriod } : {}),
  };

  ctx.state.query = query;
  next();
};
