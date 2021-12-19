const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
import User from '../models/user';

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log('profile : ', profile);
        console.log('google profile : ', profile);
        try {
          console.log('Google Profile : ', profile);
          const exUser = await User.findOne({
            snsId: profile.id,
            provider: 'google',
          });

          if (exUser) {
            console.log('Google user exist!', exUser);
            done(null, exUser);
          } else {
            console.log('Google new User!');
            const newUser = await User.create({
              id: profile.id,
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'google',
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
