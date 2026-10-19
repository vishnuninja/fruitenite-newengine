class BuyPanelView extends PIXI.Container {

    constructor() {
        super();
        this.HistoryArray = [];
        this.count = 0;
        this.stripNum = 0;
        _mediator.subscribe(_events.core.onResize, this.onResize.bind(this));
    }

    createView() {
        this.HistoryArray = [];
        this.count = 0;
        this.stripNum = 0;
        this.addEventListeners();
        this.createBuyButton();
        this.createSuperBuyButton();
        this.createTwoXButton();
        this.createHistoryBox();
        this.onResize();
    }

    addEventListeners() {
        _mediator.subscribe("UpdateBet", this.updateBuyPanelValues.bind(this));
        _mediator.subscribe("enableBuyFeature", this.enableBuyFeature.bind(this));
        _mediator.subscribe("disableBuyFeature", this.disableBuyFeature.bind(this));
        _mediator.subscribe("checkBalanceForBuyFeature", this.checkBalanceForBuyFeature.bind(this));
        _mediator.subscribe("hideAndShowBuyControlls", this.showBuyPanelElements.bind(this));
        _mediator.subscribe("AddHistBox", this.AddHistBox.bind(this));
        _mediator.subscribe("removeHistBox", this.removeHistBox.bind(this));
        _mediator.subscribe("setRemainingFSpins", this.setRemainingFSpins.bind(this));
        _mediator.subscribe("_hideAndShowOfTwoXButton", this._hideAndShowOfTwoXButton.bind(this));
    }

    createBuyButton() {
        var buyBtnId = "buy_feature";
        if (typeof PIXI !== "undefined" && PIXI.utils && PIXI.utils.TextureCache) {
            if (!PIXI.utils.TextureCache["buy_feature_normal"] && PIXI.utils.TextureCache["buy_feature_btn_normal"]) {
                buyBtnId = "buy_feature_btn";
            }
        }
        this.buyButton = pixiLib.getButton(buyBtnId);
        this.buyButton.name = "buyButton";
        this.buyButton.anchor.set(0.5);
        this.addChild(this.buyButton);

        this.buyButton.hitArea = new PIXI.Rectangle(-150, -74, 300, 148);

        // Fruit basket is on the left half (-150 to -20); text area is centered on the right half at x ≈ 35
        var textCenterX = 35;

        var freespinText = pixiLib.getElement("Text", this.getTextStyle("buyTextStyle"));
        freespinText.position.set(textCenterX, -34);
        freespinText.anchor.set(0.5);
        this.buyButton.addChild(freespinText);
        pixiLib.setText(freespinText, (typeof gameLiterals !== "undefined" && gameLiterals.buyText) ? gameLiterals.buyText : "BUY");

        var freespinText1 = pixiLib.getElement("Text", this.getTextStyle("buyTextStyle"));
        freespinText1.position.set(textCenterX, -10);
        freespinText1.anchor.set(0.5);
        this.buyButton.addChild(freespinText1);
        pixiLib.setText(freespinText1, (typeof gameLiterals !== "undefined" && gameLiterals.freeSpinText) ? gameLiterals.freeSpinText : "FREE SPINS");

        this.buyFreeSpinAmount = pixiLib.getElement("Text", this.getTextStyle("buyAmountStyle"));
        this.buyFreeSpinAmount.anchor.set(0.5);
        this.buyFreeSpinAmount.name = "buyFreeSpinAmount";
        this.buyButton.addChild(this.buyFreeSpinAmount);
        this.buyFreeSpinAmount.position.set(textCenterX, 18);

        pixiLib.addEvent(this.buyButton, this.onButtonClik.bind(this, "buy"));

        if (coreApp.gameModel && coreApp.gameModel.obj && coreApp.gameModel.obj.previous_round && coreApp.gameModel.obj.previous_round.coin_value) {
            pixiLib.setText(this.buyFreeSpinAmount, pixiLib.getFormattedAmount(coreApp.gameModel.obj.previous_round.coin_value * coreApp.gameModel.spinData.buyfg));
        } else if (coreApp.gameModel && coreApp.gameModel.panelModel && coreApp.gameModel.spinData) {
            pixiLib.setText(this.buyFreeSpinAmount, pixiLib.getFormattedAmount(coreApp.gameModel.panelModel.selectedCoinValue * coreApp.gameModel.spinData.buyfg));
        }
    }

    createSuperBuyButton() {
        this.superBuyButton = pixiLib.getButton("superFreeSpins");
        this.superBuyButton.name = "superBuyButton";
        this.superBuyButton.anchor.set(0.5);
        this.addChild(this.superBuyButton);

        this.superBuyButton.hitArea = new PIXI.Rectangle(-150, -74, 300, 148);

        // Gift box is on the left half (-150 to -20); text area is centered on the right half at x ≈ 35
        var textCenterX = 35;

        var superBuyText = pixiLib.getElement("Text", this.getTextStyle("superBuyTextStyle"));
        superBuyText.position.set(textCenterX, -42);
        superBuyText.anchor.set(0.5);
        this.superBuyButton.addChild(superBuyText);
        pixiLib.setText(superBuyText, (typeof gameLiterals !== "undefined" && gameLiterals.buyText) ? gameLiterals.buyText : "BUY");

        var superWordText = pixiLib.getElement("Text", this.getTextStyle("superBuyWordStyle"));
        superWordText.position.set(textCenterX, -22);
        superWordText.anchor.set(0.5);
        this.superBuyButton.addChild(superWordText);
        pixiLib.setText(superWordText, (typeof gameLiterals !== "undefined" && gameLiterals.superText) ? gameLiterals.superText : "SUPER");

        var superFsText = pixiLib.getElement("Text", this.getTextStyle("superBuyTextStyle"));
        superFsText.position.set(textCenterX, 0);
        superFsText.anchor.set(0.5);
        this.superBuyButton.addChild(superFsText);
        pixiLib.setText(superFsText, (typeof gameLiterals !== "undefined" && gameLiterals.freeSpinText) ? gameLiterals.freeSpinText : "FREE SPINS");

        this.superSpinAmt = pixiLib.getElement("Text", this.getTextStyle("superBuyAmountStyle"));
        this.superSpinAmt.anchor.set(0.5);
        this.superSpinAmt.name = "superSpinAmt";
        this.superBuyButton.addChild(this.superSpinAmt);
        this.superSpinAmt.position.set(textCenterX, 26);

        pixiLib.addEvent(this.superBuyButton, this.onButtonClik.bind(this, "super"));

        if (coreApp.gameModel && coreApp.gameModel.obj && coreApp.gameModel.obj.previous_round && coreApp.gameModel.obj.previous_round.coin_value) {
            pixiLib.setText(this.superSpinAmt, pixiLib.getFormattedAmount(coreApp.gameModel.obj.previous_round.coin_value * coreApp.gameModel.spinData.superBuyfg));
        } else if (coreApp.gameModel && coreApp.gameModel.panelModel && coreApp.gameModel.spinData) {
            pixiLib.setText(this.superSpinAmt, pixiLib.getFormattedAmount(coreApp.gameModel.panelModel.selectedCoinValue * coreApp.gameModel.spinData.superBuyfg));
        }
    }

    onButtonClik(key) {
        _ng.buyFeaturePopupStatus = true;
        switch (key) {
            case "buy":
                this.disableBuyFeature();
                if (_ng.externalUiController && _ng.externalUiController.setPanelForBuyFreeSpin) {
                    _ng.externalUiController.setPanelForBuyFreeSpin();
                }
                if (coreApp.gameView && coreApp.gameView.infoPopup && coreApp.gameView.infoPopup.buyFreeSpinPopup) {
                    coreApp.gameView.infoPopup.buyFreeSpinPopup();
                }
                break;
            case "super":
                this.disableBuyFeature();
                if (_ng.externalUiController && _ng.externalUiController.setPanelForBuyFreeSpin) {
                    _ng.externalUiController.setPanelForBuyFreeSpin();
                }
                if (coreApp.gameView && coreApp.gameView.infoPopup && coreApp.gameView.infoPopup.buyFreeSuperSpinPopup) {
                    coreApp.gameView.infoPopup.buyFreeSuperSpinPopup();
                }
                break;
            case "twoX":
                this.onTwoxButtonClick();
                break;
            default:
                break;
        }
    }

    updateToggleState() {
        var isEnabled = !!_ng.twoXBetEnabled;
        if (this.twoxoff) {
            this.twoxoff.visible = !isEnabled;
        }
        if (this.twoxOn) {
            this.twoxOn.visible = isEnabled;
        }
    }

    onTwoxButtonClick() {
        if (coreApp.gameController && !coreApp.gameController.allReelsStopped) {
            return;
        }
        if (_sndLib && _sndLib.sprite && _sndLib.sprite.btnClick) {
            _sndLib.play(_sndLib.sprite.btnClick);
        }
        if (_ng.twoXBetEnabled == false) {
            _ng.twoXBetEnabled = true;
            this.updateToggleState();
            this.disableBuyFeature();
            _mediator.publish("updateTwoxbet");
        } else {
            _ng.twoXBetEnabled = false;
            this.updateToggleState();
            _mediator.publish("updateTotalBet");
            this.enableBuyFeature();
            _mediator.publish("checkBalanceForBuyFeature");
        }
    }

    createTwoXButton() {
        this.twoXBetButton = pixiLib.getButton("2xBase");
        this.twoXBetButton.name = "2XBet";
        this.twoXBetButton.anchor.set(0.5);
        this.addChild(this.twoXBetButton);

        this.twoXBetButton.hitArea = new PIXI.Rectangle(-150, -107, 300, 215);

        // "BET" label
        var text1 = pixiLib.getElement("Text", this.getTextStyle("2xStyle"));
        text1.anchor.set(0.5);
        pixiLib.setText(text1, (typeof gameLiterals !== "undefined" && gameLiterals.betText) ? gameLiterals.betText : "BET");
        this.twoXBetButton.addChild(text1);
        text1.position.set(0, -76);

        // Amount inside dark pill cutout
        this.twoxbetamt = pixiLib.getElement("Text", this.getTextStyle("2xAmount"));
        this.twoxbetamt.name = "amount";
        this.twoxbetamt.position.set(0, -46);
        this.twoxbetamt.anchor.set(0.5);
        pixiLib.setText(this.twoxbetamt, "$2.8");
        this.twoXBetButton.addChild(this.twoxbetamt);

        // "DOUBLE CHANCE"
        var text2 = pixiLib.getElement("Text", this.getTextStyle("doubleChance"));
        text2.anchor.set(0.5);
        pixiLib.setText(text2, (typeof gameLiterals !== "undefined" && gameLiterals.doubleText) ? gameLiterals.doubleText : "DOUBLE CHANCE");
        text2.name = "doubleChance";
        this.twoXBetButton.addChild(text2);
        text2.position.set(0, -2);

        // "TO WIN FEATURE"
        var text3 = pixiLib.getElement("Text", this.getTextStyle("doubleChance"));
        text3.anchor.set(0.5);
        text3.name = "to_win_feature";
        pixiLib.setText(text3, (typeof gameLiterals !== "undefined" && gameLiterals.winFeature) ? gameLiterals.winFeature : "TO WIN FEATURE");
        this.twoXBetButton.addChild(text3);
        text3.position.set(0, 18);

        // ON/OFF toggle switch using native leftPanelAssets sprites
        this.twoxOn = pixiLib.getElement("Sprite", "on_btn_normal");
        this.twoxOn.anchor.set(0.5);
        this.twoxOn.position.set(0, 65);
        this.twoxOn.scale.set(0.75);
        this.twoXBetButton.addChild(this.twoxOn);

        this.twoxoff = pixiLib.getElement("Sprite", "off_btn_normal");
        this.twoxoff.anchor.set(0.5);
        this.twoxoff.position.set(0, 65);
        this.twoxoff.scale.set(0.75);
        this.twoXBetButton.addChild(this.twoxoff);

        this.updateToggleState();

        pixiLib.addEvent(this.twoXBetButton, this.onButtonClik.bind(this, "twoX"));

        if (coreApp.gameModel && coreApp.gameModel.obj && coreApp.gameModel.obj.previous_round && coreApp.gameModel.obj.previous_round.coin_value) {
            pixiLib.setText(this.twoxbetamt, pixiLib.getFormattedAmount(coreApp.gameModel.obj.previous_round.coin_value * coreApp.gameModel.spinData.antebet));
        } else if (coreApp.gameModel && coreApp.gameModel.panelModel && coreApp.gameModel.spinData) {
            pixiLib.setText(this.twoxbetamt, pixiLib.getFormattedAmount(coreApp.gameModel.panelModel.selectedCoinValue * coreApp.gameModel.spinData.antebet));
        }
    }

    createHistoryBox() {
        this.historyContainer = pixiLib.getContainer();
        this.historyContainer.name = "historyContainer";
        this.addChild(this.historyContainer);

        this.historyBase = pixiLib.getElement("Spine", "liquid_jar_Final");
        if (!this.historyBase) {
            this.historyBase = pixiLib.getContainer();
        }
        this.historyBase.name = "historyBaseAnim";
        if (this.historyBase.state) {
            this.historyBase.state.setAnimation(0, "Idle", true);
        }
        this.historyContainer.addChild(this.historyBase);

        // UP ARROW
        this.upArrow = pixiLib.getButton("upArrow");
        this.upArrow.anchor.set(0.5);
        this.upArrow.name = "UpArrow";
        this.upArrow.position.set(0, -115);
        this.historyBase.addChild(this.upArrow);
        pixiLib.setInteraction(this.upArrow, false);

        pixiLib.addEvent(this.upArrow, function () {
            pixiLib.setInteraction(this.upArrow, false);
            var itemH = (this.tumbleHistBox && this.tumbleHistBox.height) ? this.tumbleHistBox.height : 50;
            TweenMax.to(this.historyboxContainer, 0.5, {
                y: this.historyboxContainer.y - itemH,
                ease: Power1.easeOut,
                onComplete: function () {
                    if (this.historyboxContainer.y < 21) {
                        pixiLib.setInteraction(this.upArrow, false);
                        pixiLib.setInteraction(this.downArrow, true);
                        return;
                    }
                    pixiLib.setInteraction(this.upArrow, true);
                    pixiLib.setInteraction(this.downArrow, true);
                }.bind(this)
            });
        }.bind(this));

        // DOWN ARROW
        this.downArrow = pixiLib.getButton("downArrow");
        this.downArrow.anchor.set(0.5);
        this.downArrow.name = "DownArrow";
        this.downArrow.position.set(0, 162);
        this.historyBase.addChild(this.downArrow);
        pixiLib.setInteraction(this.downArrow, false);

        pixiLib.addEvent(this.downArrow, function () {
            pixiLib.setInteraction(this.downArrow, false);
            var itemH = (this.tumbleHistBox && this.tumbleHistBox.height) ? this.tumbleHistBox.height : 50;
            TweenMax.to(this.historyboxContainer, 0.5, {
                y: this.historyboxContainer.y + itemH,
                ease: Power1.easeOut,
                onComplete: function () {
                    var limitH = this.historyboxContainer.height - itemH * 6;
                    if (this.historyboxContainer.y > limitH) {
                        pixiLib.setInteraction(this.downArrow, false);
                        pixiLib.setInteraction(this.upArrow, true);
                        return;
                    }
                    pixiLib.setInteraction(this.upArrow, true);
                    pixiLib.setInteraction(this.downArrow, true);
                }.bind(this)
            });
        }.bind(this));

        this.historyboxContainer = pixiLib.getContainer();
        this.historyBase.addChild(this.historyboxContainer);
        this.historyboxContainer.name = "historyboxContainer";

        // Free spins remaining indicator on jar
        var txtStyle = {
            align: "center",
            fill: "#ffe226",
            fontFamily: "TTMastersDEMOBlack",
            fontSize: 24,
            lineJoin: "round",
            stroke: "#ff218c",
            strokeThickness: 4,
            dropShadow: true,
            dropShadowDistance: 6,
            dropShadowAngle: Math.PI / 2,
            dropShadowBlur: 0,
            maxWidth: 270,
        };
        this.FSpinsLefttxt = pixiLib.getElement("Text", txtStyle);
        this.FSpinsLefttxt.name = "FSpinsLefttxt";
        this.FSpinsLefttxt.anchor.set(0.5);
        pixiLib.setText(this.FSpinsLefttxt, (typeof gameLiterals !== "undefined" && gameLiterals.freeSpinTxt) ? gameLiterals.freeSpinTxt : "FREE SPINS \n LEFT");
        this.historyBase.addChild(this.FSpinsLefttxt);
        this.FSpinsLefttxt.position.set(6, -268);
        this.FSpinsLefttxt.visible = false;

        var fsLeftStyle = {
            type: "BitmapFont",
            fontName: "box-Multiplier",
            fontSize: 34,
            align: "center",
        };
        this.fsleftNum = pixiLib.getElement("Text", fsLeftStyle);
        this.fsleftNum.name = "fsleftNum";
        this.historyBase.addChild(this.fsleftNum);
        pixiLib.setText(this.fsleftNum, "");
        this.fsleftNum.anchor.set(0.5);
        this.fsleftNum.position.set(0, -208);
        this.fsleftNum.visible = false;

        // Mask for the tumble history strips inside the jar
        this.historyMask = pixiLib.getRectangleSprite(280, 240, 0x00ffff);
        this.historyBase.addChild(this.historyMask);
        this.historyMask.position.set(-140, -100);
        this.historyMask.name = "historyMask";
        this.historyMask.scale.set(1, 0.9);
        this.historyboxContainer.mask = this.historyMask;
    }

    setRemainingFSpins(count) {
        if (this.fsleftNum) {
            pixiLib.setText(this.fsleftNum, count);
        }
    }

    AddHistBox(num, win, symbolpop, historySym) {
        if (!coreApp.gameModel || !coreApp.gameModel.obj || !coreApp.gameModel.obj.current_round || !coreApp.gameModel.obj.current_round.misc_prizes || !coreApp.gameModel.obj.current_round.misc_prizes[num]) {
            return;
        }
        var limit = coreApp.gameModel.obj.current_round.misc_prizes[num].old_reel_symbol.length;
        var sym = coreApp.gameModel.obj.current_round.misc_prizes[num].old_reel_symbol;
        for (var j = 0; j < limit; j++) {
            this.count += 1;
            this.tumbleHistBox = pixiLib.getElement("Sprite", "history_strip");
            this.tumbleHistBox.name = "tumbleHistBox";
            this.historyboxContainer.addChild(this.tumbleHistBox);
            this.tumbleHistBox.anchor.set(0.5);
            this.tumbleHistBox.scale.set(0.9);
            this.tumbleHistBox.y = -500;
            this.HistoryArray.push(this.tumbleHistBox);

            var stripStyle = {
                dropShadow: true,
                dropShadowAlpha: 0.2,
                dropShadowColor: "#702323",
                dropShadowDistance: 0,
                fill: "#fcfcfc",
                fontFamily: "TTMastersDEMOBlack",
                fontSize: 26,
                fontWeight: "bold",
                lineJoin: "bevel",
                miterLimit: 4,
                stroke: "#d63d3d",
                strokeThickness: 5,
                maxWidth: 140,
            };

            this.noOfSympop = pixiLib.getElement("Text", stripStyle);
            this.noOfSympop.anchor.set(0.5);
            this.noOfSympop.position.set(-112, -5);
            this.tumbleHistBox.addChild(this.noOfSympop);
            pixiLib.setText(this.noOfSympop, symbolpop[this.count - 1]);

            this.symboltexture = pixiLib.getElement("Sprite", historySym[this.count - 1]);
            this.symboltexture.scale.set(0.2);
            this.symboltexture.anchor.set(0.5);
            this.symboltexture.position.set(-70, -5);
            this.tumbleHistBox.addChild(this.symboltexture);

            this.wingot = pixiLib.getElement("Text", stripStyle);
            this.wingot.anchor.set(1, 0.5);
            this.wingot.position.set(118, -2);
            this.tumbleHistBox.addChild(this.wingot);
            pixiLib.setText(this.wingot, pixiLib.getFormattedAmount(win[this.count - 1]));

            this.tweenHistBox(this.count - 1);
            this.stripNum += 1;

            if (this.count > 4) {
                this.removeAfter5();
                this.scrollHistoryBox();
            }
        }
    }

    scrollHistoryBox() {
        if (this.upArrow) pixiLib.setInteraction(this.upArrow, true);
    }

    removeHistBox() {
        if (this.historyboxContainer) {
            this.historyboxContainer.y = 0;
        }
        for (var i = 0; i < this.HistoryArray.length; i++) {
            this.tweenRemove(i);
        }
        this.HistoryArray = [];
        this.flag = 0;
        this.count = 0;
        this.stripNum = 0;
        if (this.upArrow) pixiLib.setInteraction(this.upArrow, false);
        if (this.downArrow) pixiLib.setInteraction(this.downArrow, false);
    }

    tweenRemove(i) {
        var fallDelay = (_ng && _ng.isQuickSpinActive && _ng.GameConfig && _ng.GameConfig.FastAnim) ? 0 : 0.1;
        var box = this.HistoryArray[i];
        if (!box) return;
        TweenMax.to(box, i * fallDelay, {
            y: 1000,
            ease: Power1.easeOut,
            onComplete: function () {
                if (this.historyboxContainer && box && box.parent === this.historyboxContainer) {
                    this.historyboxContainer.removeChild(box);
                } else if (box && box.parent) {
                    box.parent.removeChild(box);
                }
            }.bind(this)
        });
    }

    tweenHistBox(num) {
        var fallDelay = (_ng && _ng.isQuickSpinActive && _ng.GameConfig && _ng.GameConfig.FastAnim) ? 0.1 : 0.5;
        var boxH = (this.tumbleHistBox && this.tumbleHistBox.height) ? this.tumbleHistBox.height : 50;
        TweenMax.to(this.tumbleHistBox, fallDelay, {
            y: 100 - (boxH * num),
            ease: Sine.easeInOut,
        });
        if (typeof _sndLib !== "undefined" && _sndLib && _sndLib.sprite && _sndLib.sprite.Outro) {
            _sndLib.play(_sndLib.sprite.Outro);
        }
    }

    removeAfter5() {
        var boxH = (this.tumbleHistBox && this.tumbleHistBox.height) ? this.tumbleHistBox.height : 50;
        TweenMax.to(this.historyboxContainer, 0.5, {
            y: this.historyboxContainer.y + boxH,
            ease: Elastic.easeInOut.config(1.1, 1),
        });
    }

    playJarOpenClose(actionState, finalState) {
        if (this.historyBase && this.historyBase.state) {
            const state = this.historyBase.state;
            state.setAnimation(0, actionState, false);
            state.addListener({
                complete: (trackEntry) => {
                    if (trackEntry && trackEntry.animation && trackEntry.animation.name === actionState) {
                        state.setAnimation(0, finalState, true);
                    }
                }
            });
        }
    }

    _hideAndShowOfTwoXButton(bool) {
        const isInHistoryMode = (typeof isHistoryMode !== "undefined") ? isHistoryMode : false;
        const currentAction = bool;
        if (isInHistoryMode) {
            bool = false;
        }

        if (this.twoXBetButton) {
            this.twoXBetButton.visible = bool;
        }

        if (!bool) {
            if (isInHistoryMode && currentAction) {
                this.playJarOpenClose("Idle", "Idle");
                if (this.FSpinsLefttxt) this.FSpinsLefttxt.visible = false;
                if (this.fsleftNum) this.fsleftNum.visible = false;
            } else {
                this.playJarOpenClose("Opening", "Idle2");
                if (this.FSpinsLefttxt) this.FSpinsLefttxt.visible = true;
                if (this.fsleftNum) this.fsleftNum.visible = true;
            }
        } else {
            this.playJarOpenClose("Closing", "Idle");
            if (this.FSpinsLefttxt) this.FSpinsLefttxt.visible = false;
            if (this.fsleftNum) this.fsleftNum.visible = false;
            _mediator.publish("setRemainingFSpins", "");
        }
    }

    updateBuyPanelValues(amount) {
        _mediator.publish("updateFreeSpinCost", amount);
        _mediator.publish("updateSuperSpinCost", amount);
        if (coreApp.gameModel && coreApp.gameModel.spinData) {
            if (this.buyFreeSpinAmount && coreApp.gameModel.spinData.buyfg) {
                pixiLib.setText(this.buyFreeSpinAmount, pixiLib.getFormattedAmount(amount * coreApp.gameModel.spinData.buyfg));
            }
            if (this.superSpinAmt && coreApp.gameModel.spinData.superBuyfg) {
                pixiLib.setText(this.superSpinAmt, pixiLib.getFormattedAmount(amount * coreApp.gameModel.spinData.superBuyfg));
            }
            if (this.twoxbetamt && coreApp.gameModel.spinData.antebet) {
                pixiLib.setText(this.twoxbetamt, pixiLib.getFormattedAmount(amount * coreApp.gameModel.spinData.antebet));
            }
        }
        _mediator.publish("ChangeWinValues", amount);
    }

    disableBuyFeature() {
        const isInHistoryMode = (typeof isHistoryMode !== "undefined") ? isHistoryMode : false;
        if (this.buyButton) {
            pixiLib.setInteraction(this.buyButton, false);
            this.buyButton.alpha = 0.6;
        }
        if (this.superBuyButton) {
            pixiLib.setInteraction(this.superBuyButton, false);
            this.superBuyButton.alpha = 0.6;
        }
        if (this.twoXBetButton) {
            pixiLib.setInteraction(this.twoXBetButton, _ng.twoXBetEnabled);
        }
    }

    enableBuyFeature() {
        const isInHistoryMode = (typeof isHistoryMode !== "undefined") ? isHistoryMode : false;

        if (isInHistoryMode) {
            if (this.buyButton) {
                this.buyButton.visible = false;
                pixiLib.setInteraction(this.buyButton, false);
            }
            if (this.superBuyButton) {
                this.superBuyButton.visible = false;
                pixiLib.setInteraction(this.superBuyButton, false);
            }
            if (this.twoXBetButton) {
                this.twoXBetButton.visible = false;
                pixiLib.setInteraction(this.twoXBetButton, false);
            }
            return;
        }

        this.updateToggleState();

        if (coreApp.gameModel && coreApp.gameModel.isAutoSpinActive && coreApp.gameModel.isAutoSpinActive()) {
            if (_ng.twoXBetEnabled == true) {
                if (this.buyButton) {
                    pixiLib.setInteraction(this.buyButton, false);
                    this.buyButton.alpha = 0.6;
                }
                if (this.superBuyButton) {
                    pixiLib.setInteraction(this.superBuyButton, false);
                    this.superBuyButton.alpha = 0.6;
                }
                _mediator.publish("enabledPanelFs");
            } else {
                if (this.buyButton) {
                    pixiLib.setInteraction(this.buyButton, false);
                    this.buyButton.alpha = 0.6;
                }
                if (this.superBuyButton) {
                    pixiLib.setInteraction(this.superBuyButton, false);
                    this.superBuyButton.alpha = 0.6;
                }
                if (this.twoXBetButton) {
                    pixiLib.setInteraction(this.twoXBetButton, false);
                }
                _mediator.publish("enabledPanelFs");
            }
        } else if (_ng.twoXBetEnabled == true) {
            if (this.buyButton) {
                pixiLib.setInteraction(this.buyButton, false);
                this.buyButton.alpha = 0.6;
            }
            if (this.superBuyButton) {
                pixiLib.setInteraction(this.superBuyButton, false);
                this.superBuyButton.alpha = 0.6;
            }
            if (this.twoXBetButton) {
                pixiLib.setInteraction(this.twoXBetButton, true);
            }
            _mediator.publish("enabledPanelFs");
        } else if (coreApp.gameModel && coreApp.gameModel.isFreeSpinActive && coreApp.gameModel.isFreeSpinActive()) {
            _mediator.publish("disableBuyFeature");
        } else {
            if (this.buyButton) {
                this.buyButton.visible = true;
                this.buyButton.alpha = 1;
                pixiLib.setInteraction(this.buyButton, true);
            }
            if (this.superBuyButton) {
                this.superBuyButton.visible = true;
                this.superBuyButton.alpha = 1;
                pixiLib.setInteraction(this.superBuyButton, true);
            }
            if (this.twoXBetButton) {
                this.twoXBetButton.visible = true;
                pixiLib.setInteraction(this.twoXBetButton, true);
            }
            _mediator.publish("enabledPanelFs");
        }
    }

    checkBalanceForBuyFeature() {
        const isInHistoryMode = (typeof isHistoryMode !== "undefined") ? isHistoryMode : false;

        if (isInHistoryMode) {
            if (this.buyButton) {
                this.buyButton.visible = false;
                pixiLib.setInteraction(this.buyButton, false);
            }
            if (this.superBuyButton) {
                this.superBuyButton.visible = false;
                pixiLib.setInteraction(this.superBuyButton, false);
            }
            if (this.twoXBetButton) {
                this.twoXBetButton.visible = false;
                pixiLib.setInteraction(this.twoXBetButton, false);
            }
            return;
        }

        if (coreApp.gameController && !coreApp.gameController.allReelsStopped) return;
        if (coreApp.gameModel && coreApp.gameModel.isFreeSpinActive && coreApp.gameModel.isFreeSpinActive()) return;
        if (coreApp.gameModel && coreApp.gameModel.isAutoSpinActive && coreApp.gameModel.isAutoSpinActive()) return;
        if (coreApp.gameModel && coreApp.gameModel.getIsPFSActive && coreApp.gameModel.getIsPFSActive()) return;

        var userBalance = (coreApp.gameModel && coreApp.gameModel.userModel) ? coreApp.gameModel.userModel.balance : 0;
        var selectedCoin = (coreApp.gameModel && coreApp.gameModel.panelModel) ? coreApp.gameModel.panelModel.selectedCoinValue : 0;
        var spinData = (coreApp.gameModel && coreApp.gameModel.spinData) ? coreApp.gameModel.spinData : { buyfg: 100, superBuyfg: 500, antebet: 1.25 };

        var buyFsAmount = selectedCoin * spinData.buyfg;
        var buySuperFsAmount = selectedCoin * (spinData.superBuyfg || 500);
        var anteBetAmount = selectedCoin * spinData.antebet;

        const canBuyFs = buyFsAmount <= userBalance;
        if (this.buyButton) {
            pixiLib.setInteraction(this.buyButton, canBuyFs && !_ng.twoXBetEnabled);
            this.buyButton.alpha = (canBuyFs && !_ng.twoXBetEnabled) ? 1 : 0.6;
        }

        const canBuySuperFs = buySuperFsAmount <= userBalance;
        if (this.superBuyButton) {
            pixiLib.setInteraction(this.superBuyButton, canBuySuperFs && !_ng.twoXBetEnabled);
            this.superBuyButton.alpha = (canBuySuperFs && !_ng.twoXBetEnabled) ? 1 : 0.6;
        }

        const canUseAnteBet = anteBetAmount <= userBalance;
        if (this.twoXBetButton) {
            pixiLib.setInteraction(this.twoXBetButton, canUseAnteBet && !_ng.BuyFSenabled);
        }
    }

    showBuyPanelElements(bool) {
        _mediator.publish("toogleTotalMultiplierBox", !bool);
        if (this.buyButton) this.buyButton.visible = bool;
        if (this.superBuyButton) this.superBuyButton.visible = bool;
        if (this.twoXBetButton) this.twoXBetButton.visible = bool;
    }

    onResize() {
        this.scale.set(1);
        this.position.set(0, 0);

        const parentX = (this.parent && typeof this.parent.x === "number")
            ? this.parent.x
            : (_viewInfoUtil.viewType === "VP" ? -312.5 : 0);
        const parentY = (this.parent && typeof this.parent.y === "number")
            ? this.parent.y
            : (_viewInfoUtil.viewType === "VP" ? 76.5 : (_viewInfoUtil.viewType === "VL" ? 18 : -3.5));

        if (_viewInfoUtil.viewType === "VD") {
            // Desktop: 4 items in left column matching original layout
            // buyButton -> superBuyButton -> twoXBetButton -> liquid jar barrel
            if (this.buyButton) {
                this.buyButton.position.set(125 - parentX, 95 - parentY);
                this.buyButton.scale.set(0.68);
            }
            if (this.superBuyButton) {
                this.superBuyButton.position.set(125 - parentX, 208 - parentY);
                this.superBuyButton.scale.set(0.68);
            }
            if (this.twoXBetButton) {
                this.twoXBetButton.position.set(125 - parentX, 345 - parentY);
                this.twoXBetButton.scale.set(0.68);
            }
            if (this.historyContainer) {
                this.historyContainer.position.set(125 - parentX, 560 - parentY);
                this.historyContainer.scale.set(0.7, 0.67);
            }
        } else if (_viewInfoUtil.viewType === "VL") {
            // Mobile Landscape
            if (this.buyButton) {
                this.buyButton.position.set(125 - parentX, 95 - parentY);
                this.buyButton.scale.set(0.65);
            }
            if (this.superBuyButton) {
                this.superBuyButton.position.set(125 - parentX, 205 - parentY);
                this.superBuyButton.scale.set(0.65);
            }
            if (this.twoXBetButton) {
                this.twoXBetButton.position.set(125 - parentX, 340 - parentY);
                this.twoXBetButton.scale.set(0.65);
            }
            if (this.historyContainer) {
                this.historyContainer.position.set(125 - parentX, 555 - parentY);
                this.historyContainer.scale.set(0.65, 0.62);
            }
        } else if (_viewInfoUtil.viewType === "VP") {
            // Mobile Portrait: 2-column layout below reels (Screen Y = 705 to 1050)
            // Left column (Screen X = 185): Buy Free Spin on top, 2X Ante Bet below
            // Right column (Screen X = 535): Super Buy on top, liquid jar barrel below
            if (this.buyButton) {
                this.buyButton.position.set(185 - parentX, 775 - parentY);
                this.buyButton.scale.set(0.72);
            }
            if (this.twoXBetButton) {
                this.twoXBetButton.position.set(185 - parentX, 940 - parentY);
                this.twoXBetButton.scale.set(0.70);
            }
            if (this.superBuyButton) {
                this.superBuyButton.position.set(535 - parentX, 775 - parentY);
                this.superBuyButton.scale.set(0.72);
            }
            if (this.historyContainer) {
                this.historyContainer.position.set(535 - parentX, 940 - parentY);
                this.historyContainer.scale.set(0.65, 0.62);
            }
        }

        this.updateToggleState();
    }

    hide() {
    }

    getTextStyle(type) {
        const styleObj = {
            "buyTextStyle": {
                fontFamily: "TTMastersDEMOBlack",
                fontSize: 20,
                fill: "#ffffff",
                stroke: "#4a1200",
                strokeThickness: 3,
                dropShadow: true,
                dropShadowColor: "#1f000f",
                dropShadowDistance: 2,
                dropShadowAngle: 1.6,
                align: "center",
                lineJoin: "round"
            },
            "buyAmountStyle": {
                fontFamily: "TTMastersDEMOBlack",
                fontSize: 22,
                fill: ["#FFFF33", "#ffc927", "#FFFF33"],
                stroke: "#4a1200",
                strokeThickness: 3,
                dropShadow: true,
                dropShadowColor: "#1f000f",
                dropShadowDistance: 2,
                dropShadowAngle: 1.6,
                align: "center",
                lineJoin: "round"
            },
            "superBuyTextStyle": {
                fontFamily: "TTMastersDEMOBlack",
                fontSize: 18,
                fill: "#ffffff",
                stroke: "#702323",
                strokeThickness: 3,
                dropShadow: true,
                dropShadowColor: "#1f000f",
                dropShadowDistance: 2,
                dropShadowAngle: 1.6,
                align: "center",
                lineJoin: "round"
            },
            "superBuyWordStyle": {
                fontFamily: "TTMastersDEMOBlack",
                fontSize: 18,
                fill: "#fafaf9",
                stroke: "#702323",
                strokeThickness: 3,
                dropShadow: true,
                dropShadowColor: "#1f000f",
                dropShadowDistance: 2,
                dropShadowAngle: 1.6,
                align: "center",
                lineJoin: "round"
            },
            "superBuyAmountStyle": {
                fontFamily: "TTMastersDEMOBlack",
                fontSize: 22,
                fill: ["#FFFF33", "#ffc927", "#FFFF33"],
                stroke: "#702323",
                strokeThickness: 3,
                dropShadow: true,
                dropShadowColor: "#1f000f",
                dropShadowDistance: 2,
                dropShadowAngle: 1.6,
                align: "center",
                lineJoin: "round"
            },
            "2xStyle": {
                fontFamily: "TTMastersDEMOBlack",
                fontSize: 18,
                fill: "#ffffff",
                stroke: "#0c5c2a",
                strokeThickness: 3,
                dropShadow: true,
                dropShadowColor: "#002b12",
                dropShadowDistance: 2,
                dropShadowAngle: 1.6,
                align: "center"
            },
            "2xAmount": {
                fontFamily: "TTMastersDEMOBlack",
                fontSize: 20,
                fill: ["#FFFF33", "#ffc927", "#FFFF33"],
                stroke: "#1a1a1a",
                strokeThickness: 2,
                dropShadow: false,
                align: "center"
            },
            "doubleChance": {
                fontFamily: "TTMastersDEMOBlack",
                fontSize: 15,
                fill: "#ffffff",
                stroke: "#0c5c2a",
                strokeThickness: 3,
                dropShadow: true,
                dropShadowColor: "#002b12",
                dropShadowDistance: 1,
                dropShadowAngle: 1.6,
                align: "center"
            }
        };

        return styleObj[type] || {};
    }
}
