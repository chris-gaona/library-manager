'use strict';

var express = require('express');
var router = express.Router();

var books = require('../models').books;
var loans = require('../models').loans;
var patrons = require('../models').patrons;

router.get('/loans', function (req, res, next) {
  if (req.query.filter === 'overdue') {
    loans.findAll({ include: [{ model: books }, { model: patrons }], where: { return_by: { $lt: new Date() }, returned_on: null }
    }).then(function (overdueBooks) {
      res.render('partials/loans', { loans: overdueBooks, title: 'Overdue Books' });
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  } else if (req.query.filter === 'checked_out') {
    loans.findAll({ include: [{ model: books }, { model: patrons }], where: { returned_on: null }
    }).then(function (checkedOutBooks) {
      res.render('partials/loans', { loans: checkedOutBooks, title: 'Checked Out Books' });
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  } else {
    loans.findAll({ include: [{ model: books }, { model: patrons }]
    }).then(function (allLoans) {
      res.render('partials/loans', { loans: allLoans, title: 'Loans' });
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  }
});

router.get('/loans/new', function (req, res, next) {
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
      res.render('partials/new_loan', { books: books, patrons: patrons, today: today, due: addAWeek, title: 'New Loan' });
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
});

function getDate (date) {
  var today = new Date(date);
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

router.post('/loans/new', function (req, res, next) {
  var loanObject = {};
  loanObject.book_id = req.body.book_id;
  loanObject.patron_id = req.body.patron_id;
  loanObject.loaned_on = getDate(req.body.loaned_on);
  loanObject.return_by = getDate(req.body.return_by);

  loans.create(loanObject).then(function () {
    res.redirect('/loans');
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
});

module.exports = router;
