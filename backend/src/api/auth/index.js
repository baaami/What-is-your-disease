const passport = require('koa-passport');
const Router = require('koa-router');
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/callback/kakao', authCtrl.kakao);

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

auth.get('/naver', passport.authenticate('naver'));

auth.get(
  '/naver/callback',
  passport.authenticate('naver', {
    failureRedirect: '/',
  }),
  (ctx) => {
    ctx.response.redirect('/api/auth');
  },
);

auth.get('/google', passport.authenticate('google'));

auth.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (ctx) => {
    ctx.response.redirect('/api/auth');
  },
);

auth.get('/logout', authCtrl.logout);

export default auth;
