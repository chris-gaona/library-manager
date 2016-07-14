'use strict';

// define needed variables
var overdueBooks = require('./overdue.js');
var checkedOutBooks = require('./checked_out.js');
var allBooks = require('./all_books.js');

// export module
module.exports = function (req, res, next) {
  // if query string is overdue
  if (req.query.filter === 'overdue') {
    // show only overdue books
    overdueBooks(req, res, next);
  // else if query string is checked_out
  } else if (req.query.filter === 'checked_out') {
    // show only checked out books
    checkedOutBooks(req, res, next);
  } else {
    // else show all books
    allBooks(req, res, next);
  }
};
