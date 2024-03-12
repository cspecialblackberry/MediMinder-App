const router = require('express').Router()
const createAccount = require('./createAccount-routes')
const calendarRoutes = require('./calendar-route')
const loginRoutes = require('./login-routes')
const userRoutes = require('./user-routes')
const medicationRoutes = require('./medication-routes')
const authRedirect = require('../public/js/auth')

router.use('/user', userRoutes)
router.use('/api/calendar', calendarRoutes)
router.use('/medication', medicationRoutes)
router.use('/create_account', createAccount)
router.use('/login', loginRoutes)

router.get('/', authRedirect, (req, res) => {
    res.render('home', {loggedIn: req.session.loggedIn})
})

router.get('/login', (req, res) => {
    res.render('login', {loggedIn: req.session.loggedIn})
})

router.get('/user_account', authRedirect, (req, res) => {
    res.render('user-account', {loggedIn: req.session.loggedIn})
})

router.get('/medication_history', authRedirect, (req, res) => {
    res.render('medication-history', {loggedIn: req.session.loggedIn})
})

router.get('/medication_list', authRedirect, (req, res) => {
    res.render('medication-list', {loggedIn: req.session.loggedIn})
})



module.exports = router