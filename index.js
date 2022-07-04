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
import multer from 'multer';
import handleValidationError from './middlewares/handleValidationError.js';

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
app.use('/uploads', express.static('uploads'));

app.post('/signin', loginValidator, handleValidationError, signin);
app.post('/signup', registerValidator, handleValidationError, signup);
app.get('/user/me', checkAuth, getMe);

app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post('/posts', checkAuth, postCreateValidator, createPost);
app.get('/posts', getPosts);
app.get('/posts/:id', getOnePost);
app.delete('/posts/:id', checkAuth, deletePost);
app.patch('/posts/:id', checkAuth, postCreateValidator, updatePost);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Server OK');
});
