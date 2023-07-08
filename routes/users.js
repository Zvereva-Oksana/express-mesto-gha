const router = require('express').Router();

const {
  getUsers, getUserByID, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserByID);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
