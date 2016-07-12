'use strict';

var express = require('express');
var router = express.Router();

var books = require('../models').books;
var loans = require('../models').loans;
var patrons = require('../models').patrons;

router.get('/patrons/page/:page', function(req, res, next) {
  var pagingLimit = 10;
  var page = req.params.page;

  patrons.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, order: ['last_name']
  }).then(function (patrons) {
    var pageCount = Math.ceil(patrons.count / 10);
    res.render('partials/patrons', { count: pageCount, patrons: patrons.rows, title: 'Patrons' });
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
});

router.get('/patrons/:id', function(req, res, next) {
  patrons.findById(req.params.id, {
  }).then(function (patron) {
    loans.findAll({ include: [{ model: books, attributes: ["title"] }, { model: patrons, where: { id: req.params.id }, attributes: ["first_name", "last_name"] }]
    }).then(function (results) {
      if (results) {
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
});

router.put('/patrons/:id', function(req, res, next) {
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
});

/* Create new patron form. */
router.get('/patron/new', function(req, res, next) {
  res.render('partials/new_patron', { title: 'New Patron' });
});

/* POST add new patron. */
router.post('/patron/new', function(req, res, next) {
  patrons.create(req.body).then(function (patron) {
    res.redirect('/patrons');
  }).catch(function (err) {
    if (err.name === "SequelizeValidationError") {
      //render
      res.render("partials/new_patron", {
        patron: patrons.build(req.body),
        title: "New Patron",
        errors: err.errors
      });
    } else {
      // throw error to be handled by final catch
      throw err;
    }
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
});

module.exports = router;
