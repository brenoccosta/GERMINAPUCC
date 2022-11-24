const express = require('express');
const { randomSalt,hashPassword } = require('../public/js/criptografia');

const router = express.Router();

function procuraUsuario(db,email,password){
    db.get('SELECT salt FROM usuario WHERE email = ?',[email], function(err, row) {
        if (!row){
            req.session.erroLogin = true;
            //return res.send(req.session.returnTo+'erro');
            if(req.session.returnTo=='/')
                return res.redirect(req.session.returnTo+'erro');
            else
                return res.redirect(req.session.returnTo+'/erro');
        }
        //res.send(row.salt);
        
        var hash = hashPassword(password, row.salt);
        db.get('SELECT nome, idUsuario FROM usuario WHERE email = ? AND password = ?', [email,hash], function(err, row) {
          if (!row){
            req.session.erroLogin = true;
            if(req.session.returnTo=='/')
                return res.redirect(req.session.returnTo+'erro');
            else
                return res.redirect(req.session.returnTo+'/erro');
            
          } 

            foundUser = {id: row.idUsuario, name: row.nome};
            console.log('DENTRO'+foundUser);
            return foundUser;
  
        });
        // req.session.id = foundUser.id;
        // req.session.name = foundUser.name;
        
    });
}

function verificaLogin(req,res,next){
    let email = req.body.emailLogin;
    let password = req.body.pswLogin;
    //res.send(user+' e '+password);
    let db = req.app.locals.db;
    let foundUser = {};

    let usuarioLogado = procuraUsuario(db,email,password);
    console.log('FORA'+usuarioLogado);
    //res.send(usuarioLogado);
    //let backURL = req.header('Referer') || '/';
    // let nome = req.app.get('nome');
    // res.send(nome);
    //res.send(db);
    // db.all('SELECT salt FROM usuario WHERE email = ?',[email], (err,rows) => {
	// 	if(err){
	// 		throw(err);
	// 	}
	// 	res.send(rows)
	// })
    // db.all('SELECT salt FROM usuario WHERE email = ?',[email], function(err, row) {
    //     if (!row){
    //         req.session.erroLogin = true;
    //         //return res.send(req.session.returnTo+'erro');
    //         if(req.session.returnTo=='/')
    //             return res.redirect(req.session.returnTo+'erro');
    //         else
    //             return res.redirect(req.session.returnTo+'/erro');
    //     }
    //     //res.send(row.salt);
        
    //     var hash = hashPassword(password, row.salt);

    //     db.all('SELECT nome, idUsuario FROM usuario WHERE email = ? AND password = ?', [email,hash], function(err, row) {
    //     if (!row){
    //         req.session.erroLogin = true;
    //         if(req.session.returnTo=='/')
    //             return res.redirect(req.session.returnTo+'erro');
    //         else
    //             return res.redirect(req.session.returnTo+'/erro');
            
    //     } 

    //     return foundUser = {id: row.idUsuario, name: row.nome};
    //     });
    //     //res.send(usuarioLogado);
        
        
    // });
    // req.session.id = foundUser.id;
    // req.session.name = foundUser.name;
    //res.send(usuarioLogado);
    //next();
}



router.post('/',verificaLogin,function(req,res) {
    // res.send(req.session.nome);
    // res.redirect(req.session.returnTo);
});

module.exports = router;