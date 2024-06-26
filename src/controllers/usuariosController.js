const { Op } = require("sequelize");
const db = require('../config/db_sequelize').db;
const Usuario = db.usuarios; // Importar modelo de usuário do seu arquivo de configuração

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Usuario.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).json({ message: 'Erro ao obter usuários', error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await Usuario.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, login, senha, tipo } = req.body;
    try {
        const [updated] = await Usuario.update({ nome, email, login, senha, tipo }, {
            where: { id },
            returning: true // Retorna o registro atualizado
        });
        if (updated === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        const updatedUser = await Usuario.findByPk(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Usuario.destroy({
            where: { id }
        });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        return res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
    }
};
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Usuario.destroy({
            where: { id }
        });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        return res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
    }
};


exports.renderAdminUsers = async (req, res) => {
    try {
        const users = await Usuario.findAll();
        res.render('adminUsers.ejs', { users });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao buscar usuários.');
    }
};

exports.renderAtualizaUser = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.id);
        res.render('atualizaUsuario.ejs', { user });
    } catch (error) {
        console.error('Erro ao buscar usuário para atualização:', error);
        res.status(500).send('Erro ao buscar usuário para atualização.');
    }
};
