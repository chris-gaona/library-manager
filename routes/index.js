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

router.get('/books', function(req, res, next) {
  if (req.query.filter === 'overdue') {
    res.render('partials/books', { title: 'Overdue Books' });
  } else if (req.query.filter === 'checked_out') {
    res.render('partials/books', { title: 'Checked Out Books' });
  } else {
    books.findAll({
    }).then(function (allBooks) {
      console.log(JSON.stringify(allBooks));
      res.render('partials/books', { books: allBooks, title: 'Books' });
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  }
});

router.get('/patrons', function(req, res, next) {
  res.render('partials/all_patrons', { title: 'Patrons' });
});

router.get('/loans', function(req, res, next) {
  res.render('partials/all_loans', { title: 'Loans' });
});


module.exports = router;
