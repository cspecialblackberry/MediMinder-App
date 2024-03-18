//checks if user is logged and redirects to login if not
const authRedirect = (req, res, next) => {
if(!req.session.loggedIn){
    res.redirect('/login')
}else {
    next()
}
}

module.exports = authRedirect