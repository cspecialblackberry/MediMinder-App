const router = require('express').Router()
const User = require('../models/user')
const Calendar = require('../models/calendar')

router.get('/', (req, res) => {
    res.render('login', {loggedIn: req.session.loggedIn})
})

router.post('/', async (req, res) => {
    try{
        const userData = await User.findOne({
            where: {username: req.body.username},
        })

        if(!userData.dataValues){
            res.status(400).json('Incorrect username or password')
            return
        }

        const passwordCheck = await userData.checkPassword(req.body.password)

        if(!passwordCheck){
            res.status(400).json('Incorrect username or password')
            return
        }

        req.session.save(() => {
            req.session.loggedIn = true
            res.status(200).json(userData)
        })
    }catch(err){
        res.status(400).json(err)
    }
})

router.post('/logout', async (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).json({message: 'logged out'})
        })
    } else {
        res.status(400)
    }
})

module.exports = router