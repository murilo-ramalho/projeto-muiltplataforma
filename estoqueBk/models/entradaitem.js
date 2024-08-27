const Sequelize = require('sequelize');
const connection = require('../database/database');
const Entrada = require('./entrada');
const Produto = require('./produto');

const EntradaItem = connection.define(
    'entradaitem',
    {
        qtde: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
);

EntradaItem.belongsTo(Produto);
EntradaItem.belongsTo(Entrada);

//EntradaItem.sync({force: true});

module.exports = EntradaItem;