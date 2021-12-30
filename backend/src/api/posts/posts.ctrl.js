import Post from '../../models/post';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import User from '../../models/user';
import Joi from 'joi';

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
    const posts = await Post.find(query)
      .sort({ _id: -1 })
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
 * GET /api/posts/latest
 *
 * @brief     인기 포스트 리스트를 전달
 * @param {*} ctx
 */
export const hot = async (ctx) => {
  // tag, nick 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
  const query = {
    ...(nick ? { 'user.nick': nick } : {}),
    ...(category ? { category: category } : {}),
  };

  try {
    // TODO : views가 큰 순서대로 sort <- 시간 or 하루 동안의 인기게시물
    const posts = await Post.find(query)
      .sort({ _id: -1 })
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
 * GET /api/posts/latest
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const user = async (ctx) => {
  // tag, nick 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
  const { token } = ctx.request.body;
  let decoded_id, ExistUser;

  try {
    // verify를 통해 값 decode
    decoded_id = await jwt.verify(token, secretKey);

    try {
      // decoded_id를 DB에서 조회하여 사용자 find
      ExistUser = await User.findById(decoded_id.id);
    } catch (err) {
      console.log('Get User Error');
      console.log(err);
    }
  } catch (err) {
    console.log('jwt verify error');
    console.log(err);
  }

  const query = {
    ...(ExistUser.id ? { 'user.id': ExistUser.id } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
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
 * GET /api/posts/latest
 *
 * @brief     로그인 회원 포스트 리스트를 전달
 * @param {*} ctx
 */
export const filter = async (ctx) => {
  // tag, nick 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
  const query = {
    ...(nick ? { 'user.nick': nick } : {}),
    ...(category ? { category: category } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
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
