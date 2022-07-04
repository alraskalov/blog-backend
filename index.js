import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidator } from './validations/auth.js';
import UserModel from './models/User.js';
import checkAuth from './middlewares/checkAuth.js';

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

app.post('/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret-dev',
      {
        expiresIn: '30d',
      }
    );
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось авторизоваться, попробуйте еще',
    });
  }
});

app.post('/register', registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret-dev',
      {
        expiresIn: '30d',
      }
    );
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось зарегистрироваться, попробуйте еще',
    });
  }
});

app.get('/user/me', checkAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: 'Нет доступа',
    });
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Server OK');
});
