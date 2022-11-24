const express = require('express');

const router = express.Router();


// FAZER QUERIES
router.get('/', function(req, res) {
    req.session.erroLogin = false;
    req.session.returnTo = req.originalUrl;
    res.render('noticias');
});

router.get('/erro', function(req,res){
    res.render('noticias', {erroLogin: req.session.erroLogin })
})

module.exports = router;