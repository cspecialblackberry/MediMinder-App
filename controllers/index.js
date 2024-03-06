const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home', {loggedIn: false})
})

router.get('/login', (req, res) => {
    res.render('login', {loggedIn: false})
})

router.get('/create_account', (req, res) => {
    res.render('create-account', {loggedIn: false})
})

router.get('/user_account', (req, res) => {
    res.render('user-account', {loggedIn: false})
})

router.get('/medication_history', (req, res) => {
    res.render('medication-history', {loggedIn: false})
})

router.get('/medication_list', (req, res) => {
    res.render('medication-list', {loggedIn: false})
})

module.exports = router