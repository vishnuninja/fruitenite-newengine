// ============================================================================
// ES6 Class Definition: CyprusPromoView
// ============================================================================

class CyprusPromoView extends ViewContainer {
    constructor(argument) {
    super(...arguments);
}

    createView() {


	var promoSpinStyle = new PIXI.TextStyle({
		fill: "#e9e7e7",
		fontFamily: "Verdana, Geneva, sans-serif",
		fontSize: 20,
		fontWeight: "bolder",
		stroke: "#0a0a0a",
		strokeThickness: 3
	});

	this.topStripContainer = pixiLib.getContainer();
	this.topStripContainer.name = "topStripContainer";
	this.addChild(this.topStripContainer);
	
	this.stripBg = pixiLib.getElement("Sprite","Top_Strip");
	this.stripBg.name = "stripBg";
	this.stripBg.anchor.set(0.5);
	this.stripBg.scale.set(0.6);
	this.topStripContainer.addChild(this.stripBg);

	this.promoSpinLeft = pixiLib.getElement("Text",promoSpinStyle);
	this.promoSpinLeft.name = "promoSpinLeft";
	this.promoSpinLeft.anchor.set(1, 0.5);
	this.promoSpinLeft.position.set(-70, -8.5);
	this.topStripContainer.addChild(this.promoSpinLeft);
	this.promoSpinLeft.text = "PROMO SPINS LEFT: ";
 
	this.winText = pixiLib.getElement("Text",promoSpinStyle);
	this.winText.name = "winText";
	this.winText.anchor.set(0, 0.5);
	this.winText.position.set(80, -8.5);
	this.topStripContainer.addChild(this.winText);
	this.winText.text = "WIN: ";

	this.addEvents();
    this.resize();
	this.visible = false;
}

    addEvents() {
}

    hide() {
    this.visible = false;
}

    show() {
    this.visible = true;
}

    destroy() {
    this.removeChild(this);
}

    onUpdatePromoSpinLeft(spinLeft) {
	if(this.promoSpinLeft)
    	this.promoSpinLeft.text = "PROMO SPINS LEFT : " + spinLeft;
}

    onUpdatePromoWinText(winAmount) {
	if(this.winText)
    	this.winText.text = "WIN: " +  pixiLib.getFormattedAmount(winAmount);
}

    resize() {
    // console.log("_viewInfoUtil.viewScale = ", _viewInfoUtil.viewScale);
    if (_viewInfoUtil.device === "Desktop") {
        // this.curTimeTxt.style.fontSize = 20 * 2;
        // this.curTimeTxt.scale.set(0.5);
        this.x = _viewInfoUtil.getWindowWidth() / 2;
        this.y = this.stripBg.height / 2;
    } else {
        // this.curTimeTxt.style.fontSize = 18 * 2;
        this.topStripContainer.scale.set(_viewInfoUtil.viewScale);
        this.x = _viewInfoUtil.getWindowWidth() / 2;
        this.y = 30 * _viewInfoUtil.viewScale;
        // this.scale.set(_viewInfoUtil.scale);
    }

}

}



