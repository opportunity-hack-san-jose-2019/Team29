var Mentor = require('../models/Mentor');
var Mentee= require ('../models/Mentee');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var mongoose = require('mongoose');
const GlobalVar = require("../../GlobalVar");
getMatchesMR = (req, res, conn) => {
    console.log(req.body);
    let output = "";
    Mentor.find({ mentor_email: req.body.mentor_email}, {connect: 1 }, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            // Mentee.find({},function(err,menteeResult){
            //     results[0].connect.forEach(element=>{
            //         menteeResult.forEach(ele=>{
            //             if(ele.mentee_email==element.mentor_email){
            //                 results[0].connect.
            //             }
            //         })
            //     })
            // })
            console.log(results);
            //connect = JSON.stringify(results);
            res.send(results);
        };
})
}
exports.getMatchesMR = getMatchesMR;