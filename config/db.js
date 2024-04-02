const Sequelize = require ("sequelize");
const config = require("./config/config")

const sequelize = new Sequelize(config.name, config.user, config.password, {
    host: config.host,
    dialect: "postgres"
})

var db = {}

db.artigos = require('../models/ArtigosModel');
db.usuarios = require('../models/UsuariosModel');

db.artigos.belongsTo(db.usuarios, {
    as: 'autor',
    foreignKey: 'id_autor'
});

module.exports = db;
