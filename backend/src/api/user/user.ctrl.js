import User from '../../models/user';
import Post from '../../models/post';
import jwt from '../../lib/jwt';

/**
 * POST /api/user/update
 * 유저 정보 업데이트
 */
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
    ctx.throw(500, e);
  }

  ctx.body = nextUser;
};

/**
 * POST /api/user/follow?followId=
 * 유저 정보 전달
 */
export const follow = async (ctx) => {
  const { followId } = ctx.query;
  const ownId = ctx.state.user._id;
  console.log('in');
  // 1. 자신의 following에 해당 Id 추가
  try {
    const _ = await User.findByIdAndUpdate(
      {
        _id: ownId,
      },
      {
        $addToSet: {
          following: followId,
        },
      },
    );
  } catch (e) {
    ctx.throw(500, e);
  }

  // 2. 자신의 following에 해당 Id 추가
  try {
    const user = await User.findByIdAndUpdate(
      {
        _id: followId,
      },
      {
        $addToSet: {
          follower: ownId,
        },
      },
    );

    ctx.body = user;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * POST /api/user/unfollow?unfollowId=
 * 유저 정보 전달
 */
export const unfollow = async (ctx) => {
  const { unfollowId } = ctx.query;
  const ownId = ctx.state.user._id;

  // 1. 자신의 following에 해당 Id 추가
  try {
    const _ = await User.findByIdAndUpdate(
      {
        _id: ownId,
      },
      {
        $pull: {
          following: unfollowId,
        },
      },
    );
  } catch (e) {
    ctx.throw(500, e);
  }

  // 2. 자신의 following에 해당 Id 추가
  try {
    const _ = await User.findByIdAndUpdate(
      {
        _id: unfollowId,
      },
      {
        $pull: {
          follower: ownId,
        },
      },
    );
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.status = 200;
};

/**
 * GET /api/user/accounts
 * 유저 정보 전달
 */
export const accounts = async (ctx) => {
  try {
    const user = await User.findById(ctx.state.user._id);
    ctx.status = 200;
    ctx.body = user;
  } catch (e) {
    ctx.throw(500, e);
  }
};
