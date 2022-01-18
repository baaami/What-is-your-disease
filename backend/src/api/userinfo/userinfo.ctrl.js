import User from "../../models/user";
import jwt from "../../lib/jwt";

const secretKey = require("../../lib/secretkey").secretKey;

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
      console.log("User Update fail");
      ctx.status = 404;
      return;
    }

    ctx.body = user;
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * GET /api/userinfo/accounts
 * 유저 정보 전달
 */
export const accounts = async (ctx) => {
  let currentUser = await ctx.request.headers.authorization
    .replace("Bearer", "")
    .trim();
  await jwt.verify(currentUser).then((res) => {
    currentUser = res._id;
  });
  try {
    const user = await User.findById(currentUser);
    ctx.status = 200;
    ctx.body = user;
  } catch (e) {
    console.log(e);
  }
};
