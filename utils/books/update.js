'use strict';

// define variables
var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

// export module
module.exports = function (req, res, next) {
  // use sequlize to return specific books
  books.findById(req.params.id).then(function (book) {
    // if book exists
    if (book) {
      // return the udpated book
      return book.update(req.body);
    } else {
      res.sendStatus(404);
    }
  // then with the updated book passed in as a parameter
  }).then(function (book) {
    // redirect to the specific books detail page
    res.redirect('/books/' + book.id);
  // catch any validation errors
  }).catch(function (err) {
    // if validation errors get data again for view
    if (err.name === 'SequelizeValidationError') {
      books.findAll({ include: [{ model: loans, include: [{ model: patrons }] }], where: { id: req.params.id } }).then(function (book) {
        if (book) {
          var bookObject = {};
          var loanArray = [];
          var getLoans = JSON.parse(JSON.stringify(book));
          bookObject = {
            id: getLoans[0].id,
            title: getLoans[0].title,
            author: getLoans[0].author,
            genre: getLoans[0].genre,
            first_published: getLoans[0].first_published
          };
          for (var i = 0; i < getLoans.length; i++) {
            if (getLoans[i].loan === null) {
              loanArray = [];
            } else {
              loanArray.push(getLoans[i].loan);
            }
          }

          // render view with validation errors & restor user input
          res.render('partials/book_details', { book: bookObject, loans: loanArray, title: book.title, errors: err.errors });
        } else {
          res.sendStatus(404);
        }
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
