// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var MentorSchema = new Schema({
  mentor_name: { type: String, required: true },
  mentor_email: { type: String, required: true},
  mentor_password: { type: String, required: true},
},
{
    collection:"Mentor"
});

var Mentor = mongoose.model("Mentor", MentorSchema,"Mentor");
// self note-the last parameter tells the mongodb server which collection to use ie Customer here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = Mentor;