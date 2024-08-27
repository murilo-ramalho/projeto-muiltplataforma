const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');
const checkAuth = require('../middleware/checkAuth');

router.post('/login', UsuarioController.login);
router.post('/', UsuarioController.create);
router.put('/', checkAuth, UsuarioController.update);
router.delete('/:id', checkAuth, UsuarioController.delete);
router.get('/:id', checkAuth, UsuarioController.getOne);
router.get('/', checkAuth, UsuarioController.getAll);

module.exports = router;