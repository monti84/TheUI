TheUI.Accordion = {
	Init () {
		let accordions = document.querySelectorAll('.accordion-container');
		accordions.forEach((accordionContainer) => {
			accordionContainer.querySelector('.accordion-header .icon').addEventListener('click', (event) => {
				console.log(accordionContainer);
				accordionContainer.classList.toggle('opened');
			});		
		});
	},
}

window.addEventListener('load', (event) => {
	TheUI.Accordion.Init();
});