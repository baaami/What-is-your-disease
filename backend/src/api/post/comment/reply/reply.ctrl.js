import mongoose from 'mongoose';
import Comment from '../../../../models/comment';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

/**
 * 답글 등록
 * PATCH /api/post/comment/reply/:commentId
 */
export const rpUpload = async (ctx) => {
  const curComment = ctx.state.comment;
  const { text } = ctx.request.body;
  const comment = new Comment();

  const commentDoc = comment.replies.create({ text, user: ctx.state.uesr });
  const newReply = [...curComment.replies].concat(commentDoc);

  try {
    const check = await Comment.findByIdAndUpdate(
      curComment._id,
      {
        replies: newReply,
      },
      {
        new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
        // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
      },
    ).exec();
    if (!check) {
      ctx.status = 404;
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = newReply;
};

/**
 * 답글 삭제
 * DELETE /api/post/comment/reply/:commentId/:replyId
 */
export const rpDelete = async (ctx) => {
  const curComment = ctx.state.comment;
  const { replyId } = ctx.params;

  // 해당 댓글 삭제 진행
  // Type -> comment._id : new ObjectId
  //         commenㅌtId : String
  const newReply = curComment.replies.filter((reply) => reply._id != replyId);

  try {
    const comment = await Comment.findByIdAndUpdate(
      curComment._id,
      {
        replies: newReply,
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

    ctx.body = newReply;
  } catch (e) {
    ctx.throw(500, e);
  }
};
