const { body } = require('express-validator');

const registerValidator = [
  body('email', 'Некорректный формат почты').isEmail(),
  body('password', 'Минимальная длина пароля - 6 символов').isLength({
    min: 6,
  }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'Некорректная ссылка на аватар').optional().isURL(),
];

const loginValidator = [
  body('email', 'Некорректный формат почты').isEmail(),
  body('password', 'Минимальная длина пароля - 6 символов').isLength({
    min: 6,
  }),
];

const postCreateValidator = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи')
    .isLength({
      min: 10,
    })
    .isString(),
  body('tags', 'Неверный формат тегов').optional().isArray(),
  body('imageUrl', 'Некорректная ссылка на изображение').optional().isString(),
];

module.exports = {
  registerValidator,
  loginValidator,
  postCreateValidator,
};
