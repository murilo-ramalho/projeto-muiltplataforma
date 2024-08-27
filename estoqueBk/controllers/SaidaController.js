const express = require('express');
const Saida = require('../models/saida');

exports.getAll = (req, res, next) => {
    Saida.findAll({
        order: [
            ['data', 'ASC']
        ]
    }).then(saidas => {
        // renderizar tela com todos os dados
    });
}

exports.renderNovo = (req, res, next) => {
    // renderizar formulário para cadastro do novo
}

exports.create = (req, res, next) => {
    const data = req.body.data;
    // teremos que converter de html para banco
    const nf = req.body.nf;

    Saida.findOne({
        where: {
            data: data,
            nf: nf
        }
    }).then(saida => {
        if(saida == undefined)
        {
            Saida.create({
                data: data,
                nf: nf
            }).then( saidaCriada => {
                // redirecionar para a tela de cadastro de itens
                // com o id criado
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
        // converter data de banco para html
        // renderizar tela de edição
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const data = req.body.data;
    const nf = req.body.nf;

    // converter data de html para banco

    Saida.update({
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

    Saida.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para lista com todos os perfis
    })
}
