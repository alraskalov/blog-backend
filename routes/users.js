const router = require('express').Router();
const { UserController } = require('../controllers');

router.get('/me', UserController.getMe);

module.exports = router;
