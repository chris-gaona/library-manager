'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

module.exports = function (req, res, next) {
  patrons.findById(req.params.id, {
  }).then(function (patron) {
    loans.findAll({ include: [{ model: books, attributes: ["id", "title"] }, { model: patrons, where: { id: req.params.id }, attributes: ["first_name", "last_name"] }]
    }).then(function (results) {
      if (results) {
        console.log(JSON.stringify(results));
        res.render('partials/patron_details', { patron: patron, results: results, title: patron.first_name + ' ' + patron.last_name });
      }
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
};
