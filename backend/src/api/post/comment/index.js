const Router = require('koa-router');
import * as commentCtrl from './comment.ctrl';
import * as postCtrl from '../post.ctrl';
import checkLoggedIn from '../../../lib/checkLoggedIn';
import reply from './reply/index';

const comment = new Router();

comment.use('/reply', reply.routes());

/**
 * 댓글 등록 (특정 필드 변경)
 */
comment.patch(
  '/:id',
  checkLoggedIn,
  postCtrl.checkPostById,
  commentCtrl.cmUpload,
);

/**
 * 댓글 삭제 (특정 필드 변경)
 */
comment.delete(
  '/:id',
  checkLoggedIn,
  postCtrl.checkPostById,
  commentCtrl.cmDelete,
);

export default comment;
