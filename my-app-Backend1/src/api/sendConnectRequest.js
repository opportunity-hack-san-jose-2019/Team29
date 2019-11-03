var Mentor = require('../models/Mentor');
var Mentee = require('../models/Mentee')
var jwt = require('jsonwebtoken');
var passport = require('passport');
var mongoose = require('mongoose');
const GlobalVar = require("../../GlobalVar");

sendConnectRequest = (req, res, conn) => {
    console.log(req.body);
    let output = "";

    Mentee.find({mentee_email: req.body.mentee_email},{mentee_firstName:1,mentee_lastName:1},function(error,result){
        if(error){console.log("error")}
        else{
            console.log("result",result);
            let mentee_name=result[0].mentee_firstName+" "+result[0].mentee_lastName;
    Mentor.updateOne({ mentor_email: req.body.mentor_email },
        {
            $push: {
                connect:{
                    connectId: new mongoose.Types.ObjectId(),
                    mentee_email: req.body.mentee_email,
                    message: req.body.message,
                    connectStatus: req.body.connectStatus,
                    mentee_name: mentee_name
                }
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
    })
}

exports.sendConnectRequest = sendConnectRequest;