const express = require('express');
const SaidaItem = require('../models/saidaItem');

exports.getAll = (req, res, next) => {
    SaidaItem.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(saidaItems => {
        // renderizar tela com todos os dados
    });
};

exports.renderNovo = (req, res, next) => {
    // renderizar formulário para cadastro do novo
}

exports.create = (req, res, next) => {
    const saidaId = req.body.saidaId;
    const produtoId = req.body.produtoId;
    const quantidade = req.body.quantidade;

    SaidaItem.findOne({
        where: {
            saidaId: saidaId,
            produtoId: produtoId
        }
    }).then(saidaItem => {
        if(saidaItem == undefined)
        {
            SaidaItem.create({
                saidaId: saidaId,
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

    SaidaItem.findByPk(id).then(saidaItem => {
        // renderizar tela de edição
    });
};

exports.update = (req, res, next) => {
    const id = req.body.id;
    const saidaId = req.body.saidaId;
    const produtoId = req.body.produtoId;
    const quantidade = req.body.quantidade;

    SaidaItem.update({
        saidaId: saidaId,
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

    SaidaItem.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para a tela com todos
    });
};