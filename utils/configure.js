const { DB_URL, JWT_SECRET } = process.env;

module.exports = {
  MONGO_URL: DB_URL || 'mongodb://localhost:27017/blog',
  TOKEN_SECRET: JWT_SECRET || 'super-strong-secret',
};
