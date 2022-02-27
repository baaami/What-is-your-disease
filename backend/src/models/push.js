import mongoose, { Schema } from 'mongoose';

export const PushSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  sender: mongoose.Types.ObjectId,
  receiver: mongoose.Types.ObjectId,
  type: String,
  argv: String, // 부가정보
});

const Push = mongoose.model('User', PushSchema);
export default Push;
