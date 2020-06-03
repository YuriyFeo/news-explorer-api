// определения настроек
const SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'local';

module.exports = {
  SECRET: SECRET_KEY,
  PORT: parseInt(process.env.PORT, 10) || 3000,
  DATABASE_URL: 'mongodb://localhost:27017/diplom',
};
