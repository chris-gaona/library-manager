'use strict';

var books = require('../../models').books;

module.exports = function (req, res, next) {
  books.create(req.body).then(function (book) {
    res.redirect('/books/page/1');
  }).catch(function (err) {
    if (err.name === 'SequelizeValidationError') {
      // render
      res.render('partials/new_book', {
        book: books.build(req.body),
        title: 'New Book',
        errors: err.errors
      });
    } else {
      // throw error to be handled by final catch
      throw err;
    }
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
};
