/*! UTF-8

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

https://github.com/htmlpluscss/

*/

(()=>{

	"use strict";

	window.BERTAZZONI = window.BERTAZZONI || {};
	BERTAZZONI.resizeTimeout = null;
	BERTAZZONI.windowWidthOLd = window.innerWidth;

	window.addEventListener("resize",()=>{

		window.requestAnimationFrame(()=>{

			if (!BERTAZZONI.resizeTimeout) {

				BERTAZZONI.resizeTimeout = setTimeout(()=>{

					BERTAZZONI.resizeTimeout = null;

					if(BERTAZZONI.windowWidthOLd !== window.innerWidth) {

						BERTAZZONI.windowWidthOLd = window.innerWidth;

						PubSub.publish('windowWidthResize');

					}

				}, 100);

			}

		});

	});

	window.addEventListener("load", () => PubSub.publish('pageLoad'));
	window.addEventListener("DOMContentLoaded", ()=> PubSub.publish('DOMContentLoaded'));
	window.addEventListener("scroll", () => window.requestAnimationFrame(() => PubSub.publish('windowScroll')));

	// обработчик анимаций
	BERTAZZONI.cssAnimation = (a)=>{var b,c,d=document.createElement("cssanimation");switch(a){case'animation':b={"animation":"animationend","OAnimation":"oAnimationEnd","MozAnimation":"animationend","WebkitAnimation":"webkitAnimationEnd"};break;case'transition':b={"transition":"transitionend","OTransition":"oTransitionEnd","MozTransition":"transitionend","WebkitTransition":"webkitTransitionEnd"}}for(c in b)if(d.style[c]!==undefined)return b[c]};

	// Determine if an element is in the visible viewport
	BERTAZZONI.isInViewport = (element) => {
		var rect = element.getBoundingClientRect();
		return (rect.top >= 0 && rect.bottom <= window.innerHeight);
	};

	// отделяем тысячи
	BERTAZZONI.sepNumber = (str) => {
		str = parseInt(str, 10).toString();
		return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	}

	// склеиваем тысячи
	BERTAZZONI.strToNumber = (str) => parseInt(str.replace(/\s+/g,''), 10);

})();