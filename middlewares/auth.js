const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { jwt: jwtToken } = req.cookies;
  if (!jwtToken) {
    throw new UnauthorizedError('Необходима авторизация.');
  }
  let payload;
  try {
    payload = jwt.verify(jwtToken, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация.'));
  }
  req.user = payload;
  return next();
};
