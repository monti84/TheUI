TheUI.Modal = {
	GlobalSettings: {
		CloseOnBackDropClick: true,
		CloseOnEscape: false
	},

	Modals: [],

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
			let modalId = modalSummonerButton.getAttribute('data-modal_target_id');
			let ModalInstance = TheUI.Utils.SearchInArray(this.Modals, 'Id', modalId, true);
			console.log(modalId, ModalInstance);
			if (ModalInstance === false) {
				ModalInstance = {
					Id: modalId,
					Settings: this.GetSettings(modalId),
					SummonerButtons: new Array(modalSummonerButton),
					ModalElement: document.querySelector('*[data-modal_id="' + modalId + '"]')
				}
				
				this.Modals.push(ModalInstance);
				console.log(this.Modals);
			}

			else {
				let ButtonIndex = ModalInstance.SummonerButtons.indexOf(modalSummonerButton);
				if (ButtonIndex < 0) ModalInstance.SummonerButtons.push(modalSummonerButton);
			}

			modalSummonerButton.addEventListener('click', (event) => {
				this.OpenModal(modalId);
				event.preventDefault();
			  	event.stopPropagation;
			});
		});

		console.log(this.Modals);
	},

	GetModal(modalId) {
		let ModalInstance = TheUI.Utils.SearchInArray(this.Modals, 'Id', modalId, true);
		return ModalInstance;
	},

	OpenModal(modalId) {
		let backDrop = document.createElement('div');
		let ModalInstance = this.GetModal(modalId);
		let modalContainer = ModalInstance.ModalElement;

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
		let ModalButtons = ModalInstance.SummonerButtons;
		console.log(ModalButtons);
		ModalButtons.forEach((ModalButton) => {
			ModalButton.classList.add('modal-opened');
		});
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
		this.Modals.forEach((Modal) => {
			console.log(Modal);
			Modal.SummonerButtons.forEach((ModalButton) => {
				ModalButton.classList.remove('modal-opened');
			});
		});

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