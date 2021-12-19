const kakao = require('./kakaoStrategy');
const naver = require('./NaverStrategy');
const google = require('./GoogleStrategy');
import User from '../models/user';

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser');
    const exUser = await User.findOne({
      snsId: id,
    });
    done(null, exUser);
  });

  kakao();
  naver();
  google();
};
