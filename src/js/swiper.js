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
			review = swipe.classList.contains('swiper-container--review'),
			slidesPerViewAuto = swipe.classList.contains('swiper-container--slides-per-view-auto');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls';

		swipeBtns.className = 'swiper-navigation';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.innerHTML = '<svg width="26" height="24" viewBox="0 0 26 24"><path d="M17.46 24l8.318-12.063L17.46 0h-3.174l7.174 10.667H0v2.603h21.46L14.286 24z"/></svg>';
		swipeNext.innerHTML = '<svg width="26" height="24" viewBox="0 0 26 24"><path d="M17.46 24l8.318-12.063L17.46 0h-3.174l7.174 10.667H0v2.603h21.46L14.286 24z"/></svg>';

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

		if (review) {

			toggleSwipe = function() {

				toggleSwipe = false;

				new Swiper(swipe, {
					loop: true,
					autoHeight: true,
					spaceBetween: 32,
					slidesPerView: 4,
					slidesPerGroup: 1,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					breakpoints: {
						320: {
							slidesPerView: 1,
							slidesPerGroup: 1
						},
						768: {
							slidesPerView: 2,
							slidesPerGroup: 2
						},
						1200: {
							slidesPerView: 4,
							slidesPerGroup: 1
						}
					}
				});

			}

		}

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