import mongoose from 'mongoose';
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

  // 1. 자신의 followingId에 해당 Id 추가
  try {
    const _ = await User.findByIdAndUpdate(
      {
        _id: ownId,
      },
      {
        $addToSet: {
          followingIds: followId,
        },
      },
    );
  } catch (e) {
    ctx.throw(500, e);
  }

  // 2. 대상 유저의 follower에 내 Id 추가
  try {
    const user = await User.findByIdAndUpdate(
      {
        _id: followId,
      },
      {
        $addToSet: {
          followerIds: ownId,
        },
      },
      {
        new: true,
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

  // 1. 자신의 followingId에 해당 Id 추가
  try {
    const _ = await User.findByIdAndUpdate(
      {
        _id: ownId,
      },
      {
        $pull: {
          followingIds: unfollowId,
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
          followerIds: ownId,
        },
      },
    );
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.status = 200;
};

/**
 * POST /api/user/profile
 * 유저 정보 전달
 */
export const profile = async (ctx) => {
  const { userId } = ctx.params;

  // 팔로잉, 팔로워 id 값들을 전부 찾아서 보냄
  const followQuery = [
    {
      $match: { _id: mongoose.Types.ObjectId(userId) },
    },
    {
      $unwind: '$followingIds',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'followingIds',
        foreignField: '_id',
        as: 'followings',
      },
    },
    {
      $unwind: '$followings',
    },
    {
      $group: {
        _id: '$_id',
        info: { $first: '$info' },
        followings: { $push: '$followings' },
      },
    },
  ];

  const followerQuery = [
    {
      $match: { _id: mongoose.Types.ObjectId(userId) },
    },
    {
      $unwind: '$followerIds',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'followerIds',
        foreignField: '_id',
        as: 'followers',
      },
    },
    {
      $unwind: '$followers',
    },
    {
      $group: {
        _id: '$_id',
        info: { $first: '$info' },
        followers: { $push: '$followers' },
      },
    },
  ];

  let followUser, followerUser, user;
  try {
    // TODO : 왜 행렬로 받게되는지 확인 <- aggregate 특성??
    [followUser] = await User.aggregate(followQuery).exec();
    // console.log('[TEST] followUser:', followUser.followings);
  } catch (e) {
    ctx.throw(500, e);
  }

  try {
    [followerUser] = await User.aggregate(followerQuery).exec();
    // console.log('[TEST] followerUser:', followerUser.followers);
  } catch (e) {
    ctx.throw(500, e);
  }

  try {
    user = await User.findById(userId).exec();
    user = user.toJSON();

    if (followUser) {
      user.followings = [...followUser.followings];
    }
    if (followerUser) {
      user.followers = [...followerUser.followers];
    }
  } catch (e) {
    ctx.throw(500, e);
  }
  ctx.body = user;
};

/**
 * GET /api/user/accounts
 * 유저 정보 전달
 */
export const accounts = async (ctx) => {
  try {
    const user = await User.findById(ctx.state.user._id);

    ctx.body = user;
  } catch (e) {
    ctx.throw(500, e);
  }
};
