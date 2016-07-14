'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

var getDate = require('./get_date.js');

module.exports = function (req, res, next) {
  var loanObject = {};
  loanObject.book_id = req.body.book_id;
  loanObject.patron_id = req.body.patron_id;
  loanObject.loaned_on = req.body.loaned_on;
  loanObject.return_by = req.body.return_by;

  loans.create(loanObject).then(function () {
    res.redirect('/loans/page/1');
  }).catch(function (err) {
    if (err.name === 'SequelizeValidationError') {
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
          res.render('partials/new_loan', {
            books: books,
            patrons: patrons,
            today: getDate(),
            due: getDate(addAWeek),
            errors: err.errors,
            title: 'New Loan' });
        }).catch(function (err) {
          console.log(err);
          res.sendStatus(500);
        });
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
