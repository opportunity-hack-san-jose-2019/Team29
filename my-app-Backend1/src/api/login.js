var Mentee = require('../models/Mentee');
var Mentor = require('../models/Mentor');
var jwt = require('jsonwebtoken');
const GlobalVar = require("../../GlobalVar");
login=(req, res, conn, bcrypt)=> {
    let username = req.body.email;
    let password = req.body.password;
    let roleObject = req.body.userOptions;
    let role = roleObject.value;  
    // console.log("about to login", JSON.stringify(req.body));
    if (role == "Mentor") {
      Mentor.find({}, function(err, results) {
        if (err) throw err;
        else {
          let mentor_data = results;
          let flag = 0;
          let passwordInDb = "";
          let nameInDb = "";
          let mentor_id = "";
          mentor_data.forEach(element => {
            if (username == element.mentor_email) {
              flag == 1;
              passwordInDb = element.mentor_password;
              nameInDb = element.mentor_name;
              mentor_id = element["mentor_email"];
            }
          });
        //   console.log(password);
          bcrypt.compare(password, passwordInDb, function(err, resp) {
            if (resp) {
              console.log("mentor logged in succesfully, now cookie time");
              res.cookie("cookie", "mentor", {
                path: "/"
              });
              res.cookie("email", username);
              res.cookie("name", nameInDb, {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
              });
              res.cookie("idGeneric", "c_" + mentor_id, {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
              });
              let token=jwt.sign({email: username},GlobalVar['secret']);
              token="Bearer "+token;
              console.log('token is----',token);
              res.setHeader("Access-Control-Expose-Headers", "Authorization");
              res.header({"Authorization": token})
              res.send("Mentor");
            } else {
              res.send("error");
            }
          });
        }
      });
      

      // w/o mongo
      // var queryString = "select * from mentoromer";
      // conn.query(queryString, function(error, results) {
      //   if (error) {
      //     console.log("nvt0");
      //     res.send("error");
      //   } else {
      //     let mentor_data = results;
      //     let flag = 0;
      //     let passwordInDb = "";
      //     let nameInDb = "";
      //     let mentor_id = "";
      //     mentor_data.forEach(element => {
      //       if (username == element.mentor_email) {
      //         flag == 1;
      //         passwordInDb = element.mentor_password;
      //         nameInDb = element.mentor_name;
      //         mentor_id = element["mentor_id"];
      //       }
      //     });
      //     console.log(password);
      //     bcrypt.compare(password, passwordInDb, function(err, resp) {
      //       if (resp) {
      //         console.log("nvt2");
      //         res.cookie("cookie", "mentoromer", {
      //           maxAge: 900000,
      //           httpOnly: false,
      //           path: "/"
      //         });
      //         res.cookie("email", username, {
      //           maxAge: 900000,
      //           httpOnly: false,
      //           path: "/"
      //         });
      //         res.cookie("name", nameInDb, {
      //           maxAge: 900000,
      //           httpOnly: false,
      //           path: "/"
      //         });
      //         res.cookie("mentor_id", mentor_id, {
      //           maxAge: 900000,
      //           httpOnly: false,
      //           path: "/"
      //         });
      //         res.cookie("idGeneric", "c_" + mentor_id, {
      //           maxAge: 900000,
      //           httpOnly: false,
      //           path: "/"
      //         });
      //         res.writeHead(200, {
      //           "Content-Type": "text/plain"
      //         });
      //         res.end("Successful Login");
      //       } else {
      //         res.send("error");
      //       }
      //     });
      //   }
      // });
    } else if (role == "Mentee") {
      Mentee.find({}, function(err, results) {
        if (err) throw err;
        else {
          let mentee_data = results;
          let flag = 0;
          let passwordInDb = "";
          let nameInDb = "";
          let mentee_id = "";
          mentee_data.forEach(element => {
            if (username == element.mentee_email) {
              flag == 1;
              passwordInDb = element.mentee_password;
              nameInDb = element.mentee_name;
              rest_id = element["mentee_email"];
            }
          });
          bcrypt.compare(password, passwordInDb, function(err, resp) {
            console.log("mentee logged in succesfully, now cookie time");
            if (resp) {
              res.cookie("cookie", "mentee", {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
              });
              res.cookie("email", username, {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
              });
              res.cookie("name", nameInDb, {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
              });
              res.cookie("rest_id", rest_id, {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
              });
              res.cookie("idGeneric", "r_" + rest_id, {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
              });
              let token=jwt.sign({email: username},GlobalVar['secret']);
              token="Bearer "+token;
              console.log('token is----',token);
              res.setHeader("Access-Control-Expose-Headers", "Authorization");
              res.header({"Authorization": token})
              res.send("Mentee");
            } else {
              res.send("error");
            }
          });
        }

      });

      // w/o mongo
      // var queryString = "select * from Restaurant";
      // conn.query(queryString, function(error, results) {
      //   if (error) {
      //     console.log("nvt0");
      //     res.send("error");
      //   } else {
      //     let rest_data = results;
      //     let flag = 0;
      //     let passwordInDb = "";
      //     let nameInDb = "";
      //     let rest_id = "";
      //     rest_data.forEach(element => {
      //       if (username == element.rest_email) {
      //         flag == 1;
      //         passwordInDb = element.rest_password;
      //         nameInDb = element.rest_name;
      //         rest_id = element["rest_id"];
      //       }
      //     });
      //     bcrypt.compare(password, passwordInDb, function(err, resp) {
      //       if (resp) {
      //         res.cookie("cookie", "restaurant", {
      //           maxAge: 900000,
      //           httpOnly: false,
      //           path: "/"
      //         });
      //         res.cookie("email", username, {
      //           maxAge: 900000,
      //           httpOnly: false,
      //           path: "/"
      //         });
      //         res.cookie("name", nameInDb, {
      //           maxAge: 900000,
      //           httpOnly: false,
      //           path: "/"
      //         });
      //         res.cookie("rest_id", rest_id, {
      //           maxAge: 900000,
      //           httpOnly: false,
      //           path: "/"
      //         });
      //         res.cookie("idGeneric", "r_" + rest_id, {
      //           maxAge: 900000,
      //           httpOnly: false,
      //           path: "/"
      //         });
      //         res.writeHead(201, {
      //           "Content-Type": "text/plain"
      //         });
      //         res.end("Successful Login");
      //       } else {
      //         res.send("error");
      //       }
      //     });
      //   }
      // });
    }
}
exports.login=login;