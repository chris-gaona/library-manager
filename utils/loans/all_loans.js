'use strict';

// define needed variables
var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

// export module
module.exports = function (req, res, next) {
  // creates needed variables for limiting results for pagination
  var pagingLimit = 10;
  var page = req.params.page;

  // use sequlize to return all loans
  // limit results for pagination to 10 per page
  // include books & patrons models
  loans.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, include: [{ model: books }, { model: patrons }]
  }).then(function (allLoans) {
    // render view with needed data
    res.render('partials/loans', { count: allLoans.count, loans: allLoans.rows, title: 'Loans' });
  // catch any errors
  }).catch(function (err) {
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
