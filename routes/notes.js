var express = require('express');
var router = express.Router();

// Todas as rotas de notas (por enquanto, vazio)
router.get('/', function(req, res) {
  res.send('Área de notas - em desenvolvimento');
});

module.exports = router;