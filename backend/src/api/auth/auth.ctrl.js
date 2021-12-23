import User from '../../models/user';
import mongoose from 'mongoose';
import axios from 'axios';
import qs from 'querystring';

export const kakao = async (ctx) => {
  // 인가 코드 획득
  const { code } = ctx.request.body;
  // qs.stringify 를 통하여 보내여서 해결
  try {
    const Tokens = await axios({
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

    ctx.body = {
      accessToken: 'tokenvalue',
      code: code,
    };

    console.log(Tokens);
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (ctx) => {
  ctx.logout();
  ctx.response.redirect('/');
};
