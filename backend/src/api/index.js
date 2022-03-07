import Router from 'koa-router';
import post from './post';
import posts from './posts';
import auth from './auth';
import user from './user';
import search from './search';
import push from './push';

const api = new Router();

api.use('/post', post.routes());
api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/search', search.routes());
api.use('/user', user.routes());
api.use('/push', push.routes());

// 라우터를 내보냄
export default api;
