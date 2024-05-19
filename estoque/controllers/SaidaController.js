const express = require('express');
const Saida = require('../models/saida');

exports.getAll = (req, res, next) => {
    Saida.findAll({
        order: [
            ['data', 'ASC']
        ]
    }).then(saidas => {
        res.render('estoque/saida', {
            // enviar os dados para a tela
        });
    });
}

exports.renderNovo = (req, res, next) => {
    // renderizar formulário para cadastro do novo
}

exports.create = (req, res, next) => {
    const data = req.body.data;
    const nf = req.body.nf;

    Saida.findOne({
        where: {
            nf: nf
        }
    }).then(saida => {
        if(saida == undefined)
        {
            Saida.create({
                data: data,
                nf: nf
            }).then(() => {
                // redirecionar para a tela com todos
            });
        }
        else
        {
            // redirecionar para a tela com todos
        }
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Saida.findByPk(id).then(saida => {
        // renderizar tela de edição
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const data = req.body.data;
    const nf = req.body.nf;

    Saida.update({
        data: data,
        nf: nf
    }, {
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para a tela com todos
    });
}

exports.delete = (req, res, next) => {
    const id = req.body.id;

    Saida.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para a tela com todos
    });
}