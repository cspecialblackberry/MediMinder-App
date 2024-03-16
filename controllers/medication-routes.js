const router = require('express').Router()
const { Medication } = require('../models')

router.get('/:user_id', (req, res) => {
    try {
        Medication.findAll({
            where: {
                user_id: parseInt(req.params.user_id)
            }
        }).then((medicationData) => {
            res.json(medicationData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get('/api/:id', (req, res) => {
    try{
        Medication.findByPk(req.params.id).then((medicationData) => {
            res.json(medicationData)
        })
    }catch (err){
        res.status(400).json(err)
    }
})

router.post('/', (req, res) => {
    try {
        Medication.create(req.body).then((medicationData) => {
            res.json(medicationData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
})

router.put('/:id', (req, res) => {
    try {
        Medication.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then((medicationData) => {
            res.json(medicationData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete('/:id', (req, res) => {
    try {
        Medication.destroy({
            where: {
                id: req.params.id
            }
        }).then((medicationData) => {
            res.json(medicationData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
