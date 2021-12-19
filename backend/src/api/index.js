import Router from 'koa-router';
import post from './post';
import posts from './posts';
import auth from './auth';

const api = new Router();

api.use('/post', post.routes());
api.use('/posts', posts.routes());
api.use('/auth', auth.routes());

// 라우터를 내보냄
export default api;
