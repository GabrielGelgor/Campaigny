const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const Survey = mongoose.model('surveys'); //By requiring in the model here, we skirt certain linters picking this up as an error.

module.exports = app => {
    app.get('/api/surveys/:surveyId/:choice', (req,res) => {  //A custom route handler for after people vote.
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
        const { title, subject, body, recipients } = req.body; //collecting all of the objects out of the body tupple

        const survey = new Survey({
            title,  //Syntax shortcut for title : title
            subject,
            body,
            recipients: recipients.split(',').map(email =>  ({ email: email.trim() })),
            _user: req.user.id, //The _ indicates that this is a relationship variable
            dateSent: Date.now()
        });

        //A great place to send an email!
        try {
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save(); //Updating the user model within the MongoDB

            res.send(user); //Updating the user model within the redux store
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        
        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname); //Pulls off the path name of the url, stripping away the domain
                if (match) {
                    return { email, surveyId : match.surveyId, choice : match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    $inc: { [choice]: 1 }, //A mongo operator, allows us to put some logic into our query! The square brackets here is a shortcut that replaces itself with the variable's value.
                    $set: {'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value();

        res.send({});
    });

    app.get('/api/surveys', requireLogin, async (req,res) => {
       const surveys = await Survey.find({ _user: req.user.id }).select({ 
           recipients: false 
        });

       res.send(surveys);
    });
}

