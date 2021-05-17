((filter)=>{

	"use strict";

	if(!filter){

		return;

	}

// склонение
	const declension = (num, expressions) => {

		let r,
			count = num % 100;

		if (count > 4 && count < 21){

			r = expressions['2'];

		}
		else {

			count = count % 10;

			if (count == 1){
				r = expressions['0'];
			}
			else if (count > 1 && count < 5){
				r = expressions['1'];
			}
			else{
				r = expressions['2'];
			}

		}

		return r;

	}

	let windowScroll = window.pageYOffset;

// show filter for mobile
	document.querySelector('.filter__btn-show').addEventListener('click', () => {

		windowScroll = window.pageYOffset;
		document.body.classList.add('filter-show');

	});

// hide filter for mobile

	const btnShowResult = filter.querySelector('.filter__btn-show-result'),
		  expressions = btnShowResult.getAttribute('data-suf').split(',');

	btnShowResult.addEventListener('click', () => {

		if(BERTAZZONI.windowWidthOLd < 1200) {

			window.scrollTo(0, windowScroll);

		}
		else {

			if(BERTAZZONI.isInViewport(document.querySelector('.products'))){

				document.querySelector('.products').scrollIntoView();

			}

		}

		document.body.classList.remove('filter-show');

	});

// form reset
	filter.addEventListener('reset', () => PubSub.publish('filterFormReset'));

// form change
	filter.addEventListener('change', (e) => PubSub.publish('filterFormChange',e.target));

// form submit
/*	filter.addEventListener('submit', (e) => {

		e.preventDefault();

		filter.classList.add('is-loading');

		fetch(filter.getAttribute('action'), {
			method: 'POST',
			body: new FormData(filter)
		})
		.then(response => response.json())
		.then(result => {

			console.log(result);

			filter.classList.remove('is-loading');

		});

	});
*/
	// slider-range

	var sliderRange = document.querySelectorAll('.slider-range');

	if(sliderRange.length) {

		// загрузка скрипта

		var script = document.createElement('script');

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

		track.noUiSlider.on('end', () => PubSub.publish('filterFormChange', inputMin));

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

	PubSub.subscribe('filterFormReset', () => {

		btnReset.classList.add('hide');
		btnShowResult.classList.remove('is-show');

	});

	PubSub.subscribe('filterFormChange', (msg, target) => {

		btnReset.classList.remove('hide');

		console.log(target.parentNode);

		fetch(filter.getAttribute('action'), {
			method: 'POST',
			body: new FormData(filter)
		})
		.then(response => response.json())
		.then(result => {

			console.log(result);

			const count = parseInt(result.count);

			if(isFinite(count)) {

				var top = 0;

				if(target.classList.contains('checkbox__input') || target.parentNode.classList.contains('slider-range__input-control')) {

					top = target.parentNode.offsetTop;
					top -= (btnShowResult.clientHeight - target.parentNode.clientHeight) / 2;

				}

				btnShowResult.querySelector('b').textContent = count;
				btnShowResult.setAttribute('data-suf', declension(count, expressions));
				btnShowResult.style.top = top + 'px';
				btnShowResult.classList.add('is-show');

			}

		});

	});

})(document.querySelector('.filter'));