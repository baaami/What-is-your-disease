import Post from '../../models/post';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

/**
 * GET /api/posts?nick=&category=
 *
 * @brief     존재하는 query에 한해서 원하는 포스트 리스트를 전달
 * @param {*} ctx
 */
export const list = async (ctx) => {
  const { category, nick } = ctx.query;
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

/**
 * 포스트 작성
 * POST /api/posts/write
 * {
 *    title: '제목',
 *    body:  '내용',
 *    tags: ['태그1', '태그2']
 * }
 */
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required가 있으면 필수항목
    body: Joi.string().required(),
    category: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }
  // REST API의 Reuqest Body는 ctx.request.body에서 조회 가능
  const { title, body, category } = ctx.request.body;
  const post = new Post({
    title,
    body,
    category,
    views: 0,
    // user: {
    //   _id: ctx.req.user._id,
    //   nick: ctx.req.user.nick,
    // },
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
