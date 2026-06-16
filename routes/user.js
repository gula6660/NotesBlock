var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Área de usuário - em desenvolvimento');
});

router.get('/perfil', function(req, res) {
});

router.put('/editar', function(req, res) {
});

module.exports = router;