'use strict'
const express = require('express');
const router = express.Router();
const controller = './search-controller';
var request = require('request');


// api routes

const apiKey = '3940337-f222b3f1db1cbb709709cc927'


function createJsonString(apiResponse) {
    let formatted = []
    
    let data = JSON.parse(apiResponse)
    //console.log('data is: ', data)
    
    data.hits.forEach(function(result) {
        //console.log(result.previewURL)
        
       let item = {
        "url": result.webformatURL,
        "tags": result.tags,
        "thumbnail": result.previewURL,
        "context": result.pageURL
        }
        
        console.log(item)
        
        formatted.push(item)
        
    })
    return formatted
}


/* GET image search. */
router.get('/imagesearch/:searchTerm', function(req, res, next) {
    const searchTerm = req.params.searchTerm
    const apiString = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchTerm + '&image_type=photo&per_page=10&page=1&pretty=true'
    //console.log(apiString);
    
    request(apiString, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) 
            
            const apiResponse = createJsonString(body)
            //console.log(apiResponse)
            res.send(apiResponse)
        }
    })
    
    // format an api search string
    // use 'request' module to send to google
    // format the response as below
    // return the response to the screen
    // save search term to mongo, with date
    
    
    //res.render('index', { title: 'Express' });
    //take a look at how to do the offset. leave til last?
});


/*
response should be in following format, 10 at a time
[
    {
        "url": "http://domain.xyz/pic.jpg",
        "snippet": "... Lolcats Funny Cat Pictures",
        "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9rkA",
        "context": "http://cutepersiancat.xyz/funny-cat-pictures/"
    },
]
*/


/* GET latest searches. */
router.get('/latest/imagesearch/', function(req, res, next) {
    console.log('latest searches route');
    //retrieve the latest 10 search entries from mongo
    //format as below
    //send back to the screen
    res.send('latest searches here')
    //res.render('index', { title: 'Express' });
});

module.exports = router;


/*
response should be in following format, returning just latest 10 entries
[
    {
        "term": "lolcats funny",
        "when": "2016-12-06T11:44:33.235Z"
    }
]
*/
