'use strict';

var express = require('express');
var router = express.Router();

var books = require('../models').books;
var loans = require('../models').loans;
var patrons = require('../models').patrons;

var books_main = require('../utils/books/index.js');

/* GET all books & filter by overdue & checked out. */
router.get('/books/page/:page', function(req, res, next) {
  books_main(req, res, next);
});

/* Create new book form. */
router.get('/books/new', function(req, res, next) {
  res.render('partials/new_book', { title: 'New Book' });
});

/* POST add new book. */
router.post('/books/new', function (req, res, next) {
  books.create(req.body).then(function (book) {
    res.redirect('/books/page/1');
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

/* GET inidividual book. */
router.get('/books/:id', function(req, res, next) {
  books.findAll({ include: [{ model: loans, include: [{ model: patrons }] }], where: { id: req.params.id }}).then(function (book) {
    if (book) {
      var bookObject = {};
      var loanArray = [];
      var getLoans = JSON.parse(JSON.stringify(book));
      bookObject = {
        id: getLoans[0].id,
        title: getLoans[0].title,
        author: getLoans[0].author,
        genre: getLoans[0].genre,
        first_published: getLoans[0].first_published
      };
      for (var i = 0; i < getLoans.length; i++) {
        if (getLoans[i].loan === null) {
          loanArray = [];
        } else {
          loanArray.push(getLoans[i].loan);
        }
      }

      res.render('partials/book_details', { book: bookObject, loans: loanArray, title: book.title });
    } else {
      res.sendStatus(404);
    }
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
});

/* PUT update book. */
router.put('/books/:id', function (req, res, next) {
  books.findById(req.params.id).then(function (book) {
    if (book) {
      return book.update(req.body);
    } else {
      res.sendStatus(404);
    }
  }).then(function (book) {
    res.redirect("/books/" + book.id);
  }).catch(function (err) {
    if (err.name === "SequelizeValidationError") {
      books.findAll({ include: [{ model: loans, include: [{ model: patrons }] }], where: { id: req.params.id }}).then(function (book) {
        if (book) {
          var bookObject = {};
          var loanArray = [];
          var getLoans = JSON.parse(JSON.stringify(book));
          bookObject = {
            id: getLoans[0].id,
            title: getLoans[0].title,
            author: getLoans[0].author,
            genre: getLoans[0].genre,
            first_published: getLoans[0].first_published
          };
          for (var i = 0; i < getLoans.length; i++) {
            if (getLoans[i].loan === null) {
              loanArray = [];
            } else {
              loanArray.push(getLoans[i].loan);
            }
          }

          res.render('partials/book_details', { book: bookObject, loans: loanArray, title: book.title, errors: err.errors });
        } else {
          res.sendStatus(404);
        }
      }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
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
