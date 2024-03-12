const User = require('../models/user')
const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('create-account', {loggedIn: req.session.loggedIn})
})

router.post('/', async (req, res) => {
    try {
        const accountData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const id = accountData.dataValues.id
        const username = accountData.dataValues.username
        const password = accountData.dataValues.password

        req.session.save(() => {
            req.session.authenticated = true
            req.session.user = { id, username, password}
            res.status(200).json(accountData)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router