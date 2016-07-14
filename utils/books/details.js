'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

module.exports = function (req, res, next) {
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

      res.render('partials/book_details', { book: bookObject, loans: loanArray, title: book.title });
    } else {
      res.sendStatus(404);
    }
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
};
