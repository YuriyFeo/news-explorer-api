// подключаем модуль mongoose для работы с базой данных
const mongoose = require('mongoose');
// полключаем модуль bcryptjs для хеширования
const bcrypt = require('bcryptjs');

const isEmail = require('validator/lib/isEmail');

// Опишем схему:
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    required: true,
    type: String,
    select: false,
    minlength: 8,
  },
});


userSchema.statics.findUserByCredentials = function fun(email, password) {
  // попытка найти пользователя по email
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // сравниваем полученный и сохраненный в базе хеши (возвращает true или false)
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          // хеши не совпали — отклоняем промис
          if (!matched) {
            throw Promise.reject(new Error('Неправильные почта или пароль'));
          }
          // аутентификация успешна
          return user;
        });
    })
    .catch((error) => error);
};


module.exports = mongoose.model('user', userSchema);
