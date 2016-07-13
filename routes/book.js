'use strict';

var express = require('express');
var router = express.Router();

var books = require('../models').books;
var loans = require('../models').loans;
var patrons = require('../models').patrons;

var books_main = require('../utils/books/main.js');
var books_new = require('../utils/books/new.js');
var books_details = require('../utils/books/details.js');
var books_update = require('../utils/books/update.js');

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
  books_new(req, res, next);
});

/* GET inidividual book. */
router.get('/books/:id', function(req, res, next) {
  books_details(req, res, next);
});

/* PUT update book. */
router.put('/books/:id', function (req, res, next) {
  books_update(req, res, next);
});

module.exports = router;
