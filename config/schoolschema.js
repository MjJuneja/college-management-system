'use strict';
// Step -3 Represent Schema
const dbOperations = require("../config/crudoperations/signup");
const mongoose = require("./connection");
const config = require("./config");
const schema1 = mongoose.Schema;
// Step -4  Creating Schema for the Collection
const userSchema2 = new schema1({
  image: {
		type: String
	},
  schoolname: {
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
	Catagory: {
		type: String
	},
  description : {
		type: String
},
comment:[{
  review : String
}]

});


var School = module.exports = mongoose.model('schools', userSchema2);


//method to create User
module.exports.createUser = function(newUser, callback){
   newUser.save(callback);

	}


module.exports = School;
