var Feedback = require('../models/Feedback');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var mongoose = require('mongoose');
const GlobalVar = require("../../GlobalVar");
feedback = (req, res, conn) => {
    console.log(req.body);
    let output = "";
    var feedback = Feedback({
        receiver_name: req.body.receiver_name,
  sender_name:req.body.sender_name,
  sender_email: req.body.sender_email,
  sender:req.body.sender,
  receiver_email:req.body.receiver_email,
  feedbackMessage:req.body.feedbackMessage
      });
    feedback.save( function (error, results) {
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
exports.feedback = feedback;