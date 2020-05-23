((filter)=>{

	"use strict";

	if(!filter){

		return;

	}

	let windowScroll = window.pageYOffset;

// show filter for mobile
	document.querySelector('.filter__btn-show').addEventListener('click', () => {

		windowScroll = window.pageYOffset;
		document.body.classList.add('filter-show');

	});

// hide filter for mobile
	document.querySelector('.filter__btn-show-result').addEventListener('click', () => {

		document.body.classList.remove('filter-show');
		window.scrollTo(0, windowScroll);

	});

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
			step = el.getAttribute('data-step'),
			start = el.getAttribute('data-start'),
			range = {
				'min': min,
				'max': max
			},
			input = el.querySelectorAll('.slider-range__input-control .input'),
			inputMin = el.querySelector('.slider-range__input-min'),
			inputMax = el.querySelector('.slider-range__input-max'),
			track = el.querySelector('.slider-range__track');

		step = step ? parseInt(step, 10) : 1;

		if(start) {

			start = start.split(',');
			start = start.map((el) => parseInt(el, 10));

		}
		else {

			start = [min, max];

		}

		noUiSlider.create(track, {
			step: step,
			start: start,
			connect: true,
			range: range
		});

		track.noUiSlider.on('slide', (values) => {

			inputMin.value = BERTAZZONI.sepNumber(parseInt(values[0], 10));
			inputMax.value = BERTAZZONI.sepNumber(parseInt(values[1], 10));

		});

		track.noUiSlider.on('change', (values) => {

			minInputHidden.value = parseInt(values[0], 10);
			maxInputHidden.value = parseInt(values[1], 10);

		});

		track.noUiSlider.on('end', () => PubSub.publish('filterFormChange'));

	// события в инпутах

		Array.prototype.forEach.call(input, (el) => {

			el.addEventListener('focus', () =>
				setTimeout(() => el.setSelectionRange(0,99),100));

			el.addEventListener('keyup', (e) => {

				if (e.keyCode == 13) {

					el.blur();
					e.preventDefault();

				}

			});

		});

		inputMin.addEventListener('blur', () => {

			var _min = parseInt(BERTAZZONI.strToNumber(inputMin.value), 10),
				_max = parseInt(BERTAZZONI.strToNumber(inputMax.value), 10);

			if (_min < min || isNaN(_min)) {

				_min = min;

			}

			if(_min > _max) {

				_min = _max - step;

			}

			minInputHidden.value = _min;
			inputMin.value = BERTAZZONI.sepNumber(_min);
			track.noUiSlider.set([_min, _max]);

		});

		inputMax.addEventListener('blur', () => {

			var _min = parseInt(BERTAZZONI.strToNumber(inputMin.value), 10),
				_max = parseInt(BERTAZZONI.strToNumber(inputMax.value), 10);

			if (_max > max || isNaN(_max)) {

				_max = max;

			}

			if(_max < _min) {

				_max = _min + step;

			}

			maxInputHidden.value = _max;
			inputMax.value = BERTAZZONI.sepNumber(_max);
			track.noUiSlider.set([_min, _max]);

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