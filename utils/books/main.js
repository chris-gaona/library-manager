'use strict';

var overdueBooks = require('./overdue.js');
var checkedOutBooks = require('./checked_out.js');
var allBooks = require('./all_books.js');

module.exports = function (req, res, next) {
  // if query string is overdue
  if (req.query.filter === 'overdue') {
    overdueBooks(req, res, next);
  // else if query string is checked_out
  } else if (req.query.filter === 'checked_out') {
    checkedOutBooks(req, res, next);
  } else {
    allBooks(req, res, next);
  }
};
