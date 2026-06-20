var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();
var User = require('../models/User');
var User = require('../models/Note');

router.get('/', async function(req, res, next) {
  try {
    if (!req.session.userId) {
      return res.redirect('/login'); 
    }

    var user = await User.findById(req.session.userId);
    
    var notasDoUsuario = [
      { id: 1, titulo: 'Minha Primeira Nota' },
      { id: 2, titulo: 'Lista de Compras' }
    ];

    res.render('principal', { 
      title: 'NotesBlock', 
      usuario: user ? user.nome : 'Usuário',
      notas: notasDoUsuario
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
