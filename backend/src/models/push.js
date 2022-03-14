import mongoose, { Schema } from 'mongoose';

export const PushSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  sender: String,
  receiver: String,
  type: String,
  confirm: false,
  Info: {
    senderId: mongoose.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId, // (팔로우) 포스트 작성 시, 댓글 작성 시, 답글 작성 시
    commentId: mongoose.Types.ObjectId, // 댓글 작성 시, 답글 장성 시
    replyId: mongoose.Types.ObjectId, // 답글 작성 시
  },
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
});

const Push = mongoose.model('Push', PushSchema);
export default Push;
