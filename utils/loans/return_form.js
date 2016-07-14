'use strict';

// define variables
var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

var getDate = require('./get_date.js');

// export module
module.exports = function (req, res, next) {
  // use sequlize to return specific loans
  // include books & patrons models associated
  loans.findById(req.params.id, { include: [{ model: books }, { model: patrons }] }).then(function (loan) {
    // render view with needed data
    res.render('partials/return_book', { loan: loan, today: getDate(), title: 'Patron: Return Book' });
  // catch any errors
  }).catch(function (err) {
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
