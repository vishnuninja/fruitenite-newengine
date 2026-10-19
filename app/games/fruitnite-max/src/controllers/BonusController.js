class BonusController {
	constructor() {}

	setView(view) {
		this.view = view;
		this.createListeners();
	}

	createListeners(argument) {
		this.model = coreApp.gameModel;
		_mediator.subscribe(_events.core.onResize, this.onResize.bind(this));
		_mediator.subscribe("showBonusGame", this.onShowBonusGame.bind(this));
		_mediator.subscribe("onFeatureResponse", this.onFeatureResponse.bind(this));
		_mediator.subscribe("closeBonus", this.onCloseBonusRound.bind(this));
	}

	onCloseBonusRound() {
		this.view.onCloseBonusRound(this.model.getFeatureObject());
		var winAmount;
		if (_ng.GameConfig.changeFeatureWinAmountObj) {
			winAmount = this.model.getFeatureObject().current_round.win_amount ? { win: this.model.getFeatureObject().current_round.win_amount } : { win: "" };
		} else {
			winAmount = this.model.getFeatureObject().win_amount ? this.model.getFeatureObject().win_amount : "";
		}
		_mediator.publish(_events.slot.updateWin, winAmount);
		_mediator.publish(_events.slot.updateBalance);
	}

	onFeatureResponse() {
		try {
			this.view.onFeatureResponse(this.model.getFeatureObject());
		} catch (e) {}
	}

	onShowBonusGame() {
		try {
			this.view.showBonusGame(this.model.getFeatureObject());
		} catch (e) {}
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



