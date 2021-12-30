const Router = require('koa-router');
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

// 최신 게시물
posts.get('/latest', postsCtrl.latest);
// 인기 게시물
posts.get('/hot', postsCtrl.hot);

// 내 게시물
posts.get('/user', postsCtrl.user);

// 필터 게시물 (필터링 테이블 작성 필요)
posts.get('/filter/?idx', postsCtrl.filter);
export default posts;
