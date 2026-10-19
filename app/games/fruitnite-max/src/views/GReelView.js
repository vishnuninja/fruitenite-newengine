// ============================================================================
// ES6 Class Definition: ReelView
// ============================================================================

class ReelView extends ViewContainer {
    constructor(argument) {
	super(...arguments);
}

    createView(argument) {
	this.forceStop = false;
	this.reelsStarted=false;
	this.reelConfig = _ng.GameConfig.ReelViewUiConfig;
	this.isAnticipateSndPlaying = false;
	this.createExtraBottomElements();
	if (this.reelConfig.reelGridBottom) {
		this.createBottomGrid();
	}
	if (this.reelConfig.fsReelGridBottom) {
		this.createFSBottomGrid();
	}
	//actual gamereels 
	this.createReels();
	if (this.reelConfig.data.maskInfo.maskType == 1) {
		this.createSingleMask();
	} else if (this.reelConfig.data.maskInfo.maskType == 2){
        this.createReelWiseMask();
	} else if (this.reelConfig.data.maskInfo.maskType == 3){
		this.createMaskWithSprite();
	}	
	if (this.reelConfig.reelGridTop) {
		this.createTopGrid();
	}
	if (this.reelConfig.fsReelGridTop) {
		this.createFSTopGrid();
	}

	if (this.reelConfig.reelGridTopAnim) {
		this.createReelGridTopAnim();
	}
	//@todo can write extra elements code 
	this.createAnticipation();
	this.createExtraElements();
    _mediator.subscribe("scaleReelMaskOnEachReelStop", this.updateReelWiseMask.bind(this));
	_mediator.subscribe("forceStopBySpace",this.forceStopBySpace.bind(this));
	// _mediator.subscribe("spinStartCheck",this.spinStartCheck.bind(this));
	this.startSpinTimeoutArr = [];
	this.stopSpinTimeoutArr = [];

	setTimeout(function (){
	    if(this.reelConfig.data.reelSpinConfig.hideTopSymbol){
			this.toggleMask(false);
		}
	}.bind(this), 200);

    _mediator.subscribe("FadeReels",this.fadeReels.bind(this))
}

    createExtraBottomElements() {
	
}

    createExtraElements() {
	this.winSymbolsToRemove = {};
	this.currentTumbleIndex = 0;
	_mediator.subscribe("spinStart", () => {
		this.currentTumbleIndex = 0;
	});
}

    showWildMultiplier() {}

    createAnticipation() {
	//@todo create anticipate
	/*if(this.reelConfig.scatterAnticipating){
		this.scatterAnticipate = pixiLib.getElement("Sprite", this.reelConfig.scatterAnticipating);
	}*/
}

    createAnticipate() {
	//@todo create anticipate
	/*if(this.reelConfig.scatterAnticipating){
		this.scatterAnticipate = pixiLib.getElement("Sprite", this.reelConfig.scatterAnticipating);
	}*/
}

    showAnticipate(reelId) {
	//@todo show and set postion
}

    clearAnticipate() {
	//@todo hide anticipate
}

    createBottomGrid(argument) {
	//@todo need to update frame in freespin/normal spin
	this.bottomGrid = pixiLib.getElement("Sprite", this.reelConfig.reelGridBottom.image);
	this.bottomGrid.name = "bottomGrid";
	this.addChild(this.bottomGrid);
	pixiLib.setProperties(this.bottomGrid, this.reelConfig.reelGridBottom.props["VD"]);
}

    createFSBottomGrid() {
	this.fsBottomGrid = pixiLib.getElement("Sprite", this.reelConfig.fsReelGridBottom.image);
	this.fsBottomGrid.name = "fsBottomGrid";
	this.addChild(this.fsBottomGrid);
	pixiLib.setProperties(this.fsBottomGrid, this.reelConfig.fsReelGridBottom.props["VD"]);
	this.fsBottomGrid.visible = false;
}

    showFreespinGrid() {
	if (this.fsBottomGrid) {
		this.fsBottomGrid.alpha = 0;
		this.fsBottomGrid.visible = true;
		TweenMax.to(this.fsBottomGrid, 1, { alpha: 1 })
	}

	if (this.fsTopGrid) {
		this.fsTopGrid.alpha = 0;
		this.fsTopGrid.visible = true;
		TweenMax.to(this.fsTopGrid, 1, { alpha: 1 })
	}
}

    hideFreespinGrid() {
	if (this.fsBottomGrid) {
		TweenMax.to(this.fsBottomGrid, 1, {
			alpha: 0,
			onComplete: function () {
				this.fsBottomGrid.visible = false;
				this.fsBottomGrid.alpha = 1;
			}.bind(this)
		})
	}
	if (this.fsTopGrid) {
		TweenMax.to(this.fsTopGrid, 1, {
			alpha: 0,
			onComplete: function () {
				this.fsTopGrid.visible = false;
				this.fsTopGrid.alpha = 1;
			}.bind(this)
		})
	}
}

    createTopGrid(argument) {
	this.topGrid = pixiLib.getElement("Sprite", this.reelConfig.reelGridTop.image);
	this.topGrid.name = "topGrid";
	this.addChild(this.topGrid);
	pixiLib.setProperties(this.topGrid, this.reelConfig.reelGridTop.props["VD"]);
}

    createFSTopGrid(argument) {
	this.fsTopGrid = pixiLib.getElement("Sprite", this.reelConfig.fsReelGridTop.image);
	this.fsTopGrid.name = "fsTopGrid";
	this.addChild(this.fsTopGrid);
	pixiLib.setProperties(this.fsTopGrid, this.reelConfig.fsReelGridTop.props["VD"]);
	this.fsTopGrid.visible = false;
}

    createReelGridTopAnim(argument) {
	this.topAnim = pixiLib.getElement("Sprite", this.reelConfig.reelGridTopAnim.image);
	this.topAnim.name = "topAnim";
	this.addChild(this.topAnim);
	pixiLib.setProperties(this.topAnim, this.reelConfig.reelGridTopAnim.props["VD"]);	
}

    createSingleMask(argument) {
	var maskPosition = this.reelConfig.data.maskInfo.maskPosition;
	this.maskObj = pixiLib.getElement("Graphics", {w: maskPosition.width, h: maskPosition.height, type: maskPosition.type, pointsArray: maskPosition.pointsArray});
	this.maskObj.name = "maskObject";
	this.addChild(this.maskObj);
	pixiLib.setProperties(this.maskObj, maskPosition);
	//mask
	this.reelContainer.mask = this.maskObj;
}

    createMaskWithSprite(argument) {
	var maskPosition = this.reelConfig.data.maskInfo.maskPosition;
	 this.maskObj = pixiLib.getElement("Sprite", "reelFrameMask");
	this.maskObj.name = "maskObject";
	this.addChild(this.maskObj);
	pixiLib.setProperties(this.maskObj, maskPosition);
	//mask
	this.reelContainer.mask = this.maskObj;
}

    createReelWiseMask() {

	for (var i = 0; i < this.reelConfig.data.noOfReels; i++) {
	var maskPosition = this.reelConfig.data.maskInfo.reelMaskPosition[i];
	this.maskObj = pixiLib.getElement("Graphics", {w: maskPosition.width, h: maskPosition.height, type: maskPosition.type, pointsArray: maskPosition.pointsArray});
	this.maskObj.name = "maskObject"+i;
	this.maskObj.alpha = 0.5; 
	//.anchor.y =
	//pixiLib.setProperties(this.maskObj, {anchor: {x: 0.5, y: 0.5}});
//	this.maskObj.anchor.set(0.5, 0.5);
	this.addChild(this.maskObj);
	pixiLib.setProperties(this.maskObj, maskPosition);
	var reelObj = this.reelContainer.getChildByName(("reelObj"+i));
	reelObj.mask = this.maskObj; 
	}
}

    updateReelWiseMask(i, yScaleFactor) {
	if(this.reelConfig.data.maskInfo.reelStripScaleFactor && this.reelConfig.data.reelSpinConfig.hideTopSymbol){
	this.getChildByName(("maskObject"+i)).scale.y = yScaleFactor;
     if(yScaleFactor > 1){
		 this.getChildByName(("maskObject"+i)).y = this.getChildByName(("maskObject"+i)).y - 10;
	 } else {
		 this.getChildByName(("maskObject"+i)).y = this.reelConfig.data.maskInfo.reelMaskPosition[i].y;
	 }
	}
}

    toggleMask(bool) {
	if(bool){
		this.maskObj.visible = true;
		this.reelContainer.mask = this.maskObj;
	}else{
		this.reelContainer.mask = null;
		this.maskObj.visible = false;
	}
}

    createReels(argument) {
	this.reels = [];

	this.reelContainer = pixiLib.getContainer();
	this.reelContainer.name = "reels"
	this.addChild(this.reelContainer);

	for (var i = 0; i < this.reelConfig.data.noOfReels; i++) {
		var reelObj = new TumbleReelStrip(i, this);
		reelObj.name =  "reelObj"+i;
		this.reelContainer.addChild(reelObj);
		if (this.reelConfig.data.eachReelPos) {
			reelObj.x = this.reelConfig.data.eachReelPos[i];
		} else {
			reelObj.x = (this.reelConfig.data.symbolConfig.symbolWidth + this.reelConfig.data.symbolConfig.symbolXGap) * i;
		}
		if(this.reelConfig.data.eachReelYPos){
			reelObj.y = this.reelConfig.data.eachReelYPos[i];
		}
		this.reels.push(reelObj);
	}
	pixiLib.setProperties(this.reelContainer, this.reelConfig.data.reelPositionsWRTGrid);
}

    startSpin(spinSpeed) {
	if(_ng.externalUiController.getSpaceBarHoldStatus())	spinSpeed = "quick";
	this.setSpinResponseStatus(false);
	var reelSpinSound = _sndLib.sprite.reelStart;
	reelSpinSound.volume = 1;
	_sndLib.play(reelSpinSound);
	this.startSpinTimeoutArr = [];
	var reelStartIntervalDuration = ("quick" === spinSpeed) ? 0 : 80;
	for(let i=0;i<this.reels.length;i++){
		var timeout = setTimeout(function () {
			this.reels[i].startStripSpin(spinSpeed);
		}.bind(this), i * reelStartIntervalDuration);
		this.startSpinTimeoutArr.push(timeout);
	}
}

    quickSpinStart() {
	this.startSpin("quick");
}

    individualStrip(spinType, isStopNow) {
	if (spinType == "start") {
		if (this.startSpinCounter >= this.reels.length) {
			this.startSpinCounter = this.reels.length - 1;
		}
		this.updateReelWiseMask(this.startSpinCounter, 1);
		_mediator.publish("onEachReelStart", this.startSpinCounter);
		this.reels[this.startSpinCounter].startSpin();
	} else {
	//spintype is == stop

		if (this.startSpinCounter >= this.reels.length) {
			this.startSpinCounter = this.reels.length - 1;
		}

		if (this.isAnticipateActive && ( !_ng.GameConfig.anticipationReels || _ng.GameConfig.anticipationReels[this.startSpinCounter]) && !isStopNow) {
			//console.log(" Anticipation is activated! ======");
			if (!this.isAnticipateSndPlaying) {
				_sndLib.stop(_sndLib.sprite.reelSpinning);
				_sndLib.play(_sndLib.sprite.anticipation);
				this.isAnticipateSndPlaying = true;
			}

			this.addAnticipateReelAnim(this.startSpinCounter);
			this.reels[this.startSpinCounter].anticipateSpin(this.reelsData[this.startSpinCounter], isStopNow);
			this.currentAnticipationReelId = this.startSpinCounter;
		} else {
			this.reels[this.startSpinCounter].stopSpin(this.reelsData[this.startSpinCounter], isStopNow);
		}
	}
	this.startSpinCounter++;

	//@todo make it dynamic each real stop delay
	if (this.startSpinCounter < this.reelConfig.data.noOfReels) {
		this.delayInterval = (spinType == "start") ? this.reelConfig.data.reelSpinConfig.reelSpinStartGap : this.reelConfig.data.reelSpinConfig.reelStopGap;
		
		var anticipateDelay = this.reelConfig.data.anticipationDelay;
		var delay = (this.isAnticipateActive) ? anticipateDelay : this.delayInterval;

		if (isStopNow) {
			var delay = 5;
		}

		this.callNextReelInterval = setTimeout(this.individualStrip.bind(this, spinType, isStopNow), delay);
	} else {
		_mediator.publish("allReelsStarted");
	}

	//Scatter anticipation conditions
	if (_ng.GameConfig.aniticipateSymbol && spinType === "stop" && this.isAnticipateActive == false && this.forceStop == false && _viewInfoUtil.isSecondaryAssetsLoaded && !isStopNow) {
		this.checkIsScatter(this.reelsData[this.startSpinCounter - 1]);
	}
}

    individualStripStop(spinType, isStopNow) {
	if (this.stopSpinCounter >= this.reels.length) {
		this.stopSpinCounter = this.reels.length - 1;
	}
	if (this.isAnticipateActive && ( !_ng.GameConfig.anticipationReels || _ng.GameConfig.anticipationReels[this.stopSpinCounter]) && !isStopNow) {
		//console.log(" Anticipation is activated! ======");
		if (!this.isAnticipateSndPlaying || _ng.GameConfig.sounds.playAnticipationForEachReel) {
			_sndLib.stop(_sndLib.sprite.reelSpinning);
			_sndLib.play(_sndLib.sprite.anticipation);
			this.isAnticipateSndPlaying = true;
		}

		this.addAnticipateReelAnim(this.stopSpinCounter);
		this.reels[this.stopSpinCounter].anticipateSpin(this.reelsData[this.stopSpinCounter], isStopNow);
		this.currentAnticipationReelId = this.stopSpinCounter;
	} else {
		this.reels[this.stopSpinCounter].stopSpin(this.reelsData[this.stopSpinCounter], isStopNow);
	}
	this.stopSpinCounter++;

	//@todo make it dynamic each real stop delay
	if (this.stopSpinCounter < this.reelConfig.data.noOfReels) {
		this.delayInterval = this.reelConfig.data.reelSpinConfig.reelStopGap;
		
		var anticipateDelay = this.reelConfig.data.anticipationDelay;
		var delay = (this.isAnticipateActive) ? anticipateDelay : this.delayInterval;

		if (isStopNow) {
			var delay = 5;
		}
		this.reelIntervalId = this.stopSpinCounter-1;
		this.callNextReelInterval = setTimeout(this.individualStripStop.bind(this, spinType, isStopNow), delay);
	} else {
		_mediator.publish("allReelsStarted");
	}

	//Scatter anticipation conditions
	if (_ng.GameConfig.aniticipateSymbol && spinType === "stop" && this.isAnticipateActive == false && this.forceStop == false && _viewInfoUtil.isSecondaryAssetsLoaded) {
		this.checkIsScatter(this.reelsData[this.stopSpinCounter - 1]);
	}
}

    stopSpin(msg) {
	// Check allreelstopped... response recieved...
	if(msg === "spinfallcompleted")
		this.setReelFallStatus(true);
	if(msg === "spinresponserecieved"){
		this.setSpinResponseStatus(true);
		console.log(msg)
		_mediator.publish("showSpinStop"); // To enable stop button...
	}
	if(this.spinResponseReceived && this.spinFallCompleted){
		this.stopSpinTimeoutArr = [];
		for(let i=0;i<this.reels.length;i++){
			var timeout = setTimeout(function () {
				this.reels[i].replaceWithNewSymbols();
				this.reels[i].stopStripSpin();
			}.bind(this), i * 80);
			this.stopSpinTimeoutArr.push(timeout);
		}
	}
}

    stopSpinNow(matrix) {
	this.reelsData = matrix;
	this.anticipateAry = {};
	this.forceStop = true;

	if(this.isAnticipateActive && this.currentAnticipationReelId){
		this.reels[this.currentAnticipationReelId].killAnticipation();
	}

	this.stopAnticipation();
	this.isAnticipateActive = false;
	clearTimeout(this.callNextReelInterval);
	this.individualStripStop("stop", true);	
}

    quickSpinStop() {
	for(let i=0;i<this.reels.length;i++)
		this.reels[i].forceStripToStop();
}

    fadeReels(value) {
	if (this.reelConfig.data.isSymbolFadeInWins) {
		for (var i = 0; i < this.reels.length; i++) {
			this.reels[i].alpha = value;
		}
	}
}

    addTintOnSymbols(dataObj) {
	var tintValue = (dataObj && dataObj.tintValue) || 0xFFFFFF;
	var symbolArray = (dataObj && dataObj.symbolArray) || undefined;
	if (symbolArray && symbolArray.length > 0) {
		for (var i = 0; i < symbolArray.length; i++) {
			var rowColumn = pixiLib.getRowColumn(symbolArray[i]);
			this.reels[rowColumn.column].symbolsArray[rowColumn.row + 1].applyTint(tintValue);
		}
	} else {
		for (var i = 0; i < this.reelConfig.data.noOfReels; i++) {
			for (var j = 0; j < this.reelConfig.data.noOfSymbols; j++) {
				this.reels[i].symbolsArray[j + 1].applyTint(tintValue);
			}
		}
	}
}

    fadeAllSymbols(value) {
	if (isNaN(value)) {
		value = 0.5;
	}
	for (var i = 0; i < this.reels.length; i++) {
		this.reels[i].alpha = value;
	}
}

    fadeReelSymbols(lineAry) {
	this.fadeReels(0.3);
	if (this.reelConfig.data.isSymbolFadeInWins) {
		for (var i = 0; i < lineAry.pos.length; i++) {
			var yPos = Number(lineAry.pos[i]);
			var posObj = pixiLib.getRowColumn(yPos);
			this.reels[posObj.column].symbolsArray[posObj.row + 1].visible = false;
		}
	}
}

    hideReelSymbols(symbolArray, type) {
	for (var i = 0; i < symbolArray.length; i++) {
		var rowColumn = pixiLib.getRowColumn(symbolArray[i]);
		this.reels[rowColumn.column].symbolsArray[rowColumn.row].visible = false;
	}
}

    clearReelSymbols(lineAry) {
	for (var i = 0; i < this.reels.length; i++) {
		for (var j = 0; j < this.reels[i].symbolsArray.length; j++) {
			this.reels[i].symbolsArray[j].visible = true;
		}
	}
}

    endSpinImmediatly(argument) { }

    onSpinResponse(argument) { }

    onReelSpinStarted(argument) { }

    onAllReelsStopped() {
	//console.log(" on all reels stopped ============================");
	_sndLib.stop(_sndLib.sprite.reelSpinning);
	// this.stopAnticipation();
	clearTimeout(this.callNextReelInterval);

	if(this.reelConfig.data.reelSpinConfig.hideTopSymbol){
		this.toggleMask(false);
	}
}

    onEachReelStop(reelNumber) { }

    resize(argument) {
	for (var i = 0; i < viewConfig.length; i++) {
		UIUtils.setProperties(this[this.viewConfig[i].id], this.viewConfig[i].props);
	}
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

    checkIsScatter(matrix) {
	var scatters = _ng.GameConfig.aniticipateSymbol;
	for (var i = 0; i < scatters.length; i++) {
		if (matrix.indexOf(scatters[i]) >= 0) {
			if (!this.anticipateAry[scatters[i]]) {
				this.anticipateAry[scatters[i]] = [];
			}
			this.anticipateAry[scatters[i]].push(scatters[i]);
			if (this.anticipateAry[scatters[i]].length >= 2) {
				this.isAnticipateActive = true;
			}
		}
	}
	this.addGameSpecificCondition()
}

    addGameSpecificCondition() {

}

    addAnticipateReelAnim(reelId) {
	if (this.reelConfig.data.anticipationSpine) {
		this.addSpineAnticipationAnim(reelId);
		var props = this.reelConfig.data.anticipationSpine.props;
	} else if (this.reelConfig.data.anticipationFrames) {
		this.addSpritAnimation(reelId);
		var props = this.reelConfig.data.anticipationFrames.props;
	} else {
		return;
	}
	
	if(props.length && props.length > 0){
		props = props[reelId];
	}
	this.reelFrame.visible = true;
	this.reelFrame.x = this.reels[reelId].x + props.x;
	this.reelFrame.y = this.reels[reelId].y + props.y;
	if (props.scale) {
		this.reelFrame.scale.x = props.scale.x ? props.scale.x : 1;
		this.reelFrame.scale.y = props.scale.y ? props.scale.y : 1;
	}
	this.reelFrame.animationSpeed = props.animationSpeed ? props.animationSpeed : 1;
	this.updateAnticipationDynamicProp(reelId);
}

    updateAnticipationDynamicProp(reelId) {
	// add properties to fix position of anticipation animation if reels are not required.
}

    addSpineAnticipationAnim(reelId) {
	//console.log("spin anticipation ==========");
	if (!this.reelFrame && this.reelConfig.data.anticipationSpine) {
		this.reelFrame = new PIXI.spine.Spine(PIXI.Loader.shared.resources[this.reelConfig.data.anticipationSpine.spineName].spineData);
		this.reelFrame.name = "SpineAnimation";
		this.reelFrame.type = "spine"
		this.reelFrame.visible = true;
		this.addChild(this.reelFrame);
		//@Must be removed and add in reelconfig
		this.reelFrame.scale.set(0.5);
		this.reelFrame.state.setAnimation(0, this.reelConfig.data.anticipationSpine.animationName, true);
	}
}

    addSpritAnimation(reelId) {
	//console.log("frames  anticipation ==========");
	if (!this.reelFrame) {
		this.reelFrame = pixiLib.getElement("AnimatedSprite", this.reelConfig.data.anticipationFrames.frames);
		this.reelFrame.name = "SpriteAnimation";
		this.addChild(this.reelFrame);
		this.reelFrame.type = "frames";
		this.reelFrame.visible = true;
	}
	this.reelFrame.play();
}

    stopAnticipation() {
	if(!this.isAnticipateActive){
		return;
	}
	if (this.reelFrame) {
		if (this.reelFrame.type === "frames") {
			this.reelFrame.stop();
		}
		_sndLib.stop(_sndLib.sprite.anticipation);
		this.isAnticipateSndPlaying = false;
		this.reelFrame.visible = false;
	}
}

    setSpinResponseStatus(bool) {
	this.spinResponseReceived = bool;
}

    setReelFallStatus(bool) {
	this.spinFallCompleted = bool;
}

    allStripsFallingCompleted() {
	_sndLib.stop(_sndLib.sprite.reelSpinning);
	_mediator.publish("allReelsStopped");
	this.reels.forEach(elem => elem.REEL_STATE = "idle");
}

    forceStopBySpace() {
	this.startSpinTimeoutArr.forEach(function (timeout) {
		clearTimeout(timeout);
	});
	this.stopSpinTimeoutArr.forEach(function (timeout) {
		clearTimeout(timeout);
	});
	this.quickSpinStop();
}

    performTumble(currentStep = 0) {
  let currentIndex = currentStep;
  var numberOfTumbles = coreApp.gameModel.obj.current_round.misc_prizes.count;
  this.winSymbolsToRemove = {};

  if(currentIndex >= numberOfTumbles) {
  var noOfMiscPrizes = coreApp.gameModel.obj.current_round.misc_prizes.count;
  var lastScreenWins = coreApp.gameModel.obj.current_round.misc_prizes[noOfMiscPrizes - 1].screenWins;
  if (coreApp.gameModel.obj.current_round.spin_type == "freespin" && lastScreenWins.some(value => value !== 0)) {
    this.reels.forEach(elem => elem.performMultiplierAnim(noOfMiscPrizes));
    _mediator.publish("createSticky"); 
  } else {
    _mediator.publish("onAllTumblesComplete");
  }
    return;
  } 
  
  var tumbleData = coreApp.gameModel.obj.current_round.misc_prizes;
  var positions = tumbleData[currentIndex].positions;
  //normal reels
  var reelCount = _ng.GameConfig.ReelViewUiConfig.data.noOfReels;
  for (var j = 0; j < positions.length; j++) {
    var symbolPosition = positions[j];
    var reelId = (symbolPosition % reelCount);
    var symbolId = Math.floor(symbolPosition / reelCount);
    var isFirstSymbol = (j === 0);
    var isLastSymbol = (j === positions.length - 1);
    this.reels[reelId].playSymbolAnimation(symbolId, isFirstSymbol, isLastSymbol);
    if(this.winSymbolsToRemove[reelId]){
      this.winSymbolsToRemove[reelId].push(symbolId);
    } else {
      this.winSymbolsToRemove[reelId] = [];
      this.winSymbolsToRemove[reelId].push(symbolId);
    }
  }
}

    onSymbolAnimationComplete() {
  _mediator.publish("showTumbleWin",this.currentTumbleIndex);
  this.removeWinAnimations();
  this.removeWinSymbols(this.currentTumbleIndex);
  setTimeout(function() {
    this.addTumbleSymbols(this.currentTumbleIndex);
    this.moveAllSymbols();
  }.bind(this), 10);
}

    removeWinAnimations() {
  this.reels.forEach(reel => {
    reel.removeSymbolAnimation();
  });
}

    removeWinSymbols(currentIndex) {
  console.log("start removing win symbols for tumble ", currentIndex);
  for(var reelId in this.winSymbolsToRemove) {
    var sortedWinSymbol = this.winSymbolsToRemove[reelId].sort(function(a, b) {return b-a});
    for(var i = 0; i < sortedWinSymbol.length; i++) {
      this.reels[reelId].removeWinSymbol(sortedWinSymbol[i]);
    }
  }
}

    addTumbleSymbols(tumbleIndex) {
  var newSymbols = coreApp.gameModel.obj.current_round.misc_prizes[tumbleIndex].new_symbols.split(";");

  var stripData = {};
  for(var i = 0; i < newSymbols.length; i++) {
    for(var j = 0; j < newSymbols[i].length; j++) {
      if(stripData[i]) { 
        stripData[i].push(newSymbols[i][j]);
      } else {
        stripData[i] = [];
        stripData[i].push(newSymbols[i][j]);
      }
    }
  }

  for(var i in stripData) {
    this.reels[parseInt(i)].addTumbleSymbolsToStrip(stripData[i], tumbleIndex);
  }
}

    moveAllSymbols() {
	var moveDownSound = _sndLib.sprite.move_down;
	moveDownSound.delay = ((_ng.isQuickSpinActive && _ng.GameConfig.FastAnim)) ? 0 : 100; 
	_sndLib.play(moveDownSound);
	this.reels.forEach(elem => elem.addMultiplierToSymbol(this.currentTumbleIndex, false));
	for (var i = 0; i < this.reels.length; i++)
		this.reels[i].moveSymbolsDown(this.onMoveSymbolsComplete.bind(this));
}

    async onMoveSymbolsComplete() {
  this.currentTumbleIndex++;
  this.performTumble(this.currentTumbleIndex);
}

    playSymbolSoundOnce(soundType) {
	var currentIndex = this.currentTumbleIndex;
	var currentTumbleData = coreApp.gameModel.obj.current_round.misc_prizes[currentIndex];
	var currentWinSym = currentTumbleData.old_reel_symbol[0];
	var numberOfTumbles = coreApp.gameModel.obj.current_round.misc_prizes.count;
	// var volume = 1;
	// if (numberOfTumbles > 1) {
	// 	var step = .2;
	// 	var remainingTubles = (numberOfTumbles - currentIndex)- 1;
	// 	volume = Math.max(.4, 1 - (remainingTubles * step));
	// }
	var soundIndex = Math.max(1, (Math.min((currentIndex + 1), 5)));
	// var soundObj = (soundType === "explosion") ? _sndLib.sprite.symbolAnim : _sndLib.sprite["win" + soundIndex];
	var soundObj = (soundType === "explosion") ? _sndLib.sprite.symbolAnim : _sndLib.sprite[currentWinSym+"Sym"];
	_sndLib.play(soundObj);
}

}





