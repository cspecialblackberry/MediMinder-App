const router = require('express').Router()
const { Calendar, User } = require('../models')

router.get('/', (req, res) => {
    try {
        Calendar.findAll().then((calendarData) => {
            res.json(calendarData)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/:id', (req, res) => {
    try {
        Calendar.findByPk(req.params.id).then((calendarData) => {
            res.json(calendarData)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/:user_id/:year/:month', (req, res) => {
    try {
        Calendar.findAll({
            where: {
                user_id: parseInt(req.params.user_id),
                year: parseInt(req.params.year),
                month: parseInt(req.params.month)
            }
        }).then((calendarData) => {
            res.json(calendarData)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/', (req, res) => {
    try {
        Calendar.create(req.body).then((calendarData) => {
            res.json(calendarData)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/:id', (req, res) => {
    try {
        Calendar.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then((calendarData) => {
            res.json(calendarData)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', (req, res) => {
    try {
        Calendar.destroy({
            where: {
                id: req.params.id
            }
        }).then((calendarData) => {
            res.json(calendarData)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router