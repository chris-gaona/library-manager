$(function () {
  var pageCount = $('#page-count').text();
  var newPageCount = Math.ceil(pageCount / 10);

  var pathname = window.location.pathname;

  createButtons(newPageCount);

  // function to create page buttons
  function createButtons (count) {
    var pagination = $('#pagination');
    if (count < 2) {return;}
    var newCount = 0;
    for (var i = 0; i < count; i++) {
      newCount++;
      if (pathname.split('/')[1]  === 'books') {
        pagination.append('<a href="/books/page/' + newCount + '"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname.split('/')[1] === 'loans') {
        pagination.append('<a href="/loans/page/' + newCount + '"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname.split('/')[1] === 'patrons') {
        pagination.append('<a href="/patrons/page/' + newCount + '"><button id="page-button">' + newCount + '</button></a>');
      }
    }
  }
});
