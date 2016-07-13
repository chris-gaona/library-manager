'use strict';

var books = require('../../models').books;
var loans = require('../../models').loans;
var patrons = require('../../models').patrons;

module.exports = function (req, res, next) {
  patrons.findById(req.params.id, {}).then(function (patron) {
    if (patron) {
      return patron.update( req.body );
    } else {
      res.sendStatus(404);
    }
  }).then(function (patron) {
    res.redirect("/patrons/" + patron.id);
  }).catch(function (err) {
    if (err.name === "SequelizeValidationError") {
      loans.findAll({ include: [{ model: books }, { model: patrons, where: { id: req.params.id } }]
      }).then(function (results) {
        if (results) {
          var patronObject = {};
          var loanArray = [];
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
          res.render('partials/patron_details', {
            patron: patronObject,
            results: results,
            title: getLoans[0].patron.first_name + ' ' + getLoans[0].patron.last_name,
            errors: err.errors
          });
        }
      }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
      });
    }
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
};
