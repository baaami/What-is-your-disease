import mongoose from "mongoose";
import Post from "../../../models/post";
import sanitizeHtml from "sanitize-html";

const sanitizeOption = {
  allowedTags: [
    "h1",
    "h2",
    "b",
    "i",
    "u",
    "s",
    "p",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src"],
    li: ["class"],
  },
  allowedSchemes: ["data", "http"],
};

/**
 * 댓글 등록
 * PATCH /api/post/comments/:id
 */
export const cmUpload = async (ctx) => {
  const curPost = ctx.state.post;

  let post;
  const { comment } = ctx.request.body;

  // TODO : db에 댓글만 추가하도록 해야함, RDBMS과 같이 Join을 사용해야함
  // -> 현재 로직은 댓글이 수정될 때마다 포스트 전체가 한 번 업데이트가 되는 형태
  const nextPost = { ...curPost }; // 객체를 복사하고
  nextPost.comments.push(comment);

  // TODO : 댓글, 답글 body는 전부 sanitize 적용해야하므로 함수 작성 필요
  if (nextPost.body) {
    nextPost.body = sanitizeHtml(nextPost.body, sanitizeOption);
  }

  try {
    post = await Post.findByIdAndUpdate(curPost._id, nextPost, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = post.comments;
};

/**
 * 댓글 삭제
 * DELETE /api/post/comments/:id/:commentId
 */
export const cmDelete = async (ctx) => {
  const curPost = ctx.state.post;
  const { commentId } = ctx.params;

  // 해당 댓글 삭제 진행
  const newComments = curPost.comments.filter(
    (comment) => comment.comment._id !== commentId
  );

  const nextPost = { ...curPost };
  nextPost.comments = newComments;

  try {
    const post = await Post.findByIdAndUpdate(nextPost._id, nextPost, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }

    ctx.body = newComments;
  } catch (e) {
    ctx.throw(500, e);
  }
};
