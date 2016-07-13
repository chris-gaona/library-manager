'use strict';

var patrons = require('../../models').patrons;

module.exports = function (req, res, next) {
  var pagingLimit = 10;
  var page = req.params.page;

  patrons.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, order: ['last_name']
  }).then(function (patrons) {
    res.render('partials/patrons', { count: patrons.count, patrons: patrons.rows, title: 'Patrons' });
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
};
