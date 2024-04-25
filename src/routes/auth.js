const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
    if (req.query.fail)
        res.render("login.ejs", { message: 'Usuário e/ou senha inválidos!' });
    else
        res.render("login.ejs", { message: null });
});

router.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?fail=true'
}));

module.exports = router;
