var Mentor = require('../models/Mentor');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var mongoose = require('mongoose');
const GlobalVar = require("../../GlobalVar");
getMatchesME = (req, res, conn) => {
    console.log(req.body);
    let output = "";
    Mentor.find({ "connect.mentee_email": req.body.mentee_email}, { connect: 1 }, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            console.log(results);
            //connect = JSON.stringify(results);
            res.send(results);
        };
})
}
exports.getMatchesME = getMatchesME;