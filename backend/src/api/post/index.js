const Router = require('koa-router');
import * as postCtrl from './post.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const post = new Router();

post.patch('/:id', checkLoggedIn, postCtrl.update);
post.delete('/:id', checkLoggedIn, postCtrl.remove);
post.get('/:id', postCtrl.read);
post.post('/write', checkLoggedIn, postCtrl.write);

export default post;
