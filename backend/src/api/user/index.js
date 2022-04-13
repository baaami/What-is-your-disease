const Router = require('koa-router');
import * as userCtrl from './user.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const user = new Router();

// 유저 정보 업데이트
user.patch('/update', checkLoggedIn, userCtrl.update);

// 유저 기본 정보 조회
user.get('/accounts', checkLoggedIn, userCtrl.accounts);

// 유저 프로필 조회
user.get('/profile/:userId', checkLoggedIn, userCtrl.profile);

// 유저 팔로우
user.post('/follow', checkLoggedIn, userCtrl.follow);

// 유저 언팔로우
user.post('/unfollow', checkLoggedIn, userCtrl.unfollow);

export default user;
