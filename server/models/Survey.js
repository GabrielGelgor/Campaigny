const mongoose = require('mongoose');
const Schema = mongoose.Schema; //const { Schema } = mongoose; : This is us setting up a data schema for our records.
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({ //DB Scheme for this user record
    title : String,
    body : String,
    subject : String,
    recipients : [RecipientSchema], //Defining an Array of Strings
    yes : { type: Number, default: 0},
    no : { type: Number, default: 0},
    _user : { type: Schema.Types.ObjectId, ref: 'User' },  //We add the idea here that each record will be associated (referred with) with a UserID
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema); //Declaring a new table for our database named users & the data schema userSchema
