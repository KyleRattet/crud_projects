var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/projects.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
