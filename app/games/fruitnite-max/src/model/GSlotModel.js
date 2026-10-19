// ============================================================================
// ES6 Class Definition: SlotModel
// ============================================================================

class SlotModel {
    constructor() {
	//CoreModel.call(this, coreApp);
	this.userModel = new UserModel();
	this.panelModel = new PanelModel();
	this.settingsModel = new SettingsModel();
	this.autoSpinData = new AutoSpinModel();
	this.freeSpinData = new FreeSpinModel();
	this.PFSData = new PromoFreeSpinModel();
	this.gambleResultData = new CoinTossGambleModel();
	this.featureData = new FeatureModel();
	this.gambleData = new GambleModel();
	this.spinData = new SpinData(); //wins/matrix all other info about spin
	this.isRealityCheckActive = false;
	//walking wild 
	this.isWalkingWildAvailable = false;
	this.isBigWin = false;
	this.isError = false;
	//Sticky Re-spin Feature (Candy)
	//Storing Symbol Position to make them sticky in Winview
	this.stickyRSSymbols = [];
	this.amountType = coreApp.getUrlVar("amount_type") ? coreApp.getUrlVar("amount_type") : 1;
}

    saveInitData(obj) {
	this.obj = JSON.parse(obj);
	this.userModel.saveUserInfo(this.obj);
	this.panelModel.saveInitData(this.obj);
	this.spinData.saveInitData(this.obj);
	this.freeSpinData.saveInitData(this.obj);
	this.gambleData.saveInitData(this.obj);
	this.PFSData.saveInitData(this.obj);
	this.updatePanelModel();

}

    saveBalanceInfoSM(obj) {
	this.spinData.smBalance = obj.player.balance2 || 0;
}

    saveGambleResponse(obj) {
	this.obj = JSON.parse(obj);
	this.gambleData.saveGambleResponse(this.obj);
	this.spinData.saveGambleResponse(this.obj);
	this.userModel.saveUserInfo(this.obj);
	this.PFSData.saveSpinData(this.obj);
	this.updatePanelModel();
	//set balance 
	//set win amount 
}

    saveFeatureData(obj) {
	this.obj = JSON.parse(obj);
	this.userModel.saveUserInfo(this.obj);
	this.spinData.saveFeatureData(obj);
	this.PFSData.saveSpinData(this.obj);
	this.updatePanelModel();
}

    isBigWinActive() {
	if (!_viewInfoUtil.isSecondaryAssetsLoaded || _ng.isSkipBigwinActive == true) {
		return false;
	}
	return this.isBigWin;
}

    getBalance(argument) {
	return this.userModel.getBalance();
}

    setBalance(data) {
	this.userModel.setBalance(data);
}

    getCurrencyCode() {
	return this.userModel.getCurrencyCode();
}

    saveSpinData(obj) {
	this.obj = JSON.parse(obj);
	this.userModel.saveUserInfo(this.obj);
	this.panelModel.saveInitData(this.obj);
	// Apply PFS mock BEFORE spinData processes the matrix
	this.PFSData.saveSpinData(this.obj);
	this.spinData.saveSpinData(this.obj);
	this.freeSpinData.saveSpinData(this.obj);
	this.gambleData.saveSpinData(this.obj);
	this.updatePanelModel();
	//check is bigwin available 
	this.checkBigwinAvailable();

}

    checkBigwinAvailable() {
	if (this.getTotalWin() > 0) {
		if (_ng.GameConfig.specialWins.nice.multiplier * this.getTotalBet() <= this.getTotalWin()) {
			this.isBigWin = true;
		} else {
			this.isBigWin = false;
		}
	}
}

    getTotalFSWin() {
	return this.freeSpinData.getFreeSpinTotalWin();
}

    getAllTotalBet() {
	return this.panelModel.getAllTotalBet();
}

    setAllTotalBet(totalBet) {
	return this.panelModel.setAllTotalBet(totalBet);
}

    getAllTotalWin() {
	return this.spinData.getAllTotalWinAmount();
}

    getTotalWin() {
	return this.spinData.getTotalWinAmount();
}

    getReelMatrix() {
	return this.spinData.getReels();
}

    getPostMatrix() {
	return this.spinData.getPostMatrix();
}

    getTotalBet() {
	return this.panelModel.getTotalBet();
}

    getTotalBetPerLine() {
}

    getTotalWinLines(argument) {
	return this.spinData.getTotalLineWins();
}

    getTotalWinLinesNumbers(argument) {
	return this.spinData.getTotalWinLinesNumbers();
}

    getTotalWinSymbols(argument) {
	return this.spinData.getTotalWinSymbols();
}

    getPostMatrixInfo() {
	return this.spinData.getPostMatrixInfo();
}

    getMinimumLines(argument) {
	// body...
}

    getMinBet(argument) {
	// body...
}

    getMaxBet(argument) {
	// body...
}

    getBetValues(argument) {
	// body...
}

    setMaxBet(argument) {
	// body...
}

    isAutoSpinActive() {
	return this.autoSpinData.isActive();
}

    getAutoSpinCurrentCount() {
	return this.autoSpinData.getCurrentCount();
}

    setAutoSpinCurrentCount(num) {
	return this.autoSpinData.setCurrentCount(num);
}

    getAutoSpinTotalCount() {
	return this.autoSpinData.getTotalCount();
}

    startAutoSpins(num) {
	this.autoSpinData.startAutoSpin(num);
}

    stopAutoSpins() {
	this.autoSpinData.stopAutoSpin();
}

    getIsPFSTriggered() {
	return this.PFSData.isPFSTriggered;
}

    getIsPFSActive() {
	return this.PFSData.isPFSActive;
}

    getIsFullPFSActive() {
	return this.PFSData.isFullPFSActive;
}

    getIsPFSEnded() {
	return this.PFSData.isPFSEnded;
}

    updatePanelModel() {}

    updatePanelModelPFS() {
	if (coreApp.gameModel.getIsPFSActive()) {
		var PFSData = this.PFSData.getPFSData();
		this.panelModel.updatePanelModelWithPrevData(PFSData);
	}
	if(this.PFSData.previousData && !coreApp.gameModel.getIsPFSActive()){
        this.panelModel.updatePanelModelWithPrevData(this.PFSData.getPreviousInitData());
    }
}

    getTotalPFS() {
	return this.PFSData.totalPromoFreeSpins;
}

    getRemainingPFS() {
	return this.PFSData.remainingPromoFreeSpins;
}

    getTotalPFSWin() {
	return this.PFSData.totalPFSWins;
}

    isGambleActive() {
	return this.gambleData.isGambleInitActive;
}

    getIsFreeSpinTriggered() {
	return this.freeSpinData.getIsFreeSpinTriggered();
}

    setIsFreeSpinTriggered(bool) {
	this.freeSpinData.setIsFreeSpinTriggered(bool);
}

    getIsFreeSpinEnded() {
	return this.freeSpinData.getIsFreeSpinEnded();
}

    isFreeSpinActive() {
	return this.freeSpinData.isActive();
}

    setFreeSpinActiveStatus(bool) {
	this.isFreeSpinActive.setFreeSpinActiveStatus(bool);
}

    isFullFSActive() {
	return this.freeSpinData.isFullFSActive;
}

    getFreeSpinCurrentCount() {
	return this.freeSpinData.currentCount();
}

    setFreespinsCurrentCount(num) {
	this.freeSpinData.setFreespinsCurrentCount(num);
}

    getTotalFreeSpins(argument) {
	return this.freeSpinData.totalCount();
}

    getFreeSpinTotalCount() {
	return this.freeSpinData.totalCount();
}

    getTotalFSTriggered() {
	return this.freeSpinData.totalTriggeredCount();
}

    setFreespinsTotalCount(num) {
	this.freeSpinData.setFreespinsTotalCount(num);
}

    isWalkingWildActive() {
	return this.isWalkingWildAvailable;
}

    setWalkingWildActive(bool) {
	this.isWalkingWildAvailable = bool;
}

    isReSpinActive() {
	return this.spinData.getIsRespinActive();
}

    setReSpinActive(bool) {
	this.isReSpinActive = bool;
}

    isFeatureActive() {
	// return this.featureData.isActive();
	return this.spinData.getIsBonusTriggered();
}

    getFeatureObject() {
	return this.spinData.getFeatureObject();
}

    setFreespins(obj) {
	this.freeSpinData.setFreespins(obj);
}

    isFeatureData() {
	return this.spinData.getIsBonusTriggered();
}

    isUnityFeature() {
	return this.spinData.isUnityFeature;
}

    isGiantFeature() {
	return this.spinData.isGiantFeature;
}

    isStickyRespinTriggered() {
	return this.spinData.isStickyRespinTriggered;
}

    isStickyRespinActive() {
	return this.spinData.isStickyRespinActive;
}

    getStickyRSSymbols() {
	return this.spinData.stickyRSSymbols;
}

    isSpawningWildActive() {
	return this.spinData.getIsSpawningWildActive();
}

    isSpaceClick() {
	this.isSpaceClickActive = false;
}

    setSpaceClick(bool) {
	this.isBgSoundPlay = bool;
}

    isBgSound() {
	this.isBgSoundPlay = false;
}

    formatAmount(winAmount) {
	return winAmount.toFixed(2);
}

    getSelectedNumCoins() {
	return this.panelModel.getSelectedNumCoins();
}

    getSelectedCoinValue() {
	return this.panelModel.getCoinValue();
}

    getSelectedLines() {
	if (_ng.GameConfig.paylinesType === "fixed") {
		return _ng.GameConfig.paylines;
	}
	//return this.panelModel.numberPaylines;
	return this.panelModel.selectedPaylines;
}

    getSelectedLinesFS() {
	if (this.panelModel.fsPaylines) {
		return this.panelModel.fsPaylines;
	} else {
		this.getSelectedLines();
	}
}

    getCoinArray() {
	return this.panelModel.getCoinArray();
}

    getCoinIndex() {
	return this.panelModel.getCoinIndex();
}

    getCoinValue() {
	return this.panelModel.getCoinValue();
}

    getLineValue() {
	return this.panelModel.getLineValue();
}

    getTotalPaylines() {
	return this.panelModel.getTotalPaylines();
}

    getIsRespinTriggered() {
	return this.spinData.getIsRespinTriggered();
}

    setIsRespinTriggered(bool) {
	this.spinData.setIsRespinTriggered(bool);
}

    getRespinsTotal() {
	return this.spinData.getRespinsTotal();
}

    getRespinsLeft() {
	return this.spinData.getRespinsLeft();
}

    getWildMultiplier() {
	return this.spinData.getWildMultiplier();
}

    getFeatureParentType() {
	return this.spinData.getFeatureParentType();
}

    getStickySymbols(params) {
	return this.spinData.getStickySymbols();

}

}


var _ng = _ng || {};
_ng.SlotModel = SlotModel;
var _ng = _ng || {};
_ng.GSlotModel = SlotModel;



