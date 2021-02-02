TheUI.Modal = {
	GlobalSettings: {
		CloseOnBackDropClick: true,
		CloseOnEscape: false
	},
	Init () {
		document.addEventListener("keydown", event => {
			if (event.code === 'Escape') {
				let openedModalId = this.GetOpenedModalID();
				if (openedModalId === '') return true; 
				let modalSettings = this.GetSettings(openedModalId);
				if (modalSettings.CloseOnEscape === true) this.CloseModal();
				event.preventDefault();
			  	event.stopPropagation;
			}
		});

		let modalSummonerButtons = document.querySelectorAll('*[data-modal_target_id]');		
		modalSummonerButtons.forEach((modalSummonerButton) => {
			modalSummonerButton.addEventListener('click', (event) => {
				let modalId = modalSummonerButton.getAttribute('data-modal_target_id')
				this.OpenModal(modalId);
				event.preventDefault();
			  	event.stopPropagation;
			});
		});
	},	

	OpenModal(modalId) {
		let backDrop = document.createElement('div');
		let modalContainer = document.querySelector('*[data-modal_id="' + modalId + '"]');
		if (modalContainer === null) { console.info('Modal window not found with the specified id: "' + modalId + '".'); return false; }
		let modalClone = modalContainer.cloneNode(true);
		let closeButtons = modalClone.querySelectorAll('.modal-close');
		let body = document.querySelector('body');
		let modalSettings = this.GetSettings(modalId);
		
		if (modalSettings.CloseOnBackDropClick === true) backDrop.addEventListener('click', (event) => { this.CloseModal(); });

		closeButtons.forEach((button) => {
			button.addEventListener('click', (event) => { this.CloseModal(modalId) });
		});

		let modalSummonerButtons = modalClone.querySelectorAll('*[data-modal_target_id]');		
		modalSummonerButtons.forEach((modalSummonerButton) => {
			modalSummonerButton.addEventListener('click', (event) => {
				let modalId = modalSummonerButton.getAttribute('data-modal_target_id');
				this.OpenModal(modalId);
			});
		});


		this.CloseModal();
		body.classList.add('modal-opened');
		modalClone.classList.add('modal-attached');
		backDrop.classList.add('modal-backdrop');
		backDrop.appendChild(modalClone);
		body.appendChild(backDrop);
	},

	GetSettings(id) {
		let modalContainer = document.querySelector('*[data-modal_id="' + id + '"]');
		let localSettingsString = modalContainer.getAttribute('data-modal_settings');
		let localSettings = {};
		let retSettings = {...this.GlobalSettings};
		try {
			localSettings = JSON.parse(localSettingsString);
			for (const [key, value] of Object.entries(localSettings)) {
				retSettings[key] = value;
			};
		}

		catch {
			return retSettings;
		}
		
		return retSettings;
	},

	CloseModal() {
		document.querySelector('body').classList.remove('modal-opened');
		let backDrop = document.querySelector('body > .modal-backdrop');
		if (backDrop) backDrop.remove(); 
	},

	GetOpenedModalID () {
		let ret = '';
		let backDrop = document.querySelector('body > .modal-backdrop');
		if (backDrop === null) return ret;
		let modalContainer = backDrop.querySelector('.modal-container');
		let modalId = modalContainer.getAttribute('data-modal_id')
		return modalId;
	}
}

window.addEventListener('load', (event) => {
	TheUI.Modal.Init();
});