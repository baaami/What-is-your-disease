import User from '../../models/user';
import Post from '../../models/post';
import jwt from '../../lib/jwt';

export const update = async (ctx) => {
  const info = ctx.request.body;
  let nextUser,
    prevUser = ctx.state.user;
  const _id = prevUser._id;

  // 1. 유저 정보 업데이트
  try {
    nextUser = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          info,
        },
      },
      {
        new: true,
      },
    ).exec();

    if (!nextUser) {
      console.log('User Update fail');
      ctx.status = 404;
      return;
    }
  } catch (err) {
    ctx.throw(500, err);
  }

  // 2. 유저 정보가 바꼇다면 게시글 중에 해당 유저가 쓴 게시글의 정보도 업데이트
  try {
    await Post.updateMany(
      {
        'user._id': {
          $eq: prevUser._id,
        },
      },
      {
        $set: {
          'user.info': info,
        },
      },
      {
        multi: true,
      },
    );
  } catch (e) {
    console.log(e);
  }

  ctx.body = nextUser;
};

/**
 * GET /api/userinfo/accounts
 * 유저 정보 전달
 */
export const accounts = async (ctx) => {
  let currentUser = await ctx.request.headers.authorization
    .replace('Bearer', '')
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
