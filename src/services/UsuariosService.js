const db = require('../config/db_sequelize').db;

exports.usuariosCriar = async (dados) => {
    try{
        const novousuario = await db.usuarios.create(dados);
        return novousuario;
    } catch (error) {
        console.error('Erro ao cadastras usuário:', error);
        throw new Error('Erro ao cadastrar usuário. Detalhes no console.');
    }
}

exports.usuariosConsultar = async () => {
    try {
        const usuarios = await db.usuarios.findAll({
            order: [['id', 'ASC']]
        }); 
        return usuarios;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw new Error('Erro ao buscar usuários. Detalhes no console.');
    }
}

exports.usuariosEditar = async (dados) => {
    const usuario = await db.usuarios.findByPk(dados.id);

    if(!usuario){
        throw new Error(404, 'Usuário não encontrado', undefined);
    }

    const dadosAtualizar = {}

    if(dados.nome){
        dadosAtualizar.nome = dados.nome;
    }

    if(dados.email){
        dadosAtualizar.email = dados.email;
    }

    if(dados.login){
        dadosAtualizar.login = dados.login;
    }

    if(dados.senha){
        dadosAtualizar.senha = dados.senha;
    }

    if(dados.tipo){
        dadosAtualizar.tipo = dados.tipo;
    }

    await db.usuarios.update(dadosAtualizar, {
        where:{
            id: dados.id
        }
    });

    const usuarioAtualizado = db.usuarios.findByPk(dados.id);

    return usuarioAtualizado;
}

exports.usuariosDeletar = async (id) => {
    const usuario = await db.usuarios.findByPk(id);

    if(!usuario){
        throw new Error(404, 'Usuário não encontrado', undefined);
    }

    await db.usuarios.destroy({
        where:{
            id: id
        }
    });
}
