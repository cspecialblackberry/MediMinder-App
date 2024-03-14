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

router.get('/:id', async (req, res) => {
  try {
    const response = await User.findByPk(req.params.id)
    res.json(response)
  } catch (err) {
    res.status(400)
  }
})

router.patch('/', async (req, res) => {
  try {
    const timeInputData = await User.update(req.body,
      { where: { id: req.session.user.id } });
    res.status(200).json(timeInputData);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.delete('/delete', async (req, res) => {
  try {
      const userDelete = await User.destroy({where: {id: req.session.user.id}})
      
      req.session.destroy(() => {
        res.status(200).json(userDelete)
      })

  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router