((videos) => {

	if(videos.length) {

		Array.prototype.forEach.call(videos, (video) => {

			var videoId = video.getAttribute('data-video-youtube');

			video.addEventListener('click', (e) => {

				e.preventDefault();

				if(!video.classList.contains('is-play')) {

					var iframe = document.createElement('iframe');

					iframe.setAttribute('allowfullscreen','allowfullscreen');
					iframe.setAttribute('allow', 'autoplay');

					iframe.src = 'https://www.youtube.com/embed/' + videoId + '?rel=0&showinfo=0&autoplay=1';

					video.appendChild(iframe);

					video.classList.add('is-play');

				}

			});

		});

	}

})(document.querySelectorAll('[data-video-youtube]'));