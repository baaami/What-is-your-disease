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

  console.log('user : ', user);
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
