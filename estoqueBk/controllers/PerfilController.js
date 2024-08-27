const express = require('express');
const Perfil = require('../models/perfil');

exports.getAll = (req, res, next) => {
    Perfil.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(perfis => {
        res.render('perfis/index', {inAdm: req.session.login.inAdm, perfis: perfis});
    });
}

exports.renderNovo = (req, res, next) => {
    res.render('perfis/novo', {inAdm: req.session.login.inAdm});
}

exports.create = (req, res, next) => {
    const descricao = req.body.descricao;
    let inAdm = req.body.inAdm;
    if(!inAdm)
    {
        inAdm = false;
    }

    Perfil.findOne({
        where: {
            descricao: descricao
        }
    }).then(perfil => {
        if(perfil == undefined)
        {
            Perfil.create({
                descricao: descricao,
                inAdm: inAdm
            }).then(() => {
                res.redirect('/perfis/');
            });
        }
        else
        {
            res.redirect('/perfis/');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Perfil.findByPk(id).then(perfil => {
        res.render('perfis/editar', {inAdm: req.session.login.inAdm, perfil: perfil});
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const descricao = req.body.descricao;
    let inAdm = req.body.inAdm;
    if(!inAdm)
    {
        inAdm = false;
    }

    Perfil.update({
        descricao: descricao,
        inAdm: inAdm
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/perfis');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Perfil.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/perfis');
    })
}
