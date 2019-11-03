
var Mentee = require('../models/Mentee');
var Mentor = require('../models/Mentor');

let prefGender;
let prefAgeUpper;
let prefAgeLower;
let prefIndustry;
let prefPersonality;
let prefAdviceCategory;
let prefInterest;
let matchCount;
let mentee_homeCity;
let mentee_workCity;
let mentee_ethnicity;
let mentee_placeToMeet;
let mentee_communities;
let mentee_skillSets;
let mentorList=[];

let output;
getMentors = (req, res, conn) => {
    
    console.log(req.body);
    Mentee.find({ mentee_email: req.body.email }, function (err, results) {
        if (err) { output = "Failure" }
        else {mentorList=[];
            console.log("fghgfjhgljkhfcd",results[0].prefGender)
            prefGender = results[0].prefGender;
            prefAgeUpper = results[0].prefAgeUpper;
            prefAgeLower = results[0].prefAgeLower;
            prefIndustry = results[0].prefIndustry;
            prefPersonality = results[0].prefPersonality;
            prefAdviceCategory = results[0].prefAdviceCategory;
            prefInterest = results[0].prefInterest;
            mentee_homeCity= results[0].mentee_homeCity;
            mentee_workCity= results[0].mentee_workCity;
            mentee_ethnicity= results[0].mentee_ethnicity;
            mentee_placeToMeet= results[0].mentee_placeToMeet;
            mentee_skillSets= results[0].mentee_skillSets;
            mentee_communities= results[0].mentee_communities;

            //Calling Mentor to get the matches
            Mentor.find({}, function (error, mentorResult) {
                // console.log('fetching pref output ', { output: output });
                //res.end({ output: output });
                if (err) throw err;
                else {
                    let mentor_data = mentorResult;
                    
                    
                    mentor_data.forEach(element => {
                        let mentorElement=[]; //each individual mentor
                        let profile_Count=0; //profile matched count
                        let count=0; // preference matched count
                        
                        let name=element.mentor_firstName;
                        let email=element.mentor_email;
                        mentorElement.push({email: email});
                        mentorElement.push({name: name});
                        let matchedFields=[]; //preference fields matched
                        let profileMatchedFields=[]; // profile fields matched
                        if (element.mentor_gender==prefGender) {
                            count++;
                            matchedFields.push({key:'gender',value:element.mentor_gender})
                        }
                        if(element.mentor_age>=prefAgeLower && element.mentor_age<=prefAgeUpper) {
                            count++;  
                            matchedFields.push({key:'age',value:element.mentor_age})
                        }  
                        if(element.mentor_industry==prefIndustry) {
                            count++;
                            matchedFields.push({key:'industry',value:element.mentor_industry})
                        }
                        if(element.mentor_personalities==prefPersonality){
                            count++;
                            matchedFields.push({key:'personality',value:element.mentor_personalities})
                        }
                        if(element.mentor_adviceCategory==prefAdviceCategory){
                            count++;
                            matchedFields.push({key:'adviceCategory',value:element.mentor_adviceCategory})
                        }
                        if(prefInterest!=null && element.mentor_interest!=null){
                            let arr=prefInterest.split(',');
                            let commonInterests=[];
                            arr.forEach(function(item) {
                                console.log(item);
                                let brr=element.mentor_interest.split(',');
                                brr.forEach(function(item1){
                                    if(item==item1)
                                    {
                                        count++;
                                        commonInterests.push(item);
                                    }
                                })
                              });
                              matchedFields.push({key:'interests',value:commonInterests})
                        }
                    mentorElement.push({"preference_Count":count*100/5});



                        //Matching profile elements
                        if(element.mentor_homeCity==mentee_homeCity){
                            profile_Count++;
                            profileMatchedFields.push({key:'homeCity',value:element.mentor_homeCity})
                        }
                        if(element.mentor_workCity==mentee_workCity){
                            profile_Count++;
                            profileMatchedFields.push({key:'homeCity',value:element.mentor_workCity})
                        }
                        if(element.mentor_ethnicity==mentee_ethnicity){
                            profile_Count++;
                            profileMatchedFields.push({key:'homeCity',value:element.mentor_ethnicity})
                        }
                        if(element.mentor_placeToMeet==mentee_placeToMeet){
                            profile_Count++;
                            profileMatchedFields.push({key:'homeCity',value:element.mentor_placeToMeet})
                        }
                        if(mentee_communities!=undefined && element.mentor_communities!=undefined){
                            let me_communities='';
                            let mr_communities='';
                            for(let item in mentee_communities)
                            {
                                me_communities+=item;
                                me_communities+=',';
                            }
                            for(let item in element.mentor_communities)
                            {
                                mr_communities+=item;
                                mr_communities+=',';
                            }
                            let arr=me_communities.split(',');
                            let commonCommunities=[];
                            arr.forEach(function(item) {
                                console.log(item);
                                let brr=mr_communities.split(',');
                                brr.forEach(function(item1){
                                    if(item==item1)
                                    {
                                        profile_Count++;
                                        commonCommunities.push(item);
                                    }
                                })
                              });
                              profileMatchedFields.push({key:'communities',value:commonCommunities})
                        }

                        if(mentee_skillSets!=undefined && element.mentor_skillSets!=undefined){
                            let me_skills='';
                            let mr_skills='';
                            for(let item in mentee_skillSets)
                            {
                                me_skills+=item;
                                me_skills+=',';
                            }
                            for(let item in element.mentor_skillSets)
                            {
                                mr_skills+=item;
                                mr_skills+=',';
                            }
                            let arr=me_skills.split(',');
                            let commonSkillSets=[];
                            arr.forEach(function(item) {
                                console.log(item);
                                let brr=mr_skills.split(',');
                                brr.forEach(function(item1){
                                    if(item==item1)
                                    {
                                        profile_Count++;
                                        commonSkillSets.push(item);
                                    }
                                })
                              });
                              profileMatchedFields.push({key:'skillsets',value:commonSkillSets})
                        }
                        // if(element.mentor_skillSets==mentee_skillSets){
                        //     profile_Count++;
                        //     //nachi
                        //     //profileMatchedFields.push({key:'homeCity',value:element.mentor_placeToMeet})
                        // }
                        
                        mentorElement.push({'profile_Count':count*100/6});
                        mentorElement.push({'profileList':profileMatchedFields})
                        mentorElement.push({'preferenceList':matchedFields})

                        mentorList.push(mentorElement);
                        // console.log('mentorlis',men)
                    });
                }
            })
        }
    });
    console.log('fetching pref output ', mentorList);
    res.send({'mentorList':mentorList})
}

exports.getMentors = getMentors;