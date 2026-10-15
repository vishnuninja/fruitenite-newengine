// ============================================================================
// Consolidated Parent (CyprusInfoPopupView.js) and Child (GInfoPopupView.js)
// Base Class Definition & Implementation
// ============================================================================
function InfoPopupView(gameView) {
  this.gameView = coreApp.gameView;
  this.hideInfoEventType = "";
  this.hideInfoDelay = 0;
  this.rcTotalTime = 0;
  this.rcpTimeout = _ng.GameConfig.realityCheck.timeOut;
  this.rcpIsFirstDisplay = true;

  if (pixiLib.getUrlVar("rcpTimer") !== undefined) {
    var timer = pixiLib.getUrlVar("rcpTimer");
    timer = parseFloat(timer);
    if (!isNaN(timer) && timer > 0) {
      this.rcpTimeout = timer;
    }
  }
  this.rcpTimeElapsed = this.rcpTimeout;    //Show RCP popup after this time only for first times
  if (pixiLib.getUrlVar("rcpTimeElapsed") !== undefined) {
    var elapsedTimer = pixiLib.getUrlVar("rcpTimeElapsed");
    elapsedTimer = parseFloat(elapsedTimer);
    if (!isNaN(elapsedTimer) && elapsedTimer > 0) {
      this.rcpTimeElapsed = elapsedTimer;
    }
  }


  ViewContainer.call(this);
  this.addSubscription();
  this.createRealityCheckPopup();
  this.startRealityInterval();

  this.timer = 0;
}

InfoPopupView.prototype = Object.create(ViewContainer.prototype);
InfoPopupView.prototype.constructor = InfoPopupView;

var view = InfoPopupView.prototype;

view.addSubscription = function () {
  _mediator.subscribe("showRealityCheckPopup", this.showRealityCheckPopup.bind(this));
  _mediator.subscribe("showFreeSpinAwarded", this.showFreeSpinAwarded.bind(this));
  _mediator.subscribe("showFreeSpinEnded", this.showFreeSpinEnded.bind(this));
  _mediator.subscribe(_events.core.onResize, this.onViewResize.bind(this));
  _mediator.subscribe("showBonusAwardedMsg", this.onShowBonusAward.bind(this));
  _mediator.subscribe("showBonusWinMsg", this.onShowBonusWin.bind(this));
  //error messages
  _mediator.subscribe("showErrorMsg", this.onShowErrorMsg.bind(this));
  //Spacebar Events
  _mediator.subscribe("hideInfoPopup", this.hideInfoPopup.bind(this, this.hideInfoEventType, this.hideInfoDelay));
  _mediator.subscribe("onFSContinueClick", this.onFSContinueClick.bind(this));
  _mediator.subscribe("onBonusAwardContinueClick", this.onBonusAwardContinueClick.bind(this));
  _mediator.subscribe("onBonusWinContinueClick", this.onBonusWinContinueClick.bind(this));
  _mediator.subscribe("onFsCloseHandler", this.onFsCloseHandler.bind(this));
  _mediator.subscribe("gotolobby", this.gotoLobby.bind(this));
  _mediator.subscribe("showFreeSpinEndedZeroBalance", this.showFreeSpinEndedZeroBalance.bind(this));

  //FOR PFS

};
view.showFreeSpinEndedZeroBalance = function (events) {
  _sndLib.play(_sndLib.sprite.fsWinPopup);

  var fsPopupConfig = _ng.GameConfig.infoPopupView.errorPopup;
  this.fsEndTextStyle = fsPopupConfig.descriptionText.textStyle;

  this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
  this.grayBg.alpha = 0.6;
  this.grayBg.name = "grayBg";
  this.grayBg.interactive = true;
  coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

  this.popupParent = pixiLib.getElement();
  this.addChild(this.popupParent);

  var fsEndedScreen = pixiLib.getElement("Sprite", fsPopupConfig.background.bgImage);
  this.popupParent.addChild(fsEndedScreen);
  pixiLib.setProperties(fsEndedScreen, fsPopupConfig.background.props);

  var descriptionText = pixiLib.getElement("Text", fsPopupConfig.descriptionText.textStyle);
  pixiLib.setText(descriptionText, "Hope you have better luck next time");
  this.popupParent.addChild(descriptionText);
  pixiLib.setProperties(descriptionText, fsPopupConfig.descriptionText.props);

  var continueBtn = pixiLib.getButton(fsPopupConfig.continueButton.bgImage, fsPopupConfig.continueButton.options);
  this.popupParent.addChild(continueBtn);
  pixiLib.setProperties(continueBtn, fsPopupConfig.continueButton.props);

  setTimeout(function () {
    //Adding timeout so popup will be shown fully then enable spacebar
    _mediator.publish("setSpaceBarEvent", "onFsCloseHandler");
  }, 500);
  pixiLib.addEvent(continueBtn, this.onFsCloseHandler.bind(this));
  _ngFluid.call(this, fsPopupConfig.params);

  this.onViewResize();
  this.showInfoPopup();
}
view.onShowBonusAward = function (str) {
  var fsPopupConfig = _ng.GameConfig.infoPopupView.bonusAwardPopup || _ng.GameConfig.infoPopupView.freeSpinPopup;

  this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
  this.grayBg.alpha = 0.6;
  this.grayBg.interactive = true;
  coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

  this.popupParent = pixiLib.getElement();
  this.addChild(this.popupParent);

  var fsAwardedScreen = pixiLib.getElement("Sprite", fsPopupConfig.background.bgImage);
  this.popupParent.addChild(fsAwardedScreen);
  pixiLib.setProperties(fsAwardedScreen, fsPopupConfig.background.props);

  this.descriptionText = pixiLib.getElement("Text", fsPopupConfig.descriptionText.textStyle);
  pixiLib.setText(this.descriptionText, str);
  this.popupParent.addChild(this.descriptionText);

  //Both Bonus Winning popup and FS win popup are using same config
  //In case description Text's props are different for both use bonusProps for Bonus popup and props for FS Popup
  if (fsPopupConfig.descriptionText.bonusProps) {
    pixiLib.setProperties(this.descriptionText, fsPopupConfig.descriptionText.bonusProps);
  } else {
    pixiLib.setProperties(this.descriptionText, fsPopupConfig.descriptionText.props);
  }

  var continueBtn = pixiLib.getButton(fsPopupConfig.continueButton.bgImage, fsPopupConfig.continueButton.options);
  this.popupParent.addChild(continueBtn);
  pixiLib.setProperties(continueBtn, fsPopupConfig.continueButton.props);

  setTimeout(function () {
    //Adding timeout so popup will be shown fully then enable spacebar
    _mediator.publish("setSpaceBarEvent", "onBonusAwardContinueClick");
  }, 500);
  pixiLib.addEvent(continueBtn, this.onBonusAwardContinueClick.bind(this));
  _ngFluid.call(this, fsPopupConfig.params);

  this.onViewResize();
  this.showInfoPopup();
  // _sndLib.play(_sndLib.sprite.bonusPopup);
  _sndLib.play(_sndLib.sprite.bonusPopup);
};

view.onBonusAwardContinueClick = function () {
  this.hideInfoEventType = "showBonusGame";
  this.hideInfoDelay = 0;
  this.hideInfoPopup("showBonusGame");
};
view.onShowBonusWin = function (str) {
  _sndLib.play(_sndLib.sprite.bonusPopup);
  var fsPopupConfig = _ng.GameConfig.infoPopupView.bonusWinPopup || _ng.GameConfig.infoPopupView.freeSpinPopup;

  this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
  this.grayBg.alpha = 0.6;
  this.grayBg.interactive = true;
  coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

  this.popupParent = pixiLib.getElement();
  this.addChild(this.popupParent);

  var fsAwardedScreen = pixiLib.getElement("Sprite", fsPopupConfig.background.bgImage);
  this.popupParent.addChild(fsAwardedScreen);
  pixiLib.setProperties(fsAwardedScreen, fsPopupConfig.background.props);

  this.descriptionText = pixiLib.getElement("Text", fsPopupConfig.descriptionText.textStyle);
  pixiLib.setText(this.descriptionText, str);
  this.popupParent.addChild(this.descriptionText);

  //Both Bonus Winning popup and FS win popup are using same config
  //In case description Text's props are different for both use bonusProps for Bonus popup and props for FS Popup
  if (fsPopupConfig.descriptionText.bonusProps) {
    pixiLib.setProperties(this.descriptionText, fsPopupConfig.descriptionText.bonusProps);
  } else {
    pixiLib.setProperties(this.descriptionText, fsPopupConfig.descriptionText.props);
  }

  var continueBtn = pixiLib.getButton(fsPopupConfig.continueButton.bgImage, fsPopupConfig.continueButton.options);
  this.popupParent.addChild(continueBtn);
  pixiLib.setProperties(continueBtn, fsPopupConfig.continueButton.props);

  setTimeout(function () {
    //Adding timeout so popup will be shown fully then enable spacebar
    _mediator.publish("setSpaceBarEvent", "onBonusWinContinueClick");
  }, 500);
  pixiLib.addEvent(continueBtn, this.onBonusWinContinueClick.bind(this));
  _ngFluid.call(this, fsPopupConfig.params);

  this.onViewResize();
  this.showInfoPopup();
};

view.onBonusWinContinueClick = function () {
  this.hideInfoEventType = "closeBonus";
  this.hideInfoDelay = 0;
  this.hideInfoPopup("closeBonus");
};

view.onShowErrorMsg = function (str, eventType, isUnfinished) {
  var fsPopupConfig = _ng.GameConfig.infoPopupView.errorPopup;

  this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
  this.grayBg.alpha = 0.95;
  this.grayBg.interactive = true;
  coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

  this.popupParent = pixiLib.getElement();
  this.addChild(this.popupParent);

  var fsAwardedScreen = pixiLib.getElement("Sprite", fsPopupConfig.background.bgImage);
  this.popupParent.addChild(fsAwardedScreen);
  pixiLib.setProperties(fsAwardedScreen, fsPopupConfig.background.props);

  this.descriptionText = pixiLib.getElement("Text", fsPopupConfig.descriptionText.textStyle);
  pixiLib.setText(this.descriptionText, str);
  this.popupParent.addChild(this.descriptionText);
  pixiLib.setProperties(this.descriptionText, fsPopupConfig.descriptionText.props);

  var continueBtn = pixiLib.getButton(fsPopupConfig.continueButton.bgImage, fsPopupConfig.continueButton.options);
  this.popupParent.addChild(continueBtn);
  pixiLib.setProperties(continueBtn, fsPopupConfig.continueButton.props);

  var continueText = pixiLib.getElement("Text", fsPopupConfig.continueText.textStyle);
  continueBtn.addChild(continueText);
  pixiLib.setProperties(continueText, fsPopupConfig.continueText.props);
  pixiLib.setText(continueText, gameLiterals.continueText);

  eventType = eventType ? eventType : "nothing";
  this.hideInfoEventType = eventType;
  this.hideInfoDelay = 0;
  setTimeout(function () {
    //Adding timeout so popup will be shown fully then enable spacebar
    _mediator.publish("setSpaceBarEvent", "hideInfoPopup");
  }, 500);
  pixiLib.addEvent(continueBtn, this.hideInfoPopup.bind(this, eventType));
  _ngFluid.call(this, fsPopupConfig.params);
  _mediator.publish("setSpaceBarEvent", "idle");

  this.addAdditionalMessage();
  this.onViewResize();
  this.showInfoPopup();
  if (isUnfinished) {
    _sndLib.play(_sndLib.sprite.showPopup);
  } else {
    _sndLib.play(_sndLib.sprite.errorPopup);
  }
};
view.addAdditionalMessage = function () { };

view.createView = function (argument) { };

view.showFreeSpinAwarded = function (numSpins, nextAction) {
  _sndLib.play(_sndLib.sprite.fsAwardPopup);
  this.nextAction = nextAction;
  var fsPopupConfig = _ng.GameConfig.infoPopupView.freeSpinPopup;
  var numSpins = Number.isInteger(parseInt(numSpins)) ? numSpins : coreApp.gameModel.getTotalFSTriggered();

  this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
  this.grayBg.alpha = 0.6;
  this.grayBg.interactive = true;
  coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

  this.popupParent = pixiLib.getElement();
  this.addChild(this.popupParent);

  var fsAwardedScreen = pixiLib.getElement("Sprite", fsPopupConfig.background.bgImage);
  this.popupParent.addChild(fsAwardedScreen);
  pixiLib.setProperties(fsAwardedScreen, fsPopupConfig.background.props);

  this.descriptionText = pixiLib.getElement("Text", fsPopupConfig.descriptionText.textStyle);
  var mText = pixiLib.getLiteralText(fsPopupConfig.descriptionText.text);
  mText = numSpins + " " + mText;
  pixiLib.setText(this.descriptionText, mText);
  this.popupParent.addChild(this.descriptionText);
  pixiLib.setProperties(this.descriptionText, fsPopupConfig.descriptionText.props);

  var continueBtn = pixiLib.getButton(fsPopupConfig.continueButton.bgImage, fsPopupConfig.continueButton.options);
  this.popupParent.addChild(continueBtn);
  pixiLib.setProperties(continueBtn, fsPopupConfig.continueButton.props);

  setTimeout(function () {
    //Adding timeout so popup will be shown fully then enable spacebar
    _mediator.publish("setSpaceBarEvent", "onFSContinueClick");
  }, 500);
  pixiLib.addEvent(continueBtn, this.onFSContinueClick.bind(this));
  _ngFluid.call(this, fsPopupConfig.params);

  this.onViewResize();
  this.showInfoPopup();
};

view.showInfoPopup = function () {
  this.popupParent.scale.set(0);
  this.grayBg.alpha = 0;
  TweenMax.to(this.grayBg, 0.3, { alpha: 0.6 });

  if (this.container) {
    this.addChild(this.container);
  }

  TweenMax.to(this.popupParent.scale, 0.3, { x: 1, y: 1, ease: Back.easeOut.config(1.5) });
};

view.onFSContinueClick = function () {
  if (this.nextAction == "closeBonus") {
    _mediator.publish("closeBonus");
  }
  //If Freespins are Re-Triggered, don't show starting Freespins message in Ticker
  if (coreApp.gameModel.getTotalFSTriggered() == coreApp.gameModel.getTotalFreeSpins()) {
    _mediator.publish("SHOW_TICKER_MESSAGE", gameLiterals.startfree);
    _mediator.publish("SHOW_TICKER");
  }
  this.hideInfoEventType = "startFreeSpins";
  this.hideInfoDelay = 500;
  this.hideInfoPopup("startFreeSpins", 500);
};

view.hideInfoPopup = function (eventToPublish, delay) {
  _sndLib.play(_sndLib.sprite.hidePopup);
  TweenMax.to(this.grayBg, 0.3, { alpha: 0 });
  TweenMax.to(this.popupParent.scale, 0.3, {
    x: 0,
    y: 0,
    onComplete: function () {
      this.popupParent.destroy();
      delete this.popupParent;

      this.grayBg.destroy();
      delete this.grayBg;
      if (this.hideInfoEventType) {
        setTimeout(
          function () {
            _mediator.publish(this.hideInfoEventType);
          }.bind(this),
          this.hideInfoDelay
        );
      }
    }.bind(this)
  });
};

view.showFreeSpinEnded = function () {
  _sndLib.play(_sndLib.sprite.fsWinPopup);

  var winAmount = coreApp.gameModel.getTotalFSWin();
  var fsPopupConfig = _ng.GameConfig.infoPopupView.freeSpinEndPopup;
  this.fsEndTextStyle = fsPopupConfig.descriptionText.textStyle;

  this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
  this.grayBg.alpha = 0.6;
  this.grayBg.name = "grayBg";
  this.grayBg.interactive = true;
  coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

  this.popupParent = pixiLib.getElement();
  this.addChild(this.popupParent);

  var fsEndedScreen = pixiLib.getElement("Sprite", fsPopupConfig.background.bgImage);
  this.popupParent.addChild(fsEndedScreen);
  pixiLib.setProperties(fsEndedScreen, fsPopupConfig.background.props);

  var winAmountTxt = pixiLib.getElement("Text", fsPopupConfig.fsWinValue.textStyle);
  this.popupParent.addChild(winAmountTxt);
  pixiLib.setProperties(winAmountTxt, fsPopupConfig.fsWinValue.props);
  pixiLib.setText(winAmountTxt, pixiLib.getFormattedAmount(winAmount));

  var descriptionText = pixiLib.getElement("Text", fsPopupConfig.descriptionText.textStyle);
  pixiLib.setText(descriptionText, fsPopupConfig.descriptionText.text);
  this.popupParent.addChild(descriptionText);
  pixiLib.setProperties(descriptionText, fsPopupConfig.descriptionText.props);

  var continueBtn = pixiLib.getButton(fsPopupConfig.continueButton.bgImage, fsPopupConfig.continueButton.options);
  this.popupParent.addChild(continueBtn);
  pixiLib.setProperties(continueBtn, fsPopupConfig.continueButton.props);

  setTimeout(function () {
    //Adding timeout so popup will be shown fully then enable spacebar
    _mediator.publish("setSpaceBarEvent", "onFsCloseHandler");
  }, 500);
  pixiLib.addEvent(continueBtn, this.onFsCloseHandler.bind(this));
  _ngFluid.call(this, fsPopupConfig.params);

  this.onViewResize();
  this.showInfoPopup();
};

view.showSuperMeterPopup = function () {

  var smPopupConfig = _ng.GameConfig.infoPopupView.superMeterPopup;

  this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
  this.grayBg.alpha = 0.6;
  this.grayBg.name = "grayBg";
  this.grayBg.interactive = true;
  coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

  this.popupParent = pixiLib.getElement();
  this.addChild(this.popupParent);

  var bg = pixiLib.getElement("Sprite", smPopupConfig.background.bgImage);
  this.popupParent.addChild(bg);
  pixiLib.setProperties(bg, smPopupConfig.background.props);

  //  var contentValue = pixiLib.getElement("Text", smPopupConfig.contentValue.textStyle);
  // pixiLib.setText(contentValue, smPopupConfig.contentValue.text);

  var contentValue = pixiLib.getElement("Sprite", smPopupConfig.contentValue.bgImage);

  this.popupParent.addChild(contentValue);
  pixiLib.setProperties(contentValue, smPopupConfig.contentValue.props);

  var noButton = pixiLib.getButton(smPopupConfig.noButton.bgImage, smPopupConfig.noButton.options);
  this.popupParent.addChild(noButton);
  pixiLib.setProperties(noButton, smPopupConfig.noButton.props);
  
  var yesButton = pixiLib.getButton(smPopupConfig.yesButton.bgImage, smPopupConfig.yesButton.options);
  this.popupParent.addChild(yesButton);
  pixiLib.setProperties(yesButton, smPopupConfig.yesButton.props);

  setTimeout(function () {
    //Adding timeout so popup will be shown fully then enable spacebar
    _mediator.publish("setSpaceBarEvent", "onFsCloseHandler");
  }, 500);

  pixiLib.addEvent(noButton, this.onSmNoHandler.bind(this));
  pixiLib.addEvent(yesButton, this.onSmYesHandler.bind(this));
  _ngFluid.call(this, smPopupConfig.params);

  this.onViewResize();
  this.showInfoPopup();
};

view.onSmNoHandler = function () {
  this.hideInfoEventType = "onSMPopupShown";
  this.hideInfoDelay = 0;
  _sndLib.play(_sndLib.sprite.hidePopup);
  this.hideInfoPopup("onSMPopupShown");
};

view.onSmYesHandler = function () {

  _mediator.publish("SM_COLLECT")

  this.hideInfoEventType = "onSMPopupShown";
  this.hideInfoDelay = 0;
  _sndLib.play(_sndLib.sprite.hidePopup);
  this.hideInfoPopup("onSMPopupShown");
};


view.createRealityCheckPopup = function () {
  var realityCheckConfig = _ng.GameConfig.realityCheck;

  this.overlay = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
  this.overlay.alpha = 0.001;
  this.overlay.interactive = true;
  coreApp.gameView.popupContainer.addChildAt(this.overlay, 0);

  this.container = pixiLib.getElement();
  this.addChild(this.container);

  // var bg = pixiLib.getShape("rect", { w: 640, h: 300 });
  var bg = pixiLib.getElement("Sprite", realityCheckConfig.background.bgImage);
  this.container.addChild(bg);
  pixiLib.setProperties(bg, realityCheckConfig.background.props);

  this.container.contentTxt = pixiLib.getElement("Text", realityCheckConfig.contentTxt.textStyle);
  this.container.addChild(this.container.contentTxt);
  pixiLib.setProperties(this.container.contentTxt, realityCheckConfig.contentTxt.props);

  this.container.totalBetTxt = pixiLib.getElement("Text", realityCheckConfig.totalBetTxt.textStyle);
  this.container.addChild(this.container.totalBetTxt);
  pixiLib.setProperties(this.container.totalBetTxt, realityCheckConfig.totalBetTxt.props);

  this.container.totalWinTxt = pixiLib.getElement("Text", realityCheckConfig.totalWinTxt.textStyle);
  this.container.addChild(this.container.totalWinTxt);
  pixiLib.setProperties(this.container.totalWinTxt, realityCheckConfig.totalWinTxt.props);

  var closeBtn = pixiLib.getButton(realityCheckConfig.closeBtn.bgImage, realityCheckConfig.closeBtn.options);
  this.container.addChild(closeBtn);
  pixiLib.setProperties(closeBtn, realityCheckConfig.closeBtn.props);

  var continueBtn = pixiLib.getButton(realityCheckConfig.continueBtn.bgImage, realityCheckConfig.continueBtn.options);
  this.container.addChild(continueBtn);
  pixiLib.setProperties(continueBtn, realityCheckConfig.continueBtn.props);

  pixiLib.addEvent(closeBtn, this.onRCCloseHandler.bind(this));
  pixiLib.addEvent(continueBtn, this.onRCContinueHandler.bind(this));
  _ngFluid.call(this, realityCheckConfig.params);

  this.container.visible = false;
  this.overlay.visible = false;

  // setInterval(function () {
  //   this.rcTotalTime++;
  //   var mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.contentTxt.text);
  //   pixiLib.setText(this.container.contentTxt, mText.replace("%A1%", parseFloat(this.rcTotalTime.toFixed(2))));
  // }.bind(this), 1 * 60000);

};

view.startRealityInterval = function () {
  if (commonConfig.noRCPPopupMobile && _viewInfoUtil.device === "Mobile") {
    return;
  }
  if (commonConfig.noRCPPopupDesktop && _viewInfoUtil.device === "Desktop") {
    return;
  }
  this.realityInterval = setInterval(function () {
    this.rcpTimeElapsed = this.rcpTimeout;
    if (this.rcpIsFirstDisplay) {
      this.rcTotalTime = this.rcpTimeout;
      var mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.contentTxt.text);
      pixiLib.setText(this.container.contentTxt, mText.replace("%A1%", parseFloat(this.rcTotalTime.toFixed(2))));
      setInterval(function () {
        this.rcTotalTime++;
        var mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.contentTxt.text);
        pixiLib.setText(this.container.contentTxt, mText.replace("%A1%", parseFloat(this.rcTotalTime.toFixed(2))));
      }.bind(this), 1 * 60000);
    }
    _mediator.publish("showRealityCheckPopup");
    this.rcpIsFirstDisplay = false;
  }.bind(this), this.rcpTimeElapsed * 60000);

};

view.showRealityCheckPopup = function () {

  if (!_ng.GameConfig.realityCheck.isRealiyCheck) {
    return;
  }
  // this.rcPopupCount++;
  // setTimeout(function () {
  //     //Adding timeout so popup will be shown fully then enable spacebar
  //     _mediator.publish("setSpaceBarEvent", "onRCCloseHandler");
  // }, 500);
  coreApp.gameModel.isRealityCheckActive = true;
  clearInterval(this.realityInterval);
  this.onViewResize();
  if (!this.container.visible) {
    this.showPopup();
    // var mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.contentTxt.text);
    // pixiLib.setText(this.container.contentTxt, mText.replace("%A1%", parseFloat(this.rcTotalTime.toFixed(2))));

    var mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.totalBetTxt.text);
    if (mText.indexOf("%A1%") == -1) mText += " %A1%";
    var lossAmount  = (coreApp.gameModel.getAllTotalBet()-coreApp.gameModel.getAllTotalWin())

    lossAmount = lossAmount<0? 0 : lossAmount;

    pixiLib.setText(this.container.totalBetTxt, mText.replace("%A1%", pixiLib.getFormattedAmount(lossAmount)));

    mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.totalWinTxt.text);
    if (mText.indexOf("%A1%") == -1) mText += " %A1%";
    pixiLib.setText(this.container.totalWinTxt, mText.replace("%A1%", pixiLib.getFormattedAmount(coreApp.gameModel.getAllTotalWin())));
  }
};

view.showPopup = function () {
  _sndLib.play(_sndLib.sprite.showPopup);

  this.container.visible = true;
  this.overlay.visible = true;
  this.container.scale.set(0);
  this.overlay.alpha = 0;

  TweenMax.to(this.overlay, 0.3, { alpha: 0.6 });
  TweenMax.to(this.container.scale, 0.3, { x: 1, y: 1, ease: Back.easeOut.config(1.5) });
};

view.hidePopup = function () {
  _sndLib.play(_sndLib.sprite.btnClick);
  _sndLib.play(_sndLib.sprite.hidePopup);
  TweenMax.to(this.overlay, 0.3, { alpha: 0 });
  TweenMax.to(this.container.scale, 0.3, {
    x: 0, y: 0, onComplete: function () {
      this.overlay.visible = false;
      this.container.visible = false;
      this.startRealityInterval();
    }.bind(this)
  });
};

view.onRCCloseHandler = function () {
  this.hideInfoEventType = undefined;
  _sndLib.play(_sndLib.sprite.btnClick);
  coreApp.gameModel.isRealityCheckActive = false;
  this.hidePopup();
  this.gotoLobby();
};

view.gotoLobby = function () {
  _mediator.publish("openURL", { type: "lobby" });
}
view.onRCContinueHandler = function () {
  coreApp.gameModel.isRealityCheckActive = false;
  _sndLib.play(_sndLib.sprite.btnClick);
  this.hideInfoEventType = undefined;
  this.hidePopup();
};


view.onFsCloseHandler = function () {
  this.hideInfoEventType = "onFSEndShown";
  this.hideInfoDelay = 0;
  _sndLib.play(_sndLib.sprite.hidePopup);
  this.hideInfoPopup("onFSEndShown");
};

view.onViewResize = function () {
  if (this.grayBg) {
    this.grayBg.width = _viewInfoUtil.getWindowWidth();
    this.grayBg.height = _viewInfoUtil.getWindowHeight();

    // this.updateSize();
    this.setSize(0, 0);
  }
  if (this.overlay) {
    this.overlay.width = _viewInfoUtil.getWindowWidth();
    this.overlay.height = _viewInfoUtil.getWindowHeight();
    this.setSize(0, 0);
  }
};

/**************************************/
/*POPUP FOR PROMO FREE SPIN AWARDED*/
view.promoFreeSpinAwarded = function() {
 
  const yesButtonStyle = new PIXI.TextStyle({
      fontFamily: "Arial Black",
      fill: "#f8f7f7",
      fontSize: 24,
      fontWeight: "bolder"
  });

  const laterButtonStyle = new PIXI.TextStyle({
      fontFamily: "Arial Black",
      fontSize: 24,
      fontWeight: "bolder",
      align: "center",
  });

  const headingStyle = new PIXI.TextStyle({
      fontFamily: "Arial Black",
      fill: "#24a8eb",
      fontSize: 24,
      fontWeight: "bolder"
  });

  const infoStyle = new PIXI.TextStyle({
      fontFamily: "Tahoma",
      fill: "#f8f7f7",
      fontSize: 18,
      fontWeight: "bolder",
      align: "center",
  });

  const timeStyle = new PIXI.TextStyle({
      align: "center",
      fill: "#f7b21d",
      fontFamily: "Tahoma",
      fontSize: 24,
      fontWeight: "bolder",
  });

  this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
  this.grayBg.alpha = 0.6;
  this.grayBg.name = "grayBg";
  this.grayBg.interactive = true;
  coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

  this.promoPopup = pixiLib.getElement();
  this.promoPopup.name = "awardedPromoPopup";
  this.addChild(this.promoPopup);

  var bg = pixiLib.getElement("Sprite","popup_bg");
  bg.name = "bg";
  bg.anchor.set(0.5);
  bg.scale.set(0.8);
  this.promoPopup.addChild(bg);

  /*for YES BUTTON*/
  var yesButtonContainer = pixiLib.getElement();
  yesButtonContainer.name = "yesButtonContainer";
  yesButtonContainer.position.set(-118, 150);
  yesButtonContainer.scale.set(0.8);
  this.promoPopup.addChild(yesButtonContainer);

  var yesButton = pixiLib.getButton("Yes_btn");
  yesButton.name = "yesButton";
  yesButton.anchor.set(0.5);
  yesButtonContainer.addChild(yesButton);
  if(yesButton)
  pixiLib.addEvent(yesButton, this.onYesButtonClick.bind(this));  
  
  var yesButtonText = pixiLib.getElement("Text",yesButtonStyle);
  yesButtonText.name = "yesButtonText";
  yesButtonText.anchor.set(0.5);
  yesButtonText.text = gameLiterals.pfsYes;
  yesButtonContainer.addChild(yesButtonText);

  /*for USE LATER BUTTON*/
  var laterButtonContainer = pixiLib.getElement();
  laterButtonContainer.name = "laterButtonContainer";
  laterButtonContainer.scale.set(0.8);
  laterButtonContainer.position.set(121, 150);
  this.promoPopup.addChild(laterButtonContainer);

  var laterButton = pixiLib.getButton("Later_btn");
  laterButton.name = "laterButton";
  laterButton.anchor.set(0.5);
  laterButtonContainer.addChild(laterButton);
  pixiLib.addEvent(laterButton,this.onLaterButtonClick.bind(this));

  var laterButtonText = pixiLib.getElement("Text",laterButtonStyle);
  laterButtonText.name = "laterButtonText";
  laterButtonText.anchor.set(0.5);
  laterButtonText.text = gameLiterals.pfsUseLater;
  laterButtonContainer.addChild(laterButtonText);

  /*HEADING TEXT*/
  var headingText = pixiLib.getElement("Text",headingStyle);
  headingText.name = "headingText";
  headingText.anchor.set(0.5);
  headingText.position.set(0,-138);
  headingText.text = gameLiterals.headingText1.replace("XX",coreApp.gameModel.getTotalPFS());
  this.promoPopup.addChild(headingText);

  /*INFO TEXT
  IF YOU CHOOSE TO PLAY LATER, THE BONUS WILL BE AVAILABLE \nAGAIN WHEN YOU REOPEN THE GAME.
  */
  var infoText = pixiLib.getElement("Text",infoStyle);
  infoText.name = "infoText";
  infoText.anchor.set(0.5);
  infoText.position.set(0,-19);
  infoText.text = gameLiterals.PfsText2;
  this.promoPopup.addChild(infoText);

  /*INFO TEXT
  THIS BONUS IS AVAILABLE FOR
  */
  var bonusAvailText = pixiLib.getElement("Text",infoStyle);
  bonusAvailText.name = "bonusAvailText";
  bonusAvailText.anchor.set(0.5);
  bonusAvailText.position.set(0, 35);
  bonusAvailText.text = gameLiterals.PfsText3;
  this.promoPopup.addChild(bonusAvailText);

  /*TIME INFO TEXT
  23 HOURS 59 MINUTES
  */
  this.timeText = pixiLib.getElement("Text",timeStyle);
  this.timeText.name = "timeText";
  this.timeText.anchor.set(0.5);
  this.timeText.position.set(0, 73);
  this.timeText.text = gameLiterals.PfsDate;
  this.promoPopup.addChild(this.timeText);

  this.onViewResize();
}

/*use later button of PROMO FREESPIN AWARDED*/
view.onLaterButtonClick = function() {
  this.removeChild(this.promoPopup);
  coreApp.gameView.popupContainer.removeChild(this.grayBg);
  coreApp.gameModel.PFSData = new PromoFreeSpinModel();
  _ng.GameConfig.PFSUseLater = true;
  _mediator.publish("runGameInit");
  _mediator.publish("ToggleSpin",true);
}

/*yes button of PROMO FREESPIN AWARDED*/
view.onYesButtonClick = function(){
  this.removeChild(this.promoPopup);
  coreApp.gameView.popupContainer.removeChild(this.grayBg);
  _mediator.publish("runGameInit");
  coreApp.gameModel.updatePanelModelPFS(); /**pfs coin value,coin value index, current bet updation */
  _mediator.publish("showPromoView");   /*FOR SHOWING TOP STRIP*/

}

/*for closing PROMO FREESPIN AWARDED*/
view.closePromoFreeSpinAwarded = function() {
  this.removeChild(this.promoPopup);
  coreApp.gameView.popupContainer.removeChild(this.grayBg);
}

 /**************************************/
/*POPUP FOR PROMO FREE SPIN UNFINISHED*/
view.unfinishedPromoFreeSpin = function() {
 
  const headingStyle = new PIXI.TextStyle({
      fontFamily: "Arial Black",
      fill: "#24a8eb",
      fontSize: 24,
      fontWeight: "bolder",
      align: "center",
  });

  const laterButtonStyle = new PIXI.TextStyle({
      fontFamily: "Arial Black",
      fontSize: 24,
      fontWeight: "bolder"
  });

  const remainingSpinStyle = new PIXI.TextStyle({
      align: "center",
      fill: "#f7b21d",
      fontFamily: "Tahoma",
      fontSize: 90,
      fontWeight: "bolder",
  });

  this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
  this.grayBg.alpha = 0.6;
  this.grayBg.name = "grayBg";
  this.grayBg.interactive = true;
  coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

  this.promoPopup = pixiLib.getElement();
  this.promoPopup.name = "unFinishedPromoPopup";
  this.addChild(this.promoPopup);

  var bg = pixiLib.getElement("Sprite","popup_bg");
  bg.name = "bg";
  bg.anchor.set(0.5);
  bg.scale.set(0.8);
  this.promoPopup.addChild(bg);

  /*HEADING TEXT*/
  var headingText = pixiLib.getElement("Text",headingStyle);
  headingText.name = "headingText";
  headingText.anchor.set(0.5);
  headingText.position.set(0,-138);
  headingText.text = gameLiterals.pfsText7;
  this.promoPopup.addChild(headingText);

  /*for CONTINUE BUTTON*/
  var continueButtonContainer = pixiLib.getElement();
  continueButtonContainer.name = "continueButtonContainer";
  continueButtonContainer.scale.set(1);
  continueButtonContainer.position.set(0, 145);
  this.promoPopup.addChild(continueButtonContainer);

  var continueButton = pixiLib.getButton("Later_btn");
  continueButton.name = "continueButton";
  continueButton.anchor.set(0.5);
  continueButtonContainer.addChild(continueButton);
  pixiLib.addEvent(continueButton,this.unFinishedContinueButtonClick.bind(this));

  var continueButtonText = pixiLib.getElement("Text",laterButtonStyle);
  continueButtonText.name = "continueButtonText";
  continueButtonText.anchor.set(0.5);
  continueButtonText.text = gameLiterals.pfsText6;
  continueButtonContainer.addChild(continueButtonText);

  /*for REMAINING SPINS*/
  var remainingSpins = pixiLib.getElement("Text",remainingSpinStyle);
  remainingSpins.name = "remainingSpins";
  remainingSpins.anchor.set(0.5);
  remainingSpins.text = coreApp.gameModel.getRemainingPFS();
  this.promoPopup.addChild(remainingSpins);

  this.onViewResize();
}

view.unFinishedContinueButtonClick = function() {
  this.removeChild(this.promoPopup);
  coreApp.gameView.popupContainer.removeChild(this.grayBg);
  _mediator.publish("runGameInit");
  coreApp.gameModel.updatePanelModelPFS(); /**pfs coin value,coin value index, current bet updation */
  _mediator.publish("showPromoView");   /*FOR SHOWING TOP STRIP*/
}

 /*************************************/
/*POPUP FOR PROMO FREE SPIN REWARDED - end*/
view.promoFreeSpinRewarded = function() {
  const headingStyle = new PIXI.TextStyle({
      fontFamily: "Arial Black",
      fill: "#24a8eb",
      fontSize: 23,
      fontWeight: "bolder"
  });

  const laterButtonStyle = new PIXI.TextStyle({
      fontFamily: "Arial Black",
      fontSize: 24,
      fontWeight: "bolder"
  });

  const totalWinStyle = new PIXI.TextStyle({
      align: "center",
      fill: "#f2f0ee",
      fontFamily: "Tahoma",
      fontSize: 30,
      fontWeight: "bolder",
  });

  const totalWinValueStyle = new PIXI.TextStyle({
      align: "center",
      fill: "#f7b21d",
      fontFamily: "Tahoma",
      fontSize: 40,
      fontWeight: "bolder",
  });

  this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
  this.grayBg.alpha = 0.6;
  this.grayBg.name = "grayBg";
  this.grayBg.interactive = true;
  coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

  this.promoPopup = pixiLib.getElement();
  this.promoPopup.name = "unFinishedpromoPopup";
  this.addChild(this.promoPopup);

  var bg = pixiLib.getElement("Sprite","popup_bg");
  bg.name = "bg";
  bg.anchor.set(0.5);
  bg.scale.set(0.8);
  this.promoPopup.addChild(bg);

  /*HEADING TEXT*/
  var headingText = pixiLib.getElement("Text",headingStyle);
  headingText.name = "headingText";
  headingText.anchor.set(0.5);
  headingText.position.set(0,-138);
  headingText.text = gameLiterals.pfsText4;
  this.promoPopup.addChild(headingText);

  /*for CONTINUE BUTTON*/
  var continueButtonContainer = pixiLib.getElement();
  continueButtonContainer.name = "continueButtonContainer";
  continueButtonContainer.scale.set(1);
  continueButtonContainer.position.set(0, 145);
  this.promoPopup.addChild(continueButtonContainer);

  var continueButton = pixiLib.getButton("Later_btn");
  continueButton.name = "continueButton";
  continueButton.anchor.set(0.5);
  continueButtonContainer.addChild(continueButton);
  pixiLib.addEvent(continueButton,this.rewardedContinueClick.bind(this));

  var continueButtonText = pixiLib.getElement("Text",laterButtonStyle);
  continueButtonText.name = "continueButtonText";
  continueButtonText.anchor.set(0.5);
  continueButtonText.text = gameLiterals.pfsText6;
  continueButtonContainer.addChild(continueButtonText);

  /*TOTAL WIN TEXT*/
  var totalWinText = pixiLib.getElement("Text",totalWinStyle);
  totalWinText.name = "totalWinText";
  totalWinText.anchor.set(0.5);
  totalWinText.position.set(0, -44);
  totalWinText.text = gameLiterals.pfsText5;
  this.promoPopup.addChild(totalWinText);

  var totalWinValue = pixiLib.getElement("Text",totalWinValueStyle);
  totalWinValue.name = "totalWinValue";
  totalWinValue.anchor.set(0.5);
  totalWinValue.position.set(0, 18);
  this.promoPopup.addChild(totalWinValue);

  var totalWinAmount = coreApp.gameModel.getTotalPFSWin();
  totalWinValue.text =  pixiLib.getFormattedAmount(totalWinAmount);

  this.onViewResize();
  // While popup is visible, ensure spin is disabled on mobile too
  _mediator.publish("ToggleSpin", false);
  if (_viewInfoUtil.device === 'Mobile') {
    _mediator.publish("ToggleMobPanel", false);
  }
  // Mark PFSEnded in model so controllers keep spin hidden until this popup closes
  if (coreApp && coreApp.gameModel && coreApp.gameModel.PFSData) {
    coreApp.gameModel.PFSData.isPFSEnded = true;
  }
}

view.rewardedContinueClick = function() {
  this.removeChild(this.promoPopup);
  coreApp.gameView.popupContainer.removeChild(this.grayBg);
  coreApp.gameModel.PFSData.isPFSEnded = false;
  coreApp.gameModel.PFSData.isPFSActive = false;  // Now set to false when user clicks continue
  _mediator.publish("hidePromoView");   //TODO : DESTROY
  coreApp.gameModel.updatePanelModelPFS(); //Setting Previous Bet
  // Re-enable controls after closing
  _mediator.publish("EnablePanel");
  _mediator.publish("ToggleSpin", true);
  _mediator.publish("setSpaceBarEvent", "spinClick");
  // Re-enable ante bet and buy feature when PFR fully ends
  _mediator.publish("enableBuyFeature");
  _mediator.publish("enabledPanelFs");
  // Show autoplay button when PFR fully ends
  _mediator.publish("showAutoPlayButton");
}


/*for timer*/
view.startDateTimer = function() {

  // Example Unix timestamp received from the backend (in seconds)
  var backendTime = coreApp.gameModel.PFSData.endDateTime;

  const expirationTimestamp = backendTime; // Replace this with the actual timestamp from your backend

  this.expiryDate = new Date(expirationTimestamp * 1000); //

  // Start the timer
  this.timerId = setTimeout(this.step.bind(this));
  
}

// Update interval (1 second)
var interval = 1500; // ms
this.timerId; // to store the setTimeout ID

view.step = function() {

  // console.log("tshsgshgshs",this.step);
    var interval = 1500; // ms

    // Current time
    var currentTime = Date.now();
    
    
    // // Time left until expiry
    var timeRemaining = this.expiryDate - currentTime;
    
    if (timeRemaining <= 0) {
        console.log("Timer expired");
        clearTimeout(this.timerId);

        var combinedText = "0 Days 0 Hours 00 Minutes 00 Seconds ";
        this.updateTimerText(combinedText);
        return;
    }
    
    // Calculate remaining days, hours, minutes, and seconds
    var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    var hourshours = Math.floor((timeRemaining / (1000 * 60)) % 60);
    var seconds = Math.floor((timeRemaining / 1000) % 60);
      
    // console.log(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`);
    var combinedText = days + " Days " + hours + " Hours " + hourshours + " Minutes " + seconds + " Seconds ";
    this.updateTimerText(combinedText);

    // Set up the next step after 1 second
    this.timerId = setTimeout(() => this.step(), interval);
    // this.timerId;
}

view.updateTimerText = function(tempText) {
  if( this.timeText)
    this.timeText.text = tempText;
}

















// ============================================================================
// Game-Specific Extensions & Prototype Overrides (GInfoPopupView.js)
// ============================================================================
var view = InfoPopupView.prototype;

view.addSubscription = function () {
	_mediator.subscribe("showRealityCheckPopup", this.showRealityCheckPopup.bind(this));
	_mediator.subscribe("showFreeSpinAwarded", this.showFreeSpinAwarded.bind(this));
	_mediator.subscribe("showFreeSpinEnded", this.showFreeSpinEnded.bind(this));
	_mediator.subscribe(_events.core.onResize, this.onViewResize.bind(this));
	_mediator.subscribe("showBonusAwardedMsg", this.onShowBonusAward.bind(this));
	_mediator.subscribe("showBonusWinMsg", this.onShowBonusWin.bind(this));
	//error messages
	_mediator.subscribe("showErrorMsg", this.onShowErrorMsg.bind(this));
	//Spacebar Events
	_mediator.subscribe("hideInfoPopup", this.hideInfoPopup.bind(this, this.hideInfoEventType, this.hideInfoDelay));
	_mediator.subscribe("onFSContinueClick", this.onFSContinueClick.bind(this));
	_mediator.subscribe("onBonusAwardContinueClick", this.onBonusAwardContinueClick.bind(this));
	_mediator.subscribe("onBonusWinContinueClick", this.onBonusWinContinueClick.bind(this));
	_mediator.subscribe("onFsCloseHandler", this.onFsCloseHandler.bind(this));
	_mediator.subscribe("gotolobby", this.gotoLobby.bind(this));
	_mediator.subscribe("showFreeSpinEndedZeroBalance", this.showFreeSpinEndedZeroBalance.bind(this));
	_mediator.subscribe("buyFreeSpinPopup", this.buyFreeSpinPopup.bind(this));
	_mediator.subscribe("showGambleWindow", this.showGambleWindow.bind(this));
	_mediator.subscribe("buyFreeSuperSpinPopup", this.buyFreeSuperSpinPopup.bind(this));
	_mediator.subscribe("ExtraFSAwardpopup", this.ExtraFSAwardpopup.bind(this));
	_mediator.subscribe("closeBuyFSPopup", this.closeBuyFSPopup.bind(this));
	_mediator.subscribe("spinStart", this.closeBuyFSPopup.bind(this));
	_mediator.subscribe("WinExceededPopup", this.WinExceededPopup.bind(this));
	_mediator.subscribe("resizeBuypopup", this.resizeBuypopup.bind(this));
	_mediator.subscribe("setFsPlayedcnt", this.setFsPlayedcnt.bind(this));
	_mediator.subscribe("updateFreeSpinCost", this.updateFreeSpinCost.bind(this));
	_mediator.subscribe("updateSuperSpinCost", this.updateSuperSpinCost.bind(this));
	//bet adjustment 
	_mediator.subscribe("createTotalBetSelector", this.createTotalBetSelector.bind(this));
	_mediator.subscribe("updateSelectorContainerBet", this.updateSelectorContainerBet.bind(this));
	_mediator.subscribe("selectorPlusInteraction", this.selectorPlusInteraction.bind(this));
	_mediator.subscribe("selectorMinusInteraction", this.selectorMinusInteraction.bind(this));
	_mediator.subscribe("countExitForCongratulation", this.CountExit.bind(this));
	/*for quick spin info*/
	_mediator.subscribe("quickSpinInfoPopup", this.quickSpinInfoPopup.bind(this));
	_mediator.subscribe("closeQuickSpinInfo", this.closeQuickSpinInfo.bind(this));
	_mediator.subscribe("showHistoryModePopup", this.showHistoryModePopup.bind(this));
	//FOR PFS

	this.exceed = false;
	// this.onViewResize();

};
view.showFreeSpinAwarded = function (numSpins, nextAction) {
	this.isShowing_popup = true;

	_mediator.publish("CreateScatterWinAnim");
	setTimeout(() => {

		this.nextAction = nextAction;
        var awardedConfig = _ng.GameConfig.infoPopupView.freeSpinPopup;
		var numSpins = coreApp.gameModel.getTotalFreeSpins();
		
		this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
		this.grayBg.alpha = 0.2;
		this.grayBg.interactive = false;
		this.grayBg.buttonMode = false;
		coreApp.gameView.decoratorContainer.addChildAt(this.grayBg, 0);

		this.popupParent = pixiLib.getElement();
		this.addChild(this.popupParent);

		var fsAwarded = pixiLib.getElement("Spine", awardedConfig.background.bgImage);
        fsAwarded.name = "fsAwarded";
        fsAwarded.state.setAnimation(0, awardedConfig.background.inAnimation, false);
        this.popupParent.addChild(fsAwarded);
        pixiLib.setProperties(fsAwarded, awardedConfig.background.props);

        var text1 = pixiLib.getElement("Text", awardedConfig.text1.textStyle);
        text1.name = "text1";
        pixiLib.setText(text1, awardedConfig.text1.text);
        pixiLib.setProperties(text1, awardedConfig.text1.props);
        this.attachToSlot(fsAwarded, "congrad_10_text", text1);

        var text2 = pixiLib.getElement("Text", awardedConfig.text2.textStyle);
        text2.name = "text2";
        pixiLib.setText(text2, awardedConfig.text2.text);
        pixiLib.setProperties(text2, awardedConfig.text2.props);
        this.attachToSlot(fsAwarded, "congrad_10_text_2", text2);

        var text3 = pixiLib.getElement("Text", awardedConfig.text3.textStyle);
        text3.name = "text3";
        pixiLib.setText(text3, awardedConfig.text3.text);
        pixiLib.setProperties(text3, awardedConfig.text3.props);
        this.attachToSlot(fsAwarded, "press_text", text3);

        var text4 = pixiLib.getElement("Text", awardedConfig.text4.textStyle);
        text4.name = "text4";
        pixiLib.setText(text4, awardedConfig.text4.text);
        pixiLib.setProperties(text4, awardedConfig.text4.props);
        this.attachToSlot(fsAwarded, "press_text", text4);


        var fsValue = pixiLib.getElement("Text", awardedConfig.fsValue.textStyle);
        fsValue.name = "fsValue";
        pixiLib.setText(fsValue, numSpins);
        pixiLib.setProperties(fsValue, awardedConfig.fsValue.props);
        this.attachToSlot(fsAwarded, "congrad_10_summ", fsValue);

        fsAwarded.state.tracks[0].listener = {
            complete: (trackEntry) => {
                if (trackEntry.animation.name === awardedConfig.background.inAnimation) {
                    fsAwarded.state.setAnimation(0, awardedConfig.background.loopAnimation, true);
                    this.grayBg.interactive = true;
		            this.grayBg.buttonMode = true;
                }
            }
        }

		setTimeout(function () {
			//Adding timeout so popup will be shown fully then enable spacebar
			_mediator.publish("setSpaceBarEvent", "onFSContinueClick");
		}, 500);
	
		pixiLib.addEvent(this.grayBg,()=>{
			this.grayBg.interactive = false;
			this.grayBg.buttonMode = false;
			this.onFSContinueClick();
		})
		_ngFluid.call(this, awardedConfig.params);

		this.onViewResize();
		this.showInfoPopup();
		coreApp.CURRENTACTIVEPOPUP = "congratulations_awarded";

		//skipping the popup
		if (_ng.autoPlayBeforeFg == true) {
			// pixiLib.setInteraction(continueBtn, false);
			this.grayBg.interactive = false;
			this.grayBg.buttonMode = false;
			setTimeout(function () {
				_mediator.publish("onFSContinueClick");
			}, 1000);
		}

		_sndLib.play(_sndLib.sprite.fsAwardPopup);

	}, 2300);

};

view.hideInfoPopup = function (eventToPublish, delay) {
	_sndLib.play(_sndLib.sprite.hidePopup);
	var delay = 0 || delay;
	if (this.grayBg) {
		TweenMax.to(this.grayBg, 0.3, { alpha: 0 });
	}
	if (this.popupParent) {
		TweenMax.to(this.popupParent.scale, 0.3, {
			x: 0, y: 0,
			onComplete: function () {

				if (this.popupParent) {
					this.popupParent.destroy();
					delete this.popupParent;
				}

				if (this.grayBg) {
					this.grayBg.destroy();
					delete this.grayBg;
				}
				if (this.hideInfoEventType) {
					setTimeout(function () {
						_mediator.publish(this.hideInfoEventType);
					}.bind(this), this.hideInfoDelay);
				}
			}.bind(this)
		})
	}
};
view.counterWinAmount = function (th, startValue, obj, time) {
	const urlParams = new URLSearchParams(window.location.search);
	const roundId = urlParams.get('round_id');
	var endValue = (coreApp.gameModel.getTotalFSWin() / 100); //startValue + bonusValue;
	var initValue = startValue;
	var tempdif = endValue - initValue;
	var noOfSteps = time / 50;
	//endValue = parseFloat(endValue);
	var incrementer = tempdif / noOfSteps;
	var currentStep = 0;
	_sndLib.play(_sndLib.sprite.counterBigWinLoop);
	this.interVal = setInterval(function () {
		currentStep++;
		if (currentStep > noOfSteps) {
			clearInterval(this.interVal);
			_sndLib.stop(_sndLib.sprite.counterBigWinLoop);
			obj.text = pixiLib.getFormattedAmount(endValue * 100);

			if (roundId) {
				this.coinFlipReplaySimulation();
			}
		}
		else {
			var BoundedVal = (initValue + (currentStep * incrementer));
			obj.text = pixiLib.getFormattedAmount(BoundedVal * 100); //Math.round(initValue + (currentStep * incrementer));//
		}
	}.bind(this), 50);
};
view.showFreeSpinEnded = function () {
	coreApp.CURRENTACTIVEPOPUP = "congratulations_rewarded";
	// Check if round_id exists in URL params to determine if it's history/replay mode
	const urlParams = new URLSearchParams(window.location.search);
	const roundId = urlParams.get('round_id');

	/*reseting after free spin ended*/
	if (_ng.BuyFSenabled === true) {
		_ng.BuyFSenabled = false
	}
	if (_ng.GameConfig.superBuyEnabled === true) {
		_ng.GameConfig.superBuyEnabled = false
	}
	_mediator.publish("showNewMessage", "");
	_sndLib.play(_sndLib.sprite.fsWinPopup);
	var winAmount = coreApp.gameModel.getTotalFSWin();
	if ((this.exceed == false) && (Number(coreApp.gameModel.getTotalFSWin())) >= coreApp.gameModel.spinData.max_win_cap * (Number(coreApp.gameModel.getTotalBet()))) {
		console.log("win exceeded");
		this.WinExceededPopup((Number(coreApp.gameModel.getTotalBet())));
	}
	else {
		if (this.exceed) { this.exceed = false; }
		var fsPopupConfig = _ng.GameConfig.infoPopupView.freeSpinEndPopup;
		this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
		this.grayBg.alpha = 0.6;
		this.grayBg.interactive = true;
		this.grayBg.buttonMode = true;
		// pixiLib.addEvent(this.grayBg, this.onCollectButtonClick.bind(this,"collect"));
		coreApp.gameView.decoratorContainer.addChildAt(this.grayBg, 0);

		this.popupParent = pixiLib.getElement();
		this.addChild(this.popupParent);

		var fsRewarded = pixiLib.getElement("Spine", fsPopupConfig.background.bgImage);
		fsRewarded.name = "fsRewarded";
		fsRewarded.state.setAnimation(0, fsPopupConfig.background.inAnimation, false);
		this.popupParent.addChild(fsRewarded);
		pixiLib.setProperties(fsRewarded, fsPopupConfig.background.props);

		
		var text2 = pixiLib.getElement("Text", fsPopupConfig.text2.textStyle);
		text2.name = "text2";
		pixiLib.setText(text2, fsPopupConfig.text2.text);
		pixiLib.setProperties(text2, fsPopupConfig.text2.props);
		this.attachToSlot(fsRewarded, "congrad_10_text_2", text2);

		var text3 = pixiLib.getElement("Text", fsPopupConfig.text3.textStyle);
		text3.name = "text3";
		pixiLib.setText(text3, fsPopupConfig.text3.text);
		pixiLib.setProperties(text3, fsPopupConfig.text3.props);
		this.attachToSlot(fsRewarded, "press_text", text3);
		text3.text = text3.text.replace("XXXX", coreApp.gameModel.freeSpinData.totalFreeSpins);

		// var text4 = pixiLib.getElement("Text", fsPopupConfig.text4.textStyle);
		// text4.name = "text4";
		// pixiLib.setText(text4, fsPopupConfig.text4.text);
		// pixiLib.setProperties(text4, fsPopupConfig.text4.props);
		// this.attachToSlot(fsRewarded, "press_text", text4);


		
		this.winAmountTxt = pixiLib.getElement("Text", fsPopupConfig.winAmountTxt.textStyle);
		this.winAmountTxt.name = "winAmountTxt";
		pixiLib.setProperties(this.winAmountTxt, fsPopupConfig.winAmountTxt.props);
		this.attachToSlot(fsRewarded, "congrad_10_summ", this.winAmountTxt);

	
		
		this.endcontinueBtn = pixiLib.getButton(fsPopupConfig.continueButton.bgImage);
		this.attachToSlot(fsRewarded, "btn_1", this.endcontinueBtn);
		pixiLib.setProperties(this.endcontinueBtn, fsPopupConfig.continueButton.props);
		
		//Collect text
		var collectText = pixiLib.getElement("Text", fsPopupConfig.collectText.textStyle);
		this.endcontinueBtn.addChild(collectText);
		pixiLib.setProperties(collectText, fsPopupConfig.collectText.props);
		pixiLib.setText(collectText, gameLiterals.collectBtnText);
		
		this.doubleRewardBtn = pixiLib.getButton(fsPopupConfig.doubleButton.bgImage);
		this.attachToSlot(fsRewarded, "btn_2", this.doubleRewardBtn);
		pixiLib.setProperties(this.doubleRewardBtn, fsPopupConfig.doubleButton.props);
		if(coreApp.gameModel.getTotalFSWin() <= 0) pixiLib.setInteraction(this.doubleRewardBtn, false); //incase of 0
	
		
		
		var rewardText = pixiLib.getElement("Text", fsPopupConfig.rewardText.textStyle);
		this.doubleRewardBtn.addChild(rewardText);
		pixiLib.setProperties(rewardText, fsPopupConfig.rewardText.props);
		pixiLib.setText(rewardText, gameLiterals.doubleYourRewardText);

		if (roundId) {
			pixiLib.setInteraction(this.doubleRewardBtn, false);
			pixiLib.setInteraction(this.endcontinueBtn, false);
		}
		this.counterWinAmount(this, 0, this.winAmountTxt, 3000);

		fsRewarded.state.tracks[0].listener = {
            complete: (trackEntry) => {
                if (trackEntry.animation.name === fsPopupConfig.background.inAnimation) {
                    fsRewarded.state.setAnimation(0, fsPopupConfig.background.loopAnimation, true);
                }
            }
        }
		
		setTimeout(function () {
			//Adding timeout so popup will be shown fully then enable spacebar
			_mediator.publish("setSpaceBarEvent", "onFsCloseHandler");
		}, 3000);
		pixiLib.addEvent(this.endcontinueBtn, this.onCollectButtonClick.bind(this,"collect"));
		pixiLib.addEvent(this.doubleRewardBtn, this.on2XBtnClick.bind(this,"gamble"));
		_ngFluid.call(this, fsPopupConfig.params);

		this.onViewResize();
		this.showInfoPopup();

		/*skiping rewarded popup*/
		// this.skipFreeSpinRewarded();
	}
};

view.on2XBtnClick = function (action){
	this.CountExit(action);
}
view.onCollectButtonClick = function (action){
	var fsPopupConfig = _ng.GameConfig.infoPopupView.freeSpinEndPopup;
	_sndLib.stop(_sndLib.sprite.counterBigWinLoop);
	var winAmount = coreApp.gameModel.getTotalFSWin();
	if (this.interVal) {
		if (this.winAmountTxt.text === pixiLib.getFormattedAmount(winAmount)) { // if counting win amount is completed, close popup	
			this.doubleRewardBtn.interactive = false;
			this.endcontinueBtn.interactive = false; /* Prevent multiple click */

			clearInterval(this.interVal);
			_mediator.publish("sendCoinFlipReq", action, "empty", () => {

				this.onFsCloseHandler(action);
			});
		}
		else {
			clearInterval(this.interVal);
			pixiLib.setText(this.winAmountTxt, pixiLib.getFormattedAmount(winAmount));
			pixiLib.setProperties(this.winAmountTxt, fsPopupConfig.winAmountTxt.props);
		}
	}
		
}
view.CountExit = function (eventAction) {
	_sndLib.stop(_sndLib.sprite.counterBigWinLoop);
	var fsPopupConfig = _ng.GameConfig.infoPopupView.freeSpinEndPopup;

		var winAmount = coreApp.gameModel.getTotalFSWin();
		if (this.interVal) {
			if (this.winAmountTxt.text === pixiLib.getFormattedAmount(winAmount)) { // if counting win amount is completed, close popup
				this.doubleRewardBtn.interactive = false;
			    this.endcontinueBtn.interactive = false;/* Prevent multiple click */

				clearInterval(this.interVal);
				this.onFsCloseHandler(eventAction);
			}
			else {
				clearInterval(this.interVal);
				pixiLib.setText(this.winAmountTxt, pixiLib.getFormattedAmount(winAmount));
				pixiLib.setProperties(this.winAmountTxt, fsPopupConfig.winAmountTxt.props);
			}
		}
}

view.onFSContinueClick = function () {
	coreApp.CURRENTACTIVEPOPUP = "";
	_mediator.publish("ToggleTurbo", false);
	_mediator.publish("_hideAndShowOfTwoXButton", false);
	var fsCount = coreApp.gameModel.getTotalFreeSpins();
	if (this.nextAction == "closeBonus") {
		_mediator.publish("closeBonus");
	}
	//If Freespins are Re-Triggered, don't show starting Freespins message in Ticker
	if (coreApp.gameModel.getTotalFSTriggered() == coreApp.gameModel.getTotalFreeSpins()) {
		_mediator.publish("showNewMessage", "Starting Freespins");
		_mediator.publish("SHOW_TICKER");
	}
	_mediator.publish('showMultipler', 0);
	this.hideInfoEventType = "startFreeSpins";
	this.hideInfoDelay = 500;
	this.hideInfoPopup("startFreeSpins", 500);
};
view.onFsCloseHandler = function (eventType) {
	coreApp.CURRENTACTIVEPOPUP = "";
	_mediator.publish('showMultipler', 0);
	_mediator.publish("ToggleTurbo", true);
	// _mediator.publish("_hideAndShowOfTwoXButton", true);
	// _mediator.publish("enableBuyFeature");
	_mediator.publish("bringspinbtnback");
	_mediator.publish("UpdateWin", "");
	_mediator.publish(_events.slot.updateBalance);
	_mediator.publish("toggleTumbleBox", false);
	_mediator.publish("toggleFadeContainer", true);
	_mediator.publish("setSpaceBarEvent", "idle");
	this.hideInfoEventType =(eventType == "collect") ? "onFSEndShown" : "showGambleWindow";
	if(eventType == "onBackButtonClicked")
		this.hideInfoEventType = "showFreeSpinEnded"
	this.hideInfoDelay = 0;
	_sndLib.play(_sndLib.sprite.hidePopup);
	this.hideInfoPopup("onFSEndShown");
	_mediator.publish("SHOW_IDLE_MESSAGE");
	_mediator.publish("checkBalanceForBuyFeature");/* Added recently  */

	//TODO : try to implement with call next game state
	if(eventType == 'collect') {
		if(coreApp.gameModel.getIsPFSEnded()) {
			_mediator.publish("promoFreeSpinRewarded");
		}
	}
}

/* Latest code  */
view.buyFreeSpinPopup = function () {

    _sndLib.play(_sndLib.sprite.buypopup_open);

    var buyConfig = _ng.GameConfig.infoPopupView.buyConfig;

    this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
    this.grayBg.name = "grayBg";
    this.grayBg.alpha = 0.6;
    this.grayBg.interactive = true;
    coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

    this.popupParent = pixiLib.getElement();
    this.popupParent.name = "popupParent";
    this.addChild(this.popupParent);

    var buyPopup = pixiLib.getElement("Spine", buyConfig.background.bgImage);
    buyPopup.name = "buyPopup";
    buyPopup.state.setAnimation(0, buyConfig.background.inAnimation, false);
    this.popupParent.addChild(buyPopup);
    pixiLib.setProperties(buyPopup, buyConfig.background.props);

	this.buyButton = pixiLib.getButton(buyConfig.yesButton.bgImage);
	this.buyButton.name = "buyButton";
	 pixiLib.setProperties(this.buyButton, buyConfig.yesButton.props);
    this.attachToSlot(buyPopup, "yes_normal", this.buyButton);
	pixiLib.addEvent(this.buyButton, this.onBuyFeatureClick.bind(this));

	this.cancelFsButton = pixiLib.getButton(buyConfig.noButton.bgImage);
	this.cancelFsButton.name = "cancelFsButton";
	pixiLib.setProperties(this.cancelFsButton, buyConfig.noButton.props);
    this.attachToSlot(buyPopup, "no_normal", this.cancelFsButton);
	pixiLib.addEvent(this.cancelFsButton, this.buyFeatureCancelClicked.bind(this));
	pixiLib.addEvent(this.grayBg, this.buyFeatureCancelClicked.bind(this));

	this.freespinCost = pixiLib.getFormattedAmount(coreApp.gameModel.panelModel.totalBet * 100);


    // var text1 = pixiLib.getElement("Text", buyConfig.text1.textStyle);
    // text1.name = "text1";
    // pixiLib.setText(text1, buyConfig.text1.text);
    // pixiLib.setProperties(text1, buyConfig.text1.props);
    // this.attachToSlot(buyPopup, "text_1", text1);

    // var text2 = pixiLib.getElement("Text", buyConfig.text2.textStyle);
    // text2.name = "text2";
    // pixiLib.setText(text2, buyConfig.text2.text);
    // pixiLib.setProperties(text2, buyConfig.text2.props);
    // this.attachToSlot(buyPopup, "text_2", text2);

    this.amtTxt = pixiLib.getElement("Text", buyConfig.text3.textStyle);
    this.amtTxt.name = "amtTxt";
	let updatedText = gameLiterals.buy_feature_text1.replace("XZ", "10").replace("XY", this.freespinCost);
	// let updatedText = gameLiterals.buy_feature_text3.replace("XY", this.freespinCost);

    pixiLib.setText(this.amtTxt, updatedText);
    pixiLib.setProperties(this.amtTxt, buyConfig.text3.props);
    this.attachToSlot(buyPopup, "text_2", this.amtTxt);

    // var fsValue = pixiLib.getElement("Text", buyConfig.fsValue.textStyle);
    // fsValue.name = "fsValue";
    // pixiLib.setText(fsValue, buyConfig.fsValue.text);
    // pixiLib.setProperties(fsValue, buyConfig.fsValue.props);
    // this.attachToSlot(buyPopup, "text_4", fsValue);

    buyPopup.state.tracks[0].listener = {
        complete: (trackEntry) => {
            if (trackEntry.animation.name === buyConfig.background.inAnimation) {
                buyPopup.state.setAnimation(0, buyConfig.background.loopAnimation, true);
                this.cancelFsButton.interactive = true;
                this.buyButton.interactive = true;
				
            }
        }
    }

	pixiLib.addEvent(this.buyButton, this.onBuyFeatureClick.bind(this));


    _ngFluid.call(this, buyConfig.params);
}
view.buyFreeSuperSpinPopup = function () {

    _sndLib.play(_sndLib.sprite.buypopup_open);

    var superbuyConfig = _ng.GameConfig.infoPopupView.superbuyConfig;

    this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
    this.grayBg.name = "grayBg";
    this.grayBg.alpha = 0.6;
    this.grayBg.interactive = true;
    coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

    this.popupParent = pixiLib.getElement();
    this.popupParent.name = "popupParent";
    this.addChild(this.popupParent);

    var buyPopup = pixiLib.getElement("Spine", superbuyConfig.background.bgImage);
    buyPopup.name = "buyPopup";
    buyPopup.state.setAnimation(0, superbuyConfig.background.inAnimation, false);
    this.popupParent.addChild(buyPopup);
    pixiLib.setProperties(buyPopup, superbuyConfig.background.props);

	this.buyButton = pixiLib.getButton(superbuyConfig.yesButton.bgImage);
	this.buyButton.name = "buyButton";
	 pixiLib.setProperties(this.buyButton, superbuyConfig.yesButton.props);
    this.attachToSlot(buyPopup, "yes_normal", this.buyButton);
	pixiLib.addEvent(this.buyButton, this.superBuyFeatureClick.bind(this));

	this.cancelFsButton = pixiLib.getButton(superbuyConfig.noButton.bgImage);
	this.cancelFsButton.name = "cancelFsButton";
	pixiLib.setProperties(this.cancelFsButton, superbuyConfig.noButton.props);
    this.attachToSlot(buyPopup, "no_normal", this.cancelFsButton);
	pixiLib.addEvent(this.cancelFsButton, this.superBuyCancelClicked.bind(this));
	pixiLib.addEvent(this.grayBg, this.superBuyCancelClicked.bind(this));

	this.superBuyCost = pixiLib.getFormattedAmount(coreApp.gameModel.panelModel.totalBet * coreApp.gameModel.spinData.superBuyfg);

    this.superBuyDescription = pixiLib.getElement("Text", superbuyConfig.text1.textStyle);
    this.superBuyDescription.name = "superBuyDescription";
	let updatedText = gameLiterals.super_buy_feature_text1.replace("XW", "10").replace("XY", "20X").replace("XZ", this.superBuyCost);

    pixiLib.setText(this.superBuyDescription, updatedText);
    pixiLib.setProperties(this.superBuyDescription, superbuyConfig.text1.props);
    this.attachToSlot(buyPopup, "text_2", this.superBuyDescription);

    buyPopup.state.tracks[0].listener = {
        complete: (trackEntry) => {
            if (trackEntry.animation.name === superbuyConfig.background.inAnimation) {
                buyPopup.state.setAnimation(0, superbuyConfig.background.loopAnimation, true);
                this.cancelFsButton.interactive = true;
                this.buyButton.interactive = true;
            }
        }
    }

	pixiLib.addEvent(this.buyButton, this.superBuyFeatureClick.bind(this));


    _ngFluid.call(this, superbuyConfig.params);
}
view.resizeBuypopup = function () {
	//Add positions here , for rotating vp to vl or vl to vp
}
view.closeBuyFSPopup = function () {
	if (this.BuypopupCon) {
		this.BuypopupCon.visible = false;
		this.BuypopupPanel.visible = false;
		this.grayBgbuy.visible = false;
	}
}

view.WinExceededPopup = function (totalBet) {

	if (this.winPopupPanel) {
		this.winPopupCon.visible = true;
		this.winPopupPanel.visible = true;
		this.grayWinPop.visible = true;
	}
	else {
		this.grayWinPop = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
		this.grayWinPop.alpha = 0.6;
		this.grayWinPop.interactive = true;
		this.grayWinPop.buttonMode = true;
		this.grayWinPop.scale.set(10);
		this.grayWinPop.x = -1000
		this.grayWinPop.y = -1000
		this.addChild(this.grayWinPop);

		this.winPopupPanel = pixiLib.getElement("Sprite", "limit_exceed_BG");
		this.addChild(this.winPopupPanel);
		this.winPopupPanel.name = "WinPanel";
		this.winPopupPanel.anchor.set(0.5);
		this.winPopupPanel.position.set(0, 0);
		this.winPopupPanel.scale.set(0.6)

		this.winPopupCon = pixiLib.getContainer();
		this.winPopupCon.name = "winPopupCon"
		this.winPopupCon.y = 302;
		this.addChild(this.winPopupCon);

		var style = {
			align: "center",
			fill: ["#FFFF33", "#ffc927", "#FFFF33"],
			fontFamily: "TTMastersDEMOBlack",
			fontSize: 36,
			stroke: "#8e4121",
			strokeThickness: 6,
			dropShadow: true,
			dropShadowColor: "#3E2723",
		}
		this.winExceed = pixiLib.getElement("Text", style);
		this.winExceed.anchor.set(0.5);
		this.winExceed.position.set(0, -390);

		let updatedText = gameLiterals.WinExceed_description.replace("XZ", coreApp.gameModel.spinData.max_win_cap + "X");
		pixiLib.setText(this.winExceed, updatedText);
		this.winPopupCon.addChild(this.winExceed);

		this.winAmountTxt = pixiLib.getElement("Text", style);
		this.winAmountTxt.anchor.set(0.5);
		this.winAmountTxt.position.set(0, -210);

		let updatedText1 = gameLiterals.WinExceedAmt.replace("XP", (pixiLib.getFormattedAmount(coreApp.gameModel.spinData.max_win_cap * totalBet)));
		pixiLib.setText(this.winAmountTxt, updatedText1);
		this.winPopupCon.addChild(this.winAmountTxt);

		if (coreApp.gameModel.obj.current_round.spin_type == "freespin") {
			pixiLib.addEvent(this.grayWinPop, function () {
				this.removeChild(this.winPopupCon);
				this.removeChild(this.winPopupPanel);
				this.removeChild(this.grayWinPop);
				this.exceed = true;
				this.showFreeSpinEnded();
			}.bind(this));
		}
		else {
			pixiLib.addEvent(this.grayWinPop, function () {

				// this.winPopupCon.visible = false;
				// this.winPopupPanel.visible = false;
				// this.grayWinPop.visible = false;
			}.bind(this));

		}
	}
}
view.BuyServerReq = function (type) {

	switch (type) {
		case "BuyFreeSpinContent":
			_ng.BuyFSenabled = true;
			_mediator.publish("callBuyFreeSpinRequest");
			break;
		case "SuperBuyContent":
			_ng.GameConfig.superBuyEnabled = true;
			_mediator.publish("callSuperBuyRequest");
			break;
		default:
			break;
	}
	_mediator.publish("spinStart");
}

view.ExtraFSAwardpopup = function (callback) {

	var extraFsConfig = _ng.GameConfig.infoPopupView.extraFsPopup;

	this.popupParent = pixiLib.getElement();
	this.addChild(this.popupParent);

	var backgroundScreen = pixiLib.getElement("Sprite", extraFsConfig.background.bgImage);
	backgroundScreen.name = "backgroundScreen";
  	this.popupParent.addChild(backgroundScreen);
  	pixiLib.setProperties(backgroundScreen, extraFsConfig.background.props);

	var descriptionText = pixiLib.getElement("Text", extraFsConfig.descriptionText.textStyle);
	descriptionText.name = "descriptionText";
	backgroundScreen.addChild(descriptionText);
	pixiLib.setProperties(descriptionText, extraFsConfig.descriptionText.props);

	var fsCount = coreApp.gameModel.obj.current_round.post_matrix_info.extra_fs;

	pixiLib.setText(descriptionText, "+" + fsCount + " " + gameLiterals.extraFreeSpinText);

	_ngFluid.call(this, extraFsConfig.params);

	const onComplete = () => {
		if (this.popupParent) {
			this.removeChild(this.popupParent);
			this.popupParent = null;
			_sndLib.stop(_sndLib.sprite.extra_fs);
			if (typeof callback === 'function') {
				callback();
			}
		}
	};
	setTimeout(onComplete, 3000); 
};

view.setFsPlayedcnt = function (value) {
	this.val = value;
	// if(this.TotalFSCount){
	//     pixiLib.setText(this.TotalFSCount, val);
	// }
}

//bet changing option for buy feature
view.createTotalBetSelector = function () {

	this.selectorContainer = pixiLib.getContainer();
	this.selectorContainer.name = "Panel Bet selectorContainer";
	this.addChild(this.selectorContainer);
	this.onSelectorResize();

	var style = {
		"fontStyle": "bold",
		"fontSize": 20,
		"fontFamily": "Arial",
		"lineJoin": "round",
		"fill": "#00C2FF",
		"stroke": '#391400',
		"strokeThickness": 9
	}
	this.betText = pixiLib.getElement("Text", style);
	this.selectorContainer.addChild(this.betText);
	this.betText.anchor.set(0.5);
	this.betText.position.set(0, -34);
	pixiLib.setText(this.betText, gameLiterals.totalbet);


	this.minusButton = pixiLib.getButton("betMinus");
	this.minusButton.anchor.set(0.5);
	this.minusButton.position.set(-90, 0);
	this.minusButton.scale.set(0.4);
	this.selectorContainer.addChild(this.minusButton);

	pixiLib.addEvent(this.minusButton, this.onMinusClick.bind(this));

	this.betBase = pixiLib.getElement("Sprite", "betValueBase");
	this.betBase.anchor.set(0.5);
	this.betBase.position.set(0, 0);
	this.betBase.scale.set(0.9);
	this.selectorContainer.addChild(this.betBase);

	var style1 = {
		"fill": "0xffffff",
		"fontSize": 25,
		"fontFamily": "ProximaNova_Bold"
	}

	this.selectorValue = pixiLib.getElement("Text", style1);
	this.betBase.addChild(this.selectorValue);
	this.selectorValue.anchor.set(0.5);
	this.selectorValue.position.set(0, 0);
	if (this.selectorValue)
		pixiLib.setText(this.selectorValue, coreApp.gameModel.getTotalBet());
	else
		pixiLib.setText(this.selectorValue, "1");

	this.plusButton = pixiLib.getButton("betPlus");
	this.plusButton.name = "plusButton";
	this.plusButton.anchor.set(0.5);
	this.plusButton.position.set(90, 0);
	this.plusButton.scale.set(0.4);
	this.selectorContainer.addChild(this.plusButton);
	pixiLib.setInteraction(this.plusButton, true);

	pixiLib.addEvent(this.plusButton, this.onPlusClick.bind(this));
	_mediator.publish("updateTotalBet");

}

view.updateSelectorContainerBet = function (value) {
	var betval = pixiLib.getFormattedAmount(value);
	if (this.selectorValue)
		pixiLib.setText(this.selectorValue, betval);
}

view.onPlusClick = function () {
	_mediator.publish("setIncrement");
	_mediator.publish("ToggleSpin", false);
}

view.onMinusClick = function () {
	_mediator.publish("setDecrement");
	_mediator.publish("ToggleSpin", false);
}

view.removeSelector = function () {
	if (this.selectorContainer.parent) {
		this.selectorContainer.parent.removeChild(this.selectorContainer);
	}
}

view.selectorPlusInteraction = function (value) {
	if (this.plusButton)
		pixiLib.setInteraction(this.plusButton, value);
}

view.selectorMinusInteraction = function (value) {
	if (this.minusButton)
		pixiLib.setInteraction(this.minusButton, value);
}

view.onSelectorResize = function () {
	if (this.selectorContainer) {
		if (_viewInfoUtil.viewType == "VL") {
			this.selectorContainer.position.set(0, 320);
			this.selectorContainer.scale.set(1.2);
			_mediator.publish("SHOW_TICKER_MESSAGE", "");
		}
		else if (_viewInfoUtil.viewType == "VD") {
			this.selectorContainer.position.set(0, 325);
			this.selectorContainer.scale.set(1);
			_mediator.publish("SHOW_TICKER_MESSAGE", "");
		}
		else {
			this.selectorContainer.position.set(0, 600);
			// this.selectorContainer.x = 0; this.selectorContainer.y = coreApp.gameView.panelContainer.children[12].y - 25;
			this.selectorContainer.scale.set(1.5);
			_mediator.publish("SHOW_TICKER_MESSAGE", "");
		}
	}
}

//for overwriting info popup y position

view.createRealityCheckPopup = function () {
	var realityCheckConfig = _ng.GameConfig.realityCheck;

	this.overlay = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
	this.overlay.alpha = 0.001;
	this.overlay.interactive = true;
	coreApp.gameView.popupContainer.addChildAt(this.overlay, 0);

	this.container = pixiLib.getElement();
	this.addChild(this.container);

	// var bg = pixiLib.getShape("rect", { w: 640, h: 300 });
	var bg = pixiLib.getElement("Sprite", realityCheckConfig.background.bgImage);
	this.container.addChild(bg);
	pixiLib.setProperties(bg, realityCheckConfig.background.props);

	this.container.contentTxt = pixiLib.getElement("Text", realityCheckConfig.contentTxt.textStyle);
	this.container.addChild(this.container.contentTxt);
	pixiLib.setProperties(this.container.contentTxt, realityCheckConfig.contentTxt.props);

	this.container.totalBetTxt = pixiLib.getElement("Text", realityCheckConfig.totalBetTxt.textStyle);
	this.container.addChild(this.container.totalBetTxt);
	pixiLib.setProperties(this.container.totalBetTxt, realityCheckConfig.totalBetTxt.props);

	this.container.totalWinTxt = pixiLib.getElement("Text", realityCheckConfig.totalWinTxt.textStyle);
	this.container.addChild(this.container.totalWinTxt);
	pixiLib.setProperties(this.container.totalWinTxt, realityCheckConfig.totalWinTxt.props);

	var closeBtn = pixiLib.getButton(realityCheckConfig.closeBtn.bgImage, realityCheckConfig.closeBtn.options);
	this.container.addChild(closeBtn);
	pixiLib.setProperties(closeBtn, realityCheckConfig.closeBtn.props);

	var continueBtn = pixiLib.getButton(realityCheckConfig.continueBtn.bgImage, realityCheckConfig.continueBtn.options);
	this.container.addChild(continueBtn);
	pixiLib.setProperties(continueBtn, realityCheckConfig.continueBtn.props);

	pixiLib.addEvent(closeBtn, this.onRCCloseHandler.bind(this));
	pixiLib.addEvent(continueBtn, this.onRCContinueHandler.bind(this));
	_ngFluid.call(this, realityCheckConfig.params);

	this.container.visible = false;
	this.overlay.visible = false;
	this.y = 330;

};

view.startRealityInterval = function () {
	if (commonConfig.noRCPPopupMobile && _viewInfoUtil.device === "Mobile") {
		return;
	}
	if (commonConfig.noRCPPopupDesktop && _viewInfoUtil.device === "Desktop") {
		return;
	}
	this.realityInterval = setInterval(function () {
		this.rcpTimeElapsed = this.rcpTimeout;
		if (this.rcpIsFirstDisplay) {
			this.rcTotalTime = this.rcpTimeout;
			var mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.contentTxt.text);
			pixiLib.setText(this.container.contentTxt, mText.replace("%A1%", parseFloat(this.rcTotalTime.toFixed(2))));
			setInterval(function () {
				this.rcTotalTime++;
				var mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.contentTxt.text);
				pixiLib.setText(this.container.contentTxt, mText.replace("%A1%", parseFloat(this.rcTotalTime.toFixed(2))));
			}.bind(this), 1 * 60000);
		}
		_mediator.publish("showRealityCheckPopup");
		this.rcpIsFirstDisplay = false;
	}.bind(this), this.rcpTimeElapsed * 60000);

};

view.showRealityCheckPopup = function () {

	if (!_ng.GameConfig.realityCheck.isRealiyCheck) {
		return;
	}
	coreApp.gameModel.isRealityCheckActive = true;
	clearInterval(this.realityInterval);
	this.onViewResize();
	if (!this.container.visible) {
		this.showPopup();
		var mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.totalBetTxt.text);
		if (mText.indexOf("%A1%") == -1) mText += " %A1%";
		var lossAmount = (coreApp.gameModel.getAllTotalBet() - coreApp.gameModel.getAllTotalWin())

		lossAmount = lossAmount < 0 ? 0 : lossAmount;

		pixiLib.setText(this.container.totalBetTxt, mText.replace("%A1%", pixiLib.getFormattedAmount(lossAmount)));

		mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.totalWinTxt.text);
		if (mText.indexOf("%A1%") == -1) mText += " %A1%";
		pixiLib.setText(this.container.totalWinTxt, mText.replace("%A1%", pixiLib.getFormattedAmount(coreApp.gameModel.getAllTotalWin())));
	}
};


view.onViewResize = function () {
	// console.log("🔄 [GInfoPopupView] onViewResize called - handling orientation change");
	if(this.backBtn){
		var gambleConfig = _ng.GameConfig.infoPopupView.gamblePopup;
		pixiLib.setProperties(this.backBtn, gambleConfig.backButton.props[_viewInfoUtil.viewType]);
	}

	// Update grayBg size if it exists (for congratulations popup and other popups)
	if (this.grayBg) {
		const newWidth = _viewInfoUtil.getWindowWidth();
		const newHeight = _viewInfoUtil.getWindowHeight();
		this.grayBg.width = newWidth;
		this.grayBg.height = newHeight;
		if (this.setSize) {
			this.setSize(0, 0);
		}
	}

	// Update mobile history mode popup if it's showing
	if (this.historyModePopupContainer && this.historyModePopupContainer.visible) {
		// console.log("🔄 [GInfoPopupView] Updating mobile history mode popup on resize");

		const actualWindowWidth = window.innerWidth || 375;
		const actualWindowHeight = window.innerHeight || 667;
		const isSmallScreen = actualWindowWidth <= 768;
		const isPortraitLayout = actualWindowWidth <= actualWindowHeight && isSmallScreen;

		// Update overlay size using stored reference
		if (this.historyModePopupOverlay && this.historyModePopupOverlay.width !== undefined) {
			this.historyModePopupOverlay.width = actualWindowWidth;
			this.historyModePopupOverlay.height = actualWindowHeight;
		} else if (this.historyModePopupContainer.children.length > 0) {
			// Fallback: use first child if reference not available
			const overlay = this.historyModePopupContainer.children[0];
			if (overlay && overlay.width !== undefined) {
				overlay.width = actualWindowWidth;
				overlay.height = actualWindowHeight;
			}
		}

		// Update content container position (centered) using stored reference
		if (this.historyModePopupContentContainer) {
			this.historyModePopupContentContainer.x = actualWindowWidth / 2;
			this.historyModePopupContentContainer.y = actualWindowHeight / 2;
		} else if (this.historyModePopupContainer.children.length > 1) {
			// Fallback: use second child if reference not available
			const contentContainer = this.historyModePopupContainer.children[1];
			if (contentContainer) {
				contentContainer.x = actualWindowWidth / 2;
				contentContainer.y = actualWindowHeight / 2;
			}
		}

		// console.log("🔄 [GInfoPopupView] Mobile history popup updated:", {
		// 	width: actualWindowWidth,
		// 	height: actualWindowHeight,
		// 	isPortrait: isPortraitLayout,
		// 	viewType: _viewInfoUtil ? _viewInfoUtil.viewType : "VD",
		// 	orientation: _viewInfoUtil ? _viewInfoUtil.orientation : "unknown"
		// });
	}

	// Update overlay for other popups (reality check, etc.)
	if (this.overlay) {
		this.overlay.width = _viewInfoUtil.getWindowWidth();
		this.overlay.height = _viewInfoUtil.getWindowHeight();
		if (this.setSize) {
			this.setSize(0, 0);
		}
	}
	this.onSelectorResize();
	// console.log("🔄 [GInfoPopupView] onViewResize completed - viewType:", _viewInfoUtil ? _viewInfoUtil.viewType : "VD", "orientation:", _viewInfoUtil ? _viewInfoUtil.orientation : "unknown");
};
view.returnPopupStatus = function () {
	return this.BuypopupPanel;
}


/*for skipping free spin rewarded popup if autoplay is enabled
After free game is finished
*/
view.skipFreeSpinRewarded = function () {
	if (_ng.autoPlayBeforeFg == true) {
		if (this.endcontinueBtn) {
			pixiLib.setInteraction(this.endcontinueBtn, false);
		}
		if (this.grayBg) {
			this.grayBg.interactive = false;
			this.grayBg.buttonMode = false;
		}
		_mediator.publish("continueAutoSpin");
		_mediator.publish("showAutoStopBtn");
	}
}
view.updateFreeSpinCost = function (Updatevalue) {
	if (!this.amtTxt)
		return;
	var buyConfig = _ng.GameConfig.infoPopupView.buyConfig;
	let updatedText = this.amtTxt.text.replace(this.freespinCost, pixiLib.getFormattedAmount(Updatevalue * coreApp.gameModel.spinData.buyfg));
	pixiLib.setText(this.amtTxt, updatedText);
    pixiLib.setProperties(this.amtTxt, buyConfig.text3.props);
	this.freespinCost = pixiLib.getFormattedAmount(Updatevalue * coreApp.gameModel.spinData.buyfg);
}
view.updateSuperSpinCost = function (Updatevalue) {
	if (!this.superBuyDescription)
		return;
	var superbuyConfig = _ng.GameConfig.infoPopupView.superbuyConfig;
	let updatedText = this.superBuyDescription.text.replace(this.superBuyCost, pixiLib.getFormattedAmount(Updatevalue * coreApp.gameModel.spinData.superBuyfg));
	pixiLib.setText(this.superBuyDescription, updatedText);
	pixiLib.setProperties(this.superBuyDescription, superbuyConfig.text1.props);
	this.superBuyCost = pixiLib.getFormattedAmount(Updatevalue * coreApp.gameModel.spinData.superBuyfg);
}

/*
this popup will shown only once in a reload,
*/
view.quickSpinInfoPopup = function () {

	_sndLib.play(_sndLib.sprite.notification);

	_ng.GameConfig.quickSpinInfoPopupShown = true;
	_ng.GameConfig.quickSpinInfoTriggered = false;

	var buttonStyle = {
		fill: "#ffffff",
		fontFamily: "Arial Black",
		fontWeight: "bolder",
		fontSize: 44,
		strokeThickness: 2
	}

	var infoStyle = {
		fill: "#fafafa",
		fontFamily: "Verdana, Geneva, sans-serif",
		stroke: "#0f0f0f",
		strokeThickness: 2,
		fontSize: 26,
		align: "center"
	}

	var headingStyle = {
		fill: "#e7c30d",
		fontFamily: "Verdana, Geneva, sans-serif",
		fontWeight: "bolder",
		stroke: "#0f0f0f",
		strokeThickness: 2
	}

	var quickSpinStyle = {
		fill: "#f2f2f2",
		fontFamily: "Arial Black",
		fontSize: 16,
		fontWeight: "bolder",
		lineHeight: 30,
		stroke: "#151414",
		strokeThickness: 3
	}

	this.quickSpinInfoContainer = pixiLib.getContainer();
	this.quickSpinInfoContainer.name = "quickSpinInfoContainer";
	this.quickSpinInfoContainer.position.set(26, 0);
	this.addChild(this.quickSpinInfoContainer);

	var popupBg = pixiLib.getElement("Sprite", "Rectangle 8");
	popupBg.name = "popupBg";
	popupBg.anchor.set(0.5);
	popupBg.scale.set(1.1, 0.78);
	this.quickSpinInfoContainer.addChild(popupBg);

	var quickSpinInfoClose = pixiLib.getButton("bet_close");
	quickSpinInfoClose.name = "quickSpinInfoClose";
	quickSpinInfoClose.position.set(292, -161);
	this.quickSpinInfoContainer.addChild(quickSpinInfoClose);
	pixiLib.addEvent(quickSpinInfoClose, this.closeQuickSpinInfo.bind(this));

	var headingTxt = pixiLib.getElement("Text", headingStyle);
	headingTxt.name = "headingTxt";
	headingTxt.anchor.set(0.5);
	headingTxt.position.set(0, -168);
	pixiLib.setText(headingTxt, gameLiterals.headingTxt);
	this.quickSpinInfoContainer.addChild(headingTxt);

	var infoTextOne = pixiLib.getElement("Text", infoStyle);
	infoTextOne.name = "infoTextOne";
	infoTextOne.anchor.set(0.5);
	infoTextOne.position.set(0, -65);
	pixiLib.setText(infoTextOne, gameLiterals.info1);
	this.quickSpinInfoContainer.addChild(infoTextOne);

	var infoTextTwo = pixiLib.getElement("Text", infoStyle);
	infoTextTwo.name = "infoTextTwo";
	infoTextTwo.anchor.set(0.5);
	infoTextTwo.position.set(0, 6);
	pixiLib.setText(infoTextTwo, gameLiterals.info2);
	this.quickSpinInfoContainer.addChild(infoTextTwo);

	var tickBox = pixiLib.getElement("Sprite", "Tick_box");
	tickBox.name = "tickBox";
	tickBox.position.set(-6.5, 65);
	tickBox.anchor.set(0.5);
	tickBox.scale.set(0.9);
	this.quickSpinInfoContainer.addChild(tickBox);

	tickBox.interactive = true;
	pixiLib.addEvent(tickBox, this.tickBoxClicked.bind(this));

	this.tick = pixiLib.getElement("Sprite", "Tick");
	this.tick.name = "tick";
	this.tick.position.set(0, 0);
	this.tick.anchor.set(0.5);
	tickBox.addChild(this.tick);
	this.tick.visible = false;

	var quickSpinText = pixiLib.getElement("Text", quickSpinStyle);
	quickSpinText.name = "quickSpinText";
	quickSpinText.anchor.set(0.5);
	quickSpinText.position.set(75, 65);
	pixiLib.setText(quickSpinText, gameLiterals.quickSpinText);
	this.quickSpinInfoContainer.addChild(quickSpinText);

	var buttonBg = pixiLib.getElement("Sprite", "Rectangle 27");
	buttonBg.name = "buttonBg";
	buttonBg.position.set(0, 159);
	buttonBg.anchor.set(0.5);
	buttonBg.scale.set(0.8);
	this.quickSpinInfoContainer.addChild(buttonBg);

	buttonBg.interactive = true;
	pixiLib.addEvent(buttonBg, this.closeQuickSpinInfo.bind(this));

	var okButtonTxt = pixiLib.getElement("Text", buttonStyle);
	okButtonTxt.name = "okButtonTxt";
	okButtonTxt.anchor.set(0.5);
	pixiLib.setText(okButtonTxt, gameLiterals.okButtonTxt);
	buttonBg.addChild(okButtonTxt);

}

view.tickBoxClicked = function () {

	if (commonConfig.disableQuickSpin) {  /*for GERMAN regulations*/
		return;
	}

	this.tick.visible = !_ng.isQuickSpinActive;

	if (_ng.isQuickSpinActive) {
		_mediator.publish("onSloAnimQuickSpinOff");
	} else {
		_mediator.publish("onSloAnimQuickSpinOn");
	}
}

view.closeQuickSpinInfo = function () {
	if (this.quickSpinInfoContainer) {
		coreApp.gameView.panel.fakeButton.visible = false;
		this.removeChild(this.quickSpinInfoContainer);
	}
}

view.onRCCloseHandler = function () {
	this.hideInfoEventType = undefined;
	_sndLib.play(_sndLib.sprite.btnClick);
	coreApp.gameModel.isRealityCheckActive = false;

	this.hidePopup();
	// this.gotoLobby();
};
view.showBuyPopupAnimation = function () {

	this.popupParent.scale.set(1);
	TweenMax.to(this.popupParent.scale, 1, {
		x: 1.1,
		y: 1.1,
		ease: Power1.easeInOut,
		yoyo: true,
		repeat: -1
	});
}

view.onBuyFeatureClick = function () {
	if (coreApp.gameController.allReelsStopped) {
		this.hideInfoEventType = "";
		this.hideInfoPopup();
		// this.removeSelector();
		_ng.buyFeaturePopupStatus = false;
		this.BuyServerReq("BuyFreeSpinContent");
		_mediator.publish("ToggleSpin", false);
		_mediator.publish("setSpaceBarEvent", "idle");
		_mediator.publish("hideMobPanel")
		_mediator.publish("disableBuyFeature");
		// this.closeBuyFSPopup();
		_mediator.publish("disablePanelFs");
		if (_viewInfoUtil.viewType == "VP")
			_mediator.publish("hideAndShowBuyControlls", true);//Only for portrait   
	}
}
view.superBuyFeatureClick = function () {
	if (coreApp.gameController.allReelsStopped) {
		this.hideInfoEventType = "";
		this.hideInfoPopup();
		// this.removeSelector();
		_ng.buyFeaturePopupStatus = false;
		this.BuyServerReq("SuperBuyContent");
		_mediator.publish("ToggleSpin", false);
		_mediator.publish("setSpaceBarEvent", "idle");
		_mediator.publish("hideMobPanel")
		_mediator.publish("disableBuyFeature");
		_mediator.publish("disablePanelFs");
		if (_viewInfoUtil.viewType == "VP")
			_mediator.publish("hideAndShowBuyControlls", true);//Only for portrait   
	}
}

view.superBuyCancelClicked = function () {
	this.hideInfoEventType = "";
	this.hideInfoPopup();
	_ng.buyFeaturePopupStatus = false;
	_mediator.publish("ToggleMobPanel", true);
	_mediator.publish("ToggleSpin", true)
	_mediator.publish("hideMobPanel")
	_mediator.publish("hideAndShowBuyControlls", true);
	_mediator.publish("checkBalanceForBuyFeature");
	setTimeout(() => {
		_mediator.publish("onCloseBtn")
	}, 300);
}
view.buyFeatureCancelClicked = function () {
	this.hideInfoEventType = "";
	this.hideInfoPopup();
	_ng.buyFeaturePopupStatus = false;
	_mediator.publish("ToggleMobPanel", true);
	_mediator.publish("ToggleSpin", true)
	_mediator.publish("hideMobPanel")
	_mediator.publish("hideAndShowBuyControlls", true);
	_mediator.publish("checkBalanceForBuyFeature");
	setTimeout(() => {
		_mediator.publish("onCloseBtn")
	}, 300);
}

view.showHistoryModePopup = function(roundId) {

	const gameWidth = _ng.GameConfig.gameLayout[_viewInfoUtil.viewType].width;
	const gameHeight = _ng.GameConfig.gameLayout[_viewInfoUtil.viewType].height;

	const userLocale = sessionStorage.getItem("Language") || sessionStorage.Language || 'en';
	const lang = userLocale.toLowerCase();

	const viewType = _viewInfoUtil ? _viewInfoUtil.viewType : "VD";
	const isMobileViewType = viewType === "VP" || viewType === "VL";
	const actualWindowWidth = window.innerWidth || 1280;
	const isSmallScreen = actualWindowWidth <= 768;
	const isMobile = isMobileViewType || isSmallScreen;

	if (isMobile) {

		let allReelsStoppedFlag = false;
		const checkAllReelsStopped = () => {
			if (coreApp && coreApp.gameController && coreApp.gameController.allReelsStopped) {
				allReelsStoppedFlag = true;

				this.showMobileHistoryModePopup(roundId);
				return;
			}
		};

		checkAllReelsStopped();
		
		if (!allReelsStoppedFlag) {

			const allReelsStoppedHandler = () => {

				if (_mediator && typeof _mediator.unsubscribe === 'function') {
					_mediator.unsubscribe("allReelsStopped", allReelsStoppedHandler);
				}
				setTimeout(() => {
					this.showMobileHistoryModePopup(roundId);
				}, 500);
			};
			
			_mediator.subscribe("allReelsStopped", allReelsStoppedHandler);

			setTimeout(() => {
				if (!allReelsStoppedFlag) {

					if (_mediator && typeof _mediator.unsubscribe === 'function') {
						_mediator.unsubscribe("allReelsStopped", allReelsStoppedHandler);
					}
					this.showMobileHistoryModePopup(roundId);
				}
			}, 5000);
		}
		
		return;
	}

	_sndLib.play(_sndLib.sprite.btnClick);

	if (this.historyModePopupContainer) {
		if (coreApp && coreApp.gameView && coreApp.gameView.popupContainer && this.historyModePopupContainer.parent === coreApp.gameView.popupContainer) {
			coreApp.gameView.popupContainer.removeChild(this.historyModePopupContainer);
		} else if (coreApp && coreApp.stage && this.historyModePopupContainer.parent === coreApp.stage) {
			coreApp.stage.removeChild(this.historyModePopupContainer);
		} else if (_ng && _ng.stage && this.historyModePopupContainer.parent === _ng.stage) {
			_ng.stage.removeChild(this.historyModePopupContainer);
		}
		this.historyModePopupContainer = null;
	}

	this.historyModePopupContainer = pixiLib.getContainer();
	this.historyModePopupContainer.name = "historyModePopupContainer";
	this.historyModePopupContainer.visible = true;
	this.historyModePopupContainer.alpha = 1.0;

	let targetContainer = null;
	if (coreApp && coreApp.gameView && coreApp.gameView.popupContainer) {
		targetContainer = coreApp.gameView.popupContainer;
	} else if (coreApp && coreApp.stage) {
		targetContainer = coreApp.stage;
	} else if (_ng && _ng.stage) {
		targetContainer = _ng.stage;
	}
	
	if (!targetContainer) {

		return;
	}
	
	targetContainer.addChild(this.historyModePopupContainer);
	targetContainer.setChildIndex(this.historyModePopupContainer, targetContainer.children.length - 1);

	const overlay = pixiLib.getRectangleSprite(gameWidth, gameHeight, 0x000000);
	overlay.alpha = 0.6;
	overlay.interactive = false;
	overlay.buttonMode = false;
	this.historyModePopupContainer.addChild(overlay);

	const buttonSpacing = 80;
	const buttonWidth = lang === 'tr' ? 250 : 180;
	const buttonHeight = 60;
	const borderRadius = buttonHeight / 2;
	const borderWidth = 2;
	const totalWidth = (buttonWidth * 2) + buttonSpacing;

	const startX = (gameWidth - totalWidth) / 2;
	const buttonY = (gameHeight - buttonHeight) / 2;

	const copyBtnGraphics = new PIXI.Graphics();
	copyBtnGraphics.beginFill(0x000000);
	copyBtnGraphics.drawRoundedRect(0, 0, buttonWidth, buttonHeight, borderRadius);
	copyBtnGraphics.endFill();

	copyBtnGraphics.lineStyle(borderWidth, 0xffffff);
	copyBtnGraphics.drawRoundedRect(0, 0, buttonWidth, buttonHeight, borderRadius);
	const copyBtn = new PIXI.Container();
	copyBtn.addChild(copyBtnGraphics);
	copyBtn.x = startX;
	copyBtn.y = buttonY;
	copyBtn.interactive = true;
	copyBtn.buttonMode = true;

	copyBtn._buttonWidth = buttonWidth;
	copyBtn._buttonHeight = buttonHeight;
	copyBtn._borderRadius = borderRadius;
	this.historyModePopupContainer.addChild(copyBtn);

	const copyBtnContainer = pixiLib.getContainer();
	copyBtnContainer.x = copyBtn.x;
	copyBtnContainer.y = copyBtn.y;
	this.historyModePopupContainer.addChild(copyBtnContainer);

	const chainIcon = pixiLib.getElement("Text", {
		fontFamily: "Arial",
		fontSize: 26,
		fill: 0xffffff
	});
	pixiLib.setText(chainIcon, "🔗");
	chainIcon.x = 30;
	chainIcon.y = buttonHeight / 2;
	chainIcon.anchor.set(0.5, 0.5);
	copyBtnContainer.addChild(chainIcon);

	const copyBtnText = pixiLib.getElement("Text", {
		fontFamily: "Montserrat-Bold",
		fontSize: lang === 'tr' ? 16 : 18,
		fill: 0xffffff
	});
	const copyBtnTextLabel = lang === 'tr' ? "BAĞLANTIYI KOPYALA" : "GENERATE";
	pixiLib.setText(copyBtnText, copyBtnTextLabel);
	copyBtnText.x = buttonWidth / 2 + 15;
	copyBtnText.y = buttonHeight / 2;
	copyBtnText.anchor.set(0.5, 0.5);
	copyBtnContainer.addChild(copyBtnText);

	const replayBtnGraphics = new PIXI.Graphics();
	replayBtnGraphics.beginFill(0x000000);
	replayBtnGraphics.drawRoundedRect(0, 0, buttonWidth, buttonHeight, borderRadius);
	replayBtnGraphics.endFill();

	replayBtnGraphics.lineStyle(borderWidth, 0xffffff);
	replayBtnGraphics.drawRoundedRect(0, 0, buttonWidth, buttonHeight, borderRadius);
	const replayBtn = new PIXI.Container();
	replayBtn.addChild(replayBtnGraphics);
	replayBtn.x = startX + buttonWidth + buttonSpacing;
	replayBtn.y = buttonY;
	replayBtn.interactive = true;
	replayBtn.buttonMode = true;
	this.historyModePopupContainer.addChild(replayBtn);

	const replayBtnContainer = pixiLib.getContainer();
	replayBtnContainer.x = replayBtn.x;
	replayBtnContainer.y = replayBtn.y;
	this.historyModePopupContainer.addChild(replayBtnContainer);

	const playIcon = pixiLib.getElement("Text", {
		fontFamily: "Arial",
		fontSize: 26,
		fill: 0xffffff
	});
	pixiLib.setText(playIcon, "▶");
	playIcon.x = 30;
	playIcon.y = buttonHeight / 2;
	playIcon.anchor.set(0.5, 0.5);
	replayBtnContainer.addChild(playIcon);

	const replayBtnText = pixiLib.getElement("Text", {
		fontFamily: "Montserrat-Bold",
		fontSize: lang === 'tr' ? 16 : 18,
		fill: 0xffffff
	});
	const replayBtnTextLabel = lang === 'tr' ? "TEKRAR İZLE" : "REPLAY";
	pixiLib.setText(replayBtnText, replayBtnTextLabel);
	replayBtnText.x = buttonWidth / 2 + 15;
	replayBtnText.y = buttonHeight / 2;
	replayBtnText.anchor.set(0.5, 0.5);
	replayBtnContainer.addChild(replayBtnText);

	pixiLib.addEvent(copyBtn, () => {
		_sndLib.play(_sndLib.sprite.btnClick);
		this.copyReplayLink(roundId, copyBtnText, copyBtn, chainIcon);
	});

	copyBtnContainer.interactive = true;
	copyBtnContainer.buttonMode = true;
	copyBtnContainer.hitArea = new PIXI.Rectangle(0, 0, buttonWidth, buttonHeight);
	pixiLib.addEvent(copyBtnContainer, () => {
		_sndLib.play(_sndLib.sprite.btnClick);
		this.copyReplayLink(roundId, copyBtnText, copyBtn, chainIcon);
	});

	pixiLib.addEvent(replayBtn, () => {
		_sndLib.play(_sndLib.sprite.btnClick);

		this.closeHistoryModePopup();
		setTimeout(() => {
			this.restartReplay();
		}, 100);
	});

	replayBtnContainer.interactive = true;
	replayBtnContainer.buttonMode = true;
	replayBtnContainer.hitArea = new PIXI.Rectangle(0, 0, buttonWidth, buttonHeight);
	pixiLib.addEvent(replayBtnContainer, () => {
		_sndLib.play(_sndLib.sprite.btnClick);

		this.closeHistoryModePopup();
		setTimeout(() => {
			this.restartReplay();
		}, 100);
	});

}

view.showMobileHistoryModePopup = function(roundId) {

	_sndLib.play(_sndLib.sprite.btnClick);

	const actualWindowWidth = window.innerWidth || 375;
	const actualWindowHeight = window.innerHeight || 667;
	const isSmallScreen = actualWindowWidth <= 768;
	const isPortraitLayout = actualWindowWidth <= actualWindowHeight && isSmallScreen;

	const gameWidth = actualWindowWidth;
	const gameHeight = actualWindowHeight;

	const userLocale = sessionStorage.getItem("Language") || sessionStorage.Language || 'en';
	const lang = userLocale.toLowerCase();

	if (this.historyModePopupContainer) {
		if (coreApp && coreApp.gameView && coreApp.gameView.popupContainer && this.historyModePopupContainer.parent === coreApp.gameView.popupContainer) {
			coreApp.gameView.popupContainer.removeChild(this.historyModePopupContainer);
		} else if (coreApp && coreApp.stage && this.historyModePopupContainer.parent === coreApp.stage) {
			coreApp.stage.removeChild(this.historyModePopupContainer);
		} else if (_ng && _ng.stage && this.historyModePopupContainer.parent === _ng.stage) {
			_ng.stage.removeChild(this.historyModePopupContainer);
		}
		this.historyModePopupContainer = null;
	}

	this.historyModePopupContainer = pixiLib.getContainer();
	this.historyModePopupContainer.name = "mobileHistoryModePopupContainer";
	this.historyModePopupContainer.visible = true;
	this.historyModePopupContainer.alpha = 0;

	let targetContainer = null;
	if (coreApp && coreApp.gameView && coreApp.gameView.popupContainer) {
		targetContainer = coreApp.gameView.popupContainer;
	} else if (coreApp && coreApp.stage) {
		targetContainer = coreApp.stage;
	} else if (_ng && _ng.stage) {
		targetContainer = _ng.stage;
	}
	
	if (!targetContainer) {

		return;
	}
	
	targetContainer.addChild(this.historyModePopupContainer);
	targetContainer.setChildIndex(this.historyModePopupContainer, targetContainer.children.length - 1);

	const overlay = pixiLib.getRectangleSprite(gameWidth, gameHeight, 0x000000);
	overlay.alpha = 0.7;
	overlay.interactive = true;
	overlay.buttonMode = false;
	this.historyModePopupContainer.addChild(overlay);

	const contentContainer = pixiLib.getContainer();

	contentContainer.x = gameWidth / 2;
	contentContainer.y = gameHeight / 2;
	contentContainer.pivot.set(0, 0);
	this.historyModePopupContainer.addChild(contentContainer);

	const buttonWidth = lang === 'tr' ? 280 : 220;
	const buttonHeight = 60;
	const buttonSpacing = 20;
	const borderRadius = buttonHeight / 2;
	const borderWidth = 2;

	const totalContentHeight = (buttonHeight * 2) + buttonSpacing;

	const buttonStartY = -totalContentHeight / 2;

	const copyBtnGraphics = new PIXI.Graphics();
	copyBtnGraphics.beginFill(0x000000);
	copyBtnGraphics.drawRoundedRect(0, 0, buttonWidth, buttonHeight, borderRadius);
	copyBtnGraphics.endFill();
	copyBtnGraphics.lineStyle(borderWidth, 0xffffff);
	copyBtnGraphics.drawRoundedRect(0, 0, buttonWidth, buttonHeight, borderRadius);
	
	const copyBtn = new PIXI.Container();
	copyBtn.addChild(copyBtnGraphics);
	copyBtn.x = -buttonWidth / 2;
	copyBtn.y = buttonStartY;
	copyBtn.interactive = true;
	copyBtn.buttonMode = true;
	copyBtn.cursor = 'pointer';
	contentContainer.addChild(copyBtn);

	const copyBtnContainer = pixiLib.getContainer();
	copyBtnContainer.x = copyBtn.x;
	copyBtnContainer.y = copyBtn.y;
	contentContainer.addChild(copyBtnContainer);

	const chainIcon = pixiLib.getElement("Text", {
		fontFamily: "Arial",
		fontSize: 26,
		fill: 0xffffff
	});
	pixiLib.setText(chainIcon, "🔗");
	chainIcon.x = 30;
	chainIcon.y = buttonHeight / 2;
	chainIcon.anchor.set(0.5, 0.5);
	copyBtnContainer.addChild(chainIcon);

	const copyBtnText = pixiLib.getElement("Text", {
		fontFamily: "Montserrat-Bold",
		fontSize: lang === 'tr' ? 16 : 18,
		fill: 0xffffff
	});
	const copyBtnTextLabel = lang === 'tr' ? "BAĞLANTIYI KOPYALA" : "GENERATE";
	pixiLib.setText(copyBtnText, copyBtnTextLabel);
	copyBtnText.x = buttonWidth / 2 + 15;
	copyBtnText.y = buttonHeight / 2;
	copyBtnText.anchor.set(0.5, 0.5);
	copyBtnContainer.addChild(copyBtnText);

	const replayBtnGraphics = new PIXI.Graphics();
	replayBtnGraphics.beginFill(0x000000);
	replayBtnGraphics.drawRoundedRect(0, 0, buttonWidth, buttonHeight, borderRadius);
	replayBtnGraphics.endFill();
	replayBtnGraphics.lineStyle(borderWidth, 0xffffff);
	replayBtnGraphics.drawRoundedRect(0, 0, buttonWidth, buttonHeight, borderRadius);
	
	const replayBtn = new PIXI.Container();
	replayBtn.addChild(replayBtnGraphics);
	replayBtn.x = -buttonWidth / 2;
	replayBtn.y = buttonStartY + buttonHeight + buttonSpacing;
	replayBtn.interactive = true;
	replayBtn.buttonMode = true;
	replayBtn.cursor = 'pointer';
	contentContainer.addChild(replayBtn);

	const replayBtnContainer = pixiLib.getContainer();
	replayBtnContainer.x = replayBtn.x;
	replayBtnContainer.y = replayBtn.y;
	contentContainer.addChild(replayBtnContainer);

	const playIcon = pixiLib.getElement("Text", {
		fontFamily: "Arial",
		fontSize: 26,
		fill: 0xffffff
	});
	pixiLib.setText(playIcon, "▶");
	playIcon.x = 30;
	playIcon.y = buttonHeight / 2;
	playIcon.anchor.set(0.5, 0.5);
	replayBtnContainer.addChild(playIcon);

	const replayBtnText = pixiLib.getElement("Text", {
		fontFamily: "Montserrat-Bold",
		fontSize: lang === 'tr' ? 16 : 18,
		fill: 0xffffff
	});
	const replayBtnTextLabel = lang === 'tr' ? "TEKRAR İZLE" : "REPLAY";
	pixiLib.setText(replayBtnText, replayBtnTextLabel);
	replayBtnText.x = buttonWidth / 2 + 15;
	replayBtnText.y = buttonHeight / 2;
	replayBtnText.anchor.set(0.5, 0.5);
	replayBtnContainer.addChild(replayBtnText);

	copyBtn._buttonWidth = buttonWidth;
	copyBtn._buttonHeight = buttonHeight;
	copyBtn._borderRadius = borderRadius;

	const copyButtonClickHandler = () => {
		_sndLib.play(_sndLib.sprite.btnClick);
		this.copyReplayLink(roundId, copyBtnText, copyBtn, chainIcon);

	};
	
	pixiLib.addEvent(copyBtn, copyButtonClickHandler);
	
	copyBtnContainer.interactive = true;
	copyBtnContainer.buttonMode = true;
	copyBtnContainer.hitArea = new PIXI.Rectangle(0, 0, buttonWidth, buttonHeight);
	pixiLib.addEvent(copyBtnContainer, copyButtonClickHandler);
	
	pixiLib.addEvent(replayBtn, () => {
		_sndLib.play(_sndLib.sprite.btnClick);

		this.closeHistoryModePopup();
		setTimeout(() => {
			this.restartReplay();
		}, 100);
	});
	
	replayBtnContainer.interactive = true;
	replayBtnContainer.buttonMode = true;
	replayBtnContainer.hitArea = new PIXI.Rectangle(0, 0, buttonWidth, buttonHeight);
	pixiLib.addEvent(replayBtnContainer, () => {
		_sndLib.play(_sndLib.sprite.btnClick);

		this.closeHistoryModePopup();
		setTimeout(() => {
			this.restartReplay();
		}, 100);
	});

	TweenMax.to(this.historyModePopupContainer, 0.5, {
		alpha: 1,
		ease: Power2.easeOut,
		onComplete: () => {

		}
	});

	const updateCursor = (button) => {
		if (button) {
			button.mouseover = () => {
				if (document.body) {
					document.body.style.cursor = 'pointer';
				}
			};
			button.mouseout = () => {
				if (document.body) {
					document.body.style.cursor = 'default';
				}
			};
		}
	};
	
	updateCursor(copyBtn);
	updateCursor(replayBtn);
	updateCursor(copyBtnContainer);
	updateCursor(replayBtnContainer);

}

view.showCopiedToast = function(parentContainer, lang) {

	if (this.copiedToast) {
		if (this.copiedToast.parent) {
			this.copiedToast.parent.removeChild(this.copiedToast);
		}
		this.copiedToast = null;
	}

	const toastContainer = pixiLib.getContainer();
	toastContainer.x = 0;
	toastContainer.y = -100;

	const toastBg = new PIXI.Graphics();
	toastBg.beginFill(0x4CAF50);
	toastBg.drawRoundedRect(0, 0, 150, 50, 10);
	toastBg.endFill();
	toastContainer.addChild(toastBg);
	toastContainer.x = -75;

	const toastText = pixiLib.getElement("Text", {
		fontFamily: "Montserrat-Bold",
		fontSize: 18,
		fill: 0xffffff
	});
	const toastLabel = lang === 'tr' ? "Kopyalandı!" : "Copied!";
	pixiLib.setText(toastText, toastLabel);
	toastText.x = 75;
	toastText.y = 25;
	toastText.anchor.set(0.5, 0.5);
	toastContainer.addChild(toastText);

	parentContainer.addChild(toastContainer);
	this.copiedToast = toastContainer;

	toastContainer.alpha = 0;
	toastContainer.scale.set(0.8);
	TweenMax.to(toastContainer, 0.3, {
		alpha: 1,
		scale: { x: 1, y: 1 },
		ease: Back.easeOut.config(1.5)
	});

	setTimeout(() => {
		if (toastContainer && toastContainer.parent) {
			TweenMax.to(toastContainer, 0.3, {
				alpha: 0,
				scale: { x: 0.8, y: 0.8 },
				ease: Power2.easeIn,
				onComplete: () => {
					if (toastContainer && toastContainer.parent) {
						toastContainer.parent.removeChild(toastContainer);
					}
					if (this.copiedToast === toastContainer) {
						this.copiedToast = null;
					}
				}
			});
		}
	}, 2000);
}

view.copyReplayLink = function(roundId, linkTextElement, linkBtn, chainIcon) {

	const userLocale = sessionStorage.getItem("Language") || sessionStorage.Language || 'en';

	const baseUrl = window.location.origin + window.location.pathname;
	const shareUrl = new URL(baseUrl);

	shareUrl.searchParams.set('round_id', roundId);
	shareUrl.searchParams.set('user_locale', userLocale);
	shareUrl.searchParams.set('replay', 'true');

	try {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams && urlParams.has('wager')) {
			const wagerFromUrl = parseFloat(urlParams.get('wager'));
			if (!isNaN(wagerFromUrl)) {
				shareUrl.searchParams.set('wager', wagerFromUrl);
			}
		}
	} catch (e) { /* no-op */ }

	let currency = null;
	try {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams && urlParams.has('currency')) {
			currency = urlParams.get('currency');
		} else {
			currency = sessionStorage.getItem("adaptor_currency") || sessionStorage.adaptor_currency || null;
		}
	} catch (e) {

	}

	if (currency) {
		shareUrl.searchParams.set('currency', currency.toLowerCase());

	} else {

		const defaultCurrency = 'try';
		shareUrl.searchParams.set('currency', defaultCurrency.toLowerCase());

	}

	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get('is_ante_bet') === 'true') {
		shareUrl.searchParams.set('is_ante_bet', 'true');

	} else if (urlParams.get('is_buy_feature') === 'true') {
		shareUrl.searchParams.set('is_buy_feature', 'true');

	} else if (urlParams.get('is_buy_super_feature') === 'true') {
		shareUrl.searchParams.set('is_buy_super_feature', 'true');
		
	} else if (urlParams.get('is_bonus') === 'true') {
		shareUrl.searchParams.set('is_bonus', 'true');

	}
	
	const linkString = shareUrl.toString();

	this.copyToClipboard(linkString);

	if (linkBtn && linkBtn.children && linkBtn.children[0] && linkBtn.children[0] instanceof PIXI.Graphics) {
		const buttonGraphics = linkBtn.children[0];
		const btnWidth = linkBtn._buttonWidth || 180;
		const btnHeight = linkBtn._buttonHeight || 60;
		const btnRadius = linkBtn._borderRadius || 10;
		buttonGraphics.clear();
		buttonGraphics.beginFill(0x4CAF50);
		buttonGraphics.drawRoundedRect(0, 0, btnWidth, btnHeight, btnRadius);
		buttonGraphics.endFill();

		buttonGraphics.lineStyle(2, 0xffffff);
		buttonGraphics.drawRoundedRect(0, 0, btnWidth, btnHeight, btnRadius);
	}

	if (chainIcon) {
		chainIcon.tint = 0x4CAF50;
	}

	setTimeout(() => {

		if (linkBtn && linkBtn.children && linkBtn.children[0] && linkBtn.children[0] instanceof PIXI.Graphics) {
			const buttonGraphics = linkBtn.children[0];
			const btnWidth = linkBtn._buttonWidth || 180;
			const btnHeight = linkBtn._buttonHeight || 60;
			const btnRadius = linkBtn._borderRadius || 10;
			buttonGraphics.clear();
			buttonGraphics.beginFill(0x000000);
			buttonGraphics.drawRoundedRect(0, 0, btnWidth, btnHeight, btnRadius);
			buttonGraphics.endFill();

			buttonGraphics.lineStyle(2, 0xffffff);
			buttonGraphics.drawRoundedRect(0, 0, btnWidth, btnHeight, btnRadius);
		}
		if (chainIcon) {
			chainIcon.tint = 0xFFFFFF;
		}
	}, 2000);

}

view.copyToClipboard = function(text) {

	if (navigator.clipboard && window.isSecureContext) {
		navigator.clipboard.writeText(text).then(() => {

		}).catch((err) => {

			this.fallbackCopyToClipboard(text);
		});
	} else {

		this.fallbackCopyToClipboard(text);
	}
}

view.fallbackCopyToClipboard = function(text) {

	const textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.style.position = "fixed";
	textArea.style.left = "-999999px";
	textArea.style.top = "-999999px";
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	
	try {
		const successful = document.execCommand('copy');
		if (successful) {

		} else {

		}
	} catch (err) {

	}
	
	document.body.removeChild(textArea);
}

view.restartReplay = function() {

	const urlParams = new URLSearchParams(window.location.search);
	const roundId = urlParams.get('round_id');
	const userLocale = urlParams.get('user_locale') || sessionStorage.getItem("Language") || 'en';
	const sessionId = urlParams.get('session_id') || sessionStorage.getItem("sessionId");
	const wager = urlParams.get('wager');
	const isAnteBet = urlParams.get('is_ante_bet');
	const isBuyFeature = urlParams.get('is_buy_feature');
	const isSuperBuyFeature = urlParams.get('is_buy_super_feature');
	const isBonus = urlParams.get('is_bonus');

	let currency = null;
	try {
		if (urlParams && urlParams.has('currency')) {
			currency = urlParams.get('currency');
		} else {
			currency = sessionStorage.getItem("adaptor_currency") || sessionStorage.adaptor_currency || null;
		}
	} catch (e) {

	}
	
	if (!roundId) {

		return;
	}

	const baseUrl = window.location.origin + window.location.pathname;
	const replayUrl = new URL(baseUrl);

	replayUrl.searchParams.set('replay', 'true');
	replayUrl.searchParams.set('round_id', roundId);
	
	if (userLocale) {
		replayUrl.searchParams.set('user_locale', userLocale);
	}
	if (sessionId) {
		replayUrl.searchParams.set('session_id', sessionId);
	}
	if (wager) {
		replayUrl.searchParams.set('wager', wager);
	}

	if (currency) {
		replayUrl.searchParams.set('currency', currency.toLowerCase());

	} else {

		const defaultCurrency = 'try';
		replayUrl.searchParams.set('currency', defaultCurrency.toLowerCase());

	}

	if (isAnteBet === 'true') {
		replayUrl.searchParams.set('is_ante_bet', 'true');
	} else if (isBuyFeature === 'true') {
		replayUrl.searchParams.set('is_buy_feature', 'true');
	}	else if (isSuperBuyFeature === 'true') {
		replayUrl.searchParams.set('is_buy_super_feature', 'true');
	} else if (isBonus === 'true') {
		replayUrl.searchParams.set('is_bonus', 'true');
	}

	window.location.href = replayUrl.toString();
}

view.closeHistoryModePopup = function() {
	if (this.historyModePopupContainer) {

		if (coreApp && coreApp.gameView && coreApp.gameView.popupContainer && this.historyModePopupContainer.parent === coreApp.gameView.popupContainer) {
			coreApp.gameView.popupContainer.removeChild(this.historyModePopupContainer);
		} else if (coreApp && coreApp.stage && this.historyModePopupContainer.parent === coreApp.stage) {
			coreApp.stage.removeChild(this.historyModePopupContainer);
		} else if (_ng && _ng.stage && this.historyModePopupContainer.parent === _ng.stage) {
			_ng.stage.removeChild(this.historyModePopupContainer);
		} else if (this.historyModePopupContainer.parent) {

			this.historyModePopupContainer.parent.removeChild(this.historyModePopupContainer);
		}
		this.historyModePopupContainer = null;
	}
}

view.showGambleWindow = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const roundId = urlParams.get('round_id');
  var gambleConfig = _ng.GameConfig.infoPopupView.gamblePopup;

  this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
  this.grayBg.alpha = 0.8;
  this.grayBg.interactive = true;
  coreApp.gameView.popupContainer.addChildAt(this.grayBg, 0);

  this.popupParent = pixiLib.getElement();
  this.addChild(this.popupParent);


  this.popupBG = pixiLib.getElement("Spine", gambleConfig.background.spineImage);
  this.popupParent.addChild(this.popupBG);
  pixiLib.setProperties(this.popupBG, gambleConfig.background.props);
  this.popupBG.state.setAnimation(0, gambleConfig.background.animationState.In, false);

  this.descriptionHead = pixiLib.getElement("Text", gambleConfig.headingText.textStyle);
  pixiLib.setText(this.descriptionHead, gameLiterals.gambleHeadText);
  pixiLib.setProperties(this.descriptionHead, gambleConfig.headingText.props);
  pixiLib.attachToSlot(this.popupBG, "Header_text",this.descriptionHead);

  this.subHeadText = pixiLib.getElement("Text", gambleConfig.subHeadText.textStyle);
  pixiLib.setText(this.subHeadText, gameLiterals.subHeadText);
  pixiLib.setProperties(this.subHeadText, gambleConfig.subHeadText.props);
  pixiLib.attachToSlot(this.popupBG, "sub_text",this.subHeadText);

  this.redBtn = pixiLib.getButton(gambleConfig.redButton.bgImage, gambleConfig.redButton.options);
  this.popupParent.addChild(this.redBtn);
  pixiLib.setProperties(this.redBtn, gambleConfig.redButton.props);
  pixiLib.addEvent(this.redBtn,this.onRedButtonClick.bind(this))
  pixiLib.setInteraction(this.redBtn, false);


  this.blueBtn = pixiLib.getButton(gambleConfig.blueButton.bgImage, gambleConfig.blueButton.options);
  this.popupParent.addChild(this.blueBtn);
  pixiLib.setProperties(this.blueBtn, gambleConfig.blueButton.props);
  pixiLib.addEvent(this.blueBtn,this.onBlueButtonClick.bind(this))
  pixiLib.setInteraction(this.blueBtn, false);

  
  this.tossBtn = pixiLib.getButton(gambleConfig.tossButton.bgImage, gambleConfig.tossButton.options);
  this.popupParent.addChild(this.tossBtn);
  pixiLib.setProperties(this.tossBtn, gambleConfig.tossButton.props);

  //TOSS BTN TEXT
  var tossBtnText = pixiLib.getElement("Text", gambleConfig.tossBtnText.textStyle);
  pixiLib.setText(tossBtnText, gameLiterals.tossBtnText);
  pixiLib.setProperties(tossBtnText, gambleConfig.tossBtnText.props);
  this.tossBtn.addChild(tossBtnText);
  pixiLib.addEvent(this.tossBtn,this.onTossButtonClick.bind(this))
  pixiLib.setInteraction(this.tossBtn, false);

  this.popupBG.state.tracks[0].listener = {
            complete: (trackEntry) => {
                if (trackEntry.animation.name === gambleConfig.background.animationState.In) {
                    this.popupBG.state.setAnimation(0, gambleConfig.background.animationState.Idle_L, true);
					pixiLib.setInteraction(this.tossBtn, true);
					pixiLib.setInteraction(this.blueBtn, true);
					pixiLib.setInteraction(this.redBtn, true);
					this.colorType = "blue";
					/* Replay */
					if(roundId){
					pixiLib.setInteraction(this.backBtn, false);
					this.replayForToss();
  					}
                }
            }
        }

  this.backBtn = pixiLib.getButton(gambleConfig.backButton.bgImage, gambleConfig.backButton.options);
  this.popupParent.addChild(this.backBtn);
  pixiLib.setProperties(this.backBtn, gambleConfig.backButton.props[_viewInfoUtil.viewType]);
  pixiLib.addEvent(this.backBtn, () => {
	_sndLib.stop(_sndLib.sprite.gambleBG);
	pixiLib.setInteraction(this.backBtn, false);
	this.onFsCloseHandler("onBackButtonClicked");
  });

  this.hideInfoEventType = "";
  this.hideInfoDelay = 0;
  setTimeout(function () {
    //Adding timeout so popup will be shown fully then enable spacebar
    _mediator.publish("setSpaceBarEvent", "hideInfoPopup");
  }, 500);
//   pixiLib.addEvent(this.backBtn, this.hideInfoPopup.bind(this));
  _ngFluid.call(this, gambleConfig.params);
  this.onViewResize();
  this.showInfoPopup();
  _sndLib.play(_sndLib.sprite.gambleBG);
  _sndLib.play(_sndLib.sprite.basketShuffle);
}

view.onRedButtonClick = function () {
	_sndLib.play(_sndLib.sprite.basketSelect);

	var gambleConfig = _ng.GameConfig.infoPopupView.gamblePopup;

	this.popupBG.state.setAnimation(0, gambleConfig.background.animationState.Idle_R, true);
    this.colorType = "red";
};

view.onBlueButtonClick = function () {
	_sndLib.play(_sndLib.sprite.basketSelect);

     var gambleConfig = _ng.GameConfig.infoPopupView.gamblePopup;

	this.popupBG.state.setAnimation(0, gambleConfig.background.animationState.Idle_L, true);
    this.colorType = "blue";
};
view.onTossButtonClick = function () {
	_sndLib.play(_sndLib.sprite.basketSelect);
	this.backBtn.visible = false;
	pixiLib.setInteraction(this.blueBtn, false);
	pixiLib.setInteraction(this.redBtn, false);
	pixiLib.setInteraction(this.tossBtn, false);

	this.tossBtn.visible = false;

	_mediator.publish("sendCoinFlipReq", "gamble", this.colorType , () => {
		this.showGambleWinView();
	});

}

view.showGambleWinView = function(){
	_sndLib.stop(_sndLib.sprite.gambleBG);
    var gambleConfig = _ng.GameConfig.infoPopupView.gamblePopup;
	const isSucess = coreApp.gameModel.gambleResultData.iscoinTossGambleActive;
	var gambleWinAmount = pixiLib.getFormattedAmount(coreApp.gameModel.gambleResultData.gamebleWinAmount);

	if(isSucess){
		const state = this.popupBG.state;
		_sndLib.play(_sndLib.sprite.tossWin);
		var animation_State = (this.colorType == "red") ? "right_winning": "left_winning";

		state.setAnimation(0, "Opening_"+animation_State, false);
		state.addListener({
			complete: (trackEntry) => {
				if (trackEntry.animation.name === "Opening_"+animation_State) {

					this.descriptionHead.text = gameLiterals.gamble_winText;
					this.subHeadText.text = gambleWinAmount;

					/* SHOW WIN POP UP */
					state.setAnimation(0,"Looping_"+animation_State, true);
					this.updateGamblingWinAmount();
					pixiLib.addEvent(this.grayBg, this.closeGambleView.bind(this));

					
				}
			}
		});
	
	}else{

		var animState = (this.colorType == "blue") ? "left_lose": "right_lose";
		const state = this.popupBG.state;
		_sndLib.play(_sndLib.sprite.tossLoss);
		state.setAnimation(0,"Opening_"+animState, false);
		state.addListener({
			complete: (trackEntry) => {
				if (trackEntry.animation.name === "Opening_"+animState) {

					this.descriptionHead.text = gameLiterals.gamble_loseText;
					this.subHeadText.text = gambleWinAmount;

					/* SHOW BETTER LUCK POP UP */
					state.setAnimation(0,"Looping_"+animState, true);
					this.updateGamblingWinAmount();
					pixiLib.addEvent(this.grayBg, this.closeGambleView.bind(this));

				}
			}
		});
	}

	//for updating winamount in case of PFS active
	if(coreApp.gameModel.getIsFullPFSActive()) {
		coreApp.gameModel.PFSData.updateTotalPFSWin(coreApp.gameModel.gambleResultData.pfrData.TotalWin);
	}
}

view.closeGambleView = function () {
	_sndLib.play(_sndLib.sprite.BasketUI_OUT);
	this.onFsCloseHandler("collect");
}

view.updateGamblingWinAmount = function (){
	const urlParams = new URLSearchParams(window.location.search);
	const roundId = urlParams.get('round_id');
	var gambleConfig = _ng.GameConfig.infoPopupView.gamblePopup;

	/* Press anywhere text */
	var pressAnyWhere = pixiLib.getElement("Text", gambleConfig.anywhereText.textStyle);
	pixiLib.setText(pressAnyWhere, gameLiterals.anywhereText);
	pixiLib.setProperties(pressAnyWhere, gambleConfig.anywhereText.props);
	this.popupParent.addChild(pressAnyWhere);

	_ng.externalUiController.ticker.showWinText('');
	var gambleWin = pixiLib.getFormattedAmount(coreApp.gameModel.gambleResultData.getGambleWinAmount());
	_ng.externalUiController.ticker.showWinText(gambleWin);

	/* ********REPLAY*********** */
	if(roundId){
		setTimeout(() => {
			this.closeGambleView();
		}, 500);
		setTimeout(() => {
			this.showHistoryModePopup(roundId);
		}, 700);
	}
}

view.coinFlipReplaySimulation = function (){

 const urlParams = new URLSearchParams(window.location.search);
 const roundId = urlParams.get('round_id');

 var responseData = window.slotService.replayDataArray[window.slotService.replayDataArray.length-1];

 if (responseData.is_bonus_round_gambled) {

  setTimeout(() => {
	pixiLib.setInteraction(this.doubleRewardBtn, true);
	this.doubleRewardBtn.interactive = false;
    this.doubleRewardBtn.emit('pointertap');/*SHOW GAMBLE WINDOW*/
  }, 1000);

 }else{
	//IN THE CASE OF COLLECT BUTTON CLICK
	pixiLib.setInteraction(this.endcontinueBtn, true);
	this.endcontinueBtn.interactive = false;
	setTimeout(() => {
		this.onFsCloseHandler("collect");
		this.endcontinueBtn.interactive = true;
	}, 200);
	setTimeout(() => {
			this.showHistoryModePopup(roundId);
	}, 500);
 }
 
}

view.replayForToss = function (){

 var responseData = window.slotService.replayDataArray[window.slotService.replayDataArray.length-1];
  var obj = {
		win_amount: responseData.round_total_win_amount,
		success: responseData.has_won_gamble_game,
		balance: responseData.current_round.balance
 };
 /* TODO: MAKE IT SAME RESPONSE FOR REAL AND REPLAY */
 coreApp.gameModel.gambleResultData.saveCoinTossGambleResponse(obj);
 
 if (responseData.is_bonus_round_gambled) {

	var color = responseData.gamble_data; //COLOR
	this.colorType = color;
	 setTimeout(() => {
		if(color === "red"){
			this.redBtn.emit('pointertap');//clicking color btn
		}else{
			this.blueBtn.emit('pointertap');
		}
	 }, 300);

	 setTimeout(() => {
		 this.blueBtn.visible = false;
		 this.redBtn.visible = false;
		 this.tossBtn.visible = false;
		this.showGambleWinView();
	 }, 600);
 }

}

view.attachToSlot = function (spine, slotName, element) {
    var slotIndex = spine.spineData.findSlotIndex(slotName);
    var placeholderSlot = spine.slotContainers[slotIndex];
    if (!placeholderSlot) {
        console.log("not found");
    }
    placeholderSlot.addChild(element);
}


// --- Consolidated Exports & Aliases ---
var CyprusInfoPopupView = InfoPopupView;
var GInfoPopupView = InfoPopupView;
if (typeof window !== "undefined") { window.CyprusInfoPopupView = InfoPopupView; window.GInfoPopupView = InfoPopupView; }
