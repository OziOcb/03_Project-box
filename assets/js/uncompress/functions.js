/* ==================== ==================== ====================
 * functions - Hamburger
 * ==================== ==================== ==================== */


/* ATTENTION PLEASE!! - Because I haven't learnt much about Js yet, all the code in this section is basically copied from different sources.
/* Hiding nav when click outside */
$('html').click(function() {
   $('.nav__list').hide();
   $('.nav__btn').removeClass('open');
});

$('.nav').click(function(event){
     event.stopPropagation();
});

/* Opens nav when click on button */
$('.nav__btn').click(function(event){
     $('.nav__list').toggle();
     $(this).toggleClass('open');
});

/* Hiding nav when click on link */
$('.nav__link').click(function() {
   $('.nav__list').hide();
   $('.nav__btn').removeClass('open');
});

/* Hiding nav when click on ESC button */
$( document ).on( 'keydown', function ( e ) {
    if ( e.keyCode === 27 ) { // ESC
         $('.nav__list').hide();
         $('.nav__btn').removeClass('open');
    }
});


/* ==================== ==================== ====================
 * functions - Lightbox
 * ==================== ==================== ==================== */
$(function(){
  lightbox.option({
    'resizeDuration': 500,
    'wrapAround': true,
    'alwaysShowNavOnTouchDevices': true
  })
});


// Smooth Scroll
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });



/* ==================== ==================== ====================
 * functions - BxSlider
 * ==================== ==================== ==================== */
$(document).ready(function(){
    $('.slider').bxSlider();
  });
