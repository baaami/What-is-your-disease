import mongoose from 'mongoose';
import Push from '../../models/push';

/**
 * POST /api/push
 * 유저 정보 전달
 */
export const allRestoredPushData = async (ctx) => {
  const user = ctx.state.user;

  const query = {
    receiver: user.info.nickname,
  };

  // 1. 자신의 followingId에 해당 Id 추가
  try {
    const pushData = await Push.find(query)
      .sort({
        publishedDate: -1,
      })
      .exec();
    ctx.body = pushData;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * POST /api/push/confirm
 * 유저 정보 전달
 */
export const confirm = async (ctx) => {
  const user = ctx.state.user;
  const { pushId } = ctx.query;

  try {
    const pushData = await Push.findOneAndUpdate(
      { _id: pushId },
      { confirm: true },
      { new: true },
    );

    // 해당 user의 남은 푸쉬 알람 개수 전달
    // ctx.body = pushData;
  } catch (e) {
    ctx.throw(500, e);
  }
};
