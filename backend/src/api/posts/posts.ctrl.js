import Post from "../../models/post";
import mongoose from "mongoose";
import sanitizeHtml from "sanitize-html";
import User from "../../models/user";

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    "h1",
    "h2",
    "b",
    "i",
    "u",
    "s",
    "p",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src"],
    li: ["class"],
  },
  allowedSchemes: ["data", "http"],
};

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered;
};

const getOldestPosts = async (ctx, query) => {
  let posts;
  try {
    posts = await Post.find(query)
      .sort({ publishedDate: 1 })
      .limit(10)
      .lean()
      .exec();
  } catch (err) {
    ctx.throw(500, e);
  }

  return posts;
};

const getLatestPosts = async (ctx, query) => {
  let posts;
  try {
    posts = await Post.find(query)
      .sort({ publishedDate: -1 })
      .limit(10)
      .lean()
      .exec();
  } catch (err) {
    ctx.throw(500, err);
  }

  return posts;
};

const getHotPosts = async (ctx, query) => {
  let posts;
  try {
    posts = await Post.find(query).sort({ views: -1 }).limit(10).lean().exec();
  } catch (err) {
    ctx.throw(500, e);
  }
  return posts;
};

/**
 * GET /api/posts/latest?tag=
 *
 * @brief     최신 포스트 리스트를 전달
 * @param {*} ctx
 */
export const latest = async (ctx) => {
  let posts;

  const query = ctx.state.query;

  try {
    posts = await getLatestPosts(ctx, query);
  } catch (err) {
    ctx.throw(500, err);
  }

  // response
  ctx.body = posts.map((post) => ({
    ...post,
    body: removeHtmlAndShorten(post.body),
  }));
};

/**
 * GET /api/posts/hot
 *
 * @brief     인기 포스트 리스트를 전달
 * @param {*} ctx
 */
export const hot = async (ctx) => {
  let posts;
  const query = ctx.state.query;

  try {
    posts = await getHotPosts(ctx, query);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = posts.map((post) => ({
    ...post,
    body: removeHtmlAndShorten(post.body),
  }));
};

/**
 * GET /api/posts/user?page=
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const user = async (ctx) => {
  const { id } = ctx.params;

  let user;
  try {
    user = await User.findById(id);
  } catch (e) {
    ctx.throw(500, e);
  }

  const query = {
    ...(user._id ? { "user._id": user._id } : {}),
  };

  try {
    const posts = await getLatestPosts(ctx, query);

    ctx.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * GET /api/posts?category=
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const category = async (ctx) => {
  const { category } = ctx.query;
  if (!category) {
    ctx.status = 400;
    return;
  }

  // category 값이 존재할 경우 category 필드에서 확인 후 획득
  const query = {
    ...(category ? { category: category } : {}),
  };

  try {
    /**
     * 2022-01-26 add 박지후
     */
    const posts = await Post.find(query)
      .sort({ publishedDate: -1 })
      .limit(10)
      .lean()
      .exec();

    ctx.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * GET /api/posts/filter
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const filter = async (ctx) => {
  const { orderBy } = ctx.params;
  let posts;
  switch (orderBy) {
    case "최신순": {
      try {
        const query = {};
        posts = await getLatestPosts(ctx, query);
      } catch (err) {
        ctx.throw(500, err);
      }
      break;
    }
    case "오래된순": {
      try {
        const query = {};
        posts = await getOldestPosts(ctx, query);
      } catch (err) {
        ctx.throw(500, err);
      }
      break;
    }
    case "인기순": {
      // 인기순
      try {
        const query = {};
        posts = await getHotPosts(ctx, query);
      } catch (err) {
        ctx.throw(500, err);
      }
      break;
    }
  }
  console.log(posts);
  ctx.body = posts.map((post) => ({
    ...post,
    body: removeHtmlAndShorten(post.body),
  }));
};
