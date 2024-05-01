const db = require('../config/db_sequelize').db;

exports.artigosCriar = async (dados) => {
    const novoArtigo = await db.artigos.create(dados);
    return novoArtigo;
}

exports.artigosConsultar = async () => {
    try {
        const artigos = await db.artigos.findAll({
            order: [['id', 'ASC']]
        });
        return artigos;
    } catch (error) {
        console.error('Erro ao buscar artigos:', error);
        throw new Error('Erro ao buscar artigos. Detalhes no console.');
    }
}

exports.artigosEditar = async (dados) => {
    const artigo = await db.artigos.findByPk(dados.id);

    if(!artigo){
        throw new Error(404, 'Artigo não encontrado', undefined);
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

    if(dados.nota1){
        dadosAtualizar.nota1 = dados.nota1;
    }

    if(dados.nota2){
        dadosAtualizar.nota2 = dados.nota2;
    }

    await db.artigos.update(dadosAtualizar, {
        where:{
            id: dados.id
        }
    });

    const artigoAtualizado = db.artigos.findByPk(dados.id);

    return artigoAtualizado;
}

exports.avaliar = async (dados) => {
    const artigo = await db.artigos.findByPk(dados.id);

    if(!artigo){
        throw new Error(404, 'Artigo não encontrado', undefined);
    }

    const dadosAtualizar = {};

    if(dados.nota1){
        dadosAtualizar.nota1 = dados.nota1;
    }

    if(dados.nota2){
        dadosAtualizar.nota2 = dados.nota2;
    }

    await db.artigos.update(dadosAtualizar, {
        where:{
            id: dados.id
        }
    });

    const artigoAtualizado = db.artigos.findByPk(dados.id);

    return artigoAtualizado;
}

exports.artigosDeletar = async (id) => {
    const artigo = await db.artigos.findByPk(id);

    if(!artigo){
        throw new Error(404, 'Artigo não encontrado', undefined);
    }

    await db.artigos.destroy({
        where:{
            id: id
        }
    });
}

exports.artigoConsultarId = async  (id) =>{
    const artigo = await db.artigos.findByPk(id);
    if(!artigo){
        throw new Error(404, 'Artigo não encontrado', undefined);
    }
    return artigo
}
