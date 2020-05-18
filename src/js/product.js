
// images

((elems)=>{

	"use strict";

	if(!elems.length) {

		return;

	}

	var big = document.querySelectorAll('.product__images-big-item');

	Array.prototype.forEach.call(elems, (el, index) =>
		el.addEventListener('click', () =>
			Array.prototype.forEach.call(big, (e, i) =>
				e.classList.toggle('visuallyhidden', i !== index))));

})(document.querySelectorAll('.product__images-small-item'));



// description

((head)=>{

	"use strict";

	if(head.length) {

		Array.prototype.forEach.call(head, (btn) =>
			btn.addEventListener('click', () =>
				btn.classList.toggle('is-open')));

	}

})(document.querySelectorAll('.description__head'));
