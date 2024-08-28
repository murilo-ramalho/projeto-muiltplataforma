const express = require('express');
const Marca = require('../models/marca');

exports.getAll = (req, res, next) => {
    Marca.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(marcas => {
        res.status(200).json({
            marcas: marcas.map(marca => ({
                id: marca.id,
                descricao: marca.descricao
            })),
            mensagem: 'Marcas encontradas.'
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

    if (descricao === undefined) {
        res.status(400).json({
            mensagem: 'Descrição inválida!'
        });
    } else {
        Marca.findOne({
            where: {
                descricao: descricao
            }
        }).then(marca => {
            if (marca === null) {
                Marca.create({
                    descricao: descricao
                }).then(() => {
                    res.status(201).json({
                        mensagem: 'Marca criada com sucesso!'
                    });
                });
            } else {
                res.status(409).json({
                    mensagem: 'Marca já cadastrada.'
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

    if (id === undefined || descricao === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        Marca.update({
            descricao: descricao
        }, {
            where: {
                id: id
            }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Marca atualizada com sucesso!'
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
        Marca.destroy({
            where: { id: id }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Marca excluída com sucesso!'
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
        Marca.findByPk(id).then(marca => {
            if (marca) {
                res.status(200).json({
                    marca: {
                        id: marca.id,
                        descricao: marca.descricao
                    },
                    mensagem: 'Marca encontrada!'
                });
            } else {
                res.status(404).json({
                    mensagem: 'Marca não encontrada!'
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
