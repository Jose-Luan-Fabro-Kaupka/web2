const service = require('../services/ArtigosService');
const responses = require('../helper/Responses');

// Cria um novo artigo
exports.postArtigos = async (req, res) => {
    try {
        const { titulo, resumo, link, id_autor } = req.body;

        if (!titulo || !resumo || !link || !id_autor) {
            return res.status(400).json({
                success: false,
                message: 'Campos obrigatórios não informados.'
            });
        }

        const dados = { titulo, resumo, link, id_autor };
        const novoArtigo = await service.artigosCriar(dados);

        return res.status(201).json({
            success: true,
            message: 'Artigo criado com sucesso.',
            data: novoArtigo
        });
    } catch (error) {
        console.error('Erro ao criar artigo:', error);
        return res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao criar o artigo.'
        });
    }
};

// Obtém todos os artigos
exports.getArtigos = async (req, res) => {
    try {
        const result = await service.artigosConsultar(req.params);
        return res.status(200).json({
            success: true,
            message: 'Artigos encontrados com sucesso.',
            data: result
        });
    } catch (error) {
        console.error('Erro ao buscar artigos:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao buscar artigos.'
        });
    }
};

// Atualiza um artigo existente
exports.putArtigos = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Índice não informado.'
            });
        }

        const { titulo, resumo, link } = req.body;
        const dados = { id, titulo, resumo, link };
        const result = await service.artigosEditar(dados);

        return res.status(200).json({
            success: true,
            message: 'Artigo atualizado com sucesso.',
            data: result
        });
    } catch (error) {
        console.error('Erro ao atualizar artigo:', error);
        return res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao atualizar o artigo.'
        });
    }
};

// Deleta um artigo existente
exports.deleteArtigos = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Índice não informado.'
            });
        }

        await service.artigosDeletar(id);

        return res.status(204).json({
            success: true,
            message: 'Artigo eliminado com sucesso.'
        });
    } catch (error) {
        console.error('Erro ao deletar artigo:', error);
        return res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao deletar o artigo.'
        });
    }
};

// Renderiza a página de um artigo específico
exports.renderArtigo = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Índice não informado.'
            });
        }

        const artigo = await service.artigoConsultarId(id);

        if (!artigo) {
            return res.redirect('/');
        }

        return res.render('artigo', {
            artigo: artigo
        });
    } catch (error) {
        console.error('Erro ao consultar artigo:', error);
        return res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao consultar o artigo.'
        });
    }
};

// Renderiza a página para adicionar um novo artigo
exports.renderAddArtigo = async (req, res) => {
    try {
        return res.render('criaArtigo.ejs', {
            user: req.user
        });
    } catch (error) {
        console.error('Erro ao renderizar página para adicionar artigo:', error);
        return res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao renderizar a página para adicionar artigo.'
        });
    }
};
