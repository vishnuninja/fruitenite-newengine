var _ng = _ng || {};

class ElapsedTimeEUI {
    constructor(parent) {
        this.parentExternalUI = parent;
        if (!_ng.GameConfig.showElapsedTime || isHistoryMode) return;
        this.setConfig();
        this.addEvents();
        this.show();
    }

    setConfig() {
        if (!_ng.GameConfig.elapsedTimeConfig) return;
        window.externalUi.call('elapsed-time', "setPosition", _ng.GameConfig.elapsedTimeConfig[_viewInfoUtil.viewType]);
    }

    addEvents() {
        _mediator.subscribe(_events.core.onResize, this.resize.bind(this));
    }

    show() {
        window.externalUi.call('elapsed-time', "show");
    }

    hide() {
        window.externalUi.call('elapsed-time', "hide");
    }

    resize() {
        if (_viewInfoUtil.device == 'Desktop') return;
        window.externalUi.call('elapsed-time', "setPosition", _ng.GameConfig.elapsedTimeConfig[_viewInfoUtil.viewType]);
    }
}


_ng.ElapsedTimeEUI = ElapsedTimeEUI;

