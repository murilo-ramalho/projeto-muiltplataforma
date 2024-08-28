const express = require('express');
const Produto = require('../models/produto');
const Marca = require('../models/marca');
const Categoria = require('../models/categoria');

exports.getAll = (req, res, next) => {
    Produto.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(produtos => {
        res.status(200).json({
            produtos: produtos.map(produto => ({
                id: produto.id,
                descricao: produto.descricao,
                quantidade: produto.quantidade,
                minimo: produto.minimo,
                maximo: produto.maximo,
                marcaId: produto.marcaId,
                categoriumId: produto.categoriumId
            })),
            mensagem: 'Produtos encontrados.'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            mensagem: 'Erro no servidor!'
        });
    });
}

exports.create = (req, res, next) => {
    const { descricao, minimo, maximo, quantidade, marcaId, categoriumId } = req.body;

    if (descricao === undefined || marcaId === undefined || categoriumId === undefined) {
        res.status(400).json({
            mensagem: 'Campos obrigatórios ausentes!'
        });
    } else {
        Produto.findOne({
            where: { descricao: descricao }
        }).then(produto => {
            if (produto === null) {
                Produto.create({
                    descricao,
                    quantidade,
                    minimo,
                    maximo,
                    marcaId,
                    categoriumId
                }).then(() => {
                    res.status(201).json({
                        mensagem: 'Produto criado com sucesso!'
                    });
                });
            } else {
                res.status(409).json({
                    mensagem: 'Produto já cadastrado.'
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
    const { id, descricao, minimo, maximo, quantidade, marcaId, categoriumId } = req.body;

    if (id === undefined || descricao === undefined) {
        res.status(400).json({
            mensagem: 'Campos obrigatórios ausentes!'
        });
    } else {
        Produto.update({
            descricao,
            quantidade,
            minimo,
            maximo,
            marcaId,
            categoriumId
        }, {
            where: { id: id }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Produto atualizado com sucesso!'
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
        Produto.destroy({
            where: { id: id }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Produto excluído com sucesso!'
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
        Produto.findByPk(id).then(produto => {
            if (produto) {
                res.status(200).json({
                    produto: {
                        id: produto.id,
                        descricao: produto.descricao,
                        quantidade: produto.quantidade,
                        minimo: produto.minimo,
                        maximo: produto.maximo,
                        marcaId: produto.marcaId,
                        categoriumId: produto.categoriumId
                    },
                    mensagem: 'Produto encontrado!'
                });
            } else {
                res.status(404).json({
                    mensagem: 'Produto não encontrado!'
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

exports.getFormDependencies = (req, res, next) => {
    Marca.findAll({
        order: [['descricao', 'ASC']]
    }).then(marcas => {
        Categoria.findAll({
            order: [['descricao', 'ASC']]
        }).then(categorias => {
            res.status(200).json({
                marcas: marcas.map(marca => ({
                    id: marca.id,
                    descricao: marca.descricao
                })),
                categorias: categorias.map(categoria => ({
                    id: categoria.id,
                    descricao: categoria.descricao
                })),
                mensagem: 'Marcas e Categorias carregadas com sucesso.'
            });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            mensagem: 'Erro no servidor!'
        });
    });
}
