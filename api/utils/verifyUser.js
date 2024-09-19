const jwt = require('jsonwebtoken');
const errorHandler = require('./error');

const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, 'unauthorized'));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(403, 'Forbidden'));
    }

    req.user = user;
    next();
  });
};

module.exports = { verifyUser };
