const Router = require('koa-router');
import checkLoggedIn from '../../../../lib/checkLoggedIn';
import * as commentCtrl from '../comment.ctrl';
import * as replyCtrl from './reply.ctrl';

const reply = new Router();

/**
 * 댓글 등록 (특정 필드 변경)
 */
reply.post(
  '/:commentId',
  checkLoggedIn,
  commentCtrl.checkCommentById,
  replyCtrl.rpUpload,
);

/**
 * 댓글 삭제 (특정 필드 변경)
 */
reply.delete(
  '/:commentId/:replyId',
  commentCtrl.checkCommentById,
  checkLoggedIn,

  replyCtrl.rpDelete,
);

export default reply;
