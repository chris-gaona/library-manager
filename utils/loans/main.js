'use strict';

// define variables
var overdue = require('./overdue.js');
var checkedOut = require('./checked_out.js');
var allLoans = require('./all_loans.js');

// export module
module.exports = function (req, res, next) {
  // if query string is overdue
  if (req.query.filter === 'overdue') {
    // get only overdue loans
    overdue(req, res, next);
  } else if (req.query.filter === 'checked_out') {
    // else get only checked out loans
    checkedOut(req, res, next);
  } else {
    // else get all loans
    allLoans(req, res, next);
  }
};
