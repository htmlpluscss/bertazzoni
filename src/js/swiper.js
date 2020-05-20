((swiperContainer)=>{

	"use strict";

	if(!swiperContainer.length) {

		return;

	}

	var swiperInit = window.Swiper;

	Array.prototype.forEach.call(swiperContainer, (swipe)=>{

		var mySwipe = null,
			toggleSwipe = null,
			resetSwipe = null,
			swipeControls = document.createElement('div'),
			swipeNav = document.createElement('div'),
			swipeBtns = document.createElement('div'),
			swipeNext = document.createElement('button'),
			swipePrev = document.createElement('button'),
			items = swipe.querySelectorAll('.swiper-slide'),
			count = items.length,
			homeSlider = swipe.classList.contains('swiper-container--home-slider');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls';

		swipeBtns.className = 'swiper-navigation';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.innerHTML = '<svg width="63" height="63" viewBox="0 0 63 63"><path d="M20.1404 31.8388l7.1875 7.1875a.4792.4792 0 00.8179-.3388v-.9583a.4789.4789 0 00-.1404-.3388l-4.932-4.932h19.4474A.479.479 0 0043 31.9792v-.9583a.4789.4789 0 00-.4792-.4792H23.0734l4.932-4.9321a.4785.4785 0 00.1404-.3388v-.9583a.4788.4788 0 00-.4791-.4792.4791.4791 0 00-.3388.1404l-7.1875 7.1875a.479.479 0 000 .6776z"/></svg>';

		swipeNext.innerHTML = '<svg width="63" height="63" viewBox="0 0 63 63"><path d="M42.8596 31.8388l-7.1875 7.1875a.4792.4792 0 01-.8179-.3388v-.9583a.4789.4789 0 01.1404-.3388l4.932-4.932H20.4792A.479.479 0 0120 31.9792v-.9583a.4789.4789 0 01.4792-.4792h19.4474l-4.932-4.9321a.4785.4785 0 01-.1404-.3388v-.9583a.4788.4788 0 01.4791-.4792.4791.4791 0 01.3388.1404l7.1875 7.1875a.479.479 0 010 .6776z"/></svg>';

		swipeBtns.appendChild(swipePrev);
		swipeBtns.appendChild(swipeNext);
		swipeControls.appendChild(swipeBtns);
		swipeControls.appendChild(swipeNav);
		swipe.parentNode.appendChild(swipeControls);

		resetSwipe = () => {

			if(mySwipe) {

				mySwipe.destroy(false,true);
				mySwipe = undefined;

			}

			swipeNav.classList.add('hide');

		}

		resetSwipe();

		if (homeSlider) {

			toggleSwipe = function() {

				toggleSwipe = false;

				new Swiper(swipe, {
					loop: true,
					speed: 6000,
					autoHeight: false,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					}
				});

			}

		}
/*
		if (slidesPerViewAuto) {

			swipePrev.classList.add('swiper-button-disabled');

			toggleSwipe = function() {

				resetSwipe();

				mySwipe = new Swiper(swipe, {
					loop: false,
					simulateTouch: false,
					updateOnImagesReady: true,
					slidesPerView: 'auto',
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					on: {
						imagesReady: function(){

							swipe.classList.toggle('swiper-container--off', swipe.swiper.virtualSize === swipe.swiper.width);

						},
						resize: function(){

							swipe.classList.toggle('swiper-container--off', swipe.swiper.virtualSize === swipe.swiper.width);

						}
					}
				});

			}

		}
*/
		if(window.Swiper && toggleSwipe) {

			toggleSwipe();

		}
		else {

			PubSub.subscribe('swiperJsLoad', toggleSwipe);

		}

		if(!swiperInit) {

			swiperInit = true;

			var script = document.createElement('script');

			script.type = 'text/javascript';
			script.async = true;
			script.src = '/js/swiper.min.js';

			script.onload = () => PubSub.publish('swiperJsLoad');

			document.head.appendChild(script);

		}

	});

})(document.querySelectorAll('.swiper-container'));