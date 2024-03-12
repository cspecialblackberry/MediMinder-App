const router = require('express').Router();
const { User } = require('../models');

router.get('/session', async (req, res) => {
  try {
    const user = req.session.user
    res.send({user})
  } catch (err) {
    res.status(400)
  }
})

router.patch('/', async (req, res) => {
  console.log(req.body)
  console.log(req.session.user.id)
  try {
    const timeInputData = await User.update(req.body,
      { where: { id: req.session.user.id } });
    res.status(200).json(timeInputData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;