const router = require('express').Router();
const {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardsValidation, cardIdValidation } = require('../middlewares/validation');

router.get('/', getCard);
router.post('/', cardsValidation, createCard);
router.delete('/:cardId', cardIdValidation, deleteCard);
router.put('/:cardId/likes', cardIdValidation, likeCard);
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;
