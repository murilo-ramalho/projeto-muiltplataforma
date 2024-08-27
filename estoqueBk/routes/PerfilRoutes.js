const express = require('express');
const router = express.Router();
const checkAdm = require('../middleware/checkAdm');

const PerfilController = require('../controllers/PerfilController');

router.get('/', checkAdm, PerfilController.getAll);
router.get('/novo', checkAdm, PerfilController.renderNovo);
router.post('/', checkAdm, PerfilController.create);
router.get('/:id', checkAdm, PerfilController.renderEditar);
router.post('/salvar', checkAdm, PerfilController.update);
router.get('/delete/:id', checkAdm, PerfilController.delete);

module.exports = router;