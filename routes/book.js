'use strict';

var express = require('express');
var router = express.Router();

var books_main = require('../utils/books');

/* GET all books & filter by overdue & checked out. */
router.get('/books/page/:page', function(req, res, next) {
  books_main.main(req, res, next);
});

/* Create new book form. */
router.get('/books/new', function(req, res, next) {
  res.render('partials/new_book', { title: 'New Book' });
});

/* POST add new book. */
router.post('/books/new', function (req, res, next) {
  books_main.new(req, res, next);
});

/* GET inidividual book. */
router.get('/books/:id', function(req, res, next) {
  books_main.details(req, res, next);
});

/* PUT update book. */
router.put('/books/:id', function (req, res, next) {
  books_main.update(req, res, next);
});

module.exports = router;
