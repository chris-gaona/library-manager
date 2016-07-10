'use strict';

var express = require('express');
var router = express.Router();

var books = require('../models').books;
var loans = require('../models').loans;
var patrons = require('../models').patrons;

router.get('/patrons', function(req, res, next) {
  patrons.findAll({ order: ['last_name']
  }).then(function (patrons) {
    res.render('partials/patrons', { patrons: patrons, title: 'Patrons' });
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
});

router.get('/patrons/new', function(req, res, next) {
  res.render('partials/patrons_new', { title: 'Patrons' });
});

module.exports = router;
