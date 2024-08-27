const express = require('express');
const router = express.Router();
const checkAdm = require('../middleware/checkAdm');

const MarcaController = require('../controllers/MarcaController');

router.get('/', checkAdm, MarcaController.getAll);
router.get('/novo', checkAdm, MarcaController.renderNovo);
router.post('/', checkAdm, MarcaController.create);
router.get('/:id', checkAdm, MarcaController.renderEditar);
router.post('/salvar', checkAdm, MarcaController.update);
router.get('/delete/:id', checkAdm, MarcaController.delete);

module.exports = router;