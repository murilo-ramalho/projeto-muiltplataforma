const express = require('express');
const app = express();
const connection = require('./database/database');

// Setup do ambiente
// Banco de Dados
connection.authenticate()
  .then(() => {
    console.log('Conexão feita com sucesso!');
  })
  .catch(erro => {
    console.log('Problemas na conexão!');
    console.log(erro);
  });

// Parser de formulários e JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Models
const Perfil = require('./models/perfil');
const Usuario = require('./models/usuario');
const Categoria = require('./models/categoria');
const Marca = require('./models/marca');
const Produto = require('./models/produto');
const Saida = require('./models/saida');
const SaidaItem = require('./models/saidaitem');
const Entrada = require('./models/entrada');
const EntradaItem = require('./models/entradaitem');

// Imports de Rota

// Rotas

// Access from other origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
})
module.exports = app;
