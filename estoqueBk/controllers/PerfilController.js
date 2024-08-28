const express = require('express');
const Perfil = require('../models/perfil');

exports.getAll = (req, res, next) => {
    Perfil.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(perfis => {
        res.status(200).json({
            perfis: perfis.map(perfil => ({
                id: perfil.id,
                descricao: perfil.descricao,
                inAdm: perfil.inAdm
            })),
            mensagem: 'Perfis encontrados.'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            mensagem: 'Erro no servidor!'
        });
    });
}

exports.create = (req, res, next) => {
    const descricao = req.body.descricao;
    let inAdm = req.body.inAdm || false;

    if (descricao === undefined) {
        res.status(400).json({
            mensagem: 'Descrição inválida!'
        });
    } else {
        Perfil.findOne({
            where: {
                descricao: descricao
            }
        }).then(perfil => {
            if (perfil === null) {
                Perfil.create({
                    descricao: descricao,
                    inAdm: inAdm
                }).then(() => {
                    res.status(201).json({
                        mensagem: 'Perfil criado com sucesso!'
                    });
                });
            } else {
                res.status(409).json({
                    mensagem: 'Perfil já cadastrado.'
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
    }
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const descricao = req.body.descricao;
    let inAdm = req.body.inAdm || false;

    if (id === undefined || descricao === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        Perfil.update({
            descricao: descricao,
            inAdm: inAdm
        }, {
            where: {
                id: id
            }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Perfil atualizado com sucesso!'
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
    }
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    if (id === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        Perfil.destroy({
            where: { id: id }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Perfil excluído com sucesso!'
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
    }
}

exports.getOne = (req, res, next) => {
    const id = req.params.id;

    if (id === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        Perfil.findByPk(id).then(perfil => {
            if (perfil) {
                res.status(200).json({
                    perfil: {
                        id: perfil.id,
                        descricao: perfil.descricao,
                        inAdm: perfil.inAdm
                    },
                    mensagem: 'Perfil encontrado!'
                });
            } else {
                res.status(404).json({
                    mensagem: 'Perfil não encontrado!'
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
    }
}
