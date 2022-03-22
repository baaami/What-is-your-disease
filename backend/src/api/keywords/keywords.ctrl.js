import mongoose from 'mongoose';
import Word from '../../models/words';

/**
 * 특정 포스트 조회
 * GET /api/keywords/list
 */
export const list = async (ctx) => {
  const limit = 50;
  try {
    const wordlist = await Word.find({}).sort({ freq: -1 }).limit(limit).exec();

    ctx.body = wordlist;
  } catch (e) {
    ctx.throw(500, e);
  }
};
