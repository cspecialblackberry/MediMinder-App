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

        req.session.save(() => {
            req.session.authenticated = true
            res.status(200).json(accountData)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router