// ============================================================================
// PanelDesktopController for ExternalUI
// ============================================================================

var ParentPanelCtrl = (typeof PanelController === "function") ? PanelController.prototype : {};

PanelDesktopController = function (coreApp) {
    if (typeof PanelController === "function") {
        PanelController.call(this, coreApp);
    }
    this.controller = "PanelDesktopController";
    this.view = (typeof DummyPanelView !== "undefined") ? new DummyPanelView() : {};
};

PanelDesktopController.prototype = Object.create(ParentPanelCtrl);
PanelDesktopController.prototype.constructor = PanelDesktopController;

var pdc = PanelDesktopController.prototype;

pdc.addEvents = function(){
    if (typeof PanelController === "function" && PanelController.prototype && typeof PanelController.prototype.addEvents === "function") {
        PanelController.prototype.addEvents.call(this);
    }
};

pdc.setView = function(view){
    this.view = view || (typeof DummyPanelView !== "undefined" ? new DummyPanelView() : {});
    this.addEvents();
};

pdc.setVariables = function(coreApp) {
    if (typeof PanelController === "function" && PanelController.prototype && typeof PanelController.prototype.setVariables === "function") {
        PanelController.prototype.setVariables.call(this, coreApp);
    }
};

if (typeof window !== "undefined") {
    window.PanelDesktopController = PanelDesktopController;
}