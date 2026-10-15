// ============================================================================
// Consolidated Parent (WinView.js) and Child (GWinView.js)
// Base Class Definition & Implementation
// ============================================================================
function WinView(argument) {
    ViewContainer.call(this, arguments);
    if (_ng.GameConfig.isClusterWin) {
        this.showLine = this.showCluster.bind(this);
    }
}
WinView.prototype = Object.create(ViewContainer.prototype);
WinView.prototype.constructor = WinView;
var view = WinView.prototype;

view.createView = function () {
    this.reelConfig = _ng.GameConfig.ReelViewUiConfig;
    this.symConfig = this.reelConfig.data.symbolConfig;
    this.animationConfig = _ng.GameConfig.symbolAnimations;
    this.updateWinSymbolConfig();
    this.scatterLandAry = [];
    this.bonusSymbols = [];
    this.lineWinsLoopCount = 0;
    this.model = coreApp.gameModel;
    this.addGameElements();
    this.ScatterAppearArray = [];
    this.isStopSpinCalled = false;
};
view.updateWinSymbolConfig = function(symbol){
	if(coreApp.gameModel.isFullFSActive() && _ng.GameConfig.separateSymbolsForFS){
        this.animationConfig = _ng.GameConfig.symbolAnimationsFS;
	}else{
		this.animationConfig = _ng.GameConfig.symbolAnimations;
    }
}
view.updateWinViewConfigs = function(){
    this.reelConfig = _ng.GameConfig.ReelViewUiConfig;
    this.symConfig = this.reelConfig.data.symbolConfig;
}
view.addGameElements = function(){}
view.onAllReelStopped = function () {
    this.clearScatterLand();
};
view.stopSoundOnClick = function(){
    if (_ng.GameConfig.sounds.soundStopArray) {
        for(i = 0; i < _ng.GameConfig.sounds.soundStopArray.length; i++) {
            _sndLib.stop(_sndLib.sprite[_ng.GameConfig.sounds.soundStopArray[i]]);
        }
    }
};
view.clearAllWins = function () {
    
    this.isStopSpinCalled = false;
    this.clearLine();
    try {
        if (this.symbolForWinSound){
            _sndLib.stop(_sndLib.sprite[this.symbolForWinSound]);
        }
    } catch (e) {
        // console.log("win souund ", e);
    }

    clearTimeout(this.showLineTimeout);
    _mediator.publish("SHOW_TICKER_MESSAGE", "");
};

view.showAlternateLineWins = function (linesObj) {
    this.alternatetriggeredOnce = false;
    this.linesObj = linesObj;
    this.linesLoopIndex = 0;
    this.lineWinsLoopCount = 0;
    this.showLine();
}; 
view.getBlinkCount = function (posAry) {
    var indexAry = [];
    for (var i = 0; i < posAry.length; i++) {
        indexAry.push(this.getSymbolFromPosition(posAry[i], "xValue"));
    }
    // console.log(" all indexes : ", indexAry);
    
    var startIndex = 0;
    var endIndex = posAry.length-1;
    var loopEnd = Math.ceil(this.reelConfig.data.eachReelPos.length/2);

    if(indexAry.indexOf(startIndex)>=0){
        // console.log("left to right====>>> line ");
        var pos=-1;
        for (var i = 0; i < loopEnd; i++) {
            if(indexAry.indexOf(i)!=-1){
                // console.log("matched : ", i);
                pos = indexAry[i];
            }else {
                break;
            }
        }
        return pos;
    }else if(indexAry.indexOf(endIndex)>=0){
        // console.log("right to left====>>> line ");
        var pos=-1;
        for (var i = endIndex; i > loopEnd; i--) {
            if(indexAry.indexOf(i)!=-1){
                // console.log("matched : ", i);
                pos = indexAry[i];
            }else {
                break;
            }
        }
        return pos;
    }
    return -1;
};
view.createWinSymbolContainer = function(){
    if (!this.winSymbolContainer) {
        this.winSymbolContainer = pixiLib.getContainer();
        this.winSymbolContainer.name = "winSymbolContainer";
        this.addChild(this.winSymbolContainer);
    }
    this.winSymbolContainer.x = coreApp.gameView.reelController.view.reelContainer.x;
    this.winSymbolContainer.y = coreApp.gameView.reelController.view.reelContainer.y;
}
view.showLine = function () {
    this.createWinSymbolContainer();
    if (this.lineSymbols) { this.clearLine(); }
    this.tweens = [];
    this.lineSymbols = [];
    var symDuration = 0, nextLineDuration = 0;
    var lineNum = this.linesObj[this.linesLoopIndex].line;
    var blinkCount = this.getBlinkCount(this.linesObj[this.linesLoopIndex].pos);
    this.symbolForWinSound = "";
    var isSoundForced = false;
    var isWildInWinLine = false;

    for (var i = 0; i < this.linesObj[this.linesLoopIndex].pos.length; i++) {
        var symbol = this.getSymbolFromPosition(this.linesObj[this.linesLoopIndex].pos[i]);
        if(symbol === "w"){
            isWildInWinLine = true;
        }
    }

    for (var i = 0; i < this.linesObj[this.linesLoopIndex].pos.length; i++) {
        //if (this.linesObj[this.linesLoopIndex].blink[i] == 1) {
            var symbol = this.getSymbolFromPosition(this.linesObj[this.linesLoopIndex].pos[i]);
            // var symbol = this.linesObj[this.linesLoopIndex].symbols[i];
            //Use this function to change symbol Animation depending on any specific feature
            //Used in Da Vinci, Unity Feature
            symbol = this.getSymbolName(symbol);
            if(isWildInWinLine && _ng.GameConfig.symbolAnimations[symbol+"_wild"]){
                symbol = symbol + "_wild";
            }
            var winSym = new WinSymbol(symbol);
            this.winSymbolContainer.addChild(winSym);
            winSym.playAnimation();
            this.lineSymbols.push(winSym);

            var xReelPos = this.getSymbolFromPosition(this.linesObj[this.linesLoopIndex].pos[i], "xValue");
            var yReelPos = this.getSymbolFromPosition(this.linesObj[this.linesLoopIndex].pos[i], "yValue");

            var symbolOffset = {x: 0, y: 0};
            if(this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded){
                symbolOffset = this.animationConfig[symbol][0].offset
            }

            winSym.x = this.reelConfig.data.eachReelPos[xReelPos] + symbolOffset.x;
            var symbolTopPadding = 0;
            if (this.reelConfig.data.eachReelYPos) {
                symbolTopPadding = this.reelConfig.data.eachReelYPos[xReelPos];
            }
            //@todo server will send line win symbol position in a strip
            // console.log(Number(this.linesObj[this.linesLoopIndex].pos[i])+"asdf asdfasd fasdf asdfasf ==============>>"+Number(this.reelConfig.data.noOfReels));
            var yPos = Math.floor(Number(this.linesObj[this.linesLoopIndex].pos[i]) / Number(this.reelConfig.data.noOfReels));
            //winSym.y = this.symConfig.symbolHeight * this.linesObj[this.linesLoopIndex].blink[i];/*+(this.symConfig.symbolYGap*i)*/
            // console.log(yPos, " yPos=== >> sym :"+this.getSymbolData(this.linesObj[this.linesLoopIndex].symbols[i]), "line:"+lineNum);
            var gaps = (this.symConfig.symbolYGap * (yPos + 1));
            winSym.y = ((this.symConfig.symbolHeight) * (yPos + 1)) + gaps + symbolTopPadding + symbolOffset.y;
            if (blinkCount == xReelPos) {// todo: need to get Center position
                this.addWinAmount(winSym, this.linesObj[this.linesLoopIndex].win, winSym.x, winSym.y, yPos, Number(this.reelConfig.data.noOfSymbols));
            }
            //Updating symDuration for each symbol, whichever is higher
            if (Number(this.animationConfig[symbol][0].animationDuration) > symDuration) {
                symDuration = Number(this.animationConfig[symbol][0].animationDuration);
                nextLineDuration = Number(_ng.GameConfig.intervals.eachLineWinDelay) + symDuration;
            }

            //this.StackedReel
            if (this.stackedReels && this.stackedReels.length > 0) {
                for (var k = 0; k < this.stackedReels.length; k++) {
                    if (this.stackedReels[k] == i) { winSym.visible = false; }
                }
            }
            try {
                if (!isSoundForced && (this.animationConfig[symbol][0].winSound !== undefined)) {
                    this.symbolForWinSound = this.animationConfig[symbol][0].winSound.name;
                    if (this.animationConfig[symbol][0].winSound.forcePlay) { isSoundForced = true; }
                }
            } catch (e) {}
        //}
    }
    if (this.winAmtCtn) {         
         this.winSymbolContainer.addChild(this.winAmtCtn);
    }
    try {
        _sndLib.play(_sndLib.sprite[this.symbolForWinSound]);
    } catch (e) {}
    this.additionalAnimation();
    
    _mediator.publish("showSingleLine", lineNum, this.linesLoopIndex);
    this.linesLoopIndex++;

    if (this.linesLoopIndex == this.linesObj.length) {
        this.allwinsShownOnce = true;
        this.linesLoopIndex = 0;
        this.lineWinsLoopCount++;
    } else {
        this.allwinsShownOnce = false;
    }    

    if (this.lineWinsLoopCount === 1 && _ng.GameConfig.ReelViewUiConfig.data.showLineWinsOnce) {
        this.autoClearLineTimeout = setTimeout(this.clearLine.bind(this), symDuration); // comment this line for debug win symbos 
    } else {        
        this.autoClearLineTimeout = setTimeout(this.clearLine.bind(this), symDuration); // comment this line for debug win symbos 
        this.showLineTimeout = setTimeout(this.showLine.bind(this), nextLineDuration);
    }
};
view.additionalAnimation = function () { }
view.getSymbolName = function (symbol) { return symbol; }
view.showTotalClusterWin = function(allWinLines){
    this.createWinSymbolContainer();
    if (this.lineSymbols) { this.clearLine(); }
    this.tweens = [];
    this.lineSymbols = [];
    this.linesObj = allWinLines;
    for (let k = 0; k < this.linesObj.length; k++) {
        for (var i = 0; i < this.linesObj[k].symbolPositions.length; i++) {
            var symbol = this.getSymbolFromPosition(this.linesObj[k].symbolPositions[i]);
            var winSym = new WinSymbol(symbol);
            this.winSymbolContainer.addChild(winSym);
            winSym.playAnimation();
            this.lineSymbols.push(winSym);
            var symbolOffset = {x: 0, y: 0};
            if(this.animationConfig[symbol] && this.animationConfig[symbol][0].offset){
                symbolOffset = this.animationConfig[symbol][0].offset
            }
            var tempRowColumn = pixiLib.getRowColumn(this.linesObj[k].symbolPositions[i]);
            winSym.x = this.symConfig.symbolWidth * tempRowColumn.column + (this.symConfig.symbolXGap * tempRowColumn.column) + symbolOffset.x;
            winSym.y = this.symConfig.symbolHeight * tempRowColumn.row + (this.symConfig.symbolYGap * tempRowColumn.row) + symbolOffset.y;
        }
    }
}
view.showCluster = function () {
    if (!this.winSymbolContainer) {
        this.winSymbolContainer = pixiLib.getContainer();
        this.addChild(this.winSymbolContainer);
        this.winSymbolContainer.x = coreApp.gameView.reelController.view.reelContainer.x;
        this.winSymbolContainer.y = coreApp.gameView.reelController.view.reelContainer.y;
    }
    if (this.lineSymbols) { this.clearLine(); }
    this.tweens = [];
    this.lineSymbols = [];

    var symDuration = Number(this.animationConfig[this.linesObj[this.linesLoopIndex].symbol][0].animationDuration);
    var nextLineDuration = Number(_ng.GameConfig.intervals.eachLineWinDelay) + symDuration;

    for (var i = 0; i < this.linesObj[this.linesLoopIndex].totalSymbols; i++) {
        var symbol = this.linesObj[this.linesLoopIndex].symbol;
        var winSym = new WinSymbol(symbol);
        this.winSymbolContainer.addChild(winSym);
        winSym.playAnimation();
        this.lineSymbols.push(winSym);

        var symbolOffset = {x: 0, y: 0};
        if(this.animationConfig[symbol] && this.animationConfig[symbol][0].offset){
            symbolOffset = this.animationConfig[symbol][0].offset
        }
        var tempRowColumn = pixiLib.getRowColumn(this.linesObj[this.linesLoopIndex].symbolPositions[i]);
        winSym.x = this.symConfig.symbolWidth * tempRowColumn.column + (this.symConfig.symbolXGap * tempRowColumn.column) + symbolOffset.x;
        winSym.y = this.symConfig.symbolHeight * tempRowColumn.row + (this.symConfig.symbolYGap * tempRowColumn.row) + symbolOffset.y;
    }
    this.addWinAmount(this, this.linesObj[this.linesLoopIndex].winAmount, winSym.x, winSym.y);
    this.linesLoopIndex++;
    if (this.linesLoopIndex == this.linesObj.length) {
        //@todo alternate line wins shown once
        // _mediator.publish("AlternateLineWinShownOnce");
        this.allwinsShownOnce = true;
        this.linesLoopIndex = 0;
    } else {
        this.allwinsShownOnce = false;
    }
    this.autoClearLineTimeout = setTimeout(this.clearLine.bind(this), symDuration);
    //symbol time should be configured
    this.showLineTimeout = setTimeout(this.showLine.bind(this), nextLineDuration);
};

view.addWinAmount = function (parent, winAmount, symXPos, symYPos, cRow, numOfRows) {
    this.lineWinTextStyle = _ng.GameConfig.specialWins.lineWin.textStyle;

    this.winAmtCtn = pixiLib.getContainer();    
    this.winSymbolContainer.addChild(this.winAmtCtn);

    this.winAmtBox = pixiLib.getElement("Sprite", "winAmtBg");
    this.winAmtCtn.addChild(this.winAmtBox);    
    this.winAmtBox.anchor.set(0.5, 0.5);
    this.winAmtCtn.x = symXPos + this.reelConfig.data.lineWinAmtPos.x;
    if((cRow+1) == numOfRows && this.reelConfig.data.lineWinAmtLastRowPos){//last row
        this.winAmtCtn.y = symYPos + this.reelConfig.data.lineWinAmtLastRowPos.y;
    }else{
        this.winAmtCtn.y = symYPos + this.reelConfig.data.lineWinAmtPos.y;
    }
    //this.winAmtCtn.y = symYPos + this.reelConfig.data.lineWinAmtPos.y;

    if (commonConfig.winAmountBgHeight){
        this.winAmtBox.height = commonConfig.winAmountBgHeight;
    }
    if(_ng.GameConfig.winAmountBoxHeight !== undefined){
        this.winAmtBox.height = _ng.GameConfig.winAmountBoxHeight;
    }
    this.lineWinAmountTxt = pixiLib.getElement("Text", this.lineWinTextStyle);
    pixiLib.setText(this.lineWinAmountTxt, pixiLib.getFormattedAmount(winAmount));  
    this.winAmtBox.width = this.lineWinAmountTxt.width+60;

    this.lineWinAmountTxt.anchor.set(0.5, 0.5);     
    if (this.reelConfig.data.lineWinAmountTextPos) {
        pixiLib.setProperties(this.lineWinAmountTxt, this.reelConfig.data.lineWinAmountTextPos);
    }
    //else{
    //     this.lineWinAmountTxt.y = 15;
    // }
    
    this.winAmtCtn.addChild(this.lineWinAmountTxt);
};
view.clearLine = function () {
    _mediator.publish("clearLineWins");
    if (this.allwinsShownOnce && this.alternatetriggeredOnce == false) {
        this.alternatetriggeredOnce = true;
        _mediator.publish("AlternateLineWinShownOnce");
    }
    if (this.lineSymbols) {
        for (var i = 0; i < this.lineSymbols.length; i++) {
            this.winSymbolContainer.removeChild(this.lineSymbols[i]);
            this.lineSymbols[i].removeAnimation();
        }
        this.lineSymbols.length = 0;
    }
    if (this.lineWinAmountTxt) {
        this.winSymbolContainer.removeChild(this.lineWinAmountTxt);
        this.winSymbolContainer.removeChild(this.winAmtCtn);
    }
    //_mediator.publish("SHOW_TICKER_MESSAGE", "");
};

view.createStickySymbols = function (data) {
    if (!this.stickySymbolContainer) {
        this.stickySymbolContainer = pixiLib.getElement();
        this.stickySymbolContainer.x = coreApp.gameView.reelController.view.reelContainer.x;
        this.stickySymbolContainer.y = coreApp.gameView.reelController.view.reelContainer.y;
        this.addChild(this.stickySymbolContainer);
    }
    this.stickySymbolContainer.removeChildren();
    if (data.type === "stickyRespin") {
        var symbolPositions = data.symbolPositions;
        var reelMatrix = data.matrix;
        for (var i = 0; i < symbolPositions.length; i++) {
            var tempRowColumn = pixiLib.getRowColumn(symbolPositions[i]);
            var symbolTopPadding = 0;
            if (this.reelConfig.data.eachReelYPos) {
                symbolTopPadding = this.reelConfig.data.eachReelYPos[i];
            }
            var symBG = pixiLib.getGraphicsRect({ w: 128, h: 113, color: 0x540404 });
            this.stickySymbolContainer.addChild(symBG);            
			symBG.x = this.symConfig.symbolWidth * tempRowColumn.column + (this.symConfig.symbolXGap * tempRowColumn.column);
			symBG.y = this.symConfig.symbolHeight * tempRowColumn.row + (this.symConfig.symbolYGap * tempRowColumn.row-1);
            symBG.pivot.set(64, 56.5);
			var winSym = pixiLib.getElement("Sprite", reelMatrix[tempRowColumn.column][tempRowColumn.row]);
            this.stickySymbolContainer.addChild(winSym);
            winSym.x = this.symConfig.symbolWidth * tempRowColumn.column + (this.symConfig.symbolXGap * tempRowColumn.column);
            winSym.y = this.symConfig.symbolHeight * tempRowColumn.row + (this.symConfig.symbolYGap * tempRowColumn.row - 1) + symbolTopPadding;
            winSym.anchor.set(0.5, 0.5);
        }
    }
}
view.playBonusSymbolAnimation = function (data) {
    var bonusID = data.bonusID;
    var reelMatrix = data.reelMatrix;
    var bonusSymbol = _ng.GameConfig.bonusGames[bonusID].symbol;
    var animationDuration = this.animationConfig[bonusSymbol][0].animationDuration;
    var symbolArray = [];
    this.createWinSymbolContainer();
    for(var i = 0; i < reelMatrix.length; i++){
        for(var j = 0; j < reelMatrix[i].length; j++){
            if(reelMatrix[i][j] === bonusSymbol){
                symbolArray.push(pixiLib.getPosition(j, i));
            }
        }
    }
    _mediator.publish("hideReelSymbols", symbolArray);
    for (var i = 0; i < reelMatrix.length; i++) {
        for (var j = 0; j < reelMatrix[i].length; j++) {
            if (reelMatrix[i][j] === bonusSymbol) {
                var symbol = bonusSymbol;
                symbol = this.getSymbolName(symbol);
                var winSym = new WinSymbol(symbol);
                this.winSymbolContainer.addChild(winSym);
                this.bonusSymbols.push(winSym);
                var symbolTopPadding = 0;
                if (this.reelConfig.data.eachReelYPos) {
                    symbolTopPadding = this.reelConfig.data.eachReelYPos[i];
                }
                var symbolOffset = {x: 0, y: 0};
                if (this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded){
                    symbolOffset = this.animationConfig[symbol][0].offset
                }
                if (this.reelConfig.data.eachReelPos && this.reelConfig.data.eachReelPos[i] !== undefined) {
                    winSym.x = this.reelConfig.data.eachReelPos[i] + symbolOffset.x;
                } else {
                    winSym.x = this.symConfig.symbolWidth * i + (this.symConfig.symbolXGap * i) + symbolOffset.x;
                }
                winSym.y = this.symConfig.symbolHeight * (j + 1) + (this.symConfig.symbolYGap * j) + symbolTopPadding + symbolOffset.y;
                winSym.playAnimation();
            }
        }
    }
    try {
        if (this.animationConfig[symbol] !== undefined) {
            var symbolForWinSound = this.animationConfig[symbol][0].winSound.name;
            _sndLib.play(_sndLib.sprite[symbolForWinSound]);
        }
    } catch (e) { }
    setTimeout(function () {
        _mediator.publish("showReelSymbols");
        this.clearBonusSymbols();
        _mediator.publish("bonusSymbolAnimationCompleted");
    }.bind(this), animationDuration);
};
view.clearBonusSymbols = function(){
    for(var i = 0; i < this.bonusSymbols.length; i++){
        this.winSymbolContainer.removeChild(this.bonusSymbols[i]);
        delete this.bonusSymbols[i];
    }
    this.bonusSymbols.length = 0;
};
view.removeStickySymbols = function(){
    if(this.stickySymbolContainer){
        this.stickySymbolContainer.removeChildren();
        this.removeChild(this.stickySymbolContainer);
        delete this.stickySymbolContainer;
    }
};
view.showEachReelStopAction = function (reelId, reelStrip) {
    //#todo if this reel is not expanded 
    if(!_ng.GameConfig.ReelViewUiConfig.showScatterLand || this.isStopSpinCalled || !_viewInfoUtil.isSecondaryAssetsLoaded){
        return;
    }
    this.createWinSymbolContainer();

    var symbolArray = [];
    
    if (!_ng.isQuickSpinActive){
        for (i = 0; i < reelStrip.length; i++) {
            for(j = 0; j < _ng.GameConfig.aniticipateSymbol.length; j++){
                if (reelStrip[i] === _ng.GameConfig.aniticipateSymbol[j]) {
                    var winSym = new WinSymbol(_ng.GameConfig.aniticipateSymbol[j] + "_land");
                    this.winSymbolContainer.addChild(winSym);
                    var symbolTopPadding = 0;
                    if (this.reelConfig.data.eachReelYPos) {
                        symbolTopPadding = this.reelConfig.data.eachReelYPos[i];
                    }
                    var symbolOffset = {x: 0, y: 0};
                    if (this.animationConfig[_ng.GameConfig.aniticipateSymbol[j]] && this.animationConfig[_ng.GameConfig.aniticipateSymbol[j]].offset){
                        symbolOffset = this.animationConfig[_ng.GameConfig.aniticipateSymbol[j]].offset
                    }
                    if (this.reelConfig.data.eachReelPos && this.reelConfig.data.eachReelPos[i] !== undefined) {
                        winSym.x = this.reelConfig.data.eachReelPos[reelId] + symbolOffset.x;
                    } else {
                        winSym.x = this.symConfig.symbolWidth * reelId + (this.symConfig.symbolXGap * i) + symbolOffset.x;
                    }
                    winSym.y = this.symConfig.symbolHeight * (i + 1) + (this.symConfig.symbolYGap * i) + symbolTopPadding + symbolOffset.y;
                    
                    _sndLib.play(_sndLib.sprite.additonsound5)
                    winSym.playAnimation();
                    this.ScatterAppearArray.push(winSym);
                    symbolArray.push([reelId, i]);
                }
            }
        }
        if(symbolArray.length>0){ _mediator.publish("hideReelSymbols", symbolArray, "eachReel"); }
    } 

    
};

view.removeBonusLand = function(){
    for (let i = 0; i < this.ScatterAppearArray.length; i++) {
        this.winSymbolContainer.removeChild(this.ScatterAppearArray[i]);
        this.ScatterAppearArray[i] = null;
    }
    this.ScatterAppearArray = [];
};
view.showSpawningWild = function () {};
view.hideAlternateWins = function () {};
view.showBonusAwarded = function () {};
view.hideBonusAwarded = function () {};
view.showWildMultiplier = function(){};
view.showSpawningWild = function(){};
view.onGameResize = function () {};
view.show = function () { this.visible = true; };
view.hide = function () { this.visible = false; };
view.destroy = function () { this.destroy();};
view.showScatterLand = function (sym, pos) {};
view.clearScatterLand = function () {};
view.showWalkingWild = function () {};
view.clearWalkingWild = function () {};
view.addWildExpanding = function (reelId) {};
view.clearWildExpanding = function () {};
view.addRandomWilds = function (posAry) {};
view.clearRandomWilds = function (posAry) {};
view.onSpinStart = function(){};
view.showStickySymobolsOnInit = function () {};

view.showAllWins = function (allWinLines) {
    this.createWinSymbolContainer();
    if (this.lineSymbols) { this.clearLine(); }
    this.tweens = [];
    this.lineSymbols = [];
    this.linesObj = allWinLines;
    var isWildInWinLine = false;

    for (let k = 0; k < this.linesObj.length; k++) {
        var lineNum = this.linesObj[k].line;
        for (var i = 0; i < this.linesObj[k].pos.length; i++) {
            var symbol = this.getSymbolFromPosition(this.linesObj[k].pos[i]);
            if(symbol === "w"){
                isWildInWinLine = true;
            }
        }
    }

    for (let k = 0; k < this.linesObj.length; k++) {
        var lineNum = this.linesObj[k].line;
        for (var i = 0; i < this.linesObj[k].pos.length; i++) {
            var symbol = this.getSymbolFromPosition(this.linesObj[k].pos[i]);
            symbol = this.getSymbolName(symbol);
            if(isWildInWinLine && _ng.GameConfig.symbolAnimations[symbol+"_wild"]){
                symbol = symbol + "_wild";
            }
            var winSym = new WinSymbol(symbol);
            this.winSymbolContainer.addChild(winSym);
            winSym.playAnimation();           
            this.lineSymbols.push(winSym);

            var symbolOffset = {x: 0, y: 0};
            if(this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded){
                symbolOffset = this.animationConfig[symbol][0].offset
            }
            var xReelPos = this.getSymbolFromPosition(this.linesObj[k].pos[i], "xValue");
            var yReelPos = this.getSymbolFromPosition(this.linesObj[k].pos[i], "yValue");
            winSym.x = this.reelConfig.data.eachReelPos[xReelPos] + symbolOffset.x;
            var symbolTopPadding = (this.reelConfig.data.eachReelYPos) ? this.reelConfig.data.eachReelYPos[xReelPos] : 0;
            var yPos = Math.floor(Number(this.linesObj[k].pos[i]) / Number(this.reelConfig.data.noOfReels));
            var gaps = (this.symConfig.symbolYGap * (yPos + 1));
            winSym.y = ((this.symConfig.symbolHeight) * (yPos + 1)) + gaps + symbolTopPadding + symbolOffset.y;

            if (this.stackedReels && this.stackedReels.length > 0) {
                for (var j = 0; j < this.stackedReels.length; j++) {
                    if (this.stackedReels[j] == i) {
                        winSym.visible = false;
                        this.playExpandingSymbol(i);
                    }
                }
            }
            this.updateSymbolProps(winSym, k, i);
        }
        //_mediator.publish("showSingleLine", lineNum, k);
    }
    this.allWinsAdditionalAnimation();
};
view.allWinsAdditionalAnimation = function(){}
view.updateSymbolProps = function(winSym, k, i){}
view.playExpandingSymbol = function (reeId) {}
view.getSymbolFromPosition = function (pos, type) {
    var matrix = coreApp.gameModel.getReelMatrix();
    var xV = pos % _ng.GameConfig.ReelViewUiConfig.data.noOfReels;
    var yV = Math.floor(pos / _ng.GameConfig.ReelViewUiConfig.data.noOfReels);
    if (type === "xValue") {
        return xV;
    } else if (type === "yValue") {
        return yV;
    } else { return matrix[xV][yV]; }
}	
view.stopSpinNow = function(){
    this.isStopSpinCalled = true;
    this.removeBonusLand();
}

// ============================================================================
// Game-Specific Extensions & Prototype Overrides (GWinView.js)
// ============================================================================
var gWV = WinView.prototype;
var FsTotalMultiplier = 0;

gWV.addGameElements = function () {
	this.totalMultiplierValue = [];
	this.freespinTotalValue = 0;
	this.multiContainer = pixiLib.getContainer();
	this.multiContainer.alpha = 0;
	this.addChild(this.multiContainer);
	this.multiContainer.name = "multiContainer";

	this.tumbleBox = pixiLib.getElement("Sprite", "placeholder");
	this.tumbleBox.position.set(0, -320);
	this.tumbleBox.anchor.set(0.5);
	this.tumbleBox.scale.set(0.67);
	this.tumbleBox.name = "tumbleBox";
	this.multiContainer.addChild(this.tumbleBox);

	this.currentTotal = 0;
	this.finalValue = 0;
	this.scatterCount = 0;

	var multiplierWinTxtStyle = {
		"type": "BitmapFont",
		"fontName": "Numbers-export",
		"fontSize": 25,
		"align": "center"
	}
	var multiText = {
		"type": "BitmapFont",
		"fontName": "box-Multiplier",
		"fontSize": 14,
		"align": "center",
		"maxWidth": 500,
	}
	var winStyle = {
		"type": "BitmapFont",
		"fontName": "numbers-export",
		"fontSize": 45,
		"align": "center"
	};
	var winStyle1 = {
		"type": "BitmapFont",
		"fontName": "dedeBitmap",
		"fontSize": 28,
		"align": "center"
	};

	this.allWin = pixiLib.getElement("Text", winStyle1);
	this.allWin.name = "Allwintext";
	this.allWin._rawAmount = 0;
	this.multiContainer.addChild(this.allWin);
	pixiLib.setText(this.allWin, "");
	this.allWin.anchor.set(0.5);
	this.allWin.position.set(0, -320);

	this.multiplierWinTxt = pixiLib.getElement("Text", multiText);
	this.multiContainer.addChild(this.multiplierWinTxt);
	pixiLib.setText(this.multiplierWinTxt, "");
	this.multiplierWinTxt.anchor.set(0.5);
	this.multiplierWinTxt.name = "MultiplayerWinText";
	this.multiplierWinTxt.x = this.allWin.x + this.allWin.width + 10;
	this.multiplierWinTxt.y = -320;
	this.multiplierWinTxt.visible = true;
	this.addChild(this.multiContainer);

	this.BonusPos = [];
	this.winBgs = [];
	this.winTexts = [];
	this.winFlame = [];
	this.BonusPosX = [147, 316, 488, 659, 829]
	this.BonusPosY = [175, 357, 530]
	this.winAnimArr = [];

	_mediator.subscribe("hitSym", this.hitSym.bind(this));
	_mediator.subscribe('removeMultipliers', this.removeMultipliers.bind(this));
	_mediator.subscribe('createSticky', this.createSticky.bind(this));
	_mediator.subscribe('tweenTotalWin', this.tweenTotalWin.bind(this));
	_mediator.subscribe('removeAllmultipliers', this.removeAllmultipliers.bind(this));
	_mediator.subscribe('getTotalwin', this.getTotalwin.bind(this));
	_mediator.subscribe("TumbleWin", this.TumbleWin.bind(this));
	_mediator.subscribe("removeWinAnim", this.removewinAnim.bind(this));
	_mediator.subscribe("ScatterWin", this.ScatterWin.bind(this))
	_mediator.subscribe("toggleTumbleBox", this.toggleTumbleBox.bind(this));
	_mediator.subscribe("updateTextWithCountUp", this.updateTextWithCountUp.bind(this));
	_mediator.subscribe("showExtraSpins", this.showExtraSpins.bind(this));
	_mediator.subscribe("playLandAnim", this.playLandAnim.bind(this));
	_mediator.subscribe("resetTotalFSWin", this.resetTotalFSWin.bind(this));
	this.cacheID = 100;
	this.cachePos = 100;
	this.onGameResize();
}
gWV.onGameResize = function (val) {

	_mediator.publish("ResizeGview");
	if (_viewInfoUtil.viewType == "VP") {

		this.tumbleBox.scale.set(0.67);
		this.tumbleBox.position.set(0, 0);

		this.multiContainer.position.set(674, 52);
		this.multiContainer.scale.set(1);

		this.allWin.position.set(0, 0);

	}
	else if (_viewInfoUtil.viewType == "VL") {
		
		this.multiContainer.position.set(660, 54);
		this.multiContainer.scale.set(1);

		this.tumbleBox.position.set(0, 0);
		this.allWin.position.set(0, 0);

	} else {
		this.multiContainer.position.set(660, 316);
		this.multiContainer.scale.set(0.8)

	}
	_mediator.publish("resizeBuypopup")
}
gWV.resetTotalFSWin = function (value) {
	this.freespinTotalValue = value;
}
gWV.showAlternateLineWins = function (linesObj) {
	this.alternatetriggeredOnce = false;
	this.linesObj = linesObj;
	this.linesLoopIndex = 0;
	this.lineWinsLoopCount = 0;
	_mediator.publish("FadeReels", 1);
	if (this.BonusPos.length > 0) {
		setTimeout(
			function () {
				this.showLine();
				if (!(coreApp.gameModel.userModel.userData.next_round && coreApp.gameModel.userModel.userData.next_round.type == "freespins"))
					_mediator.publish("EnablePanel");
				_mediator.publish("FadeReels", 0.3);
			}.bind(this), (_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") ?
			500 : this.BonusPos.length * 450
		)
	}
	else {
		this.showLine();
	}
};

gWV.showAllWins = function (allWinLines) {
	this.createWinSymbolContainer();
	if (this.lineSymbols) { this.clearLine(); }
	this.tweens = [];
	this.lineSymbols = [];
	this.linesObj = allWinLines;
	var isWildInWinLine = false;

	for (let k = 0; k < this.linesObj.length; k++) {
		var lineNum = this.linesObj[k].line;
		for (var i = 0; i < this.linesObj[k].pos.length; i++) {
			var symbol = this.getSymbolFromPosition(this.linesObj[k].pos[i]);
			if (symbol === "w") {
				isWildInWinLine = true;
			}
		}
	}

	for (let k = 0; k < this.linesObj.length; k++) {
		var lineNum = this.linesObj[k].line;
		for (var i = 0; i < this.linesObj[k].pos.length; i++) {
			var symbol = this.getSymbolFromPosition(this.linesObj[k].pos[i]);
			symbol = this.getSymbolName(symbol);
			if (isWildInWinLine && _ng.GameConfig.symbolAnimations[symbol + "_wild"]) { symbol = symbol + "_wild"; }
			var winSym = new WinSymbol(symbol);
			this.winSymbolContainer.addChild(winSym);
			winSym.playAnimation();
			this.lineSymbols.push(winSym);

			var symbolOffset = { x: 0, y: 0 };
			if (this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded) { symbolOffset = this.animationConfig[symbol][0].offset; }
			var xReelPos = this.getSymbolFromPosition(this.linesObj[k].pos[i], "xValue");
			var yReelPos = this.getSymbolFromPosition(this.linesObj[k].pos[i], "yValue");
			winSym.x = this.reelConfig.data.eachReelPos[xReelPos] + symbolOffset.x;
			var symbolTopPadding = (this.reelConfig.data.eachReelYPos) ? this.reelConfig.data.eachReelYPos[xReelPos] : 0;
			var yPos = Math.floor(Number(this.linesObj[k].pos[i]) / Number(this.reelConfig.data.noOfReels));
			var gaps = (this.symConfig.symbolYGap * (yPos + 1));
			winSym.y = ((this.symConfig.symbolHeight) * (yPos + 1)) + gaps + symbolTopPadding + symbolOffset.y;
			if (this.getValidateExpWild(this.linesObj[k].pos[i])) {
				var frames = [];
				for (var z = 1; z < 25; z++) {
					frames.push(PIXI.Texture.from((z < 10) ? "wexp_0" + z : "wexp_" + z));
				}
				var expWild = new PIXI.AnimatedSprite(frames)
				if (!this.wildSybols) { this.wildSybols = []; }
				this.wildSybols.push(expWild);
				this.winSymbolContainer.addChild(expWild);
				expWild.x = winSym.x - 92; expWild.y = winSym.y - 89;
				expWild.play();
				winSym.visible = false;
			}
			this.updateSymbolProps(winSym, k, i);
		}
		// _mediator.publish("showSingleLine", lineNum, k);
	}
	this.allWinsAdditionalAnimation();
};
gWV.hitSym = function (reelNum, symArray) {
}

gWV.clearAllWins = function () {
	if (this.wildSybols) {
		for (var i = 0; i < this.wildSybols.length; i++) {
			this.winSymbolContainer.removeChild(this.wildSybols[i]);
		}
		this.wildSybols = [];
	}
	this.isStopSpinCalled = false;
	this.clearLine();
	try {
		if (this.symbolForWinSound) { _sndLib.stop(_sndLib.sprite[this.symbolForWinSound]); }
	} catch (e) { }
	clearTimeout(this.showLineTimeout);
};
gWV.getValidateExpWild = function (position) {
	if ((position == 0 || position == 1 || position == 2 || position == 3 || position == 4) && _ng.expandedReels && _ng.expandedReels[position]) { return true; }
	return false;
}
gWV.removeWinBg = function () {
	if (this.border) {
		this.removeChild(this.border);
	}
}
gWV.CreateWinBg = function () {

	this.border = pixiLib.getElement("Sprite", "Total_Base");
	this.border.name = "BG border";
	// this.border.scale.set(0.1);
	this.border.rotation = 1.57;
	this.addChild(this.border);
	this.border.x = 640; this.border.y = 400;


	if (_viewInfoUtil.viewType === "VD") {
		this.border.x = 595; this.border.y = 335;
		this.border.scale.set(1.5);
	}
	else if (_viewInfoUtil.viewType === "VP") {
		this.border.x = 670; this.border.y = 319;
		this.border.scale.set(1.2);
	}
	else {
		this.border.x = 732; this.border.y = 300;
		this.border.scale.set(2, 2);
	}
}

// Rest of code is multiplier part done by Jeffin
gWV.createStickyContainer = function () {
	if (!this.stickyContainer) {
		this.stickyContainer = pixiLib.getContainer();
		this.stickyContainer.name = "stickyContainer";
		this.addChild(this.stickyContainer);
	}
	else {
		this.stickyContainer.visible = true;
	}
	this.stickyContainer.x = coreApp.gameView.reelController.view.reelContainer.x;
	this.stickyContainer.y = coreApp.gameView.reelController.view.reelContainer.y;
}

gWV.removeMultipliers = function () {
	if (this.allWinMoved && this.allWinMoved == true) {
		// this.allWin.x = this.allWin.x + 50;
		this.allWinMoved = false;
	}
	pixiLib.setText(this.allWin, "");
	this.allWin._rawAmount = 0;

	this.currentTotal = 0;
	if (coreApp.gameModel.userModel.userData.current_round.spin_type == "freespin") {
		if (this.stickyContainer) {
			this.removeChild(this.stickyContainer)
			delete this.stickyContainer;
		}
		this.toggleTumbleBox(0);
		_mediator.publish("toggleFadeContainer", true);
		this.currentTotal = 0;
		this.finalValue = 0;
		this.multiplierTotal = 0;
		pixiLib.setText(this.allWin, "");
		indexValue = -1;
		pixiLib.setText(this.multiplierWinTxt, "");
		this.totalMultiplierValue = [];
		this.multiplierArray = [];
	}
}

gWV.calculatePosFromIndex = function (value) {
	var symbol = "m";
    var xReelPos = this.getSymbolFromPosition(value, "xValue");
    var symbolOffset = (this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded) ? this.animationConfig[symbol][0].offset : { x: 0, y: 0 };
    var symbolTopPadding = (this.reelConfig.data.eachReelYPos) ? this.reelConfig.data.eachReelYPos[xReelPos] : 0;
    var yPos = Math.floor(Number(value) / Number(this.reelConfig.data.noOfReels));
    var gaps = (this.symConfig.symbolYGap * yPos);
    xPos = this.reelConfig.data.eachReelPos[xReelPos] + symbolOffset.x;
    yPos = ((this.symConfig.symbolHeight) * yPos) + gaps + symbolTopPadding + symbolOffset.y + 25;
    let positions = [xPos, yPos];
    return positions;
}
gWV.getNonZeroMultiplierPos = function (arr) {
	let tmpPosArray = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== 0) {
			let temp = [arr[i], i];
			tmpPosArray.push(temp);
		}
	}
	return tmpPosArray;
}
gWV.showLine = function () { };
gWV.newReelSymbols = function () {

}
gWV.createSticky = function () {
	if (coreApp.gameModel.userModel.userData.current_round.spin_type == "freespin" && this.currentTotal > 0) {
		this.createStickyandTween();
	}
}
gWV.createStickyandTween = function () {
	var multiTextStyle = {
		"type": "BitmapFont",
		"fontName": "box-Multiplier",
		"fontSize": 14,
		"align": "center",
		"maxWidth": 500,
	};
	
	this.createStickyContainer();
	this.multiplierTotal = 0;
	this.multiplierArray = [];
	this.symbolIndex = this.findSticky();
	
	for (let index = 0; index < this.symbolIndex.length; index++) {

		let newPos = this.calculatePosFromIndex(this.symbolIndex[index][1]);
        this.TweenMultiplierText = pixiLib.getElement("Text",multiTextStyle);
        this.TweenMultiplierText.anchor.set(0.5);
        this.TweenMultiplierText.name = "Multiplier " + index;
        pixiLib.setText(this.TweenMultiplierText, this.symbolIndex[index][0] + "x");
        this.TweenMultiplierText.x = newPos[0];
        this.totalMultiplierValue.push(this.symbolIndex[index][0]);
        this.TweenMultiplierText.y = newPos[1] - 30;
        this.stickyContainer.addChild(this.TweenMultiplierText);
        this.TweenMultiplierText.alpha = 1;
        let temp = [this.TweenMultiplierText, this.symbolIndex[index][0]];
        this.multiplierArray.push(temp);
	}
	setTimeout(() => {
		this.tweenAnimation();
	}, 1400);
}

gWV.showEachReelStopAction = function (reelId, reelStrip) {
	//#todo if this reel is not expanded 
	if (!_ng.GameConfig.ReelViewUiConfig.showScatterLand || !_viewInfoUtil.isSecondaryAssetsLoaded) {
		return;
	}
	this.createWinSymbolContainer();

	var symbolArray = [];
	if (reelId == 0) { this.scatterCount = 0; }

	if (!_ng.isQuickSpinActive) {
		for (i = 0; i < reelStrip.length; i++) {
			for (j = 0; j < _ng.GameConfig.aniticipateSymbol.length; j++) {
				if (reelStrip[i] === _ng.GameConfig.aniticipateSymbol[j]) {
					this.scatterCount += 1;
					// var winSym = new WinSymbol(_ng.GameConfig.aniticipateSymbol[j] + "_land");
					// this.winSymbolContainer.addChild(winSym);
					// var symbolTopPadding = 0;
					// if (this.reelConfig.data.eachReelYPos) {
					//     symbolTopPadding = this.reelConfig.data.eachReelYPos[i];
					// }
					// var symbolOffset = {x: 0, y: 0};
					// if (this.animationConfig[_ng.GameConfig.aniticipateSymbol[j]] && this.animationConfig[_ng.GameConfig.aniticipateSymbol[j]].offset){
					//     symbolOffset = this.animationConfig[_ng.GameConfig.aniticipateSymbol[j]].offset
					// }
					// if (this.reelConfig.data.eachReelPos && this.reelConfig.data.eachReelPos[i] !== undefined) {
					//     winSym.x = this.reelConfig.data.eachReelPos[reelId] + symbolOffset.x;
					// } else {
					//     winSym.x = this.symConfig.symbolWidth * reelId + (this.symConfig.symbolXGap * i) + symbolOffset.x;
					// }
					// winSym.y = this.symConfig.symbolHeight * (i + 1) + (this.symConfig.symbolYGap * i) + symbolTopPadding + symbolOffset.y;

					if (this.scatterCount < 4 && this.reelId < 4) {
						_sndLib.play(_sndLib.sprite.sLand_3);
					}
					else if (this.scatterCount >= 4) {
						_sndLib.stop(_sndLib.sprite.sLand_3);
						_sndLib.play(_sndLib.sprite.sLand_4);

					}
					// winSym.playAnimation();
					// this.ScatterAppearArray.push(winSym);
					// symbolArray.push([reelId, i]);
				}
			}
		}
		// if(symbolArray.length>0){ 
		// 	_mediator.publish("hideReelSymbols", symbolArray, "eachReel"); 
		// }
	}


};
gWV.removeBonusLand = function () {

	setTimeout(function () {
		for (let i = 0; i < this.ScatterAppearArray.length; i++) {
			this.winSymbolContainer.removeChild(this.ScatterAppearArray[i]);
			this.ScatterAppearArray[i] = null;
		}
		this.ScatterAppearArray = [];
	}.bind(this), 1)
};
gWV.removeAllmultipliers = function () {
}
gWV.tweenAnimation = function () {
	let xPos, yPos;
	if (this.multiplierArray.length == 0) {
		return;
	};
	this.allWin.x = this.allWin.x - 50;
	this.allWinMoved = true;

	this.multiplierWinTxt.x = (this.allWin.x + this.allWin.width);
	this.multiplierWinTxt.y = this.allWin.y;
	
	for (let j = 0; j < this.multiplierArray.length; j++) {
		let time = (_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") ? 0.1 : 0.4;
		if (_viewInfoUtil.viewType == "VD") {
			xPos = 430;
			yPos = -80;
		} else {
			xPos = 470;
			yPos = -86;
		}
		
		gsap.to(this.multiplierArray[j][0], time, {
			x: xPos,
			y: yPos,
			ease: Power2.easeOut,
			delay: time * j,
			onComplete: function () {
				this.multiplierArray[j][0].parent.removeChild(this.multiplierArray[j][0]);
				this.tweenTotalWin(this.multiplierArray[j][1]);
			}.bind(this)
		});
	}
}
gWV.toggleTumbleBox = function (value) {
	this.multiContainer.alpha = value;
}
gWV.tweenTotalWin = function (value) {
	this.multiplierTotal = this.multiplierTotal + value;
	pixiLib.setText(this.multiplierWinTxt, "x" + this.multiplierTotal);
	if (_viewInfoUtil.viewType == "VP"||_viewInfoUtil.viewType == "VL") {
		this.multiplierWinTxt.y = -10;
	}else{
		this.multiplierWinTxt.y = -330;
	}
	if (coreApp.gameModel.obj.current_round.post_matrix_info.win == this.multiplierTotal) {
		let time = 0;

		if (_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") {
			time = 250;
		}
		else {
			time = 500;
		}
		setTimeout(() => {
			this.tweenFinal();
		}, time);
	}
}
gWV.tweenFinal = function () {
	if (this.currentTotal == 0) {
		return;
	}
	var multiText = {
		"type": "BitmapFont",
		"fontName": "box-Multiplier",
		"fontSize": 14,
		"align": "center",
		"maxWidth": 500,
	}
	this.mText = pixiLib.getElement("Text", multiText);
	this.multiContainer.addChild(this.mText);
	pixiLib.setText(this.mText, this.multiplierTotal);
	this.mText.anchor.set(0.5);
	this.mText.name = "tweenFinalText";
	this.mText.x = this.multiplierWinTxt.x;
	this.mText.y = this.multiplierWinTxt.y;
	// let xPos = this.allWin.worldTransform.tx;
	// let yPos = this.allWin.worldTransform.ty;
	// if (sum > 0) {
	let time = 0;
	if (_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") {
		time = 0.15
	}
	else {
		time = 0.5;
	}
	pixiLib.setText(this.multiplierWinTxt, "");
	TweenMax.to(this.mText, time, {
		x: this.allWin.x,
		y: this.allWin.y,
		ease: Power2.easeInOut,
		alpha: 0,
		onUpdate: function () {
			const progress = this.progress();
			if (progress <= 0) {
				this.target.alpha = 0;
			}
		},
		onComplete: function () {
			if (this.allWinMoved && this.allWinMoved == true) {
				// this.allWin.x = this.allWin.x+50;
				// if (_viewInfoUtil.viewType == "VP") {
				// 	this.allWin.x = 0;
				// }
				// else if (_viewInfoUtil.viewType == "VL") {
				// 	this.allWin.x = 0
				// }
				// else {
					this.allWin.x = 0
				// }
				this.allWinMoved = false;
			}
			this.mText.parent.removeChild(this.mText);
			_sndLib.play(_sndLib.sprite.totalmultiplication);
			let roundWin = coreApp.gameModel.userModel.userData.current_round.payline_win_amount;
			_mediator.publish("updateTextWithCountUp", roundWin, 150, this.allWin);
			if (coreApp.gameModel.userModel.userData.current_round.spin_type == "freespin") {
				this.freespinTotalValue = coreApp.gameModel.userModel.userData.current_round.total_fs_win_amount;
			}
			else {
				this.freespinTotalValue = roundWin;
			}
			_mediator.publish("UpdateWin", this.freespinTotalValue);
			if (!coreApp.gameModel.isFreeSpinActive()) {
				_mediator.publish(_events.slot.updateBalance);
			}
			_mediator.publish("SHOW_TICKER_MESSAGE", gameLiterals.win_text + " : " + pixiLib.getFormattedAmount(this.freespinTotalValue, true));
			coreApp.gameController.isMulValueUpdation = true;
			//Calling All win pop up after the updation of totalamount
			_mediator.publish("triggerAllWinAnimation");
		}.bind(this),
	})
}
gWV.findIndexfromValue = function (finalArray, value) {
	for (let index = 0; index < finalArray.length; index++) {
		if (finalArray[index] == value) {
			return index;
		}

	}
}
gWV.findSticky = function () {
	if (coreApp.gameModel.userModel.userData.current_round.misc_prizes.count == 0) {
		mValue = coreApp.gameModel.userModel.userData.current_round.screen_wins;
		mValue = this.getNonZeroMultiplierPos(mValue);
	}
	else {
		let count = coreApp.gameModel.userModel.userData.current_round.misc_prizes.count;
		mValue = coreApp.gameModel.userModel.userData.current_round.misc_prizes[count - 1].screenWins;
		mValue = this.getNonZeroMultiplierPos(mValue);
	}
	return mValue;
}
gWV.TumbleWin = function (array, num, tickerValues) { //parsed values like which symbol name burst and the total number
	if (coreApp.gameModel.userModel.userData.current_round.spin_type == "freespin") {
		this.toggleTumbleBox(1);
		_mediator.publish("toggleFadeContainer", false);
	}
	this.arrayTemp = array;
	// console.log("tumbleWin " + array);
	this.winamtStyle = {
		"type": "BitmapFont",
		"fontName": "dedeBitmap",
		"fontSize": 36,
		"align": "center"
	};
	for (var j = 0; j < coreApp.gameModel.obj.current_round.misc_prizes[num].old_reel_symbol.length; j++) {
		this.winamt = pixiLib.getElement("Text", this.winamtStyle);
		this.winamt.name = "TumbleWin";
		this.winamt.anchor.set(0.5);
		this.winamt.scale.set(1);
		this.winamt.x = 500 - (j * 110);
		this.winamt.y = 300 + (j * 80);
		this.addChild(this.winamt);
		this.winAnimArr.push(this.winamt);
		// console.log(tickerValues[0][0],tickerValues[0][1]);
		this.currentWin = this.finalArray[0];
		this.currentWin = parseFloat(this.currentWin);
		this.currentTotal = this.currentTotal + this.currentWin;
		this.freespinTotalValue = this.freespinTotalValue + this.currentWin;
		console.log("FREE SPIN TOTAL VALUE",this.freespinTotalValue);
		
		pixiLib.setText(this.winamt, pixiLib.getFormattedAmount(array[0]));
		_mediator.publish("showNewMessage", tickerValues[0][0] + " X " + "        " + gameLiterals.pays + " " + pixiLib.getFormattedAmount(array[0]));
		_mediator.publish("updateSymbol", tickerValues[0][1]);
		setTimeout(() => {
			_mediator.publish("showNewMessage", "");
			_mediator.publish("updateSymbol", "");
		}, 1000);
		TweenMax.to(this.winamt, 1.2, {
			y: this.winamt.y - 80,
			alpha: 0,
			ease: Linear.easeInOut,
		});
		array.shift();
		tickerValues.shift();
	}
	_mediator.publish("updateTextWithCountUp", this.currentTotal, 300, this.allWin);
	// pixiLib.updateTextWithCountup(this.allWin, {isAmount : false, startValue : this.allWin.text, endValue : this.currentTotal, duration : 2})
	_mediator.publish("UpdateWin", this.freespinTotalValue);
	_mediator.publish("SHOW_TICKER_MESSAGE", gameLiterals.win_text + " : " + pixiLib.getFormattedAmount(this.freespinTotalValue));
}
gWV.getTotalwin = function (array) {
	this.finalValue = [];
	this.finalArray = array;
	this.finalValue = 0;
	for (let l = 0; l < array.length; l++) {
		let cValue = array[l];
		cValue = parseFloat(cValue);
		this.finalValue = this.finalValue + cValue;
	}
}
gWV.removewinAnim = function () {
	for (var i = 0; i < this.winAnimArr.length; i++) {
		this.removeChild(this.winAnimArr[i]);
	}
	this.winAnimArr = [];
}

gWV.ScatterWin = function () {
	this.winamtStyle = {
		"type": "BitmapFont",
		"fontName": "dedeBitmap",
		"fontSize": 36,
		"align": "center"
	};
	this.ScatterWintxt = pixiLib.getElement("Text", this.winamtStyle);
	this.ScatterWintxt.name = "";
	this.ScatterWintxt.anchor.set(0.5);
	this.ScatterWintxt.scale.set(1);
	this.ScatterWintxt.x = 500;
	this.ScatterWintxt.y = 300;
	this.addChild(this.ScatterWintxt);
	pixiLib.setText(this.ScatterWintxt, pixiLib.getFormattedAmount(coreApp.gameModel.obj.current_round.scatter_win));
	_mediator.publish("UpdateWin", coreApp.gameModel.obj.current_round.scatter_win);
	this.freespinTotalValue = this.freespinTotalValue + coreApp.gameModel.obj.current_round.scatter_win;
	_mediator.publish("SHOW_TICKER_MESSAGE", gameLiterals.win_text + " : " + pixiLib.getFormattedAmount(coreApp.gameModel.obj.current_round.scatter_win));
	setTimeout(() => {
		if (!coreApp.gameModel.isFreeSpinActive()) {
			_mediator.publish(_events.slot.updateBalance);
		}
	}, 200);
	TweenMax.to(this.ScatterWintxt, 0.8, {
		width: this.ScatterWintxt.width + 10,
		height: this.ScatterWintxt.height + 10,
		ease: Linear.easeInOut,
		yoyo: true,
		repeat: 2,
		onComplete: function () {
			this.removeChild(this.ScatterWintxt);
		}.bind(this)
	});
}

gWV.updateTextWithCountUp = function (endValue, totalTime, obj) {
    // 1. Pull from a raw property instead of parsing the display text. Fallback to 0.
    let startValue = obj._rawAmount || 0; 
    let increment = (endValue - startValue) / totalTime;
    let startTime = new Date().getTime();
    
    let timer = setInterval(function () {
        let elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime >= totalTime) {
            obj._rawAmount = endValue; // 2. Save the raw end value
            obj.text = pixiLib.getFormattedAmount(endValue);
            clearInterval(timer);
        } else {
            let currentValue = startValue + increment * elapsedTime;
            obj._rawAmount = currentValue; // 3. Save the current raw value
            obj.text = pixiLib.getFormattedAmount(currentValue);
        }
    }, 10);
}

gWV.playBonusSymbolAnimation = function (data) {

	if (coreApp.gameModel.obj.current_round.scatter_win && coreApp.gameModel.obj.current_round.scatter_win > 0) {
		_mediator.publish("ScatterWin")
	}
	if (coreApp.gameModel.obj.current_round.misc_prizes.count == 0 || coreApp.gameModel.obj.current_round.misc_prizes == "") {
		var bonusID = data.bonusID;
		var reelMatrix = data.reelMatrix;
		var bonusSymbol = _ng.GameConfig.bonusGames[bonusID].symbol;
		var animationDuration = this.animationConfig[bonusSymbol][0].animationDuration;
		var symbolArray = [];
		this.createWinSymbolContainer();
		for (var i = 0; i < reelMatrix.length; i++) {
			for (var j = 0; j < reelMatrix[i].length; j++) {
				if (reelMatrix[i][j] === bonusSymbol) {
					symbolArray.push(pixiLib.getPosition(j, i));
				}
			}
		}
		_mediator.publish("hideReelSymbols", symbolArray);
		this.animateScatterSymbols(reelMatrix, bonusSymbol, animationDuration);
		_sndLib.play(_sndLib.sprite.scatter_play);

		setTimeout(function () {
			_mediator.publish("showReelSymbols");
			this.clearBonusSymbols();
			_mediator.publish("bonusSymbolAnimationCompleted");
		}.bind(this), animationDuration);
	}
	else {
		if (coreApp.gameModel.obj.misc_prizes && coreApp.gameModel.obj.misc_prizes[coreApp.gameModel.obj.misc_prizes.count - 1] && coreApp.gameModel.obj.misc_prizes[coreApp.gameModel.obj.misc_prizes.count - 1].new_reel) {
			var bonusID = data.bonusID;
			var reelMatrix = coreApp.gameModel.obj.misc_prizes[coreApp.gameModel.obj.misc_prizes.count - 1].new_reel;
			var bonusSymbol = _ng.GameConfig.bonusGames[bonusID].symbol;
			var animationDuration = this.animationConfig[bonusSymbol][0].animationDuration;
			var symbolArray = [];
			this.createWinSymbolContainer();
			for (var i = 0; i < reelMatrix.length; i++) {
				for (var j = 0; j < reelMatrix[i].length; j++) {
					if (reelMatrix[i][j] === bonusSymbol) {
						symbolArray.push(pixiLib.getPosition(j, i));
					}
				}
			}
			_mediator.publish("hideReelSymbols", symbolArray);
			this.animateScatterSymbols(reelMatrix, bonusSymbol, animationDuration);
			try {
				if (this.animationConfig[symbol] !== undefined) {
					var symbolForWinSound = this.animationConfig[symbol][0].winSound.name;
					_sndLib.play(_sndLib.sprite[symbolForWinSound]);
				}
			} catch (e) { }
			setTimeout(function () {
				_mediator.publish("showReelSymbols");
				this.clearBonusSymbols();
				_mediator.publish("bonusSymbolAnimationCompleted");
			}.bind(this), animationDuration);
		}
		else {
			_mediator.publish("bonusSymbolAnimationCompleted");
		}
	}
};
gWV.showExtraSpins = function (callback) {
	_mediator.publish("ExtraFSAwardpopup", callback);
}
gWV.playLandAnim = function (reelId, position) {

	if ((this.cacheID != reelId || this.cachePos != position) && position < 6 && position > 0) {
		this.cacheID = reelId;
		this.cachePos = position;
		// console.log("In creation: " + this.cacheID + "  " + this.cachePos);

		setTimeout(function () {

			// 		var s_landAnim = pixiLib.getElement("Spine", "Land");


			// 		s_landAnim.scale.set(0.3)

			// 		this.addChild(s_landAnim);
			// 		s_landAnim.state.setAnimation(0, 'animation', true);



			var symbol = "s";
			symbol = this.getSymbolName(symbol);
			let winSym = pixiLib.getElement("Sprite", "s");
			winSym.name = "land " + reelId + " " + position;
			winSym.scale.set(0.45);
			this.addChild(winSym);
			winSym.anchor.set(0.5)
			this.bonusSymbols.push(winSym);

			// var symbol = "s_land";
			// symbol = this.getSymbolName(symbol);
			// let winSym =pixiLib.getElement("Spine", "Land") ;
			// winSym.name="land "+reelId+ " "+position;
			// winSym.scale.set(0.3);
			// this.addChild(winSym);
			// this.bonusSymbols.push(winSym);
			var symbolTopPadding = 0;
			if (this.reelConfig.data.eachReelYPos) {
				symbolTopPadding = this.reelConfig.data.eachReelYPos[reelId];
			}
			var symbolOffset = { x: 0, y: 0 };
			if (this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded) {
				symbolOffset = this.animationConfig[symbol][0].offset
			}
			if (this.reelConfig.data.eachReelPos && this.reelConfig.data.eachReelPos[reelId] !== undefined) {
				winSym.x = this.reelConfig.data.eachReelPos[reelId] + symbolOffset.x;
			} else {
				winSym.x = this.symConfig.symbolWidth * reelId + (this.symConfig.symbolXGap * reelId) + symbolOffset.x;
			}
			winSym.y = this.symConfig.symbolHeight * (position + 1) + (this.symConfig.symbolYGap * position) + symbolTopPadding + symbolOffset.y;
			winSym.x += 150;
			winSym.y -= 165;
			// winSym.state.setAnimation(0, 'animation', false);
			TweenMax.to(winSym.scale, 0.8, {
				x: 0.55, y: 0.55, yoyo: true, repeat: 2
			});
			setTimeout(function () {
				this.removeChild(winSym);
				this.cacheID = 100;
				this.cachePos = 100;
				// this.removeChild(s_landAnim);
			}.bind(this), 750);
		}.bind(this), 200)
	}

};

gWV.animateScatterSymbols = function (reelMatrix, bonusSymbol, animationDuration) {
	for (var i = 0; i < reelMatrix.length; i++) {
		for (var j = 0; j < reelMatrix[i].length; j++) {
			if (reelMatrix[i][j] === bonusSymbol) {
				var symbol = bonusSymbol;
				symbol = this.getSymbolName(symbol);
				var winSym = new WinSymbol(symbol);
				this.winSymbolContainer.addChild(winSym);
				this.bonusSymbols.push(winSym);
				var symbolTopPadding = 0;
				if (this.reelConfig.data.eachReelYPos) {
					symbolTopPadding = this.reelConfig.data.eachReelYPos[i];
				}
				var symbolOffset = { x: 0, y: 0 };
				if (this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded) {
					symbolOffset = this.animationConfig[symbol][0].offset
				}
				if (this.reelConfig.data.eachReelPos && this.reelConfig.data.eachReelPos[i] !== undefined) {
					winSym.x = this.reelConfig.data.eachReelPos[i] + symbolOffset.x;
				} else {
					winSym.x = this.symConfig.symbolWidth * i + (this.symConfig.symbolXGap * i) + symbolOffset.x;
				}
				winSym.y = (this.symConfig.symbolHeight * j) + (this.symConfig.symbolYGap * j) + symbolTopPadding + symbolOffset.y;
				winSym.playAnimation();
			}
		}
	}
}



// --- Consolidated Exports & Aliases ---
var GWinView = WinView;
if (typeof window !== "undefined") { window.GWinView = WinView; }
