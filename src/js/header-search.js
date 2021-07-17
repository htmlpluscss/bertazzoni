
((form) => {

	if(!form) {

		return;

	}

	var input = form.querySelector('.header-search__input');

	input.addEventListener('focus', ()=> document.body.classList.add('header-search-open'));

	window.addEventListener('click', event => {

		if(document.body.classList.contains('header-search-open') && !event.target.closest('.header-search')){

			document.body.classList.remove('header-search-open');

		}

	});

})(document.querySelector('.header-search'));