const express = require('express');
const Saida = require('../models/saida');

exports.getAll = (req, res, next) => {
    Saida.findAll({
        order: [
            ['data', 'ASC']
        ]
    }).then(saidas => {
        res.status(200).json({
            saidas: saidas.map(saida => ({
                id: saida.id,
                data: saida.data,
                nf: saida.nf
            })),
            mensagem: 'Saídas encontradas.'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            mensagem: 'Erro no servidor!'
        });
    });
}

exports.create = (req, res, next) => {
    let { data, nf } = req.body;
    Saida.findOne({
        where: {
            data: data,
            nf: nf
        }
    }).then(saida => {
        if (saida === null) {
            Saida.create({
                data: data,
                nf: nf
            }).then(saidaCriada => {
                res.status(201).json({
                    mensagem: 'Saída criada com sucesso!',
                    saidaId: saidaCriada.id
                });
            });
        } else {
            res.status(409).json({
                mensagem: 'Saída já cadastrada.'
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            mensagem: 'Erro no servidor!'
        });
    });
}

exports.update = (req, res, next) => {
    const { id, data, nf } = req.body;

    if (id === undefined || data === undefined || nf === undefined) {
        res.status(400).json({
            mensagem: 'Campos obrigatórios ausentes!'
        });
    } else {
        Saida.update({
            data: data,
            nf: nf
        }, {
            where: { id: id }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Saída atualizada com sucesso!'
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
            mensagem: 'ID inválido!'
        });
    } else {
        Saida.destroy({
            where: { id: id }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Saída excluída com sucesso!'
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
            mensagem: 'ID inválido!'
        });
    } else {
        Saida.findByPk(id).then(saida => {
            if (saida) {
                res.status(200).json({
                    saida: {
                        id: saida.id,
                        data: saida.data,
                        nf: saida.nf
                    },
                    mensagem: 'Saída encontrada!'
                });
            } else {
                res.status(404).json({
                    mensagem: 'Saída não encontrada!'
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
