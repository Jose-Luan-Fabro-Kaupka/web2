const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Usuario', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tipo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    });
};
