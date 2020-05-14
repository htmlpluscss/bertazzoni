((forms)=>{

	"use strict";

	Array.prototype.forEach.call(forms, function(form){

		var showMoadalOk = form.getAttribute('data-ok-modal'),
			formRequired = form.querySelectorAll('[required]'),
			formBtnSubmit = form.querySelector('.form__submit');

		// отправка формы
		form.addEventListener('submit', function(e) {

			e.preventDefault();

			var novalidate = false,
				formData = new FormData(form);

			Array.prototype.forEach.call(formRequired, function(input){

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

				xhr.onreadystatechange = function() {

					if (xhr.readyState != 4){

						return;

					}

					if (xhr.status == 200) {

						if(showMoadalOk) {

							BERTAZZONI.modalShow(showMoadalOk);

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

// input

	var inputRequired = document.querySelectorAll('.input[required]');

	function errorInput(el){

		el.classList.toggle('input--error',!el.value);

	}

	Array.prototype.forEach.call(inputRequired, function(el){

		el.addEventListener('keyup', function() {

			errorInput(el);

		});

		el.addEventListener('blur', function() {

			errorInput(el);

		});

	});

// checked

	var checkbox = document.querySelectorAll('.checkbox[required]');

	Array.prototype.forEach.call(checkbox, function(el){

		var input = el.querySelector('input');

		input.addEventListener('change', function() {

			if(input.checked) {

				el.classList.remove('checkbox--error');

			}

		});

	});

})(document.querySelectorAll('.form'));