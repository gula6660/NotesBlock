var express = require('express');
var router = express.Router();

router.get('/notes', function(req, res) {
  res.send('Área de notas - em desenvolvimento');
});

module.exports = router;