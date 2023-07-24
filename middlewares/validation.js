const { celebrate, Segments, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { regexEmail, regexUrl } = require('../utils/constant');

const signinValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().regex(regexEmail),
    password: Joi.string().required(),
  }).unknown(true),
});

const signupValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexUrl),
    email: Joi.string().required().regex(regexEmail),
    password: Joi.string().required(),
  }).unknown(true),
});

const meIdValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    userId: Joi.objectId().required(),
  }).unknown(true),
});

const userIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.objectId().required(),
  }).unknown(true),
});

const updateUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().regex(regexUrl),
  }),
});

const cardsValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(regexUrl).required(),
  }).unknown(true),
});

const cardIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }).unknown(true),
});

module.exports = {
  signinValidation,
  signupValidation,
  meIdValidation,
  userIdValidation,
  updateUserValidation,
  updateAvatarValidation,
  cardsValidation,
  cardIdValidation,
};
