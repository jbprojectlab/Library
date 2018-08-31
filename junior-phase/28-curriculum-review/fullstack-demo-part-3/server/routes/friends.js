const router = require('express').Router();

const db = require('../db');
const Friend = db.model('friend');

router.post('/', async (req, res, next) => {
  try {
    const friend = await Friend.create(req.body);
    const friendUser = await friend.getUserB();
    res.json(friendUser)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
