const Sequelize = require('sequelize');
const connection = require('../database/database');

const Entradas = connection.define(
    'entradas',
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

//Entradas.sync({force: true});

module.exports = Entradas;