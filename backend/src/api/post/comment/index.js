const Router = require('koa-router');
import * as commentCtrl from './comment.ctrl';
import * as postCtrl from '../post.ctrl';
import checkLoggedIn from '../../../lib/checkLoggedIn';
import reply from './reply';

const comment = new Router();

comment.use('/:commentId/reply', reply.routes());

/**
 * 댓글 등록 (특정 필드 변경)
 */
comment.post(
  '/write',
  checkLoggedIn,
  postCtrl.checkPostById,
  commentCtrl.cmWrite,
);

/**
 * 댓글 수정 (특정 필드 변경)
 */
comment.patch(
  '/update/:commentId',
  checkLoggedIn,
  postCtrl.checkPostById,
  commentCtrl.cmUpdate,
);

/**
 * 댓글 삭제 (특정 필드 변경)
 */
comment.delete(
  '/delete/:commentId',
  checkLoggedIn,
  postCtrl.checkPostById,
  commentCtrl.cmDelete,
);

/**
 * 댓글 좋아요
 */
comment.post('/like/:commentId', checkLoggedIn, commentCtrl.cmLike);

export default comment;
