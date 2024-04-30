const service = require('../services/ArtigosService');
const responses = require('../helper/Responses')


exports.postArtigos = async (req, res) => {
    const {titulo, resumo, link, id_autor} = req.body;

    if(!titulo || !resumo || !link || !id_autor){
        return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null);
    }

    const dados = {titulo, resumo, link, id_autor}
    const result = await service.artigosCriar(dados);
    return responses.sendResponse(res, 201, false, 'Artigo criado com sucesso.', result);
}

exports.getArtigos = async (req, res) => {
    try {
        const result = await service.artigosConsultar(req.params);
        return responses.sendResponse(res, 200, false, 'OK.', result);
    } catch (error) {
        return responses.sendResponse(res, 500, true, 'Erro ao buscar artigos', null);
    }
}

exports.putArtigos = async (req, res) => {
    const { id } = req.params;

    if(!id){
        return responses.sendResponse(res, 400, true, 'Índice não informado.', null);
    }

    const {titulo, resumo, link} = req.body;
    const dados = {id, titulo, resumo, link};
    const result = service.artigosEditar(dados);
    return responses.sendResponse(res, 200, false, 'OK.', result);
}

exports.putArtigosAvaliar = async (req, res) =>{
    const id = req.params;

    if(!id){
        return responses.sendResponse(res, 400, true, 'Índice não informado.', null);
    }
    const {nota1, nota2} = req.boy;
    const dados = {id, nota1, nota2};
    const result = service.avaliar(dados);
    return responses.sendResponse(res, 200, false, 'OK.', result);
}

exports.deleteArtigos = async (req, res) => {
    const { id } = req.params;

    if(!id){
        return responses.sendResponse(res, 400, true, 'Índice não informado.', null);
    }

    await service.artigosDeletar(id);

    return responses.sendResponse(res, 204, false, 'Artigo eliminado com sucesso.', null);
}

exports.renderArtigo = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return responses.sendResponse(res, 400, true, 'Índice não informado.', null);
    }

    try {
        let artigo = null;

            artigo = await service.artigoConsultarId(id);
            return res.render('artigo', {
                artigo: artigo
            });

    } catch (error) {
        console.error("Ocorreu um erro:", error);
        return responses.sendResponse(res, 500, true, 'Erro ao consultar o artigo.', null);
    }
};