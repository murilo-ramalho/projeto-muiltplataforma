const express = require('express');
const Marca = require('../models/marca');

exports.getAll = (req, res, next) => {
    Marca.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(marcas => {
        res.render('marcas', {inAdm: req.session.login.inAdm, marcas: marcas})
    });
}

exports.renderNovo = (req, res, next) => {
    res.render('marcas/novo', {inAdm: req.session.login.inAdm})
}

exports.create = (req, res, next) => {
    const descricao = req.body.descricao;

    Marca.findOne({
        where: {
            descricao: descricao
        }
    }).then(marca => {
        if(marca == undefined)
        {
            Marca.create({
                descricao: descricao
            }).then(() => {
                res.redirect('/marcas');
            });
        }
        else
        {
            res.redirect('/marcas')
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Marca.findByPk(id).then(marca => {
        res.render('marcas/editar', {inAdm: req.session.login.inAdm, marca: marca})
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const descricao = req.body.descricao;

    Marca.update({
        descricao: descricao
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/marcas')
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Marca.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/marcas');
    })
}
