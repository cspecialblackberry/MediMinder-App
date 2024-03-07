const router = require('express').Router()
const User = require('../models/user')
const Calendar = require('../models/calendar')

router.get('/', (req, res) => {
    res.render('login', {loggedIn: req.session.loggedIn})
})

router.post('/', async (req, res) => {
    console.log(req.body)
    try{
        const userData = await User.findOne({
            where: {username: req.body.username},
        })
        console.log(userData.dataValues)

        // if(!userData.dataValues){
        //     res.status(400).json('Incorrect username or password')
        //     return
        // }

        const passwordCheck = await userData.checkPassword(req.body.password)

        console.log(passwordCheck)

        if(!passwordCheck){
            res.status(400).json('Incorrect username or password')
            return
        }

        req.session.save(() => {
            req.session.loggedIn = true
            res.status(200)
        })

        res.json(userData)
    }catch(err){
        res.status(400).json(err)
    }
})

router.post('/logout', async (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200)
        })
    } else {
        res.status(400)
    }
})

module.exports = router