const Sequelize = require('sequelize');
const connection = require('../database/database');

const Saida = require('./Saidas');
const Produto = require('./Produto');

const SaidaItem = connection.define(
    'saidaItem',
    {
        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }
);

SaidaItem.belongsTo(Saida);
SaidaItem.belongsTo(Produto);

//SaidaItem.sync({force: true});

module.exports = SaidaItem;