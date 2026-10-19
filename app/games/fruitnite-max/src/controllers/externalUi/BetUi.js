var _ng = _ng || {};

class BetUi {
  constructor() {
    this.addListeners();
  }

  addListeners() {
    _mediator.subscribe("updateSetBet", this.updateUi.bind(this));
    _mediator.subscribe("setIncrement", this.increaseBet.bind(this));
    _mediator.subscribe("setDecrement", this.decreaseBet.bind(this));
    _mediator.subscribe("UpdateBet", (totalBet) => {
      const antebet = (coreApp && coreApp.gameModel && coreApp.gameModel.spinData && coreApp.gameModel.spinData.antebet) ? coreApp.gameModel.spinData.antebet : 1;
      const effectiveBet = (_ng.twoXBetEnabled === true) ? (totalBet * antebet) : totalBet;
      this.updateUi(effectiveBet);
    });
  }

  show() {
    if (window.externalUi) {
      window.externalUi.call('ui-bet-popup', 'show');
    }
  }

  updateUi(betAmount) {
    if (typeof isHistoryMode !== "undefined" && isHistoryMode) {
      return;
    }
    if (!coreApp || !coreApp.gameModel || !coreApp.gameModel.panelModel) {
      return;
    }

    const panelModel = coreApp.gameModel.panelModel;
    const currentBetIndex = panelModel.getCoinIndex();
    const coinArray = panelModel.getCoinArray() || [];
    const minIndex = 0;
    const maxIndex = coinArray.length > 0 ? coinArray.length - 1 : 0;

    if (betAmount === undefined || betAmount === null || typeof betAmount !== "number") {
      const totalBet = coreApp.gameModel.getTotalBet();
      const antebet = (coreApp.gameModel.spinData && coreApp.gameModel.spinData.antebet) ? coreApp.gameModel.spinData.antebet : 1;
      betAmount = (_ng.twoXBetEnabled === true) ? (totalBet * antebet) : totalBet;
    }

    const formatted = pixiLib.getFormattedAmount(betAmount);
    const disableMinus = (currentBetIndex <= minIndex) ? 'disable' : 'enable';
    const disablePlus = (currentBetIndex >= maxIndex) ? 'disable' : 'enable';

    if (window.externalUi) {
      window.externalUi.call('bet-amount', 'setText', formatted, '');
      window.externalUi.call('bet-amount-popup', 'setText', formatted, '');
      window.externalUi.call('minus-button', disableMinus);
      window.externalUi.call('plus-button', disablePlus);
      window.externalUi.call('minus-button-popup', disableMinus);
      window.externalUi.call('plus-button-popup', disablePlus);

      let helpBetAmount = betAmount;
      if (_ng.twoXBetEnabled && coreApp.gameModel.spinData && coreApp.gameModel.spinData.antebet) {
        helpBetAmount = betAmount / coreApp.gameModel.spinData.antebet;
      }
      window.externalUi.call('ui-help-popup', 'setBet', helpBetAmount * 10);
    }
  }

  increaseBet() {
    if (!coreApp || !coreApp.gameModel || !coreApp.gameModel.panelModel) return;
    const panelModel = coreApp.gameModel.panelModel;
    const currentIndex = panelModel.getCoinIndex();
    const coinArray = panelModel.getCoinArray();
    if (!coinArray || coinArray.length === 0) return;
    if (currentIndex < coinArray.length - 1) {
      this.setBet(currentIndex + 1);
    }
  }

  decreaseBet() {
    if (!coreApp || !coreApp.gameModel || !coreApp.gameModel.panelModel) return;
    const panelModel = coreApp.gameModel.panelModel;
    const currentIndex = panelModel.getCoinIndex();
    if (currentIndex > 0) {
      this.setBet(currentIndex - 1);
    }
  }

  maxBet() {
    if (!coreApp || !coreApp.gameModel || !coreApp.gameModel.panelModel) return;
    const panelModel = coreApp.gameModel.panelModel;
    const coinArray = panelModel.getCoinArray();
    if (!coinArray || coinArray.length === 0) return;
    this.setBet(coinArray.length - 1);
  }

  setBet(index) {
    if (!coreApp || !coreApp.gameModel || !coreApp.gameModel.panelModel) return;
    const panelModel = coreApp.gameModel.panelModel;
    panelModel.setBetIndex(index);

    const totalBet = coreApp.gameModel.getTotalBet();
    const antebet = (coreApp.gameModel.spinData && coreApp.gameModel.spinData.antebet) ? coreApp.gameModel.spinData.antebet : 1;
    const effectiveBet = (_ng.twoXBetEnabled === true) ? (totalBet * antebet) : totalBet;

    _mediator.publish("coinValueUpdated", { index: index });
    _mediator.publish("totalBetUpdated");
    _mediator.publish("updateTotalBet");
    _mediator.publish("updateSetBet", effectiveBet);
    this.updateUi(effectiveBet);
  }
}

_ng.BetUi = BetUi;
