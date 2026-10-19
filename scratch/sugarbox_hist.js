
	this.FSpinsLefttxt = pixiLib.getElement("Text",txtStyle);
	this.FSpinsLefttxt.name ="FSpinsLefttxt";
	this.FSpinsLefttxt.anchor.set(0.5);
	pixiLib.setText(this.FSpinsLefttxt, gameLiterals.freeSpinTxt);
	this.historyBase.addChild(this.FSpinsLefttxt);
	this.FSpinsLefttxt.position.set(6,-288);
	this.FSpinsLefttxt.visible = false;

	this.fsleftNum = pixiLib.getElement("Text", fsLeftStyle);
	this.fsleftNum.name = "fsleftNum";
	this.historyBase.addChild(this.fsleftNum);
	pixiLib.setText(this.fsleftNum, "");
	this.fsleftNum.anchor.set(0.5);
	this.fsleftNum.position.set(0,-230);

	this.historyMask = pixiLib.getRectangleSprite(this.historyBase.width *.5, this.historyBase.height*.5, 0x00ffff);
	this.historyBase.addChild(this.historyMask);
	this.historyMask.position.set(-125,-94);
	this.historyMask.name = "historyMask";
	this.historyMask.scale.set(1,0.9);
    this.historyboxContainer.mask = this.historyMask;
	
}

sView.AddHistBox = function(num,win,symbolpop,historySym) {

	var limit=coreApp.gameModel.obj.current_round.misc_prizes[num].old_reel_symbol.length;
	var sym = coreApp.gameModel.obj.current_round.misc_prizes[num].old_reel_symbol;
	for (var j = 0; j <limit ; j++) {
		this.count+=1;
		this.tumbleHistBox = pixiLib.getElement("Sprite","historyTile");
		this.tumbleHistBox.name = "tumbleHistBox";
		this.historyboxContainer.addChild(this.tumbleHistBox);
		this.tumbleHistBox.anchor.set(0.5);
		this.tumbleHistBox.scale.set(0.75);	
		this.tumbleHistBox.y = -500;
		this.HistoryArray.push(this.tumbleHistBox);

		const stripStyle = new PIXI.TextStyle({
			dropShadowAlpha: 0.2,
			dropShadowColor: "#702323",
			dropShadowDistance: 0,
			fill: "#fcfcfc",
			// fontFamily: "Tahoma",
			fontSize: 34,
			fontWeight: "bold",
			lineJoin: "bevel",
			miterLimit: 4,
			stroke: "#d63d3d",
			strokeThickness: 7,
			maxWidth: 180,
		 });
		this.noOfSympop = pixiLib.getElement("Text",stripStyle);
		this.noOfSympop.anchor.set(0.5);
		this.noOfSympop.position.set(-130,-5);
		this.tumbleHistBox.addChild(this.noOfSympop);
		pixiLib.setText(this.noOfSympop,symbolpop[this.count - 1]);

		this.symboltexture = pixiLib.getElement("Sprite",historySym[this.count - 1]);
		this.symboltexture.scale.set(0.2);
		this.symboltexture.anchor.set(0.5);
		this.symboltexture.position.set(-93,-5);
		this.tumbleHistBox.addChild(this.symboltexture);

		this.wingot = pixiLib.getElement("Text",stripStyle);
		this.wingot.anchor.set(0.5);
		this.wingot.position.set(62,-5);
		this.tumbleHistBox.addChild(this.wingot);
		pixiLib.setText(this.wingot,pixiLib.getFormattedAmount(win[this.count - 1]))

		this.tweenHistBox(this.count - 1);
		this.stripNum+=1;

		if(this.count>5){
			this.removeAfter5();
			this.scrollHistoryBox();
		}
	}
}

sView.scrollHistoryBox = function() {
	pixiLib.setInteraction(this.upArrow, true);
}

sView.removeHistBox = function(){
	this.historyboxContainer.y = 0;
	for(var i=0;i<this.HistoryArray.length;i++){
		this.tweenRemove(i);
	}
	this.HistoryArray = [];
	this.flag=0;
	this.count=0;
	this.stripNum=0;
	pixiLib.setInteraction(this.upArrow , false);
	pixiLib.setInteraction(this.downArrow , false);
}

sView.tweenHistBox = function(num){
	TweenMax.to(this.tumbleHistBox, 0.5, {
		y: 100-(this.tumbleHistBox.height*num),
		ease: Sine.easeInOut,
	});
	_sndLib.play(_sndLib.sprite.Outro);
}
sView.removeAfter5 = function(){
	TweenMax.to(this.historyboxContainer, 0.5, {
		y: this.historyboxContainer.y+this.tumbleHistBox.height,
		ease: Elastic.easeInOut.config(1.1, 1),
	});
}
sView.tweenRemove = function(i){
	TweenMax.to(this.HistoryArray[i], i * 0.1, {
		y: 1000,
		ease: Power1.easeOut,
		onComplete : function(){
			this.historyboxContainer.removeChild(this.HistoryArray[i]);
		}.bind(this)
	});
}

sView.createFadingContainer = function () {

	// const style = {
	// 	align: "center",
	// 	fill: "#ededed",
	// 	fontFamily: "Tahoma",
	// 	fontSize: 21,
	// 	fontWeight: "bolder",
	// 	lineJoin: "round",