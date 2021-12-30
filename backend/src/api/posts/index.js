const Router = require('koa-router');
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

// 최신 게시물
posts.get('/latest', postsCtrl.latest);
// 인기 게시물
posts.get('/hot', postsCtrl.hot);

// 내 게시물
posts.get('/user', postsCtrl.user);

export default posts;
