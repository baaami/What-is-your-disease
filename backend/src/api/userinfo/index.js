const Router = require('koa-router');
import * as userinfoCtrl from './userinfo.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const userinfo = new Router();

// 유저 정보 업데이트
userinfo.patch('/update', checkLoggedIn, userinfoCtrl.update);

export default userinfo;
