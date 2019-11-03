var Mentee = require('../models/Mentee');
getProfileMentee=(req,res,conn)=>{
  Mentee.find({ mentee_email: req.body.email }, function(err, results) {
    if (err) throw err;
    else {
      res.send(results);
    }
  });
}

exports.getProfileMentee=getProfileMentee;