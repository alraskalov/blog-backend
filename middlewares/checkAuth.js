const jwt = require('jsonwebtoken');

const { TOKEN_SECRET } = require('../utils/configure');

// eslint-disable-next-line consistent-return
const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decodeToken = jwt.verify(token, TOKEN_SECRET);
      req.userId = decodeToken._id;
      next();
    } catch (error) {
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
};

module.exports = {
  checkAuth,
};
