import mongoose from 'mongoose';
import User from './user';

const { Schema } = mongoose;

const ReplySchema = new Schema({
  text: String,
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
});

const CommentSchema = new Schema({
  text: String,
  replies: [ReplySchema],
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
});

// 다음처럼 스키마 이름을 Post로 설정하면 실제 데이터베이스에서 만드는 컬렉션 이름은 posts가 됟다.
//  -> BookInfo로하면 bookinfos가 된다
const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
