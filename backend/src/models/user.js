import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  id: String,
  nick: String,
  snsId: String,
  provider: String,
});

const User = mongoose.model('User', UserSchema);
export default User;
