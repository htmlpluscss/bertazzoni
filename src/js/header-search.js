
((form) => {

	if(!form) {

		return;

	}

	var input = form.querySelector('.header-search__input');

	input.addEventListener('focus', ()=> form.classList.add('is-open'));

})(document.querySelector('.header-search'));