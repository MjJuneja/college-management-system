var mongoose = require('mongoose');
var express = require('express');


var go = express();

//include files from models folder
var User = require('../config/collegeschema');


// Input data in database
  go.post('/#/college', function(req,res){
  var  collegename = req.body.collegename;
  var  website  = req.body.website;
  var  typeOf  = req.body.typeOf;
  var courses  = req.body.courses;
  var  description = req.body.description;


  // Validation


var newUser = new User({
      collegeName :  collegeName,
      website : website,
      typeOf : typeOf,
      courses : courses,
      description : description
    	});

// create users
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);

  });
res.redirect("/#");
  });









module.exports = go;
