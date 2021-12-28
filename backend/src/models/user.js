import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  id: String,
  nickname: String,
  provider: String,
  info: {
    name: String,
    age: Number,
    gender: String,
    bloodtype: String,
    allergy: Array,
  },
});

// 스태틱 메서드
UserSchema.statics.findById = function (id) {
  return this.findOne({ id });
};

const User = mongoose.model('User', UserSchema);
export default User;
