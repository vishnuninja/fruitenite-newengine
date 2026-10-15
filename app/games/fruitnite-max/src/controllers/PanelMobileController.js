// ============================================================================
// PanelMobileController for ExternalUI
// ============================================================================

var ParentPanelCtrl = (typeof PanelController === "function") ? PanelController.prototype : {};

PanelMobileController = function (coreApp) {
    if (typeof PanelController === "function") {
        PanelController.call(this, coreApp);
    }
    this.controller = "PanelMobileController";
    this.view = (typeof DummyPanelView !== "undefined") ? new DummyPanelView() : {};
};

PanelMobileController.prototype = Object.create(ParentPanelCtrl);
PanelMobileController.prototype.constructor = PanelMobileController;

var pmc = PanelMobileController.prototype;

pmc.setView = function(view){
    this.view = view || (typeof DummyPanelView !== "undefined" ? new DummyPanelView() : {});
    this.slotModel = (typeof coreApp !== "undefined" && coreApp.gameModel) ? coreApp.gameModel : (this.slotModel || {});
    this.addEvents();
};

pmc.setVariables = function(coreApp) {
    if (typeof PanelController === "function" && PanelController.prototype && typeof PanelController.prototype.setVariables === "function") {
        PanelController.prototype.setVariables.call(this, coreApp);
    }
};

pmc.addEvents = function(){
    if (typeof PanelController === "function" && PanelController.prototype && typeof PanelController.prototype.addEvents === "function") {
        PanelController.prototype.addEvents.call(this);
    }
    if (typeof _mediator !== "undefined") {
        _mediator.subscribe("totalBetUpdated", this.updateMobilePanelBet.bind(this));
        _mediator.subscribe("sliderCoinValueUpdated", this.onSliderCoinValueUpdated.bind(this));
        _mediator.subscribe("sliderLineValueUpdated", this.onSliderLineValueUpdated.bind(this));
        if (typeof _events !== "undefined" && _events.core && _events.core.gameCreationCompleted) {
            _mediator.subscribe(_events.core.gameCreationCompleted, this.updateHomeMenuParent.bind(this));
        }
    }
};

pmc.onSliderCoinValueUpdated = function(data){
    if (typeof _mediator !== "undefined") {
        _mediator.publish("coinValueUpdated", {index: data.index});
        _mediator.publish("totalBetUpdated");
    }
};

pmc.onSliderLineValueUpdated = function(data){
    if (typeof _mediator !== "undefined") {
        _mediator.publish("lineValueUpdated", {index: data.index});
        _mediator.publish("totalBetUpdated");
    }
};

pmc.updateMobilePanelBet = function(){    
    var totalBet = (this.slotModel && this.slotModel.getTotalBet) ? this.slotModel.getTotalBet() : 0;
    if (this.view && this.view.onTotalBetUpdated) {
        this.view.onTotalBetUpdated(totalBet);
    }
};

pmc.updateHomeMenuParent = function(){
    if (this.view && this.view.updateHomeMenuParent) {
        this.view.updateHomeMenuParent();
    }
};

if (typeof window !== "undefined") {
    window.PanelMobileController = PanelMobileController;
}