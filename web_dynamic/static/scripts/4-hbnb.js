$(document).ready(function () {
  $('input[type=checkbox]').click(function () {
    updateAmenities();
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
      displayPlaces(response);
    },
    error: function (xhr, status) {
      console.log('error ' + status);
    }
  });

  $('button').click(function () {
    const amenitiesChecked = [];
    $('input[type=checkbox]:checked').each(function () {
      amenitiesChecked.push($(this).attr('data-id'));
    });

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenitiesChecked }),
      dataType: 'json',
      success: function (response) {
        displayPlaces(response);
      },
      error: function (xhr, status) {
        console.log('error ' + status);
      }
    });
  });
});

function updateAmenities () {
  const listName = [];
  $('input[type=checkbox]:checked').each(function () {
    listName.push($(this).attr('data-name'));
  });
  if (listName.length === 0) {
    $('.amenities h4').html('&nbsp;');
  } else {
    $('.amenities h4').text(listName.join(', '));
  }
}

function displayPlaces (places) {
  $('section.places').empty();
  places.forEach(function (place) {
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
}
