const userRouter = require('express').Router();
const { getUser } = require('../controllers/users');

// Роуты пользователей
userRouter.get('/me', getUser);

module.exports = userRouter;
