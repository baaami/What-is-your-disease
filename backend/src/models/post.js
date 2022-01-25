import mongoose from 'mongoose';
import User from './user';

const { Schema } = mongoose;

// 스키마 생성
const PostSchema = new Schema({
  title: String,
  body: String,
  category: String,
  views: Number,
  comments: Array,
  tags: Array,
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
  user: {
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
  },
});

// 모델 생성

// 다음처럼 스키마 이름을 Post로 설정하면 실제 데이터베이스에서 만드는 컬렉션 이름은 posts가 됟다.
//  -> BookInfo로하면 bookinfos가 된다
const Post = mongoose.model('Post', PostSchema);
export default Post;
