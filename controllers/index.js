const { getMe } = require('./UserController');
const { signup, signin } = require('./AuthController');
const {
  getTags,
  createPost,
  getPosts,
  getOnePost,
  deletePost,
  updatePost,
} = require('./PostController');

module.exports = {
  UserController: { getMe },
  PostController: {
    getTags,
    createPost,
    getPosts,
    getOnePost,
    deletePost,
    updatePost,
  },
  AuthController: { signup, signin },
};
