module.exports = {
  secretKey:
    '34a83b52aaf1e87ff1f6b768c11e7e322f41e9863b3126291a380df1ab67042694e8601d4e1003f99ccbd51b2d55dbfef0f767e861e1d5151a56ceeeb70058dd', // 원하는 시크릿 ㅍ키
  option: {
    algorithm: 'HS256', // 해싱 알고리즘
    expiresIn: '7d', // 토큰 유효 기간
    issuer: 'issuer', // 발행자
  },
};
