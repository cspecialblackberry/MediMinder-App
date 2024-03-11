const { User } = require('../models');

const router = require('express').Router();

router.put('/', async (req, res) => {
  console.log (req.body)
  console.log(req.session.user.username)
  try {
    const timeInputData = await User.update(req.body, 
      {where: {username: req.session.user.username}});
    res.status(200).json(timeInputData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;