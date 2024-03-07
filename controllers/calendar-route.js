const router = require('express').Router()
const Calendar = require('../models/calendar')

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
        Calendar.findAll(req.body, {
            where: {
                user_id: req.params.user_id,
                year: req.params.year,
                month: req.params.month
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