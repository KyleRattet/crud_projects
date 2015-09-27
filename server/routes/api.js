var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Project = require('../models/projects.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//ROUTE 1 GET ALL PROJECTS with Callbacks
// router.get('/projects', function(req, res, next) {
//   Project.find(function(err, data){
//     if(err){
//       res.json({'message': err});
//     } else {
//       res.json(data);
//     }
//   });
// });

//ROUTE 1 GET ALL PROJECTS with Promises
router.get('/projects', function(req, res, next) {
  Project.findQ()
    .then(function (result) { res.json(result) })
    .catch(function (err) {res.send(err) })
    .done();
});

// ROUTE 2 GET ONE PROJECT with callbacks
// router.get('/project/:id', function(req, res, next) {
//   Project.findById(req.params.id, function (err, data){
//     if(err){
//       res.json({'message': err});
//     } else {
//       res.json(data);
//     }
//   });
// });

// ROUTE 2 GET ONE PROJECT with promises
router.get('/project/:id', function(req, res, next) {
  Project.findByIdQ(req.params.id)
   .then(function (result) { res.json(result) })
   .catch(function (err) {res.send(err) })
   .done();
});


// ROUTE 3 POST with callbacks
// router.post('/projects', function(req, res, next) {
//   newProject = new Project({
//     name: req.body.name,
//     description: req.body.description,
//     tags: req.body.tags,
//     group: req.body.group,
//     group_members: req.body.group_members
//   });
//   newProject.save(function(err, data){
//     if(err){
//       res.json({'message': err});
//     } else {
//       res.json({"SUCCESS": data});
//     }
//   });
// });

// ROUTE 3 POST with promises
router.post('/projects', function(req, res, next) {
  newProject = new Project({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    group: req.body.group,
    group_members: req.body.group_members
    });
  newProject.saveQ()
    .then(function (result) {
                            res.json({"SUCCESS":result});
                            })
    .catch(function (err) {res.send(err) })
    .done();
});

//ROUTE 4 PUT with callbacks
// router.put('/project/:id', function (req, res, next){
//   var update = {
//     name: req.body.name,
//     description: req.body.description,
//     tags: req.body.tags,
//     group: req.body.group,
//     group_members: req.body.group_members
//   };
//   console.log(update);
//   var options = {new: true};
//   Project.findByIdAndUpdate(req.params.id, update, options, function(err, data){
//     if(err){
//       res.json({'message': err});
//     } else {
//       res.json({'UPDATED': data});
//     }
//   });
// });

//ROUTE 4 PUT with promises
router.put('/project/:id', function(req, res, next) {
      var update = {
          name: req.body.name,
          description: req.body.description,
          tags: req.body.tags,
          group: req.body.group,
          group_members: req.body.group_members
      };
    var options = {new: true};
    Project.findByIdAndUpdateQ(req.params.id, update, options)
   .then(function (result) {
                            res.json({"UPDATED": result});
                           })
   .catch(function (err) {res.send(err) })
   .done();
});


//ROUTE 5 DELETE with callbacks
// router.delete('/project/:id', function (req, res, next){
//   Project.findByIdAndRemove(req.params.id, function (err, data) {
//     if(err) {
//       res.json({'message': err});
//     } else {
//       res.json({'REMOVED': data});
//     }
//   });
// });

//ROUTE 5 DELETE with promises
router.delete('/project/:id', function(req, res, next) {
  Project.findByIdAndRemoveQ(req.params.id)
  .then(function (result) {
                        res.json({"REMOVED" : result});
                          })
   .catch(function (err) {res.send(err) })
   .done();
});

module.exports = router;


