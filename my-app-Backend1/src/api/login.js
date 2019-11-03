// var Customer = require('../models/Customer');
// var Restaurant = require('../models/Restaurant');
// var jwt = require('jsonwebtoken');
// const GlobalVar = require("../GlobalVar");
//     gtyt
// login=(req, res, conn, bcrypt)=> {
//     let username = req.body.username;
//     let password = req.body.password;
//     let roleObject = req.body.role;
//     let role = roleObject.value;  
//     console.log("about to login", JSON.stringify(req.body));
//     if (role == "Customer") {
//       Customer.find({}, function(err, results) {
//         if (err) throw err;
//         else {
//           let cust_data = results;
//           let flag = 0;
//           let passwordInDb = "";
//           let nameInDb = "";
//           let cust_id = "";
//           cust_data.forEach(element => {
//             if (username == element.cust_email) {
//               flag == 1;
//               passwordInDb = element.cust_password;
//               nameInDb = element.cust_name;
//               cust_id = element["cust_id"];
//             }
//           });
//           console.log(password);
//           bcrypt.compare(password, passwordInDb, function(err, resp) {
//             if (resp) {
//               console.log("cust logged in succesfully, now cookie time");
//               res.cookie("cookie", "customer", {
//                 maxAge: 900000,
//                 httpOnly: false,
//                 path: "/"
//               });
//               res.cookie("email", username, {
//                 maxAge: 900000,
//                 httpOnly: false,
//                 path: "/"
//               });
//               res.cookie("name", nameInDb, {
//                 maxAge: 900000,
//                 httpOnly: false,
//                 path: "/"
//               });
//               res.cookie("cust_id", cust_id, {
//                 maxAge: 900000,
//                 httpOnly: false,
//                 path: "/"
//               });
//               res.cookie("idGeneric", "c_" + cust_id, {
//                 maxAge: 900000,
//                 httpOnly: false,
//                 path: "/"
//               });
//               let token=jwt.sign({email: username},GlobalVar['secret']);
//               token="Bearer "+token;
//               console.log('token is----',token);
//               res.setHeader("Access-Control-Expose-Headers", "Authorization");
//               res.header({"Authorization": token})
//               res.end("Successful Login");
//             } else {
//               res.send("error");
//             }
//           });
//         }
//       });
      

// //       // w/o mongo
// //       // var queryString = "select * from Customer";
// //       // conn.query(queryString, function(error, results) {
// //       //   if (error) {
// //       //     console.log("nvt0");
// //       //     res.send("error");
// //       //   } else {
// //       //     let cust_data = results;
// //       //     let flag = 0;
// //       //     let passwordInDb = "";
// //       //     let nameInDb = "";
// //       //     let cust_id = "";
// //       //     cust_data.forEach(element => {
// //       //       if (username == element.cust_email) {
// //       //         flag == 1;
// //       //         passwordInDb = element.cust_password;
// //       //         nameInDb = element.cust_name;
// //       //         cust_id = element["cust_id"];
// //       //       }
// //       //     });
// //       //     console.log(password);
// //       //     bcrypt.compare(password, passwordInDb, function(err, resp) {
// //       //       if (resp) {
// //       //         console.log("nvt2");
// //       //         res.cookie("cookie", "customer", {
// //       //           maxAge: 900000,
// //       //           httpOnly: false,
// //       //           path: "/"
// //       //         });
// //       //         res.cookie("email", username, {
// //       //           maxAge: 900000,
// //       //           httpOnly: false,
// //       //           path: "/"
// //       //         });
// //       //         res.cookie("name", nameInDb, {
// //       //           maxAge: 900000,
// //       //           httpOnly: false,
// //       //           path: "/"
// //       //         });
// //       //         res.cookie("cust_id", cust_id, {
// //       //           maxAge: 900000,
// //       //           httpOnly: false,
// //       //           path: "/"
// //       //         });
// //       //         res.cookie("idGeneric", "c_" + cust_id, {
// //       //           maxAge: 900000,
// //       //           httpOnly: false,
// //       //           path: "/"
// //       //         });
// //       //         res.writeHead(200, {
// //       //           "Content-Type": "text/plain"
// //       //         });
// //       //         res.end("Successful Login");
// //       //       } else {
// //       //         res.send("error");
// //       //       }
// //       //     });
// //       //   }
// //       // });
// //     } else if (role == "Restaurant") {
// //       Restaurant.find({}, function(err, results) {
// //         if (err) throw err;
// //         else {
// //           let rest_data = results;
// //           let flag = 0;
// //           let passwordInDb = "";
// //           let nameInDb = "";
// //           let rest_id = "";
// //           rest_data.forEach(element => {
// //             if (username == element.rest_email) {
// //               flag == 1;
// //               passwordInDb = element.rest_password;
// //               nameInDb = element.rest_name;
// //               rest_id = element["rest_id"];
// //             }
// //           });
// //           bcrypt.compare(password, passwordInDb, function(err, resp) {
// //             console.log("rest logged in succesfully, now cookie time");
// //             if (resp) {
// //               res.cookie("cookie", "restaurant", {
// //                 maxAge: 900000,
// //                 httpOnly: false,
// //                 path: "/"
// //               });
// //               res.cookie("email", username, {
// //                 maxAge: 900000,
// //                 httpOnly: false,
// //                 path: "/"
// //               });
// //               res.cookie("name", nameInDb, {
// //                 maxAge: 900000,
// //                 httpOnly: false,
// //                 path: "/"
// //               });
// //               res.cookie("rest_id", rest_id, {
// //                 maxAge: 900000,
// //                 httpOnly: false,
// //                 path: "/"
// //               });
// //               res.cookie("idGeneric", "r_" + rest_id, {
// //                 maxAge: 900000,
// //                 httpOnly: false,
// //                 path: "/"
// //               });
// //               let token=jwt.sign({email: username},GlobalVar['secret']);
// //               token="Bearer "+token;
// //               console.log('token is----',token);
// //               res.setHeader("Access-Control-Expose-Headers", "Authorization");
// //               res.header({"Authorization": token})
// //               res.end("Successful Login");
// //             } else {
// //               res.send("error");
// //             }
// //           });
// //         }

// //       });

// //       // w/o mongo
// //       // var queryString = "select * from Restaurant";
// //       // conn.query(queryString, function(error, results) {
// //       //   if (error) {
// //       //     console.log("nvt0");
// //       //     res.send("error");
// //       //   } else {
// //       //     let rest_data = results;
// //       //     let flag = 0;
// //       //     let passwordInDb = "";
// //       //     let nameInDb = "";
// //       //     let rest_id = "";
// //       //     rest_data.forEach(element => {
// //       //       if (username == element.rest_email) {
// //       //         flag == 1;
// //       //         passwordInDb = element.rest_password;
// //       //         nameInDb = element.rest_name;
// //       //         rest_id = element["rest_id"];
// //       //       }
// //       //     });
// //       //     bcrypt.compare(password, passwordInDb, function(err, resp) {
// //       //       if (resp) {
// //       //         res.cookie("cookie", "restaurant", {
// //       //           maxAge: 900000,
// //       //           httpOnly: false,
// //       //           path: "/"
// //       //         });
// //       //         res.cookie("email", username, {
// //       //           maxAge: 900000,
// //       //           httpOnly: false,
// //       //           path: "/"
// //       //         });
// //       //         res.cookie("name", nameInDb, {
// //       //           maxAge: 900000,
// //       //           httpOnly: false,
// //       //           path: "/"
// //       //         });
// //       //         res.cookie("rest_id", rest_id, {
// //       //           maxAge: 900000,
// //       //           httpOnly: false,
// //       //           path: "/"
// //       //         });
// //       //         res.cookie("idGeneric", "r_" + rest_id, {
// //       //           maxAge: 900000,
// //       //           httpOnly: false,
// //       //           path: "/"
// //       //         });
// //       //         res.writeHead(201, {
// //       //           "Content-Type": "text/plain"
// //       //         });
// //       //         res.end("Successful Login");
// //       //       } else {
// //       //         res.send("error");
// //       //       }
// //       //     });
// //       //   }
// //       // });
// //     }
// // }
// // exports.login=login;