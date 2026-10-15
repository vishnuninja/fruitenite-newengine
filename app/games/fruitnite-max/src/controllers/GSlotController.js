// ============================================================================
// Consolidated Parent (CyprusSlotController.js) and Child (GSlotController.js)
// Base Class Definition & Implementation
// ============================================================================
var _ng = _ng || {};
_ng.SlotController = function () {
    _ng.CoreController.call(this, coreApp);
    this.gameStateAnimation = false;
    this.isUnfinishedStopped = false;
    this.isCallNextGameStateStopped = false;
    this.spaceBarEvent = "idle";
    this.isSpaceBarHeld = false;
    this.isWindowFocused = true;
    this.isGamePaused = false;      //To use when window is defocused.
    this.isPFSRunning = false;
    this.addEvents();
    this.addGameController();
    this.specialGameStateAnimationDelay = _ng.GameConfig.specialGameStateAnimationDelay || 1000;
}

_ng.SlotController.prototype = Object.create(_ng.CoreController.prototype);
_ng.SlotController.prototype.constructor = _ng.SlotController;

var p = _ng.SlotController.prototype;
var cc = _ng.CoreController.prototype;

p.waitForVueReady = function () {
    return new Promise(function (resolve) {
        function check() {
            if (window.vueReady) {
                window.vueReady.then(resolve);
            } else {
                setTimeout(check, 50);
            }
        }
        check();
    });
};

p.addGameController = function () { 
    this.waitForVueReady().then(function () {
        this.externalUiController = new _ng.ExternalUiController();
        _ng.externalUiController = this.externalUiController;
    })
}

p.setModel = function (model) {
    cc.setModel.call(this, model);
    this.panelModel = this.model.panelModel;
    this.userModel = this.model.userModel;
    this.settingsModel = this.model.settingsModel;
    
    _ng.quickSpinType = commonConfig.quickSpinType;
}
p.addEvents = function () {
    cc.addEvents.call(this);
    _mediator.subscribe("SHOW_LOG", this.onShowLog.bind(this));

    _mediator.subscribe("spinStart", this.onSpinClickHandler.bind(this));
    _mediator.subscribe("onSpinResponse", this.onSpinResponseHandler.bind(this));
    _mediator.subscribe("STOP_SPIN_NOW", this.onStopSpinHandler.bind(this));
    _mediator.subscribe("allReelsStopped", this.onAllReelStopped.bind(this));
    _mediator.subscribe("onTotalWinShown", this.onTotalWinShown.bind(this));
    _mediator.subscribe("onBigWinShown", this.onBigWinShown.bind(this));
    _mediator.subscribe("startFreeSpins", this.onStartFreespins.bind(this));
    _mediator.subscribe("onFSEndShown", this.onFSEndShown.bind(this));
    _mediator.subscribe("showFreeSpinEnded", function(){
        _mediator.publish("showFSWinOnPanel");
    });
    _mediator.subscribe("GAMBLE_END", this.onGambleEnd.bind(this));
    _mediator.subscribe("continueUnfinishedGame", this.onUnfinishGame.bind(this));

    _mediator.subscribe("AlternateLineWinShownOnce", this.onAlternateLineWinsShownOnce.bind(this));

    _mediator.subscribe("callNextGameState", this.callNextGameState.bind(this));
    _mediator.subscribe("specialGameStateAnimationCompleted", this.callNextGameState.bind(this));
    _mediator.subscribe("bonusSymbolAnimationCompleted", this.callNextGameState.bind(this));

    _mediator.subscribe("onGameCreated", this.onGameInit.bind(this));
    _mediator.subscribe("runGameInit", this.onGameInit.bind(this));

    _mediator.subscribe("SHOW_GAMBLE", this.onGambleShowHandler.bind(this));
    _mediator.subscribe("SHOW_GAMBLE", function(){
        _mediator.publish("setSpaceBarEvent", "idle");
    });
    _mediator.subscribe("totalBetUpdated", this.onTotalBetUpdate.bind(this));

    _mediator.subscribe(_events.slot.coinValueUpdated, this.onCoinValueUpdated.bind(this));
    _mediator.subscribe(_events.slot.lineValueUpdated, this.onLineValueUpdated.bind(this));

    _mediator.subscribe("START_AUTOSPIN", this.onStartAutoSpin.bind(this));
    //For Resetting Autospin data in Model
    _mediator.subscribe("stopAutoSpin", this.onStopAutoSpin.bind(this));
    //Hides Autostop button and count also from panel along with resetting autospin data in model
    _mediator.subscribe("cancelAutoSpin", this.onStopAutoSpin.bind(this));


    _mediator.subscribe("bonusGameEnded", this.onBonusGameEnd.bind(this));
    _mediator.subscribe("callPostMatrixAction", this.postMatrixCheck.bind(this));

    //_mediator.subscribe("onFeatureResponse", this.onFeatureResponse.bind(this));

    _mediator.subscribe("spinClick", this.onSpinClick.bind(this));
    _mediator.subscribe("reloadGame", this.reloadGame.bind(this));
    _mediator.subscribe("unfinishedFreeSpins", this.onUnfinishedFreeSpins.bind(this));


    //autospin events 
    _mediator.subscribe("AS_StopOnAnyWin", this.onStopOnAnyWinSelection.bind(this));
    _mediator.subscribe("AS_StopOnWinLimit", this.onStopOnWinLimitSelection.bind(this));
    _mediator.subscribe("AS_StopOnLossLimit", this.onStopOnLossLimitSelection.bind(this));

    _mediator.subscribe("hidePanel", this.onHidePanel.bind(this));
    _mediator.subscribe("showPanel", this.onShowPanel.bind(this));
    _mediator.subscribe("hideReelView", this.onHideReelView.bind(this));
    _mediator.subscribe("showReelView", this.onShowReelView.bind(this));
    _mediator.subscribe("hideWinView", this.onHideWinView.bind(this));
    _mediator.subscribe("showWinView", this.onShowWinView.bind(this));
    _mediator.subscribe("hideMainContainer", this.onHideMainContainer.bind(this));
    _mediator.subscribe("showMainContainer", this.onShowMainContainer.bind(this));
    _mediator.subscribe("hideClockView", this.onHideClockView.bind(this));
    _mediator.subscribe("showClockView", this.onShowClockView.bind(this));

    // _mediator.subscribe("hidePromoView", this.onHidePromoView.bind(this));    /*FOR PROMO TOP STRIP VIEW*/
    // _mediator.subscribe("showPromoView", this.onShowPromoView.bind(this));    /*FOR PROMO TOP STRIP VIEW*/
    // _mediator.subscribe("destroyPromoView", this.onDestroyPromoView.bind(this));    /*FOR PROMO TOP STRIP VIEW*/

    _mediator.subscribe("hideGameTitle", this.onHideGameTitle.bind(this));
    _mediator.subscribe("showGameTitle", this.onShowGameTitle.bind(this));
    _mediator.subscribe("hidePopupContainer", this.onHidePopupContainer.bind(this));
    _mediator.subscribe("showPopupContainer", this.onShowPopupContainer.bind(this));

    _mediator.subscribe("continueInitGame", this.continueAfterGameUnfinishAnimations.bind(this));

    _mediator.subscribe("hideNotificationWindow", this.onHideNotificationWindow.bind(this));
    _mediator.subscribe("showNotificationWindow", this.onShowNotificationWindow.bind(this));

    
    //override changeReelView function to publish required things. removeReelView, updateReelConfig, createReelView, repositionReelView
    _mediator.subscribe("changeReelView", this.changeReelView.bind(this));
    //function to call repositionReelView of slotView.
    _mediator.subscribe("repositionReelView", this.repositionReelView.bind(this));
    //Remove all the children of ReelView.
    _mediator.subscribe("removeReelView", this.removeReelView.bind(this));
    _mediator.subscribe("updateReelViewUiConfig", this.updateReelViewUiConfig.bind(this));
    _mediator.subscribe("updateSpinDataReels", this.updateSpinDataReels.bind(this));
    _mediator.subscribe("updateReelSymbolConfig", this.updateReelSymbolConfig.bind(this));

    _mediator.subscribe(_events.core.secondaryAssetsLoaded, function () {
        if (this.isUnfinishedStopped) {
            this.isUnfinishedStopped = false;
            _mediator.publish("hideNotificationWindow");
            setTimeout(function () {
                this.onUnfinishGame();
            }.bind(this), 400);
        }
        if (this.isCallNextGameStateStopped) {
            this.isCallNextGameStateStopped = false;
            _mediator.publish("hideNotificationWindow");
            setTimeout(function () {
                this.callNextGameState();
            }.bind(this), 400);
        }
    }.bind(this));
    _mediator.subscribe("setSpaceBarEvent", function (event) {
        this.spaceBarEvent = event;
    }.bind(this));
    window.addEventListener("keyup", this.dealWithKeyboard.bind(this), false);
    window.addEventListener("keypress", this.deakWithSpaceBarHolding.bind(this), false);

    _mediator.subscribe("introScreenHidden", function(){
        setTimeout(function(){
            this.view.callGameinit();
        }.bind(this), 100);
    }.bind(this));
    _mediator.subscribe("windowFocusChanged", function(bool){
        this.isWindowFocused = bool

        _mediator.publish("SHOW_LOG", "winfocuschange "+bool);
        if(bool){
            _sndLib.focusSoundOn();
        }else{
            _sndLib.focusSoundOff();
        }


        if(bool && this.isGamePaused){
            this.isGamePaused = false;
            this.callNextGameState();
        }
    }.bind(this))
    _mediator.subscribe(_events.core.error, function () {
        this.model.isError = true;
    }.bind(this));
    _mediator.subscribe("errorClose", function (data) {
        this.model.isError = false;
        //if reels are not stopped then only enable return true 
        if(!this.allReelsStopped){
            this.errorContinueClicked = true;
        }
        //clear line wins after error 
        this.model.spinData.totalLineWins = [];
        if(data.event){
            _mediator.publish(data.event);
        }else{
            this.callNextGameState();
        }
    }.bind(this));
    // _mediator.subscribe("closeBonus", function(){
    // //To be rechecked later. 
    // //callNextGameState should be called always from here.
    // // if(this.model.getIsFullPFSActive()){
    // //     // this.callNextGameState();
    // //     setTimeout(function(){
    // //         this.callNextGameState();
    // //     }, 100);
    // // }
    // })
    _mediator.subscribe("hideMainGame", function(){
        _mediator.publish("hidePanel", {noEffect: true});
        _mediator.publish("hideMainContainer", {noEffect: true});
        _mediator.publish("hideClockView", {noEffect: true});
        _mediator.publish("hideGameTitle", {noEffect: true});
    }.bind(this));
    _mediator.subscribe("showMainGame", function(){
        _mediator.publish("showPanel");
        _mediator.publish("showMainContainer");
        _mediator.publish("showClockView");
        _mediator.publish("showGameTitle");
    }.bind(this));
    _mediator.subscribe("openURL", function(data){
        this.openURL(data.type, data.url);
    }.bind(this));
    this.addSpecificEvents();
};


p.onGambleShowHandler = function (){
    _mediator.publish("clearAllWins");
    _mediator.publish("hideGambleButtonOnClick");
    coreApp.gameModel.gambleData.isGambleActive = false;
    this.model.spinData.totalLineWins = [];
}

p.onShowLog =  function(text){
    //this.view.logTxt.visible = true;
    //this.view.logTxt.text +="\n"+ text;
}
p.openURL = function(type, url){
    if(url){
        window.location.href = url;
    }else{
        switch(type){
            case "lobby": 
                window.location.href = _ng.GameConfig.urls.lobbyURL;
            break;
            case "deposit":
                window.location.href = _ng.GameConfig.urls.depositURL;
            break;
        }
    }
}
p.removeReelView = function(){
    this.view.removeReelView();
}
p.changeReelView = function(){}
p.addSpecificEvents = function () {}
p.updateReelViewUiConfig = function(data){
    this.view.updateReelViewUiConfig(data);
}
p.updateReelSymbolConfig = function(data){
    this.view.updateReelSymbolConfig(data);
}
p.repositionReelView = function(){
    this.view.repositionReelView();
}
p.updateSpinDataReels = function(data){
    this.model.spinData.updateReels(data);
}
p.dealWithKeyboard = function (e) {
    if(e.key === "Escape"){
        _mediator.publish("hideBigWin_click");
        return;
    }
    if (e.keyCode === 32) {
        if (this.checkForSpaceEvent()) {
            _mediator.publish(this.spaceBarEvent);
            _mediator.publish("setSpaceBarEvent", "idle");
        }
    }
    this.isSpaceBarHeld = false;
    if(this.heldSpaceBarTimer){
        clearTimeout(this.heldSpaceBarTimer);
    }
};
p.fireSpaceBarHoldEvent = function(){
    if(this.checkForSpaceEvent() && this.isSpaceBarHeld){
        _mediator.publish(this.spaceBarEvent);
        _mediator.publish("setSpaceBarEvent", "idle");
    }
    this.heldSpaceBarTimer = setTimeout(function(){
        this.fireSpaceBarHoldEvent();
    }.bind(this), 500);
}
p.deakWithSpaceBarHolding = function(e){
    if(e.keyCode === 32 && !this.isSpaceBarHeld){
        this.isSpaceBarHeld = true;
        this.heldSpaceBarTimer = setTimeout(function(){
            this.fireSpaceBarHoldEvent();
        }.bind(this), _ng.GameConfig.spaceBarHoldTimeout);
    }
}
p.checkForSpaceEvent = function () {
    if (this.spaceBarEvent === "idle" || !_ng.isSpaceClickToSpinActive || coreApp.gameModel.isRealityCheckActive || this.model.isError) {
        return false;
    }
    return true;
}
p.onHideNotificationWindow = function () {
    this.view.hideNotificationWindow();
}
p.onShowNotificationWindow = function (options) {
    this.view.showNotificationWindow(options);
}
p.onStopOnAnyWinSelection = function (bool) {
    this.model.autoSpinData.setStopOnAnyWin(bool);
}
p.onStopOnWinLimitSelection = function (bool, val) {
    // console.log("isStopOnWInlimit selected", bool, val);
    // var winLimit = val*this.model.getTotalBet()+this.model.getBalance();
    // console.log("win limit set : ", winLimit);
    this.model.autoSpinData.setASWinLimit(bool, val);
}
p.onStopOnLossLimitSelection = function (bool, val) {
    // console.log("isStopOnLoss selected", bool, val);
    // var lossLimit = this.model.getBalance()- (val*this.model.getTotalBet());
    // console.log("loss limit set : ", lossLimit);

    this.model.autoSpinData.setASLossLimit(bool, val);
}

p.onSpinClick = function (argument) {
    _mediator.publish("closeSettingsPanel");
    _mediator.publish("onHidePaytable");
    // if (this.model.getBalance() < this.model.getTotalBet()) {
    //     _mediator.publish(_events.core.error, { code: "INSUF_BALL_001" });
    //     return;
    // }
    _mediator.publish("setSpaceBarEvent", "idle");
    _mediator.publish("spinStart");
    _mediator.publish("callSpinRequest");
};
p.onHidePopupContainer = function(){
    this.view.onHidePopupContainer();
}
p.onShowPopupContainer = function(){
    this.view.onShowPopupContainer();
}
p.onHidePanel = function (data) {
    this.view.onHidePanel(data);
}
p.onShowPanel = function () {
    this.view.onShowPanel();
}
p.onHideReelView = function (data) {
    this.view.onHideReelView(data);
}
p.onShowReelView = function () {
    this.view.onShowReelView();
}
p.onHideWinView = function (data) {
    this.view.onHideWinView(data);
}
p.onShowWinView = function () {
    this.view.onShowWinView();
}
p.onHideMainContainer = function(data){
    this.view.onHideMainContainer(data);
}
p.onShowMainContainer = function(){
    this.view.onShowMainContainer();
}
p.onHideClockView = function(data){
    this.view.onHideClockView(data);
}
p.onShowClockView = function(){
    this.view.onShowClockView();
}
p.onHidePromoView = function(){
    this.view.onHidePromoView();
}
p.onShowPromoView = function(){
    this.view.onShowPromoView();
}
p.onDestroyPromoView = function(){
    this.view.onDestroyPromoView();
}
p.onHideGameTitle = function(data){
    this.view.onHideGameTitle(data);
}
p.onShowGameTitle = function(){
    this.view.onShowGameTitle();
}
p.onStopSpinHandler = function () {
    clearTimeout(this.stopSpinTimeout);
    _mediator.publish("stopSpinNow");
}

p.onBonusGameEnd = function () {
    var totalBonusWin = this.model.getFeatureObject().current_round.win_amount;
    // _mediator.publish("SHOW_TICKER");
    // _mediator.publish("SHOW_TICKER_MESSAGE", pixiLib.getLiteralText("Total bonus won") + ": " + totalBonusWin);
    _mediator.publish("onUpdateWinField", totalBonusWin);
    if(this.model.getIsFullPFSActive()){
        //Setting feature triggered false manually.
        //For bonus round which don't result in freespins
        //Leprechaun's Loot Wheel Bonus
        coreApp.gameModel.spinData.setIsBonusTriggered(false);
        setTimeout(function(){
            this.callNextGameState();
        }.bind(this), 1000);
        return;
    }
    // Don't enable panel if PFS ended
    if (!this.model.getIsPFSEnded || !this.model.getIsPFSEnded()) {
        _mediator.publish("EnablePanel");
        _mediator.publish("setSpaceBarEvent", "spinClick");
    }
}

p.onStartAutoSpin = function (count) {
    // console.log(" autospin started ", count);
    this.model.startAutoSpins(count);
    this.requestSpin(false);
    this.updateAutoSpinCount();
}
p.onStopAutoSpin = function (count) {
    // console.log(" autospin started ", count);
    this.model.stopAutoSpins();
}


p.updateAutoSpinCount = function () {
    var count = this.model.getAutoSpinCurrentCount() + 1;
    // console.log(count, "========count ");

    this.model.setAutoSpinCurrentCount(count);
    var asCount = this.model.getAutoSpinTotalCount() - this.model.getAutoSpinCurrentCount();
    _mediator.publish("UPDATE_AUTOSPIN_COUNT", asCount);
    if (count == this.model.getAutoSpinTotalCount()) {
        // this.model.stopAutoSpins();
        _mediator.publish('cancelAutoSpin');
    }
}

p.onTotalBetUpdate = function () {
    _mediator.publish("HIDE_AUTOSPIN_WINDOW");
    _mediator.publish("clearAllWins");
};
p.onSpinResponseHandler = function () {
    //console.log("===============spin response received ");

    //show stop spin button
    //_mediator.publish();

    //stop spin after some delay
    if(_ng.isQuickSpinActive && _ng.quickSpinType==="turbo"){
        this.onStopSpinHandler();
    }else if (_ng.isQuickSpinActive) {
        setTimeout(this.onStopSpinHandler.bind(this), _ng.GameConfig.quickSpinIntervel ? _ng.GameConfig.quickSpinIntervel : 300);
    } else {
        this.stopSpinTimeout = setTimeout(this.stopReels.bind(this), _ng.GameConfig.ReelViewUiConfig.data.reelSpinConfig.reelStopAfterResponseDelay);
    }
    this.onSpecificSpinResponseHandler();
}
p.onSpecificSpinResponseHandler = function () {
}
p.stopReels = function () {
    clearTimeout(this.stopSpinTimeout);
    _mediator.publish("stopSpin");
}
p.onGameInit = function (argument) {
    // console.log(" =====game init response received in slot controller ",this.model.isFreeSpinActive());
    if(this.model.getIsPFSActive() && !this.isPFSRunning && !this.model.isFreeSpinActive()){
        this.isPFSRunning = true;
        _mediator.publish("DisablePanel");
        //Setting this true forcibly.
        this.allReelsStopped = true;
        this.model.updatePanelModel();

        if(this.model.getTotalPFS() == this.model.getRemainingPFS()){
            _mediator.publish("promoFreeSpinAwarded");
            // _mediator.publish("startDateTimer"); 
        }else{
            _mediator.publish("unfinishedPromoFreeSpin");
        }
        return;
    }

    //direct show
    if (this.model.spinData.isSpawningWild) {
        _mediator.publish("showSpawningWild", this.model.spinData.spawningWildReelNum, "initState");
        _mediator.publish("DisablePanel");
        this.model.spinData.isSpawningWild = false;
        return;
    }

    if (this.model.spinData.getIsStickyTriggered()) {
        _mediator.publish("showStickySymbols", "initState");
        this.model.spinData.setIsStickyTriggered(false);
        return;
    }

    if(this.model.spinData.isGameUnfinishedAnimActive){
        _mediator.publish("DisablePanel");
        _mediator.publish("setSpaceBarEvent", "idle");
        this.showGameUnfinishAnimations();
        return;
    }


    // //todo check bonus game/
    if (this.model.isFreeSpinActive() || this.model.isReSpinActive() || this.model.isStickyRespinTriggered() || this.model.isStickyRespinActive() || this.model.isFeatureActive() || this.model.isGambleActive()) {
        //show unfinished game popup 
        _mediator.publish("DisablePanel");
        var unfinishedText = (_ng.GameConfig.unfinishedPopupText) ? _ng.GameConfig.unfinishedPopupText : "You have Unfinished Game!";
        _mediator.publish("showErrorMsg", unfinishedText, "continueUnfinishedGame", true);
        // _mediator.publish("setSpaceBarEvent", "continueUnfinishedGame");
        return;
    }


    if(this.isPFSRunning){
        this.callNextGameState();
        return;
    }
    // Don't enable panel if PFS ended
    if (!this.model.getIsPFSEnded || !this.model.getIsPFSEnded()) {
        _mediator.publish("EnablePanel");
        _mediator.publish("setSpaceBarEvent", "spinClick");
    }
}
p.showGameUnfinishAnimations = function (){ this.callNextGameState(); }
p.continueAfterGameUnfinishAnimations = function (){
    if (this.model.isFreeSpinActive() || this.model.isReSpinActive() || this.model.isStickyRespinTriggered() || this.model.isStickyRespinActive() || this.model.isFeatureActive() || this.model.isGambleActive()) {
        _mediator.publish("DisablePanel");
        var unfinishedText = (_ng.GameConfig.unfinishedPopupText) ? _ng.GameConfig.unfinishedPopupText : "You have Unfinished Game!";
        _mediator.publish("showErrorMsg", unfinishedText, "continueUnfinishedGame", true);
        return;
    }

    if(this.isPFSRunning){
        this.callNextGameState();
        return;
    }
    // Don't enable panel if PFS ended
    if (!this.model.getIsPFSEnded || !this.model.getIsPFSEnded()) {
        _mediator.publish("EnablePanel");
        _mediator.publish("setSpaceBarEvent", "spinClick");
    }
};
p.showNotification = function () {
    //use function to add extra condition when required to load
    //all secondary assets before any feature game/Freespin
    return false;
}
p.onUnfinishGame = function () {
    _mediator.publish("DisablePanel");
    if (this.showNotification() && !_viewInfoUtil.isSecondaryAssetsLoaded) {
        this.isUnfinishedStopped = true;
        _mediator.publish("showNotificationWindow", { alpha: 0.85 });
        return;
    }
    if (this.model.spinData.isBonusFreatureMSG && this.model.spinData.bonusFreatureMSGType != "200bets") {
        _mediator.publish("showFeatureAwardedMSG", this.model.spinData.bonusFreatureMSGType);
        return;
    }
    if (this.model.isFreeSpinActive()) {
        _mediator.publish("SHOW_TICKER");
        var leftValue = (this.model.getTotalFreeSpins() - this.model.getFreeSpinCurrentCount()) + 1;
        _mediator.publish("SHOW_TICKER_MESSAGE", pixiLib.getLiteralText("Free spins") + ": " + leftValue + "/" + this.model.getTotalFreeSpins());
        _mediator.publish("unfinishedFreeSpins");

        // if (this.model.spinData.isProgressbarActive) {
        //     _mediator.publish("updateProgressBar", this.model.spinData.bar_value, this.model.spinData.current_level);
        //     return;
        // }
    }

    if (this.model.getFeatureParentType() === "freespins" || this.model.getFeatureParentType() === "freespin") {
        _mediator.publish("unfinishedFreeSpins");
    }
    
    this.onSpecificUnfinishGame();
}


p.onSpecificUnfinishGame = function () {
    this.callNextGameState();
}
p.onUnfinishedFreeSpins = function () {
    _sndLib.playBg(_sndLib.sprite.bgFS);
}

p.onFSEndShown = function (argument) {
    this.model.freeSpinData.setFullFSActiveStatus(false);
    this.model.freeSpinData.setFreeSpinEnded(false);
    _sndLib.playBg(_sndLib.sprite.bg);

    if (this.model.spinData.postFeatureActivity == true) {
        this.postFreespinsActivity();
    }
    //To be rechecked later. 
    //callNextGameState should be called always from here.
    if(this.model.getIsPFSActive()){
        this.callNextGameState();
    }else{
        //Added extra Check to support previous games.
        //All Freespins should publish callNextGameState here
        //Enabling/Disabling or any feature trigger will be taken care in callNextGameState
        if(_ng.GameConfig.callNextGameStateAfterFreespins){
            _mediator.publish("callNextGameState");
        }else{
            if (this.model.obj.next_round.type) {
                _mediator.publish("DisablePanel");
            }else{
                _mediator.publish("EnablePanel");
                _mediator.publish("setSpaceBarEvent", "spinClick");
            }
        }
    }
}
p.onStartFreespins = function (delay) {
    this.model.setIsFreeSpinTriggered(false);
    _sndLib.playBg(_sndLib.sprite.bgFS);
    _mediator.publish("FreeSpinsStarted");
    if(delay !== undefined){
        setTimeout(this.callNextGameState.bind(this), delay);
    }else{
        setTimeout(this.callNextGameState.bind(this), 200);
    }
}
p.requestSpin = function (isFree, isReSpin) {
    if(this.model.isError){ return; }

    _mediator.publish("setSpaceBarEvent", "idle");
    if (isFree) {
        _mediator.publish("callFreeSpinRequest");
        _mediator.publish("spinStart", true);
    } else if (isReSpin == "callReSpinRequest") {
        _mediator.publish("spinStart", true);
        _mediator.publish("callReSpinRequest");
    } else {
        _mediator.publish("spinStart", false);
        _mediator.publish("callSpinRequest");
    }
}
p.checkFeatureAssets = function (feature) {
    if (!_viewInfoUtil.isSecondaryAssetsLoaded && _ng.GameConfig.featuresWithSecondaryAssets.indexOf(feature) > -1) {
        this.isCallNextGameStateStopped = true;
        _mediator.publish("showNotificationWindow", { alpha: 0.85 });
        return true;
    }
    return false;
}
p.callGameActivity = function(){
    
}
p.callNextGameState = function () {
    if(this.model.isError){ return; }

    if(this.model.isGambleActive()){
        _mediator.publish("SHOW_GAMBLE");
        this.model.gambleData.isGambleInitActive = false;
        this.model.spinData.totalLineWins = [];
        return;
    }



    if(!this.isWindowFocused){
        console.log("Stopping game: ", this.isWindowFocused);
        this.isGamePaused = true;
        return;
    }
    if(this.model.spinData.preFeatureActivity==true){
        this.callGameActivity();
        return;
    }
    // publish playSpecialGameStateAnimation for any triggering animation
    // publish specialGameStateAnimationCompleted, when required animation is completed.
    if (this.model.isStickyRespinTriggered() || this.model.isStickyRespinActive()) {
        if (this.checkFeatureAssets("stickyRespin")) { return; }
        _mediator.publish("clearAllWins");

        // commented for test on respin playing freespin bg
        // if (this.model.getFeatureParentType() === "freespins" || this.model.getFeatureParentType() === "freespin") {
        //     _mediator.publish("unfinishedFreeSpins");
        // }

        if (!this.gameStateAnimation) {
            setTimeout(function () {
                _mediator.publish("playSpecialGameStateAnimation", { type: "stickyRespin", symbolPositions: this.model.getStickyRSSymbols(), matrix: this.model.getReelMatrix() });
            }.bind(this), this.specialGameStateAnimationDelay);
            this.gameStateAnimation = true;
            return;
        }

        this.requestSpin(false, "callReSpinRequest");
        this.gameStateAnimation = false;

        this.beforeOnAllReelStopped = function () {
            if (!this.model.isStickyRespinTriggered() && !this.model.isStickyRespinActive()) {
                _mediator.publish("removeStickySymbols");
                this.beforeOnAllReelStopped = function () { };
            }
        }
    } else if (this.model.isReSpinActive()) {
        if (this.checkFeatureAssets("respin")) { return; }
        _mediator.publish("clearAllWins");
        if (_ng.GameConfig.showRespinPopup) {
            _mediator.publish("clearAllWins");
            if (this.model.getIsRespinTriggered()) {
                setTimeout(function () {
                    _mediator.publish("playSpecialGameStateAnimation", { type: "stickyRespin", symbolPositions: this.model.getStickyRSSymbols(), matrix: this.model.getReelMatrix() });
                }.bind(this), this.specialGameStateAnimationDelay);
                this.model.setIsRespinTriggered(false);
                return;
            }
            this.requestSpin(false, "callReSpinRequest");
        } else {
            this.requestSpin(false, "callReSpinRequest");
        }
    }
    else if (this.model.getIsFreeSpinEnded()) {
        if(this.model.getIsPFSActive()) {   
            // this.model.PFSData.totalPFSWins += coreApp.gameModel.getTotalFSWin();
        }
        this.handleFSEnd();
    }
    else if (this.model.isFeatureActive()) {
        this.showFeatureGame();
    } else if (this.model.getIsFreeSpinTriggered()) {
        if (this.checkFeatureAssets("freespins")) { return; }
        this.model.stopAutoSpins();
        _mediator.publish("cancelAutoSpin");
        _mediator.publish("clearAllWins");

        if (!this.gameStateAnimation) {
            setTimeout(function () {
                _mediator.publish("playBonusSymbolAnimation", { bonusID: 100, reelMatrix: this.model.getReelMatrix() });
            }.bind(this), 500);
            this.gameStateAnimation = true;
        } else {
            this.gameStateAnimation = false;
            setTimeout(function () { _mediator.publish("showFreeSpinAwarded"); }, 100);
        }
    }else if (this.model.isFreeSpinActive()) {
        if (this.checkFeatureAssets("freespins")) { return; }
        _mediator.publish("clearAllWins");
        _mediator.publish("SHOW_TICKER");

        var leftValue = (this.model.getTotalFreeSpins() - this.model.getFreeSpinCurrentCount()) + 1;
        _mediator.publish("SHOW_TICKER_MESSAGE", pixiLib.getLiteralText("Free spins") + ": " + leftValue + "/" + this.model.getTotalFreeSpins());

        this.requestSpin(true);
    }else if (this.model.getIsPFSEnded()){
        // Prevent user interaction while rewarded popup is preparing
        _mediator.publish("ToggleSpin", false);
        _mediator.publish("DisablePanel");
        if (_viewInfoUtil.device === 'Mobile') {
            _mediator.publish("ToggleMobPanel", false);
        }
        _mediator.publish("updatePromoWinText",this.model.PFSData.totalPFSWins);
        _mediator.publish("promoFreeSpinRewarded");
        return;  // Don't enable panel until user clicks continue on popup
    }else if (this.model.getIsPFSActive() && !_ng.GameConfig.PFSUseLater){
        if(!this.isPFSRunning){
            if(this.model.getTotalPFS() == this.model.getRemainingPFS()){
                _mediator.publish("promoFreeSpinAwarded");
                // _mediator.publish("startDateTimer"); 
            }else{
                _mediator.publish("unfinishedPromoFreeSpin");
            }
            return;
        }
        _mediator.publish("clearAllWins");
        var delay = 0;
        _mediator.publish("SHOW_TICKER");
        if(this.model.getIsPFSTriggered()){
            _mediator.publish("SHOW_TICKER_MESSAGE", "Starting Bonus free spins");
            delay = 500;
        }
        setTimeout(function() {
            // Check if PFS is still active before requesting spin (it might have ended)
            if (!this.model.getIsPFSActive() || this.model.getIsPFSEnded()) {
                this.callNextGameState();  // Re-evaluate game state
                return;
            }
            var promoSpinLeft = this.model.getRemainingPFS() - 1;
            _mediator.publish("updatePromoSpinLeft",promoSpinLeft);
            _mediator.publish("updatePromoWinText",this.model.PFSData.totalPFSWins);
            this.requestSpin(false);
        }.bind(this), delay);
    }else if (this.model.isAutoSpinActive()) {
        _mediator.publish("clearAllWins");
        this.updateAutoSpinCount();
        this.requestSpin(false);
    } else if (this.isSpaceBarHeld) {
        _mediator.publish("clearAllWins");
        this.requestSpin(false);
    } else {
        _mediator.publish("setSpaceBarEvent", "spinClick");
        // Don't enable panel if PFS ended
        if (!this.model.getIsPFSEnded || !this.model.getIsPFSEnded()) {
            _mediator.publish("EnablePanel");
        }

        if (!this.model.isAutoSpinActive() || !this.model.isFullFSActive()) {
            _sndLib.highBg();
        }
        
        if (this.model.getTotalWinLines() && this.model.getTotalWinLines().length > 0) {
            _mediator.publish("showAlternateLineWins");
        }
    }
}
p.showFeatureGame = function(){
    if (this.checkFeatureAssets("feature")) { return; }
    coreApp.gameModel.stopAutoSpins();
    _mediator.publish("cancelAutoSpin");
    _mediator.publish("clearAllWins");

    if (this.model.getFeatureParentType() === "freespins" || this.model.getFeatureParentType() === "freespin") {
        _mediator.publish("unfinishedFreeSpins");
    }

    if (!this.gameStateAnimation && this.checkForBonusSymbolAnimation()) {
        setTimeout(function () {
            _mediator.publish("playBonusSymbolAnimation", { bonusID: this.model.getFeatureObject().bonus_game_id, reelMatrix: this.model.getReelMatrix() });
        }.bind(this), 1000);
        this.gameStateAnimation = true;
    } else {
        this.gameStateAnimation = false;
        this.createFeatureAwardText();
    }
}
p.createFeatureAwardText = function () {
    try{
        var ss = _ng.GameConfig.bonusGames[this.model.getFeatureObject().bonus_game_id].name;
    }catch(e){
        _mediator.publish("showBonusAwardedMsg", "You won bonus game");
        return;
    }

    if (_ng.GameConfig.bonusGames[this.model.getFeatureObject().bonus_game_id] && _ng.GameConfig.bonusGames[this.model.getFeatureObject().bonus_game_id].name) {
        if (_ng.GameConfig.bonusAwardText) {
           var mText = pixiLib.getLiteralText("CONGRATULATIONS!");
           mText += "\n " + "\n "+ pixiLib.getLiteralText("YOU WON");
           mText += "\n " + "\n " + pixiLib.getLiteralText(_ng.GameConfig.bonusGames[this.model.getFeatureObject().bonus_game_id].name + " ROUND");
           _mediator.publish("showBonusAwardedMsg", mText);
        } else {
            var mText = pixiLib.getLiteralText("Congratulations!");
            mText += "\n " + pixiLib.getLiteralText("You won");
            mText += "\n " + pixiLib.getLiteralText(_ng.GameConfig.bonusGames[this.model.getFeatureObject().bonus_game_id].name + " round");
            _mediator.publish("showBonusAwardedMsg", mText);
        }
    } else {
        _mediator.publish("showBonusAwardedMsg", "You won bonus game");
    }
}
p.handleFSEnd = function(){
    _mediator.publish("clearAllWins");
    setTimeout(function () {
        _mediator.publish("HIDE_TICKER");
        if (this.model.getTotalFSWin() > 0) {
            _mediator.publish("showFreeSpinEnded");            
        } else {
            if(commonConfig.showFSPopupWithZeroWins){
                _mediator.publish("showFreeSpinEndedZeroBalance", {eventsToPublish: ["EnablePanel", "onFSEndShown"]});
            }else{
                _mediator.publish("EnablePanel");
                _mediator.publish("onFSEndShown");
            }
        }
    }.bind(this), 1000);
}
p.postFreespinsActivity = function(){
    this.model.spinData.postFeatureActivity = false;
}
p.checkForBonusSymbolAnimation = function () {
    return true;
};
p.beforeOnAllReelStopped = function () { };
p.onInsufficientFunds = function () {
    _mediator.publish(_events.core.error, { code: "INSUF_BALL_001" });
}
p.onDisconnections = function () {
    _mediator.publish(_events.core.error, { code: "NO_INTERNET" });
}
p.onAllReelStopped = function () {
    this.allReelsStopped = true;
    if(_ng.singleQuickSpin){
        _ng.singleQuickSpin = false;
        _ng.isQuickSpinActive = false;
    }
    if(this.model.isError || this.errorContinueClicked){ 
        this.errorContinueClicked = false;
        return;         
    }
    if(this.checkForSpecialAnimations()){ return; }

    if (this.model.spinData.isBonusFeatureWin) {
        _mediator.publish("onUpdateProgressCount", this.model.spinData.bonusFeatureWinCount);
    }

    this.beforeOnAllReelStopped();

    if (this.model.getWildMultiplier() > 0 && _ng.GameConfig.showWildMultiplierAnimation) {
        _mediator.publish("showWildMultiplier", this.model.getWildMultiplier());
        return;
    }

    if (this.model.spinData.isSpawningWild) {
        _mediator.publish("showSpawningWild", this.model.spinData.spawningWildReelNum);
        return;
    }

    if (this.model.spinData.isWalkingWild) {
        _mediator.publish("showWalkingWild", this.model.spinData.walkingWildReelNum);
        return;
    }


    this.checkLossLimit();

    if (this.model.spinData.getTotalWinAmount() > 0) {
        if (this.model.autoSpinData.getIsStopOnAnyWin()) {
            coreApp.gameModel.stopAutoSpins();
            _mediator.publish("cancelAutoSpin");
        }
        this.checkWinLimit();
        _mediator.publish((this.model.isBigWinActive()) ? "showBigWins" : "showTotalWin");
       
        if (this.model.isAutoSpinActive() || this.model.isFullFSActive() || this.isSpaceBarHeld || coreApp.gameModel.isFeatureActive()) {
            _mediator.publish("showPanelWin");
        }
    } else {
        setTimeout(this.callNextGameState.bind(this), 200);
    }
}
p.checkForSpecialAnimations = function(){
    return false;
}
p.checkLossLimit = function (state) {
    if (this.model.autoSpinData.getIsASLossLimitActive() && (Number(this.model.getBalance()) <= Number(this.model.autoSpinData.getIsASLossLimitValue()))) {
        coreApp.gameModel.stopAutoSpins();
        _mediator.publish("cancelAutoSpin");
    }
}

p.checkWinLimit = function (state) {
    if (this.model.autoSpinData.getIsASWinLimitActive() && (Number(this.model.spinData.getTotalWinAmount()) >= Number(this.model.autoSpinData.getIsASWinLimitValue()))) {
        coreApp.gameModel.stopAutoSpins();
        _mediator.publish("cancelAutoSpin");
    }
}
p.postMatrixCheck = function (state) {
    if(this.model.isError){ return; }
    //we need to set post matrtix in original matrix
    this.model.spinData.setPostMatrix();
    this.checkLossLimit();

    //after expanding added 
    if (state == "initState") {
        this.onGameInit();
        return;
    } else if (state === "postWinActivity") {
        setTimeout(this.callNextGameState.bind(this), 200);
    } else if (this.model.spinData.getTotalWinAmount() > 0) {
        if (this.model.autoSpinData.getIsStopOnAnyWin()) {
            coreApp.gameModel.stopAutoSpins();
            _mediator.publish("cancelAutoSpin");
        }
        this.checkWinLimit();
        _mediator.publish((this.model.isBigWinActive()) ? "showBigWins" : "showTotalWin");
       
        if (this.model.isAutoSpinActive() || this.model.isFullFSActive() || this.isSpaceBarHeld || coreApp.gameModel.isFeatureActive()) {
            _mediator.publish("showPanelWin");
        }
    } else {
        setTimeout(this.callNextGameState.bind(this), 200);
    }
}

p.onSpinClickHandler = function (isFreeSpin) {
    this.allReelsStopped = false;
    _mediator.publish("clearAllWins");
    if (!this.model.getIsPFSActive() && isFreeSpin != true) {
        this.model.setAllTotalBet(this.model.getTotalBet());
        this.model.setBalance(this.model.getBalance() - (this.model.getTotalBet()));
        _mediator.publish(_events.slot.updateBalance);
    }
    _mediator.publish("DisablePanel");
    if (_sndLib.isLowBg && (!coreApp.gameModel.isAutoSpinActive() && !coreApp.gameModel.isFullFSActive())) {
        _sndLib.lowBg();
    }
    if (coreApp.gameModel.obj.current_round.spin_type != "freespin" && !this.model.getIsPFSActive()) {
        _mediator.publish("SHOW_TICKER_MESSAGE", "goodluck_text");   
    }
}
p.onBigWinShown = function (argument) {
    var waitTimer = 100;
    if ((coreApp.gameModel.isAutoSpinActive() || coreApp.gameModel.isFullFSActive()) && coreApp.gameModel.isBigWinActive()) {
        waitTimer = 1100;
    }
    _mediator.publish(_events.slot.updateBalance);
    setTimeout(this.callNextGameState.bind(this), waitTimer);
}
p.onTotalWinShown = function (argument) {
    _mediator.publish("clearAllWins", { from: "onTotalWinShown" });
    setTimeout(this.callNextGameState.bind(this), 200);
}
p.onAlternateLineWinsShownOnce = function (argument) {}
p.onLineValueUpdated = function (data) {
    var index = data.index;
    var value = ++index;
    this.panelModel.setPaylineValue(value);
}
p.onCoinValueUpdated = function (data) {
    var index = data.index;
    this.panelModel.setBetIndex(index);
};
p.reloadGame = function () {
    location.reload();
}
p.onGambleEnd = function (){
    if(coreApp.gameModel.gambleData.winAmount>0){
        coreApp.gameModel.spinData.totalWin = coreApp.gameModel.gambleData.winAmount;
        _mediator.publish("showPanelWin");
    }
    _mediator.publish(_events.slot.updateBalance);
    this.callNextGameState();
}

// ============================================================================
// Game-Specific Extensions & Prototype Overrides (GSlotController.js)
// ============================================================================
// var _ng = _ng || {};
var gSC = _ng.SlotController.prototype;

gSC.addEvents = function () {
    cc.addEvents.call(this);
    _mediator.subscribe("SHOW_LOG", this.onShowLog.bind(this));

    _mediator.subscribe("spinStart", this.onSpinClickHandler.bind(this));
    _mediator.subscribe("onSpinResponse", this.onSpinResponseHandler.bind(this));
    _mediator.subscribe("STOP_SPIN_NOW", this.onStopSpinHandler.bind(this));
    _mediator.subscribe("allReelsStopped", this.onAllReelStopped.bind(this));
    _mediator.subscribe("onAllTumblesComplete", this.onAllTumblesComplete.bind(this));
    _mediator.subscribe("showTumbleWin", this.showTumbleWin.bind(this));
    _mediator.subscribe("onTotalWinShown", this.onTotalWinShown.bind(this));
    _mediator.subscribe("onBigWinShown", this.onBigWinShown.bind(this));
    _mediator.subscribe("startFreeSpins", this.onStartFreespins.bind(this));
    _mediator.subscribe("onFSEndShown", this.onFSEndShown.bind(this));
    _mediator.subscribe("showFreeSpinEnded", function(){
        _mediator.publish("showFSWinOnPanel");
    });
    _mediator.subscribe("GAMBLE_END", this.onGambleEnd.bind(this));
    _mediator.subscribe("continueUnfinishedGame", this.onUnfinishGame.bind(this));

    _mediator.subscribe("AlternateLineWinShownOnce", this.onAlternateLineWinsShownOnce.bind(this));

    _mediator.subscribe("callNextGameState", this.callNextGameState.bind(this));
    _mediator.subscribe("specialGameStateAnimationCompleted", this.callNextGameState.bind(this));
    _mediator.subscribe("bonusSymbolAnimationCompleted", this.callNextGameState.bind(this));

    _mediator.subscribe("onGameCreated", this.onGameInit.bind(this));
    _mediator.subscribe("runGameInit", this.onGameInit.bind(this));

    _mediator.subscribe("SHOW_GAMBLE", this.onGambleShowHandler.bind(this));
    _mediator.subscribe("SHOW_GAMBLE", function(){
        _mediator.publish("setSpaceBarEvent", "idle");
    });
    _mediator.subscribe("totalBetUpdated", this.onTotalBetUpdate.bind(this));

    _mediator.subscribe(_events.slot.coinValueUpdated, this.onCoinValueUpdated.bind(this));
    _mediator.subscribe(_events.slot.lineValueUpdated, this.onLineValueUpdated.bind(this));

    _mediator.subscribe("START_AUTOSPIN", this.onStartAutoSpin.bind(this));
    //For Resetting Autospin data in Model
    _mediator.subscribe("stopAutoSpin", this.onStopAutoSpin.bind(this));
    //Hides Autostop button and count also from panel along with resetting autospin data in model
    _mediator.subscribe("cancelAutoSpin", this.onStopAutoSpin.bind(this));


    _mediator.subscribe("bonusGameEnded", this.onBonusGameEnd.bind(this));
    _mediator.subscribe("callPostMatrixAction", this.postMatrixCheck.bind(this));

    //_mediator.subscribe("onFeatureResponse", this.onFeatureResponse.bind(this));

    _mediator.subscribe("spinClick", this.onSpinClick.bind(this));
    _mediator.subscribe("reloadGame", this.reloadGame.bind(this));
    _mediator.subscribe("unfinishedFreeSpins", this.onUnfinishedFreeSpins.bind(this));
    _mediator.subscribe("checkExtraFreeSpinAward", this.checkExtraFreeSpinAward.bind(this));


    //autospin events 
    _mediator.subscribe("AS_StopOnAnyWin", this.onStopOnAnyWinSelection.bind(this));
    _mediator.subscribe("AS_StopOnWinLimit", this.onStopOnWinLimitSelection.bind(this));
    _mediator.subscribe("AS_StopOnLossLimit", this.onStopOnLossLimitSelection.bind(this));

    _mediator.subscribe("hidePanel", this.onHidePanel.bind(this));
    _mediator.subscribe("showPanel", this.onShowPanel.bind(this));
    _mediator.subscribe("hideReelView", this.onHideReelView.bind(this));
    _mediator.subscribe("showReelView", this.onShowReelView.bind(this));
    _mediator.subscribe("hideWinView", this.onHideWinView.bind(this));
    _mediator.subscribe("showWinView", this.onShowWinView.bind(this));
    _mediator.subscribe("hideMainContainer", this.onHideMainContainer.bind(this));
    _mediator.subscribe("showMainContainer", this.onShowMainContainer.bind(this));
    _mediator.subscribe("hideClockView", this.onHideClockView.bind(this));
    _mediator.subscribe("showClockView", this.onShowClockView.bind(this));

    // _mediator.subscribe("hidePromoView", this.onHidePromoView.bind(this));    /*FOR PROMO TOP STRIP VIEW*/
    // _mediator.subscribe("showPromoView", this.onShowPromoView.bind(this));    /*FOR PROMO TOP STRIP VIEW*/
    // _mediator.subscribe("destroyPromoView", this.onDestroyPromoView.bind(this));    /*FOR PROMO TOP STRIP VIEW*/

    _mediator.subscribe("hideGameTitle", this.onHideGameTitle.bind(this));
    _mediator.subscribe("showGameTitle", this.onShowGameTitle.bind(this));
    _mediator.subscribe("hidePopupContainer", this.onHidePopupContainer.bind(this));
    _mediator.subscribe("showPopupContainer", this.onShowPopupContainer.bind(this));

    _mediator.subscribe("continueInitGame", this.continueAfterGameUnfinishAnimations.bind(this));

    _mediator.subscribe("hideNotificationWindow", this.onHideNotificationWindow.bind(this));
    _mediator.subscribe("showNotificationWindow", this.onShowNotificationWindow.bind(this));

    
    //override changeReelView function to publish required things. removeReelView, updateReelConfig, createReelView, repositionReelView
    _mediator.subscribe("changeReelView", this.changeReelView.bind(this));
    //function to call repositionReelView of slotView.
    _mediator.subscribe("repositionReelView", this.repositionReelView.bind(this));
    //Remove all the children of ReelView.
    _mediator.subscribe("removeReelView", this.removeReelView.bind(this));
    _mediator.subscribe("updateReelViewUiConfig", this.updateReelViewUiConfig.bind(this));
    _mediator.subscribe("updateSpinDataReels", this.updateSpinDataReels.bind(this));
    _mediator.subscribe("updateReelSymbolConfig", this.updateReelSymbolConfig.bind(this));

    _mediator.subscribe(_events.core.secondaryAssetsLoaded, function () {
        if (this.isUnfinishedStopped) {
            this.isUnfinishedStopped = false;
            _mediator.publish("hideNotificationWindow");
            setTimeout(function () {
                this.onUnfinishGame();
            }.bind(this), 400);
        }
        if (this.isCallNextGameStateStopped) {
            this.isCallNextGameStateStopped = false;
            _mediator.publish("hideNotificationWindow");
            setTimeout(function () {
                this.callNextGameState();
            }.bind(this), 400);
        }
    }.bind(this));
    _mediator.subscribe("setSpaceBarEvent", function (event) {
        this.spaceBarEvent = event;
    }.bind(this));
    window.addEventListener("keyup", this.dealWithKeyboard.bind(this), false);
    // window.addEventListener("keypress", this.deakWithSpaceBarHolding.bind(this), false);

    _mediator.subscribe("introScreenHidden", function(){
        setTimeout(function(){
            this.view.callGameinit();
        }.bind(this), 100);
    }.bind(this));
    _mediator.subscribe("windowFocusChanged", function(bool){
        this.isWindowFocused = bool

        _mediator.publish("SHOW_LOG", "winfocuschange "+bool);
        if(bool){
            _sndLib.focusSoundOn();
        }else{
            _sndLib.focusSoundOff();
        }


        if(bool && this.isGamePaused){
            this.isGamePaused = false;
            this.callNextGameState();
        }
    }.bind(this))
    _mediator.subscribe(_events.core.error, function () {
        this.model.isError = true;
    }.bind(this));
    _mediator.subscribe("errorClose", function (data) {
        this.model.isError = false;

        this.errorContinueClicked = true;
         _mediator.publish("setSpaceBarEvent", "spinClick");/* Subscribed in ExternalUI */
        //clear line wins after error 
        this.model.spinData.totalLineWins = [];
        if(data.event){
            _mediator.publish(data.event);
        }else{
            this.callNextGameState();
        }
    }.bind(this));
    _mediator.subscribe("hideMainGame", function(){
        _mediator.publish("hidePanel", {noEffect: true});
        _mediator.publish("hideMainContainer", {noEffect: true});
        _mediator.publish("hideClockView", {noEffect: true});
        _mediator.publish("hideGameTitle", {noEffect: true});
    }.bind(this));
    _mediator.subscribe("showMainGame", function(){
        _mediator.publish("showPanel");
        _mediator.publish("showMainContainer");
        _mediator.publish("showClockView");
        _mediator.publish("showGameTitle");
    }.bind(this));
    _mediator.subscribe("openURL", function(data){
        this.openURL(data.type, data.url);
    }.bind(this));
    this.addSpecificEvents();
    this.pendingExtraFs = false;
};

gSC.onGameInit = function (argument) {
    _ng.externalUiController.betUi.updateUi(coreApp.gameModel.getTotalBet());
    if (this.model.getIsPFSActive() && !this.isPFSRunning) {
        this.isPFSRunning = true;
        _mediator.publish("DisablePanel");
        this.allReelsStopped = true;
        this.model.updatePanelModel();
        if(this.model.getTotalPFS() == this.model.getRemainingPFS()){
            _mediator.publish("promoFreeSpinAwarded");
        }else{
            _mediator.publish("unfinishedPromoFreeSpin");
        }
        return;
    }

    //direct show
    if (this.model.spinData.isSpawningWild) {
        _mediator.publish("showSpawningWild", this.model.spinData.spawningWildReelNum, "initState");
        _mediator.publish("DisablePanel");
        this.model.spinData.isSpawningWild = false;
        return;
    }

    if (this.model.spinData.getIsStickyTriggered()) {
        _mediator.publish("showStickySymbols", "initState");
        this.model.spinData.setIsStickyTriggered(false);
        return;
    }

     if (this.model.spinData.isGambleFeatureActive()) {
         _mediator.publish("unfinishedFreeSpins");
         _mediator.publish("setRemainingFSpins", "0");
         this.changeContainerBg(true);
         _mediator.publish("showFreeSpinEnded");
         _mediator.publish("disableBuyFeature");
         _mediator.publish("setSpaceBarEvent", "idle");
         _mediator.publish("_hideAndShowOfTwoXButton", true);

        return;
    }

    if(this.model.spinData.isGameUnfinishedAnimActive){
        _mediator.publish("DisablePanel");
        _mediator.publish("setSpaceBarEvent", "idle");
        this.showGameUnfinishAnimations();
        return;
    }

    
    const urlParams = new URLSearchParams(window.location.search);
    const hasRoundId = urlParams.has('round_id');
    const isInHistoryMode = hasRoundId;
  
    if (!this.model) {
        window.alert("Model not found");
        return;
    }

    // Check for unfinished game states OR history mode
    const hasUnfinishedGame = this.model.isFreeSpinActive() || this.model.isReSpinActive() || this.model.isStickyRespinTriggered() ||
        this.model.isStickyRespinActive() || this.model.isFeatureActive() || this.model.isGambleActive();

    if (hasUnfinishedGame || isInHistoryMode) {
        // CRITICAL: Prevent popup from showing again if user already clicked continue
        if (this._unfinishedGameContinueClicked) {
            // User already clicked continue, don't show popup again
            // Continue with normal game flow
            if (!this.isPFSRunning && this.model) {
                if (this.model.getIsPFSEnded && !this.model.getIsPFSEnded()) {
                    _mediator.publish("EnablePanel");
                }
                _mediator.publish("setSpaceBarEvent", "spinClick");
            }
            return;
        }
        
        // Prevent multiple popups - if history popup was already shown, don't show it again
        if (isInHistoryMode && this._historyPopupShown) {
            // This ensures the game finishes initializing
            if (!this.isPFSRunning && this.model) {
                if (this.model.getIsPFSEnded && !this.model.getIsPFSEnded()) {
                    _mediator.publish("EnablePanel");
                }
                _mediator.publish("setSpaceBarEvent", "spinClick");
            }
            return;
        }

        // Check if popup container exists (game view must be initialized)
        // gameCreationCompleted must be called first for popupContainer to exist
        if (!coreApp || !coreApp.gameView || !coreApp.gameView.popupContainer) {
            // Optimized retry delay for smoother experience
            setTimeout(() => {
                this.onGameInit();
            }, 500); // Reduced delay to 500ms for faster retry
            return;
        }

        _mediator.publish("DisablePanel");

        // Show different message in history mode
        let messageText;
        if (isInHistoryMode) {
             messageText = pixiLib.getLiteralText("DOYOUWANTTOSEEHISTORY?");

            // Set flag to prevent showing popup again - ONLY when popup is actually shown
            this._historyPopupShown = true;
        } else {
            // Safety check for coreLiterals
            if (typeof coreLiterals !== 'undefined' && coreLiterals.unFinishedText) {
                messageText = coreLiterals.unFinishedText;
            } else {
                messageText = gameLiterals.unfinished; // Fallback message
            }
        }
        
        _mediator.publish("showErrorMsg", messageText, "continueUnfinishedGame", true);
        return;
    }


    if(this.isPFSRunning){
        this.callNextGameState();
        return;
    }
    // Don't enable panel if PFS ended
    if (!this.model.getIsPFSEnded()) {
        _mediator.publish("EnablePanel");
    }
    _mediator.publish("setSpaceBarEvent", "spinClick");
}


gSC.addSpecificEvents = function () {

    this.WasSpaceHeld=false;
    this.allReelsStopped = true;
    this.allTumbleFinished = true;
    this.isMulValueUpdation = false;
    
    this.totalMultipliersOpened = 0;
    this.totalMultiplierOnScreen = 0
    
    //SID UNCOMMIT
   _ng.isForceAllowed=true;
    _mediator.subscribe("AllTumbleFinish",this.AllTumbleFinish.bind(this));
    _mediator.subscribe("continueAutoSpin",this.continueAutoSpin.bind(this));
    _mediator.subscribe("triggerAllWinAnimation",this.triggerAllWinAnimation.bind(this));

    _ng.twoXBetEnabled = false;
    _ng.autoPlayBeforeFg = false;
    _ng.autoPlayPrevCount = 0;
    
    this.spaceBarClickCount = 0;
    this.spaceBarClickInterval = setInterval(() => {
        this.spaceBarClickCount = 0;
    }, 3000);
   
}

/*windows key up event*/
gSC.dealWithKeyboard = function (e) {
   /*  if (e.key === "Escape") {
        _mediator.publish("hideBigWin_click");
        return;
    } */
    if (e.keyCode === 32) {
        switch (coreApp.CURRENTACTIVEPOPUP) {
            case "congratulations_awarded":
                _mediator.publish("onFSContinueClick");
                break;
            case "congratulations_rewarded":
                // _mediator.publish("onFsCloseHandler");
                break;
            case "bigwinview":
                _mediator.publish("hideBigWin_click");
                break;
            default:
                break;
        }
    }
    this.WasSpaceHeld = false;
    this.isSpaceBarHeld = false;
    if (this.heldSpaceBarTimer) {
        clearTimeout(this.heldSpaceBarTimer);
    }
};

gSC.fireSpaceBarHoldEvent = function(firstTime){
    if(this.checkForSpaceEvent() && this.isSpaceBarHeld){
        _mediator.publish(this.spaceBarEvent);
        _mediator.publish("setSpaceBarEvent", "idle");
    }

    this.heldSpaceBarTimer = setTimeout(function(){
        this.fireSpaceBarHoldEvent(false);
    }.bind(this), 500);
    if(!this.isWindowFocused)
    {
        _ng.isQuickSpinActive=false;
        this.isSpaceBarHeld=false;
         this.WasSpaceHeld=false;
    }

    if(!_ng.isQuickSpinActive  && firstTime){
    this.checkReelsStopped=setInterval(function(){
        if(this.allReelsStopped && this.isSpaceBarHeld  && this.WasSpaceHeld)
            {
                // console.log("Space bar hold activated")
                _ng.isQuickSpinActive=true;
                console.log("QUICK SPIN ACTIVATE")
                clearInterval(this.checkReelsStopped);
            }
    }.bind(this),20)
    }
}
gSC.deakWithSpaceBarHolding = function(e){
    if(e.keyCode === 32 && !this.isSpaceBarHeld){
        this.isSpaceBarHeld = true;

        /* for showing quick spin info popup */
        if(!_ng.GameConfig.quickSpinInfoPopupShown)
            this.quickSpinInfoOnSpaceBar();

        this.heldSpaceBarTimer = setTimeout(function(){
            
            if(!_ng.isQuickSpinActive)
            {
                this.WasSpaceHeld=true;
            }
            console.log(" ACTIVATE")
            this.fireSpaceBarHoldEvent(true);
        }.bind(this), _ng.GameConfig.spaceBarHoldTimeout);
    }
}
gSC.onAllReelStopped = async function () {
    if(this.model.isError || this.errorContinueClicked){ 
        this.errorContinueClicked = false;
        this.allReelsStopped = true;
        // _mediator.publish("cancelAutoSpin");
        this.autoSpinTriggered = false;
        return;         
    }
    if (typeof quickBtnSettingsStatus !== "undefined" && quickBtnSettingsStatus) {
        _ng.isQuickSpinActive=true;
    }
    if(_viewInfoUtil.viewType=="VP" ||_viewInfoUtil.viewType=="VL"){
        _mediator.publish("toggleStopSpinBg",false)
    }
    if (coreApp.gameModel.obj.current_round.spin_type != "freespin") {
        if (!coreApp.gameModel.isAutoSpinActive() && coreApp.gameModel.obj.current_round.win_amount == 0) {
            _mediator.publish("SHOW_IDLE_MESSAGE");  
        }   
    }
    _mediator.publish('showMultipler', this.model.spinData.proMulti);
    /* GOLD FEATURE */
    if (coreApp.gameModel.obj.current_round.spin_type !== "freespin" && coreApp.gameModel.obj.current_round.misc_prizes.count == 0 && coreApp.gameModel.obj.current_round.post_matrix_info.has_gold) {
        _mediator.publish("playFlayingCharacter");
    }else{

        _mediator.publish("callPostMatrixAction");
    }

    if (coreApp.gameModel.obj.current_round.spin_type == "freespin") {
        _mediator.publish("checkExtraFreeSpinAward"); 
    }

     //PopFunction
     this.addMultiplierToSymbol();
     _mediator.publish("DisablePanel");
    if (coreApp.gameModel.obj.current_round.misc_prizes.count == 0) {
        this.allReelsStopped = true;
        if (coreApp.gameModel.isAutoSpinActive() == true) {
            _mediator.publish("ToggleMobPanel", false);
            _mediator.publish("ToggleSpin", false)
        }
        if (coreApp.gameModel.isAutoSpinActive() == false && coreApp.gameModel.isFullFSActive() == false) {
            // Between spins, prevent enabling spin when PFS is active or ending
            if (this.model && this.model.getIsPFSActive && (this.model.getIsPFSActive() || this.model.getIsPFSEnded && this.model.getIsPFSEnded())) {
                _mediator.publish("ToggleSpin", false);
            } else {
                _mediator.publish("ToggleSpin", true);
            }
        }
        _mediator.publish("AllTumbleFinish", 0);

        // if (!coreApp.gameModel.isFullFSActive() && !coreApp.gameModel.getIsPFSActive()) {
        //     _mediator.publish("enableBuyFeature");
        //     _mediator.publish("checkBalanceForBuyFeature");
        // }
        if (coreApp.gameModel.isFullFSActive() == true) {
            _mediator.publish("ToggleMobPanel", false);
            _mediator.publish("ToggleSpin", false);

        }

    }
    if (coreApp.gameModel.obj.current_round.misc_prizes.count != 0 && coreApp.gameModel.obj.current_round.payline_wins && coreApp.gameModel.obj.current_round.payline_wins.details && coreApp.gameModel.obj.current_round.payline_wins.details != "") {
        this.winArr = [];
        this.winHisArr = [];
        this.symbolpop = [];
        this.histSymbol = [];
        var symbols = [];
        this.newArray = [];
        var oneArr = coreApp.gameModel.obj.current_round.payline_wins.details.split(";");
        for (var k = 0; k < oneArr.length; k++) {
            var temp = oneArr[k].split(":");
            this.winArr.push(temp[1]);
            this.winHisArr.push(temp[1]);
            this.symbolpop.push(temp[3]);
            this.histSymbol.push(temp[4]);
            let neededValues = [parseInt(temp[3]), temp[4]];
            this.newArray.push(neededValues);
        }
        for (var i = 0; i < coreApp.gameModel.obj.current_round.misc_prizes.count; i++) {
            for (k = 0; k < coreApp.gameModel.obj.current_round.misc_prizes[i].old_reel_symbol.length; k++) {
                symbols.push(coreApp.gameModel.obj.current_round.misc_prizes[i].old_reel_symbol[k])
            }
        }
        _mediator.publish("getTotalwin", this.winArr);
    }


    if (coreApp.gameModel.obj.current_round.misc_prizes!="" &&coreApp.gameModel.obj.current_round.misc_prizes.count > 0) {
        console.log("Perform from GSlotController")
        this.view.reelView.performTumble();
    }
}
        
gSC.AllTumbleFinish = function (num,reelID) {
    this.num = num;
    this.reelID = reelID;
    //with tumbles
    if ((num+1 == coreApp.gameModel.obj.current_round.misc_prizes.count) && reelID==5) {
        // _mediator.publish("removeIncrementalMultipliers");
            _mediator.publish("createSticky");/* todo:remove later */
            _mediator.publish("hideFakeButton");
            this.allTumbleFinished = true;
            
            if (!coreApp.gameModel.isFreeSpinActive() && coreApp.gameModel.obj.current_round.spin_type =="normal") {
                _mediator.publish("ToggleTurbo",true);
                if (this.autoSpinTriggered == true && this.currentAutoSpinCount == 0 &&(coreApp.gameModel.getAutoSpinCurrentCount() == coreApp.gameModel.getAutoSpinTotalCount())) {
                    this.autoSpinTriggered = false;
                    if(_ng.GameConfig.TurboOn)
                        {
                            _ng.GameConfig.FastAnim=false;
                            _ng.isQuickSpinActive = false;
                        }
                    setTimeout(() => {
                        
                                _mediator.publish("toggleAutoSpinOptions",true); 
                                _mediator.publish("ToggleSpin",false);   
                            }, 1500);
                  }   
            }
            if(!coreApp.gameModel.obj.current_round.post_matrix_info.multiplier){
                //AFTER TUMBLE FINISH..
                this.triggerAllWinAnimation();
            }
    }

    else if(num == coreApp.gameModel.obj.current_round.misc_prizes.count){
        // _mediator.publish("removeIncrementalMultipliers");
            _mediator.publish("createSticky");/* todo: remove later */
            _mediator.publish("hideFakeButton");
            this.allTumbleFinished = true;
            if (!coreApp.gameModel.isFreeSpinActive() && coreApp.gameModel.obj.current_round.spin_type =="normal") {
                _mediator.publish("ToggleTurbo",true);
                if (this.autoSpinTriggered == true && this.currentAutoSpinCount == 0 &&(coreApp.gameModel.getAutoSpinCurrentCount() == coreApp.gameModel.getAutoSpinTotalCount())) {
                    this.autoSpinTriggered = false;
                    if(_ng.GameConfig.TurboOn)
                        {
                             _ng.GameConfig.FastAnim=false;
                             _ng.isQuickSpinActive = false;
                        }
                    setTimeout(() => {
                        
                                _mediator.publish("toggleAutoSpinOptions",true); 
                                _mediator.publish("ToggleSpin",false);   
                            }, 500);
                  }
                  
            }

    }


}
gSC.onStartFreespins = function (delay) {
    // If buy bonus (freespins) is starting during PFS, hide the PFS UI
    if (this.isPFSRunning || this.model.PFSData.remainingPromoFreeSpins > 0) {
        // _mediator.publish("hidePromoView");
        // this.isPFSRunning = false; // Stop PFS running flag
    }
    
    this.model.setIsFreeSpinTriggered(false);
    this.autoSpinTriggered = false;
    if(_ng.GameConfig.TurboOn)
        {
            _ng.isQuickSpinActive = false;
            _ng.GameConfig.FastAnim = false;
        }
    _sndLib.playBg(_sndLib.sprite.bgFS);
    _mediator.publish("FreeSpinsStarted");
    if(delay !== undefined){
        setTimeout(this.callNextGameState.bind(this), delay);
    }else{

        setTimeout(this.callNextGameState.bind(this), 200);
    }
    this.changeContainerBg(true);
}
// gSC.delayBigwin= function(){
//     _mediator.publish("EnablePanel");
//     //delaying big wins animation until tumble gets over
//     if ((this.num+1 == coreApp.gameModel.obj.current_round.misc_prizes.count) && this.reelID==5) {
//         _mediator.publish((this.model.isBigWinActive()) ? "showBigWins" : "showTotalWin");
// }
// else if(this.num == coreApp.gameModel.obj.current_round.misc_prizes.count){
//         _mediator.publish((this.model.isBigWinActive()) ? "showBigWins" : "showTotalWin");
//    }

// ///////////////////////////////////////////////////////////////////
// }
gSC.addMultiplierToSymbol = function()
{
	let tempArray = coreApp.gameModel.userModel.userData.current_round.screen_wins;
	for(var i=0; i<tempArray.length; i++)
    {
        if(tempArray[i] > 0)
        {
            let stripId = i%6;
            let symbolIndex = Math.floor(i/6) + 1;
        }
    }
}
        
        
     




gSC.onBigWinShown = function (argument) {
    var waitTimer = ((coreApp.gameModel.isAutoSpinActive() || coreApp.gameModel.isFullFSActive()) && coreApp.gameModel.isBigWinActive()) ? 1100 : 100;
    setTimeout(this.callNextGameState.bind(this), waitTimer);
    this.resetMultiplier();
}
gSC.onTotalWinShown = function (argument) {
    // Monitor changes in _ng.isForceAllowed to kill and restart tweens
    const checkallReelsStopped = setInterval(function () {
        if (this.allReelsStopped) {
            _mediator.publish("clearAllWins", { from: "onTotalWinShown" });
            if (_ng.GameConfig.FastAnim) {
                    //WIN
                    if(coreApp.gameModel.obj.current_round.misc_prizes.count){
                    //1.MULTIPLIER
                    //2.ALL WIN TRIGGER
                    //3.SCATTER 
                    // this.callNextGameState();
                    _mediator.publish("onBigWinShown");

                }else{
                //NO WIN
                }
                
            }
            else {
                //NORMAL SPIN 

                //WIN
                if(coreApp.gameModel.obj.current_round.misc_prizes.count){
                    //1.MULTIPLIER
                    //2.ALL WIN TRIGGER
                    //3.SCATTER 
                    // this.callNextGameState();
                    _mediator.publish("onBigWinShown");

                }else{
                //NO WIN
                }

            }
            this.resetMultiplier();
            // Stop monitoring once the tweens are restarted
            clearInterval(checkallReelsStopped);
        }
    }.bind(this), 10); // Check every 100ms

}

gSC.resetMultiplier = function () {
	_ng.resetMultiplierValue =true;
}

gSC.postMatrixCheck = function (state) {
    if(this.model.isError){ return; }
    //we need to set post matrtix in original matrix
    this.model.spinData.setPostMatrix();
    this.checkLossLimit();

    var flag=0;
    var BonusWin=coreApp.gameModel.obj.current_round.screen_wins;
    for(var i=0;i<BonusWin.length;i++)
    {
        if(BonusWin[i]>0)
        {
            flag+=1;
            //break;
        }
    }

    //new code
    if(coreApp.gameModel.obj.current_round.misc_prizes == ""){
        //no win
        setTimeout(this.callNextGameState.bind(this), 200);
    }else{
        //win and tumble
        
        if(coreApp.gameModel.obj.current_round.misc_prizes.count > 0){
            return;
        }else{
            setTimeout(this.callNextGameState.bind(this), 200);
        }
    }

}
gSC.onSpinResponseHandler = function () {
    //stop spin after some delay
    if(_ng.isQuickSpinActive && _ng.quickSpinType==="turbo"){
        this.onStopSpinHandler();
    }else if (_ng.isQuickSpinActive) {
        setTimeout(this.onStopSpinHandler.bind(this), _ng.GameConfig.quickSpinIntervel ? _ng.GameConfig.quickSpinIntervel : 300);
    } else {
        this.stopSpinTimeout = setTimeout(this.stopReels.bind(this), _ng.GameConfig.ReelViewUiConfig.data.reelSpinConfig.reelStopAfterResponseDelay);
    }
    this.onSpecificSpinResponseHandler();
}
gSC.checkWinLimit = function (state) {
    // Check if we're in replay/history mode - don't show MAX WIN popup in replay mode
    const urlParams = new URLSearchParams(window.location.search);
    const hasRoundId = urlParams.has('round_id');
    const isReplayMode = hasRoundId || (window.slotService && window.slotService.isReplayMode);

    if (isReplayMode) {
        console.log("🎬 Replay mode detected - skipping MAX WIN popup check");
        return; // Don't check win limits in replay mode
    }

    //   console.log("Limkt Exceeded: "+(Number(this.model.spinData.getTotalWinAmount())))
    if (this.model.autoSpinData.getIsASWinLimitActive() && (Number(this.model.spinData.getTotalWinAmount()) >= Number(this.model.autoSpinData.getIsASWinLimitValue()))) {
        coreApp.gameModel.stopAutoSpins();
        _mediator.publish("cancelAutoSpin");
    }

    else if((Number(this.model.spinData.getTotalWinAmount()) >= coreApp.gameModel.spinData.max_win_cap * (Number(this.model.getTotalBet()))))
        {
                // console.log("Limkt Exceeded")
                 _mediator.publish("WinExceededPopup",this.model.getTotalBet())
        }
        // else if((Number(coreApp.gameModel.getTotalFSWin()))>=5000*(Number(this.model.getTotalBet())))
        //     {
        //         _mediator.publish("WinExceededPopup",this.model.getTotalBet())
        //     }
}
gSC.onStartAutoSpin = function (count) {
    this.autoSpinTriggered = true;
    if(_ng.GameConfig.TurboOn)
    {
        _ng.isQuickSpinActive = true;
        _ng.GameConfig.FastAnim=true;
    }
    // console.log(" autospin started ", count);
    this.model.startAutoSpins(count);
    this.requestSpin(false);
    this.updateAutoSpinCount();
}
gSC.onStopAutoSpin = function (count) {
    this.currentAutoSpinCount = coreApp.gameModel.getAutoSpinCurrentCount();
    this.model.stopAutoSpins();
    _mediator.publish("showNewMessage","");
    _mediator.publish("enableBuyFeature");
    _mediator.publish("ToggleSpin",true);
    _mediator.publish("updateAutoSpinText",false);
    if (coreApp.gameModel.isFreeSpinActive() == false) {
        _mediator.publish("hideandShowBuyfeature",true); 
    }
}

gSC.onSpinClickHandler = function (isFreeSpin) {
    _ng.isForceAllowed=true;
    this.allTumbleFinished = false;
    _ng.GameConfig.isGoldFeature = false;
    _mediator.publish("disableBuyFeature");
    _mediator.publish("removeHistBox");
    _mediator.publish("removeWinAnim");
    _mediator.publish('removeMultipliers');
    _ng.GameConfig.incrementMulArry = [];
    _mediator.publish("removeIncrementalMultipliers");
    
    if(coreApp.gameModel.isFreeSpinActive()){
        // var leftValue = (coreApp.gameModel.userModel.userData.next_round.spins_left)-1;
        var leftValue = coreApp.gameModel.getFreeSpinCurrentCount() - 1;
        _mediator.publish("showNewMessage",gameLiterals.spinsleft_text +" "+ leftValue);
        var getTotalFreeSpins = coreApp.gameModel.userModel.userData.next_round.num_spins;
        _mediator.publish("setFsPlayedcnt",getTotalFreeSpins);
        _mediator.publish("setRemainingFSpins",leftValue);
        console.log("FREE SPIN LEFT",leftValue);
         
    }
    if (coreApp.gameModel.userModel.userData.previous_round
        && coreApp.gameModel.userModel.userData.previous_round
        .bonus_details) {
            let winAmount = coreApp.gameModel.userModel.userData.next_round.total_fs_win_amount;
            if (winAmount > 0) {
                	_mediator.publish("resetTotalFSWin",winAmount);
                    _mediator.publish("UpdateWin",winAmount); 
            } else {
                _mediator.publish("resetTotalFSWin",winAmount,0);
                _mediator.publish("UpdateWin",winAmount); 
            }
    }
   
    if (coreApp.gameModel.obj.current_round.spin_type != "freespin" && !this.model.getIsPFSActive()) {
        _mediator.publish("SHOW_TICKER_MESSAGE", gameLiterals.goodluck_text);   
    }
if (!coreApp.gameModel.isFreeSpinActive()) {
    _mediator.publish("UpdateWin",0); 
    	_mediator.publish("resetTotalFSWin",0);  
}
    
	if(_ng.resetMultiplierValue && coreApp.gameModel.isFreeSpinActive() == false && coreApp.gameModel.getIsFreeSpinEnded()==false){
		_mediator.publish('showMultipler', 1);
		_ng.resetMultiplierValue = false;
	}
    this.allReelsStopped = false;
    // _mediator.publish("clearAllWins");
    _mediator.publish("ClearBonusSym");

    if(_ng.BuyFSenabled === true) {
        this.model.setAllTotalBet(this.model.getTotalBet());
        this.model.setBalance(this.model.getBalance() - (this.model.getTotalBet()*coreApp.gameModel.spinData.buyfg));
        if(!coreApp.gameModel.isFreeSpinActive()){
            _mediator.publish(_events.slot.updateBalance);
        }
    } else if(_ng.GameConfig.superBuyEnabled === true) {
        this.model.setAllTotalBet(this.model.getTotalBet());
        this.model.setBalance(this.model.getBalance() - (this.model.getTotalBet()*coreApp.gameModel.spinData.superBuyfg));
        if(!coreApp.gameModel.isFreeSpinActive()){
            _mediator.publish(_events.slot.updateBalance);
        }
    } else if(_ng.twoXBetEnabled===true) {
        this.model.setAllTotalBet(this.model.getTotalBet());
        this.model.setBalance(this.model.getBalance() - (this.model.getTotalBet()*coreApp.gameModel.spinData.antebet));
        if(!coreApp.gameModel.isFreeSpinActive()){
            _mediator.publish(_events.slot.updateBalance);
        }
    } else if (!this.model.getIsPFSActive() && isFreeSpin != true) {
        this.model.setAllTotalBet(this.model.getTotalBet());
        this.model.setBalance(this.model.getBalance() - (this.model.getTotalBet()));
        if(!coreApp.gameModel.isFreeSpinActive()){
            _mediator.publish(_events.slot.updateBalance);
        }
    }
    _mediator.publish("DisablePanel");
    if (_sndLib.isLowBg && (!coreApp.gameModel.isAutoSpinActive() && !coreApp.gameModel.isFullFSActive())) { _sndLib.lowBg(); }
}
gSC.handleFSEnd = function(){
      if (this._fsEndHandled) return;  // guard
        this._fsEndHandled = true;
    _mediator.publish("resetTotalFSWin",0);
    _mediator.publish("clearAllWins");
    
    _mediator.publish("checkButtonState")
    _sndLib.stopBg(_sndLib.sprite.bgFS);
    _mediator.publish("_hideAndShowOfTwoXButton", true);
   
    setTimeout(function () {
        _mediator.publish("SHOW_TICKER");
        if (this.model.getTotalFSWin() > 0) {
            _mediator.publish("showFreeSpinEnded");
             this._fsEndHandled = false;            
        } else { 
            _mediator.publish("showFreeSpinEnded");
            this._fsEndHandled = false; 
        }
    }.bind(this), 1000);
    this.changeContainerBg(false);
}
gSC.onUnfinishGame = function () {
    // Check if we're in history mode and need to fetch replay data
     const urlParams = new URLSearchParams(window.location.search);
    const hasRoundId = urlParams.has('round_id');
    const isInHistoryMode = hasRoundId;
    // If in history mode and slotService exists, fetch replay data now
    if (isInHistoryMode && window.slotService && window.slotService.isReplayMode) {
        if (!window.slotService.replayDataArray || window.slotService.replayDataArray.length === 0) {
            // Pass a callback to continue the game flow after API call completes
            window.slotService.getReplayData(() => {
                // Auto-start the replay sequence after data is loaded
                if (window.slotService && window.slotService.replayDataArray && window.slotService.replayDataArray.length > 0) {
                    // Small delay to ensure everything is ready
                    setTimeout(() => {
                        if (window.slotService && typeof window.slotService.injectReplayData === 'function') {
                            window.slotService.injectReplayData();
                        } else {
                            this.continueUnfinishGameFlow();
                        }
                    }, 500);
                } else {
                    this.continueUnfinishGameFlow();
                }
            });
            return;
        } else {
            // Replay data already loaded, auto-start replay sequence
            setTimeout(() => {
                if (window.slotService && typeof window.slotService.injectReplayData === 'function') {
                    window.slotService.injectReplayData();
                } else {
                    this.continueUnfinishGameFlow();
                }
            }, 500);
            return;
        }
    }


    this.continueUnfinishGameFlow();
}

gSC.continueUnfinishGameFlow = function () {
    const isInHistoryMode = isHistoryMode;
    _mediator.publish("DisablePanel");
    if (this.showNotification() && !_viewInfoUtil.isSecondaryAssetsLoaded) {
        this.isUnfinishedStopped = true;
        _mediator.publish("showNotificationWindow", { alpha: 0.85 });
        return;
    }
    if (this.model.spinData.isBonusFreatureMSG && this.model.spinData.bonusFreatureMSGType != "200bets") {
        _mediator.publish("showFeatureAwardedMSG", this.model.spinData.bonusFreatureMSGType);
        return;
    }
    if (this.model.isFreeSpinActive()) {
        _mediator.publish("SHOW_TICKER");
        var leftValue = (this.model.getTotalFreeSpins() - this.model.getFreeSpinCurrentCount()) + 1;
        _mediator.publish("unfinishedFreeSpins");

        if(!isInHistoryMode)
        _mediator.publish("_hideAndShowOfTwoXButton",false);
    
        this.changeContainerBg(true);

    }

    if (this.model.getFeatureParentType() === "freespins" || this.model.getFeatureParentType() === "freespin") {
        _mediator.publish("unfinishedFreeSpins");
    }
    
    this.onSpecificUnfinishGame();
}
gSC.onSpinClick = function (argument) {   
    _mediator.publish("spinStart");
    _mediator.publish("callSpinRequest");
    _mediator.publish("ToggleMobPanel",false);
    _mediator.publish("ToggleTurbo",false);
    _mediator.publish("ToggleSpin",false)
    _mediator.publish("toggleBetContainer",false);
    _mediator.publish("MakeTrueAtSpin");
    _mediator.publish("setSpaceBarEvent", "idle");
    // _mediator.publish("closeSettingsPanel");
    _mediator.publish("onHidePaytable");
    // if (this.model.getBalance() < this.model.getTotalBet()) {
    //     _mediator.publish(_events.core.error, { code: "INSUF_BALL_001" });
    //     return;
    // }
    // _mediator.publish("ToggleSpin",true)
};
gSC.callNextGameState = function () {
    if(this.model.isError){ return; }

    if(coreApp.gameController.errorContinueClicked) {
            _mediator.publish("ToggleSpin",true);
            return;
    } 

    if(this.model.isGambleActive()){
        _mediator.publish("SHOW_GAMBLE");
        this.model.gambleData.isGambleInitActive = false;
        this.model.spinData.totalLineWins = [];
        return;
    }



    if(!this.isWindowFocused){
        this.isGamePaused = true;
        return;
    }
    if(this.model.spinData.preFeatureActivity==true){
        this.callGameActivity();
        return;
    }
    // publish playSpecialGameStateAnimation for any triggering animation
    // publish specialGameStateAnimationCompleted, when required animation is completed.
    if (this.model.isStickyRespinTriggered() || this.model.isStickyRespinActive()) {
        if (this.checkFeatureAssets("stickyRespin")) { return; }
        _mediator.publish("clearAllWins");

        // commented for test on respin playing freespin bg
        // if (this.model.getFeatureParentType() === "freespins" || this.model.getFeatureParentType() === "freespin") {
        //     _mediator.publish("unfinishedFreeSpins");
        // }

        if (!this.gameStateAnimation) {
            setTimeout(function () {
                _mediator.publish("playSpecialGameStateAnimation", { type: "stickyRespin", symbolPositions: this.model.getStickyRSSymbols(), matrix: this.model.getReelMatrix() });
            }.bind(this), this.specialGameStateAnimationDelay);
            this.gameStateAnimation = true;
            return;
        }

        this.requestSpin(false, "callReSpinRequest");
        this.gameStateAnimation = false;

        this.beforeOnAllReelStopped = function () {
            if (!this.model.isStickyRespinTriggered() && !this.model.isStickyRespinActive()) {
                _mediator.publish("removeStickySymbols");
                this.beforeOnAllReelStopped = function () { };
            }
        }
    } else if (this.model.isReSpinActive()) {
        if (this.checkFeatureAssets("respin")) { return; }
        _mediator.publish("clearAllWins");
        if (_ng.GameConfig.showRespinPopup) {
            _mediator.publish("clearAllWins");
            if (this.model.getIsRespinTriggered()) {
                setTimeout(function () {
                    _mediator.publish("playSpecialGameStateAnimation", { type: "stickyRespin", symbolPositions: this.model.getStickyRSSymbols(), matrix: this.model.getReelMatrix() });
                }.bind(this), this.specialGameStateAnimationDelay);
                this.model.setIsRespinTriggered(false);
                return;
            }
            this.requestSpin(false, "callReSpinRequest");
        } else {
            this.requestSpin(false, "callReSpinRequest");
        }
    }
    else if (this.model.getIsFreeSpinTriggered()) {
        // Check freespin trigger FIRST - even during PFS!
        if (this.checkFeatureAssets("freespins")) { return; }
        //for storing autoplay history
        if(coreApp.gameModel.isAutoSpinActive() == true) {
            _ng.autoPlayBeforeFg = true;
        }
        this.model.stopAutoSpins();
        _mediator.publish("cancelAutoSpin");
        _mediator.publish("clearAllWins");

        if (!this.gameStateAnimation) {
            setTimeout(function () {
                _mediator.publish("playBonusSymbolAnimation", { bonusID: 100, reelMatrix: this.model.getReelMatrix() });
            }.bind(this), 10);
            this.gameStateAnimation = true;
        } else {
            this.gameStateAnimation = false;
            if( coreApp.gameModel.obj.current_round.misc_prizes &&coreApp.gameModel.obj.current_round.misc_prizes.count > 0 )
            {
                setTimeout(function () { 
                    _mediator.publish("showFreeSpinAwarded");

                 },200);
            }
            else
            {
            setTimeout(function () { _mediator.publish("showFreeSpinAwarded"); }, 100);
            }
        }
    } else if (this.model.getIsFreeSpinEnded()) {
        if(this.model.getIsPFSActive()) {   
            // this.model.PFSData.totalPFSWins += coreApp.gameModel.getTotalFSWin();
        }
        this.handleFSEnd();
    }
    else if (this.model.isFeatureActive()) {
        this.showFeatureGame();
    }else if (this.model.isFreeSpinActive()) {
        if (this.checkFeatureAssets("freespins")) { return; }

        //showing extra fs only from here
        if(this.pendingExtraFs) {
            this.pendingExtraFs = false;
            _mediator.publish("showExtraSpins",() => {
                this.callNextGameState();
            })
            return;
        }        

        _mediator.publish("clearAllWins");
        _mediator.publish("SHOW_TICKER");

        var leftValue = (this.model.getTotalFreeSpins() - this.model.getFreeSpinCurrentCount()) + 1;
        // Pause if extra FS popup was shown and awaiting user acknowledgment
        if (this.awaitingExtraFsAck) {
            return;
        }
        this.requestSpin(true);
    }else if (this.model.getIsPFSEnded()){
        // Prevent user interaction while rewarded popup is preparing
        _mediator.publish("cancelAutoSpin");
        _mediator.publish("ToggleSpin", false);
        _mediator.publish("DisablePanel");
        if (_viewInfoUtil.device === 'Mobile') {
            _mediator.publish("ToggleMobPanel", false);
        }
        _mediator.publish("updatePromoWinText",this.model.PFSData.totalPFSWins);
        _mediator.publish("promoFreeSpinRewarded");
        return;  // Don't enable panel until user clicks continue on popup
    }else if (this.model.getIsPFSActive() && !_ng.GameConfig.PFSUseLater){
        if(!this.isPFSRunning){
            // Always show unfinishedPromoFreeSpin panel (no "USE LATER" button)
            _mediator.publish("unfinishedPromoFreeSpin");
            return;
        }
        _mediator.publish("clearAllWins");
        var delay = 0;
        _mediator.publish("SHOW_TICKER");
        if(this.model.getIsPFSTriggered()){
            _mediator.publish("SHOW_TICKER_MESSAGE", "Starting Bonus free spins");
            delay = 500;
        }
        setTimeout(function(){
            // Check if PFS is still active before requesting spin (it might have ended)
            if (!this.model.getIsPFSActive() || this.model.getIsPFSEnded()) {
                this.callNextGameState();  // Re-evaluate game state
                return;
            }
            var promoSpinLeft = this.model.getRemainingPFS();
            _mediator.publish("updatePromoSpinLeft",promoSpinLeft);
            _mediator.publish("updatePromoWinText",this.model.PFSData.totalPFSWins);
            if(this.model.isAutoSpinActive()){
                this.updateAutoSpinCount();
                this.requestSpin(false);
            } else {
                _ng.externalUiController.spinActive(false);
            }
        }.bind(this), delay);
    }else if (this.model.isAutoSpinActive()) {
        _mediator.publish("clearAllWins");
        this.updateAutoSpinCount();
        this.requestSpin(false);
    } else if (this.isSpaceBarHeld && this.allReelsStopped) {
        _mediator.publish("clearAllWins");
        this.requestSpin(false);
    } else {

        _mediator.publish("setSpaceBarEvent", "spinClick");   
        
        if (!this.model.isAutoSpinActive() || !this.model.isFullFSActive()) {
            _sndLib.highBg();
        }
        
        if (this.model.getTotalWinLines() && this.model.getTotalWinLines().length > 0) {
            _mediator.publish("showAlternateLineWins");
        }

        if(!_ng.GameConfig.quickSpinInfoPopupShown && _ng.GameConfig.quickSpinInfoTriggered) {
            _mediator.publish("quickSpinInfoPopup");
        }
        if (!coreApp.gameModel.isFullFSActive() && !coreApp.gameModel.getIsPFSActive()) {
            _mediator.publish("enableBuyFeature");
            _mediator.publish("checkBalanceForBuyFeature");
        }
        
    }
}

/*For continuing autospin after free game*/
gSC.continueAutoSpin = function (){
    // _mediator.publish("countExitForCongratulation");
  //Close the rewarded popup in 3sec
    if(_ng.autoPlayBeforeFg == true) {
        setTimeout(() => {
            _mediator.publish("onFsCloseHandler");   /*2 times calling if free game winamount is zero --- optimize later*/
            _mediator.publish("START_AUTOSPIN",_ng.autoPlayPrevCount);
            _mediator.publish("updateAutoSpinText",true);
        }, 2000);
    }
}

gSC.triggerAllWinAnimation = async function () {

    //ToDo: remove if condition...
    if (this.model.spinData.getTotalWinAmount() > 0) {
        if (this.model.autoSpinData.getIsStopOnAnyWin()) {
            coreApp.gameModel.stopAutoSpins();
            _mediator.publish("cancelAutoSpin");
        }
        coreApp.gameController.allReelsStopped = true;
        if(this.model.isBigWinActive()) {
            await this.view.playCanonWin();
            _mediator.publish("showBigWins");
        }
        else{
            _mediator.publish("onTotalWinShown");
        }
        
    }

}

gSC.quickSpinInfoOnSpaceBar = function () {
    
    if( _viewInfoUtil.device == "Mobile" || coreApp.gameModel.isAutoSpinActive() ||
        coreApp.gameModel.isFreeSpinActive() || _ng.BuyFSenabled || _ng.GameConfig.superBuyEnabled  || coreApp.gameModel.getIsPFSActive()) {
        return;
     }
        
    this.spaceBarClickCount++; 
    
    if(this.spaceBarClickCount == 12) {
        clearInterval(this.spaceBarClickInterval);
        _ng.GameConfig.quickSpinInfoTriggered = true;
    }
}

gSC.enableMobilePanel = function () {
    /** checking the spin button panel is visible or not on mobile mode.
     * 
    */
    if (_viewInfoUtil.device == "Mobile") {

        // Don't enable panel if PFS is active or ended
        if(this.model.getIsPFSActive() || this.model.getIsPFSEnded())
            return
        
        var status = (coreApp.gameModel.isFreeSpinActive() ? "freeSpin" : "normal");
    }
    switch (status) {
        case "freeSpin":
            return;
            break;
        case "normal":
            if(!coreApp.gameModel.isAutoSpinActive() && coreApp.gameModel.obj.current_round.spin_type != "freespin"){
                _mediator.publish("EnablePanel");
            }
            break;
        default:
            break;
    }
}

/*FOR CHANGING containerBg
    isFreespin = false - on BaseGame
    isFreespin = true - on  FreeGame
*/
gSC.changeContainerBg = function (isFreespin) {
 
    if (desktopFullScreen == false || desktopFullScreen == "false") {
        var elm = document.getElementById("containerbg");
        elm.src = appPath + "games/" + gameName + "/dist/" + (isFreespin ? "containerfg.jpg" : "containerbg.jpg");
        elm.width = "100%";
        elm.height = "100%";
    }
}

gSC.checkAndContinue = function() {
    if (!this.awaitingExtraFsAck) {
        if (coreApp.gameModel.isAutoSpinActive() && this.model.autoSpinCount > 0) {
            // If in auto-spin mode, trigger the next spin directly
            this.model.autoSpinCount--;
            _mediator.publish("onSpinClickHandler", false);
        } else {
            if(!coreApp.gameModel.isBigWinActive())
             this.callNextGameState();
            
        }
    }
};

////////////////////////////////////////////////////////////////
gSC.onAllTumblesComplete = function(){
    this.triggerAllWinAnimation();

    this.enableMobilePanel();
    // _mediator.publish("checkAndLand");

    if (coreApp.gameModel.isAutoSpinActive()) {
        _mediator.publish("ToggleMobPanel", false);
        _mediator.publish("ToggleSpin", false);
    }

    if (coreApp.gameModel.isFullFSActive()) {
        _mediator.publish("ToggleMobPanel", false);
        _mediator.publish("ToggleSpin", false);
    }

    if (!coreApp.gameModel.isAutoSpinActive() && !coreApp.gameModel.isFullFSActive()) {
        // Don't enable spin if PFS is active or ended
        var isPFR = this.model.getIsPFSActive && (this.model.getIsPFSActive() || this.model.getIsPFSEnded && this.model.getIsPFSEnded());
        if (!isPFR) {
            _mediator.publish("ToggleSpin", true);
        }
    }

    if (coreApp.gameModel.obj.current_round.spin_type != "freespin") {
        // setTimeout(() => {
           _mediator.publish(_events.slot.updateBalance);
       // }, 600);
    }

    // if (!coreApp.gameModel.isFullFSActive() && !coreApp.gameModel.getIsPFSActive()) {
    //     _mediator.publish("enableBuyFeature");
    //     _mediator.publish("checkBalanceForBuyFeature");
    // }
}

gSC.showTumbleWin = function (currentIndex) {
    _mediator.publish("TumbleWin", this.winArr, currentIndex, this.newArray);
    _mediator.publish("AddHistBox",currentIndex ,this.winHisArr,this.symbolpop,this.histSymbol);

}

gSC.checkExtraFreeSpinAward = function (){
    if (coreApp.gameModel.obj.current_round.post_matrix_info.extra_fs) {
        this.pendingExtraFs = true;
    }
}




// --- Consolidated Exports & Aliases ---
_ng.GSlotController = _ng.SlotController;
if (typeof SlotController === "undefined") { SlotController = _ng.SlotController; }
if (typeof GSlotController === "undefined") { GSlotController = _ng.SlotController; }
