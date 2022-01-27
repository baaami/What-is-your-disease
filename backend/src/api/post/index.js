const Router = require('koa-router');
import * as postCtrl from './post.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import comment from './comment';

const post = new Router();

post.use('/comment', comment.routes());

/**
 * 특정 포스트 조회
 * GET /api/post/:id
 */
post.get('/:id', postCtrl.checkPostById, postCtrl.read);

/**
 * 포스트 작성
 * POST /api/post/write
 */
post.post('/write', checkLoggedIn, postCtrl.write);

/**
 * 포스트 수정 (특정 필드 변경)
 */
post.patch(
  '/edit/:id',
  postCtrl.checkPostById,
  checkLoggedIn,
  postCtrl.checkOwnPost,
  postCtrl.update,
);

/**
 * 특정 포스트 제거
 * DELETE /api/post/:id
 */
post.delete(
  '/delete/:id',
  postCtrl.checkPostById,
  checkLoggedIn,
  postCtrl.checkOwnPost,
  postCtrl.remove,
);

// TODO : 리팩토링 필요 라우팅 만들기 post -> comment -> reply
// comment

/**
 * 댓글 등록
 */
post.patch(
  '/:id/comments',
  postCtrl.checkPostById,
  checkLoggedIn,
  postCtrl.update,
);

/**
 * 댓글 삭제
 */
post.delete(
  '/:id/comments/:commentId',
  postCtrl.checkPostById,
  checkLoggedIn,
  postCtrl.update,
);

/**
 * 답글 등록
 */
post.patch(
  '/:id/comments/:commentId/replies',
  postCtrl.checkPostById,
  checkLoggedIn,
  postCtrl.update,
);

/**
 * 답글 삭제
 */
post.delete(
  '/:id/comments/:commentId/replies/:replyId',
  postCtrl.checkPostById,
  checkLoggedIn,
  postCtrl.update,
);

export default post;
