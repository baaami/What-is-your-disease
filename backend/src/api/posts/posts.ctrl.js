import Post from '../../models/post';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import User from '../../models/user';

const { ObjectId } = mongoose.Types;

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

/**
 * GET /api/posts/latest
 *
 * @brief     최신 포스트 리스트를 전달
 * @param {*} ctx
 */
export const latest = async (ctx) => {
  try {
    const posts = await Post.find({})
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
 * GET /api/posts/hot
 *
 * @brief     인기 포스트 리스트를 전달
 * @param {*} ctx
 */
export const hot = async (ctx) => {
  try {
    const posts = await Post.find({})
      .sort({ views: -1 })
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
 * GET /api/posts/user
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
    ...(user._id ? { 'user._id': user._id } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .lean()
      .exec();

    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * GET /api/posts?category=value1
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

  const query = {
    ...(category ? { category: category } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .lean()
      .exec();

    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * GET /api/posts/filter/:id
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const filter = async (ctx) => {};
