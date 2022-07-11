# API React Blog - бэкенд для приложения React Blog

Сервер доступен по адресу - **[React Blog API](https://raskalov-blog-api.herokuapp.com)**

Ссылка на репозиторий фронтенда: **[React Blog](https://github.com/alraskalov/blog-frontend)**

## 🧰 Экосистема

- `JavaScript`
- `Node.js`
- `Express.js`
- `MongoDB`
- `multer`
- `mongoose`
- `eslint`
- `bcrypt`
- `jsonwebtoken`

## 📖 Документация к API

- Пользователи
  - `GET /user/me` - возвращает информацию о пользователе - **роут защищен авторизацией**
  - `POST /signup` — создает пользователя с переданными в теле `email`, `password`, `fullName`
  - `POST /signin` — проверяет переданные в теле `email` и `password` и возвращает `JWT`
- Статьи
  - `GET /posts` — возвращает все статьи
  - `GET /posts/:id` — возвращает конкретную статью по `id`
  - `GET /posts/tags` — возвращает последние 5 тегов
  - `POST /posts` — создаёт статью с переданными в теле `title`, `text`, `tags` и `imageUrl (опционально)` - **роут защищен авторизацией**
  - `DELETE /posts/:id` — удаляет статью по `id` - **роут защищен авторизацией**
  - `PATCH /posts/:id` — обновляет информацию статьи по `id`  - **роут защищен авторизацией**
- Изображения
  - `POST /uploads` — загружает изображение (файл изображения) для статьи на сервер  - **роут защищен авторизацией**

## 👨🏻‍💻 Развертывание проекта:

##### Клонировать репозиторий `git@github.com:alraskalov/blog-frontend.git`

##### `npm install` – установить зависимости проекта

##### `npm run start` – запуск сервера на http://localhost:3000/

##### `npm run dev` – запуск сервера с hot reload на http://localhost:3000/
