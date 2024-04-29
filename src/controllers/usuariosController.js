// controllers/usuariosController.js
const db = require('../config/db_sequelize').db;
const Usuarios = require('../models/UsuariosModel');

// Obtém todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.usuarios.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter usuários', error: error.message });
    }
};


// Cria um novo usuário
exports.createUser = async (req, res) => {
    try {
        dados = req.body
        const newUser = await db.usuarios.create(dados);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
};

// Atualiza um usuário existente
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, login, senha, tipo } = req.body;
    try {
        const user = await db.usuarios.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        user.nome = nome;
        user.email = email;
        user.login = login;
        user.senha = senha;
        user.tipo = tipo;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
};

// Exclui um usuário
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.usuarios.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        await user.destroy();
        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
    }
};
