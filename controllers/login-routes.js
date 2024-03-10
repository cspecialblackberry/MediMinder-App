const router = require('express').Router()
const User = require('../models/user')
const Calendar = require('../models/calendar')

router.get('/', (req, res) => {
    res.render('login', { loggedIn: req.session.loggedIn })
})

router.post('/', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username },
        })

        if (!userData.dataValues) {
            res.status(400).json('Incorrect username or password')
            return
        }

        const passwordCheck = await userData.checkPassword(req.body.password)

        if (!passwordCheck) {
            res.status(400).json('Incorrect username or password')
            return
        }
        console.log(userData.dataValues)
        req.session.save(() => {
            req.session.loggedIn = true
            req.session.user = {user: userData.dataValues.username}
            res.status(200).json(req.session)
        })
        console.log(req.session)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/logout', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(200).json({ message: 'logged out' })
            })
        } else {
            res.status(400)
        }
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router