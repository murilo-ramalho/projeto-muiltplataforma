const Sequelize = require('sequelize');

const connection = new Sequelize(
    'estoque',
    'root',
    'tirnanog',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;