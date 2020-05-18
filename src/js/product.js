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