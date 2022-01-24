const Router = require('koa-router');
import * as searchCtrl from './search.ctrl';

const search = new Router();

/*
  GET /api/search?q=
*/
search.get('/', searchCtrl.searchAll);

export default search;
