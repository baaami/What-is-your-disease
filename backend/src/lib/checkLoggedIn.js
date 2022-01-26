const jwt = require('../lib/jwt');
const secretKey = require('../lib/secretkey').secretKey;
import User from '../models/user';

const checkLoggedIn = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.slice(7);
  if (!token) {
    ctx.status = 401;
    console.log('token not exit');
    return;
  } else {
    try {
      // verify를 통해 값 decode
      const { _id } = await jwt.verify(token, secretKey);

      // decoded_id를 DB에서 조회하여 사용자 find
      const ExistUser = await User.findById(_id);
      if (ExistUser) {
        ctx.state.user = ExistUser;
        return next();
      } else {
        ctx.status = 401;
      }
    } catch (err) {
      console.log(err);
      ctx.status = 401;
      return;
    }
  }
};

export default checkLoggedIn;
