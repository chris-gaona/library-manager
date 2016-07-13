'use strict';

var express = require('express');
var router = express.Router();

var loans_main = require('../utils/loans');

/* GET all loans & filter by overdue & checked out. */
router.get('/loans/page/:page', function (req, res, next) {
  loans_main.main(req, res, next);
});

/* Create new loan form. */
router.get('/loans/new', function (req, res, next) {
  loans_main.new_form(req, res, next);
});

/* POST add new loan. */
router.post('/loans/new', function (req, res, next) {
  loans_main.new(req, res, next);
});

/* Create return book form. */
router.get('/loans/:id/return', function (req, res, next) {
  loans_main.return_form(req, res, next);
});

/* PUT update loan by returning book */
router.put('/loans/:id/return', function (req, res, next) {
  loans_main.return(req, res, next);
});

module.exports = router;
