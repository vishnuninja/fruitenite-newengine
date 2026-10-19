class HistoryPanelController {
	constructor(argument) {}

	setView(view) {
		this.view = view;
		this.createListeners();
	}

	createListeners(argument) {
		_mediator.subscribe("SHOW_HISTORY_PANEL", this.onShowHistoryPanelHandler.bind(this, true));
		_mediator.subscribe("onShowHistoryPanel", this.onShowHistoryPanelHandler.bind(this, true));
		_mediator.subscribe("onHideHistoryPanel", this.onShowHistoryPanelHandler.bind(this, false));
		_mediator.subscribe(_events.core.onResize, this.onResize.bind(this));
	}

	onShowHistoryPanelHandler(bool) {
		if (typeof bool !== "boolean") bool = true;

		if (bool) {
			// Hide clock view
			coreApp.gameView.clockView.hide();

			// Hide other panels
			_mediator.publish("closeSettingsPanel");

			// Disable spin button
			_mediator.publish("DisablePanel");
			pixiLib.setInteraction(coreApp.gameView.panel.spinButton, false);
			pixiLib.setInteraction(coreApp.gameView.panel.autoSpinButton, false);

			// Show the history panel
			this.view.show();
		} else {
			// Show clock view
			coreApp.gameView.clockView.show();

			// Enable spin button
			_mediator.publish("EnablePanel");
			_mediator.publish("checkBalanceForBuyFeature");

			pixiLib.setInteraction(coreApp.gameView.panel.spinButton, true);
			pixiLib.setInteraction(coreApp.gameView.panel.autoSpinButton, true);

			// Hide the history panel
			this.view.hide();
		}
	}

	onResize(argument) {
		this.view.onResize();
	}

	show(argument) {
		this.view.show();
	}

	hide(argument) {
		this.view.hide();
	}

	destroy(argument) {
		this.view.destroy();
	}
}



