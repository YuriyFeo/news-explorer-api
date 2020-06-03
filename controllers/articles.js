// Переменные
const Article = require('../models/article');
const Error404 = require('../errors/err404.js');
const Error403 = require('../errors/err403.js');

// Получаем статьи пользователя
module.exports.getArticles = (req, res, next) => {
  const ownerId = req.user._id;
  Article.find({ owner: ownerId })
    .then((article) => {
      res.send(article);
    })
    .catch(next);
};

// Создаем статью
module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const ownerId = req.user._id;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: ownerId,
  })
    .then((article) => {
      res.send(article);
    })
    .catch(next);
};

// Удаляем статью
/* module.exports.deleteArticle = (req, res, next) => {
    const { articleId } = req.params;
    const ownerId = req.user._id;
    Article.findById(articleId).select('+owner')
        .then((article) => {
            if (!article) {
                throw new Error404('Что-то пошло не так');
            }
            if (article.owner.toString() !== ownerId) {
                throw new Error401('Что-то пошло не так');
            }
            Article.findByIdAndRemove(articleId)
                .then((article) => {
                    if (!article) {
                        throw new Error404('Что-то пошло не так');
                    }
                    res.send(article);
                })
                .catch(next);
        })
        .catch(next);
};
*/

//  удаляет статью по идентификатору
module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const ownerId = req.user._id;

  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        throw new Error404('Нет статьи с таким id');
      }
      return article.owner.equals(ownerId);
    })
    .then((isMatch) => {
      if (!isMatch) {
        throw new Error403('Невозможно удалить чужую карточку');
      }
      return Article.findByIdAndRemove(articleId);
    })
    .then((articleRemove) => {
      if (!articleRemove) {
        throw new Error403('Невозможно удалить чужую карточку');
      }
      res.send({ remove: articleRemove });
    })
    .catch(next);
};
