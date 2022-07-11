/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../models/User');
const { TOKEN_SECRET } = require('../utils/configure');

const signup = async (req, res) => {
  try {
    const { password } = req.body;
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
      TOKEN_SECRET,
      {
        expiresIn: '30d',
      },
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
};

const signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash,
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
      TOKEN_SECRET,
      {
        expiresIn: '30d',
      },
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
};

module.exports = {
  signup,
  signin,
};
