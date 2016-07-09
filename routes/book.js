'use strict';

var express = require('express');
var router = express.Router();

var books = require('../models').books;
var loans = require('../models').loans;
var patrons = require('../models').patrons;

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
    loans.findAll({ include: [{ model: books }], where: { returned_on: null }
    }).then(function (checkedOutBooks) {
      var booksArray = [];
      var getBooks = JSON.parse(JSON.stringify(checkedOutBooks));
      for (var i = 0; i < getBooks.length; i++) {
        booksArray.push(getBooks[i].book);
      }
      res.render('partials/books', { books: booksArray, title: 'Checked Out Books' });
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
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

router.get('/books/new', function(req, res, next) {
  res.render('partials/new_book', { title: 'New Book' });
});

router.post('/books/new', function (req, res, next) {
  books.create(req.body).then(function (book) {
    res.redirect('/books');
  }).catch(function (err) {
    if (err.name === "SequelizeValidationError") {
      //render
      res.render("partials/new_book", {
        book: books.build(req.body),
        title: "New Book",
        errors: err.errors
      });
    } else {
      // throw error to be handled by final catch
      throw err;
    }
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
});

module.exports = router;
