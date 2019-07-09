<!-- Copyright: 2019 Banghua Zhao -->
<!-- Contact: banghua.zhao@gmail.com -->

<!-- Change profile picture :p -->

myPorfPic = document.querySelector(".prof-pic")

myPorfPic.addEventListener("mouseover",function() {
  myPorfPic.setAttribute("src","img/profile2.jpg");
});
myPorfPic.addEventListener("mouseout",function() {
  myPorfPic.setAttribute("src","img/profile.jpg");
});


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



<!-- Make cover image full screen and determine position of profile box -->

window.onresize = window.onload = function () {
    var jumbotron_custom = document.getElementById("jumbotron-custom");
    jumbotron_custom.style.height = document.documentElement.clientHeight - 46 + 'px'
    jumbotron_custom.style.minHeight = 450 + 16 + 56 + 'px';

};


<!-- Close navbar toggler after clicking navbar item (only for mobile size screen) -->

$(document).ready(() => {
  $('.nav-item').on('click', () => {
    if(document.documentElement.clientWidth <= 576) {
      $('.navbar-toggler').click();
    }
  })
});



<!-- Change My name to Chinese -->

myName = document.querySelector("#my-name")

myName.addEventListener("mouseover",function() {
  myName.innerHTML = "赵邦华";
});
myName.addEventListener("mouseout",function() {
  myName.innerHTML = "Banghua Zhao";
});



<!-- Change social icon size when mouse enter or leave -->

$(document).ready(() => {
  $('.fa').on('mouseenter', event => {
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
