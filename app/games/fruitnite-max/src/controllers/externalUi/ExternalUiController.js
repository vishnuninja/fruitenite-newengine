var _ng = _ng || {};

class ExternalUiController {
    constructor() {
  this.musicEui = new _ng.Music();
  this.settingsUi = new _ng.SettingsUi(this);
  this.betUi = new _ng.BetUi();
  this.turbo = new _ng.TurboEUI();
  this.autoPlay = new _ng.AutoPlayEUI();
  this.ticker = new _ng.TickerEUI(this);
  this.commonPopup = new _ng.CommonPopup();
  this.promoView = new _ng.PromoView();
  this.errorView = new _ng.ErrorViewEUI();
  this.gameInfo = new _ng.GameInfoEUI();
  this.replay = new _ng.ReplayEUI(this); 
  this.elapsedTIme = new _ng.ElapsedTimeEUI(this);
  this.setGameConfig();
  this.addEventListeners();
  this.isStopClickAllowed = false;
  this.spaceHoldCounter = 0;
  this.isSpaceBarOnHold = false;
  this.spaceBarTimeoutRef = null;
  this.isHistoryOpen = false;
    }

    setGameConfig() {
    if (!window.externalUi) return;

      const params = new URLSearchParams(window.location.search);
    
    var viewInfo = (typeof _viewInfoUtil !== "undefined" && _viewInfoUtil) ? _viewInfoUtil : (typeof coreApp !== "undefined" && coreApp && coreApp.viewInfoUtil);
    if (!viewInfo) return;
    var renderer = (typeof coreApp !== "undefined" && coreApp && coreApp.gameView && coreApp.gameView.renderer) ? pixiLib.getRenderer() : null;
    var resolution = (renderer && renderer.resolution) ? renderer.resolution : (window.devicePixelRatio || 1);

    window.externalUi.call('game_ui', 'setGameConfig', {
      width: viewInfo.getWindowWidth() * resolution * .8,
      height: viewInfo.getWindowHeight() * resolution * .8,
      lang: params.get('user_locale') || 'en',
      gameName: _ng.GameConfig.gameName,
    });
    this.resize();

    }

    setCurrency() {
    window.externalUi.call('ui-help-popup', 'setCurrency', coreApp.gameModel.getCurrencyCode());

    }

    handleUIButton(e) {
    const {detail} = e;
    switch (detail) {
      case 'settings-button':
        if(this.isSpaceBarOnHold) return;
        this.settingsUi.syncInitialSettings();
        this.settingsUi.show();
        break;
      case 'music-on-button':
      case 'music-off-button':
        if(this.isSpaceBarOnHold) return;
        const visible = window.externalUi.call('ui-sound-range', 'isVisible');
        window.externalUi.call('ui-sound-range', visible ? 'hide' : 'show');
       
        break;

      case 'turbo-off-button':
       this.turbo.setGameSpeed('normal');
       this.settingsUi.setTurbo('normal');
        break;

      case 'turbo-fast-button':
        this.turbo.setGameSpeed('quick');
        this.settingsUi.setTurbo('quick');

        break;

      case 'turbo-on-button':
        this.turbo.setGameSpeed('turbo');
        this.settingsUi.setTurbo('turbo');
        
        break;

      case 'plus-button':
        if(this.isSpaceBarOnHold) return;
        this.betUi.increaseBet();
        this.betUi.show();
        break;

      case 'minus-button':
        if(this.isSpaceBarOnHold) return;
        this.betUi.decreaseBet();
        this.betUi.show();
        break;

      case 'plus-button-popup':
        this.betUi.increaseBet();
        break;

      case 'minus-button-popup':
        this.betUi.decreaseBet();
        break;

      case 'max-bet':
        this.betUi.maxBet();
        break;

      case 'spin-button':
        if(_ng.externalUiController.isHistoryOpen)  return;
        this.spinActive(true);
        _mediator.publish("spinClick");

        break;
      case 'spin-stop-button':
        this.spaceHoldCounter += 1;
        if(this.spaceBarTimeoutRef) clearTimeout(this.spaceBarTimeoutRef);
        if(this.spaceHoldCounter > 5){
          this.isSpaceBarOnHold = true;
          let startCounter = this.spaceHoldCounter;
          this.spaceBarTimeoutRef = setTimeout(() => {
            if(this.spaceHoldCounter === startCounter)  
              this.resetSpaceBarStatus();
          }, 100);
        }
        if(this.isStopClickAllowed) {
          _mediator.publish("forceStopBySpace");
          this.isStopClickAllowed = false;
        }

        break;
      case 'autoplay-button':
        this.autoPlay.click();

        break;
      case 'autoplay-stop-button':
        this.autoPlay.onStopAutoplayClick();

        break;
      case 'history':
      case 'history-button':
      case 'ui-history':
        if (this.isSpaceBarOnHold) return;
        if (typeof coreApp !== 'undefined' && coreApp.gameModel && 
            (coreApp.gameModel.isAutoSpinActive() || coreApp.gameModel.isFreeSpinActive()))
          return;
        if (this.settingsUi) {
          this.settingsUi.hide();
          this.settingsUi.hideOverlay();
        }
        if (typeof HistoryChoicePanel !== 'undefined' && HistoryChoicePanel.show) {
          HistoryChoicePanel.show();
        } else if (typeof _mediator !== 'undefined' && _mediator.publish) {
          _mediator.publish("SHOW_HISTORY_PANEL");
        }
        break;
      default:
        break;
    }

    }

    resetSpaceBarStatus() {
  this.isSpaceBarOnHold = false;
  this.spaceHoldCounter = 0;

    }

    getSpaceBarHoldStatus() {
  return this.isSpaceBarOnHold;

    }

    addEventListeners() {
  window.addEventListener('ui-button-click', (e) => this.handleUIButton(e));

  _mediator.subscribe("showMainGame", this.setBalance.bind(this));
  _mediator.subscribe(_events.slot.updateBalance, this.setBalance.bind(this));
  _mediator.subscribe(_events.core.onResize, this.resize.bind(this));
  _mediator.subscribe("introScreenHidden",this.show.bind(this));
  _mediator.subscribe("setSpaceBarEvent", this.setIdle.bind(this));
  _mediator.subscribe(_events.core.initReceived,this.setCurrency.bind(this));
  _mediator.subscribe("buyFreeSpinPopup",this.setPanelForBuyFreeSpin.bind(this));
  _mediator.subscribe("buyFreeSuperSpinPopup",this.setPanelForBuyFreeSpin.bind(this));
  _mediator.subscribe("onCloseBtn",this.setPanelForNormalSpin.bind(this));

  _mediator.subscribe("allReelsStopped", this.onAllReelStopped.bind(this));
  _mediator.subscribe("showSpinStop", this.onShowSpinStop.bind(this));


    }

    show() {
  window.externalUi.call('game_ui', 'show');

    }

    hide() {
  window.externalUi.call('game_ui', 'hide');

    }

    spinActive(value) {
  if(isHistoryMode) {
    return;
  }
  window.externalUi.call('spin-button', value ? 'hide' : 'show');
  window.externalUi.call('spin-button', value ? 'disable' : 'enable');
  window.externalUi.call('spin-stop-button', value ? 'show' : 'hide');
  window.externalUi.call('autoplay-button', value ? 'disable' : 'enable');
  if (value || (coreApp && coreApp.gameModel && coreApp.gameModel.getIsPFSActive())) {
    window.externalUi.call("plus-button", "disable");
    window.externalUi.call("minus-button", "disable");
  } else if (this.betUi) {
    this.betUi.updateUi();
  }

  const visible = window.externalUi.call('autoplay-stop-button', 'isVisible');
  if (!value && visible) {
    window.externalUi.call('info-board', 'hide');
    window.externalUi.call('autoplay-stop-button', 'hide');
    window.externalUi.call('autoplay-button', 'show');
  }

    }

    setPanelForBuyFreeSpin(value, status) {
  if(!_ng.buyFeaturePopupStatus)
  {
      this.setPanelForNormalSpin();
      return;
  }
  window.externalUi.call('spin-button', 'disable');
  window.externalUi.call('autoplay-button', 'disable');

    }

    setPanelForNormalSpin() {
  if(_ng.BuyFSenabled) return;
  window.externalUi.call('spin-button', 'enable');
  window.externalUi.call('autoplay-button', 'enable');

    }

    toggleTurbo(value) {
  // GlobalStore.turbo = value;
  window.externalUi.call('ui-popup-settings', 'setToggle', 'turbo', value);
  window.externalUi.call('turbo-off-button', value ? 'hide' : 'show');
  window.externalUi.call('turbo-on-button', value ? 'show' : 'hide');

    }

    resize() {
  if (_viewInfoUtil.isDesktop) return;
  window.externalUi.call('game_ui', 'setMode', 'mobile', '');
  if (_viewInfoUtil.viewType=== "VP") {
    window.externalUi.call('game_ui', 'setMode', 'mobile', 'portrait');
  } else {
    window.externalUi.call('game_ui', 'setMode', 'mobile', 'landscape');
  }

    }

    setBalance() {
  if(isHistoryMode) {
    return;
  }
  window.externalUi.call('balance-amount', 'setText', pixiLib.getFormattedAmount(coreApp.gameModel.getBalance()));

    }

    setIdle(data) {
  switch (data) {  
    case 'spinClick':        
      if(coreApp.gameController.allReelsStopped) {
        this.spinActive(false);
      }
      break;
    case 'idle':
      this.spinActive(true);
    default:
      break;
  }

    }

    onAllReelStopped() {
  this.isStopClickAllowed = false;

    }

    onShowSpinStop() {
  if(!_ng.isQuickSpinActive && !coreApp.gameController.isSpaceBarHeld) {
      this.isStopClickAllowed = true;
  }

    }

}


_ng.ExternalUiController = ExternalUiController;

