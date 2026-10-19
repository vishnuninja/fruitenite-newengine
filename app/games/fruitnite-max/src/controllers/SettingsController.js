// ============================================================================
// Consolidated SettingsController & Safe Fallback Dummy View for ExternalUI
// ============================================================================

var _ng = _ng || {};

class DummySettingsView {
    constructor() {
        this.name = "DummySettingsView";
    }

    createView() {}
    openSettingsPanel() {}
    closeSettingsPanel() {}
    volumeChange() {}
    enableMenu() {}
    onResize() {}
    onSoundOffHandler() {}
    onHistoryPanelClick() {}
    onHistoryTitleClick() {}
}



if (typeof window !== "undefined") {
    window.SettingsView = DummySettingsView;
    window.SettingsDesktopView = DummySettingsView;
    window.SettingsMobileView = DummySettingsView;
    window.GSettingView = DummySettingsView;
    window.GSettingsDesktopView = DummySettingsView;
    window.GSettingsMobileView = DummySettingsView;
}

class SettingsController {
    constructor() {
        this.view = new DummySettingsView();
        this.addEvents();
    }

    addEvents() {
        _mediator.subscribe(_events.core.onResize, this.onResize.bind(this));
        _mediator.subscribe("openSettingsPanel", this.onOpenSettingsPanel.bind(this));
        _mediator.subscribe("closeSettingsPanel", this.onCloseSettingsPanel.bind(this));
        _mediator.subscribe("spinStart", this.onSpinClickHandler.bind(this));
        _mediator.subscribe("EnablePanel", this.onEnablePanelHandler.bind(this));
        _mediator.subscribe("DisablePanel", this.onDisablePanel.bind(this));
        _mediator.subscribe("setVolume", this.onVolumeChange.bind(this));
    }

    onVolumeChange(val) {
        if (this.view && this.view.volumeChange) this.view.volumeChange(val);
    }

    onSpinClickHandler() {
        if (this.view && this.view.enableMenu) this.view.enableMenu(false);
    }

    onDisablePanel() {
        if (this.view && this.view.enableMenu) this.view.enableMenu(false);
    }

    onEnablePanelHandler() {
        if (this.view && this.view.enableMenu) this.view.enableMenu(true);
    }

    setView(view) {
        this.view = view || new DummySettingsView();
    }

    setVariables(coreApp) {
        this.controller = coreApp ? coreApp.gameController : null;
    }

    onOpenSettingsPanel() {
        if (this.view && this.view.openSettingsPanel) this.view.openSettingsPanel();
    }

    onCloseSettingsPanel() {
        if (this.view && this.view.closeSettingsPanel) this.view.closeSettingsPanel();
    }

    onResize() {
        if (this.view && this.view.onResize) this.view.onResize();
    }
}


_ng.SettingsController = SettingsController;

