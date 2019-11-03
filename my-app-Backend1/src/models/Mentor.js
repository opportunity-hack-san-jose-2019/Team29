// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var MentorSchema = new Schema({
  mentor_firstName: { type: String},
  mentor_lastName: { type: String},
  mentor_email: { type: String, required: true},
  mentor_password: { type: String, required: true},
  mentor_phone: { type: String},
  mentor_firstName: { type: String},
  mentor_lastName: { type: String},
  mentor_homeCity: { type: String},
  mentor_workCity: { type: String},
  mentor_ethnicity: { type: String},
  mentor_address: { type: String},
  mentor_age: { type: String},
  mentor_interest: { type: String},
  mentor_gender: { type: String},
  mentor_industry: { type: String},
  mentor_personalities: { type: String},
  mentor_adviceCategory: { type: String},
  mentor_skillSets: { type: Object},
  mentor_media: { type: String},
  mentor_placeToMeet: { type: String},
  mentor_communities: { type: Object},
  mentor_expectations: { type: String},
  mentor_linkedinProfile: { type: String},
  mentor_employer: { type: String},
  mentor_jobTitle: { type: String},
  mentor_mentoringReason: { type: String},
  mentor_mentoringExperience: { type: String},
  mentor_educationLevel: { type: String},
  connect: { type: Array}
},
{
    collection:"Mentor"
});

var Mentor = mongoose.model("Mentor", MentorSchema,"Mentor");
// self note-the last parameter tells the mongodb server which collection to use ie Customer here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = Mentor;