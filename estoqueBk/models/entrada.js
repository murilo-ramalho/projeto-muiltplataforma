const Sequelize = require('sequelize');
const connection = require('../database/database');

const Entrada = connection.define(
    'entrada',
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

//Entrada.sync({force: true});

module.exports = Entrada;