import Post from '../../models/post';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import User from '../../models/user';

const { ObjectId } = mongoose.Types;
const PageNum = 10;

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

/**
 * GET /api/posts/latest?page=
 *
 * @brief     최신 포스트 리스트를 전달
 * @param {*} ctx
 */
export const latest = async (ctx) => {
  try {
    const posts = await Post.find({})
      .sort({ publishedDate: -1 })
      .limit(10)
      .skip((ctx.page - 1) * PageNum)
      .lean()
      .exec();

    // query를 따로 js 파일에 정리하고 다음 코드를 getPageNum 미들웨어에 추가하도록 하기
    const postCount = await Post.find(query).countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));

    ctx.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * GET /api/posts/hot?page=
 *
 * @brief     인기 포스트 리스트를 전달
 * @param {*} ctx
 */
export const hot = async (ctx) => {
  try {
    const posts = await Post.find({})
      .sort({ views: -1 })
      .limit(PageNum)
      .skip((ctx.page - 1) * PageNum)
      .lean()
      .exec();

    // query를 따로 js 파일에 정리하고 다음 코드를 getPageNum 미들웨어에 추가하도록 하기
    const postCount = await Post.find(query).countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));

    ctx.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
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
    ...(user._id ? { 'user._id': user._id } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(PageNum)
      .skip((ctx.page - 1) * PageNum)
      .lean()
      .exec();

    // query를 따로 js 파일에 정리하고 다음 코드를 getPageNum 미들웨어에 추가하도록 하기
    const postCount = await Post.find(query).countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));

    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * GET /api/posts?page=&category=
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
      .limit(PageNum)
      .skip((ctx.page - 1) * PageNum)
      .lean()
      .exec();

    // query를 따로 js 파일에 정리하고 다음 코드를 getPageNum 미들웨어에 추가하도록 하기
    const postCount = await Post.find(query).countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));

    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * GET /api/posts/filter?page=&id=
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const filter = async (ctx) => {};
