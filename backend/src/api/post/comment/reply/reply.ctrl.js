import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

/**
 * 답글 등록
 * PATCH /api/post//comments/replies/:id/:commentId
 */
export const rpUpload = async (ctx) => {};

/**
 * 답글 삭제
 * DELETE /api/post//comments/replies/:id/:commentId/:replyId
 */
export const rpDelete = async (ctx) => {};
