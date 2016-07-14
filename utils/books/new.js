'use strict';

// define needed variables
var books = require('../../models').books;

// export module
module.exports = function (req, res, next) {
  // use sequlize to create a new book from form data sent through req.body
  books.create(req.body).then(function (book) {
    // redirect page on successful query
    res.redirect('/books/page/1');
  // catch any errors
  }).catch(function (err) {
    // check for data validation errors
    if (err.name === 'SequelizeValidationError') {
      // render page with errors & restore user input
      res.render('partials/new_book', {
        book: books.build(req.body),
        title: 'New Book',
        errors: err.errors
      });
    } else {
      // throw error to be handled by final catch
      throw err;
    }
  // catch any errors
  }).catch(function (err) {
    // log errors to console & send status 500
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
