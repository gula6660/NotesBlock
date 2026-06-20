var express = require('express');
var router = express.Router();
var Note = require('../models/Note'); 

function verificarLogin(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

router.get('/', verificarLogin, function(req, res) {
  res.render('novanota'); 
});

router.post('/salvar', verificarLogin, async function(req, res) {
  try {
    var { title, content } = req.body;


    var novaNota = new Note({
      titulo: title,
      conteudo: content,
      userId: req.session.userId
    });
    await novaNota.save();

    console.log('--- NOTA RECEBIDA NO BACK-END ---');
    console.log('Título:', title);
    console.log('Conteúdo HTML:', content);

    res.status(200).json({ sucesso: true, mensagem: 'Nota gravada no banco!' });
  } catch (err) {
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno: ' + err.message });
  }
});

module.exports = router;