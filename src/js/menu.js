(()=>{

	"use strict";

	// клик по гамбургеру

	document.addEventListener('click', (e) => {

		if(e.target.classList.contains('menu') || e.target.closest('.btn-menu-close')) {

			document.body.classList.remove('menu-show');

		}
		else if (e.target.closest('.btn-menu-open')) {

			document.body.classList.add('menu-show');

		}

	});

})();