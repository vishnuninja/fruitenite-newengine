// ============================================================================
// Consolidated PanelController & Safe Fallback Dummy View for ExternalUI
// ============================================================================

class DummyPanelView {
    constructor() {
        this.name = "DummyPanelView";
        this.spinButton = { interactive: true, buttonMode: true };
        this.autoSpinButton = { interactive: true, buttonMode: true };
        this.coinValue = {
            currentIndex: 0,
            setMaxIndex() { },
            checkButtonState() { },
            getCurrentIndex() { return 0; }
        };
        this.BuyControl = (typeof PIXI !== "undefined" && PIXI.Container) ? new PIXI.Container() : {
            addChild() { },
            removeChild() { },
            position: { set() { } },
            scale: { set() { } },
            visible: true
        };
    }

    setVariables() { }
    createView() { }

    onBetMaxClick() {
        if (typeof _ng !== "undefined" && _ng.externalUiController && _ng.externalUiController.betUi) {
            _ng.externalUiController.betUi.maxBet();
        }
    }
}

class PanelController {
    constructor() {
        this.view = new DummyPanelView();
        this.slotModel = null;
    }

    setView(view) {
        this.view = view || new DummyPanelView();
    }

    setVariables(coreApp) {
        this.controller = coreApp ? coreApp.gameController : null;
    }

    addEvents() {
        _mediator.subscribe(_events.core.gameCreationCompleted, this.setUpPanelValues.bind(this));
        _mediator.subscribe(_events.slot.totalBetUpdated, this.onTotalBetUpdated.bind(this));
        _mediator.subscribe("updateTotalBet", this.updateTotalBet.bind(this));
        _mediator.subscribe("updateTwoxbet", this.updateTwoxbet.bind(this));
        _mediator.subscribe("UPDATE_AUTOSPIN_COUNT", this.onAutoSpinCountUpdate.bind(this));
        _mediator.subscribe(_events.core.error, () => {
            setTimeout(() => {
                _mediator.publish("cancelAutoSpin");
            }, 100);
        });

        this.slotModel = (typeof coreApp !== "undefined" && coreApp.gameModel) ? coreApp.gameModel : null;
    }

    setUpPanelValues() {
        this.slotModel = (typeof coreApp !== "undefined" && coreApp.gameModel) ? coreApp.gameModel : (this.slotModel || {});
        this.updateTotalBet();
        _mediator.publish("checkBalanceForBuyFeature");
    }

    onTotalBetUpdated() {
        this.updateTotalBet();
        _mediator.publish("checkBalanceForBuyFeature");
    }

    updateTotalBet() {
        var slotModel = this.slotModel || (typeof coreApp !== "undefined" ? coreApp.gameModel : null);
        var totalBet = (slotModel && slotModel.getTotalBet) ? slotModel.getTotalBet() : 0;
        var antebet = (coreApp && coreApp.gameModel && coreApp.gameModel.spinData && coreApp.gameModel.spinData.antebet) ? coreApp.gameModel.spinData.antebet : 1;
        var effectiveBet = (_ng.twoXBetEnabled === true) ? (totalBet * antebet) : totalBet;

        _mediator.publish("updatePopupBet", effectiveBet);
        _mediator.publish("updateSetBet", effectiveBet);
        _mediator.publish("updateSelectorContainerBet", effectiveBet);
    }

    updateTwoxbet() {
        this.updateTotalBet();
    }

    onAutoSpinCountUpdate(count) {
        if (count) {
            _ng.autoPlayPrevCount = count;
        }
        if (count == 0) {
            _ng.autoPlayBeforeFg = false;
            _ng.autoPlayPrevCount = 0;
            _mediator.publish("enableBuyFeature");
        }
        if (coreApp && coreApp.gameModel && coreApp.gameModel.isAutoSpinActive() == true) {
            _mediator.publish("showNewMessage", (typeof gameLiterals !== "undefined" ? gameLiterals.spinsleft_text : "Spins left") + " " + count);
        }
    }
}