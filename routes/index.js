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
    loans.findAll({ include: [{ model: books }], where: { return_by: { $lt: new Date() }, returned_on: null }
    }).then(function (overdueBooks) {
      var booksArray = [];
      var getBooks = JSON.parse(JSON.stringify(overdueBooks));
      for (var i = 0; i < getBooks.length; i++) {
        booksArray.push(getBooks[i].book);
      }
      res.render('partials/books', { books: booksArray, title: 'Overdue Books' });
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  } else if (req.query.filter === 'checked_out') {
    res.render('partials/books', { title: 'Checked Out Books' });
  } else {
    books.findAll({
    }).then(function (allBooks) {
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
