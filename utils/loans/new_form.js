'use strict';

// define variables
var books = require('../../models').books;
var patrons = require('../../models').patrons;

var getDate = require('./get_date.js');

// export module
module.exports = function (req, res, next) {
  // today's date
  var today = new Date();
  // today's date + 7 days
  var addAWeek = new Date();
  addAWeek.setDate(today.getDate() + 7);

  // use sequlize to return all books, but only specific attributes & ordered by title
  books.findAll({
    attributes: ['id', 'title'],
    order: 'title'
  }).then(function (books) {
    // use sequlize to return all patrons, but only specific attributes & order by last_name
    patrons.findAll({
      attributes: ['id', 'first_name', 'last_name'],
      order: 'last_name'
    }).then(function (patrons) {
      // render view with needed data
      res.render('partials/new_loan', { books: books, patrons: patrons, today: getDate(), due: getDate(addAWeek), title: 'New Loan' });
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
};
