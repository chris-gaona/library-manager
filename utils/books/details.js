'use strict';

// define needed variables
var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

// export module
module.exports = function (req, res, next) {
  // use sequlize to return all books
  // include loans & patrons modules
  // only include results where book id equals req.params.id
  books.findAll({ include: [{ model: loans, include: [{ model: patrons }] }], where: { id: req.params.id } }).then(function (book) {
    // if book exists
    if (book) {
      // create needed variables
      var bookObject = {};
      var loanArray = [];
      var getLoans = JSON.parse(JSON.stringify(book));
      // create object with book data
      bookObject = {
        id: getLoans[0].id,
        title: getLoans[0].title,
        author: getLoans[0].author,
        genre: getLoans[0].genre,
        first_published: getLoans[0].first_published
      };
      // loop through getLoans with a for loop
      for (var i = 0; i < getLoans.length; i++) {
        // if there are no loans for a book
        if (getLoans[i].loan === null) {
          // keep loanArray as an empty array
          loanArray = [];
        } else {
          // else push the loan details to loanArray
          loanArray.push(getLoans[i].loan);
        }
      }

      // render view with needed data
      res.render('partials/book_details', { book: bookObject, loans: loanArray, title: book.title });
    } else {
      // if books does not exist send status 404
      res.sendStatus(404);
    }
  // catch any errors
  }).catch(function (err) {
    // log error and send 500 status
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
