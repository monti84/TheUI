TheUI.Overlay = {
	GlobalSettings: {
		CloseOnBackDropClick: true,
		CloseOnEscape: false
	},
	
	OpenedOverlays: [],
	
	Init () {
		let overlaySummonerButtons = document.querySelectorAll('*[data-overlay_target_id]');		
		overlaySummonerButtons.forEach((overlaySummonerButton) => {
			overlaySummonerButton.addEventListener('click', (event) => {
				let overlayId = overlaySummonerButton.getAttribute('data-overlay_target_id')
				this.OpenOverlay(overlayId, overlaySummonerButton);
				event.preventDefault();
				event.stopPropagation;
			});
		});
	},	

	OpenOverlay(overlayId, hostContainer) {
		console.log('OpenOverlay', overlayId);
		let overlayContainer = document.querySelector('*[data-overlay_id="' + overlayId + '"]');
		let overlaySummonerButtons = document.querySelectorAll('*[data-overlay_target_id="' + overlayId + '"]');
		if (overlayContainer === null) { console.info('Overlay window not found with the specified id: "' + overlayId + '".'); return false; }
		let closeButtons = overlayContainer.querySelectorAll('.overlay-close');
		let hostContainerGBCR = hostContainer.getBoundingClientRect();
		console.log(hostContainerGBCR);
		
		closeButtons.forEach((button) => {
			button.addEventListener('click', (event) => { this.CloseOverlays() });
		});

		let hostButtonTop = Number(hostContainerGBCR.top);
		let hostButtonLeft = Number(hostContainerGBCR.left);
		let hostButtonWidth = Number(hostContainerGBCR.width);
		let hostButtonHeight = Number(hostContainerGBCR.height);
		let documentScrollTop = Number(window.scrollY);
/*
		let tooltipWidth = Number(overlayViewportOffset.width);
		let tooltipHeight = Number(overlayViewportOffset.height);
*/
		overlayContainer.style.top = (hostButtonTop + hostButtonHeight + documentScrollTop) + 'px';
		overlayContainer.style.left = hostButtonLeft + 'px';
		
		overlaySummonerButtons.forEach((overlaySummonerButton) => {
			overlaySummonerButton.classList.add('overlay-opened');
		});
		overlayContainer.classList.add('opened');
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

	CloseOverlays() {
		let openedOverlayContainers = document.querySelectorAll('*[data-overlay_id].opened');
		openedOverlayContainers.forEach((openedOverlayContainer) => {
			let overlayId = openedOverlayContainer.getAttribute('data-overlay_id');
			let overlaySummonerButtons = document.querySelectorAll('*[data-overlay_target_id]');
			overlaySummonerButtons.forEach((overlaySummonerButton) => {
				overlaySummonerButton.classList.remove('overlay-opened');
			});
			openedOverlayContainer.classList.remove('opened');
		})
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
	TheUI.Overlay.Init();
});