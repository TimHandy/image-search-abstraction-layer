'use strict'
var express = require('express');
var router = express.Router();


// api routes

/* GET image search. */
router.get('/imagesearch/:searchTerm', function(req, res, next) {
    console.log('hellothere');
    let searchTerm = req.params.searchTerm
    res.send(searchTerm)
    //res.render('index', { title: 'Express' });
});

/* GET latest searches. */
router.get('/latest/imagesearch/', function(req, res, next) {
    console.log('latest searches route');
    res.send('latest searches here')
    //res.render('index', { title: 'Express' });
});

module.exports = router;
