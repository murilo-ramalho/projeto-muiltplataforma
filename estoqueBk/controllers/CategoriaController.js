const express = require('express');
const Categoria = require('../models/categoria');

exports.getAll = (req, res, next) => {
    Categoria.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(categorias => {
        res.render('categorias/index', {inAdm: req.session.login.inAdm, categorias: categorias});
    });
}

exports.renderNovo = (req, res, next) => {
    res.render('categorias/novo', {inAdm: req.session.login.inAdm})
}

exports.create = (req, res, next) => {
    const descricao = req.body.descricao;

    Categoria.findOne({
        where: {
            descricao: descricao
        }
    }).then(categoria => {
        if(categoria == undefined)
        {
            Categoria.create({
                descricao: descricao
            }).then(() => {
                res.redirect('/categorias');
            });
        }
        else
        {
            res.redirect('/categorias');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Categoria.findByPk(id).then(categoria => {
        res.render('categorias/editar', { inAdm: req.session.login.inAdm, categoria: categoria});
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const descricao = req.body.descricao;

    Categoria.update({
        descricao: descricao
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/categorias');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Categoria.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/categorias');
    })
}
