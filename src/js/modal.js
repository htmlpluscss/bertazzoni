((modal)=>{

	"use strict";

	if(!modal) {

		return;

	}

	var items = modal.querySelectorAll('.modal__item'),
		btns = document.querySelectorAll('[data-modal]'),
		box = modal.querySelector('.modal__box'),
		wrapper = document.querySelector('.wrapper'),
		windowScroll = window.pageYOffset;

	modal.addEventListener('click', (e) => {

		if(e.target.classList.contains('modal') || e.target.closest('.modal__close')){

			BERTAZZONI.hideModal();

		}

	});

	BERTAZZONI.hideModal = () => {

		modal.classList.add('visuallyhidden');

		document.body.classList.remove('modal-show');
		wrapper.style.top = 0;
		window.scrollTo(0,windowScroll);

		BERTAZZONI.activeModal = false;

	};

	BERTAZZONI.modalShow = (selector, info) => {

		if(!BERTAZZONI.activeModal){

			windowScroll = window.pageYOffset;

			wrapper.style.top = -windowScroll + 'px';

		}

		BERTAZZONI.activeModal = modal.querySelector('.modal__item--' + selector);

		if(selector == 'info') {

			BERTAZZONI.activeModal.querySelector('.modal__text').innerHTML = info[1] ? info[1] : '';
			BERTAZZONI.activeModal.querySelector('.modal__title').innerHTML = info[0] ? info[0] : '';

		}

		Array.prototype.forEach.call(items,(el)=>{

			el.classList.toggle('visuallyhidden', el !== BERTAZZONI.activeModal);

		});

		modal.classList.remove('visuallyhidden');

		document.body.classList.add('modal-show');
		window.scrollTo(0,0);

		BERTAZZONI.activeModal.focus();

	};

	Array.prototype.forEach.call(btns,(el)=>{

		el.addEventListener('click',(e)=>{

			e.preventDefault();

			BERTAZZONI.modalShow(el.getAttribute('data-modal'));

		});

	});

})(document.querySelector('.modal'));