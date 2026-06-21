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

    res.render('principal', { 
      title: 'NotesBlock', 
      usuario: user ? user.nome : 'Usuário',
      notas: [
        { id: 1, titulo: 'Minha Primeira Nota' },
        { id: 2, titulo: 'Lista de Compras' }
      ]
    });

  } catch (err) {
    console.error("❌ Erro:", err);
    next(err);
  }
});

module.exports = router;