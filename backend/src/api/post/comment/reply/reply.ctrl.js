import mongoose from 'mongoose';
import Post from '../../../../models/post';
import Reply from '../../../../models/reply';
import Comment from '../../../../models/comment';

/**
 * 답글 등록
 * POST /api/post/:postId/comment/:commentId/reply/write
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
    const result = await Post.findOneAndUpdate(
      {
        'comments._id': commentId,
      },
      {
        $push: { 'comments.$.replies': reply },
      },
      {
        new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
        // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
      },
    ).exec();

    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 답글 삭제
 * DELETE /api/post/:postId/comment/:commentId/reply/delete/:replyId
 */
export const rpDelete = async (ctx) => {
  const { commentId, replyId } = ctx.params;

  // 1. 답글 id 해당 comment에 저장 생성
  try {
    const result = await Post.findOneAndUpdate(
      {
        'comments._id': commentId,
      },
      {
        $pull: { 'comments.$.replies': { _id: replyId } },
      },
      {
        new: true,
      },
    ).exec();

    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * 답글 좋아요
 * POST /api/post/:postId/comment/:commentId/reply/like/:replyId
 */
export const rpLike = async (ctx) => {
  const { postId, commentId, replyId } = ctx.params;
  const user = ctx.state.user;

  // 1. 좋아요 증가
  try {
    const result = await Post.findOneAndUpdate(
      // TODO : query 변수에 담도록 변경하기
      {
        'comments._id': commentId,
      },
      {
        $addToSet: {
          'comments.$[comment].replies.$[reply].likeMe': user._id,
        },
        $inc: {
          'comments.$[comment].replies.$[reply].likes': 1,
        },
      },
      {
        arrayFilters: [
          {
            'comment.replies': {
              $exists: true,
            },
          },
          {
            'reply._id': replyId,
          },
        ],
      },
    ).exec();
    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
  }
};
