TheUI.Slider = {
	Init () {
		let sliderContainers = document.querySelectorAll('.slider-container');
		sliderContainers.forEach((sliderContainer) => {
			let prevButton = document.createElement("div");
			let nextButton = document.createElement("div");
			prevButton.classList.add('slider-prev');
			nextButton.classList.add('slider-next');
			let navigationContainer = document.createElement("div");
			prevButton.addEventListener('click', (event) => {
				this.SlideTo('prev', sliderContainer);
			});		
			nextButton.addEventListener('click', (event) => {
				this.SlideTo('next', sliderContainer);
			});
			sliderContainer.appendChild(prevButton);
			sliderContainer.appendChild(nextButton);
		});
	},
	
	SlideTo(IndexOrDirection, sliderContainer) {
		let currentIndex = 0;
		if (sliderContainer.querySelector('.slides').style.transform) currentIndex = parseInt(new RegExp(/translateX\((-)*(\d*)\%\)/ig).exec(sliderContainer.querySelector('.slides').style.transform)[2] / 100);
		let totalSlides = sliderContainer.querySelectorAll('.slides > .slide').length;
		if (currentIndex === null) currentIndex = 0;
		if (IndexOrDirection === 'prev') currentIndex--;
		if (IndexOrDirection === 'next') currentIndex++;
		if (typeof IndexOrDirection === "number") currentIndex = IndexOrDirection;
		if (currentIndex < 0) currentIndex = totalSlides - 1;
		if (currentIndex > (totalSlides - 1)) currentIndex = 0;
		let TranslateXValue = 'translateX(' + (currentIndex * -100) + '%)';
		sliderContainer.querySelector('.slides').style.transform = TranslateXValue;
	}
}

window.addEventListener('load', (event) => {
	TheUI.Slider.Init();
});