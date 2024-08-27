const express = require('express');
const router = express.Router();
const checkAdm = require('../middleware/checkAdm');

const CategoriaController = require('../controllers/CategoriaController');

router.get('/', checkAdm, CategoriaController.getAll);
router.get('/novo', checkAdm, CategoriaController.renderNovo);
router.post('/', checkAdm, CategoriaController.create);
router.get('/:id', checkAdm, CategoriaController.renderEditar);
router.post('/salvar', checkAdm, CategoriaController.update);
router.get('/delete/:id', checkAdm, CategoriaController.delete);

module.exports = router;