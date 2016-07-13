'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

var overdue_books = require('./overdue.js');
var checked_out_books = require('./checked_out.js');
var all_books = require('./all_books.js');

module.exports = function (req, res, next) {
  // if query string is overdue
  if (req.query.filter === 'overdue') {
    overdue_books(req, res, next);
  // else if query string is checked_out
  } else if (req.query.filter === 'checked_out') {
    checked_out_books(req, res, next);
  } else {
    all_books(req, res, next);
  }
};
