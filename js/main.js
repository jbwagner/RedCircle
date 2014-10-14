(function($){

// Responsive functions. Adjust breakpoint(s) as needed
function responsive() {
  // Do these on every screen resize
  
  
  // Do these on certain widths
  if ( $(window).width() > 600 ) { // above mobile size
    $('#primary-navigation .menu').removeAttr('style');
    $('#mobile-menu-button').removeClass('has-open');
  } else { // mobile size
    
  }
}

function onResize() {
  responsive();
}

var resizeTimer;
	
window.onresize = function() {
	if (resizeTimer){
		clearTimeout(resizeTimer);
	}
	var res;
	res = setTimeout(function(){

		// Fire the onResize function.			
		onResize();
		
	}, 200);
};

// Find a query variable for use in scripts
/*function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}*/

// Nav menu click-to-open functions
function navMenus() {
  // Any click outside of nav, close dropdowns
	$(document).click(function(e){
  	if ( $(e.target).parents().index($('#primary-navigation')) == -1 && $(e.target).parents().index($('#mobile-menu-button')) == -1 ) { // if click anywhere but nav
  	  if ( $('.has-open').length > 0 ) {// if there are any open submenus
    	  $('.menu-item-has-children.has-open .sub-menu').fadeOut(100).parent('.has-open').removeClass('has-open'); // close all submenus
      }
      var el = $('#mobile-menu-button'); // grab the mobile menu button
      if ( el.hasClass('has-open') ) { // if it's open
        $('ul#menu-primary-navigation').fadeOut(100); // close the mobile menu
        el.removeClass('has-open');
        //toggleOpen(el); // toggle the open class
      }
  	}
	});
	
	// Nav Dropdowns
	$('.menu-item-has-children > a').click(function(e){ // Any menu item with a sub-menu on click...
  	e.preventDefault();  	
  	$(this).siblings('.sub-menu').fadeToggle(100);
  	
  	// if we click to open a submenu and there is another menu already open, close the old one
  	$(this).parent().siblings('.menu-item-has-children.has-open').each(function(){
    	$(this).removeClass('has-open').find('.sub-menu').fadeOut(100);
    	$(this).find('.menu-item-has-children.has-open').removeClass('has-open');
  	});
  	
  	// mark the parent as having an open menu
  	$(this).parent().toggleClass('has-open');
	});
	// Any click outside of nav, close dropdowns
	$(document).click(function(e){
  	if ( $(e.target).parents().index($('#primary-navigation')) == -1 && $(e.target).parents().index($('#mobile-menu-button')) == -1) {
  	  if ( $('.has-open').length > 0 ) {
    	  $('.menu-item-has-children.has-open .sub-menu').fadeOut(100).parent('.has-open').removeClass('has-open');
      }
      var el = $('#mobile-menu-button');
      if ( el.hasClass('has-open') ) {
        $('ul#menu-primary-navigation').fadeOut(100);
        el.removeClass('has-open');
      }
  	}
	});
	
	// Mobile Nav Dropdown
	$('#mobile-menu-button').click(function(e){
  	e.preventDefault();
  	$('#primary-navigation .menu').fadeToggle(100);
  	$(this).toggleClass('has-open');
	});
}

function formBlanks() {
  // Set forms to blank on focus, and return to default content when left blank
  
	$('input[type=text], textarea').each(function(){
	  // create a "default" attribute to hold the starting value
		$(this).attr('default', $(this).val());
	});
	
	$('input[type=text], textarea').focus(function(){
	  // When focused, if the current value == default
	  // (i.e. no user content has been added yet) blank the field
		if ($(this).val() == $(this).attr('default')) {
			$(this).val('');
		}
	});
	
	$('input[type=text], textarea').blur(function(){
	  // When unfocused, if no content exists (i.e. no entered
	  // user data, or user deleted data) revert to default
		if ($(this).val() === '') {
			$(this).val($(this).attr('default'));
		}
	});
	
	$('form').submit(function(){
	  // If the current value == default value, blank the value
	  // when the form is submitted to prevent default values from
	  // appearing in submission data or allowing form submission
	  // if a required field has a default value
  	$(this).find('input[type=text], textarea').each(function(){
    	if ( $(this).val() == $(this).attr('default') ) { $(this).attr('value',''); }
  	});
	});
}

function formLabels() {
  // Find all Gravity form fields/inputs in a sidebar, and place the label inside the field
  // Check for values already entered and place those instead
  $('.gfield').each(function(){
    var label = $(this).children('.gfield_label').text();
    var textarea = $(this).find('.ginput_container textarea');
    var input = $(this).find('.ginput_container input[type=text]');
    textarea.val(label);
    input.val(label);
    if (input.attr('value') !== '' ) {
      input.val(input.attr('value'));
    }
  });
}

function initOwlCarousel() {
  var gallery = $('.owl-gallery');
  gallery.owlCarousel({
    items : 1,
    loop : true,
    autoplay : true,
    autoplayTimeout : 5000,
    dots : false,
    nav : true,
    navText : ['Prev','Next']
  });
}

function initOwlBrands() {
  var owl = $('#brands-slider');
  owl.owlCarousel({
    responsive : { 0 : { items: 1, slideBy: 1 },
                   480 : { items: 2, slideBy: 2 },
                   640 : { items: 3, slideBy: 3 },
                   960 : { items: 5, slideBy: 5 }
                 },
    
    dots : false,
    loop : true,
    autoplay : true,
    autoplayTimeout : 5000,
  });
  
  $('#brands-carousel .prev').click(function(e){
    e.preventDefault();
    owl.trigger('prev.owl.carousel');
  });
  $('#brands-carousel .next').click(function(e){
    e.preventDefault();
    owl.trigger('next.owl.carousel');
  });
}

$(window).load( function(){
	onResize();
	formBlanks();
});

$(document).ready(function(){
  formLabels();
	navMenus();
	initOwlCarousel();
	initOwlBrands();
});

})(jQuery);
