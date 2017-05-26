// JS FOR wyattsanders.io

// setup image slider

// function showImageSlider(sliderDiv)
// {
// 	sliderDiv.removeClass("hidden");
	
// 	showSliderImageAtIndex(sliderDiv, 1);
// }

// function hideImageSlider(sliderDiv)
// {
// 	slider.addClass("hidden");
// }

// function hideImageSliderAtIndex(sliderDiv, index)
// {
	
// }

// function showSliderImageAtIndex(sliderDiv, index)
// {
	
// }

// setup parallax layers
function scaleParallaxLayers()
{
	layers = document.querySelectorAll("[data-type='parallax']");
		
	for(var i = 0; i < layers.length; ++i)
	{
		layer = layers[i];
		scale = layer.getAttribute('data-scale');
		scale = 'scale(' + scale + ', ' + scale + ')';
		layer.style['-webkit-transform'] = scale;
		layer.style['-moz-transform'] = scale;
		layer.style['-ms-transform'] = scale;
		layer.style['-o-transform'] = scale;
		layer.style.transform = scale;
	}
}

function addParallaxEventListener()
{
	window.addEventListener('scroll', function(e) {
		topDistance = window.pageYOffset;
		layers = document.querySelectorAll("[data-type='parallax']");
		
		for(var i = 0; i < layers.length; ++i)
		{
			layer = layers[i];
			depth = layer.getAttribute('data-depth');
			scale = layer.getAttribute('data-scale');
			movement = -(topDistance * depth);
			translate3d = 'matrix(' + scale + ',0,0,' + scale + ',0,' + movement + ')';
			layer.style['-webkit-transform'] = translate3d;
    	layer.style['-moz-transform'] = translate3d;
    	layer.style['-ms-transform'] = translate3d;
    	layer.style['-o-transform'] = translate3d;
    	layer.style.transform = translate3d;
		}
	});
}

// setup up masonry grids
function setupGrids()
{
	// init Masonry
	var $grid = $('.grid').isotope({
		itemSelector: '.grid-item',
		percentPosition: false,
		masonry: {
			columnWidth: '.grid-sizer'
		}
	});
	// layout Isotope after each image loads
	$grid.imagesLoaded().progress( function() {
		$grid.isotope('layout');
	});
}

// external js: isotope.pkgd.js


// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.name', // name of the item
    index: '.index', // number in display
    category: '[data-category]',
    weight: function( itemElem ) {
      var weight = $( itemElem ).find('.weight').text();
      return parseFloat( weight.replace( /[\(\)]/g, '') );
    }
  }
});

// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 10 ) > 50;
  },
  // show if name ends with -ium
  ium: function() {
    var name = $(this).find('.name').text();
    return name.match( /ium$/ );
  }
};

// bind filter button click
$('#filters').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});

// bind sort button click
$('#sorts').on( 'click', 'button', function() {
  var sortByValue = $(this).attr('data-sort-by');
  $grid.isotope({ sortBy: sortByValue });
});

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});


// setup modal
;(function(window){

	var
		// Is Modernizr defined on the global scope
		Modernizr = typeof Modernizr !== "undefined" ? Modernizr : false,

		// Always expect both kinds of event
		buttonPressedEvent = 'touchstart click',

		// List of all animation/transition properties
		// with its animationEnd/transitionEnd event
		animationEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},

		transitionEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},

		Mocean = function() {
			this.init();
		};

	// Current version.
	Mocean.version = '0.0.1';

	// Initialization method
	Mocean.prototype.init = function() {
		this.buttonPressedEvent = buttonPressedEvent;

		//event trigger after animation/transition end.
		this.transitionEndEventName = Modernizr ? transitionEndEventNames[Modernizr.prefixed('transition')] : getTransitionEndEventNames();
		this.animationEndEventName  = Modernizr ? animationEndEventNames[Modernizr.prefixed('animation')] : getAnimationEndEventNames();
		this.transitionAnimationEndEvent = this.animationEndEventName + ' ' + this.transitionEndEventName;
	};

	Mocean.prototype.getViewportHeight = function() {

		var docElement = document.documentElement,
				client     = docElement['clientHeight'],
				inner      = window['innerHeight'];

		if( client < inner )
			return inner;
		else
			return client;
	};

	// Get all the properties for transition/animation end
	function getTransitionEndEventNames() {
		return _getEndEventNames( transitionEndEventNames );
	}

	function getAnimationEndEventNames() {
		return _getEndEventNames( animationEndEventNames );
	}

	function _getEndEventNames(obj) {
		var events = [];

		for ( var eventName in obj ) {
			events.push( obj[ eventName ] );
		}

		return events.join(' ');
	}

	// Creates a Mocean object.
	window.Mocean = new Mocean();

})(this);

// ========================================
// Mocean Modal Effects v1.0.0
// ========================================

;(function(window) {

	var Mocean = window.Mocean;

	var MoceanModal = function() {
		if ( !(this instanceof MoceanModal) ) {
			return new MoceanModal();
		}

		this.init();
	};

	MoceanModal.version = '0.0.1';

	MoceanModal.prototype.init = function() {
		this.$body               = $('body');
		this.$element            = null;
		this.$overlay            = null;
		this.isShown             = false;
		this.hasPerspective      = false;
		this.modalMocean         = '';
		this.modalMoceanOut      = '';
		this.modalMoceanProvided = true;
		this.bindUIActions();
	};

	MoceanModal.prototype.bindUIActions = function() {
		$(document).on( Mocean.buttonPressedEvent,
										'.mocean-modal-button',
										$.proxy(this.open, this)
									);

		$(document).on( Mocean.buttonPressedEvent,
										'.mocean-modal-close, [data-mocean-dismiss="modal"]',
										$.proxy(this.close, this)
									);

		var self = this;

		$(window).on( 'keyup', function( e ) {
			if ( e.keyCode === 27 ) self.close(e);
		});
	};

	MoceanModal.prototype.getChildNode = function(parent, str)
	{
		if(parent == null ||
			parent == undefined ||
			parent.childNodes == null ||
			parent.childNodes == undefined) return;

		for(var i = 0; i < parent.childNodes.length; ++i)
		{
			var element = $($(parent.childNodes[i])[0]);
			var elementClass = $(element[0])[0].className;
			if(elementClass != undefined && elementClass == str)
			{
				return element;
			}
			
		}
	}

	MoceanModal.prototype.injectModalContent = function(b)
	{
		// get modal content
		var modalContentTargetId = b.data('content-target');
		console.log(modalContentTargetId);

		var modalContainerId = modalContentTargetId + '-modal-content';
		console.log(modalContainerId);

		var modalContentSource = document.getElementById(modalContainerId);
		console.log(modalContentSource);

		var modalContentTitle = this.getChildNode(modalContentSource, 'title');
		var modalContentTitleHTML = modalContentTitle ? modalContentTitle.html() : undefined;
		console.log(modalContentTitleHTML);

		var modalContentBanner = this.getChildNode(modalContentSource, 'banner');
		var modalContentBannerHTML = modalContentBanner ? modalContentBanner.html() : undefined;
		console.log(modalContentBannerHTML);

		var modalContentBody = this.getChildNode(modalContentSource, 'modal-content');
		var modalContentBodyHTML = modalContentBody ? modalContentBody.html() : undefined;
		console.log(modalContentBodyHTML);

		// inject modal content
		var modalTitle = $('#modal-title'); // get the target div for the modal title
		if(modalTitle) // if modal title was found, clear the template title
		{
			modalTitle.empty();
			$(modalTitle["0"]).html(modalContentTitleHTML); // add the modal title
		}

		var modalBanner = $('#modal-banner');
		if(modalBanner)
		{
			modalBanner.empty();
			$(modalBanner["0"]).html(modalContentBannerHTML); // add the modal banner
		}

		var modalContent = $('#modal-content');
		if(modalContent)
		{
			modalContent.empty();
			$(modalContent["0"]).html(modalContentBodyHTML);
		}

	};

	MoceanModal.prototype.open = function( e ) {
		e.preventDefault();

		if ( this.isShown ) {
			return;
		}

		var $button = $(e.target.parentNode),
				target  = $button.data('mocean-target');

		this.$element = $(target || '#mocean-modal-wrap');

		if ( !this.$element.length ) return;

		// Mocean Modal Type
		this.modalMocean     = $button.data( 'mocean-type' );
		this.modalMoceanOut  = $button.data( 'mocean-out-type' );

		this.injectModalContent($button);

		if ( $button.data( 'mocean-needs-perspective' ) ) {
			this.$body.addClass( 'mocean-perspective' );
			this.hasPerspective = true;
		}

		// check if the mocean class is already added
		if ( this.$element.hasClass( this.modalMocean ) || this.modalMocean === undefined ) {
			this.showModal();
		} else {
			this.modalMoceanProvided = false;
			this.$element.addClass( this.modalMocean );

			this.$element.on( Mocean.transitionAnimationEndEvent, $.proxy(function() {
				this.$element.off( Mocean.transitionAnimationEndEvent );
				this.showModal();
			}, this));
		}
	};

	MoceanModal.prototype.close = function( e ) {
		e.preventDefault();

		if ( !this.isShown ) {
			return;
		}

		this.$element.on( Mocean.transitionAnimationEndEvent, $.proxy(function () {
			this.$element.off( Mocean.transitionAnimationEndEvent );
			this.hideModal();
		}, this));

		this.$element.removeClass( 'mocean-show' );
		this.isShown = false;

		if ( this.modalMoceanOut ) {
			this.$element.addClass( this.modalMoceanOut );
		}
	};

	MoceanModal.prototype.showModal = function() {
		this.addOverlay();
		this.$element.addClass( 'mocean-show' );
		this.isShown = true;
	};

	MoceanModal.prototype.hideModal = function() {
		if ( this.modalMoceanOut ){
			this.$element.removeClass( this.modalMoceanOut );
			this.modalMoceanOut = '';
		}

		if ( this.hasPerspective ) {
			this.$body.removeClass( 'mocean-perspective' );
			this.hasPerspective = false;
		}

		this.removeOverlay();
		this.$element.removeClass( this.modalMocean );
		this.modalMocean = '';
	}

	MoceanModal.prototype.addOverlay = function() {
		var atts = [];

		atts.push('class="mocean-overlay mocean-modal-overlay"');
		atts.push('id="mocean-modal-overlay"');
		atts.push('data-mocean-dismiss="modal"')

		this.$overlay = $('<div ' + atts.join(' ') + ' />').insertAfter( this.$element );
		this.$overlay[0].offsetWidth;
	};

	MoceanModal.prototype.removeOverlay = function() {
		this.$overlay.remove();
		this.$overlay = null;
	};

	window.Mocean.Modal = MoceanModal();

})(this);


function init()
{
	$(".button-collapse").sideNav();
	
	$(".dropdown-button").dropdown();
	
	// Initializes the scrollSpy
	$(".scrollspy").scrollSpy();
	
	//set onclick for 'modal'
	$("#modal-trigger").click(function() { $('#modal1').openModal(); });
	
	scaleParallaxLayers();
	
	addParallaxEventListener();
	
	setupGrids();

	//initIsotope();
}

init();