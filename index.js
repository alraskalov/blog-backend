import express from 'express';
import mongoose from 'mongoose';

import { registerValidator } from './validations/auth.js';
import checkAuth from './middlewares/checkAuth.js';
import { getMe, signin, signup } from './controllers/UserController.js';

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

app.post('/signin', signin);

app.post('/signup', registerValidator, signup);

app.get('/user/me', checkAuth, getMe);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Server OK');
});
