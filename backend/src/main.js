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

// /**
//  * Multer 미들웨어는 파일 업로드를 위해 사용되는 multipart/form-data에서 사용된다.
//  * 다른 폼으로 데이터를 전송하면 적용이 안된다.
//  * Header의 명시해서 보내주는게 좋다.
//  */
// const multer = require("@koa/multer");

// //파일을 저장할 디렉토리 설정 (현재 위치에 uploads라는 폴더가 생성되고 하위에 파일이 생성된다.)
// export const upload = multer({
//   dest: __dirname + "/uploads/", // 이미지 업로드 경로
// });

const app = new Koa();
const router = new Router();

// 라우터 적용 전에 bodyParser 적용

/**
 * app.use : 미들웨어 함수를 애플리케이션에 등록한다
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
