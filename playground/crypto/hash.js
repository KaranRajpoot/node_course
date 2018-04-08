var {SHA256} = require('crypto-js');
var message = 'hello world!';
var hash = SHA256(message).toString();
var data = {
  id:4
};
var token = {
  data,
  hash:SHA256(JSON.stringify(data)+'secret').toString()
};
data.id = 6;
var resultHash = SHA256(JSON.stringify(token.data)+'secret').toString();
if (resultHash === token.hash){
  console.log(`Data Not menupulated`);
}else {
  console.log('data manupulated');
}

console.log(`original Message:${message}`);
console.log(`Hash String:${hash}`);
