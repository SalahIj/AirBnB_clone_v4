$(document).ready(function () {
  $('input[type=checkbox]').click(function () {
    const listName = [];
    const Id = [];
    $('input[type=checkbox]:checked').each(function () {
      listName.push($(this).attr('data-name'));
      Id.push($(this).attr('data-id'));
    });
    if (listName.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(listName.join(', '));
    }
    console.log(Id);
  });
});

$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/status/',
  type: 'GET',
  dataType: 'json',
  success: function (json) {
    $('#status_of_api').addClass('lable');
  },

  error: function (xhr, status) {
    console.log('error ' + status);
  }

});
