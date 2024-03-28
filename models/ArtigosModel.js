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
        autores:{
        }
    });
}