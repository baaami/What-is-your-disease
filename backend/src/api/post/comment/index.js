const Router = require('koa-router');
import * as commentCtrl from './comment.ctrl';
import reply from './reply/index';

const comment = new Router();

comment.use('/reply', reply.routes());

/**
 * 댓글 등록 (특정 필드 변경)
 */
comment.patch('/:id', commentCtrl.cmUpload);

/**
 * 댓글 삭제 (특정 필드 변경)
 */
comment.delete('/:id', commentCtrl.cmDelete);

export default comment;
