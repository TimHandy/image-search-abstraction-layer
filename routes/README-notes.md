# TODOs 


hide the api key

change to the process.env for mongo connection string... comment out the current one and remove the password/username

deploy to heroku, inc env vars.

// TODO handle this error, for eg if offset is greater than there are pages: "[ERROR 400] "page" is out of valid range." is returned from pixabay.


Try doing it like this... to tidy up the routes and make it even more modular.
router.get( '/api/imagesearch/:SEARCH', controller.insertQuery );
insertQuery is a function in controller.js





The correct API appears to be this:

https://developers.google.com/custom-search/json-api/v1/reference/cse/list12

But you need to create your own "custom" search engine and configure it properly. When you do this, you must ensure "Image search" is enabled. (Off by default). In the actual API call I limited fileType to JPG. This may not be necessary.

The JSON payload will match what the fCC example app produces, so it must be the same API.

Good luck!





I can't emphasize enough the value of using mocking and unit testing when working through the data transformation of the response from Google. It includes much information that is likely not valuable for this challenge and it's easier to iterate through a solution to extract just what you need if you aren't constantly hitting the actual API.

For this, I used axios, axios-mock-adapter, tape, and ramda. The latter can make the data transformation easier, but it isn't as popular as other functional libraries so Google is not as useful here. The imperative approach to transforming the data works fine, too.

It seems the cse_thumbnail and cse_image keys are optional, so be aware!

https://www.npmjs.com/package/axios-mock-adapter3






I installed npm google-search, and had npm dotenv loaded before defining the keys and cse_id from my .env file. With that, I'm up and running. Thanks again.



