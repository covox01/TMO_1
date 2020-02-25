(function(){
	document.addEventListener('DOMContentLoaded', init, false);

	var creative = {};
	var timer = {};

	function init () {
		 creative.banner                         = document.getElementById("banner");
		 creative.click_tag                      = document.getElementById("click_tag");
		 creative.totalDivs                      = creative.banner.querySelectorAll("*");
		 creative.allDivs                        = creative.banner.children;
		 creative.tl                             = new TimelineMax();
		 creative.preload_counter                = 0;

		 creative.width                          = document.getElementById('banner').offsetWidth;
		 creative.height                         = document.getElementById('banner').offsetHeight;
		 
		 timer.banner_startTimer;
		 timer.banner_start                      = Date.now();
		 timer.banner_end                        = timer.banner_start + 15000;

		 creative.phone_img_count                = 11;

		 // Start Timer
		 // timer.banner_startTimer = setInterval(bannerTime, 100);

		 addListeners();
		 // init_broadcast_elements();
		 elements_off();
	}

	function elements_off () {
		 // elements opacity off
		 for (i = 0; i < creative.allDivs.length; i++) {TweenMax.set(creative.allDivs[i], {opacity:0}); }
		 
		 add_preload_class();
	}

	function add_preload_class () {
		 //add class for image loader
		 addClass(creative.totalDivs, 'load_images');
		 imagesLoaded( '#banner', {
			background: '.load_images'
		 }, function( imgLoad ) {
			console.log(imgLoad.images.length + "images loaded checking .load_images backgrounds")
			frameOne_init();
		 });     
	}

	function frameOne_init () {
	  TweenMax.to([creative.banner, border], 0.2, {opacity:1});
	  TweenMax.set([
			bg,
	  ], {opacity:1});
	  TweenMax.set([logoGlow2_1], {opacity: 0})
	  TweenMax.delayedCall(0.2, frameOne);
	}
 
	function frameOne () {
		TweenMax.set([logo1_1, logoBack1_1], {opacity: 1})
		frameOneTL = new TimelineMax();
		var frameDelay = 1.3
		frameOneTL
			.from([logo1_1], .4+.3, {autoAlpha: 0, scale:2.5, ease: Back.easeOut, transformOrigin: "150px, 125px"})
			.to([logo1_1], .7, {delay: .2+.5, y:220, ease: Back.easeInOut})

			var frameDelay = 2+.15
		TweenMax.delayedCall(frameDelay, frameTwo);
	}

	function frameTwo() {
		TweenMax.set([bracket2_1, mask2_1, logo2_2], {opacity: 1});
		TweenMax.set([gradient2_1], {opacity: 1, y: 200});
		TweenMax.set([gradient2_2], {opacity: 1, y: 350})
		TweenMax.set([mask2_2], {opacity:1, y: 500})
		
		frameTwoTL = new TimelineMax({});
		frameTwoTL

		// --- Logo Pulls Down
			.from([logo2_2], .8, {y: -100, ease: Back.easeOut.config(.8)})

		// --- Top Gradient Pulls Up

			.to([gradient2_1], 1.4, {y:-50}, "fadeIn-=.2")
			.to([mask2_1], 1.4, {y: -260}, "fadeIn-=.2")

		// --- Bottom Gradient Pulls Up	

			.to([gradient2_2], 1.3, {y:-80}, "fadeIn+=.4")
			.to([mask2_2], 1.3, {y: 0}, "fadeIn+=.4")

		// --- Logo Glows Once Bracket Fully Reveals

			.to([logoGlow2_1], .2, {delay: .4, opacity: 1}, "-=1.65")
			.to([logoGlow2_1], .5, {opacity: 0}, "-=.7")

			frameThree()
	}

	function frameThree(){
		TweenMax.set([
			text3_1,
			mask3_1,
			text3_2, 
			text3_3
		], {opacity: 1});
		
		frameThreeTL = new TimelineMax();
		frameThreeTL
			.from([text3_1], 1.5, {delay: 1.1, y: -100, ease: Power4.easeInOut})
			.from([text3_2], .8, {opacity: 0, scale: .2, transformOrigin: "150px 119px", ease: Power4.easeInOut}, "-=.7")
			.from([text3_3], .3, {opacity: 0, scale: 2, transformOrigin: "147.5px 150.5px", ease:Power2.easeIn}, "-=.1")
			.to([text3_3], .1, {scale: 1.1, transformOrigin: "147.5px 150.5px"})
			.to([text3_3], .1, {scale: 1, transformOrigin: "147.5px 150.5px"})

			var frameDelay = 2.5;
			TweenMax.delayedCall(frameDelay+1.14, ctaAnimation); 
	}

	function ctaAnimation () {  
		TweenMax.set([cta3_1, legal3_1], {opacity:1});
		TweenMax.from([cta3_1],  0.4, {rotationX:90, transformOrigin:"150px 224.5px", perspective:400});
		TweenMax.from([legal3_1],  0.25, {opacity:0});    
	}


	function legal_in () {
		 TweenMax.set([legal_over], {opacity:1, y:0});
		 TweenMax.from([legal_over],  0.2, {opacity:0, y:creative.height});

		 creative.legal_overMouse.addEventListener("mouseout", legal_out); 
		 creative.legal_overMouse.addEventListener("click", legalStay);
	}

	function legalStay () {
		 TweenMax.set([legal_over], {opacity:1, pointerEvents:"auto"});
		 
		 addClass("#legal_hover", "clicked");

		 if(hasClass(creative.legal_overMouse, "clicked")){
			  creative.legal_overMouse.removeEventListener("mouseout", legal_out);
			  creative.legal_overMouse.removeEventListener("mouseover", legal_in); 
		 }
 
		 creative.legal_overIt.addEventListener("click", legal_out);         
	}

	function legal_out () {
		 TweenMax.set([legal_over], {pointerEvents:"none"});
		 TweenMax.to([legal_over],  0.2, {opacity:0, y:creative.height});
		 
		 removeClass(creative.legal_overMouse, "clicked")
		 creative.legal_overIt.removeEventListener("click", legal_out);
		 creative.legal_overMouse.addEventListener("mouseover", legal_in);
		 creative.legal_overMouse.addEventListener("mouseout", legal_out);
	}

	function addListeners () {
		 creative.click_tag.addEventListener('click', bgExitHandler, false);
	}

	function bgExitHandler () {
		 Enabler.exit('Background Exit');
	}

	/*--------------- Snippets --------------------*/
		 
		 function Random (max) {
			  return Math.random()*max;
		 }

		 function random (min, max) {
			  return Math.floor(Math.random() * (max - min + 1)) + min;
		 }

		 function hasClass(el, className) {
			if (el.classList)
			  return el.classList.contains(className)
			else
			  return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
		 }

		 function addClass(elements, myClass) {

			// if there are no elements, we're done
			if (!elements) { return; }

			// if we have a selector, get the chosen elements
			if (typeof(elements) === 'string') {
			  elements = document.querySelectorAll(elements);
			}
			// if we have a single DOM element, make it an array to simplify behavior
			else if (elements.tagName) { elements=[elements]; }

			// add class to all chosen elements
			for (var i=0; i<elements.length; i++) {

			  // if class is not already found
			  if ( (' '+elements[i].className + ' ').indexOf(' '+myClass+' ') < 0 ) {

				 // add class
				 elements[i].className += ' ' + myClass;
			  }
			}
		 }

		 function removeClass(el, className) {
			if (el.classList)
			  el.classList.remove(className)
			else if (hasClass(el, className)) {
			  var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
			  el.className=el.className.replace(reg, ' ')
			}
		 }

})();
