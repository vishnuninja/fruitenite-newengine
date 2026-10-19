class PaylineController {
	constructor(argument) {}

	setView(view) {
		this.view = view;
		this.createListeners();
	}

	createListeners(argument) {
		_mediator.subscribe("showAllLines", this.onShowAllLines.bind(this));
		_mediator.subscribe("hideAllLines", this.onHideAllLines.bind(this));
		_mediator.subscribe("showSingleLine", this.onShowSingleLine.bind(this));
		_mediator.subscribe("showMultiLines", this.onShowMultiLines.bind(this));
		_mediator.subscribe("clearLineWins", this.onHideAllLines.bind(this));
		_mediator.subscribe(_events.core.secondaryAssetsLoaded, this.createpaylines.bind(this));
	}

	createpaylines() {
		this.view.createpaylines();
	}

	onShowAllLines(argument) {
		this.view.showAllLines();
	}

	onHideAllLines(argument) {
		this.view.hideAllLines();
	}

	onShowSingleLine(argument) {
		this.view.showSingleLine(argument);
	}

	onShowMultiLines(argument) {
		this.view.showMultiLines();
	}

	onResize(argument) {
		this.view.resize();
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



