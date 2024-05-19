const Sequelize = require('sequelize');
const connection = require('../database/database');

const Perfil = require('./perfil');

const Usuario = connection.define(
    'usuario',
    {
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }
);

Usuario.belongsTo(Perfil);

//Usuario.sync({force: true});

module.exports = Usuario;