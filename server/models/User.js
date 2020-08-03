const mongoose = require('mongoose');
const Schema = mongoose.Schema; //const { Schema } = mongoose; : This is us setting up a data schema for our records.

const userSchema = new Schema({ //DB Scheme for this user record
    googleId : String,
    credits : { type : Number, default : 0 }
});

mongoose.model('users', userSchema); //Declaring a new table for our database named users & the data schema userSchema
