var express = require('express');
var router = express.Router();
var User = require('../models/User'); 
var Note = require('../models/Note'); 

router.get('/', async function(req, res, next) {
  try {
    if (!req.session.userId) {
    return res.redirect('/login'); 
    }

    var user = await User.findById(req.session.userId);
    var notasDoUsuario = await Note.find({ usuarioId: req.session.userId, excluida: false });

    res.render('principal', { 
      title: 'NotesBlock', 
      usuario: user ? user.nome : 'Usuário',
      notas: notasDoUsuario
    });

  } catch (err) {
    console.error("❌ Erro:", err);
    next(err);
  }
});

module.exports = router;