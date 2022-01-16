const getPageNum = async (ctx, next) => {
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  ctx.page = page;
  next();
};

export default getPageNum;
