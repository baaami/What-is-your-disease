const Router = require('koa-router');
import * as postCtrl from './post.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import comment from './comment';
// import { upload } from "../../main";

const post = new Router();
/**
 * Multer 미들웨어는 파일 업로드를 위해 사용되는 multipart/form-data에서 사용된다.
 * 다른 폼으로 데이터를 전송하면 적용이 안된다.
 * Header의 명시해서 보내주는게 좋다.
 */
const multer = require('@koa/multer');

//파일을 저장할 디렉토리 설정 (현재 위치에 uploads라는 폴더가 생성되고 하위에 파일이 생성된다.)
export const upload = multer({
  dest: __dirname + '/uploads/', // 이미지 업로드 경로
});

post.use('/:postId/comment', comment.routes());

/**
 * 특정 포스트 조회
 * GET /api/post/:postId
 */
post.get('/read/:postId', postCtrl.checkPostById, postCtrl.read);

/**
 * 포스트 작성
 * POST /api/post/write
 */
post.post('/write', checkLoggedIn, postCtrl.write);

/**
 * 포스트 작성
 * POST /api/post/:postId/like
 */
post.post('/:postId/like', checkLoggedIn, postCtrl.like);

/**
 * 이미지 업로드
 * POST /api/post/upload
 */
post.post('/upload', checkLoggedIn, upload.array('file'), postCtrl.upLoadImage);

/**
 * 포스트 수정 (특정 필드 변경)
 */
post.patch(
  '/edit/:postId',
  postCtrl.checkPostById,
  checkLoggedIn,
  postCtrl.checkOwnPost,
  postCtrl.update,
);

/**
 * 특정 포스트 제거
 * DELETE /api/post/:postId
 */
post.delete(
  '/delete/:postId',
  postCtrl.checkPostById,
  checkLoggedIn,
  postCtrl.checkOwnPost,
  postCtrl.remove,
);

export default post;
