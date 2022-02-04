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

const getOldestPosts = async (ctx, query, page) => {
  let posts;
  try {
    posts = await Post.find(query)
      .sort({ publishedDate: 1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
  } catch (err) {
    ctx.throw(500, e);
  }

  return posts;
};

const getLatestPosts = async (ctx, query, page) => {
  let posts;
  try {
    posts = await Post.find(query)
      .sort({ publishedDate: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
  } catch (e) {
    ctx.throw(500, e);
  }

  return posts;
};

const getHotPosts = async (ctx, query, page) => {
  let posts;
  try {
    posts = await Post.find(query)
      .sort({ views: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
  } catch (err) {
    ctx.throw(500, e);
  }
  return posts;
};

/**
 * GET /api/posts/latest?tag=&page=
 *
 * @brief     최신 포스트 리스트를 전달
 * @param {*} ctx
 */
export const latest = async (ctx) => {
  let posts;

  // 1. page query 처리
  // query 는 문자열이기 때문에 숫자로 변환해주어야합니다.
  // 값이 주어지지 않았다면 1 을 기본으로 사용합니다.
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  // 2. tag query 처리
  const { tag } = ctx.query;

  // 2. Tag query 생성
  const query = {
    ...(tag ? { tags: tag } : {}),
  };

  try {
    posts = await getLatestPosts(ctx, query, page);
  } catch (err) {
    ctx.throw(500, err);
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
 * GET /api/posts/hot?tag=&page=
 *
 * @brief     인기 포스트 리스트를 전달
 * @param {*} ctx
 */
export const hot = async (ctx) => {
  let posts;

  // 1. page query 처리
  // query 는 문자열이기 때문에 숫자로 변환해주어야합니다.
  // 값이 주어지지 않았다면 1 을 기본으로 사용합니다.
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  // 2. tag query 처리
  const { tag } = ctx.query;

  // 2. Tag query 생성
  const query = {
    ...(tag ? { tags: tag } : {}),
  };

  try {
    posts = await getHotPosts(ctx, query, page);
  } catch (err) {
    ctx.throw(500, err);
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
 * GET /api/posts/user/:userId?page=
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const user = async (ctx) => {
  const { userId } = ctx.params;
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  let user, posts;
  try {
    user = await User.findById(userId);
  } catch (e) {
    ctx.throw(500, e);
  }

  const query = {
    ...(user._id ? { 'user._id': user._id } : {}),
  };

  try {
    posts = await getLatestPosts(ctx, query, page);
  } catch (e) {
    ctx.throw(500, e);
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
 * GET /api/posts?category=&page=
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const category = async (ctx) => {
  let posts;
  const { category } = ctx.query;
  if (!category) {
    ctx.status = 400;
    return;
  }

  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  // category 값이 존재할 경우 category 필드에서 확인 후 획득
  const query = {
    ...(category ? { category: category } : {}),
  };

  try {
    posts = await Post.find(query)
      .sort({ publishedDate: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
  } catch (e) {
    ctx.throw(500, e);
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
 * GET /api/posts/filter/:orderBy?page=
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const filter = async (ctx) => {
  const { orderBy } = ctx.params;

  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    x44;
    ctx.status = 400;
    return;
  }

  let posts, query;
  switch (orderBy) {
    case '최신순': {
      try {
        query = {};
        posts = await getLatestPosts(ctx, query, page);
      } catch (err) {
        ctx.throw(500, err);
      }
      break;
    }
    case '오래된순': {
      try {
        query = {};
        posts = await getOldestPosts(ctx, query, page);
      } catch (err) {
        ctx.throw(500, err);
      }
      break;
    }
    case '인기순': {
      // 인기순
      try {
        query = {};
        posts = await getHotPosts(ctx, query, page);
      } catch (err) {
        ctx.throw(500, err);
      }
      break;
    }
    default: {
      query = {};
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
