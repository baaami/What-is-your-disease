import mongoose from 'mongoose';
import { UserSchema } from './user';

const { Schema } = mongoose;

export const ReplySchema = new Schema({
  text: String,
  likes: Number,
  likeMe: [mongoose.Types.ObjectId],
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
  user: UserSchema,
});

const Reply = mongoose.model('Reply', ReplySchema);
export default Reply;
