var Mentee = require('../models/Mentee');
var jwt = require('jsonwebtoken');
var passport = require('passport')
const GlobalVar = require("../../GlobalVar");

sendPref = (req, res, conn) => {
    console.log(req.body);
    let output = "";

    Mentee.updateOne({ mentee_email: req.body.email },
        {
            $set: {
                prefGender: req.body.gender.value,
                prefAgeUpper: req.body.ageUpper,
                prefAgeLower: req.body.ageLower,
                prefIndustry: req.body.industry.value,
                prefPersonality: req.body.personality.value,
                prefAdviceCategory: req.body.adviceCategory.value,
                prefInterest: req.body.interest
            }
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

exports.sendPref = sendPref;