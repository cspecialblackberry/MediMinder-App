const User = require('./user')
const Calendar = require('./calendar')
const Medication = require('./medication')

Calendar.belongsTo(User)
User.hasMany(Calendar)

Medication.belongsTo(User)
User.hasMany(Medication)

module.exports = {User, Calendar, Medication}
