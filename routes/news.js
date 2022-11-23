const express = require('express');

const router = express.Router();


// FAZER QUERIES
router.get('/', function(req, res) {
    req.session.returnTo = req.originalUrl;
    res.render('noticias');
});

module.exports = router;