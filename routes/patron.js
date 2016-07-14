'use strict';

var express = require('express');
var router = express.Router();

var patronsMain = require('../utils/patrons');

/* GET all patrons */
router.get('/patrons/page/:page', function (req, res, next) {
  patronsMain.main(req, res, next);
});

/* GET inidividual patrons */
router.get('/patrons/:id', function (req, res, next) {
  patronsMain.details(req, res, next);
});

/* PUT update inidividual patrons */
router.put('/patrons/:id', function (req, res, next) {
  patronsMain.update(req, res, next);
});

/* Create new patron form. */
router.get('/patron/new', function (req, res, next) {
  res.render('partials/new_patron', { title: 'New Patron' });
});

/* POST add new patron. */
router.post('/patron/new', function (req, res, next) {
  patronsMain.new(req, res, next);
});

module.exports = router;
