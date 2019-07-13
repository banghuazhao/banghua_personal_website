<!-- Copyright: 2019 Banghua Zhao -->
<!-- Contact: banghua.zhao@gmail.com -->


<!-- Lazy loading images -->

$(function() {
  $('.lazy').lazy();
});



<!-- navigation bar event -->

$(document).ready(() => {

  <!-- nav scroll to id -->

  $('.nav-link').on('click', function (event) {
      event.preventDefault();

      var anchorY = $($(this).attr('href')).offset().top

      if ((Math.abs(window.scrollY-anchorY)) < 1000) {
          $('html, body').animate({
              scrollTop: anchorY - 100
          }, Math.abs(window.scrollY-anchorY)*0.5, 'linear');
      } else {
          $('html, body').animate({
              scrollTop: anchorY - 100
          }, 500, 'linear');
      }

      $(this).on('mouseenter', () => {
        $(this).css('color', 'rgba(255,255,255,0.8)');
      }).on('mouseleave', () => {
        $(this).css('color', 'rgba(255,255,255,0.5)');
      })

  });

  <!-- Close navbar toggler after clicking navbar item (only for mobile size screen) -->

  $('.nav-item').on('click', () => {
    if(document.documentElement.clientWidth <= 576) {
      $('.navbar-toggler').click();
    }
  })


});



<!-- mouse event for profile box -->

$(document).ready(() => {

  <!-- Change profile picture :p -->

  $('.prof-pic').on('mouseenter', () => {

    $('.prof-pic').attr("src","./img/profile2.jpg");

  }).on('mouseleave', () => {

    $('.prof-pic').attr("src","./img/profile1.png");

  })

  <!-- Change My name to Chinese -->

  $('#my-name').on('mouseenter', () => {
    $('#my-name').html('赵邦华')
  }).on('mouseleave', () => {
    $('#my-name').html('Banghua Zhao')
  })

  <!-- Change social icon size when mouse enter or leave -->

  $('.fab').on('mouseenter', event => {
    $(event.currentTarget).animate({
      fontSize: '50px',
      padding: '0px'
    }, 200)
  }).on('mouseleave', event => {
    $(event.currentTarget).animate({
      fontSize: '40px',
      padding: '10px'
    }, 200)
  })

  <!-- Change resume button when mouseover -->

  $('.btn-rounded-white').on('mouseenter', event => {
    $(event.currentTarget).css({
      backgroundColor: 'white',
      color: 'blue'
    })
  }).on('mouseleave', event => {
    $(event.currentTarget).css({
      backgroundColor: 'transparent',
      color: 'white'
    })
  })

})



<!-- Add scroll-based animation for elements -->

var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
      (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');


$(function () {
  $('[data-toggle="popover"]').popover()
})


var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30, lng: 31},
    zoom: 1,
    disableDefaultUI: true,
  });

  // Load GeoJSON.
  map.data.loadGeoJson(
            './data/gz_2010_us_outline_500k.json');

  // Color each letter gray. Change the color when the isColorful property
  // is set to true.
  map.data.setStyle(function(feature) {
    var color = 'gray';
    if (feature.getProperty('isColorful')) {
      color = feature.getProperty('color');
    }
    return /** @type {!google.maps.Data.StyleOptions} */({
      fillColor: color,
      strokeColor: color,
      strokeWeight: 2
    });
  });

  // When the user clicks, set 'isColorful', changing the color of the letters.
  map.data.addListener('click', function(event) {
    event.feature.setProperty('isColorful', true);
  });

  // When the user hovers, tempt them to click by outlining the letters.
  // Call revertStyle() to remove all overrides. This will use the style rules
  // defined in the function passed to setStyle()
  map.data.addListener('mouseover', function(event) {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {strokeWeight: 8});
  });

  map.data.addListener('mouseout', function(event) {
    map.data.revertStyle();
  });
}


// 美国 center: {lat: 31, lng: -98.583333},
