var Feedback = require('../models/Feedback');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var mongoose = require('mongoose');
const GlobalVar = require("../../GlobalVar");
getFeedback = (req, res, conn) => {
    console.log(req.body);
    Feedback.find({}, function (error, results) {
        if (error) {
            console.log("error in results ");
            throw error;
        }
        else {
            console.log(results);
            res.send(results);
        };
})
}
exports.getFeedback = getFeedback;