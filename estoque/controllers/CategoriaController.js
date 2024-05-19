const express = require('express');
const Categoria = require('../models/categorias');

exports.getAll = (req, res, next) => {
    Categoria.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(categorias => {
        // renderizar tela com todos os dados
    });
}

exports.renderNovo = (req, res, next) => {
    // renderizar formulário para cadastro do novo
}

exports.create = (req, res, next) => {
    const descricao = req.body.descricao

    Categoria.findOne({
        where: {
            descricao: descricao
        }
    }).then(categoria => {
        if(categoria == undefined)
        {
            Categoria.create({
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
};

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    Categoria.findByPk(id).then(categoria => {
        // renderizar tela de edição
    });
};

exports.update = (req, res, next) => {
    const id = req.body.id;
    const descricao = req.body.descricao;

    Categoria.update({
        descricao: descricao
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