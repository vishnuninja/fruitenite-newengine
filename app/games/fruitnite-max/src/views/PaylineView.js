// ============================================================================
// ES6 Class Definition: PaylineView
// ============================================================================

class PaylineView extends ViewContainer {
    constructor(argument) {
	super(...arguments);
}

    createView(argument) {
	this.paylinesAry = [];
	/*
	payline types: 
	1. static
		"lineNum": [
			{ animationDuration: 3000, winSound: { name: "sSym" } }, 
			{ "imgName":"line1", props: { scale: 1.1 }, "type": "sprite" }
		],
	2. sprites:
		"lineNum": [
			{ animationDuration: 3000, winSound: { name: "sSym" } }, 
			{ "prefix": "scatter_", "startIndex": "0", "endIndex": "49", "digit": "dual", "animationSpeed": "0.3", "loop": false, props: { scale: 1.1 }, "type": "spriteAnimation" }
		],
	3. spine:
		"lineNum": [
			{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } }, 
			{ spineName: "girl", defaultAnimation: "idle", winAnimation: "win", loop: false, props: { scale: 0.45 }, type: "spine" }
	],
	*/
	if(_ng.isSecondaryAssetsLoaded){
		this.createpaylines();
	}	
}

    createpaylines() {
	this.paylineConfig = _ng.GameConfig.paylinesConfig ? _ng.GameConfig.paylinesConfig : [];
	this.paylinesAry = [];

	for(var k in this.paylineConfig){
		if(this.paylineConfig[k][1].type === "spine"){//spine
			this["line"+k] = pixiLib.getElement("Spine", this.paylineConfig[k][1].spineName);//winAnimation
			this["line"+k].animName = this.paylineConfig[k][1].winAnimation;
			this["line"+k].state.setAnimation(0, this.paylineConfig[k][1].winAnimation, false);
		}else if(this.paylineConfig[k][1].type === "spriteAnimation"){//spriteAnimation
			this["line"+k] = pixiLib.getElement("AnimatedSprite", this.paylineConfig[k][1]);
		}else{//imgName
			this["line"+k] = pixiLib.getElement("Sprite", this.paylineConfig[k][1].imgName);
		}

		this["line"+k].type = this.paylineConfig[k][1].type;
		this.addChild(this["line"+k]);
		pixiLib.setProperties(this["line"+k], this.paylineConfig[k][1].props);
		this.paylinesAry.push(this["line"+k]);
	}

	this.hideAllLinesNew();
	// this.visible = false;	
}

    hideAllLinesNew() {
	if(this.paylinesAry.length>0){
		for (var i = 0; i < this.paylinesAry.length; i++) {
			this.paylinesAry[i].visible = false;
		}
	}
}

    getTextures(obj) {
	var ary = [];
	for (var i = 1; i <= obj.end; i++) {
		var counter = i<10? "0"+i : i;
		ary.push(obj.prefix+counter);
	}
	return ary;
}

    showAllLines() {
	for (var i = 0; i < this.paylinesAry.length; i++) {
		this.paylinesAry[i].visible = true;
		if(this.paylinesAry[i].type === "spine"){
			this.paylinesAry[i].state.setAnimation(0, this.paylinesAry[i].animName, false);
		}
	}
}

    showMultiLines(winLinesAry) {
	if(this.paylinesAry.length>0){
		this.hideAllLines();
		for (var i = 0; i < this.paylinesAry.length; i++) {
			for (var j = 0; j < winLinesAry.length; j++) {
				if(winLinesAry[j] == i){
					this.paylinesAry[i].visible = true;
					if(this.paylinesAry[i].type === "spine"){
						this.paylinesAry[i].state.setAnimation(0, this.paylinesAry[i].animName, false);
					}	
				}
			}
			
		}
	}
}

    showSingleLine(id) {
	this.hideAllLines();
	if(this.paylinesAry.length>0){
		this.paylinesAry[id-1].visible = true;
		if(this.paylinesAry[id-1].type === "spine"){
			this.paylinesAry[id-1].state.setAnimation(0, this.paylinesAry[id-1].animName, false);
		}
	}
}

    hideAllLines() {
}

    resize(argument) {
}

    show() {
	this.visible = true;
}

    hide() {
	this.visible = false;
}

    destroy() {
	this.destroy();
}

}



