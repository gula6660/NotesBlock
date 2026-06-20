var express = require('express');
var router = express.Router();

function verificarLogin(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

router.get('/', verificarLogin, function(req, res) {
  var notasExcluidas = [
    { id: '101', titulo: 'Ideia de aplicativo antiga' },
    { id: '102', titulo: 'Lista de tarefas passada' },
    { id: '103', titulo: 'Rascunho de e-mail' }
  ];

  res.render('lixeira', { notas: notasExcluidas });
});

router.post('/esvaziar', verificarLogin, function(req, res) {
  res.redirect('/lixeira');
});

router.post('/restaurar-tudo', verificarLogin, function(req, res) {
  res.redirect('/lixeira');
});

module.exports = router;