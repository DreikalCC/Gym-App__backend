const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

function handleAuthError() {
  throw new Unauthorized('No se cuenta con autorización');
}

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return handleAuthError(res);
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;
  return next();
};
