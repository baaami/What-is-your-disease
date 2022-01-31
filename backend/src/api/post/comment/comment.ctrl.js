import mongoose from 'mongoose';
import Post from '../../../models/post';
import Comment from '../../../models/comment';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;
/**
 * @brief Id를 통하여 Comment 검증 후 존재 시 ctx.state.comment로 전달
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
export const checkCommentById = async (ctx, next) => {
  const { commentId } = ctx.params;
  if (!ObjectId.isValid(commentId)) {
    ctx.status = 400;
    return;
  }

  try {
    const comment = await Comment.findById(commentId);

    // 포스트가 존재하지 않을 때
    if (!comment) {
      ctx.status = 404;
    }
    ctx.state.comment = comment.toJSON();
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 댓글 등록
 * POST /api/post/comment/:id
 */
export const cmUpload = async (ctx) => {
  // 1. 필요한 값 할당
  const curPost = ctx.state.post;
  const { text } = ctx.request.body;
  const comment = new Comment({
    postId: curPost._id,
    text,
    user: ctx.state.user,
  });

  // 2. 해당 Post에 추가되는 commentId 추가
  const nextPost = { ...curPost };
  nextPost.commentIds.push(comment._id);

  try {
    const _ = await Post.findByIdAndUpdate(
      curPost._id,
      {
        commentIds: nextPost.commentIds,
      },
      {
        new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
        // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
      },
    ).exec();
  } catch (e) {
    ctx.throw(500, e);
  }

  // 3. comment 생성
  try {
    await comment.save();
    ctx.body = comment;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 댓글 삭제
 * DELETE /api/post/comment/:id/:commentId
 */
export const cmDelete = async (ctx) => {
  const curPost = ctx.state.post;
  const { commentId } = ctx.params;

  // 해당 댓글 삭제 진행
  // Type -> Id : new ObjectId
  //         commenㅌtId : String
  const newId = curPost.commentIds.filter((Id) => Id != commentId);

  // 1. post에서 해당 댓글 id 제거
  try {
    const post = await Post.findByIdAndUpdate(
      curPost._id,
      {
        commentIds: newId,
      },
      {
        new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
        // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
      },
    ).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  // 2. 댓글 컬렉션에서 해당 id 제거
  try {
    const comment = await Comment.findByIdAndRemove(commentId).exec();
    ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};
