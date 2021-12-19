const passport = require('koa-passport');
const Router = require('koa-router');
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.get(
  '/kakao',
  passport.authenticate('kakao', {
    authType: 'rerequest',
    scope: ['account_email'],
  }),
);

auth.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (ctx) => {
    ctx.response.redirect('/api');
  },
);

auth.get('/logout', authCtrl.logout);

export default auth;
