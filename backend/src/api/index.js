import Router from 'koa-router';
import post from './post';
import posts from './posts';
import auth from './auth';
import userinfo from './userinfo';

const api = new Router();

api.use('/post', post.routes());
api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/userinfo', userinfo.routes());

// 라우터를 내보냄
export default api;
