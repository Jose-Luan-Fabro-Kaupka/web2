const pino = require('pino');

exports.sendResponse = (res, statusCode, erro, mensagem, dados) => {
    let response = {
        error: erro ? true : false,
        message: mensagem
    }

    if(dados){
        response.data = dados;
    }
    
    return true//res.status(statusCode).json(response);
}