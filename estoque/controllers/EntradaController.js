const express = require('express');
const Categoria = require('../models/categorias');

exports.getAll = (req, res, next) => {
    Categoria.findAll({
        order: [
            ['data', 'ASC']
        ]
    }).then(categorias => {
        // renderizar tela com todos os dados
    });
};

exports.renderNovo = (req, res, next) => {
    // renderizar formulário para cadastro do novo
};

exports.create = (req, res, next) => {
    const data = req.body.data;
    const nf = req.body.nf;

    Categoria.findOne({
        where: {
            nf: nf
        }
    }).then(categoria => {
        if(categoria == undefined)
        {
            Categoria.create({
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
};

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Categoria.findByPk(id).then(categoria => {
        // renderizar tela de edição
    });
};

exports.update = (req, res, next) => {
    const id = req.body.id;
    const data = req.body.data;
    const nf = req.body.nf;

    Categoria.update({
        data: data,
        nf: nf
    }, {
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para a tela com todos
    });
};

exports.delete = (req, res, next) => {
    const id = req.body.id;

    Categoria.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para a tela com todos
    });
};