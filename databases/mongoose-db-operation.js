var {UserModel} = require('./models/UserModel');
var {crypto} =  require('./../playground/crypto/jwt');
var {mongoose} = require('./mongoose');

var registerUser = (model,callback)=>{
  var newUser =  new UserModel({
    name:model.name,
    email: crypto.encode(model.email),
    password:crypto.encode(model.password),
    registrationDate:Date(),
    isActive:false
  });

  newUser.save().then((doc)=>{
    // console.log(`New User created: ${doc}`);
    callback(doc);
  },(err)=>{
    console.log(`Unable to create user Error: ${err}`);
    callback({code:105,error:err});
  });
};

var loginUser = (model,callback)=> {
  // console.log(JSON.stringify(model));
  UserModel.findOne({ email: model.email,passowrd:model.passowrd }).exec(function (err, person) {
    if (err)  return callback({errorcode:105});
    if (person)  return callback(person);
     callback({errorcode:105});

  });

};
module.exports = {
  registerUser:registerUser,
  loginUser:loginUser
};
