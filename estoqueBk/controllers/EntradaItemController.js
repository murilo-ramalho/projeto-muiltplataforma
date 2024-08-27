const express = require('express');
const EntradaItem = require('../models/entradaitem');
const Entrada = require('../models/entrada');
const Produto = require('../models/produto');

exports.getAll = (req, res, next) => {
    const id = req.params.id;
    EntradaItem.findAll({
        include: [{
            model: Entrada
        },
        {
            model: Produto
        }],
        where: {entradaId: id}
    }).then(entradas => {
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
    const entradaId = req.body.entradaId;
    const qtde = req.body.qtde;
    const produtoId = req.body.produtoId;

    EntradaItem.create({
        entradaId: entradaId,
        qtde: qtde,
        produtoId: produtoId
    }).then(() => {
        // redirecionar para a tela de cadastro de itens
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    EntradaItem.findByPk(id).then(entrada => {
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

    EntradaItem.update({
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

    EntradaItem.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para lista com todas as entradas
    })
}
