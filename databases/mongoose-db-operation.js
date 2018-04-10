var {UserModel} = require('./models/UserModel');
var {crypto} =  require('./../playground/crypto/jwt');
var {mongoose} = require('./mongoose');

var registerUser = (model,callback)=>{
  var newUser =  new UserModel({
    name:model.name,
    email: model.email,
    password:model.password,
    registrationDate:Date(),
    isActive:false
  });

  newUser.save().then((user)=>{
    return  user.getAuthTokens();
  }).then((result)=>{
  callback(result,null);
}).catch((e)=>{
  callback(null,e);
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
