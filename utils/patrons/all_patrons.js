'use strict';

// define variables
var patrons = require('../../models').patrons;

// export module
module.exports = function (req, res, next) {
  // creates needed variables for limiting results for pagination
  var pagingLimit = 10;
  var page = req.params.page;

  // use sequlize to return all patrons & limit results to 10 & order results by last_name
  patrons.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, order: ['last_name']
  }).then(function (patrons) {
    // render view with needed data
    res.render('partials/patrons', { count: patrons.count, patrons: patrons.rows, title: 'Patrons' });
  // catch any errors
  }).catch(function (err) {
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
