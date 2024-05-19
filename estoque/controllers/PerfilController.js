const express = require('express');
const Perfil = require('../models/perfil');

exports.getAll = (req, res, next) => {
    Perfil.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(perfis => {
        // renderizar tela com todos os dados
    });
}

exports.renderNovo = (req, res, next) => {
    // renderizar formulário para cadastro do novo
}

exports.create = (req, res, next) => {
    const descricao = req.body.descricao;
    const inAdm = req.body.inAdm;

    Perfil.findOne({
        where: {
            descricao: descricao
        }
    }).then(perfil => {
        if(perfil == undefined)
        {
            Perfil.create({
                descricao: descricao,
                inAdm: inAdm
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

    Perfil.findByPk(id).then(perfil => {
        // renderizar tela de edição
    });
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const descricao = req.body.descricao;
    const inAdm = req.body.inAdm

    Perfil.update({
        descricao: descricao,
        inAdm: inAdm
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

    Perfil.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para lista com todos os perfis
    })
}
