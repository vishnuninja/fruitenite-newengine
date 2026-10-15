class RoyalRewardView extends PIXI.Container{

    constructor(){
        super();
        _mediator.subscribe("playFlayingCharacter", this.playFlyingCharacter.bind(this));
    }

    createView(){

    }

    playFlyingCharacter(){
        console.log("FLYING CHARACTER: flying starts");
        this.flyingCharacter = pixiLib.getElement("Spine", "character_flying");
        this.flyingCharacter.name = "flyingCharacter";
        this.addChild(this.flyingCharacter);
        this.flayingCharPos = {
            VD: { x: _viewInfoUtil.getWindowWidth() + 70, y: 100, scale: 1 },
            VL: { x: _viewInfoUtil.getWindowWidth() + 70, y: 100, scale: 0.67 },
            VP: { x: _viewInfoUtil.getWindowHeight(), y: 0, scale: 0.6},
        }
        this.flyingCharacter.scale.set(this.flayingCharPos[_viewInfoUtil.viewType].scale);
        this.flyingCharacter.position.set(this.flayingCharPos[_viewInfoUtil.viewType].x, this.flayingCharPos[_viewInfoUtil.viewType].y);
        var duration = (_ng.isQuickSpinActive) ? 1.5 : 3;
        const state = this.flyingCharacter.state;
        const throwEntry = state.setAnimation(0, "character_throw", false);
        throwEntry.listener = {
            event: (trackEntry, event) => {
                if (event.data.name === "throw") {
                    this.createGoldCoin();
                }
            },
        };
        _sndLib.play(_sndLib.sprite.transition);
        gsap.to(this.flyingCharacter, duration, {
            x: -200,
            y: _viewInfoUtil.getWindowHeight()*.75,
            onComplete: () => {
                console.log("FLYING CHARACTER: flying completed");
                this.flyingCharacter.parent.removeChild(this.flyingCharacter);
                _mediator.publish("showGoldCoinWinAmount", coreApp.gameModel.obj.current_round.win_amount);
                _mediator.publish(_events.slot.updateBalance);
                _mediator.publish("callPostMatrixAction");
            }
        });

    }

    createGoldCoin() {
        console.log("CHARACTER fruit creating");
		this.fruitPos = {
            VD: { x: _viewInfoUtil.getWindowWidth() - 200, y: 100, scale: 0.25, finalscale: .33 },
            VL: { x: _viewInfoUtil.getWindowWidth() - 200, y: 100, scale: 0.2, finalscale: .25},
            VP: { x: _viewInfoUtil.getWindowWidth(), y: _viewInfoUtil.getWindowHeight() * .2, scale: 0.2, finalscale: .25},
		}
	    var newStripData = coreApp.gameController.model.spinData.getPostMatrix();
		var rowIndex = newStripData.findIndex(row => row.includes("z"));
		var colIndex = rowIndex !== -1 ? newStripData[rowIndex].indexOf("z") : -1;
		if(rowIndex < 0) return;
		
		var fruitSymbol =  new PIXI.Sprite(PIXI.Texture.from("pomegranate"));//pixiLib.getElement("Sprite", "pomegranate");
		fruitSymbol.scale.set(this.fruitPos[_viewInfoUtil.viewType].scale);
		fruitSymbol.name = "coin_throw_sym";
		var globalPos = new PIXI.Point(this.fruitPos[_viewInfoUtil.viewType].x, this.fruitPos[_viewInfoUtil.viewType].y);
        // coreApp.gameView.updateTransform(); 
		var startLocalPos = this.toLocal(globalPos);
		fruitSymbol.anchor.set(0.5);
		fruitSymbol.position.set(startLocalPos.x, startLocalPos.y);
		// fruitSymbol.position.set(400,400);
        //TODO: Try with removed settimeout...
		setTimeout(() => { 
            this.addChild(fruitSymbol);
        }, 10);

		var symbolWorldPos = coreApp.gameView.reelView.reels[rowIndex].toGlobal(new PIXI.Point(0, coreApp.gameView.reelView.reels[rowIndex].symbolsPos[colIndex]));
	    var localPos = this.toLocal(symbolWorldPos);
		var speed = (_ng.isQuickSpinActive) ? 2000 : 1000;
		var time, displacement, dx, dy;// currentX = 846, currentY = 216;
		dx = (startLocalPos.x - localPos.x);
		dy = (startLocalPos.y - localPos.y);
		displacement = Math.sqrt((dx*dx)+(dy*dy));
		time = displacement/speed;

		_sndLib.play(_sndLib.sprite.Coin_Shoot);
		gsap.to(fruitSymbol.scale, time, {
			x: this.fruitPos[_viewInfoUtil.viewType].finalscale,
			y: this.fruitPos[_viewInfoUtil.viewType].finalscale
        });
		gsap.to(fruitSymbol, time, {
			x: localPos.x,
			y: localPos.y,
			onComplete: () => {
                console.log("FLYING CHARACTER: Removing fruit symbol");
				fruitSymbol.parent.removeChild(fruitSymbol);
				this.playSymbolFlipping();
			}
		});
    }

    playSymbolFlipping() {
        var newStripData = coreApp.gameController.model.spinData.getPostMatrix();
        var rowIndex = newStripData.findIndex(row => row.includes("z"));
        var colIndex = rowIndex !== -1 ? newStripData[rowIndex].indexOf("z") : -1;
        var multiplierValue = coreApp.gameModel.obj.current_round.post_matrix_info.gold_multiplier;
        coreApp.gameView.reelView.reels[rowIndex].symbolsArray[colIndex].changeSymbol("z" + multiplierValue);
        this.showGoldCoinAwarded();
    }

    showGoldCoinAwarded() {
        var gambleConfig = _ng.GameConfig.infoPopupView.goldWinPopup;

        this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
        this.grayBg.name = "graybg";
        this.grayBg.alpha = 0.4;
        this.grayBg.interactive = true;
        this.addChildAt(this.grayBg, 0);
        
        var rewardAnim = { VD: { scale: 0.8 }, VL: { scale: 0.5}, VP: { scale: 0.4}};
        this.goldRewardAnim = pixiLib.getElement("Spine", "gold_win");
        this.addChild(this.goldRewardAnim);
        this.goldRewardAnim.position.set(_viewInfoUtil.getWindowWidth()/2, _viewInfoUtil.getWindowHeight()/2);
        this.goldRewardAnim.scale.set(rewardAnim[_viewInfoUtil.viewType].scale);
        this.goldRewardAnim.state.setAnimation(0, "gold_win", false);
        const state = this.goldRewardAnim.state;
        state.addListener({
            complete: (trackEntry) => {
                if (trackEntry.animation.name === "gold_win") {
                    setTimeout(() => {
                        this.goldRewardAnim.parent.removeChild(this.goldRewardAnim);
                        this.grayBg.parent.removeChild(this.grayBg);
                    }, 50);
                }
            }
        });

        var multiplierWinValue = coreApp.gameModel.obj.current_round.post_matrix_info.gold_multiplier;
        this.multiplierValue = pixiLib.getElement("Text", gambleConfig.multiplierText.textStyle);
        pixiLib.setText(this.multiplierValue, multiplierWinValue+"x");
        pixiLib.setProperties(this.multiplierValue, gambleConfig.multiplierText.props);
        pixiLib.attachToSlot(this.goldRewardAnim, "emptyslot", this.multiplierValue);
        // setTimeout(function () {
        //     //Adding timeout so popup will be shown fully then enable spacebar
        //     _mediator.publish("setSpaceBarEvent", "hideInfoPopup");
        // }, 500);
        _sndLib.play(_sndLib.sprite.goldReward);
    }
}