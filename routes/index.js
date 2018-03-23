'use strict';

///Routing for index factory only calls

const express = require('express');
const router = express.Router();
const multer  =   require('multer');

const dbOperations = require("../config/crudoperations/index");
const logger = require("../config/logger");
//include files from models folder
var User = require('../config/collegeschema');
var School = require('../config/schoolschema');


//upload
//storage method in multer

function IsAuthenticated(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.redirect('/');
    }
}


/* GET home page. */
router.get('/', function(req, res, next) {
    var path = require("path");
    var welcomePage = require("../config/pages");
    var newPath = path.normalize(__dirname+"/..");
    var homePagePath = path.join(newPath,welcomePage);
    res.sendFile(path.resolve(homePagePath));

});


/* GET home page. */
router.get('/college',IsAuthenticated, function(req, res, next) {

res.render("college");
});

//school
router.get('/school',IsAuthenticated, function(req, res, next) {

res.render("school");
});

/* GET home page. */
router.get('/collegefind',IsAuthenticated, function(req, res, next) {
  User.find({},function(err,user){
 if (err) throw err;
res.render("collegefind",{data:user});
});

});

/* GET home page. */
router.get('/schoolfind',IsAuthenticated, function(req, res, next) {
  School.find({},function(err,user){
 if (err) throw err;
res.render("schoolfind",{data:user});
});

});
/* GET home page. */
router.get('/collegefind/college/:this',IsAuthenticated, function(req, res, next) {
  User.find({state: req.params.this},function(err,user){
 if (err) throw err;
res.render("collegefind",{data:user});
});

});

/* GET home page. */
router.get('/schoolfind/school/:this',IsAuthenticated, function(req, res, next) {
  School.find({state: req.params.this},function(err,user){
 if (err) throw err;
res.render("schoolfind",{data:user});
});

});


/* GET home page. */
router.get('/collegefind/typeof/:this',IsAuthenticated, function(req, res, next) {
  User.find({ typeOf : req.params.this},function(err,user){
 if (err) throw err;
res.render("collegefind",{data:user});
});

});

/* GET home page. */
router.get('/collegefind/courses/:this',IsAuthenticated, function(req, res, next) {
  User.find({ courses : req.params.this},function(err,user){
 if (err) throw err;
res.render("collegefind",{data:user});
});

});


/* GET home page. */
router.get('/schoolfind/typeof/:this',IsAuthenticated, function(req, res, next) {
  School.find({ typeOf : req.params.this},function(err,user){
 if (err) throw err;
res.render("schoolfind",{data:user});
});

});

/* GET home page. */
router.get('/schoolfind/category/:this',IsAuthenticated, function(req, res, next) {
  School.find({ Catagory : req.params.this},function(err,user){
 if (err) throw err;
res.render("schoolfind",{data:user});
});

});

//storage function
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/User_data');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});


// Input data in database
  router.post('/college', function(req,res){




    var upload = multer(
       {storage : storage},
       { fileFilter: function(req, file, callback) {
 	var ext = path.extname(file.originalname)
 	if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
 		return callback(res.end('Only images are allowed'), null)
 	}
 	callback(null, true)
}

      }).single('upload_file');


    upload(req,res,function(err) {
      if(err) {
    res.redirect('upload');
      }


    var  image = req.body.dispName;
    var  collegename = req.body.collegename;
    var  website  = req.body.website;
    var  state = req.body.state;
    var  typeOf  = req.body.typeOf;
    var courses  = req.body.courses;
    var  description = req.body.description;
    var  comment = req.body.description;






var newUser = new User({
      image : image,
      collegename :  collegename,
      state : state,
      website : website,
      typeOf : typeOf,
      courses : courses,
      description : description,

    	});



// create users
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
});
});
res.redirect("/college");
  });


  router.post("/college/reviewadd/:this",function(req,res){

  	  User.findByIdAndUpdate(
        { _id : req.params.this},
        {$push: {comment  : {review: req.body.review }}},
        {safe: true, upsert: true},
        function(err, model) {
        console.log(err);
        res.redirect('/collegefind');
});
});
router.get("/college/review/:this",function(req,res){
  User.findById({ _id : req.params.this},function(err,user){
  if (err) throw err;
  res.render("review",{data:user});
  });

});


//school post function
// Input data in database
  router.post('/school', function(req,res){




    var upload = multer(
       {storage : storage},
       { fileFilter: function(req, file, callback) {
 	var ext = path.extname(file.originalname)
 	if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
 		return callback(res.end('Only images are allowed'), null)
 	}
 	callback(null, true)
}

      }).single('upload_file');


    upload(req,res,function(err) {
      if(err) {
    res.redirect('upload');
      }


    var  image = req.body.dispName;
    var  schoolname = req.body.schoolname;
    var  website  = req.body.website;
    var  state = req.body.state;
    var  typeOf  = req.body.typeOf;
    var Catagory  = req.body.Catagory;
    var  description = req.body.description;
    var  comment = req.body.description;






var newUser1 = new School({
      image : image,
      schoolname :  schoolname,
      state : state,
      website : website,
      typeOf : typeOf,
      Catagory : Catagory,
      description : description,

    	});



// create users
		School.createUser(newUser1, function(err, user){
			if(err) throw err;
			console.log(user);
});
});
res.redirect("/school");
  });


  router.post("/school/reviewadd/:this",function(req,res){

  	  School.findByIdAndUpdate(
        { _id : req.params.this},
        {$push: {comment  : {review: req.body.review }}},
        {safe: true, upsert: true},
        function(err, model) {
        console.log(err);
        res.redirect('/schoolfind');
});
});
router.get("/school/review/:this",function(req,res){
  School.findById({ _id : req.params.this},function(err,user){
  if (err) throw err;
  res.render("review",{data:user});
  });

});


///Check login Status
router.post('/webindex', function(request,response) {
    logger.debug('routes index webindex');
    if(request.body.appCall===true && request.body.sessionid!=undefined){
        const validate=require("../config/validate");
        var isValidSessionid=validate.string(request.body.sessionid);
        if(isValidSessionid===true){
            var userData={};
            const commonOperations=require("../config/crudoperations/commonoperations");
            commonOperations.getProfileData(request.body.sessionid,userData,function(userData){
                if(userData!=undefined){
                    dbOperations.checkSession(request,response,userData);
                }
                else{
                    response.json({message:"fail"});
                }
            });
        }
        else{
            response.json({message:"fail"});
        }
    }
    else if(request.session.user){
        dbOperations.checkSession(request,response,request.session.user);
    }
    else{
        response.json({message:"fail"});
    }
});

///Send email activation link
router.post('/sendActivationLink',function(request,response){
    logger.debug('routes index sendActivationLink');
    if(request.body.appCall===true && request.body.sessionid!=undefined){
        const validate=require("../config/validate");
        var isValidSessionid=validate.string(request.body.sessionid);
        if(isValidSessionid===true){
            var userData={};
            const commonOperations=require("../config/crudoperations/commonoperations");
            commonOperations.getProfileData(request.body.sessionid,userData,function(userData){
                if(userData!=undefined){
                    var userEmail=userData.useremail;
                    dbOperations.sendActivationLink(userEmail,response);
                }
                else{
                    response.json({message:"unknown"});
                }
            });
        }
        else{
            response.json({message:"unknown"});
        }
    }
    else if(request.session.user){
        var userEmail=request.session.user.useremail;
        dbOperations.sendActivationLink(userEmail,response);
    }
    else{
        response.json({message:"unknown"});
    }
});

///Logging out
router.post('/logout',function(request,response){
    logger.debug('routes index logout');
    if(request.body.appCall===true && request.body.sessionid!=undefined){
        const validate=require('../config/validate');
        var isValidSessionid=validate.string(request.body.sessionid)
        if(isValidSessionid===true){
            request.body.sessionidValid=true;
        }
        else{
            response.json({message:"success"});
        }
    }

    delete request.session.authenticated;

    dbOperations.destroySession(request,response);


});

module.exports = router;
