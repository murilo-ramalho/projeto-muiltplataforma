const Sequelize = require('sequelize');
const connection = require('../database/database');

const Saida = connection.define(
    'saida',
    {
        data: {
            type: Sequelize.DATE,
            allowNull: false
        },
        nf: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);

//Saida.sync({force: true});

module.exports = Saida;