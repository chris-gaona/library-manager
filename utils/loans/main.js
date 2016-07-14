'use strict';

var overdue = require('./overdue.js');
var checkedOut = require('./checked_out.js');
var allLoans = require('./all_loans.js');

module.exports = function (req, res, next) {
  if (req.query.filter === 'overdue') {
    overdue(req, res, next);
  } else if (req.query.filter === 'checked_out') {
    checkedOut(req, res, next);
  } else {
    allLoans(req, res, next);
  }
};
