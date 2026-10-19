class AutoSpinModel {
	constructor(argument) {
		this.isAutoSpinActive = false;
		this.totalAutoSpins = 0;
		this.currentCount = 0;
		this.currentTotalWin = 0;
		this.currentTotalLoss = 0;
	}

	isActive() {
		return this.isAutoSpinActive;
	}

	getCurrentCount(argument) {
		return this.currentCount;
	}

	setCurrentCount(num) {
		this.currentCount = num;
	}

	getTotalCount() {
		return this.totalAutoSpins;
	}

	startAutoSpin(num) {
		this.isAutoSpinActive = true;
		this.totalAutoSpins = num;
		this.currentCount = 0;
		this.asLossLimitAmount = coreApp.gameModel.getBalance() - this.asLossLimitValue;
	}

	stopAutoSpin() {
		this.isAutoSpinActive = false;
		this.totalAutoSpins = 0;
		this.currentCount = 0;
	}

	setStopOnAnyWin(bool) {
		this.stopOnAnyWinActive = bool;
	}

	getIsStopOnAnyWin(bool) {
		return this.stopOnAnyWinActive;
	}

	setASWinLimit(bool, val) {
		this.winMultiplier = val;
		this.asWinLimitValue = val;
		this.isASWinLimitActive = bool;
	}

	getIsASWinLimitActive() {
		return this.isASWinLimitActive;
	}

	getIsASWinLimitValue() {
		return Number(this.asWinLimitValue).toFixed(2);
	}

	setASLossLimit(bool, val) {
		this.lossMultiplier = val;
		this.asLossLimitValue = val;
		this.isASLossLimitActive = bool;
	}

	getIsASLossLimitActive() {
		return this.isASLossLimitActive;
	}

	getIsASLossLimitValue() {	
		var val = this.asLossLimitAmount ? this.asLossLimitAmount : 0;
		return val.toFixed(2);
	}
}



