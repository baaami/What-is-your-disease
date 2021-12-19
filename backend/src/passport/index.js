const kakao = require('./kakaoStrategy');
import User from '../models/user';

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user.id);
  });
  // TODO : deserializeUser에서 done 함수를 호출한 결과 id가 어느 객체에 저장이 되는지
  passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser');
    const exUser = await User.findOne({
      snsId: id,
      provider: 'kakao',
    });
    done(null, exUser);
  });

  kakao(passport);
};
