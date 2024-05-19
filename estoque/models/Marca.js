const Sequelize = require('sequelize');
const connection = require('../database/database');

const Marca = connection.define(
    'marca',
    {
        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);

//Marca.sync({force: true});

module.exports = Marca;