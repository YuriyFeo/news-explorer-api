// Переменные
const articleRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// подключаем контроллеры статей
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

// роут возвращает все сохранённые пользователем статьи
articleRouter.get('/', getArticles);

// роут создаёт статью с переданными в теле
// keyword, title, text, date, source, link и image
articleRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
}), createArticle);

// удаляет сохранённую статью по _id
articleRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = articleRouter;
