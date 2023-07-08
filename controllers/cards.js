const Card = require('../models/card');
const { isIdValidity } = require('../helpers/utils');

module.exports.getCard = (_req, res) => {
  Card
    .find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка.' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card
    .create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  isIdValidity(cardId, res);
  Card
    .findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send(card);
    })
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка.' }));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  isIdValidity(cardId, res);
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
        return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      }
      return res.status(500).send(
        {
          message: 'На сервере произошла ошибка.',
        },
      );
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  isIdValidity(cardId, res);
  Card
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка.' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};
