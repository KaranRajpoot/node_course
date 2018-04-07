
const sampletest = require('./sampletest');
var request = require('supertest');
const app = require('../express/server').app;
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});
it('server test case started',(done)=>{
  request(app)
    .get('/')
    .expect({
      name:'karan',
      likes:['biking','coding']
    })
    .end(done);
});
it('Should be addition of two number',(done)=>{
  var res = sampletest.add(10,20);
  done();
});
