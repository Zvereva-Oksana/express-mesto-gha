const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const { validateRequest } = require('../utils/helpers');
const { paramsShemaCards, paramsShemaCardId } = require('../utils/schemas');

module.exports.getCard = (_req, res, next) => {
  Card
    .find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  validateRequest(paramsShemaCards, req.body);
  const { name, link } = req.body;
  const owner = req.user._id;
  Card
    .create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при создании карточки.'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  validateRequest(paramsShemaCardId, req.params);
  const { cardId } = req.params;
  Card
    .findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } else if (!JSON.stringify(card.owner).includes(req.user._id)) {
        throw new ForbiddenError('Попытка удалить чужую карточку.');
      } else {
        card.deleteOne().then(() => res.send({ message: 'Карточка успешно удалена' }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Передан несуществующий _id.'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  validateRequest(paramsShemaCardId, req.params);
  const { cardId } = req.params;
  Card
    .findByIdAndUpdate(
      cardId,
      {
        $addToSet: {
          likes: req.user._id,
        },
      },
      { new: true, runValidators: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные для постановки лайка.'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  validateRequest(paramsShemaCardId, req.params);
  const { cardId } = req.params;
  Card
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные для снятия лайка.'));
      }
      return next(err);
    });
};
