require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

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

const app = new Koa();
const router = new Router();

/**
 * app.use : 미들웨어 함수를 애플리케이션에 등록한다
 * @brief : route 전에 bodyparser 수행
 */
app.use(bodyParser());

// 라우터 설정
router.use('/api', api.routes());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const serve = require('koa-static');
// 이미지 파일 인식을 위해 static경로 설정
app.use(serve('.'));
// console.log(__dirname + "./api/post/uploads/");

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
