const express = require('express');
const router = express.Router();
const checkLogin = require('../middleware/checkLogin');

const ProdutoController = require('../controllers/ProdutoController');

router.get('/', checkLogin, ProdutoController.getAll);
router.get('/novo', checkLogin, ProdutoController.renderNovo);
router.post('/', checkLogin, ProdutoController.create);
router.get('/:id', checkLogin, ProdutoController.renderEditar);
router.post('/salvar', checkLogin, ProdutoController.update);
router.get('/delete/:id', checkLogin, ProdutoController.delete);

module.exports = router;