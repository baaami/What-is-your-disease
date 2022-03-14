const Router = require('koa-router');
import checkLoggedIn from '../../lib/checkLoggedIn';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

// 카테고리 게시물
posts.get('/', postsCtrl.category, postsCtrl.filter);

// 필터 게시물 (필터링 테이블 작성 필요)
posts.get('/filter', postsCtrl.filter);

// 특정 유저 게시물 -> 자신일 경우 자신의 _id값 전달
posts.get('/user/:userId', postsCtrl.user, postsCtrl.filter);

// 특정 유저 팔로우들의 게시물
posts.get('/follow', checkLoggedIn, postsCtrl.follow, postsCtrl.filter);

export default posts;
