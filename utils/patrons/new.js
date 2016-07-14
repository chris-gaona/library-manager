'use strict';

var patrons = require('../../models').patrons;

module.exports = function (req, res, next) {
  patrons.create(req.body).then(function (patron) {
    res.redirect('/patrons/page/1');
  }).catch(function (err) {
    if (err.name === 'SequelizeValidationError') {
      // render
      res.render('partials/new_patron', {
        patron: patrons.build(req.body),
        title: 'New Patron',
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
};
