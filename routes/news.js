const express = require('express');

const router = express.Router();


// FAZER QUERIES
router.get('/', function(req, res) {
    res.render('noticias');
});

module.exports = router;