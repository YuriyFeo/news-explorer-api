const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { getUser } = require('../controllers/users');
const { createUser, login } = require('../controllers/users');


// Роуты пользователей
// userRouter.get('/me', getUser);
userRouter.get('/users/me', auth, getUser);

userRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

userRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8),
  }),
}), createUser);


module.exports = userRouter;
