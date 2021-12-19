import Post from '../../models/post';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import Joi from 'joi';

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

/**
 * 특정 포스트 조회
 * GET /api/post/:id
 */
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const PostOne = await Post.findById(id).exec();
    ctx.body = PostOne;
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
  const { id } = ctx.params;
  // write 에서 사용한 schema 와 비슷한데, required() 가 없습니다.
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    category: Joi.string(),
  });

  // 검증 후, 검증 실패시 에러처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const nextData = { ...ctx.request.body }; // 객체를 복사하고
  // body 값이 주어졌으면 HTML 필터링
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
    }).exec();
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
  const { id } = ctx.params;
  try {
    console.log('id : ', id);
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};
