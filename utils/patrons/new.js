'use strict';

// define variables
var patrons = require('../../models').patrons;

// export module
module.exports = function (req, res, next) {
  // use sequlize to create new patron
  patrons.create(req.body).then(function (patron) {
    // redirect to all patrons view
    res.redirect('/patrons/page/1');
  // catch any validation errors
  }).catch(function (err) {
    if (err.name === 'SequelizeValidationError') {
      // render view with validation errors & restore user input
      res.render('partials/new_patron', {
        patron: patrons.build(req.body),
        title: 'New Patron',
        errors: err.errors
      });
    } else {
      // throw error to be handled by final catch
      throw err;
    }
  // catch any errors
  }).catch(function (err) {
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
