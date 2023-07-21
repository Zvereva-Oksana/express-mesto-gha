const { Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const paramsShemaSingup = Joi.object({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().regex(/https?:\/\/(www)?[a-z0-9].{2,}/),
  email: Joi.string().required().regex(/\w+@\w+\.\w+/),
  password: Joi.string().required(),
});

const paramsShemaSingin = Joi.object({
  email: Joi.string().required().regex(/\w+@\w+\.\w+/),
  password: Joi.string().required(),
});

const paramsShemaUpdateUser = Joi.object({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
});

const paramsShemaUpdateAvatar = Joi.object({
  avatar: Joi.string().regex(/https?:\/\/(www)?[a-z0-9].{2,}/),
});

const paramsShemaCards = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().regex(/https?:\/\/(www)?[a-z0-9].{2,}/).required(),
});

const paramsShemaUserId = Joi.object({
  userId: Joi.objectId().required(),
});

const paramsShemaCardId = Joi.object({
  cardId: Joi.objectId().required(),
});

module.exports = {
  paramsShemaSingup,
  paramsShemaSingin,
  paramsShemaUpdateUser,
  paramsShemaUpdateAvatar,
  paramsShemaCards,
  paramsShemaUserId,
  paramsShemaCardId,
};
