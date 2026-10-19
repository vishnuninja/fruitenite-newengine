// ============================================================================
// ES6 Class Definition: GambleView
// ============================================================================

class GambleView extends ViewContainer {
    constructor(argument) {
	super(...arguments);
}

    createView(argument) {
	console.log(" core gamble ");
	this.hide();
}

    onCollectClick() {
	//close bonus round 
	this.toggleWinButtons(false);
	this.hide();
	//trigger to show win from gamble and update balance 
}

    onContinueClick() {
	this.msgTxt.text = "CHOOSE RED OR BLUE SCARAB TO GAMBLE OR TAKE WIN";
	this.toggleOption(true);
	this.currentBet = coreApp.gameModel.gambleData.winAmount;
	this.betAmountTxt.text = pixiLib.getFormattedAmount(this.currentBet);
	this.winAmountTxt.text = "";
	this.toggleWinButtons(false);
}

    toggleWinButtons(bool) {
	this.continueBtn.visible = bool;
	this.collectBtn.visible = bool;
	pixiLib.setInteraction(this.collectBtn, bool);
	pixiLib.setInteraction(this.continueBtn, bool);
}

    onGambleResponse() {
	setTimeout(this.delayResult.bind(this), 1200);
}

    delayResult() {
}

    toggleOption(bool) {
	
	pixiLib.setInteraction(this.redBtn, bool);
	pixiLib.setInteraction(this.blueBtn, bool);
	if(bool == true){
		this.msgTxt.text = "CHOOSE RED OR BLUE SCARAB TO GAMBLE OR TAKE WIN";
		this.redYoyo = TweenMax.to(this.redBtn.scale, 0.5, {x:0.8, y:0.8, yoyo:true, repeat:-1} );
		this.blueYoyo = TweenMax.to(this.blueBtn.scale, 0.5, {x:0.8, y:0.8, yoyo:true, repeat:-1} );
	}else{
		if(this.redYoyo){
			this.redYoyo.kill();
			this.blueYoyo.kill();	
		}
	}
	
}

    onPickGamble() {
	this.msgTxt.text = "GOOD LUCK";
	console.log(" ==== picked ==== ");

	_mediator.publish("callGambleRequest", {
		"position": 1,
		"betAmount": this.currentBet 
	});

	this.toggleOption(false);

	//play card rotation animations here 
	this.cardRotationAnim(true);
}

    createAllEvents(argument) {
	// body...
}

    resize(argument) {
}

    show(argument) {
}

    hide(argument) {
}

    destroy(argument) {
}

}



