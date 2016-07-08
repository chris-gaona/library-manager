var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('partials/index', { title: 'Library Manager' });
});

router.get('/all_books', function(req, res, next) {
  res.render('partials/all_books', { title: 'Books' });
});

router.get('/all_patrons', function(req, res, next) {
  res.render('partials/all_patrons', { title: 'Patrons' });
});

router.get('/all_loans', function(req, res, next) {
  res.render('partials/all_loans', { title: 'Loans' });
});


module.exports = router;
