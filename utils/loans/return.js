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
  loans.findById(req.params.id, {}).then(function (loan) {
    if (loan) {
      return loan.update({ returned_on: req.body.returned_on });
    } else {
      res.sendStatus(404);
    }
  }).then(function () {
    res.redirect('/loans/page/1');
  }).catch(function (err) {
    if (err.name === "SequelizeValidationError") {
      loans.findById(req.params.id, { include: [{ model: books }, { model: patrons }]}).then(function (loan) {
        res.render('partials/return_book', { loan: loan, today: getDate(), title: 'Patron: Return Book', errors: err.errors });
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
