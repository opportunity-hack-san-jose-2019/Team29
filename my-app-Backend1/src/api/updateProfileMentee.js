var Mentee=require('../models/Mentee');

updateProfileMentee=(req,res,conn)=>{
console.log("Inside update profile mentee");
console.log('-->',req.body);
//   for (let [key,value] of skillMap){
//       console.log("key----",key,"value---",value)
//   }
//   skillMap.forEach(item=>{
//       console.log('s item',item)
//   })
//     console.log('smap',skillMap);
//     console.log('cmap',commMap);
  Mentee.findOneAndUpdate({ mentee_email: req.body.email },
    {

            mentee_phone: req.body.phone,
            mentee_firstName: req.body.firstName,
            mentee_lastName: req.body.lastName,
            mentee_homeCity: req.body.homeCity.value,
            mentee_workCity: req.body.workCity.value,
            mentee_ethnicity: req.body.ethnicity.value,
            mentee_address: req.body.address,
            mentee_age: req.body.age,
            mentee_interest: req.body.interest,
            mentee_gender: req.body.gender.value,
            mentee_industry: req.body.industry.value,
            mentee_personalities: req.body.personalities.value,
            mentee_adviceCategory: req.body.adviceCategory.value,
            mentee_skillSets: req.body.skillSets,
            mentee_media: req.body.media.value,
            mentee_placeToMeet: req.body.placeToMeet.value,
            mentee_communities: req.body.communities,
            mentee_expectations: req.body.expectations,
            mentee_linkedinProfile: req.body.linkedinProfile
    },
    function (err, results) {
        if (err) { output = "Failure" }
        else {
            output = "Success";
            console.log('lets check the updateProfileMentee output ', { output: output });
            res.send('Mentee');
        }
    });
}
exports.updateProfileMentee=updateProfileMentee;