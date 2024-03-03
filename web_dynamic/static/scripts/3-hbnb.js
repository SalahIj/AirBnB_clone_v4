$(document).ready(function () {
  // Event listener for checkboxes
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

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    dataType: 'json',
    success: function (response) {
      response.forEach(function (place) {
        const article = '<article>' +
                    '<div class="title_box">' +
                    '<h2>' + place.name + '</h2>' +
                    '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                    '</div>' +
                    '<div class="information">' +
                    '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                    '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                    '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                    '</div>' +
                    '<div class="description">' + place.description + '</div>' +
                    '</article>';

        $('section.places').append(article);
      });
    },
    error: function (xhr, status) {
      console.log('error ' + status);
    }
  });
});
