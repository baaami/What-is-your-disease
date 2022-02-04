import mongoose from 'mongoose';
import Reply from '../../../../models/reply';
import Comment from '../../../../models/comment';

/**
 * 답글 등록
 * POSt /api/post/comment/reply/:commentId
 */
export const rpUpload = async (ctx) => {
  const { commentId } = ctx.params;
  const { text } = ctx.request.body;

  // 1. 답글 생성
  const reply = new Reply({
    text,
    likes: 0,
    user: ctx.state.user,
  });

  // 1. 답글 id 해당 comment에 저장 생성
  try {
    const _ = await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: { replyIds: reply._id },
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
    await reply.save();
    ctx.body = reply;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 답글 삭제
 * DELETE /api/post/comment/reply/:commentId/:replyId
 */
export const rpDelete = async (ctx) => {
  const { commentId, replyId } = ctx.params;

  // 1. Comment에서 답글 삭제
  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $pull: { replyIds: replyId },
      },
      {
        new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
        // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
      },
    ).exec();
    if (!comment) {
      ctx.status = 404;
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  // 2. 답글 컬렉션에서 삭제
  try {
    const _ = await Reply.findByIdAndRemove(replyId).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 답글 좋아요
 * POST /api/post/comment/reply/like/:replyId
 */
export const rpLike = async (ctx) => {
  const { replyId } = ctx.params;
  const user = ctx.state.user;

  // 1. 좋아요 증가
  try {
    const _ = await Reply.findByIdAndUpdate(
      replyId,
      {
        $inc: {
          likes: 1,
        },
      },
      {
        new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
        // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
      },
    ).exec();
  } catch (e) {
    ctx.throw(500, e);
  }

  // 2. 좋아요 누른 유저 아이디 저장
  try {
    const _ = await Reply.findByIdAndUpdate(
      replyId,
      {
        $push: { likeMe: user._id },
      },
      {
        new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
        // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
      },
    ).exec();
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.status = 204;
};
