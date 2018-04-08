const jwt = require('jsonwebtoken');
const privatesecret = 'privatesecret';

var encode = (inputValue)=>{
  var token = jwt.sign(inputValue,privatesecret);
  if (token){
  return token;
  }
  return '';
};

var decode = (token)=> {
  var decodedString = jwt.verify(token,privatesecret);
  if (decodedString){
  return decodedString.toString();
  }
  return '';
};
var crypto = {
  encode:encode,
  decode:decode
};

module.exports = {
  crypto:crypto
};
