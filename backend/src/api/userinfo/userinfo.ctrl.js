import User from '../../models/user';
import jwt from '../../lib/jwt';

const secretKey = require('../../lib/secretkey').secretKey;

export const update = async (ctx) => {
  const { data, token } = ctx.request.body;
  // const { name, age, gender, bloodtype, allergy, medicines } = data;

  let _id, CurUser, NextUser;
  try {
    const decodedId = await jwt.verify(token, secretKey);
    _id = decodedId.id;
  } catch (err) {
    console.log(err);
  }
  console.log('[TEST] _id : ', _id);

  try {
    CurUser = await User.findById(_id);
    console.log('[TEST] CurUser : ', CurUser);
    if (!CurUser) {
      ctx.status = 404;
      return;
    }
  } catch (err) {
    ctx.throw(500, err);
  }

  // user 내용 update
  CurUser = { ...NextUser };
  CurUser.info = { ...data };

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
