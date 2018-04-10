var {mongoose} = require('./../mongoose');
var validator = require('validator');
var {crypto} = require('./../../playground/crypto/jwt');
var _ = require('lodash');
var UserSchema = new mongoose.Schema({
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
  },
  tokens:[
    {
      access:{
              type:String
            },
      token:{
            type:String
            }
    }
  ]
});
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
};
UserSchema.methods.getAuthTokens = function () {
var user = this;
var access = 'auth';
var token = crypto.encode(user._id.toHexString());
user.tokens = user.tokens.concat([{access,token}]);
return user.save().then(()=>{
  return {user:user.toJSON(),token:token};
});
};
UserSchema.statics.getUserbyToken = function (token) {
  var Model = this;
  var decoded;
  try {
   decoded =  crypto.decode(token);
  }catch(e){
    return Promise.reject();
  }
  return Model.findOne({
    '_id':new Object(decoded),
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};
var UserModel = mongoose.model('Users',UserSchema);
module.exports = {UserModel};
