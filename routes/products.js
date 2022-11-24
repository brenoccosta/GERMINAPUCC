const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('../../germina.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Conectado a base de dados');
});

router.get('/', function(req, res) {
    req.session.returnTo = req.originalUrl;
    res.render('produtos');
    
});

module.exports = router;