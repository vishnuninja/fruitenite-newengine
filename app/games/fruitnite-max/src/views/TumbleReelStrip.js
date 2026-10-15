class TumbleReelStrip extends PIXI.Container{
    reelId;
    parentView; //ReelView...
    reelConfig = _ng.GameConfig.ReelViewUiConfig;
    reelSymbolConfig = _ng.GameConfig.reelSymbolConfig;
    symConfig = _ng.GameConfig.ReelViewUiConfig.data.symbolConfig;
    stripData;
    symbolsArray = [];
    symbolsPos = [];
    startSpinTweens = [];
    stopSpinTweens = [];
    symbolAnimations = [];
    actualSymbolHeight = 0;
    REEL_STATE = "idle"; //idle, reel_spin_started, reel_stop_started, reel_stopped
    constructor(id, parent){
        super();
        this.reelId = id;
        this.parentView = parent;
        this.stripData = _ng.GameConfig.defaultReels[this.reelId].split("");
        _mediator.subscribe("showExtraSpins",this.animateAllScatterOnReel.bind(this));
        this.createStrip();
    }

    createStrip() {
        for (var i = 0; i < this.stripData.length; i++) {
            var symb = new ReelSymbol(this.reelSymbolConfig[this.stripData[i]]);
            symb.name = this.stripData[i] + "_" + i;
            symb.symName = this.stripData[i];
            this.addChild(symb);
            this.symbolsArray.push(symb);
            symb.y = (this.symConfig.symbolHeight + this.symConfig.symbolYGap) * i;
            this.symbolsPos.push(symb.y);
        }
        this.actualSymbolHeight = this.symbolsArray[0].height;
    }

    startStripSpin(spinSpeed) {
        this.REEL_STATE = "reel_spin_started";
        this.removeMultiplierText()
        this.parentView.setReelFallStatus(false);
        var symbolFallDuration = ("quick" === spinSpeed) ?  0.1 : .25;
        var reelHeight = (this.symConfig.symbolHeight + this.symConfig.symbolYGap) * this.symbolsArray.length;
        for(let i= this.symbolsArray.length -1; i>=0; i--){
            let tween = gsap.to(this.symbolsArray[i], symbolFallDuration, { 
                y: '+=' + reelHeight, 
                delay: ("quick" === spinSpeed) ? 0 : (this.symbolsArray.length - i) * 0.02, 
                ease: Linear.easeIn, 
                onComplete: function () {
                    if(this.reelId == 3 && i == 0)
                        this.parentView.stopSpin("spinfallcompleted");
                    if(i == 0)
                       this.startSpinTweens = [];
                }.bind(this)
             });
            this.startSpinTweens.push(tween);
        }
    };

    //changing Symbol & setting reel on top...
    replaceWithNewSymbols() {
        var newReels = coreApp.gameModel.spinData.getReels();
        var newSymbols = newReels[this.reelId];
        for(let i=0; i<this.symbolsArray.length; i++){
            let symPosition = (i * (this.reelConfig.data.noOfReels)) + this.reelId;
            this.symbolsArray[i].changeSymbol(newSymbols[i], symPosition, true);
            this.symbolsArray[i].symName = newSymbols[i];
            this.symbolsArray[i].y = ((this.symConfig.symbolHeight + this.symConfig.symbolYGap) * (this.symbolsArray.length - i)) * -1; 
        }
        this.addMultiplierToSymbol(null, true);
    }

    stopStripSpin() {
        this.REEL_STATE = "reel_stop_started";
        for (let i = this.symbolsArray.length - 1; i >= 0; i--){
            let tween = gsap.to(this.symbolsArray[i], .3, { 
                y: this.symbolsPos[i] + 25, 
                ease: Linear.easeIn,
                delay: (this.symbolsArray.length - i) * 0.05,
                onComplete: function () {
                    this.reelStopEffect(i);
                    if(i == 0){
                        this.playScatterLandSound(this.reelId);
                        this.stopSpinTweens = [];
                    }
                }.bind(this)
             });
            this.stopSpinTweens.push(tween);
        }
        this.playReelStopSound();
    };

    playReelStopSound(stopType) {
        var reelStopSound = _sndLib.sprite.reelStop;
        reelStopSound.volume = 1;
        reelStopSound.delay = stopType === "forcedreelstop" ? 0 : 300;
        _sndLib.play(reelStopSound);
    }

    //stopping by space button... 
    forceStripToStop () {
        if(this.REEL_STATE === "reel_stopped")  return;
        if(this.REEL_STATE === "idle")  this.replaceWithNewSymbols();
        if(this.REEL_STATE === "reel_stop_started"){
            this.stopSpinTweens.forEach(function(tween) { tween.kill(); });
            this.stopSpinTweens = [];
        }
        if(this.REEL_STATE === "reel_spin_started"){
            this.startSpinTweens.forEach(function(tween) { tween.kill(); });
            this.startSpinTweens = [];
            this.replaceWithNewSymbols();
        }
        this.playReelStopSound("forcedreelstop");
        for (let i = this.symbolsArray.length - 1; i >= 0; i--){
            gsap.to(this.symbolsArray[i], .2, { 
                y: this.symbolsPos[i] + 25,
                ease: Linear.easeIn,
                onComplete: function () {
                    this.reelStopEffect(i);
                }.bind(this)
            });
        }
    }

    reelStopEffect(index){
        let tween = gsap.to(this.symbolsArray[index], .08, { 
            y: this.symbolsPos[index], 
            ease: Linear.easeIn,
            onComplete: function () {
                if(index == this.symbolsArray.length - 1)
                    this.REEL_STATE = "reel_stopped";
                if(this.reelId == 5 && index == 0)
                    this.parentView.allStripsFallingCompleted();
            }.bind(this)
        });
    }

   playSymbolAnimation = function(symbolId, isFirstSymbol = false, isLastSymbol = false) {
        var currentSymbol = this.symbolsArray[symbolId];
        var duration = ((_ng.isQuickSpinActive && _ng.GameConfig.FastAnim) || _ng.externalUiController.getSpaceBarHoldStatus()) ? 3 : 1.7;   
        var symbolName = currentSymbol.symName;
        var symbolAnim;
        switch (symbolName) {

            case 'a':
                symbolAnim = pixiLib.getElement("Spine", "apple_red");
                break;

            case 'b':
                symbolAnim = pixiLib.getElement("Spine", "apple_green");
                break;

            case 'c':
                symbolAnim = pixiLib.getElement("Spine", "grapes");
                break;

            case 'd':
                symbolAnim = pixiLib.getElement("Spine", "lemon");
                break;

            case 'e':
                symbolAnim = pixiLib.getElement("Spine", "kiwi");
                break;

            case 'f':
                symbolAnim = pixiLib.getElement("Spine", "banana");
                break;

            case 'g':
                symbolAnim = pixiLib.getElement("Spine", "strawberry");
                break;

            case 'h':
                symbolAnim = pixiLib.getElement("Spine", "orange");
                break;

            case 'i':
                symbolAnim = pixiLib.getElement("Spine", "watermelon");
                break;
        }
        symbolAnim.name = symbolName;
        symbolAnim.scale.set(0.48);
        symbolAnim.position.set(0, this.symbolsPos[symbolId]);
        symbolAnim.state.timeScale = duration;/* TODO: */
        this.addChild(symbolAnim);
        this.symbolAnimations.push(symbolAnim);
        if(isFirstSymbol)    this.parentView.playSymbolSoundOnce("symbolAnim");
        currentSymbol.symbol.visible = false;

        let entry = symbolAnim.state.setAnimation(0, "animation", false);
        entry.listener = {
            complete: function () {
                if(isFirstSymbol)    this.parentView.playSymbolSoundOnce("explosion");
                if(isLastSymbol)    this.parentView.onSymbolAnimationComplete();
            }.bind(this)
        };
    }

    removeSymbolAnimation () {
        this.symbolAnimations.forEach(function(animation) {
            setTimeout(() => { animation.parent.removeChild(animation) }, 10);
        });
        this.symbolAnimations = [];
    }

    removeWinSymbol(currentIndex) {
        this.symbolsArray[currentIndex].parent.removeChild(this.symbolsArray[currentIndex]);
        this.symbolsArray = this._popArrAtIndex(this.symbolsArray, currentIndex);
    }

    addTumbleSymbolsToStrip(stripArray, tumbleIndex) {
        var newReelSymbols = coreApp.gameModel.obj.current_round.misc_prizes[tumbleIndex].new_symbols.split(";")[this.reelId];
        if (newReelSymbols.includes("s"))
            _sndLib.play(_sndLib.sprite.sLand_5);
        stripArray = stripArray.reverse();
        for (var i = 0; i < stripArray.length; i++) {
            var newSymbolConfig = _ng.GameConfig.reelSymbolConfig[stripArray[i]];
            var symb = new ReelSymbol(newSymbolConfig);
            if (stripArray[i] == "m") {
                var currentPos = (((stripArray.length - 1) - i) * this.reelConfig.data.noOfReels) + this.reelId;
                symb.changeSymbol(newSymbolConfig.symbol.texture, currentPos, false);
            } else {
                symb.changeSymbol(newSymbolConfig.symbol.texture);
            }
            symb.symName = newSymbolConfig.symbol.texture;
            symb.y -= ((this.actualSymbolHeight + this.symConfig.symbolYGap) * (i + 1));
            this.addChild(symb);
            this.symbolsArray.unshift(symb);
        }
    }

    moveSymbolsDown(callback) {
        for (var i=0; i<this.symbolsPos.length; i++) {
            var stopDelay = (_ng.isQuickSpinActive && _ng.GameConfig.FastAnim) ? 0.1 : 0.5;
            TweenMax.to(this.symbolsArray[i], stopDelay, {
                ease: Elastic.easeInOut.config(1.1, 1),
                y: this.symbolsPos[i],
                onComplete: function (index) {
                    if (index == this.symbolsPos.length - 1 && this.reelId == this.reelConfig.data.noOfReels - 1)
                        callback();
                }.bind(this),
                onCompleteParams: [i]
            });
        }
    }

    addMultiplierToSymbol = function(tumbleIndex, isBeforeTumble = false){
        for (let i = 0; i < this.symbolsArray.length; i++) {
            if (this.symbolsArray[i].symName == "m") {
                if (!this.symbolsArray[i]._multiText) {

                    var currentPos = (i * (this.reelConfig.data.noOfReels)) + this.reelId;

                    var realMultiplier;

                    if (isBeforeTumble) {
                        realMultiplier = coreApp.gameModel.obj.current_round.screen_wins[currentPos];
                    }
                    else {
                        realMultiplier = coreApp.gameModel.obj.current_round.misc_prizes[tumbleIndex].screenWins[currentPos];
                    }

                    this.symbolsArray[i]._incrementArr = this.getIncrementalMultipliersValues(realMultiplier);
                    // console.log("Incrementals...", this.symbolsArray[i]._incrementArr, tumbleIndex);

                    //Creating Multiplier Text......
                    var multiTextStyle = {
                       "type": "BitmapFont",
                        "fontName": "box-Multiplier",
                        "fontSize": 14,
                        "align": "center",
                        "maxWidth": 500,
                    }
                    var multiplierText = pixiLib.getElement("Text", multiTextStyle);
                    multiplierText.anchor.set(0.5);
                    pixiLib.setText(multiplierText, this.symbolsArray[i]._incrementArr[tumbleIndex || 0] + "x");
                    multiplierText.name = "BitmapFont";
                    multiplierText.position.y = -10;
                    this.symbolsArray[i].addChild(multiplierText);
                    this.symbolsArray[i]._multiText = multiplierText;

                }
                else {
                    //Increment here...
                    if (tumbleIndex != null && this.symbolsArray[i]._multiText.text != this.symbolsArray[i]._incrementArr[tumbleIndex] + "x") {
                        this.symbolsArray[i]._multiText.text = this.symbolsArray[i]._incrementArr[tumbleIndex] + "x";
                    }
                }
            }
        }
    }

    performMultiplierAnim = function(noOfMiscPrizes){
        for (let i = 0; i < this.symbolsArray.length; i++) {
            if (this.symbolsArray[i].symName == "m" && !this.symbolsArray[i]._isSplash) {
                this.symbolsArray[i]._isSplash = true;
                var currentPos = (i * (this.reelConfig.data.noOfReels)) + this.reelId;
                var realMultiplier = coreApp.gameModel.obj.current_round.misc_prizes[noOfMiscPrizes-1].screenWins[currentPos];
                var duration = (_ng.isQuickSpinActive && _ng.GameConfig.FastAnim) ? 2 : 1;   

                this.removeMultiplierText();
                this.symbolsArray[i].symbol.alpha = 0;
                _sndLib.play(_sndLib.sprite.balloon_Multi);
                var multiplierAnim = pixiLib.getElement("Spine", "multiplayer");
                multiplierAnim.name = "multiplierAnim";
                multiplierAnim.scale.set(0.67);
                multiplierAnim.timeScale = duration;
                this.symbolsArray[i].addChild(multiplierAnim);
                var multiplierColorCode = this._getAnimationState(realMultiplier);
                let trackEntry = multiplierAnim.state.setAnimation(0,multiplierColorCode, false);

                trackEntry.listener = {
                    complete: () => {
                        setTimeout(() => {
                            multiplierAnim.parent.removeChild(multiplierAnim);
                            this.symbolsArray[i].symbol.alpha = 1;
                        }, 50);
                        this.symbolsArray[i].changeSymbol(multiplierColorCode+"_splash");
                    }
                };
            }
        }
    }

    getIncrementalMultipliersValues(realMultiplier) {
        var multiplierValueArry = _ng.superBuyEnabled
            ? [20, 25, 50, 100, 1000, 5000]
            : [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 50, 100, 1000, 5000];
        var incrementMulArry = [];
        let totalTumbleCount = coreApp.gameModel.userModel.userData.current_round.misc_prizes.count || 1;
        var realMultiplierIndex = multiplierValueArry.indexOf(realMultiplier);

        for (let index = 0; index < totalTumbleCount; index++) {
            var newIndex = Math.max(0, realMultiplierIndex - index);
            incrementMulArry.unshift(multiplierValueArry[newIndex])
        }

        return incrementMulArry;
    }
    _getAnimationState = function (multiplierValue) {
        var config;
        if (multiplierValue <= 10) {
            config = "m";
        }
        else if (10 < multiplierValue && multiplierValue <= 20) {
            config = "m1";
        }
        else if (20 < multiplierValue && multiplierValue <= 50) {
            config = "m2";
        }
        else if (50 < multiplierValue && multiplierValue <= 1000) {
            config = "m3";
        }
        else if (multiplierValue == 5000) {
            config = "m4";
        }
        return config;
    }

    removeMultiplierText = function () {
        for (let index = 0; index < this.symbolsArray.length; index++) {
            if (this.symbolsArray[index]._multiText && this.symbolsArray[index]._multiText.parent) {
                this.symbolsArray[index]._multiText.parent.removeChild(this.symbolsArray[index]._multiText);
                this.symbolsArray[index]._multiText = null;
                // this.symbolsArray[index]._animationPlayed = null;
                this.symbolsArray[index]._incrementArr = null;
                this.symbolsArray[index]._isSplash = null;

            }
        }
    }

    animateAllScatterOnReel()
    {
        for(let i=0; i< this.symbolsArray.length; i++)
        {
            if(this.symbolsArray[i].symName == "s")
            {
                var prevScale = this.symbolsArray[i].scale.x;
                gsap.to(this.symbolsArray[i].scale, 0.3,{
                    x: prevScale + .1, y: prevScale + .1, yoyo:true, repeat:2,
                    onComplete: function () {
                        gsap.to(this.symbolsArray[i].scale,0.3,{
                            x: prevScale,y: prevScale});
                    }.bind(this)    
                });
               
            }
        }
    }

    //........................................................
    _popArrAtIndex(Arr, index)
    {
        var newArr = [];
        for(var i=0;i<Arr.length; i++)
            if(i!= index)   newArr.push(Arr[i]);
        return newArr;
    }

    playScatterLandSound = function (reelId) {
          for(let i=0; i<this.symbolsArray.length; i++){
            if (this.symbolsArray[i].symName == 's') {
                _sndLib.play(_sndLib.sprite["sLand_"+reelId]);
                break;
            }
        }
    }
}