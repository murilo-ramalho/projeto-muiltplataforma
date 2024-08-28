const express = require('express');
const Usuario = require('../models/usuario');
const Perfil = require('../models/perfil');
const bcrypt = require('bcryptjs');
const utils = require('../utils/utils');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    const JWT_KEY = utils.JWT_KEY;
    const { email, senha } = req.body;
    let usuarioEncontrado;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: 'Credenciais inválidas!'
        });
    }

    Usuario.findOne({ where: { email: email } })
        .then(usuario => {
            if (!usuario) {
                return res.status(401).json({
                    mensagem: 'Credenciais inválidas!'
                });
            }
            usuarioEncontrado = usuario;
            return bcrypt.compare(senha, usuario.senha);
        })
        .then(isMatch => {
            if (!isMatch) {
                return res.status(401).json({
                    mensagem: 'Credenciais inválidas!'
                });
            }
            const token = jwt.sign(
                { email: usuarioEncontrado.email, id: usuarioEncontrado.id },
                JWT_KEY,
                { expiresIn: '1h' }
            );
            return res.status(200).json({
                token: token,
                expiresIn: 3600
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
}

exports.create = (req, res, next) => {
    const { email, senha, perfilId } = req.body;

    if (!email || !senha || !perfilId) {
        return res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    }

    Usuario.findOne({ where: { email: email } })
        .then(usuario => {
            if (usuario) {
                return res.status(409).json({
                    mensagem: 'Usuário já cadastrado'
                });
            }
            const salt = bcrypt.genSaltSync();
            const senhaCriptografada = bcrypt.hashSync(senha, salt);

            return Usuario.create({
                email: email,
                senha: senhaCriptografada,
                perfilId: perfilId
            });
        })
        .then(usuarioCriado => {
            return res.status(201).json({
                mensagem: 'Usuário criado com sucesso',
                usuario: {
                    id: usuarioCriado.id,
                    email: usuarioCriado.email
                }
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
}

exports.update = (req, res, next) => {
    const { id, email, perfilId } = req.body;

    if (!id || !email || !perfilId) {
        return res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    }

    Usuario.update(
        { email: email, perfilId: perfilId },
        { where: { id: id } }
    )
        .then(() => {
            return res.status(200).json({
                mensagem: 'Usuário alterado com sucesso'
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    }

    Usuario.destroy({ where: { id: id } })
        .then(() => {
            return res.status(200).json({
                mensagem: 'Usuário excluído com sucesso'
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
}

exports.getAll = (req, res, next) => {
    Usuario.findAll({
        order: [['email', 'ASC']]
    })
        .then(usuarios => {
            return res.status(200).json({
                usuarios: usuarios.map(usr => ({
                    id: usr.id,
                    email: usr.email,
                    perfilId: usr.perfilId
                })),
                mensagem: 'Usuários encontrados com sucesso.'
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
}

exports.getOne = (req, res, next) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    }

    Usuario.findByPk(id)
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({
                    mensagem: 'Usuário não encontrado!'
                });
            }
            return res.status(200).json({
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                    perfilId: usuario.perfilId
                },
                mensagem: 'Usuário encontrado com sucesso!'
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
}
