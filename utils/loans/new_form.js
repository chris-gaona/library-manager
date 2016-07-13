'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

function getDate (date) {
  var today;
  if (date) {
    today = new Date(date);
  } else {
    today = new Date();
  }
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  var newDate;
  if (dd < 10 && mm < 10) {
    newDate = yyyy + '-0' + mm + '-0' + dd;
  } else if (dd < 10) {
    newDate = yyyy + '-' + mm + '-0' + dd;
  } else if (mm < 10) {
    newDate = yyyy + '-0' + mm + '-' + dd;
  } else {
    newDate = yyyy + '-' + mm + '-' + dd;
  }
  return newDate;
}

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
