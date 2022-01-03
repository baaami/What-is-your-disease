const Router = require('koa-router');
import * as postCtrl from './post.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const post = new Router();

/**
 * 특정 포스트 조회
 * GET /api/post/:id
 */
post.get('/:id', postCtrl.getPostById, postCtrl.read);

/**
 * 포스트 작성
 * POST /api/post/write
 */
post.post('/write', checkLoggedIn, postCtrl.write);

/**
 * 포스트 수정 (특정 필드 변경)
 */
post.patch(
  '/:id',
  postCtrl.getPostById,
  checkLoggedIn,
  postCtrl.checkOwnPost,
  postCtrl.update,
);

/**
 * 특정 포스트 제거
 * DELETE /api/post/:id
 */
post.delete(
  '/:id',
  postCtrl.getPostById,
  checkLoggedIn,
  postCtrl.checkOwnPost,
  postCtrl.remove,
);

export default post;
