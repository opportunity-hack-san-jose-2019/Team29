var Mentor = require('../models/Mentor');
var Mentee = require('../models/Mentee');
var jwt=require('jsonwebtoken');
var passport=require('passport')
const GlobalVar = require("../../GlobalVar");

signup=(req, res, conn, bcrypt,saltRounds)=> {
  console.log(req.body);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let password = req.body.password;
  let username = req.body.email;
  let roleObject = req.body.userOptions;
  let role = roleObject.value;
  if (role == "Mentor") {  
    //---------------w/ mongobd
    let mentor_id="";
    var mentor = Mentor({
      mentor_firstName: firstName,
      mentor_lastName: lastName,
      mentor_email: username,
    });
    Mentor.find({}, function(err, results) {
      if (err) throw err;
      let mentor_data = results;
      let flag = 0;
      mentor_data.forEach(element => {
        if (username == element.mentor_email) {
          flag = 1;
        }
        mentor_id = element.mentor_email;
        console.log("in mentor signup with mentor id:", mentor_id);
      });
      mentor_id++;
      if (flag == 1) {
        console.log("mentor id exists");
        res.send("exists");
      } else {
        bcrypt.hash(password, saltRounds, function(err, hash) {
          mentor.mentor_password=hash;
          mentor.save(function(err) {
            if (err) throw err;
          
            console.log('User saved successfully!');
            console.log("cookie time");
                  res.cookie("cookie", "mentor", {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("email", username, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("firstName", firstName, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("mentor_id", mentor_id, {
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
                  res.end("Successful Account Creation");
          });
      // object of all the users
      console.log('mentors',results);
      
    });
  }});
////---------------w/o mongodb
    // var queryString = "select * from mentoromer";
    // let mentor_id = 0;
    // conn.query(queryString, function(error, results) {
    //   if (error) {
    //     console.log("nvt001");
    //     res.send("error");
    //   } else {
    //     let mentor_data = results;
    //     let flag = 0;
    //     mentor_data.forEach(element => {
    //       if (username == element.mentor_email) {
    //         flag = 1;
    //       }
    //       mentor_id = element.mentor_id;
    //       console.log("first here----", mentor_id);
    //     });
    //     mentor_id++;
    //     if (flag == 1) {
    //       console.log("here");
    //       res.send("exists");
    //     } else {
    //       bcrypt.hash(password, saltRounds, function(err, hash) {
    //         var queryString1 =
    //           "INSERT INTO mentoromer (mentor_name,mentor_email,mentor_password,mentor_phone,mentor_zipcode) VALUES (?,?,?,?,?)";
    //         conn.query(
    //           queryString1,
    //           [name, username, hash, phone, zipcode],
    //           function(error, results) {
    //             if (error) {
    //               console.log("error here----", error);
    //               res.send("error");
    //             } else {
    //               console.log("cookie timeeeeee");
    //               res.cookie("cookie", "mentoromer", {
    //                 maxAge: 900000,
    //                 httpOnly: false,
    //                 path: "/"
    //               });
    //               res.cookie("email", username, {
    //                 maxAge: 900000,
    //                 httpOnly: false,
    //                 path: "/"
    //               });
    //               res.cookie("name", name, {
    //                 maxAge: 900000,
    //                 httpOnly: false,
    //                 path: "/"
    //               });
    //               res.cookie("mentor_id", mentor_id, {
    //                 maxAge: 900000,
    //                 httpOnly: false,
    //                 path: "/"
    //               });
    //               res.cookie("idGeneric", "c_" + mentor_id, {
    //                 maxAge: 900000,
    //                 httpOnly: false,
    //                 path: "/"
    //               });
    //               res.writeHead(200, {
    //                 "Content-Type": "text/plain"
    //               });
    //               res.end("Successful Account Creation");
    //             }
    //           }
    //         );
    //       });
    //     }
    //   }
    // });
  } else if (role == "Mentee") {
    let mentee_id = "";
    //---------------w/ mongobd
    var mentee = Mentee({
      mentee_firstName: firstName,
      mentee_lastName: lastName,
      mentee_email: username 
    });
    Mentee.find({}, function(err, results) {
      if (err) throw err;
      let mentee_data = results;
      let flag = 0;
      mentee_data.forEach(element => {
        if (username == element.mentee_email) {
          flag = 1;
        }
        mentee_id = element.mentee_email;
        console.log("in mentee signup with mentee id:", mentee_id);
      });
      mentee_id++;
      if (flag == 1) {
        console.log("mentee id exists");
        res.send("exists");
      } else {
        bcrypt.hash(password, saltRounds, function(err, hash) {
          mentee.mentee_password=hash;
          mentee.save(function(err) {
            if (err) throw err;
          
            console.log('User saved successfully!');
            console.log("cookie time");
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
                  res.cookie("firstName", firstName, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("mentee_id", mentee_id, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("idGeneric", "r_" + mentee_id, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  let token=jwt.sign({email: username},GlobalVar['secret']);
                  token="Bearer "+token;
                  console.log('token is----',token);
                  res.setHeader("Access-Control-Expose-Headers", "Authorization");
                  res.header({"Authorization": token})
                  res.end("Successful Account Creation");
          });
      // object of all the users
      console.log('mentee',results);
      
    });
  }});
////---------------w/o mongodb
  //   var queryString = "select * from menteeaurant";
  //   conn.query(queryString, function(error, results) {
  //     if (error) {
  //       res.send("error");
  //     } else {
  //       let mentee_data = results;
  //       let flag = 0;
  //       mentee_data.forEach(element => {
  //         if (username == element.mentee_email) {
  //           flag = 1;
  //         }
  //         mentee_id = element.mentee_id;
  //       });
  //       mentee_id++;
  //       if (flag == 1) {
  //         res.send("exists");
  //       } else {
  //         bcrypt.hash(password, saltRounds, function(err, hash) {
  //           var queryString1 =
  //             "INSERT INTO menteeaurant (mentee_name,mentee_email,mentee_password,mentee_phone,mentee_zipcode) VALUES (?,?,?,?,?)";
  //           conn.query(
  //             queryString1,
  //             [name, username, hash, phone, zipcode],
  //             function(error, results) {
  //               if (error) {
  //                 console.log("nvt0-");
  //                 res.send("error");
  //               } else {
  //                 res.cookie("cookie", "menteeaurant", {
  //                   maxAge: 900000,
  //                   httpOnly: false,
  //                   path: "/"
  //                 });
  //                 res.cookie("email", username, {
  //                   maxAge: 900000,
  //                   httpOnly: false,
  //                   path: "/"
  //                 });
  //                 res.cookie("name", name, {
  //                   maxAge: 900000,
  //                   httpOnly: false,
  //                   path: "/"
  //                 });
  //                 res.cookie("mentee_id", mentee_id, {
  //                   maxAge: 900000,
  //                   httpOnly: false,
  //                   path: "/"
  //                 });
  //                 res.cookie("idGeneric", "r_" + mentee_id, {
  //                   maxAge: 900000,
  //                   httpOnly: false,
  //                   path: "/"
  //                 });
  //                 res.writeHead(201, {
  //                   "Content-Type": "text/plain"
  //                 });
  //                 res.end("Successful Account Creation");
  //               }
  //             }
  //           );
  //         });
  //       }
  //     }
  //   });
  }
}
exports.signup=signup;