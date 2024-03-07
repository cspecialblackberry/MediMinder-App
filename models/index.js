const User = require('./user')
const Calendar = require('./calendar')

Calendar.belongsTo(User)
User.hasMany(Calendar)

module.exports = {User, Calendar}
