const db = require('../config/db');

exports.usuariosCriar = async (dados) => {
    const novousuario = await db.create(dados);
    return novousuario;
}

exports.usuariosConsultar = async () => {
    try {
        const usuarios = await db.usuarios.findAll(); 
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

    if(dados.titulo){
        dadosAtualizar.titulo = dados.titulo;
    }

    if(dados.resumo){
        dadosAtualizar.resumo = dados.resumo;
    }

    if(dados.link){
        dadosAtualizar.link = dados.link;
    }

    await db.usuarios.update(dadosAtualizar, {
        where:{
            id: id
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
