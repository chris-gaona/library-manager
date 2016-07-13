'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

var overdue = require('./overdue.js');
var checked_out = require('./checked_out.js');
var all_loans = require('./all_loans.js');

module.exports = function (req, res, next) {
  if (req.query.filter === 'overdue') {
    overdue(req, res, next);
  } else if (req.query.filter === 'checked_out') {
    checked_out(req, res, next);
  } else {
    all_loans(req, res, next);
  }
};
