const express = require('express');
const Usuario = require('../models/usuario');

exports.getAll = (req, res, next) => {
    Usuario.findAll({
        order: [
            ['email', 'ASC']
        ]
    }).then(usuarios => {
        // renderizar tela com todos os dados
    });
}

exports.renderNovo = (req, res, next) => {
    // renderizar formulário para cadastro do novo
}

exports.create = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;
    const perfilId = req.body.perfilId;

    Usuario.findOne({
        where: {
            email: email
        }
    }).then(usuario => {
        if(usuario == undefined)
        {
            Usuario.create({
                email: email,
                senha: senha,
                perfilId: perfilId
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

    Usuario.findByPk(id).then(usuario => {
        // renderizar tela de edição
    });
};

exports.update = (req, res, next) => {
    const id = req.body.id;
    const email = req.body.email;
    const senha = req.body.senha;
    const perfilId = req.body.perfilId;

    Usuario.update({
        email: email,
        senha: senha,
        perfilId: perfilId
    }, {
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para a tela com todos
    });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Usuario.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // redirecionar para a tela com todos
    });
};
