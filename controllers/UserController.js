/* eslint-disable consistent-return */
const UserModel = require('../models/User');

const getMe = async (req, res) => {
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
};

module.exports = {
  getMe,
};
