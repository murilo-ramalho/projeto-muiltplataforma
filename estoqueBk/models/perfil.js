const Sequelize = require('sequelize');
const connection = require('../database/database');

const Perfil = connection.define(
    'perfil',
    {
        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        },
        inAdm: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    }
);

//Perfil.sync({force: true});

module.exports = Perfil;