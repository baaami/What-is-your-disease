require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
const session = require('koa-session');
const passport = require('koa-passport');
const passportConfig = require('./passport');

import api from './api';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const CONFIG = {
  key: 'koa.sess' /** (string) cookie key (default is koa.sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
  secure: false /** (boolean) secure cookie*/,
  sameSite:
    null /** (string) session cookie sameSite options (default null, don't set it) */,
};

const app = new Koa();
const router = new Router();

// 라우터 적용 전에 bodyParser 적용

/**
 * app.use : 미들웨어 함수를 애플리케이션에 등록한다
 */
app.use(bodyParser());

app.keys = ['whatis'];
app.use(session(CONFIG, app));
// passport 구동
app.use(passport.initialize());
app.use(passport.session());
// passport 설정
passportConfig(passport);

// 라우터 설정
router.use('/api', api.routes());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
