'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

module.exports = function (req, res, next) {
  // creates needed variables for limiting results for pagination
  var pagingLimit = 10;
  var page = req.params.page;
  
  // use sequlize to return all books
  // limit results for pagination to 10 per page
  books.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit
  // pass data from successful query into allBooks
  }).then(function (allBooks) {
    // render the view & pass in data
    res.render('partials/books', { count: allBooks.count, books: allBooks.rows, title: 'Books' });
  // catch any errors
  }).catch(function (err) {
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
