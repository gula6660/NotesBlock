var express = require('express');
var router = express.Router();
var Note = require('../models/Note'); 

function verificarLoginTela(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

function verificarLoginAPI(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ 
      sucesso: false, 
      mensagem: 'Sua sessão expirou. Por favor, faça login novamente.' 
    });
  }
  next();
}

router.get('/', verificarLoginTela, function(req, res) {
  res.render('novanota'); 
});

router.post('/salvar', verificarLoginAPI, async function(req, res) {
  try {
    var { title, content } = req.body;

    var novaNota = new Note({
      titulo: title,
      conteudo: content,
      usuarioId: req.session.userId
    });
    
    await novaNota.save();

    console.log('--- NOTA RECEBIDA NO BACK-END ---');
    console.log('Título:', title);

    res.status(200).json({ sucesso: true, mensagem: 'Nota gravada no banco!' });

  } catch (err) {
    console.error("Erro ao salvar nota:", err.message);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno: ' + err.message });
  }
});

module.exports = router;