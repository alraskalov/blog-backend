const { validationResult } = require('express-validator');

// eslint-disable-next-line consistent-return
const handleValidationError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  next();
};

module.exports = {
  handleValidationError,
};
