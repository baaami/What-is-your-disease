import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  providerId: String,
  provider: String,
  info: {
    name: String,
    age: Number,
    gender: String,
    bloodtype: String,
    allergy: Array,
    medicines: Array,
  },
});

// 스태틱 메서드
UserSchema.statics.findByproviderId = function (providerId) {
  return this.findOne({ providerId })._doc;
};

const User = mongoose.model('User', UserSchema);
export default User;
