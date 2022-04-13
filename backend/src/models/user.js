import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  providerId: String,
  provider: String,
  info: {
    name: String,
    age: Number,
    gender: String,
    nickname: String,
    bloodtype: String,
    allergy: [String],
    medicines: [String],
  },
  followerIds: [mongoose.Types.ObjectId],
  followingIds: [mongoose.Types.ObjectId],
});

// 스태틱 메서드
UserSchema.statics.findByproviderId = function (providerId) {
  return this.findOne({ providerId });
};

const User = mongoose.model('User', UserSchema);
export default User;
