var express = require('express');
const hbs = require('hbs');
var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(__dirname +"/public"));
hbs.registerPartials(__dirname +"/views/partial");
hbs.registerHelper('getRegisterYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('upperCased',(text)=>{
  return text.toUpperCase();
})
app.use(function (req,res,next){
  var now = new Date().toString();
  console.log(now + "\nMethod:"+req.method + "\nURL:"+req.url);
  next();
});
app.set('Engine View','hbs');
app.get('/home',(req,res)=>{
res.render('home.hbs',{title:'Welcome to my Website',description:'this is a home page of my site'});
});

app.get('/help',(req,res)=>{
res.render('help.hbs',{title:'About help page',description:'help desc'});
});


app.get('/',(req,res)=>{
res.send({
  name:'karan',
  likes:['biking','coding']
});
});


app.listen(port,()=>{
 console.log(`server is up at port ${port}`);
});
module.exports.app = app;
