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
        res.render('produtos/index', {inAdm: req.session.login.inAdm, produtos: produtos});
    });
}

exports.renderNovo = (req, res, next) => {
    Marca.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(marcas => {
        Categoria.findAll({
            order:[
                ['descricao', 'ASC']
            ]
        }).then(categorias => {
            res.render('produtos/novo', {inAdm: req.session.login.inAdm, marcas: marcas, categorias: categorias});
        })
    });
}

exports.create = (req, res, next) => {
    const descricao = req.body.descricao;
    const minimo = req.body.minimo;
    const maximo = req.body.maximo;
    const quantidade = req.body.quantidade;
    const marcaId = req.body.marcaId;
    const categoriumId = req.body.categoriumId;

    Produto.findOne({
        where: {
            descricao: descricao
        }
    }).then(produto => {
        if(produto == undefined)
        {
            Produto.create({
                descricao: descricao,
                quantidade: quantidade,
                minimo: minimo,
                maximo: maximo,
                marcaId: marcaId,
                categoriumId: categoriumId
            }).then(() => {
                res.redirect('/produtos');
            });
        }
        else
        {
            res.redirect('/produtos');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Produto.findByPk(id).then(produto => {
        Marca.findAll({
            order: [
                ['descricao', 'ASC']
            ]
        }).then(marcas => {
            Categoria.findAll({
                order: [
                    ['descricao', 'ASC']
                ]
            }).then(categorias => {
                res.render('produtos/editar', {inAdm: req.session.login.inAdm, marcas: marcas, categorias: categorias, produto: produto});
            })
        })
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const descricao = req.body.descricao;
    const minimo = req.body.minimo;
    const maximo = req.body.maximo;
    const quantidade = req.body.quantidade;
    const marcaId = req.body.marcaId;
    const categoriumId = req.body.categoriumId;

    Produto.update({
        descricao: descricao,
        quantidade: quantidade,
        minimo: minimo,
        maximo: maximo,
        marcaId: marcaId,
        categoriumId: categoriumId
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/produtos');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Produto.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/produtos');
    })
}
