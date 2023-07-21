const router = require('express').Router();

const {
  getUsers, getUserByID, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserByID);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
