console.log('starting app.js');
const notes = require('./notes');
const _ = require('lodash');
 console.log(notes.addNote('titile1','body'));
console.log(notes.getNote());
console.log(notes.Hello());
console.log(_.isString('100'));
console.log(_.isString(true));
