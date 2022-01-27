const checkTagQuery = async (ctx, next) => {
  // 1. Tag query를 확인
  const { tag } = ctx.query;

  // 2. Tag query 생성
  const query = {
    ...(tag ? { tags: tag } : {}),
  };

  // 3. ctx.state.query에 mongoDB query 객체를 만들어서 넣어준다
  ctx.state.query = query;

  // 4. 다음 미들웨어 실행
  return next();
};

export default checkTagQuery;
