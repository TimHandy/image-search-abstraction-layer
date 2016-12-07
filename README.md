# Image Search Abstraction Layer

A Free Code Camp assignment.

## Objective

Build a full stack JavaScript app that allows you to search for images [like this]( https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10) and browse recent search queries [like this](https://cryptic-ridge-9197.herokuapp.com/api/latest/imagesearch/). Then deploy it to Heroku.

**User Story**: I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

**User Story**: I can paginate through the responses by adding a ?offset=2 parameter to the URL.

**User Story**: I can get a list of the most recently submitted search strings.

## Usage


    /api/imagesearch/lolcats%20funny?offset=3
    
Returns a JSON object including several fields. ?offset=x can be omitted; it will return page 1 of the results.

    ?offset=x 

Paginates the results, i.e. ?offset=3 returns the third set of 10 results. Pixabay does not use 0-based counting for this feature, i.e. 0 is an invalid offset.

    /api/latest/imagesearch/

Returns a JSON object listing the 10 most recently submitted searches


## Notable learning/features

Used the express generator to build the file structure and starter js files.

Used Mongoose to create a schema and access a mongo database.

Used the Request NPM module to make the http request.

Used an external Mongo database host (mLab.com) to host the database.

Pagination via use of the pixabay API and my use of passing an offset value from the url. Grabbed it via req.query.offset and inserted into the API url.

Used dotenv npm module to hide the mongo password... don't forget to 'include' dotenv at the top of your file!

Deployed to Heroku

Used nodemon in the npm script to run the app for development. Need to change this back to node for prod deployment.

Use the 'use strict' at the top of your js files. This will prevent errors why attempting to use ES6 in the code

Express Router: 
    when using Express generator to generate starter code, it uses app.js to list the 'core'? routes, with a combo of a require...
        var api = require('./routes/api');      // and a corresponding api.js file in the routes dir
        and
        app.use('/api', api)  // where anything starting /api is sent to the api file
        
        Then in the api file it starts with a root route of / which actually means /api/anything



Attempted to get 'import * as controller from './search-controller' but it complained about import being a reserved keyword.

Used ejs templating to render the / index route.

For css, with node, this goes in the designated 'public' dir (see app.js) with a link tag in the ejs template linking to it.

## Notes for next time

Use the express generator, I like how the www.js and app.js launch the main app. I like how app.js has the main top level routes, and the routes files have the 'sub-routes?'. Put each of these routes files in it's own 'feature' dir, rather than a routes dir.

Not sure why the /bin/www file and dir naming? Historical reasons? Read up on this.

Create a 'feature' or 'module' dir for each feature... or maybe even each route. Store the code for each route in it's own file in the feature dir, link to the file in the route.js file to keep things modular/tidy like this: 

    router.get( '/api/imagesearch/:SEARCH', controller.insertQuery )
    
insertQuery is a function in controller.js. Will need to export the controller.js function/s.


Found on a forum post on FCC:
"I can't emphasize enough the value of using mocking and unit testing when working through the data transformation of the response from Google. It includes much information that is likely not valuable for this challenge and it's easier to iterate through a solution to extract just what you need if you aren't constantly hitting the actual API.

For this, I used axios, axios-mock-adapter, tape, and ramda. The latter can make the data transformation easier, but it isn't as popular as other functional libraries so Google is not as useful here. The imperative approach to transforming the data works fine, too.

It seems the cse_thumbnail and cse_image keys are optional, so be aware!

https://www.npmjs.com/package/axios-mock-adapter3 
"


I chose not to use the Google custom search as reports of it being crap, crippled and seriously limited in the number of calls you can make to it in the free version.

"The correct API appears to be this:

https://developers.google.com/custom-search/json-api/v1/reference/cse/list12

But you need to create your own "custom" search engine and configure it properly. When you do this, you must ensure "Image search" is enabled. (Off by default). In the actual API call I limited fileType to JPG. This may not be necessary.

The JSON payload will match what the fCC example app produces, so it must be the same API.

Good luck!"



## Dev

for debugging in dev:

    $ DEBUG=express:* npm start