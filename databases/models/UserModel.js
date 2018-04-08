var {mongoose} = require('./../mongoose');
var validator = require('validator');

var UserModel = mongoose.model('Users',{
  name:{
    type:String,
    required:true,
    minlength:1
  },
  email:{
    type:String,
    required: [true, 'Enter a valid email'],
    unique:true,
    validate:{
      validator:validator.isEmail,
      message: `{VALUE} is not a valid email!`
    }
  },
  password:{
    type:String,
    required: [true, 'Enter correct password'],
    minlength:6
  },
  isActive:{
    type:Boolean
  },
  registrationDate:{
    type:Date
  }
});
module.exports = {
  UserModel:UserModel
};
