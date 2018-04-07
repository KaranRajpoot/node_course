const request = require("request");
const promise = require('./promise');
var geocode = (address)=>{
return new Promise((resolve,reject)=>{
  request({url:"https://maps.googleapis.com/maps/api/geocode/json?address=%20504%20tulip%20orange",
  json:true},(error,response,body) =>{
    if (error) {
      reject('unable to conect to googleapis');
    }else if(response.statusCode === 200){
      resolve(JSON.stringify(response,undefined,2));
    }
  });
});
};
geocode().then((result)=>{
  console.log(result);
return  promise.asyncAdd(10,10);
}).then((result)=>{
   console.log('number should be: ',result);
}).catch((errorMessage)=>{
  console.log(errorMessage);
});
