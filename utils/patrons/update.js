'use strict';

// define variables
var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

// export module
module.exports = function (req, res, next) {
  // use sequlize to return specific patrons
  patrons.findById(req.params.id, {}).then(function (patron) {
    // if patron exists
    if (patron) {
      // return updated patron
      return patron.update(req.body);
    } else {
      res.sendStatus(404);
    }
  }).then(function (patron) {
    // redirect to update patron page
    res.redirect('/patrons/' + patron.id);
  // catch any validation errors
  }).catch(function (err) {
    if (err.name === 'SequelizeValidationError') {
      loans.findAll({ include: [{ model: books }, { model: patrons, where: { id: req.params.id } }]
      }).then(function (results) {
        if (results) {
          var patronObject = {};
          var getLoans = JSON.parse(JSON.stringify(results));
          patronObject = {
            id: getLoans[0].patron.id,
            first_name: getLoans[0].patron.first_name,
            last_name: getLoans[0].patron.last_name,
            address: getLoans[0].patron.address,
            email: getLoans[0].patron.email,
            library_id: getLoans[0].patron.library_id,
            zip_code: getLoans[0].patron.zip_code
          };
          // render view with validation errors & restor user inputs
          res.render('partials/patron_details', {
            patron: patronObject,
            results: results,
            title: getLoans[0].patron.first_name + ' ' + getLoans[0].patron.last_name,
            errors: err.errors
          });
        }
      // catch any errors
      }).catch(function (err) {
        console.log(err);
        // pass error to express error handler to display proper error view
        next(err);
        res.sendStatus(500);
      });
    }
  // catch any errors
  }).catch(function (err) {
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
