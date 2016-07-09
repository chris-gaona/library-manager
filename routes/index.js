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


router.get('/patrons', function(req, res, next) {
  res.render('partials/all_patrons', { title: 'Patrons' });
});

router.get('/loans', function(req, res, next) {
  res.render('partials/all_loans', { title: 'Loans' });
});


module.exports = router;
