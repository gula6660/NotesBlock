var express = require('express');
var router = express.Router();
var Note = require('../models/Note'); 

function verificarLogin(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}

router.get('/:id', verificarLogin, async function(req, res) {
  try {

    var nota = await Note.findById(req.params.id);
    
    var notaSimulada = {
      id: req.params.id,
      titulo: 'Nota Carregada do Banco',
      conteudo: 'Este conteúdo veio lá do servidor Node.js!'
    };

    res.render('nota', { nota: notaSimulada });
  } catch (err) {
    res.status(500).send('Erro ao carregar a nota.');
  }
});

router.post('/atualizar/:id', verificarLogin, async function(req, res) {
  try {
    var { title, content } = req.body;
    
    await Note.findByIdAndUpdate(req.params.id, { titulo: title, conteudo: content });

    console.log(`Nota ${req.params.id} atualizada com sucesso!`);
    res.status(200).json({ sucesso: true, mensagem: 'Nota salva no banco!' });
  } catch (err) {
    res.status(500).json({ sucesso: false, mensagem: err.message });
  }
});

module.exports = router;