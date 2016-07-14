'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

var getDate = require('./get_date.js');

module.exports = function (req, res, next) {
  loans.findById(req.params.id, { include: [{ model: books }, { model: patrons }] }).then(function (loan) {
    res.render('partials/return_book', { loan: loan, today: getDate(), title: 'Patron: Return Book' });
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
};
