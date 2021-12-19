const passport = require('koa-passport');
const KakaoStrategy = require('passport-kakao').Strategy;
import User from '../models/user';

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/api/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log('profile : ', profile);
        try {
          console.log('User : ', User);
          const exUser = await User.findOne({
            snsId: profile.id,
            provider: 'kakao',
          });
          if (exUser.snsId) {
            console.log('User exist!', exUser);
            done(null, exUser);
          } else {
            console.log('New User!');
            const newUser = await User.create({
              id: profile.id,
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'kakao',
            });
            done(null, newUser);
          }
        } catch (error) {
          console.log(error);
          done(error);
        }
      },
    ),
  );
};
