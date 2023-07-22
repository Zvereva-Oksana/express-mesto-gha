const router = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const {
  getUsers, getUserByID, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    userId: Joi.objectId().required(),
  }).unknown(true),
}), getCurrentUser);

router.get('/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.objectId().required(),
  }).unknown(true),
}), getUserByID);

router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().regex(/https?:\/\/(www)?[a-z0-9].{2,}/),
  }),
}), updateAvatar);

module.exports = router;
