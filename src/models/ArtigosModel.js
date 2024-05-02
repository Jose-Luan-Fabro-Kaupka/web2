const {Sequelize} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const artigos = sequelize.define('Artigos', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        titulo:{
            type: Sequelize.STRING,
            allowNull: false
        },
        resumo:{
            type: Sequelize.STRING,
            allowNull: false
        },
        link:{
            type: Sequelize.STRING,
            allowNull: false
        },
        nota1: {
            type: Sequelize.FLOAT,
            alolownull: true
        },
        nota2: {
            type: Sequelize.FLOAT,
            alolownull: true
        },
        nota3: {
            type: Sequelize.FLOAT,
            alolownull: true
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
    return artigos;
};
