(()=>{

	"use strict";

	// клик по гамбургеру

	document.querySelector('.btn-menu-toggle').addEventListener('click', () => {

		if(BERTAZZONI.OpenMenu) {

			document.body.classList.remove('menu-show');

			window.scrollTo(0,BERTAZZONI.windowScrollOld);

			BERTAZZONI.OpenMenu = false;

		}
		else {

			BERTAZZONI.OpenMenu = true;

			// записываем значение скролла страницы
			BERTAZZONI.windowScrollOld = window.pageYOffset;
			window.scrollTo(0,0);

			document.body.classList.add('menu-show');

		}

	});

	// субменю

	var navArrowOpenSubMenu = document.querySelectorAll('.menu__arrow');

	Array.prototype.forEach.call(navArrowOpenSubMenu, function(btn){

		btn.addEventListener('click', () => {

			btn.classList.toggle('menu__arrow--open');

		});

	});

	// fixed

	var ScrollTopPrev = window.pageYOffset;

	PubSub.subscribe('windowScroll', ()=> {

		if(!BERTAZZONI.menuOFF) {

			if(!BERTAZZONI.OpenMenu) {

				var top = window.pageYOffset;

				if(top <= 0) {

					document.body.classList.remove('header-fixed');

				}
				else if(top > window.innerHeight){

					document.body.classList.toggle('header-fixed', top <= ScrollTopPrev);

				}

				setTimeout(()=>{

					ScrollTopPrev = top;

				},100);

			}

		}
		else {

			setTimeout(()=>{

				ScrollTopPrev = window.pageYOffset;

			},100);

		}

	});

})();