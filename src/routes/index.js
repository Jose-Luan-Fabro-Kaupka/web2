const express = require('express');
const router = express.Router();
const artigosController = require('../controllers/ArtigosController');
const usuariosController = require('../controllers/usuariosController');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
const passport = require("passport");
const authController = require('../controllers/authController');
const authService = require('../services/authService')
const artigoService = require('../services/ArtigosService')
const db = require('../config/db_sequelize')
const homeController = require('../controllers/homeController')

var ensureLoggedIn = ensureLogIn();

//Artigos
router.get('/artigos', (req, res) => artigosController.getArtigos(req, res));

router.post('/artigos', (req, res) => artigosController.postArtigos(req, res));

router.put('/artigos/:id', (req, res) => artigosController.putArtigos(req, res));

router.delete('/artigos/:id', (req, res) => artigosController.deleteArtigos(req, res));

//Usuários

router.get('/usuarios',  usuariosController.getAllUsers);

router.post('/usuarios',(req, res) =>  usuariosController.createUser);

router.put('/usuarios/:id', (req, res) =>  usuariosController.updateUser);

router.delete('/usuarios/:id',(req, res) =>   usuariosController.deleteUser);

/* GET home page. */
router.get('/', homeController.renderHome)
router.get('/home', homeController.renderHome);


router.get('/artigos/add', artigosController.renderAddArtigo)

router.get('/artigos/:id', artigosController.renderArtigo)




module.exports = router;
