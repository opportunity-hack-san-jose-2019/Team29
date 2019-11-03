var Mentor = require('../models/Mentor');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var mongoose = require('mongoose');
const GlobalVar = require("../../GlobalVar");

getConnectRequest = (req, res, conn) => {
    console.log(req.body);
    let output = "";

    Mentor.find({ mentor_email: req.body.mentor_email, connect:{$elemMatch:{connectStatus:"Request"}}}, { connect: 1}, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            console.log(results);
            //connect = JSON.stringify(results);
            res.send(results);
        }
})
}
exports.getConnectRequest = getConnectRequest; 