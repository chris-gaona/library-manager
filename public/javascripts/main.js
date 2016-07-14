$(function () {
  var pageCount = $('#page-count').text();
  var newPageCount = Math.ceil(pageCount / 10);

  var pathname = window.location.pathname.split('/')[1];
  var url = window.location.href.split('=').pop();

  createButtons(newPageCount);

  // function to create page buttons
  function createButtons (count) {
    var pagination = $('#pagination');
    if (count < 2) { return; }
    var newCount = 0;
    for (var i = 0; i < count; i++) {
      newCount++;
      if (pathname === 'books' && url !== 'checked_out' && url !== 'overdue') {
        pagination.append('<a href="/books/page/' + newCount + '"><button id="page-button">' + newCount + '</button></a>');
        console.log('yup');
      } else if (pathname === 'books' && url === 'checked_out') {
        console.log(true);
        pagination.append('<a href="/books/page/' + newCount + '?filter=checked_out"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'books' && url === 'overdue') {
        pagination.append('<a href="/books/page/' + newCount + '?filter=overdue"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'loans' && url !== 'checked_out' && url !== 'overdue') {
        pagination.append('<a href="/loans/page/' + newCount + '"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'loans' && url === 'checked_out') {
        pagination.append('<a href="/loans/page/' + newCount + '?filter=checked_out"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'loans' && url === 'overdue') {
        pagination.append('<a href="/loans/page/' + newCount + '?filter=overdue"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'patrons' && url !== 'checked_out' && url !== 'overdue') {
        pagination.append('<a href="/patrons/page/' + newCount + '"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'patrons' && url === 'checked_out') {
        pagination.append('<a href="/patrons/page/' + newCount + '?filter=checked_out"><button id="page-button">' + newCount + '</button></a>');
      } else if (pathname === 'patrons' && url === 'overdue') {
        pagination.append('<a href="/patrons/page/' + newCount + '?filter=overdue"><button id="page-button">' + newCount + '</button></a>');
      }
    }
  }
});
