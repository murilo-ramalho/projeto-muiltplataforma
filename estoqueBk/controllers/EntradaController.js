const express = require('express');
const Entrada = require('../models/entrada');
const Utils = require('../utils/utils');

exports.getAll = (req, res, next) => {
    Entrada.findAll({
        order: [
            ['data', 'ASC']
        ]
    }).then(entradas => {
        res.render('entradas/index', {inAdm: req.session.login.inAdm, entradas: entradas});
    });
}

exports.renderNovo = (req, res, next) => {
    const data = Utils.fmDate(new Date());
    res.render('entradas/novo', {inAdm: req.session.login.inAdm, data: data});
}

exports.create = (req, res, next) => {
    const data = Utils.DataParaBanco(req.body.data);
    const nf = req.body.nf;

    Entrada.findOne({
        where: {
            data: data,
            nf: nf
        }
    }).then(entrada => {
        if(entrada == undefined)
        {
            Entrada.create({
                data: data,
                nf: nf
            }).then( entradaCriada => {
                res.redirect('/entradas/'+entradaCriada.id);
            });
        }
        else
        {
            res.redirect('/entradas');
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Entrada.findByPk(id).then(entrada => {
        // converter data de banco para html
        // renderizar tela de edição
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const data = req.body.data;
    const nf = req.body.nf;

    // converter data de html para banco

    Entrada.update({
        data: data,
        nf: nf
    }, {
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para lista com todos perfis
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Entrada.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para lista com todos os perfis
    })
}
