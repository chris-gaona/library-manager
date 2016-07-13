'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

var getDate = require('./get_date.js');

module.exports = function (req, res, next) {
  var today = new Date();
  var addAWeek = new Date();
  addAWeek.setDate(today.getDate() + 7);

  books.findAll({
    attributes: ['id', 'title'],
    order: 'title'
}).then(function (books) {
    patrons.findAll({
      attributes: ['id', 'first_name', 'last_name'],
      order: 'last_name'
    }).then(function (patrons) {
      res.render('partials/new_loan', { books: books, patrons: patrons, today: getDate(), due: getDate(addAWeek), title: 'New Loan' });
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
};
