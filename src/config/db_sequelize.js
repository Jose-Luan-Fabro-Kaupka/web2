const Sequelize = require ('sequelize');
const config = require("./config")

const sequelize = new Sequelize(config.name, config.user, config.password, {
    host: config.host,
    dialect: "postgres"
})

var db = {}


db.usuarios = require('../api/models/UsuariosModel')(sequelize, Sequelize);
db.artigos = require('../api/models/ArtigosModel')(sequelize, Sequelize);

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
