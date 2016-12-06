# Lessons Learned

Use the 'use strict' at the top of your js files. This will prevent errors why attempting to use ES6 in the code

Express Router: 
    when using Express generator to generate starter code, it uses app.js to list the 'core'? routes, with a combo of a require...
        var api = require('./routes/api');      // and a corresponding api.js file in the routes dir
        and
        app.use('/api', api)  // where anything starting /api is sent to the api file
        
        Then in the api file it starts with a root route of / which actually means /api/anything



Attempted to get 'import * as controller from './search-controller' but it complained about import being a reserved keyword.