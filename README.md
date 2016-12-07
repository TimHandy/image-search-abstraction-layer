# Image Search Abstraction Layer

A Free Code Camp assignment.

## Objective

Build a full stack JavaScript app that allows you to search for images [like this]( https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10) and browse recent search queries [like this](https://cryptic-ridge-9197.herokuapp.com/api/latest/imagesearch/). Then deploy it to Heroku.

**User Story**: I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

**User Story**: I can paginate through the responses by adding a ?offset=2 parameter to the URL.

**User Story**: I can get a list of the most recently submitted search strings.

## Notable learning/features

Used the express generator to build the file structure and starter js files.

Used Mongoose to create a schema and access a mongo database.

Used the Request NPM module to make the http request.

Used an external Mongo database host (mLab.com) to host the database.

Pagination via use of the pixabay API and my use of passing an offset value from the url. Grabbed it via req.query.offset and inserted into the API url.

Used dotenv npm module to hide the mongo password... don't forget to 'include' dotenv at the top of your file!

Deployed to Heroku

Used nodemon in the npm script to run the app for development. Need to change this back to node for prod deployment.


## Usage


    /api/imagesearch/lolcats%20funny?offset=3 

Returns a JSON object including several fields

    ?offset=x 

Paginates the results

    /api/latest/imagesearch/

Lists 10 most recently submitted searches


## Dev

for debugging in dev:

    $ DEBUG=express:* npm start