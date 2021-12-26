import mongoose from 'mongoose';
import axios from 'axios';
import qs from 'querystring';

const jwt = require('../../lib/jwt');

export const kakao = async (ctx) => {
  // 인가 코드 획득
  const { code } = ctx.request.body;
  // qs.stringify 를 통하여 보내여서 해결
  let rep_token, rep_user;
  try {
    rep_token = await axios({
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

  const { access_token } = rep_token.data;

  try {
    rep_user = await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log('user Data : ', rep_user.data);
  } catch (err) {
    console.log(err.response.data);
  }

  const jwtToken = await jwt.sign(rep_user.data);

  // access token을 JWT를 사용하여 서버만의 토큰으로 발급 후 front에 전달
  ctx.body = jwtToken;
};

export const logout = async (ctx) => {
  ctx.logout();
  ctx.response.redirect('/');
};
