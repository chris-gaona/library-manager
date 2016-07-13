'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

module.exports = function (req, res, next) {
  // creates needed variables for limiting results for pagination
  var pagingLimit = 10;
  var page = req.params.page;

  // use sequlize to return overdue books
  // limit results for pagination to 10 per page
  // include loans model as association
  // only return results where return_by in loans is before today's date & returned_on is null meaning it is still checked out
  books.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, include: [{ model: loans, where: { return_by: { $lt: new Date() }, returned_on: null } }]
  // pass data from successful query into overdueBooks
  }).then(function (overdueBooks) {
    // render the view & pass in data
    res.render('partials/books', { count: overdueBooks.count, books: overdueBooks.rows, title: 'Overdue Books' });
  // catch any errors
  }).catch(function (err) {
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
