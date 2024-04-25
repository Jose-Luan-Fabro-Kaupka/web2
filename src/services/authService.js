const passport = require('passport');
const userService = require('./userService');

exports.authenticate =  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?fail=true'
})

exports.signup = (req, res, next) => {
    // Signup logic
};
