'use strict';
// Step -3 Represent Schema
const dbOperations = require("../config/crudoperations/signup");
const mongoose = require("./connection");
const config = require("./config");
const schema = mongoose.Schema;
// Step -4  Creating Schema for the Collection
const userSchema1 = new schema({
  image: {
		type: String
	},
  collegename: {
		type: String,
		index:true,
    unique: true
	},
	website: {
		type: String
	},
  state: {
		type: String,
		index:true
	},
	typeOf: {
		type: String
	},
	courses: {
		type: String
	},
  description : {
		type: String
},
comment:[{
  review : String
}]

});


var college = module.exports = mongoose.model('colleges', userSchema1);


//method to create User
module.exports.createUser = function(newUser, callback){
   newUser.save(callback);

	}


module.exports = college;
