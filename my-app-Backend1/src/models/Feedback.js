// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var FeedbackSchema = new Schema({
  receiver_name: { type: String },
  sender_name:{type: String},
  sender_email: { type: String, required: true},
  sender:{type: String},
  receiver_email:{type:String},
  feedbackMessage:{type:String}

},
{
    collection:"Feedback"
});

// the schema is useless so far
// we need to create a model using it
var Feedback = mongoose.model("Feedback", FeedbackSchema,"Feedback");

// make this available to our users in our Node applications
module.exports = Feedback;