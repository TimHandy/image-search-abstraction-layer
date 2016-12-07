'use strict'
require('dotenv').config();
const express = require('express');
const router = express.Router();
const controller = './search.controller';
const request = require('request');

const apiKey = '3940337-f222b3f1db1cbb709709cc927'

// Note to self: silence errors on production (Heroku) from dotenv complaining about lack of .env file: On Heroku the environment vars are added manually on the Settings page.


/* Mongoose and mLab setup ---------------------------------------------------*/

/* ----------------------------------------------------------------------------
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for 
 * plenty of time in most operating environments.
 =============================================================================*/

const options = {
    server: {
        socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
    }, 
    replset: {
        socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
    }
}

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// const mongoConnectStr = 'mongodb://process.env.mongoUser:process.env.mongoPassword@ds147777.mlab.com:47777/urlshortenerdb'
const mongoConnectStr = 'mongodb://' + process.env.mongoUser + ':' + process.env.mongoPassword + '@ds127928.mlab.com:27928/image-search-abstraction-layer'
//mongoose.connect('mongodb://' + process.env.mongoUser + ':' + process.env.mongoPassword + '@ds147777.mlab.com:47777/urlshortenerdb', options) 
mongoose.connect(mongoConnectStr, options, function(err) {
    if (err) {
        throw err
    } else {
        console.log('Mongoose connected successfully!')
    }
})
const searchModel = require('../search.model')


/*  End of Mongoose and mLab set up ----------------------------------------- */


function addSearchToDatabase(searchTerm) {
    
    const newModelInstance = new searchModel({
            term: searchTerm,
            when: new Date().toISOString()
        })
    
    // save instance to the database
    newModelInstance.save(function(err, data) {
        if (err) {
            throw err
        } else {
            console.log('Search term added to database successfully!')
        }
    })
}


function createJsonString(apiResponse) {
    let formatted = []
    
    let data = JSON.parse(apiResponse)
    //console.log('data is: ', data)
    
    // format the response
    data.hits.forEach(function(result) {
        let item = {
        "url": result.webformatURL,
        "tags": result.tags,
        "thumbnail": result.previewURL,
        "context": result.pageURL
        }
        
        formatted.push(item)
    })
    return formatted
}
/*
response should be in following format, 10 entries at a time:
[
    {
        "url": "http://domain.xyz/pic.jpg",
        "snippet": "... Lolcats Funny Cat Pictures",
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9rkA",
        "context": "http://cutepersiancat.xyz/funny-cat-pictures/"
    },
]
*/



/* // GET /api/imagesearch/:searchTerm?offset=x */
router.get('/imagesearch/:searchTerm', function(req, res, next) {
    const searchTerm = req.params.searchTerm
    let offset = ''
    if ( isNaN(req.query.offset) ) {
        offset = 1
    } else {
        offset = req.query.offset
    }
    const apiString = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchTerm + '&image_type=photo&per_page=10&page=' + offset + '&pretty=true'
    console.log(apiString);
    //console.log('offset: ', req.query.offset);
    
    
    request(apiString, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            //console.log(body) 
            
            const apiResponse = createJsonString(body)
            console.log(apiResponse)
            
            // return the response to the screen
            res.send(apiResponse)
            addSearchToDatabase(searchTerm)
        } else {
            res.send("Oh Noes! Error! Error! Bad things.") // TODO handle this error, for eg if offset is greater than there are pages: "[ERROR 400] "page" is out of valid range." is returned from pixabay.
        }
    })
});


/* GET latest searches. */
router.get('/latest/imagesearch/', function(req, res, next) {
    console.log('latest searches route');
    
    searchModel.find({}).sort('-when').limit(10).exec(function(err, data) {
        const formattedResults = []
        console.log('data: ', data);
        data.forEach(function(searchItem) {
            let item = {
                "term": searchItem.term,
                "when": searchItem.when
            }
            formattedResults.push(item)
        })
        res.send( formattedResults )
    })
});

/*
response should be in following format, returning just latest 10 search entries:
[
    {
        "term": "lolcats funny",
        "when": "2016-12-06T11:44:33.235Z"
    }
]
*/

module.exports = router;