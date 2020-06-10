const jwt = require('jsonwebtoken');
const Error401 = require('../errors/err401');
const { SECRET } = require('../config');


module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new Error401('Необходимо авторизоваться!');
  }
  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    throw new Error401('Необходимо авторизоваться');
  }
  req.user = payload;

  next();
};
