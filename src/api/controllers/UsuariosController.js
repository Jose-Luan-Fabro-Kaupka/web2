const service = require('../services/UsuariosService');
const responses = require('../helper/Responses')


exports.postUsuarios = async (req, res) => {
    const {titulo, resumo, link, id_autor} = req.body;

    if(!titulo || !resumo || !link || !id_autor){
        return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null);
    }

    const dados = {titulo, resumo, link, id_autor}
    const result = await service.usuariosCriar(dados);
    return responses.sendResponse(res, 201, false, 'Usuário criado com sucesso.', result);
}

exports.getUsuarios = async (req, res) => {
    try {
        const result = await service.usuariosConsultar(req.params);
        return responses.sendResponse(res, 200, false, 'OK.', result);
    } catch (error) {
        return responses.sendResponse(res, 500, true, 'Erro ao buscar usuarios', null);
    }
}

exports.putUsuarios = async (req, res) => {
    const { id } = req.params;

    if(!id){
        return responses.sendResponse(res, 400, true, 'Índice não informado.', null);
    }

    const {nome, email, login, senha, tipo} = req.body;
    const dados = {id, nome, email, login, senha, tipo};
    const result = service.usuariosEditar(dados);
    return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.deleteUsuarios = async (req, res) => {
    const { id } = req.params;

    if(!id){
        return responses.sendResponse(res, 400, true, 'Índice não informado.', null);
    }

    await service.usuariosDeletar(id);

    return responses.sendResponse(res, 204, false, 'Usuário eliminado com sucesso.', null);
}