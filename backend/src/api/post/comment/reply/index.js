const Router = require('koa-router');
import * as replyCtrl from './reply.ctrl';

const reply = new Router();

/**
 * 댓글 등록 (특정 필드 변경)
 */
reply.patch('/:id', replyCtrl.rpUpload);

/**
 * 댓글 삭제 (특정 필드 변경)
 */
reply.delete('/:id', replyCtrl.rpDelete);

export default reply;
