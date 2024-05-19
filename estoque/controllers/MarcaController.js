const express = require('express');
const Marca = require('../models/marca');

exports.getAll = (req, res, next) => {
    Marca.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(marcas => {
        // renderizar tela com todos os dados
    });
}

exports.renderNovo = (req, res, next) => {
    // renderizar formulário para cadastro do novo
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

    Marca.findByPk(id).then(marca => {
        // renderizar tela de edição
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
        // redirecionar para a tela com todos
    });
}

exports.delete = (req, res, next) => {
    const id = req.body.id;

    Marca.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para a tela com todos
    });
}