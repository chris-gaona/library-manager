'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;

module.exports = function (req, res, next) {
  // creates needed variables for limiting results for pagination
  var pagingLimit = 10;
  var page = req.params.page;
  // use sequlize to return checked_out books
  // limit results for pagination to 10 per page
  // include loans model as association
  // only return results where returned_on in loans is null meaning it is still checked out
  books.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, include: [{ model: loans, where: { returned_on: null } }]
  // pass data from successful query into checkedOutBooks
  }).then(function (checkedOutBooks) {
    // render the view & pass in data
    res.render('partials/books', { count: checkedOutBooks.count, books: checkedOutBooks.rows, title: 'Checked Out Books' });
  // catch any errors
  }).catch(function (err) {
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
