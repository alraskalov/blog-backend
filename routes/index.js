const router = require('express').Router();
const express = require('express');
const { checkAuth } = require('../middlewares');

router.use('/uploads', express.static('uploads'));
router.use('/user', checkAuth, require('./users'));
router.use('/posts', require('./posts'));
router.use('/uploads', checkAuth, require('./uploads'));
router.use('/', require('./auth'));

router.use('*', checkAuth, (req, res, next) => {
  next();
});

module.exports = router;
