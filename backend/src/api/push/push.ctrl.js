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
        confirm: 1,
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
  let data;

  try {
    const _ = await Push.findOneAndUpdate(
      { _id: pushId },
      { confirm: true },
      { new: false },
    );

    // 해당 user의 남은 푸쉬 알람 개수 전달
    // ctx.body = pushData;
  } catch (e) {
    ctx.throw(500, e);
  }

  try {
    data = await Push.find({ receiver: user.info.nickname }).sort([
      ['confirm', 1],
      ['publishedDate', -1],
    ]);

    // 해당 user의 남은 푸쉬 알람 개수 전달
    // ctx.body = pushData;
  } catch (e) {
    ctx.throw(500, e);
  }

  const notConfirmedDataCnt = await Push.countDocuments({
    receiver: user.info.nickname,
    confirm: false,
  }).exec();

  const resData = {
    notConfirmedDataCnt: notConfirmedDataCnt,
    data: data,
  };

  ctx.body = resData;
};

/**
 * POST /api/push/readall
 * 유저 정보 전달
 */
export const readall = async (ctx) => {
  const user = ctx.state.user;

  // 1. 자신의 followingId에 해당 Id 추가
  try {
    const _ = await Push.updateMany(
      { receiver: user.info.nickname },
      { $set: { confirm: true } },
      { new: true },
    );
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};
