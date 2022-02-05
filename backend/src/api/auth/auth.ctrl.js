import mongoose from 'mongoose';
import axios from 'axios';
import qs from 'querystring';
import User from '../../models/user';

const jwt = require('../../lib/jwt');

export const kakao = async (ctx) => {
  // 인가 코드 획득
  const { code } = ctx.request.body;
  let RepToken, RepUser, result;

  // access 토큰 요청
  try {
    RepToken = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_ID,
        redirect_uri: process.env.KAKAO_CALLBACK_URL,
        code: code,
      }),
    });
  } catch (err) {
    console.log(err.response);
  }

  const { access_token } = RepToken.data;

  // 유저 데이터 요청
  try {
    RepUser = await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (err) {
    console.log(err.response.data);
  }

  let user,
    NewUser,
    CheckedUser,
    is_new = false;
  const _id = mongoose.Types.ObjectId();
  const providerId = RepUser.data.id;

  try {
    CheckedUser = await User.findByproviderId(providerId);
  } catch (err) {
    ctx.throw(500, err);
  }

  if (!CheckedUser) {
    // 첫번째 로그인
    is_new = true;
    try {
      NewUser = new User({
        _id,
        providerId,
        provider: 'kakao',
      });
    } catch (err) {
      console.log(err);
    }

    try {
      await NewUser.save(); // 데이터베이스에 저장
    } catch (err) {
      console.log(err);
    }

    try {
      user = await User.findById(_id);
      console.log('[TEST] user : ', user);
    } catch (err) {
      console.log(err);
    }
  } else {
    // 두번째 로그인일 경우
    user = CheckedUser;
  }

  // 자체 토큰 발급
  const jwtToken = await jwt.sign(user);

  result = {
    token: jwtToken.token,
    is_new: is_new,
    user: user,
  };

  // access token을 JWT를 사용하여 서버만의 토큰으로 발급 후 front에 전달
  ctx.body = result;
};

export const naver = async (ctx) => {
  // 인가 코드 획득
  const { code } = ctx.request.body;
  const provider = 'naver';
  let RepToken, RepUser, result;

  // access 토큰 요청
  try {
    RepToken = await axios({
      method: 'POST',
      url: 'https://nid.naver.com/oauth2.0/token',
      data: qs.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.NAVER_ID,
        client_secret: process.env.NAVER_SECRET,
        code: code,
      }),
    });
  } catch (err) {
    console.log(err.response.data);
  }

  const { access_token } = RepToken.data;

  // 유저 데이터 요청
  try {
    RepUser = await axios({
      method: 'get',
      url: 'https://openapi.naver.com/v1/nid/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (err) {
    console.log(err.response.data);
  }

  let user,
    is_new = false;
  const _id = mongoose.Types.ObjectId();

  const providerId = RepUser.data.response.id;

  // TODO : provider도 AND 연산으로 같이 찾도록 개선
  const CheckedUser = await User.findByproviderId(providerId);
  if (!CheckedUser) {
    is_new = true;
    // 첫번째 로그인
    const NewUser = new User({
      _id,
      providerId,
      provider,
    });
    await NewUser.save(); // 데이터베이스에 저장

    user = await User.findById(_id);
  } else {
    // 두번째 로그인일 경우
    user = CheckedUser;
  }

  // TODO : 두번째 이상 로그인일 경우 자체 토큰을 새로 발급해줄 필요성이 있을지 확인
  // 자체 토큰 발급
  const jwtToken = await jwt.sign(user);

  result = {
    token: jwtToken.token,
    is_new: is_new,
    user: user,
  };

  // access token을 JWT를 사용하여 서버만의 토큰으로 발급 후 front에 전달
  ctx.body = result;
};

export const google = async (ctx) => {
  // 인가 코드 획득
  const { code } = ctx.request.body;
  const provider = 'google';
  let RepToken, RepUser, result;

  // access 토큰 요청
  try {
    RepToken = await axios({
      method: 'POST',
      url: 'https://oauth2.googleapis.com/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        code: code,
        client_id: process.env.GOOGLE_ID,
        client_secret: process.env.GOOGLE_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: 'authorization_code',
      }),
    });
  } catch (err) {
    console.log(err);
  }

  const { access_token } = RepToken.data;

  // 유저 데이터 요청
  try {
    RepUser = await axios({
      method: 'GET',
      url: `https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (err) {
    console.log(err.response.data);
  }

  // 유저 확인 및 DB 저장
  let user,
    CheckedUser,
    is_new = false;
  const _id = mongoose.Types.ObjectId();
  const providerId = RepUser.data.resourceName.split('/')[1];

  try {
    CheckedUser = await User.findByproviderId(providerId);
  } catch (err) {
    ctx.throw(500, err);
  }

  if (!CheckedUser) {
    // 첫번째 로그인
    is_new = true;
    const NewUser = new User({
      _id,
      providerId,
      provider: 'google',
    });
    await NewUser.save(); // 데이터베이스에 저장

    user = await User.findById(_id);
  } else {
    // 두번째 로그인일 경우
    user = CheckedUser;
  }

  // 자체 토큰 발급
  const jwtToken = await jwt.sign(user);

  result = {
    token: jwtToken.token,
    is_new: is_new,
    user: user,
  };
  // // access token을 JWT를 사용하여 서버만의 토큰으로 발급 후 front에 전달
  ctx.body = result;
};

export const logout = async (ctx) => {
  ctx.status = 204; // No Content
};
