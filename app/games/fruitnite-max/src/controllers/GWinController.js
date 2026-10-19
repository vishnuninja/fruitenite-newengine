// ============================================================================
// Consolidated Parent (WinController.js) and Child (GWinController.js)
// Base Class Definition & Implementation
// ============================================================================
class WinController {
	constructor(argument) {
		if (_ng.GameConfig.isClusterWin) {
			this.onShowTotalWin = this.onShowTotalClusterWin.bind(this);
		}
	}

	setView(view) {
		this.view = view;
		this.createListeners();
	}

	createListeners(argument) {
		_mediator.subscribe("stopSpinNow", this.onStopSpinNowHandler.bind(this));
		_mediator.subscribe("showAlternateLineWins", this.onShowAlternateWins.bind(this));
		_mediator.subscribe("spinStart", this.onSpinStart.bind(this));
		_mediator.subscribe("clearAllWins", this.onClearAllwins.bind(this));
		_mediator.subscribe("allReelsStopped", this.onAllReelStopped.bind(this));
		_mediator.subscribe("playSpecialGameStateAnimation", this.createStickySymbols.bind(this));
		_mediator.subscribe("removeStickySymbols", this.removeStickySymbols.bind(this));
		_mediator.subscribe("playBonusSymbolAnimation", this.playBonusSymbolAnimation.bind(this));
		_mediator.subscribe("singleReelStop", this.onEachReelStop.bind(this));
		_mediator.subscribe("showSpawningWild", this.onShowSpawningWild.bind(this));
		_mediator.subscribe("showWalkingWild", this.onShowWalkingWild.bind(this));	
		_mediator.subscribe("showWildMultiplier", this.onShowWildMultiplier.bind(this));
		_mediator.subscribe("showStickySymbols", this.onShowStickySymbols.bind(this));	
		_mediator.subscribe("showTotalWin", this.onShowTotalWin.bind(this));
		_mediator.subscribe("updateWinViewConfigs", this.updateWinViewConfigs.bind(this));
		_mediator.subscribe(_events.core.onResize, this.onGameResize.bind(this));
		this.model = coreApp.gameModel;
		this.addExtraListeners();
	}

	onStopSpinNowHandler(argument) {
		this.view.stopSpinNow(this.model.spinData.getReels());
	}

	onGameResize() {
		this.view.onGameResize();
	}

	updateWinViewConfigs() {
		this.view.updateWinViewConfigs();
	}

	onShowTotalWin() {
		if (!_ng.GameConfig.noTotalWinSymbols) {
			this.view.CreateWinBg();
			setTimeout(
				function () {
					this.view.removeWinBg();
				}.bind(this),
				(_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") ? 500 : _ng.GameConfig.totalWinDuration
			);
		}
	}

	onShowTotalClusterWin() {
		this.view.showTotalClusterWin(coreApp.gameModel.spinData.getTotalLineWins());
	}

	onShowStickySymbols() {
		this.view.showStickySymobolsOnInit(this.model.getStickySymbols());
	}

	addExtraListeners() {
		_mediator.subscribe("unfinishedFreeSpins", this.onShowBonusGame.bind(this));
		_mediator.subscribe("FreeSpinsStarted", this.onShowBonusGame.bind(this));
	}

	onShowBonusGame() {
		_mediator.publish('showMultipler', 0);
	}

	onAllReelStopped() {
		this.view.removeBonusLand();
		this.view.onAllReelStopped();
	}

	playBonusSymbolAnimation(data) {
		this.view.playBonusSymbolAnimation(data);
	}

	onShowBigWin() {
		this.view.showBigWin(coreApp.gameModel.getTotalWin(), _ng.GameConfig.specialWins);
	}

	onEachReelStop(reelId) {
		this.view.showEachReelStopAction(reelId, coreApp.gameModel.getReelMatrix()[reelId]);
	}

	onWalkingWild() {
		this.view.showWalkingWild();
	}

	onShowSpawningWild(reelIdAry, state) {
		this.view.showSpawningWild(reelIdAry, state);
	}

	onShowWalkingWild(reelIdAry) {
		this.view.showWalkingWild(reelIdAry);
	}

	onShowWildMultiplier(multiplier) {
		this.view.showWildMultiplier(multiplier);
	}

	onSpinStart(argument) {
		this.view.stopSoundOnClick();
		this.view.onSpinStart(coreApp.gameModel.isFreeSpinActive());
		this.view.clearAllWins();
	}

	onClearAllwins(argument) {
		this.view.clearAllWins();
	}

	onShowAlternateWins(argument) {
		this.view.showAlternateLineWins(coreApp.gameModel.spinData.getTotalLineWins());
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

	onReelStop(argument) {}

	createStickySymbols(data) {
		if (data.type === "stickyRespin") {
			this.view.createStickySymbols(data);	
		}
	}

	removeStickySymbols() {
		this.view.removeStickySymbols();
	}
}


// --- Consolidated Exports & Aliases ---


