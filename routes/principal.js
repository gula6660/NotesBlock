var express = require('express');
var router = express.Router();


router.get('/principal', function(req, res, next) {
  res.render('principal', { title: 'NotesBlock' });
});

module.exports = router;
