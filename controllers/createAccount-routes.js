const User = require('../models/user')
const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('create-account', {loggedIn: req.session.loggedIn})
})

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const accountData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        req.session.save(() => {
            req.session.loggedIn = true
            res.status(200).json(accountData)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router