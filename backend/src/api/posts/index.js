const Router = require('koa-router');
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

posts.post('/write', postsCtrl.write);
posts.get('/list', postsCtrl.list);

export default posts;
