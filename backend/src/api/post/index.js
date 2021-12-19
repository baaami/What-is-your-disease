const Router = require('koa-router');
import * as postCtrl from './post.ctrl';

const post = new Router();

post.patch('/:id', postCtrl.update);
post.delete('/:id', postCtrl.remove);
post.get('/:id', postCtrl.read);

export default post;
