$("html").click(function(){$(".nav__list").hide(),$(".nav__btn").removeClass("open")}),$(".nav").click(function(n){n.stopPropagation()}),$(".nav__btn").click(function(n){$(".nav__list").toggle(),$(this).toggleClass("open")}),$(".nav__link").click(function(){$(".nav__list").hide(),$(".nav__btn").removeClass("open")}),$(document).on("keydown",function(n){27===n.keyCode&&($(".nav__list").hide(),$(".nav__btn").removeClass("open"))}),$(function(){lightbox.option({resizeDuration:500,wrapAround:!0,alwaysShowNavOnTouchDevices:!0})}),$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(n){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var o=$(this.hash);(o=o.length?o:$("[name="+this.hash.slice(1)+"]")).length&&(n.preventDefault(),$("html, body").animate({scrollTop:o.offset().top},1e3,function(){var n=$(o);if(n.focus(),n.is(":focus"))return!1;n.attr("tabindex","-1"),n.focus()}))}}),$(window).on("load",function(){$(".hero__slide--two").removeClass("hidden"),$(".slider").bxSlider()});