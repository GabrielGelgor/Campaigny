const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users');   //us fetching our model out of mongoose. Doing this instead of requiring it means we can't insert multiple while testing.

//converts userID into a cookie
passport.serializeUser((user, done) => { //user is the actual user profile retrieved from the callback/request
    done(null, user.id); //user.id is NOT googleID! It's a shortcut to the ID assigned to the record by mongo. This let's us assign multiple optional authentication accounts (fb,google,twitter,etc.)
});

//coverts cookie into userID
passport.deserializeUser((id, done) => { //id is our token to convert it into a mongoDB model instance (record)
    User.findById(id)
        .then(user => {
            done(null,user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID : keys.googleClientID,
        clientSecret : keys.googleClientSecret,
        callbackURL : '/auth/google/callback', //Where the user is redirected after being authenticated by google. We will be writing a route handler for this using express!
        proxy : true //As all proxies will be handled by heroku (our host which we trust), we can trust in their security
    }, 
    async (accessToken, refreshToken, profile, done) => { //AccessToken allows us to go back and ask for the information again without another sign in, aka something for the cookie. Refresh token would allow us to refresh the access token for some time. Done is the flag that tells PassportJS we are done authentication.
        const existingUser = await User.findOne( { googleId : profile.id } ) //query our DB to see if the user already exists, this is a JS promise
            if (existingUser) {
                //we have found an existing user with this ID
                return done(null, existingUser); //We're all finished here with no errors, here's the new user.
            }
            
            //we don't have an existing user for this ID, make a new record
            const user = await new User({ googleId : profile.id}).save() //pulls data from the google server's response, saves that information to our MongoDB,
            done(null,user); //Waits for the async query to complete, then let passport know that we're done.

        }
    )
); /* Creates a new instance of the Google passport strategy for google-based authentication. */
