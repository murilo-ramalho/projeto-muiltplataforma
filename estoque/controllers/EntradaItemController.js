const express = require('express');
const EntradaItem = require('../models/entradaItem');

exports.getAll = (req, res, next) => {
    EntradaItem.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(entradaItems => {
        // renderizar tela com todos os dados
    });
}

exports.renderNovo = (req, res, next) => {
    // renderizar formulário para cadastro do novo
}

exports.create = (req, res, next) => {
    const entradaId = req.body.entradaId;
    const produtoId = req.body.produtoId;
    const quantidade = req.body.quantidade;

    EntradaItem.findOne({
        where: {
            entradaId: entradaId,
            produtoId: produtoId
        }
    }).then(entradaItem => {
        if(entradaItem == undefined)
        {
            EntradaItem.create({
                entradaId: entradaId,
                produtoId: produtoId,
                quantidade: quantidade
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

    EntradaItem.findByPk(id).then(entradaItem => {
        // renderizar tela de edição
    });
};

exports.update = (req, res, next) => {
    const id = req.body.id;
    const entradaId = req.body.entradaId;
    const produtoId = req.body.produtoId;
    const quantidade = req.body.quantidade;

    EntradaItem.update({
        entradaId: entradaId,
        produtoId: produtoId,
        quantidade: quantidade
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

    EntradaItem.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para a tela com todos
    });
};