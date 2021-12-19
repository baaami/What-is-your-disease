import User from '../../models/user';
import mongoose from 'mongoose';

export const logout = async (ctx) => {
  ctx.logout();
  ctx.response.redirect('/');
};
