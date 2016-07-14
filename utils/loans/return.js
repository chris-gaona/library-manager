'use strict';

// define variables
var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

var getDate = require('./get_date.js');

// export module
module.exports = function (req, res, next) {
  // use sequlize to return specific loans
  loans.findById(req.params.id, {}).then(function (loan) {
    // if loan exists
    if (loan) {
      // return updated loan
      return loan.update({ returned_on: req.body.returned_on });
    } else {
      res.sendStatus(404);
    }
  // then redirect to all loans view
  }).then(function () {
    res.redirect('/loans/page/1');
  // catch all validation errors
  }).catch(function (err) {
    if (err.name === 'SequelizeValidationError') {
      loans.findById(req.params.id, { include: [{ model: books }, { model: patrons }] }).then(function (loan) {
        // render view with validation errors & restore user inputs
        res.render('partials/return_book', { loan: loan, today: getDate(), title: 'Patron: Return Book', errors: err.errors });
      // catch any errors
      }).catch(function (err) {
        console.log(err);
        // pass error to express error handler to display proper error view
        next(err);
        res.sendStatus(500);
      });
    } else {
      // throw error to be handled by final catch
      throw err;
    }
  // catch any errors
  }).catch(function (err) {
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
