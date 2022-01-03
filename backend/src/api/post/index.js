const Router = require('koa-router');
import * as postCtrl from './post.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const post = new Router();

post.get('/:id', postCtrl.getPostById, postCtrl.read);
// TODO : CheckOwnPost 미들웨어 추가 필요
post.patch(
  '/:id',
  postCtrl.getPostById,
  checkLoggedIn,
  postCtrl.checkOwnPost,
  postCtrl.update,
);

post.delete(
  '/:id',
  postCtrl.getPostById,
  checkLoggedIn,
  postCtrl.checkOwnPost,
  postCtrl.remove,
);

post.post('/write', checkLoggedIn, postCtrl.write);

export default post;
