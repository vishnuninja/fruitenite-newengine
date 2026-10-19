var _ng = _ng || {};

class SettingsUi {
  constructor(parent) {
    this.parentExternalUI = parent;
    this.addListeners();
  }

  addListeners() {
    window.addEventListener('ui-popup-settings-btns', (e) => this.handleSettingsButtons(e));
    window.addEventListener('ui-popup-settings-toggls', (e) => this.handleSettingsToggles(e));
    window.addEventListener('ui-other-buttons', (e) => this.handleOtherButtons(e));
  }

  syncInitialSettings() {
    var settingsArr = ['music', 'sound'];
    for (var i = 0; i < settingsArr.length; i++) {
      var status = pixiLib.getLocalStorageItem(settingsArr[i]) !== 'false';
      window.externalUi.call('ui-popup-settings', 'setToggle', settingsArr[i], status);
    }

    // In external ui 'intro_screen' is used and in core 'noIntro' is used...
    const noIntro = pixiLib.getLocalStorageItem("noIntro") === 'true';
    window.externalUi.call('ui-popup-settings', 'setToggle', 'intro_screen', !noIntro);
  }

  show() {
    window.externalUi.call('ui-popup-settings', 'show');
  }

  hide() {
    window.externalUi.call('ui-popup-settings', 'hide');
    this.hideOverlay();
  }

  // TODO fix overlay issue in core
  // TODO remove show and hide overlay after fix
  showOverlay() {
    window.externalUi.call('overlay', 'show');
    var el = document.querySelector('.overlay');
    if (el) {
      el.style.display = '';
    }
  }

  hideOverlay() {
    window.externalUi.call('overlay', 'hide'); // not working
    var el = document.querySelector('.overlay');
    if (el) {
      el.style.display = 'none';
    }
  }

  handleSettingsButtons(e) {
    const { detail } = e;
    if (detail === 'history') {
      if (coreApp.gameModel.isAutoSpinActive() || coreApp.gameModel.isFreeSpinActive())
        return;
      console.log('Opening History Choice Panel');
      this.hide();
      this.hideOverlay();
      HistoryChoicePanel.show();
      window.addEventListener('history-choice-selected', function handleChoice(event) {
        const choice = event.detail;
        if (choice === 'history') {
          if (coreApp.gameView.settingsPanel) {
            coreApp.gameView.settingsPanel.onHistoryPanelClick();
          }
        } else if (choice === 'replay') {
          if (coreApp.gameView.settingsPanel) {
            coreApp.gameView.settingsPanel.onHistoryTitleClick();
          }
        }
        window.removeEventListener('history-choice-selected', handleChoice);
      }, { once: true });
    }

    if (detail === 'paytable') {
      console.log('paytable button click');
      window.externalUi.call('ui-help-popup', 'show');
    }
  }

  handleSettingsToggles(e) {
    const { detail } = e;

    var item = detail.item;
    var state = detail.state;
    pixiLib.setLocalStorageItem(item, state);
    switch (item) {
      case 'music':
        if (state) _mediator.publish("ambienceSoundOff");
        else _mediator.publish("ambienceSoundOn");
        break;

      case 'sound':
        if (state) _mediator.publish("soundEffectOff");
        else _mediator.publish("soundEffectOn");
        break;

      case 'turbo':
        if (state) this.parentExternalUI.turbo.setGameSpeed('normal');
        else this.parentExternalUI.turbo.setGameSpeed('turbo');
        break;

      case 'intro_screen':
        pixiLib.setLocalStorageItem('noIntro', !state);
        break;
    }
  }

  handleOtherButtons(e) {
    const { detail } = e;
    if (detail == 'settings-close') {
      this.hideOverlay();
    }
    if (detail == 'help-page-close') {
      this.hideOverlay();
    }
  }

  setTurbo(speed) {
    window.externalUi.call('ui-popup-settings', 'setToggle', 'turbo', false);

    if (speed === 'normal') {
      window.externalUi.call('ui-popup-settings', 'setToggle', 'turbo', true);
    } else if (speed === 'turbo') {
    } else if (speed === 'quick') {
    }
  }
}


_ng.SettingsUi = SettingsUi;

