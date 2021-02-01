TheUI.Modal = {
	GlobalSettings: {
		CloseOnBackDropClick: true
	},
	Init () {
		let modalContainers = document.querySelectorAll('.modal-container');
		let modalSummonerButtons = document.querySelectorAll('*[data-modal_target_id]');		
		modalSummonerButtons.forEach((modalSummonerButton) => {
			modalSummonerButton.addEventListener('click', (event) => {
				let modalId = modalSummonerButton.getAttribute('data-modal_target_id')
				this.OpenModal(modalId);
			});
		});
	},	

	OpenModal(id) {
		let backDrop = document.createElement('div');
		let modalContainer = document.querySelector('*[data-modal_id="' + id + '"]');
		if (modalContainer === null) { console.info('Modal window not found with the specified id: "' + id + '".'); return false; }
		let modalClone = modalContainer.cloneNode(true);
		let closeButton = modalClone.querySelector('.modal-close');
		let body = document.querySelector('body');
		let modalSettings = this.GetSettings(id);
		
		closeButton.addEventListener('click', (event) => { let backDrop = document.querySelector('body > .modal-backdrop'); if (backDrop) backDrop.remove(); });
		if (modalSettings.CloseOnBackDropClick === true) backDrop.addEventListener('click', (event) => { let backDrop = document.querySelector('body > .modal-backdrop'); if (backDrop) backDrop.remove(); });

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

	CloseModal(id) {
		document.querySelector('body').classList.remove('modal-opened');
	}
}

window.addEventListener('load', (event) => {
	TheUI.Modal.Init();
});