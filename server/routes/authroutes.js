const passport = require('passport');

module.exports = (app) => {
    app.get(    //creating a route handler that kicks the user into the PassportJS flow as soon as they go to the correct url.
        '/auth/google', 
        passport.authenticate('google', {   //'google' is an internal alias utilized by GoogleStrategy. This points to the setup we did for the GoogleStrategy.
            scope : ['profile','email']     //This now tells google exactly what info we want to access - the user profile and email.
        })
    );

    app.get(
        '/auth/google/callback', //passportJS now uses the resolved code from the google authentication and grabs the requested information from their server.
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get(
        '/api/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        }
    );

    app.get(    //Helps redux decide whether someone is logged into the application
        '/api/current_user', 
        (req, res) => {
            res.send(req.user);
        }
    );
}