const router = require('express').Router()
const createAccount = require('./createAccount-routes')

router.get('/', (req, res) => {
    res.render('home', {loggedIn: req.session.loggedIn})
})

router.get('/login', (req, res) => {
    res.render('login', {loggedIn: req.session.loggedIn})
})

router.get('/user_account', (req, res) => {
    res.render('user-account', {loggedIn: req.session.loggedIn})
})

router.get('/medication_history', (req, res) => {
    res.render('medication-history', {loggedIn: req.session.loggedIn})
})

router.get('/medication_list', (req, res) => {
    res.render('medication-list', {loggedIn: req.session.loggedIn})
})

router.use('/create_account', createAccount)

module.exports = router