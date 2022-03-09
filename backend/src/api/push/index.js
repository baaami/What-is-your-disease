const Router = require('koa-router');
import * as pushCtrl from './push.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import { checkOwnPost } from '../post/post.ctrl';

const push = new Router();

/*
  POST /api/push
*/
push.post('/', checkLoggedIn, pushCtrl.allRestoredPushData);

/*
  POST /api/push/confirm
*/
push.post('/', checkLoggedIn, pushCtrl.confirm);

export default push;
