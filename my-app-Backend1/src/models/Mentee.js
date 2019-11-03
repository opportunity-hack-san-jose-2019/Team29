// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var MenteeSchema = new Schema({
  mentee_firstName: { type: String },
  mentee_lastName: { type: String},
  mentee_email: { type: String, required: true},
  mentee_password: { type: String, required: true},
  prefGender: { type: String},
  prefAgeUpper: { type: String},
  prefAgeLower: { type: String},
  prefIndustry: { type: String},
  prefPersonality: { type: String},
  prefAdviceCategory: { type: String},
  prefInterest: { type: String},
  mentee_phone: { type: String},
  mentee_firstName: { type: String},
  mentee_lastName: { type: String},
  mentee_homeCity: { type: String},
  mentee_workCity: { type: String},
  mentee_ethnicity: { type: String},
  mentee_address: { type: String},
  mentee_age: { type: String},
  mentee_interest: { type: String},
  mentee_gender: { type: String},
  mentee_industry: { type: String},
  mentee_personalities: { type: String},
  mentee_adviceCategory: { type: String},
  mentee_skillSets: { type: Object},
  mentee_media: { type: String},
  mentee_placeToMeet: { type: String},
  mentee_communities: { type: Object},
  mentee_expectations: { type: String},
  mentee_linkedinProfile: { type: String},
},
{
    collection:"Mentee"
});

// the schema is useless so far
// we need to create a model using it
var Mentee = mongoose.model("Mentee", MenteeSchema,"Mentee");

// make this available to our users in our Node applications
module.exports = Mentee;