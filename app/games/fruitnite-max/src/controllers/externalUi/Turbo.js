var _ng = _ng || {};

class TurboEUI {
    constructor() {}

    setGameSpeed(speed) {
        _ng.GameConfig.FastAnim = false;
        if (speed === 'normal') {
            _mediator.publish("onSloAnimQuickSpinOn");
        } else if (speed === 'quick') {
            _mediator.publish("onSloAnimQuickSpinOn");
            _ng.GameConfig.FastAnim = true;
        } else if (speed === 'turbo') {
            _mediator.publish("onSloAnimQuickSpinOff");
        }
        this.updateTurboIcons(speed);
    }

    updateTurboIcons(speed) {
        window.externalUi.call('turbo-off-button', 'hide');
        window.externalUi.call('turbo-fast-button', 'hide');
        window.externalUi.call('turbo-on-button', 'hide');

        if (speed === 'normal') {
            window.externalUi.call('turbo-fast-button', 'show');
        } else if (speed === 'quick') {
            window.externalUi.call('turbo-on-button', 'show');
        } else if (speed === 'turbo') {
            window.externalUi.call('turbo-off-button', 'show');
        }
    }
}


_ng.TurboEUI = TurboEUI;

