process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../server/app');
var Project = require('../server/models/projects');

var should = chai.should();
chai.use(chaiHttp);

//write tests

describe('Projects', function() {

//SETUP HOOKS TO CREATE PURE TESTING ENVIRONMENT
  Project.collection.drop();

  beforeEach(function(done){
    var newProject = new Project({
      name: "Paper, Rock, Scissors",
      description: "Angular and logic exercise",
      tags: ['angular', 'javaScript'],
      group: true,
      group_members: ['Chip']
    });
    newProject.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Project.collection.drop();
    done();
  });

//1. GET ALL PROJECTS TEST
  it('should list all projects on /projects GET request', function(done){
    chai.request(server)
    .get('/api/v1/projects')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('group');
      res.body[0].should.have.property('group_members');
      res.body[0].should.have.property('tags');
      res.body[0].should.have.property('description');
      res.body[0].name.should.equal('Paper, Rock, Scissors');
      res.body[0].description.should.equal('Angular and logic exercise');
      res.body[0].tags[0].should.equal('angular');
      done();
    });
  });

//2. GET ONE PROJECT
  it('should list a SINGLE project on /project/<id> GET', function(done) {
    var newProject = new Project({
      name: "Angular Practice",
      description: "Angular intro exercises",
      tags: ['angular'],
      group: true,
      group_members: ['Pete']
    });
    newProject.save(function(err, data) {
      chai.request(server)
        .get('/api/v1/project/'+data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('description');
          res.body.should.have.property('tags');
          res.body.should.have.property('tags');
          res.body.should.have.property('group');
          res.body.should.have.property('group_members');
          res.body.name.should.equal('Angular Practice');
          res.body.description.should.equal('Angular intro exercises');
          res.body.tags[0].should.equal('angular');
          res.body.group_members[0].should.equal('Pete');
          done();
        });
    });
  });

//3. POST Test
  it('should add a SINGLE project on /project POST', function(done) {
  chai.request(server)
    .post('/api/v1/projects')
    .send({'name': 'Casino Game', 'description': 'javaScript', 'tags' : ['vanillaJS']})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS[0].should.be.a('object');
      res.body.SUCCESS[0].should.have.property('name');
      res.body.SUCCESS[0].should.have.property('description');
      res.body.SUCCESS[0].should.have.property('tags');
      res.body.SUCCESS[0].should.have.property('_id');
      res.body.SUCCESS[0].name.should.equal('Casino Game');
      res.body.SUCCESS[0].description.should.equal('javaScript');
      res.body.SUCCESS[0].tags[0].should.equal('vanillaJS');
      done();
    });
  });

//4. PUT Test
  it("should update a single project on /project PUT", function(done){
  chai.request(server)
    .get('/api/v1/projects')
    .end(function(err, res){
      chai.request(server)
        .put('/api/v1/project/'+res.body[0]._id)
        .send({
          'name': 'RP&S',
          'description': "Angular Practice",
          'tags': ['angular'],
          'group': true,
          'group_members': ['Pete']
          })
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('UPDATED');
          response.body.UPDATED.should.be.a('object');
          response.body.UPDATED.should.have.property('name');
          response.body.UPDATED.should.have.property('_id');
          response.body.UPDATED.name.should.equal('RP&S');
          response.body.UPDATED.description.should.equal('Angular Practice');
          done();
      });
    });
  });


//5. DELETE TEST
  it('should delete a SINGLE project on /project/<id> DELETE', function(done) {
  chai.request(server)
    .get('/api/v1/projects')
    .end(function(err, res){
      chai.request(server)
        .delete('/api/v1/project/'+res.body[0]._id)
        .end(function(error, response){
          console.log(response.body)
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('REMOVED');
          response.body.REMOVED.should.be.a('object');
          response.body.REMOVED.should.have.property('name');
          response.body.REMOVED.should.have.property('_id');
          response.body.REMOVED.name.should.equal('Paper, Rock, Scissors');
          response.body.REMOVED.description.should.equal('Angular and logic exercise');
          response.body.REMOVED.group_members[0].should.equal('Chip');
          done();
      });
    });
  });

});
