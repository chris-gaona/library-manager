'use strict';

// export module & pass in parameter
module.exports = function (date) {
  var today;
  // if there is a date parameter passed in, use that else just use today's date
  if (date) {
    today = new Date(date);
  } else {
    today = new Date();
  }
  //get day
  var dd = today.getDate();
  // get month
  var mm = today.getMonth() + 1; // January is 0!
  // get year
  var yyyy = today.getFullYear();
  // variable to hold string
  var newDate;
  // uses if statement to format date string properly
  if (dd < 10 && mm < 10) {
    newDate = yyyy + '-0' + mm + '-0' + dd;
  } else if (dd < 10) {
    newDate = yyyy + '-' + mm + '-0' + dd;
  } else if (mm < 10) {
    newDate = yyyy + '-0' + mm + '-' + dd;
  } else {
    newDate = yyyy + '-' + mm + '-' + dd;
  }
  // return newDate string
  return newDate;
};
