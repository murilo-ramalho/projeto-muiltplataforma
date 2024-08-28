const express = require('express');
const Entrada = require('../models/entrada');
const Utils = require('../utils/utils');

exports.getAll = (req, res, next) => {
    Entrada.findAll({
        order: [
            ['data', 'ASC']
        ]
    }).then(entradas => {
        res.status(200).json({
            entradas: entradas.map(ent => ({
                id: ent.id,
                data: ent.data,
                nf: ent.nf
            })),
            mensagem: 'Entradas encontradas.'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            mensagem: 'Erro no servidor!'
        });
    });
}

exports.create = (req, res, next) => {
    const data = Utils.DataParaBanco(req.body.data);
    const nf = req.body.nf;

    if (data === undefined || nf === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        Entrada.findOne({
            where: {
                data: data,
                nf: nf
            }
        }).then(entrada => {
            if (!entrada) {
                Entrada.create({
                    data: data,
                    nf: nf
                }).then(entradaCriada => {
                    res.status(201).json({
                        mensagem: 'Entrada criada com sucesso!',
                        entrada: {
                            id: entradaCriada.id,
                            data: entradaCriada.data,
                            nf: entradaCriada.nf
                        }
                    });
                });
            } else {
                res.status(409).json({
                    mensagem: 'Entrada já existente!'
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
    const data = Utils.DataParaBanco(req.body.data);
    const nf = req.body.nf;

    if (id === undefined || data === undefined || nf === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        Entrada.update({
            data: data,
            nf: nf
        }, {
            where: { id: id }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Entrada atualizada com sucesso!'
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
        Entrada.destroy({
            where: { id: id }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Entrada excluída com sucesso!'
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
        Entrada.findByPk(id).then(entrada => {
            if (entrada) {
                res.status(200).json({
                    entrada: {
                        id: entrada.id,
                        data: entrada.data,
                        nf: entrada.nf
                    },
                    mensagem: 'Entrada encontrada!'
                });
            } else {
                res.status(404).json({
                    mensagem: 'Entrada não encontrada!'
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
