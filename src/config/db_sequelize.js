const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://banco_web_user:DBLfO7P3xLm9HHruszCxONoF6F9zrwNq@dpg-cobd7nv109ks738hh5p0-a.oregon-postgres.render.com/banco_web', {
  dialectOptions: {
    ssl: {
      require: true, // Set to true if the server requires SSL/TLS connection
      rejectUnauthorized: false // Disable SSL verification
    }
  }
});

var db = {}


db.usuarios = require('../models/UsuariosModel')(sequelize, Sequelize);
db.artigos = require('../models/ArtigosModel')(sequelize, Sequelize);

db.artigos.belongsTo(db.usuarios, {
    as: 'autor', // Define um alias para a relação
    foreignKey: 'id_autor' // Define a chave estrangeira na tabela de artigos que referencia a tabela de usuários
});

const start = async (credentials) => {
    try {
      await sequelize.authenticate();
  
      for (const key in db) {
        if (db[key].sync) {
          const model = db[key];
          const tableExists = await model.sync({force: false});
  
          if(!tableExists){
            await db[key].sync({force: true});
          }
          console.log(`Tabela para ${key} sincronizada.`);
        }
      }
  
    } catch (error) {
      console.error('Falha na conexão: ', error);
    }
  };

module.exports = {
    sequelize: sequelize,
    db: db,
    start: start
};
