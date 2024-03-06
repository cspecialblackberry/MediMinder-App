const express = require('express')
const path = require('path')
const routes = require('./controllers')
const exphbs = require('express-handlebars')
const models = require('./models/index')

const sequelize = require('./config/connection')

const app = express()
const PORT = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(routes)

const syncApp = () => {
    try{
        sequelize.sync({ force: true }).then(() => {
            app.listen(PORT, () => console.log('Now listening'))
          })
    } catch (err) {
        console.error(error)
    }
}

syncApp()