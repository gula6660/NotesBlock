var express = require('express');
var router = express.Router();
var Note = require('../models/Note');

function verificarLogin(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

router.get('/', verificarLogin, async function(req, res) {
  try {
    var notasExcluidas = await Note.find({ usuarioId: req.session.userId, excluida: true });
    res.render('lixeira', { notas: notasExcluidas });
  } catch (err) {
    res.status(500).send("Erro ao carregar a lixeira.");
  }
});

router.post('/esvaziar', verificarLogin, async function(req, res) {
  try {
    await Note.deleteMany({ usuarioId: req.session.userId, excluida: true });
    res.redirect('/lixeira');
  } catch (err) {
    res.status(500).send("Erro ao esvaziar a lixeira.");
  }
});

router.post('/restaurar-tudo', verificarLogin, async function(req, res) {
  try {
    await Note.updateMany({ usuarioId: req.session.userId, excluida: true }, { excluida: false });
    res.redirect('/principal');
  } catch (err) {
    res.status(500).send("Erro ao restaurar notas.");
  }
});

router.post('/restaurar/:id', verificarLogin, async function(req, res) {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id, usuarioId: req.session.userId },
      { excluida: false }
    );
    res.redirect('/lixeira');
  } catch (err) {
    res.status(500).send("Erro ao restaurar a nota.");
  }
});

module.exports = router;