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
