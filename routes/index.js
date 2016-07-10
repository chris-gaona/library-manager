'use strict';

var express = require('express');
var router = express.Router();

var books = require('../models').books;
var loans = require('../models').loans;
var patrons = require('../models').patrons;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('partials/index', { title: 'Library Manager' });
});

module.exports = router;
