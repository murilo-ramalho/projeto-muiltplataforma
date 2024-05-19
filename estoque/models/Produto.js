const Sequelize = require('sequelize');
const connection = require('../database/database');
const Marca = require('./Marca');

const Categoria = require('./categorias');

const Produto = connection.define(
    'produto',
    {
        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        },
        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        minimo: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        maximo: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
);

Produto.belongsTo(Marca);
Produto.belongsTo(Categoria);

//Produto.sync({force: true});

module.exports = Produto;

