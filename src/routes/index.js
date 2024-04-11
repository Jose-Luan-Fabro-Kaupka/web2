const express = require('express');
const router = express.Router();
const artigosController = require('../controllers/ArtigosController');
const usuariosController = require('../controllers/UsuariosController');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var db = require('../config/db_sequelize');

var ensureLoggedIn = ensureLogIn();


//Artigos
router.get('/artigos', (req, res) => artigosController.getArtigos(req, res));

router.post('/artigos', (req, res) => artigosController.postArtigos(req, res));

router.put('/artigos/:id', (req, res) => artigosController.putArtigos(req, res));

router.delete('/artigos/:id', (req, res) => artigosController.deleteArtigos(req, res));

//Usuários

router.get('/usuarios', (req, res) => usuariosController.getUsuarios(req, res));

router.post('/usuarios', (req, res) => usuariosController.postUsuarios(req, res));

router.put('/usuarios/:id', (req, res) => usuariosController.putUsuarios(req, res));

router.delete('/usuarios/:id', (req, res) => usuariosController.deleteUsuarios(req, res));

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.user) { return res.render('home'); }
    next();
});


module.exports = router;