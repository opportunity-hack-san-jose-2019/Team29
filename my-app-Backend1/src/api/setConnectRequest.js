var Mentor = require('../models/Mentor');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var mongoose = require('mongoose');
const GlobalVar = require("../../GlobalVar");

setConnectRequest = (req, res, conn) => {
    console.log(req.body);
    let output = "";
    if(req.body.appointment=='' || req.body.appointment==null){}
    Mentor.updateOne({ mentor_email: req.body.mentor_email, connect: { $elemMatch: { connectId: mongoose.Types.ObjectId(req.body.connectId)} }  },
        {
            "$set": {
                // "section.$":section1
                "connect.$.connectStatus": req.body.connectStatus,
                "connect.$.appointment": req.body.appointment
            }
        },
        { connect: { $elemMatch: { connectId: req.body.connectId } } },
        function (error, results) {
            if (error) {
                console.log("error in results ", error);
                throw error;
            }
            else {
                console.log(results, "-----------------");
                output = Mentor.find({ mentor_email: req.body.mentor_email }, { connect: 1 }, function (error, result) {
                    result = JSON.stringify(result);
                    console.log(result);
                    // res.cookie('section', result, { maxAge: 900000, httpOnly: false, path: '/' });
                    res.status(200).send(result);
                });
            };
        });
}

exports.setConnectRequest = setConnectRequest;