const Router = require('koa-router');
import * as authCtrl from './auth.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const auth = new Router();

auth.post('/callback/kakao', authCtrl.kakao);
auth.post('/callback/naver', authCtrl.naver);
auth.post('/callback/google', authCtrl.google);
auth.get('/logout', authCtrl.logout);

export default auth;
