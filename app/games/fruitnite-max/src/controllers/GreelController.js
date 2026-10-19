// ============================================================================
// Consolidated Parent (ReelController.js) and Child (GreelController.js)
// Base Class Definition & Implementation
// ============================================================================
class ReelController {
	constructor(argument) {
		// body...
	}

	setView(view) {
		this.view = view;
		this.model = coreApp.gameModel;
		this.createListeners();
	}

	createListeners(argument) {
		_mediator.subscribe("spinStart", this.onSpinClickHandler.bind(this));
		_mediator.subscribe("stopSpinNow", this.onStopSpinNowHandler.bind(this));
		_mediator.subscribe("stopSpin", this.onStopSpinHandler.bind(this));
		_mediator.subscribe("stopImmediatelySpin", this.onStopSpinImmediately.bind(this));
		_mediator.subscribe("showAlternateLineWins", this.onShowAlternateLineWins.bind(this));
		_mediator.subscribe("clearAllWins", this.onClearAllWins.bind(this));
		_mediator.subscribe("hideReelSymbols", this.hideReelSymbols.bind(this));
		_mediator.subscribe("showReelSymbols", this.showReelSymbols.bind(this));
		_mediator.subscribe("fadeAllSymbols", this.fadeAllSymbols.bind(this));
		_mediator.subscribe("addTintOnSymbols", this.addTintOnSymbols.bind(this));
		_mediator.subscribe("clearLineWins", this.onClearAllWins.bind(this));
		_mediator.subscribe("showSingleLine", this.onShowLineWinHandler.bind(this));
		_mediator.subscribe("FreeSpinsStarted", this.onFreeSpinsStarted.bind(this));
		_mediator.subscribe("unfinishedFreeSpins", this.onFreeSpinsStarted.bind(this));
		_mediator.subscribe("onFSEndShown", this.onFreeSpinsEnded.bind(this));
		_mediator.subscribe("allReelsStopped", this.onAllReelsStoppedHandler.bind(this));
		_mediator.subscribe("showWildMultiplier", this.onShowWildMultiplier.bind(this));
		_mediator.subscribe("createReelView", this.createReelView.bind(this));
		_mediator.subscribe("stopAnticipation", this.stopAnticipation.bind(this));
		this.createSpecificListeners();
	}

	createSpecificListeners() {}

	createReelView() {
		this.view.createView();
	}

	stopAnticipation() {
		this.view.stopAnticipation();
	}

	onShowWildMultiplier(multiplier) {
		this.view.showWildMultiplier(multiplier);
	}

	onAllReelsStoppedHandler() {
		this.view.onAllReelsStopped();
		this.view.clearReelSymbols();
	}

	addTintOnSymbols(dataObj) {
		this.view.addTintOnSymbols(dataObj);
	}

	onFreeSpinsStarted() {
		this.view.showFreespinGrid();
	}

	onFreeSpinsEnded() {
		this.view.hideFreespinGrid();
		// this.view.showRegularBg();
	}

	onShowLineWinHandler(lineNum, index) {
		// console.log(" reelcontroller ============== ");
		var cLine = coreApp.gameModel.spinData.getTotalLineWins()[index];
		this.view.fadeReelSymbols(cLine);
	}

	hideReelSymbols(array, type) {
		this.view.hideReelSymbols(array, type);
	}

	fadeAllSymbols(value) {
		this.view.fadeAllSymbols(value);
	}

	onShowAlternateLineWins(argument) {
		// body...
		this.view.fadeReels(0.5);
	}

	showReelSymbols() {
		this.view.clearReelSymbols();
	}

	onClearAllWins(argument) {
		// body...
		this.view.fadeReels(1);
		this.view.clearReelSymbols();
	}

	onSpinClickHandler(argument) {
		this.view.fadeReels(1);
		if (_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") {
			this.view.quickSpinStart();
		} else {
			this.view.startSpin();
		}
	}

	onStopSpinNowHandler(argument) {
		this.view.quickSpinStop();
	}

	onStopSpinHandler(argument) {
		// console.log("RC stop spin =========================>>_____________---------");
		// this.view.stopSpin(this.model.spinData.getReels());
		this.view.stopSpin("spinresponserecieved");
	}

	onStopSpinImmediately(argument) {
		this.view.stopImmediately(this.model.spinData.getReels());
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


// --- Consolidated Exports & Aliases ---
var GreelController = ReelController;

