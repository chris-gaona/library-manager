'use strict';

module.exports = function (date) {
  var today;
  if (date) {
    today = new Date(date);
  } else {
    today = new Date();
  }
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  var newDate;
  if (dd < 10 && mm < 10) {
    newDate = yyyy + '-0' + mm + '-0' + dd;
  } else if (dd < 10) {
    newDate = yyyy + '-' + mm + '-0' + dd;
  } else if (mm < 10) {
    newDate = yyyy + '-0' + mm + '-' + dd;
  } else {
    newDate = yyyy + '-' + mm + '-' + dd;
  }
  return newDate;
};
