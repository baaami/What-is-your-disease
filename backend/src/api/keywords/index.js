const Router = require('koa-router');
import * as keywordsCtrl from './keywords.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const keywords = new Router();

// 유저 기본 정보 조회
keywords.get('/list', keywordsCtrl.list);

export default keywords;
