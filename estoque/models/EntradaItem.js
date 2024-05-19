const Sequelize = require('sequelize');
const connection = require('../database/database');

const Entradas = require('./Entradas');
const Produto = require('./Produto');

const EntradaItem = connection.define(
    'entradaItem',
    {
        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }
);

EntradaItem.belongsTo(Entradas);
EntradaItem.belongsTo(Produto);

//EntradaItem.sync({force: true});

module.exports = EntradaItem;