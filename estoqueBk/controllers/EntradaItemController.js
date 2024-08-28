const express = require('express');
const EntradaItem = require('../models/entradaitem');
const Entrada = require('../models/entrada');
const Produto = require('../models/produto');

exports.getAll = (req, res, next) => {
    const id = req.params.id;
    EntradaItem.findAll({
        include: [{
            model: Entrada
        },
        {
            model: Produto
        }],
        where: { entradaId: id }
    }).then(entradas => {
        res.status(200).json({
            entradas: entradas.map(ent => ({
                id: ent.id,
                entradaId: ent.entradaId,
                produtoId: ent.produtoId,
                qtde: ent.qtde,
                produto: ent.produto,
                entrada: ent.entrada
            })),
            mensagem: 'Itens da entrada encontrados.'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            mensagem: 'Erro no servidor!'
        });
    });
}

exports.create = (req, res, next) => {
    const entradaId = req.body.entradaId;
    const qtde = req.body.qtde;
    const produtoId = req.body.produtoId;

    if (entradaId === undefined || qtde === undefined || produtoId === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        EntradaItem.create({
            entradaId: entradaId,
            qtde: qtde,
            produtoId: produtoId
        }).then(() => {
            res.status(201).json({
                mensagem: 'Item da entrada criado com sucesso!'
            });
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
    const qtde = req.body.qtde;

    if (id === undefined || qtde === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        EntradaItem.update({
            qtde: qtde
        }, {
            where: { id: id }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Item da entrada atualizado com sucesso!'
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
        EntradaItem.destroy({
            where: { id: id }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Item da entrada excluído com sucesso!'
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
        EntradaItem.findByPk(id, {
            include: [{
                model: Produto
            }]
        }).then(entrada => {
            if (entrada) {
                res.status(200).json({
                    entrada: {
                        id: entrada.id,
                        entradaId: entrada.entradaId,
                        produtoId: entrada.produtoId,
                        qtde: entrada.qtde,
                        produto: entrada.produto
                    },
                    mensagem: 'Item da entrada encontrado!'
                });
            } else {
                res.status(404).json({
                    mensagem: 'Item da entrada não encontrado!'
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
