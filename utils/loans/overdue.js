'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

module.exports = function (req, res, next) {
  var pagingLimit = 10;
  var page = req.params.page;
  
  loans.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, include: [{ model: books }, { model: patrons }], where: { return_by: { $lt: new Date() }, returned_on: null }
  }).then(function (overdueBooks) {
    res.render('partials/loans', { count: overdueBooks.count, loans: overdueBooks.rows, title: 'Overdue Books' });
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
};
