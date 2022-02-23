require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import cors from '@koa/cors';
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
const server = require('http').Server(app.callback());
const io = require('socket.io')(server, { cors: { origin: '*' } });

const router = new Router();

app.use(
  cors({
    // host: 'http://localhost:4000',
    origin: 'http://localhost:3000',
    // credentials: true,
  }),
);

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
server.listen(port, () => {
  console.log('Listening to port %d', port);
});
