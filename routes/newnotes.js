var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Área de notas - em desenvolvimento');
});

module.exports = router;