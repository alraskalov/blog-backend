const router = require('express').Router();
const { PostController } = require('../controllers');
const { checkAuth, handleValidationError } = require('../middlewares');
const { postCreateValidator } = require('../validations/auth');

router.post(
  '/',
  checkAuth,
  postCreateValidator,
  handleValidationError,
  PostController.createPost,
);
router.get('/', PostController.getPosts);
router.get('/tags', PostController.getTags);
router.get('/:id', PostController.getOnePost);
router.delete('/:id', checkAuth, PostController.deletePost);
router.patch(
  '/:id',
  checkAuth,
  postCreateValidator,
  handleValidationError,
  PostController.updatePost,
);

module.exports = router;
