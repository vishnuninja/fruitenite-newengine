// ============================================================================
// Consolidated SettingsController & Safe Fallback Dummy View for ExternalUI
// ============================================================================

var _ng = _ng || {};

function DummySettingsView() {
    this.name = "DummySettingsView";
}
var dsv = DummySettingsView.prototype;
dsv.createView = function() {};
dsv.openSettingsPanel = function() {};
dsv.closeSettingsPanel = function() {};
dsv.volumeChange = function() {};
dsv.enableMenu = function() {};
dsv.onResize = function() {};
dsv.onSoundOffHandler = function() {};
dsv.onHistoryPanelClick = function() {};
dsv.onHistoryTitleClick = function() {};

SettingsView = DummySettingsView;
SettingsDesktopView = DummySettingsView;
SettingsMobileView = DummySettingsView;
GSettingView = DummySettingsView;
GSettingsDesktopView = DummySettingsView;
GSettingsMobileView = DummySettingsView;

if (typeof window !== "undefined") {
    window.SettingsView = DummySettingsView;
    window.SettingsDesktopView = DummySettingsView;
    window.SettingsMobileView = DummySettingsView;
    window.GSettingView = DummySettingsView;
    window.GSettingsDesktopView = DummySettingsView;
    window.GSettingsMobileView = DummySettingsView;
}

_ng.SettingsController = function () {
    this.view = new DummySettingsView();
    this.addEvents();
};

var sc = _ng.SettingsController.prototype;

sc.addEvents = function(){
    _mediator.subscribe(_events.core.onResize, this.onResize.bind(this));
    _mediator.subscribe("openSettingsPanel", this.onOpenSettingsPanel.bind(this));
    _mediator.subscribe("closeSettingsPanel", this.onCloseSettingsPanel.bind(this));
    _mediator.subscribe("spinStart", this.onSpinClickHandler.bind(this));
    _mediator.subscribe("EnablePanel", this.onEnablePanelHandler.bind(this));
    _mediator.subscribe("DisablePanel", this.onDisablePanel.bind(this));
    _mediator.subscribe("setVolume", this.onVolumeChange.bind(this));
};

sc.onVolumeChange = function(val){
    if (this.view && this.view.volumeChange) this.view.volumeChange(val);
};

sc.onSpinClickHandler = function(){
    if (this.view && this.view.enableMenu) this.view.enableMenu(false);
};

sc.onDisablePanel = function(){
    if (this.view && this.view.enableMenu) this.view.enableMenu(false);
};

sc.onEnablePanelHandler = function(){
    if (this.view && this.view.enableMenu) this.view.enableMenu(true);
};

sc.setView = function(view){
    this.view = view || new DummySettingsView();
};

sc.setVariables = function(coreApp){
    this.controller = coreApp ? coreApp.gameController : null;
};

sc.onOpenSettingsPanel = function(){
    if (this.view && this.view.openSettingsPanel) this.view.openSettingsPanel();
};

sc.onCloseSettingsPanel = function(){
    if (this.view && this.view.closeSettingsPanel) this.view.closeSettingsPanel();
};

sc.onResize = function(){
    if (this.view && this.view.onResize) this.view.onResize();
};

var SettingsController = _ng.SettingsController;
if (typeof window !== "undefined") {
    window.SettingsController = _ng.SettingsController;
}