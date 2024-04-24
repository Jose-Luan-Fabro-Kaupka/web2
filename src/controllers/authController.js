const express = require('express');
const passport = require('passport');
const router = express.Router();
const authService = require('../services/authService');

router.get('/login', (req, res, next) => {
    // Render login page
});

router.post('/login/password', authService.authenticate);

router.post('/logout', (req, res, next) => {
    // Logout logic
});

router.get('/signup', (req, res, next) => {
    // Render signup page
});

router.post('/signup', authService.signup);

module.exports = router;
