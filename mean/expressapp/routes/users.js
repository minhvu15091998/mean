var express = require('express');
var router = express.Router();
var Users = require('../models/user');
var passport = require('passport');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', function(req, res, next){
  addToDB(req, res);
});

async function addToDB(req, res){

  var user = new Users({
    email:req.body.email,
    fullName: req.body.fullName,
    password: req.body.password
  });
  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

router.post('/login', function(res, req, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});
module.exports = router;
