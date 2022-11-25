const express = require('express');
const { randomSalt,hashPassword } = require('../public/js/criptografia');

const router = express.Router();

// function procuraUsuario(db,email,password){
//     db.get('SELECT salt FROM usuario WHERE email = ?',[email], function(err, row) {
//         if (!row){
//             req.session.erroLogin = true;
//             //return res.send(req.session.returnTo+'erro');
//             if(req.session.returnTo=='/')
//                 return res.redirect(req.session.returnTo+'erro');
//             else
//                 return res.redirect(req.session.returnTo+'/erro');
//         }
//         //res.send(row.salt);
        
//         var hash = hashPassword(password, row.salt);
//         db.get('SELECT nome, idUsuario FROM usuario WHERE email = ? AND password = ?', [email,hash], function(err, row) {
//           if (!row){
//             req.session.erroLogin = true;
//             if(req.session.returnTo=='/')
//                 return res.redirect(req.session.returnTo+'erro');
//             else
//                 return res.redirect(req.session.returnTo+'/erro');
            
//           } 

//             foundUser = {id: row.idUsuario, name: row.nome};
//             console.log('DENTRO'+foundUser);
//             return foundUser;
  
//         });
//         // req.session.id = foundUser.id;
//         // req.session.name = foundUser.name;
        
//     });
// }

// async function db_all(db,query){
//     return new Promise(function(resolve,reject){
//         db.all(query, function(err,rows){
//            if(err){return reject(err);}
//            resolve(rows);
//          });
//     });
// }

async function usuarioLogado(db,email,password){
    return new Promise(function (resolve,reject){
        db.all('SELECT * FROM usuario WHERE email = ?',[email], function(err, rows) {
            //console.log(rows);
            if (!rows.length>0){
                resolve(false);
                return;
            }
            //res.send(row.salt);
            //res.send(row);
            var hash = hashPassword(password, rows[0].salt);
            if(hash != rows[0].password){
                resolve(false);
                return;
            }
            resolve({id: rows[0].idUsuario, nome: rows[0].nome});
        })
    });
    // let foundUser = {};
    // await db_all(db,'SELECT * FROM usuario WHERE email = ?',[email], function(err, rows) {
    //     if (!rows){
    //         return false;
    //     }
    //     //res.send(row.salt);
    //     //res.send(row);
    //     var hash = hashPassword(password, rows[0].salt);
    //     if(hash != rows[0].password){
    //         return false;
    //     }
    //     foundUser = {id: rows[0].idUsuario, nome: rows[0].nome}
    // });
};

async function verificaLogin(req,res,next){
    let email = req.body.emailLogin;
    let password = req.body.pswLogin;
    //res.send(user+' e '+password);
    let db = req.app.locals.db;

    //let foundUser = await db_all(db,'SELECT * FROM usuario');
    let foundUser = await usuarioLogado(db,email,password);
    if(!foundUser){
        req.session.erroLogin = true;
        if(req.session.returnTo == '/')
            return res.redirect(req.session.returnTo+'erro');

        else
            return res.redirect(req.session.returnTo+'/erro');
    }
    // console.log('ID: '+foundUser.id);
    // console.log('USUARIO: '+foundUser.nome);
    req.session.id = foundUser.id;
    req.session.nome = foundUser.nome;
    next();
    //next();
    //foundUser = await usuarioLogado(db,email,password);
    //console.log(foundUser);


    //next();
    //console.log('FORA'+usuarioLogado);
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
    // db.all('SELECT * FROM usuario WHERE email = ?',[email], function(err, rows) {
    //     if (!rows){
    //         req.session.erroLogin = true;
    //         //return res.send(req.session.returnTo+'erro');
    //         if(req.session.returnTo=='/')
    //             return res.redirect(req.session.returnTo+'erro');
    //         else
    //             return res.redirect(req.session.returnTo+'/erro');
    //     }
    //     //res.send(row.salt);
    //     //res.send(row);
    //     var hash = hashPassword(password, rows[0].salt);
    //     if(hash != rows[0].password){
    //         req.session.erroLogin = true;
    //         if(req.session.returnTo=='/')
    //             return res.redirect(req.session.returnTo+'erro');
    //         else
    //             return res.redirect(req.session.returnTo+'/erro');
    //     }
    //     return foundUser = {id: rows[0].idUsuario, nome: rows[0].nome};
        //res.send(foundUser);
        // db.get('SELECT nome, idUsuario FROM usuario WHERE email = ? AND password = ?', [email,hash], function(err, row) {
        // if (!row){
        //     req.session.erroLogin = true;
        //     if(req.session.returnTo=='/')
        //         return res.redirect(req.session.returnTo+'erro');
        //     else
        //         return res.redirect(req.session.returnTo+'/erro');
            
        // } 

        // foundUser = {id: row.idUsuario, name: row.nome};
        // res.send(foundUser); // VALOR ENCONTRADO
        
        //res.send(foundUser); //VALOR PERDIDO
        
        
    //});
    //res.send(usuarioLogado);
    
    //res.send(usuarioLogado);
    //next();
}



router.post('/',verificaLogin,function(req,res) {
    //res.send(res.locals.user);
    //res.send(req.session.returnTo)
    res.redirect(req.session.returnTo);
});

module.exports = router;