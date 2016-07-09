'use strict';

var express = require('express');
var router = express.Router();

var books = require('../models').books;
var loans = require('../models').loans;
var patrons = require('../models').patrons;

router.get('/loans', function(req, res, next) {
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

  // res.render('partials/all_loans', { title: 'Loans' });
});

module.exports = router;
