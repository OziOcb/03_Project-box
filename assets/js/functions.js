// hamburger
$('.nav__btn').click (function(){
  $(this).toggleClass('open');
});


// lightbox
$(function(){
  lightbox.option({
    'resizeDuration': 500,
    'wrapAround': true,
    'alwaysShowNavOnTouchDevices': true
  })
});
