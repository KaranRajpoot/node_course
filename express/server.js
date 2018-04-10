var express = require('express');
const hbs = require('hbs');
const path = require('path');
var bodyParser = require('body-parser');

var {authendicate} = require('./middleware/authendicate');

var db_operation = require('./../databases/mongoose-db-operation');

var app = express();
var port = process.env.PORT || 3000;
var  partialPath = __dirname +"/views";
console.log(` Path: ${partialPath}`);
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('Engine View','hbs');
// app.use(bodyParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('upperCased',(text)=>{
  return text.toUpperCase();
});
app.use(function (req,res,next){
  var now = new Date().toString();
  console.log(now + "\nMethod:"+req.method + "\nURL:"+req.url+ "BODY"+req.body);
  next();
});

app.get('/home',(req,res)=>{
res.render('home.hbs',{pageTitle:'Welcome to my Website',welcomeMessage:'Welcome to my First Node JS Application',description:'this is a home page of my site'});
});
app.get('/SignUp',(req,res)=>{
res.render('SignUp.hbs',{pageTitle:'Welcome to my Website',welcomeMessage:'Welcome to my First Node JS Application',description:'this is a home page of my site'});
});

app.get('/help',(req,res)=>{
res.render('help.hbs',{pageTitle:'About help page',description:'help desc'});
});

app.get('/',(req,res)=>{
// res.send({
//   name:'karan',
//   likes:['biking','coding']
// });
res.render('home.hbs',{pageTitle:'Welcome to my Website',welcomeMessage:'Welcome to my First Node JS Application',description:'this is a home page of my site'});

});
app.get('/verifyUser',authendicate,(req,res)=>{
  res.send(req.user);
});
app.post('/loginUser',(req,res)=>{
  console.log('login post req');
  console.log(req.body.email + "\n"+ req.body.passowrd);
  db_operation.loginUser({email:req.body.email,password:req.body.password},(user)=>{
    if(user == null || user.errorcode === 105){
      console.log(`Login Response ${user}`);
     return  res.status(400).send(user);
    }
   res.status(200).send(user);
  });

});
app.post('/registerUser',(req,res)=>{
  console.log(`NAME: ${req.body.name} EMAIL:${req.body.email} password : ${req.body.password}`);
  db_operation.registerUser({name:req.body.name,email:req.body.email,password:req.body.password},(result,err)=>{
    if(err){
      console.log(`Login Response ${err}`);
     return  res.status(400).send(err);
    }
    console.log(`TOEKN: ${result.token}`);
    var response =
    res.header('x-auth',result.token).send(result.user);
  });
});

app.listen(port,()=>{
 console.log(`server is up at port ${port}`);
});
module.exports.app = app;
