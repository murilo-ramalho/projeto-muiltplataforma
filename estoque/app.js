const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const connection = require('./database/database');

// Setup do ambiente
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sessions
app.use(session({
  secret: 'estoque',
  cookie: {
    maxAge: 1200000,
  },
  resave: true,
  saveUninitialized: false
}));

// Ativar arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

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
const Categoria = require('./models/categorias');
const Marca = require('./models/marca');
const Entrada = require('./models/entradas');
const Saidas = require('./models/saidas');
const Produto = require('./models/produto');
const entradaItem = require('./models/entradaItem');
const saidaItem = require('./models/saidaItem');

// Controllers

// Rotas



module.exports = app;
