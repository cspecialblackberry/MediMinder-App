const express = require('express')

const sequelize = require('./config/connection')

const app = express()
const PORT = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const syncApp = () => {
    try{
        sequelize.sync({ force: false }).then(() => {
            app.listen(PORT, () => console.log('Now listening'));
          })
    } catch (err) {
        console.error(error)
    }
}

syncApp()