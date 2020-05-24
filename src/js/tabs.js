((tabs)=>{

	"use strict";

	if(!tabs.length) {

		return;

	}

	Array.prototype.forEach.call(tabs, (tab) => {

		var btn = tab.querySelectorAll('.tabs__btn'),
			item = tab.querySelectorAll('.tabs__item'),
			nav = document.createElement('div');

		Array.prototype.forEach.call(btn, (el,index) => {

			nav.appendChild(el);

			el.addEventListener('click', () => {

				Array.prototype.forEach.call(btn, (e,i) => {

					if(i == index) {

						e.classList.add('tabs__btn--active');
						item[i].classList.remove('visuallyhidden');

					}
					else{

						e.classList.remove('tabs__btn--active');
						item[i].classList.add('visuallyhidden');

					}

				});

				setTimeout( () => PubSub.publish('windowWidthResize'), 100 );

			});

		});

		nav.className = 'tabs__nav';
		tab.insertBefore(nav, item[0]);

	});

})(document.querySelectorAll('.tabs'));