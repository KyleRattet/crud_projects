var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/projects.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//ROUTE 1 GET ALL PROJECTS
router.get('/projects', function(req, res, next) {
  Project.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

// ROUTE 2 GET ONE PROJECT
router.get('/project/:id', function(req, res, next) {
  Project.findById(req.params.id, function (err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

// ROUTE 3 POST
router.post('/projects', function(req, res, next) {
  newProject = new Project({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    group: req.body.group,
    group_members: req.body.group_members
  });
  newProject.save(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({"SUCCESS": data});
    }
  });
});

//ROUTE 4 PUT
router.put('/project/:id', function (req, res, next){
  var update = {
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    group: req.body.group,
    group_members: req.body.group_members
  };
  console.log(update);
  var options = {new: true};
  Project.findByIdAndUpdate(req.params.id, update, options, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({'UPDATED': data});
    }
  });
});


//ROUTE 5 DELETE
router.delete('/project/:id', function (req, res, next){
  Project.findByIdAndRemove(req.params.id, function (err, data) {
    if(err) {
      res.json({'message': err});
    } else {
      res.json({'REMOVED': data});
    }
  });
});


module.exports = router;


