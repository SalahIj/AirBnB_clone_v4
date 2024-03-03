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
