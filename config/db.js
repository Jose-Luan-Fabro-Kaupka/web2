const Sequelize = require ("sequelize");
const config = require("./config/config")

const sequelize = new Sequelize(config.name, config.user, config.password, {
    host: config.host,
    dialect: "postgres"
})