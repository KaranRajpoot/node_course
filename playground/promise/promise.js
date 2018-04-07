var asyncAdd = (a,b) => {
  return new Promise((resolve,reject) => {
    if (typeof a === 'number' && typeof b === 'number') {
      resolve(a+b);
    }else {
    reject('argument must be number');
  }
  });
};
// asyncAdd(4,'7').then((result)=>{
//   console.log('result:',result);
// return  asyncAdd(result,10)
// }).then((result)=>{
// console.log('number should be: ',result);
// }).catch((errorMessage)=>{
//   console.log(errorMessage);
// });

module.exports = {
asyncAdd
};
