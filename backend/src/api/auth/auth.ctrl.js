import axios from 'axios';
import qs from 'querystring';
import User from '../../models/user';

const jwt = require('../../lib/jwt');

export const kakao = async (ctx) => {
  // 인가 코드 획득
  const { code } = ctx.request.body;
  // qs.stringify 를 통하여 보내여서 해결
  let rep_token, rep_user, result;
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
  } catch (err) {
    console.log(err.response.data);
  }
  // 자체 토큰 발급
  const jwtToken = await jwt.sign(rep_user.data);

  const { id } = rep_user.data;
  const CheckedUser = await User.findById(id);

  if (!CheckedUser) {
    // 첫번째 로그인

    // 1. 카카오에서 전달 받은 User data에서 필요한 정보를 파싱하여 db에 저장
    const { nickname } = rep_user.data.properties;
    const user = new User({
      id,
      nickname,
      provider: 'kakao',
    });
    await user.save(); // 데이터베이스에 저장

    // 2. db에 저장한 유저 객체를 그대로 가져와서 result 객체의 user key에 value로 삽입
    const NewUser = await User.findById(id);
    result = {
      token: jwtToken.token,
      user: NewUser,
    };
  } else {
    // 두번째 로그인일 경우
    console.log('Exist User');
    result = {
      token: jwtToken.token,
      user: CheckedUser,
    };
  }

  console.log('Response data : ', result);
  // access token을 JWT를 사용하여 서버만의 토큰으로 발급 후 front에 전달
  ctx.body = result;
};

export const logout = async (ctx) => {
  ctx.logout();
  ctx.response.redirect('/');
};
