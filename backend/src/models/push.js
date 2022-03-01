import mongoose, { Schema } from 'mongoose';

export const PushSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  sender: mongoose.Types.ObjectId,
  receiver: mongoose.Types.ObjectId,
  type: String,
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
});

const Push = mongoose.model('Push', PushSchema);
export default Push;
