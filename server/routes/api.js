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


//ROUTE 4 PUT


//ROUTE 5 DELETE


module.exports = router;


