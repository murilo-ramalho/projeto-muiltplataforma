const express = require('express');
const SaidaItem = require('../models/saidaitem');
const Saida = require('../models/saida');
const Produto = require('../models/produto');

exports.getAll = (req, res, next) => {
    const id = req.params.id;
    SaidaItem.findAll({
        include: [{
            model: Saida
        },
        {
            model: Produto
        }],
        where: {saidaId: id}
    }).then(saidas => {
        // renderizar tela com todos os dados
    });
}

exports.renderNovo = (req, res, next) => {
    Produto.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(produtos => {
        // renderizar formulário para cadastro do novo
    });
}

exports.create = (req, res, next) => {
    const saidaId = req.body.saidaId;
    const qtde = req.body.qtde;
    const produtoId = req.body.produtoId;

    SaidaItem.create({
        saidaId: saidaId,
        qtde: qtde,
        produtoId: produtoId
    }).then(() => {
        // redirecionar para a tela de cadastro de itens
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    SaidaItem.findByPk(id).then(saidas => {
        Produto.findAll({
            order: [
                ['descricao', 'ASC']
            ]
        }).then(produtos => {
            // renderizar tela de edição
        })
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const qtde = req.body.qtde;

    // converter data de html para banco

    SaidaItem.update({
        qtde: qtde
    }, {
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para lista com todas entradas
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    SaidaItem.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para lista com todas as entradas
    })
}
