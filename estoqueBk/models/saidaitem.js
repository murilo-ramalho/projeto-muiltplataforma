const Sequelize = require('sequelize');
const connection = require('../database/database');
const Saida = require('./saida');
const Produto = require('./produto');

const SaidaItem = connection.define(
    'saidaitem',
    {
        qtde: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
);

SaidaItem.belongsTo(Produto);
SaidaItem.belongsTo(Saida);

//SaidaItem.sync({force: true});

module.exports = SaidaItem;