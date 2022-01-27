import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

/**
 * 댓글 등록
 * PATCH /api/post/comments/:id
 */
export const cmUpload = async (ctx) => {};

/**
 * 댓글 삭제
 * DELETE /api/post/comments/:id/:commentId
 */
export const cmDelete = async (ctx) => {};
