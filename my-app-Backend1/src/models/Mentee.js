// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var MenteeSchema = new Schema({
  mentee_firstName: { type: String, required: true },
  mentee_lastName: { type: String, required: true },
  mentee_email: { type: String, required: true},
  mentee_password: { type: String, required: true},
},
{
    collection:"Mentee"
});

// the schema is useless so far
// we need to create a model using it
var Mentee = mongoose.model("Mentee", MenteeSchema,"Mentee");

// make this available to our users in our Node applications
module.exports = Mentee;