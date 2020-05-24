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
			related = swipe.classList.contains('swiper-container--related'),
			product = swipe.classList.contains('swiper-container--product'),
			accompanying = swipe.classList.contains('swiper-container--accompanying'),
			articlesNews = swipe.classList.contains('swiper-container--articles-news'),
			homeSlider = swipe.classList.contains('swiper-container--home-slider'),
			homeAboutSlider = swipe.classList.contains('swiper-container--home-about');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls';

		swipeBtns.className = 'swiper-navigation';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.innerHTML = '<svg width="23" height="17" viewBox="0 0 23 17"><path d="M.1404 8.8388l7.1875 7.1875a.4792.4792 0 00.818-.3388v-.9583a.4791.4791 0 00-.1405-.3388l-4.932-4.932h19.4474A.479.479 0 0023 8.9792v-.9583a.4789.4789 0 00-.4792-.4792H3.0734l4.932-4.932a.4788.4788 0 00.1404-.3389v-.9583a.4787.4787 0 00-.4791-.4792.479.479 0 00-.3388.1404L.1404 8.1612a.479.479 0 000 .6776z"/></svg>';

		swipeNext.innerHTML = '<svg width="23" height="17" viewBox="0 0 23 17"><path d="M22.8596 8.8388l-7.1875 7.1875a.4792.4792 0 01-.8179-.3388v-.9583a.4789.4789 0 01.1404-.3388l4.932-4.932H.4792A.479.479 0 010 8.9792v-.9583a.479.479 0 01.4792-.4792h19.4474l-4.932-4.932a.4786.4786 0 01-.1404-.3389v-.9583a.4786.4786 0 01.4791-.4792.479.479 0 01.3388.1404l7.1875 7.1875a.479.479 0 010 .6776z"/></svg>';

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

		}

		resetSwipe();

		if (homeSlider) {

			toggleSwipe = () => {

				toggleSwipe = false;

				new Swiper(swipe, {
					loop: true,
					speed: 600,
					autoHeight: false,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					pagination: {
						bulletElement: 'button',
						bulletClass: 'button',
						bulletActiveClass: 'is-active',
						el: swipeNav
					}
				});

			}

		}

		if (homeAboutSlider) {

			toggleSwipe = () => {

				toggleSwipe = false;

				new Swiper(swipe, {
					loop: true,
					slidesPerView: 'auto',
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					pagination: {
						bulletElement: 'button',
						bulletClass: 'button',
						bulletActiveClass: 'is-active',
						el: swipeNav
					}
				});

			}

		}

		if (related || product || accompanying || articlesNews) {

			toggleSwipe = () => {

				resetSwipe();

				swipe.parentNode.parentNode.classList.remove('swiper-container-style');

				if (window.innerWidth < 768 && count > 1) {

					swipe.parentNode.parentNode.classList.add('swiper-container-style');

					mySwipe = new Swiper(swipe, {
						loop: true,
						autoHeight: true,
						pagination: {
							clickable: true,
							bulletElement: 'button',
							bulletClass: 'button',
							bulletActiveClass: 'is-active',
							el: swipeNav
						}
					});

				}

			}

		}

		PubSub.subscribe('windowWidthResize', () => {

			if (window.Swiper && toggleSwipe) {

				toggleSwipe();

			}

		});

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