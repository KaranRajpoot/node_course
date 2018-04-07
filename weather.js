const request = require("request");
request({url:"https://maps.googleapis.com/maps/api/geocode/json?address=%20504%20tulip%20orange",
json:true},(error,response,body) =>{
console.log(JSON.stringify(response,undefined,2));
});
