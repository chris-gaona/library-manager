'use strict';

// define needed variables
var express = require('express');
var router = express.Router();

var booksMain = require('../utils/books');

/* GET all books & filter by overdue & checked out. */
router.get('/books/page/:page', function (req, res, next) {
  booksMain.main(req, res, next);
});

/* Create new book form. */
router.get('/books/new', function (req, res, next) {
  res.render('partials/new_book', { title: 'New Book' });
});

/* POST add new book. */
router.post('/books/new', function (req, res, next) {
  booksMain.new(req, res, next);
});

/* GET inidividual book. */
router.get('/books/:id', function (req, res, next) {
  booksMain.details(req, res, next);
});

/* PUT update book. */
router.put('/books/:id', function (req, res, next) {
  booksMain.update(req, res, next);
});

module.exports = router;
