import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  id: String,
  nick: String,
  snsId: String,
  provider: String,
  info: {
    name: String,
    age: Number,
    gender: String,
    bloodtype: String,
    allergy: Array,
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
