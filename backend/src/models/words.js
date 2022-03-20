import mongoose, { Schema } from 'mongoose';
import { number } from '../../node_modules/joi/lib/index';

export const WordSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  data: String,
  freq: 0,
  publishedDate: {
    // 보낸 시간
    type: Date,
    default: Date.now,
  },
});

const Word = mongoose.model('Word', WordSchema);
export default Word;
