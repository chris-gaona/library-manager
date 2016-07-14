'use strict';

// define variables
var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

// export module
module.exports = function (req, res, next) {
  // use sequlize to return specific patrons
  patrons.findById(req.params.id, {
  }).then(function (patron) {
    // use sequlize to return all loans for specific id
    // return only certain attributes
    loans.findAll({ include: [{ model: books, attributes: ['id', 'title'] }, { model: patrons, where: { id: req.params.id }, attributes: ['first_name', 'last_name'] }]
    }).then(function (results) {
      // if results exists
      if (results) {
        // render view with needed data
        res.render('partials/patron_details', { patron: patron, results: results, title: patron.first_name + ' ' + patron.last_name });
      }
    // catch any errors
    }).catch(function (err) {
      console.log(err);
      // pass error to express error handler to display proper error view
      next(err);
      res.sendStatus(500);
    });
  // catch any errors
  }).catch(function (err) {
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
