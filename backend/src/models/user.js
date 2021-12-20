import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  id: String,
  nick: String,
  snsId: String,
  provider: String,
});

/**
 * @brief 사용자에게 전달할 토큰을 생성하는 인스턴스 메서드
 */
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      nick: this.nick,
    },
    process.env.JWT_SECRET,
    {
      expireIn: '7d',
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
