const express = require('express');
const router = express.Router();

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
  res.render('index', {user: req.session.nome, produtos: listaProdutos});
});

router.get('/erro', function(req,res){
  res.render('index', {erroLogin: req.session.erroLogin, produtos: listaProdutos});
})

module.exports = router;
