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
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
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
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (err) {
    console.log(err.response.data);
  }

  let user;
  const _id = mongoose.Types.ObjectId();
  const { id } = RepUser.data;
  const CheckedUser = await User.findByproviderId(id);

  console.log('Checked User : ', CheckedUser);
  if (!CheckedUser) {
    // 첫번째 로그인
    // 1. 카카오에서 전달 받은 User data에서 필요한 정보를 파싱하여 db에 저장
    const NewUser = new User({
      _id,
      providerId: id,
      provider: 'kakao',
    });
    await NewUser.save(); // 데이터베이스에 저장

    user = await User.findById(_id);
  } else {
    // 두번째 로그인일 경우
    user = { ...CheckedUser };
  }

  // 자체 토큰 발급
  const jwtToken = await jwt.sign(user);

  result = {
    token: jwtToken.token,
    user: user,
  };

  // access token을 JWT를 사용하여 서버만의 토큰으로 발급 후 front에 전달
  ctx.body = result;
};

export const naver = async (ctx) => {
  // 인가 코드 획득
  const { code } = ctx.request.body;
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

  let user;
  const _id = mongoose.Types.ObjectId();

  console.log('[TEST] RepUser.data : ', RepUser.data);
  const { id } = RepUser.data.response;

  // TODO : provider도 AND 연산으로 같이 찾도록 개선
  const CheckedUser = await User.findByproviderId(id);
  if (!CheckedUser) {
    // 첫번째 로그인
    const NewUser = new User({
      _id,
      providerId: id,
      provider: 'naver',
    });
    await NewUser.save(); // 데이터베이스에 저장

    user = await User.findById(_id);
    console.log('[TEST] First User : ', user);
  } else {
    // 두번째 로그인일 경우
    user = { ...CheckedUser };
    console.log('[TEST] Exist User  : ', user);
  }

  // TODO : 두번째 이상 로그인일 경우 자체 토큰을 새로 발급해줄 필요성이 있을지 확인
  // 자체 토큰 발급
  const jwtToken = await jwt.sign(user);

  result = {
    token: jwtToken.token,
    user: user,
  };

  // access token을 JWT를 사용하여 서버만의 토큰으로 발급 후 front에 전달
  ctx.body = result;
};

export const google = async (ctx) => {
  // 인가 코드 획득
  const { code } = ctx.request.body;
  let RepToken, RepUser, result;

  console.log('[TEST] code : ', code);
  // access 토큰 요청
  try {
    RepToken = await axios({
      method: 'POST',
      url: 'https://oauth2.googleapis.com/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_ID,
        client_secret: process.env.GOOGLE_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        code: code,
      }),
    });
  } catch (err) {
    console.log(err.response.data);
  }

  console.log('[TEST] RepToken : ', RepToken);

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

  let user;
  const _id = mongoose.Types.ObjectId();
  const { id } = RepUser.data;
  const CheckedUser = await User.findByproviderId(id);

  console.log('Checked User : ', CheckedUser);
  if (!CheckedUser) {
    // 첫번째 로그인
    // 1. 카카오에서 전달 받은 User data에서 필요한 정보를 파싱하여 db에 저장
    const NewUser = new User({
      _id,
      providerId: id,
      provider: 'kakao',
    });
    await NewUser.save(); // 데이터베이스에 저장

    user = await User.findById(_id);
    // console.log('[TEST] First User : ', user);
  } else {
    // 두번째 로그인일 경우
    user = { ...CheckedUser };
    // console.log('[TEST] Exist User  : ', user);
  }

  // 자체 토큰 발급
  const jwtToken = await jwt.sign(user);

  result = {
    token: jwtToken.token,
    user: user,
  };

  // access token을 JWT를 사용하여 서버만의 토큰으로 발급 후 front에 전달
  ctx.body = result;
};

export const logout = async (ctx) => {
  ctx.logout();
  ctx.response.redirect('/');
};
