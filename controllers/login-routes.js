const router = require('express').Router()
const User = require('../models/user')
const Calendar = require('../models/calendar')

router.get('/', (req, res) => {
    console.log(req.session)
    res.render('login', {loggedIn: req.session.loggedIn})
})

router.post('/', async (req, res) => {
    console.log(req.body)
    try{
        const userData = await User.findOne({
            where: {username: req.body.username},
        })
        console.log(userData.dataValues)

        if(!userData.dataValues){
            res.status(400).json('Incorrect username or password')
            return
        }

        const passwordCheck = await userData.checkPassword(req.body.password)

        console.log(passwordCheck)

        if(!passwordCheck){
            res.status(400).json('Incorrect username or password')
            return
        }

        req.session.save(() => {
            req.session.loggedIn = true
            res.status(200).json(userData)
        })
        console.log('logged in', req.session)

    }catch(err){
        res.status(400).json(err)
    }
})

router.post('/logout', async (req, res) => {
    console.log('run')
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).json({message: 'logged out'})
        })
    } else {
        res.status(400)
    }
    console.log(req.session)
})

module.exports = router