import { body } from 'express-validator';

export const registerValidator = [
  body('email', 'Неккоректный формат почты').isEmail(),
  body('password', 'Минимальная длина пароля - 6 символов').isLength({
    min: 6,
  }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'Неккоректная ссылка на аватар').optional().isURL(),
];
