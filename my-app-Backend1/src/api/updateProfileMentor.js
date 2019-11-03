var Mentor=require('../models/Mentor');

updateProfileMentor=(req,res,conn)=>{
console.log("Inside update profile mentor");
  console.log(req.body);
  Mentor.findOneAndUpdate({ mentor_email: req.body.email },
    {
            mentor_phone: req.body.phone,
            mentor_firstName: req.body.firstName,
            mentor_lastName: req.body.lastName,
            mentor_homeCity: req.body.homeCity.value,
            mentor_workCity: req.body.workCity.value,
            mentor_ethnicity: req.body.ethnicity.value,
            mentor_address: req.body.address,
            mentor_hobbies: req.body.hobbies,
            mentor_age: req.body.age,
            mentor_interest: req.body.interest,
            mentor_gender: req.body.gender.value,
            mentor_industry: req.body.industry.value,
            mentor_personalities: req.body.personalities.value,
            mentor_adviceCategory: req.body.adviceCategory.value,
            mentor_skillSets: req.body.skillSets,
            mentor_media: req.body.media.value,
            mentor_placeToMeet: req.body.placeToMeet.value,
            mentor_communities: req.body.communities,
            mentor_expectations: req.body.expectations,
            mentor_linkedinProfile: req.body.linkedinProfile,
            mentor_employer: req.body.employer,
            mentor_jobTitle: req.body.jobTitle,
            mentor_mentoringReason: req.body.mentoringReason,
            mentor_mentoringExperience: req.body.mentoringExperience,
            mentor_educationLevel: req.body.educationLevel.value
    },
    function (err, results) {
        if (err) { output = "Failure" }
        else {
            output = "Success";
            console.log('lets check the sendPref output ', { output: output });
            res.send({ output: output });
        }
    });
}
exports.updateProfileMentor=updateProfileMentor;