module.exports = (sequelize, Sequelize) => {
    const usuarios = sequelize.define('Usuarios', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome:{
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false
        },
        login:{
            type: Sequelize.STRING,
            allowNull: false
        },
        senha:{
            type: Sequelize.STRING,
            allowNull: false
        },
        tipo:{
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return usuarios;
}