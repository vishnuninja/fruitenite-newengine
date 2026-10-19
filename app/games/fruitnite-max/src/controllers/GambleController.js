class GambleController {
	constructor(argument) {
		// body...
	}

	setView(view) {
		this.view = view;
		this.createListeners();
	}

	createListeners(argument) {
		_mediator.subscribe("SHOW_GAMBLE", this.onShowGamble.bind(this));
		_mediator.subscribe("HIDE_GAMBLE", this.onHideGamble.bind(this));
		_mediator.subscribe("onResize", this.onResize.bind(this));
		_mediator.subscribe("onGambleResponse", this.onGambleResponseHandler.bind(this));
	}

	onShowGamble() {
		this.view.show(); 
	}

	onHideGamble() {
		this.view.hide();
	}

	onGambleResponseHandler() {
		this.view.onGambleResponse();
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



