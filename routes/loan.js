'use strict';

// define needed variables
var express = require('express');
var router = express.Router();

var loansMain = require('../utils/loans');

/* GET all loans & filter by overdue & checked out. */
router.get('/loans/page/:page', function (req, res, next) {
  loansMain.main(req, res, next);
});

/* Create new loan form. */
router.get('/loans/new', function (req, res, next) {
  loansMain.new_form(req, res, next);
});

/* POST add new loan. */
router.post('/loans/new', function (req, res, next) {
  loansMain.new(req, res, next);
});

/* Create return book form. */
router.get('/loans/:id/return', function (req, res, next) {
  loansMain.return_form(req, res, next);
});

/* PUT update loan by returning book */
router.put('/loans/:id/return', function (req, res, next) {
  loansMain.return(req, res, next);
});

module.exports = router;
