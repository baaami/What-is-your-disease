import mongoose, { Schema } from 'mongoose';

export const ChatSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  sender: mongoose.Types.ObjectId, // chat 보낸 유저 id
  room: String, // 방 이름
  data: String,
  user: {
    id: mongoose.Types.ObjectId,
    nickname: String,
  },
  publishedDate: {
    // 보낸 시간
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;
