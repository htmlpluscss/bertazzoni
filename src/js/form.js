
// input-label
((inputLabel) => {

	if(!inputLabel.length) {

		return;

	}

	var focusInputLabel = (el,required) => {

		el.parentNode.classList.toggle('input-label--no-empty', el.value);

		if(required && el.getAttribute('required') !== null) {

			el.parentNode.classList.toggle('input-label--error', !el.value);

		}

	}

	Array.prototype.forEach.call(inputLabel, (el) => {

		el.addEventListener('focus', ()=> focusInputLabel(el));
		el.addEventListener('keyup', ()=> focusInputLabel(el,true));
		el.addEventListener('blur', ()=> focusInputLabel(el,true));

		focusInputLabel(el);

		PubSub.subscribe('DOMContentLoaded', ()=> focusInputLabel(el));

	});

})(document.querySelectorAll('.input-label__input'));


((forms) => {

	"use strict";

	if(!forms.length) {

		return;

	}

	Array.prototype.forEach.call(forms, (form) => {

		var showMoadalOk = form.getAttribute('data-modal-info'),
			formRequired = form.querySelectorAll('[required]'),
			formBtnSubmit = form.querySelector('.form__submit');

		// отправка формы
		form.addEventListener('submit', (e) => {

			e.preventDefault();

			var novalidate = false,
				formData = new FormData(form);

			Array.prototype.forEach.call(formRequired, (input) => {

				if(input.offsetParent === null) {

					return;

				}

				if(input.getAttribute('type') == 'checkbox') {

					if(input.checked){

						input.parentNode.classList.remove('checkbox--error');

					}
					else {

						input.parentNode.classList.add('checkbox--error');
						novalidate = true;

					}

				}

				else {

					errorInput(input);

					if(!input.value){

						novalidate = true;

					}

				}

			});

			if(!novalidate){

				var xhr = new XMLHttpRequest();

				xhr.open("POST", form.getAttribute('action'));
				xhr.send(formData);

				if(formBtnSubmit) {

					formBtnSubmit.disabled = true;

				}

				xhr.onreadystatechange = () => {

					if (xhr.readyState != 4){

						return;

					}

					if (xhr.status == 200) {

						if(showMoadalOk) {

							BERTAZZONI.modalShow('info', ...showMoadalOk.split('|'));

						}

					} else {

						alert('ошибка ' + xhr.status);

					}

					if(formBtnSubmit) {

						formBtnSubmit.disabled = false;

					}

				}

			}
			else {

				var inputError = form.querySelector('.input--error');

				if(!BERTAZZONI.isInViewport(inputError)){

					var top = window.pageYOffset + inputError.getBoundingClientRect().top - inputError.clientHeight;

					window.scrollTo(0, top);

				}

				if(inputError){

					setTimeout(function(){

						inputError.focus();

					},2000);

				}

			}

		});

	});



// inputRequired

	var inputRequired = document.querySelectorAll('.input[required]');

	var errorInput = (el) => el.classList.toggle('input--error', !el.value);

	Array.prototype.forEach.call(inputRequired, (el) => {

		el.addEventListener('keyup', () => errorInput(el));
		el.addEventListener('blur', () => errorInput(el));

	});



// checked

/*

	var checkbox = document.querySelectorAll('.checkbox[required]');

	Array.prototype.forEach.call(checkbox, (el) => {

		var input = el.querySelector('input');

		input.addEventListener('change', () => {

			if(input.checked) {

				el.classList.remove('checkbox--error');

			}

		});

	});

*/

})(document.querySelectorAll('.form'));