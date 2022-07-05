import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import {
  loginValidator,
  postCreateValidator,
  registerValidator,
} from './validations/auth.js';
import { PostController, UserController } from './controllers/index.js';

import multer from 'multer';
import { handleValidationError, checkAuth } from './middlewares/index.js';

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

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, 'uploads');
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post(
  '/signin',
  loginValidator,
  handleValidationError,
  UserController.signin
);
app.post(
  '/signup',
  registerValidator,
  handleValidationError,
  UserController.signup
);
app.get('/user/me', checkAuth, UserController.getMe);

app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post(
  '/posts',
  checkAuth,
  postCreateValidator,
  handleValidationError,
  PostController.createPost
);
app.get('/posts', PostController.getPosts);
app.get('/posts/:id', PostController.getOnePost);
app.delete('/posts/:id', checkAuth, PostController.deletePost);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidator,
  handleValidationError,
  PostController.updatePost
);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Server OK');
});
