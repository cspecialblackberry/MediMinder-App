const path = require('path')
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const models = require('./models/index')
const User = require('./models/user')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sequelize = require('./config/connection')
const routes = require('./controllers')

const app = express()
const PORT = 3001

const sess = {
    secret: 'Medical Monsters',
    resave: false,
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    })
}

app.use(session(sess))

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(routes)

const syncApp = () => {
    try{
        sequelize.sync({ force: false }).then(() => {
            app.listen(PORT, () => console.log('Now listening'))
          })
    } catch (err) {
        console.error(err)
    }
}

syncApp()