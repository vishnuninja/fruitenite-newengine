// ============================================================================
// Consolidated PanelController & Safe Fallback Dummy View for ExternalUI
// ============================================================================

function DummyPanelView() {
    this.name = "DummyPanelView";
    this.autoSpinStopButton = { visible: false };
    this.fakeButton = { visible: false };
    this.spinButton = { interactive: true, buttonMode: true };
    this.autoSpinButton = { interactive: true, buttonMode: true };
    this.betMaxButton = { interactive: true, buttonMode: true };
    this.balanceField = { children: [{}, {}, { text: "" }] };
    this.winField = { children: [{}, {}, { text: "" }] };
    this.coinValue = {
        currentIndex: 0,
        setMaxIndex: function() {},
        checkButtonState: function() {},
        getCurrentIndex: function() { return 0; }
    };
    this.lineValue = {
        currentIndex: 0,
        setMaxIndex: function() {},
        checkButtonState: function() {},
        getCurrentIndex: function() { return 0; }
    };
    this.BuyControl = (typeof PIXI !== "undefined" && PIXI.Container) ? new PIXI.Container() : {
        addChild: function() {},
        removeChild: function() {},
        position: { set: function() {} },
        scale: { set: function() {} },
        visible: true
    };
}

var dpv = DummyPanelView.prototype;
dpv.setVariables = function() {};
dpv.createView = function() {};
dpv.hideGambleButton = function() {};
dpv.updateAutoSpinBtnStates = function() {};
dpv.onCancelAutoSpin = function() {};
dpv.onHideAutoSpin = function() {};
dpv.onAutoSpinCountUpdate = function() {};
dpv.onAutoSpinStopClick = function() {};
dpv.hideSpinStop = function() {};
dpv.showSpinStop = function() {};
dpv.onStopSpinClicked = function() {};
dpv.hidePanel = function() {};
dpv.showPanel = function() {};
dpv.disablePanel = function() {};
dpv.enablePanel = function() {};
dpv.showGambleButton = function() {};
dpv.updateWin = function() {};
dpv.onResize = function() {};
dpv.checkMaxBetState = function() {};
dpv.setUpCoinValue = function() {};
dpv.setUpLineValue = function() {};
dpv.updateTotalBet = function() {};
dpv.updateBalance = function() {};
dpv.updateLines = function() {};
dpv.updateCoinValue = function() {};
dpv.onTotalBetUpdated = function() {};
dpv.updateHomeMenuParent = function() {};
dpv.onBetMaxClick = function() {
    if (typeof coreApp !== "undefined" && coreApp.gameModel && coreApp.gameModel.panelModel) {
        var coinArray = coreApp.gameModel.panelModel.coinArray;
        var maxIndex = coinArray ? coinArray.length - 1 : 0;
        coreApp.gameModel.panelModel.selectedCoinIndex = maxIndex;
        if (typeof _mediator !== "undefined") {
            _mediator.publish("coinValueUpdated", { index: maxIndex });
            _mediator.publish("totalBetUpdated");
        }
    }
};

// Aliases for legacy view references
PanelView = DummyPanelView;
PanelDesktopView = DummyPanelView;
PanelMobileView = DummyPanelView;
GPanelView = DummyPanelView;
GPanelDesktopView = DummyPanelView;
GPanelMobileView = DummyPanelView;

if (typeof window !== "undefined") {
    window.PanelView = DummyPanelView;
    window.PanelDesktopView = DummyPanelView;
    window.PanelMobileView = DummyPanelView;
    window.GPanelView = DummyPanelView;
    window.GPanelDesktopView = DummyPanelView;
    window.GPanelMobileView = DummyPanelView;
}

PanelController = function () {
    this.view = new DummyPanelView();
    this.popupDisplayIndex = 0;
};

if (typeof window !== "undefined") {
    window.PanelController = PanelController;
    window.GPanelController = PanelController;
}

if (typeof PanelDesktopController !== "undefined" && PanelDesktopController.prototype) {
    Object.setPrototypeOf(PanelDesktopController.prototype, PanelController.prototype);
}
if (typeof PanelMobileController !== "undefined" && PanelMobileController.prototype) {
    Object.setPrototypeOf(PanelMobileController.prototype, PanelController.prototype);
}

var pc = PanelController.prototype;

pc.addEvents = function(){
    this.popupDisplayIndex = 0;
    _mediator.subscribe(_events.core.onResize, this.onResize.bind(this));
    _mediator.subscribe(_events.core.gameCreationCompleted, this.setUpPanelValues.bind(this));
    _mediator.subscribe(_events.slot.coinValueUpdated, this.onCoinValueUpdated.bind(this));
    _mediator.subscribe(_events.slot.lineValueUpdated, this.onLineValueUpdated.bind(this));
    _mediator.subscribe(_events.slot.totalBetUpdated, this.onTotalBetUpdated.bind(this));
    _mediator.subscribe(_events.slot.updateBalance, this.updateBalance.bind(this));
    _mediator.subscribe("UPDATE_BALANCE_FROM_DATA", this.updateBalance.bind(this));
    _mediator.subscribe(_events.slot.updateWin, this.updateWin.bind(this));
    _mediator.subscribe("clearAllWins", this.onClearAllWins.bind(this));
    _mediator.subscribe("totalWinShownOnBigWinSettled", this.onTotalWinShownOnBigWinSettled.bind(this));
    _mediator.subscribe("showPanelWin", this.onTotalWinShown.bind(this));
    _mediator.subscribe("showFSWinOnPanel", this.showFSWinOnPanel.bind(this));
    _mediator.subscribe("onUpdateWinField", this.onUpdateWinField.bind(this));
    _mediator.subscribe("spinStart", this.onSpinStart.bind(this));
    _mediator.subscribe("hidePanel", this.onHidePanel.bind(this));
    _mediator.subscribe("showPanel", this.onShowPanel.bind(this));
    _mediator.subscribe("DisablePanel", this.onDisablePanel.bind(this));
    _mediator.subscribe("EnablePanel", this.onEnablePanel.bind(this));
    //show stop spin button 
    _mediator.subscribe("onSpinResponse", this.onSpinReceivedHandler.bind(this));
    _mediator.subscribe("cancelAutoSpin", this.onCancelAutoSpin.bind(this));
    _mediator.subscribe("allReelsStopped", this.onStopSpinHandler.bind(this));
    _mediator.subscribe("allReelsStarted", this.onAllReelsStarted.bind(this));
    _mediator.subscribe("UPDATE_AUTOSPIN_COUNT", this.onAutoSpinCountUpdate.bind(this));
    _mediator.subscribe("HIDE_AUTOSPIN_WINDOW", this.onHideAutoSpin.bind(this));
    _mediator.subscribe("updateAutoSpinBtnStates", this.updateAutoSpinBtnStates.bind(this));
    //hide gamble button
    _mediator.subscribe("hideGambleButtonOnClick", this.hideGambleButtonOnClick.bind(this));
    
    _mediator.subscribe("closeBonus", this.onCloseBonusRound.bind(this));
    _mediator.subscribe("spaceBarStopClicked", this.onStopSpinClicked.bind(this));
    _mediator.subscribe("showRealityCheckPopup", this.showRealityCheckPopup.bind(this));
    _mediator.subscribe(_events.core.error, function(){
        setTimeout(function(){
            _mediator.publish("cancelAutoSpin");
        }, 100);
    }.bind(this)); 
    _mediator.subscribe("updateTotalBet", this.updateTotalBet.bind(this));
    _mediator.subscribe("updateTwoxbet", this.updateTwoxbet.bind(this));

    this.slotModel = (typeof coreApp !== "undefined" && coreApp.gameModel) ? coreApp.gameModel : null;
    this.addExtraEvents();
};

pc.hideGambleButtonOnClick = function(){
    if (this.view && this.view.hideGambleButton) this.view.hideGambleButton();
};
pc.addExtraEvents = function(){};

pc.updateAutoSpinBtnStates = function(num){
    if (this.view && this.view.updateAutoSpinBtnStates) this.view.updateAutoSpinBtnStates(num);
};
pc.onCancelAutoSpin = function(){
    if (this.view && this.view.onCancelAutoSpin) this.view.onCancelAutoSpin();
};

pc.onCloseBonusRound = function () {
    this.updateBalance();
};

pc.onHideAutoSpin = function () {
    if (this.view && this.view.onHideAutoSpin) this.view.onHideAutoSpin();
};

pc.onAutoSpinCountUpdate = function (count) {
    if (count) {
        _ng.autoPlayPrevCount = count;
    }
    
    if (this.view && this.view.onAutoSpinCountUpdate) this.view.onAutoSpinCountUpdate(count);
    if (count == 0) {
        _ng.autoPlayBeforeFg = false;
        _ng.autoPlayPrevCount = 0;
        _mediator.publish("enableBuyFeature");
    }
    if (coreApp && coreApp.gameModel && coreApp.gameModel.isAutoSpinActive() == true) {
        _mediator.publish("showNewMessage", (typeof gameLiterals !== "undefined" ? gameLiterals.spinsleft_text : "Spins left") + " " + count);
    }
};

pc.showRealityCheckPopup = function () {
    if (this.view && this.view.onAutoSpinStopClick) this.view.onAutoSpinStopClick();
};

pc.onStopSpinHandler = function () {
    if (this.view && this.view.hideSpinStop) this.view.hideSpinStop();
};

pc.onAllReelsStarted = function () {
    this.isAllReelsStarted = true;
    if (this.stopSpinIsReadyToActivate) {
        if (!_ng.GameConfig.noStopSpin) {
            if (this.view && this.view.showSpinStop) this.view.showSpinStop();
        }
        this.stopSpinIsReadyToActivate = false;
    }
};

pc.onSpinReceivedHandler = function () {
    if (this.isAllReelsStarted) {
        if (!_ng.GameConfig.noStopSpin) {
            if (this.view && this.view.showSpinStop) this.view.showSpinStop();
        }
        this.isAllReelsStarted = false;
    } else {
        this.stopSpinIsReadyToActivate = true;
    }
};

pc.onStopSpinClicked = function(){    
    if (this.view && this.view.onStopSpinClicked) this.view.onStopSpinClicked();
};
pc.onHidePanel = function (argument) {
    if (this.view && this.view.hidePanel) this.view.hidePanel();
};
pc.onShowPanel = function (argument) {
    if (this.view && this.view.showPanel) this.view.showPanel();
};
pc.onDisablePanel = function (argument) {
    if (this.view && this.view.disablePanel) this.view.disablePanel();
};
pc.onEnablePanel = function () {
    if (this.view && this.view.enablePanel) this.view.enablePanel();

    if (coreApp && coreApp.gameModel && coreApp.gameModel.gambleData && coreApp.gameModel.gambleData.isGambleActive) {
        if (this.view && this.view.showGambleButton) this.view.showGambleButton();
    }
};

pc.onSpinStart = function (argument) {    
    _mediator.publish("closeQuickSpinInfo");
    _mediator.publish("killReelAniTweens");
    this.isAllReelsStarted = false;
    this.stopSpinIsReadyToActivate = false;
    if (this.view && this.view.disablePanel) this.view.disablePanel();
    if (this.view && this.view.hideGambleButton) this.view.hideGambleButton();    
};

pc.onTotalWinShown = function (){
    if (coreApp && coreApp.gameModel && (!coreApp.gameModel.isAutoSpinActive() || !coreApp.gameModel.isFullFSActive()) && !coreApp.gameModel.isBigWinActive()) {
        if (this.view && this.view.updateWin) this.view.updateWin(coreApp.gameModel.spinData.getTotalWinAmount());
    }
};

pc.showFSWinOnPanel = function(){
    if (coreApp && coreApp.gameModel && coreApp.gameModel.getTotalFSWin() > 0) {
        if (this.view && this.view.updateWin) this.view.updateWin(coreApp.gameModel.getTotalFSWin());
    }
};

pc.onTotalWinShownOnBigWinSettled = function (){
    if (this.view && this.view.updateWin && coreApp && coreApp.gameModel) {
        this.view.updateWin(coreApp.gameModel.spinData.getTotalWinAmount());
    }
};

pc.onUpdateWinField = function(amount){
    var amt = amount || (coreApp && coreApp.gameModel ? coreApp.gameModel.spinData.getTotalWinAmount() : 0);
    if (this.view && this.view.updateWin) this.view.updateWin(amt);    
};

pc.onClearAllWins = function () {
    if (this.view && this.view.updateWin) this.view.updateWin("");
};

pc.setView = function(view){
    this.view = view || new DummyPanelView();
};

pc.setVariables = function(coreApp){
    this.controller = coreApp ? coreApp.gameController : null;
};

pc.onResize = function(){
    if (this.view && this.view.onResize) this.view.onResize();
};

pc.onCoinValueUpdated = function(){};
pc.onLineValueUpdated = function(){};

pc.onTotalBetUpdated = function(){
    this.updateTotalBet();
    if (this.view && this.view.checkMaxBetState) this.view.checkMaxBetState();
    _mediator.publish("checkBalanceForBuyFeature");
};

pc.setUpPanelValues = function(){
    this.slotModel = (typeof coreApp !== "undefined" && coreApp.gameModel) ? coreApp.gameModel : (this.slotModel || {});
    this.setUpLineValue();    
    this.setUpCoinValue();
    this.updatePanelValues();
    if (coreApp && coreApp.gameView && coreApp.gameView.CPController && coreApp.gameView.CPController.view && coreApp.gameView.CPController.view.autoSpinStopButton) {
        coreApp.gameView.CPController.view.autoSpinStopButton.visible = false;
    }
};

pc.setUpCoinValue = function(){
    if (this.view && this.view.setUpCoinValue && this.slotModel && this.slotModel.getCoinIndex) {
        this.view.setUpCoinValue(this.slotModel.getCoinIndex(), this.slotModel.getCoinArray());
    }
};

pc.setUpLineValue = function(){
    if (this.view && this.view.setUpLineValue && this.slotModel && this.slotModel.getLineValue) {
        this.view.setUpLineValue(this.slotModel.getLineValue(), this.slotModel.getTotalPaylines());
    }
};

pc.updatePanelValues = function(){
    this.updateBalance();
    this.updateLines();
    this.updateCoinValue();
    this.onTotalBetUpdated();
};

pc.updateWin = function(data){
    var win = (data && (data.win != undefined)) ? data.win : (this.slotModel && this.slotModel.getTotalWin ? this.slotModel.getTotalWin() : 0);
    if (this.view && this.view.updateWin) this.view.updateWin(win);
};

pc.updateTotalBet = function(){
    var totalBet = (this.slotModel && this.slotModel.getTotalBet) ? this.slotModel.getTotalBet() : 0;
    var antebet = (coreApp && coreApp.gameModel && coreApp.gameModel.spinData && coreApp.gameModel.spinData.antebet) ? coreApp.gameModel.spinData.antebet : 1;
    var effectiveBet = (_ng.twoXBetEnabled === true) ? (totalBet * antebet) : totalBet;

    if (this.view && this.view.updateTotalBet) {
        this.view.updateTotalBet(effectiveBet);
    }
    _mediator.publish("updatePopupBet", effectiveBet);
    _mediator.publish("updateSetBet", effectiveBet);
    _mediator.publish("updateSelectorContainerBet", effectiveBet);
};

pc.updateTwoxbet = function(){
    this.updateTotalBet();
};

pc.updateBalance = function(balanceData){
    var balance = (Number(balanceData) > 0) ? balanceData : (this.slotModel && this.slotModel.getBalance ? this.slotModel.getBalance() : 0);
    if (this.view && this.view.updateBalance) {
        this.view.updateBalance(balance);
    }
};

pc.updateLines = function(lineNo){
    if (this.view && this.view.updateLines) this.view.updateLines(lineNo);
};

pc.updateCoinValue = function(){
    if (this.view && this.view.updateCoinValue) this.view.updateCoinValue();
};

// --- Consolidated Exports & Aliases ---
var GPanelController = PanelController;
if (typeof window !== "undefined") { window.GPanelController = PanelController; }
