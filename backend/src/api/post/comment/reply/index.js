const Router = require('koa-router');
import checkLoggedIn from '../../../../lib/checkLoggedIn';
import * as commentCtrl from '../comment.ctrl';
import * as replyCtrl from './reply.ctrl';

const reply = new Router();

/**
 * 답글 등록
 */
reply.post('/write', checkLoggedIn, replyCtrl.rpUpload);

/**
 * 답글 삭제
 */
reply.delete('/delete/:replyId', checkLoggedIn, replyCtrl.rpDelete);

/**
 * 답글 좋아요
 */
reply.post('/like/:replyId', checkLoggedIn, replyCtrl.rpLike);

export default reply;
