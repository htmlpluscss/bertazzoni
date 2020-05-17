((filter)=>{

	"use strict";

	if(!filter){

		return;

	}

// form reset
	filter.addEventListener('reset', () => PubSub.publish('filterFormReset'));

// form change
	filter.addEventListener('change', () => PubSub.publish('filterFormChange'));

	// slider-range

	var sliderRange = document.querySelectorAll('.slider-range');

	if(sliderRange.length) {

		// загрузка скрипта

		var script = document.createElement('script');

		script.type = 'text/javascript';
		script.async = true;
		script.src = '/js/nouislider.min.js';

		script.onload = () => BERTAZZONI.sliderRangeInit(sliderRange);

		document.head.appendChild(script);

	}

// инициализация слайдеров

BERTAZZONI.sliderRangeInit = (elems) => {

	Array.prototype.forEach.call(elems, (el) => {

		var min = parseInt(el.getAttribute('data-min'), 10),
			max = parseInt(el.getAttribute('data-max'), 10),
			minInputHidden = el.querySelector('.slider-range__value-min'),
			maxInputHidden = el.querySelector('.slider-range__value-max'),
			start = el.getAttribute('data-start'),
			range = {
				'min': min,
				'max': max
			},
			input = el.querySelectorAll('.slider-range__input-control .input'),
			inputMin = el.querySelector('.slider-range__input-min'),
			inputMax = el.querySelector('.slider-range__input-max'),
			track = el.querySelector('.slider-range__track');

		if(start) {

			start = start.split(',');
			start = start.map(function(el){

				return parseInt(el, 10);

			});

		}
		else {

			start = [min, max];

		}

		if(track.classList.contains('slider-range__track--nonlinear-price')) {

			range = sliderNonlinearPrice;

		}

		noUiSlider.create(track, {
			start: start,
			connect: true,
			range: range
		});

		track.noUiSlider.on('slide', (values) => {

			inputMin.value = BERTAZZONI.sepNumber(parseInt(values[0], 10));
			inputMax.value = BERTAZZONI.sepNumber(parseInt(values[1], 10));

		});

		// create and dispatch the event
		var event = new CustomEvent("change", {
			detail: {
				hazcheeseburger: true
			}
		});

		track.noUiSlider.on('update', (values) => {

			minInputHidden.value = parseInt(values[0], 10);
			maxInputHidden.value = parseInt(values[1], 10);

			minInputHidden.dispatchEvent(event);
			maxInputHidden.dispatchEvent(event);

		});


	// события в инпутах

		Array.prototype.forEach.call(input, (el) => {

			el.addEventListener('focus', () => {

				setTimeout(() => {

					el.setSelectionRange(0,99);

				},100);

			});

			el.addEventListener('input', (e) => {

				var _min = parseInt(inputMin.value, 10),
					_max = parseInt(inputMax.value, 10);

				if (e.keyCode == 13) {

					el.blur();
					e.preventDefault();

				}

				if (_min < min) {

					_min = min;
					this.value = min;

				}

				if (_max > max) {

					_max = max;
					this.value = max;

				}

				if(_min < _max) {

					track.noUiSlider.set([_min, _max]);

				}

			});

		});

	// reset
		PubSub.subscribe('filterFormReset', () => track.noUiSlider.reset());

	});

};

// legend

	var btnLegend = filter.querySelectorAll('.filter__legend');

	Array.prototype.forEach.call(btnLegend, (btn) =>
		btn.addEventListener('click', () =>
			btn.classList.toggle('is-open')));



// reset

	var btnReset = filter.querySelector('.filter__btn-reset');

	PubSub.subscribe('filterFormReset', () => btnReset.classList.add('hide'));
	PubSub.subscribe('filterFormChange', () => btnReset.classList.remove('hide'));

// checked

/*	var checkbox = document.querySelectorAll('.checkbox[required]');

	Array.prototype.forEach.call(checkbox, function(el){

		var input = el.querySelector('input');

		input.addEventListener('change', function() {

			if(input.checked) {

				el.classList.remove('checkbox--error');

			}

		});

	});
*/
})(document.querySelector('.filter'));