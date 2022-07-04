import express from 'express';
import mongoose from 'mongoose';

import {
  loginValidator,
  postCreateValidator,
  registerValidator,
} from './validations/auth.js';
import checkAuth from './middlewares/checkAuth.js';
import { getMe, signin, signup } from './controllers/UserController.js';
import {
  createPost,
  deletePost,
  getOnePost,
  getPosts,
  updatePost,
} from './controllers/PostController.js';

mongoose
  .connect(
    'mongodb+srv://raskalov:Hfcrfkjd98@cluster0.xkzc4.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB OK');
  })
  .catch((err) => {
    console.log('DB ERROR', err);
  });

const app = express();

app.use(express.json());

app.post('/signin', loginValidator, signin);
app.post('/signup', registerValidator, signup);
app.get('/user/me', checkAuth, getMe);

app.post('/posts', checkAuth, postCreateValidator, createPost);
app.get('/posts', getPosts);
app.get('/posts/:id', getOnePost);
app.delete('/posts/:id', checkAuth, deletePost);
app.patch('/posts/:id', checkAuth, updatePost);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Server OK');
});
