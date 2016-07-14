'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

module.exports = function (req, res, next) {
  books.findById(req.params.id).then(function (book) {
    if (book) {
      return book.update(req.body);
    } else {
      res.sendStatus(404);
    }
  }).then(function (book) {
    res.redirect('/books/' + book.id);
  }).catch(function (err) {
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

          res.render('partials/book_details', { book: bookObject, loans: loanArray, title: book.title, errors: err.errors });
        } else {
          res.sendStatus(404);
        }
      }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
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
