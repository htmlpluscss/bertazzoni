((footer) => {

	if ('IntersectionObserver' in window) {

		var options = {
			root: null,
			rootMargin: '0px',
			threshold: [.1]
		};

		var callback = (entries, observer) =>
			Array.prototype.forEach.call(entries, (entry) =>
				document.body.classList.toggle('bg-footer', entry.intersectionRatio > 0.1));

		var observer = new IntersectionObserver(callback, options);

		observer.observe(footer);

	}

})(document.querySelector('.footer'));