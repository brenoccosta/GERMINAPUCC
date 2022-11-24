const express = require('express');
const { randomSalt,hashPassword } = require('../public/js/criptografia');

const router = express.Router();


// FAZER QUERIES
router.get('/', function(req, res) {
  req.session.erroLogin = false;
  req.session.returnTo = req.originalUrl;
  if(req.session.nome){
    res.send('oi');
  }
  res.render('index');
});


router.get('/erro', function(req,res){
  
  res.render('index', {erroLogin: req.session.erroLogin })
})


module.exports = router;