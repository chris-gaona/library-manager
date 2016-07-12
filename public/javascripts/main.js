$(function () {
  var pageCount = $('#display-none').text();

  var pathname = window.location.pathname;

  createButtons(pageCount);

  // function to create page buttons
  function createButtons (count) {
    if (count < 2) {return;}
    var newCount = 0;
    for (var i = 0; i < count; i++) {
      newCount++;
      if (pathname.split('/')[1]  === 'books') {
        $('#display-none').before('<a href="/books/page/' + newCount + '"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname.split('/')[1] === 'loans') {
        $('#display-none').before('<a href="/loans/page/' + newCount + '"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname.split('/')[1] === 'patrons') {
        $('#display-none').before('<a href="/patrons/page/' + newCount + '"><button id="page-button">' + newCount + '</button></a>');
      }
    }
  }
});
