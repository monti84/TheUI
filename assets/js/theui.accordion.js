TheUI.Accordion = {
	Init () {
		let accordions = document.querySelectorAll('.accordion-container');
		accordions.forEach((accordionContainer) => {
			let button = accordionContainer.querySelector('.accordion-button')
			if (button === null) return true;
			button.addEventListener('click', (event) => {
				accordionContainer.classList.toggle('opened');
			});		
		});
	},
}

window.addEventListener('load', (event) => {
	TheUI.Accordion.Init();
});