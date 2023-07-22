const router = require('express').Router();

const { celebrate, Segments, Joi } = require('celebrate');
const {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCard);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(/https?:\/\/(www)?[a-z0-9].{2,}/).required(),
  }).unknown(true),
}), createCard);

router.delete('/:cardId', celebrate({
  [Segments.BODY]: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  [Segments.BODY]: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }).unknown(true),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  [Segments.BODY]: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }).unknown(true),
}), dislikeCard);

module.exports = router;
