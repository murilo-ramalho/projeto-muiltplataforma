const Sequelize = require('sequelize');
const connection = require('../database/database');

const Saidas = connection.define(
    'saidas',
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

//Saidas.sync({force: true});

module.exports = Saidas;