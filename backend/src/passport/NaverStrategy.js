const passport = require('koa-passport');
const NaverStrategy = require('passport-naver').Strategy;
import User from '../models/user';

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: process.env.NAVER_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log('profile : ', profile);
        console.log('naver profile : ', profile);
        try {
          const exUser = await User.findOne({
            snsId: profile.id,
            provider: 'naver',
          });

          if (exUser) {
            console.log('Naver user exist!', exUser);
            done(null, exUser);
          } else {
            console.log('Naver new User!');
            const newUser = await User.create({
              id: profile.id,
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'naver',
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
