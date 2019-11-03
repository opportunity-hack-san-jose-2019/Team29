var Mentor = require('../models/Mentor');
getProfileMentor=(req,res,conn)=>{
  Mentor.find({ mentor_email: req.body.email }, function(err, results) {
    if (err) throw err;
    else {
      res.send(results);
    }
  });
}

exports.getProfileMentor=getProfileMentor;