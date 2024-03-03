$(document).ready(function () {
  let amenitiesChecked = [];
  const locationsChecked = {};

  $('input[type=checkbox]').change(function () {
    if ($(this).hasClass('amenity')) {
      updateAmenities();
    } else if ($(this).hasClass('state') || $(this).hasClass('city')) {
      updateLocations($(this));
    }
  });

  $('button').click(function () {
    const amenitiesIDs = [];
    $('.amenity:checked').each(function () {
      amenitiesIDs.push($(this).attr('data-id'));
    });

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: amenitiesIDs,
        states: Object.keys(locationsChecked.states),
        cities: Object.keys(locationsChecked.cities)
      }),
      dataType: 'json',
      success: function (response) {
        displayPlaces(response);
      },
      error: function (xhr, status) {
        console.log('error ' + status);
      }
    });
  });

  $('h2:contains("Reviews")').append('<span class="toggle-reviews"> show</span>');
  $('h2:contains("Reviews")').on('click', '.toggle-reviews', function () {
    toggleReviews();
  });

  function toggleReviews() {
    const reviewsSpan = $('.toggle-reviews');
    if (reviewsSpan.text().trim() === 'show') {
      fetchAndDisplayReviews();
      reviewsSpan.text(' hide');
    } else {
      $('.review').remove();
      reviewsSpan.text(' show');
    }
  }

  function fetchAndDisplayReviews() {
    const reviews = ['Review 1', 'Review 2', 'Review 3'];
    reviews.forEach(function (review) {
      $('section.places').append('<div class="review">' + review + '</div>');
    });
  }

  function updateAmenities() {
    amenitiesChecked = [];
    $('.amenity:checked').each(function () {
      amenitiesChecked.push($(this).attr('data-id'));
    });
  }

  function updateLocations(checkbox) {
    const id = checkbox.attr('data-id');
    const name = checkbox.attr('data-name');
    if (checkbox.is(':checked')) {
      if (checkbox.hasClass('state')) {
        locationsChecked.states[id] = name;
      } else if (checkbox.hasClass('city')) {
        locationsChecked.cities[id] = name;
      }
    } else {
      if (checkbox.hasClass('state')) {
        delete locationsChecked.states[id];
      } else if (checkbox.hasClass('city')) {
        delete locationsChecked.cities[id];
      }
    }
    updateLocationsTag();
  }

  function updateLocationsTag() {
    let locationsList = [];
    locationsList = locationsList.concat(Object.values(locationsChecked.states), Object.values(locationsChecked.cities));
    if (locationsList.length === 0) {
      $('.locations h4').html('&nbsp;');
    } else {
      $('.locations h4').text(locationsList.join(', '));
    }
  }

  function displayPlaces(places) {
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
});
