const express = require('express');
const Produto = require('../models/produto');

exports.getAll = (req, res, next) => {
    Produto.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(produtos => {
        // renderizar tela com todos os dados
    });
}

exports.renderNovo = (req, res, next) => {
    // renderizar formulário para cadastro do novo
};

exports.create = (req, res, next) => {
    const descricao = req.body.descricao;
    const quantidade = req.body.quantidade;
    const minimo = req.body.minimo;
    const maximo = req.body.maximo;
    const marcaId = req.body.marcaId;
    const categoriaId = req.body.categoriaId;

    Produto.findOne({
        where: {
            descricao: descricao
        }
    }).then(produto => {
        if(produto == undefined)
        {
            Produto.create({
                descricao: descricao,
                preco: quantidade,
                minimo: minimo,
                maximo: maximo,
                marcaId: marcaId,
                categoriaId: categoriaId
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

    Produto.findByPk(id).then(produto => {
        // renderizar tela de edição
    });
};

exports.update = (req, res, next) => {
    const id = req.body.id;
    const descricao = req.body.descricao;
    const quantidade = req.body.quantidade;
    const minimo = req.body.minimo;
    const maximo = req.body.maximo;
    const marcaId = req.body.marcaId;
    const categoriaId = req.body.categoriaId;

    Produto.update({
        descricao: descricao,
        preco: quantidade,
        minimo: minimo,
        maximo: maximo,
        marcaId: marcaId,
        categoriaId: categoriaId
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

    Produto.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para a tela com todos
    });
};