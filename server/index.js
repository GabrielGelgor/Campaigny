/*By convention, index.js is our root file.*/
const express = require('express'); /*commonjs module, nodejs does not support any other.*/
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');//By default, express doesn't care about cookies. This library enables it for us.
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
require('./services/passport'); //as we aren't actually accessing any passport code, and are rather just ensuring it needs to be loaded in, we can save space by not assigning it to a variable.

mongoose.connect(keys.mongoURI);
const app = express(); /*within a single project, we may have multiple express apps. This line initializes a new express application. Sets up configurations that listen to incoming requests, and then routes them onto different route handlers.*/

app.use(bodyParser.json()); //Now whenever we have a request come in with a body, this middleware will parse the body for us and make it easily usable
app.use(
    cookieSession({
        maxAge : 30 * 24 * 60 * 60 * 1000, //allowed TTL for cookie in miliseconds (30 days here)
        keys : [keys.cookieKey] //cookieSession allows us to provide multiple keys within this array which it will choose at random.
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authroutes')(app); //A nice little JS shortcut that we can use since our import returns a function!
require('./routes/billingroutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Making sure that express will serve up production assets
    app.use(express.static('client/build')); //This points the browser to a specific file if it can't find what its looking for
    
    // Making sure express serves up index.html if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000; /* Heroku injects 'environment variables', the PORT variable tells us what port to use on their machine. || assigns a default value.*/
app.listen(PORT);   /*Listen to port PORT using this express application.*/

