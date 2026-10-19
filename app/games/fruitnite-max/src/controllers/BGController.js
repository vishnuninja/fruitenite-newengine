class BGController {
	constructor(argument) {
		// body...
	}

	setView(view) {
		this.view = view;
		this.createListeners();
	}

	createListeners() {
		_mediator.subscribe("unfinishedFreeSpins", this.onFreeSpinsStarted.bind(this));
		_mediator.subscribe("FreeSpinsStarted", this.onFreeSpinsStarted.bind(this));
		_mediator.subscribe("showFreespinBg", this.onShowFreespinBG.bind(this));
		_mediator.subscribe("onFSEndShown", this.onFreeSpinsEnded.bind(this));
		_mediator.subscribe(_events.core.onResize, this.onResize.bind(this));
	}

	onFreeSpinsStarted() {
		this.view.showFreespinBg();	
	}

	onShowFreespinBG() {
		this.view.showFreespinBg();	
	}

	onFreeSpinsEnded() {
		this.view.hideFreespinBg();	
		// this.view.showRegularBg();
	}

	onResize() {
		this.view.resize();
	}

	show() {
		this.view.show();
	}

	hide() {
		this.view.hide();
	}

	destroy() {
		this.view.destroy();
	}
}



