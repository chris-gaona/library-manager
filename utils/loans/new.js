'use strict';

// define variables
var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

var getDate = require('./get_date.js');

// export module
module.exports = function (req, res, next) {
  // create loan object
  var loanObject = {};
  // add data for loan object using dot notation
  loanObject.book_id = req.body.book_id;
  loanObject.patron_id = req.body.patron_id;
  loanObject.loaned_on = req.body.loaned_on;
  loanObject.return_by = req.body.return_by;

  // use sequlize to create a new loan
  loans.create(loanObject).then(function () {
    // redirect to all loans view
    res.redirect('/loans/page/1');
  // catch any validation errors
  }).catch(function (err) {
    if (err.name === 'SequelizeValidationError') {
      var today = new Date();
      var addAWeek = new Date();
      addAWeek.setDate(today.getDate() + 7);
      books.findAll({
        attributes: ['id', 'title'],
        order: 'title'
      }).then(function (books) {
        patrons.findAll({
          attributes: ['id', 'first_name', 'last_name'],
          order: 'last_name'
        }).then(function (patrons) {
          // render view with validation errors and restore user input
          res.render('partials/new_loan', {
            books: books,
            patrons: patrons,
            today: getDate(),
            due: getDate(addAWeek),
            errors: err.errors,
            title: 'New Loan' });
        // catch any errors
        }).catch(function (err) {
          console.log(err);
          // pass error to express error handler to display proper error view
          next(err);
          res.sendStatus(500);
        });
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
