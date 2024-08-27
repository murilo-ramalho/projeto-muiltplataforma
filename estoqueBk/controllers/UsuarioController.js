const express = require('express');
const Usuario = require('../models/usuario');
const Perfil = require('../models/perfil');
const bcrypt = require('bcryptjs');
const utils = require('../utils/utils');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    const JWT_KEY = utils.JWT_KEY;
    const email = req.body.email;
    const senha = req.body.senha;
    let erro = false;
    let usuarioEncontrado;

    if(email === undefined || senha === undefined)
    {
        res.status(400).json({
            mensagem: 'Credenciais inválidas!'
        });
    }
    else {
        Usuario.findOne({
            where: {
                email: email
            }
        }).then(usuario => {
            if(!usuario)
            {
                erro = true;
                return res.status(401).json({
                    mensagem: 'Credenciais inválidas!'
                });
            }
            else
            {
                usuarioEncontrado = usuario;
                return bcrypt.compare(senha, usuario.senha);
            }
        }).then(resultado => {
            if(!erro)
            {
                if(!resultado)
                {
                    return res.status(401).json({
                        mensagem: 'Credenciais inválidas!'
                    });
                }
                const token = jwt.sign(
                    {email: usuarioEncontrado.email},
                    JWT_KEY,
                    {expiresIn: '1h'}
                );
                res.status(200).json({
                    token: token,
                    expiresIn: '3600'
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(401).json({
                mensagem: 'Credenciais inválidas!'
            });
        });
    }
}

exports.create = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;
    const perfilId = req.body.perfilId;

    if(email === undefined || senha === undefined || perfilId === undefined)
    {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        })
    }
    else
    {
        Usuario.findOne({
            where: {
                email: email
            }
        }).then(usuario => {
            if(usuario == undefined)
            {
                const salt = bcrypt.genSaltSync();
                const senhaCriptografada = bcrypt.hashSync(senha, salt);

                Usuario.create({
                    email: email,
                    senha: senhaCriptografada,
                    perfilId: perfilId
                }).then(usuarioCriado => {
                    res.status(201).json({
                        mensagem: 'Usuário criado com sucesso',
                        usuario: {
                            id: usuarioCriado.id,
                            email: usuarioCriado.email
                        }
                    });
                });
            }
            else
            {
                res.status(409).json({
                    mensagem: 'Usuário já cadastrado'
                });
            }
        });
    }
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const email = req.body.email;
    const perfilId = req.body.perfilId;

    if(id === undefined || email === undefined || perfilId === undefined)
    {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        })
    }
    else
    {
        Usuario.update({
            email: email,
            perfilId: perfilId
        }, {
            where: {
                id: id
            }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Usuário alterado'
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Erro no servidor!'
            })
        });
    }
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    if(id === undefined)
    {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    }
    else
    {
        Usuario.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Usuário excluído!'
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Erro no servidor!'
            })
        })
    }
}

exports.getAll = (req, res, next) => {
    Usuario.findAll({
        order: [
            ['email', 'ASC']
        ]
    }).then(usuarios => {
        res.status(200).json({
            usuarios: usuarios.map(usr => {
                return {
                    id: usr.id,
                    email: usr.email,
                    perfilId: usr.perfilId
                }
            }),
            mensagem: 'Usuários encontrados.'
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            mensagem: 'Erro no servidor!'
        })
    });
}

exports.getOne = (req, res, next) => {
    const id = req.params.id;
    
    if(id === undefined)
    {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    }
    else
    {
        Usuario.findByPk(id).then(usuario => {
            res.status(200).json({
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                    perfilId: usuario.perfilId
                },
                mensagem: 'Usuário encontrado!'
            });
        }).catch(err => {
            res.status(400).json({
                mensagem: 'Campos inválidos!'
            });
        });
    }
}