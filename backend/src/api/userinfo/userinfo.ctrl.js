import User from '../../models/user';
import jwt from '../../lib/jwt';

const secretKey = require('../../lib/secretkey').secretKey;

export const update = async (ctx) => {
  const info = ctx.request.body;
  let CurUser = ctx.state.user;

  // user 내용 update`
  CurUser.info = info;
  const _id = CurUser._id;
  try {
    const user = await User.findByIdAndUpdate(_id, CurUser, {
      new: true,
    }).exec();
    if (!user) {
      console.log('User Update fail');
      ctx.status = 404;
      return;
    }

    ctx.body = user;
  } catch (err) {
    ctx.throw(500, err);
  }
};
