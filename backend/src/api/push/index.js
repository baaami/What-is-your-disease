const Router = require('koa-router');
import * as pushCtrl from './push.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const push = new Router();

/*
  POST /api/push
*/
push.post('/', checkLoggedIn, pushCtrl.allRestoredPushData);

export default push;
