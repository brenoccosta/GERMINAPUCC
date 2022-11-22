const express = require('express');

const router = express.Router();
const cryptography = require('../public/js/criptografia');
const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./germina.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Conectado a base de dados');
});


router.get('/', function(req, res) {
    
    res.render('cadastro');
});

router.post('/', function(req, res) {
    let nome = req.body.nome;
    let sobrenome = req.body.sobrenome;
    let email = req.body.email;
    let senha = req.body.psw;

    let salt = cryptography.randomSalt();
    let hash = cryptography.hashPassword(senha,salt);

    //res.send(db);
    //NAO CONSIGO CONECTAR A BD
    db.run(`INSERT INTO usuario(nome,sobrenome,password,salt,email) VALUES(?,?,?,?,?)`, [nome,sobrenome,hash,salt,email], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
    res.redirect('/');
    
})

module.exports = router;