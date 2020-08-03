const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({ //This returns a chainable promise
            amount : 500,
            currency : 'usd',
            description : '$5 for five credits',
            source : req.body.id                //The source of where we are charging. AKA the authorized charge token!
        });
        
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};