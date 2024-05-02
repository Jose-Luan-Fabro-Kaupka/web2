const express = require('express');
const router = express.Router();
const artigosController = require('../controllers/ArtigosController');
const usuariosController = require('../controllers/usuariosController');
const homeController = require('../controllers/homeController')

//Middlewares
function isAuthenticatedAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.tipo === 'Administrador') {
        return next();
    }
    res.redirect('/auth/login');
}
function isAuthenticatedAutor(req, res, next) {
    if (req.isAuthenticated() && (req.user.tipo === 'Administrador' || req.user.tipo ==='Autor')) {
        return next();
    }
    res.redirect('/auth/login');
}



//Artigos
router.get('/artigos', (req, res) => artigosController.getArtigos(req, res));

router.post('/artigos', (req, res) => artigosController.postArtigos(req, res));

router.put('/artigos/:id', (req, res) => artigosController.putArtigos(req, res));

router.put('/artigos/avaliar/:id', (req, res) => artigosController.putArtigosAvaliar(req, res));

router.delete('/artigos/:id', (req, res) => artigosController.deleteArtigos(req, res));

//Usuários

router.get('/usuarios',  usuariosController.getAllUsers);

router.post('/usuarios',(req, res) =>  usuariosController.createUser);

router.put('/usuarios/:id', (req, res) =>  usuariosController.updateUser);

router.delete('/usuarios/:id',(req, res) =>   usuariosController.deleteUser);

/* GET home page. */
router.get('/', homeController.renderHome)
router.get('/home', homeController.renderHome);


router.get('/artigos/add',isAuthenticatedAutor, artigosController.renderAddArtigo)

router.get('/artigos/:id', artigosController.renderArtigo)

router.get('/admin/users',isAuthenticatedAdmin, usuariosController.renderAdminUsers)

router.get('/admin/users/:id',isAuthenticatedAdmin, usuariosController.renderAtualizaUser)




module.exports = router;
