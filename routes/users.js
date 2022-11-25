const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

let bd = new sqlite3.Database('germina.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
});

//query para receber os produtos com seus preços
const pesquisaProdutos = require('../public/js/queryProduto.js');
let listaProdutos = [];
pesquisaProdutos.queryProdutos(bd, listaProdutos);

// FAZER QUERIES
router.get('/', function(req, res) {
  req.session.erroLogin = false;
  req.session.returnTo = req.originalUrl;
  res.render('index', {produtos: listaProdutos, user: req.session.nome});
});

router.get('/erro', function(req,res){
  res.render('index', {produtos: listaProdutos, erroLogin: req.session.erroLogin});
})

module.exports = router;
