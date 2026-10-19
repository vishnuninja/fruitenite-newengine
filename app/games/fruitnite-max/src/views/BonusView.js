// ============================================================================
// ES6 Class Definition: BonusView
// ============================================================================

class BonusView extends ViewContainer {
    constructor(argument) {
	super(...arguments);
	this.parent = argument ? argument.parent : undefined;
}

    createView(argument) {
}

    createAllEvents(argument) {
	// body...
}

    resize(argument) {
}

    show(argument) {
	this.visible = true;
}

    hide(argument) {
	this.visible = false;
}

    destroy(argument) {
	this.destroy();
}

    onCloseBonusRound() {

}

}



