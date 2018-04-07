// module.exports.age = "200";
const fs = require('fs');
function addNote(title,body){
  var notes = [];
  var note = {
    title,
    body
  }
  try {
  var notesString = fs.readFileSync('notes-data.json');
  if (notesString != null)
  notes = JSON.parse(notesString);
}catch (e){

}
var duplicateNotes = notes.filter((note)=> note.title === title )
if (duplicateNotes.length === 0){
  notes.push(note);
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}
}
var getNote = () => {
return  'hii';
};

var Hello = function Hello() {
console.log('Hello');
return 'Hello';
};
module.exports = {
Hello,
addNote,
getNote,
};
