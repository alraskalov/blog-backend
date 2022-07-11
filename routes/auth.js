const router = require('express').Router();

const { AuthController } = require('../controllers');
const { handleValidationError } = require('../middlewares');
const { loginValidator, registerValidator } = require('../validations/auth');

router.post(
  '/signin',
  loginValidator,
  handleValidationError,
  AuthController.signin,
);

router.post(
  '/signup',
  registerValidator,
  handleValidationError,
  AuthController.signup,
);

module.exports = router;
