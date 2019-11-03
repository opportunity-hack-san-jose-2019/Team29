//package imports
var express = require("./node_modules/express");
var app = express();
var bodyParser = require("./node_modules/body-parser");
var session = require("./node_modules/express-session");
var cookieParser = require("./node_modules/cookie-parser");
var cors = require("./node_modules/cors/lib");
var mysql = require("./node_modules/mysql");
var corsPrefetch = require("./node_modules/cors-prefetch-middleware/lib");
var jwt = require('./node_modules/jsonwebtoken');
var passport = require("./node_modules/passport/lib");
var passportJWT = require("./node_modules/passport-jwt/lib");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

//api declarations
var Database=require('../my-app-Backend1/Database');
var login=require('./src/api/login');
var signup=require('./src/api/signup');
var getProfileMentee=require('./src/api/getProfileMentee')
var getProfileMentor=require('./src/api/getProfileMentor')
var updateProfileMentee=require('./src/api/updateProfileMentee')
var updateProfileMentor= require('./src/api/updateProfileMentor.js')
var sendPref= require('./src/api/sendPref.js')
var getMentors= require('./src/api/getMentors.js')
var sendConnectRequest= require('./src/api/sendConnectRequest.js')
var setConnectRequest= require('./src/api/setConnectRequest.js')
var getConnectRequest= require('./src/api/getConnectRequest.js')
var getMatchesMR= require('./src/api/getMatchesMR.js')
var getMatchesME= require('./src/api/getMatchesME.js')
var feedback= require('./src/api/feedback.js')


//few constants declarations
const GlobalVar = require("./GlobalVar");
const bcrypt = require("./node_modules/bcrypt/bcrypt");
const saltRounds = 10;

//mongodb model declaration for passport jwt
var Mentor = require('./src/models/Mentor');
var Mentee = require('./src/models/Mentee');

//express delcarations
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static(__dirname + "/images"));
//app.use(corsPrefetch);
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors({origin: GlobalVar['hostedAddress'] + ":3000", credentials:true})); //self note-use cors to allow cross origin resource sharing
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);//self note-we use express session to maintain session data
app.use(bodyParser.json());

// DB settings-MySQL-uncommented because conn is pased to the apis
var conn = mysql.createPool({
  host: "database-grubhub-app.cdmfb2s2rc6z.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Kaiser1914",
  database: "Grubhub_db"
});

// The passport JWT strategy
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = GlobalVar['secret'];
var mentorStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  Mentor.find({mentor_email : jwt_payload.email}, 
    function (res) {
      console.log('user authenticated', jwt_payload);
      next(null,jwt_payload);
  }, function (err) {
    console.log('user NOT authenticate', jwt_payload);
      next(null, false);
  });
});
var menteeStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  Mentee.find({mentee_email : jwt_payload.email}, 
    function (res) {
      console.log('user authenticated', jwt_payload);
      next(null,jwt_payload);
  }, function (err) {
    console.log('user NOT authenticate', jwt_payload);
      next(null, false);
  });
});
passport.use('mentorAuth',mentorStrategy);
passport.use('menteeAuth',menteeStrategy);


//all the api calls
app.post("/login", function(req, res) {
  // console.log("login req from frontend",req)
  login.login(req,res,conn,bcrypt)
});
app.post("/signup", function(req, res) {
  // console.log("Signup req from frontend ",req)
  signup.signup(req,res,conn,bcrypt,saltRounds)
});

app.post("/getProfileMentee", function(req, res) {
  getProfileMentee.getProfileMentee(req,res,conn)
});

app.post("/getProfileMentor", function(req, res) {
  getProfileMentor.getProfileMentor(req,res,conn)
});

app.post("/updateProfileMentor", function(req, res) {
  updateProfileMentor.updateProfileMentor(req,res,conn)
});

app.post("/updateProfileMentee", function(req, res) {
  updateProfileMentee.updateProfileMentee(req,res,conn)
});

app.post("/sendPref", function(req, res) {
  sendPref.sendPref(req,res,conn)
});
// passport.authenticate('menteeAuth', { session: false }), 
app.post("/getMentors", function(req, res) {
  getMentors.getMentors(req,res,conn)
});

app.post("/getConnectRequest",  function(req, res) {
  getConnectRequest.getConnectRequest(req,res,conn)
});

app.post("/setConnectRequest", function(req, res) {
  setConnectRequest.setConnectRequest(req,res,conn)
});

app.post("/sendConnectRequest",  function(req, res) {
  sendConnectRequest.sendConnectRequest(req,res,conn)
});

app.post("/getMatchesMR",  function(req, res) {
  getMatchesMR.getMatchesMR(req,res,conn)
});

app.post("/getMatchesME", function(req, res){
  getMatchesME.getMatchesME(req,res,conn)
})

app.post("/feedback", function(req, res){
  feedback.feedback(req,res,conn)
})

app.post("/getFeedback", function(req,res){
  feedback.feedback(req,res,conn)
})

app.listen(3001);
console.log("Server Listening on port 3001");
