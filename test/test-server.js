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
    .end(function(err, res){
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





});
