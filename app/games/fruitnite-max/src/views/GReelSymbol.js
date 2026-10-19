// ============================================================================
// ES6 Class Definition: ReelSymbol
// ============================================================================

class ReelSymbol extends PIXI.Container {
    constructor(symbolConfig) {
        super();
        this.config = symbolConfig;
        this.createView();
    }

    createView() {
        //Provide x, y, scale etc in config if required.    
        //Added by Uday for Symbol spin Feature
        if (this.config && this.config.spineSymbol) {
            this.symbol = new PIXI.spine.Spine(PIXI.Loader.shared.resources[this.config.spineSymbol + ".json"].spineData);
            pixiLib.setProperties(this.symbol, this.config.props)
            this.addChild(this.symbol);
            this.symbol.state.addListener({
                complete: function (entry) {
                    if (entry.animation.name === "Start spin") {
                        this.symbol.state.setAnimation(0, "Spin Loop", true);
                    }
                }.bind(this)
            });
        }
        if (this.config.frontImage) {
            this.frontImage = pixiLib.getElement("Sprite");
            pixiLib.setProperties(this.frontImage, { anchor: { x: 0.5, y: 0.5 } });
            pixiLib.setProperties(this.frontImage, this.config.frontImage)
            this.addChild(this.frontImage);
        }
        if (this.config.symbol) {
            this.symbol = pixiLib.getElement("Sprite");
            pixiLib.setProperties(this.symbol, { anchor: { x: 0.5, y: 0.5 } });
            pixiLib.setProperties(this.symbol, this.config.symbol)
            this.addChild(this.symbol);
        }
        if (this.config.backImage) {
            this.backImage = pixiLib.getElement("Sprite");
            pixiLib.setProperties(this.backImage, { anchor: { x: 0.5, y: 0.5 } });
            pixiLib.setProperties(this.backImage, this.config.backImage)
            this.addChild(this.backImage);
        }
    }

    toggleVisibilitySymbol(bool) {

        if (this.config.frontImage) {
            this.frontImage.visible = bool;
        }
        if (this.config.symbol) {
            this.symbol.visible = bool;
        }
        if (this.config.backImage) {
            this.backImage.visible = bool;
        }
    }

    changeSymbol(config, multiplierPosition, isBeforeTumble) {

        if (config == "m") {
            var multiplierValue;
            var numberOfTumbles = coreApp.gameModel.obj.current_round.misc_prizes.count;

            if (isBeforeTumble)
                multiplierValue = coreApp.gameModel.userModel.userData.current_round.screen_wins[multiplierPosition];
            else
                multiplierValue = coreApp.gameModel.userModel.userData.current_round.misc_prizes[numberOfTumbles - 1].screenWins[multiplierPosition];

            /* CHANGING SYMBOL TEXTURE */
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

        }

        if (typeof config === "string") {
            pixiLib.setProperties(this.symbol, { texture: config });
            if (coreApp.gameModel.spinData.wildSymbols && coreApp.gameModel.spinData.wildSymbols.indexOf(config) > -1) {
                this.addLabel();
            } else {
                this.removeLabel();
            }
        } else {
            if (config.symbol && config.symbol.texture) {
                pixiLib.setProperties(this.symbol, {
                    texture: config.symbol.texture
                });
                if (coreApp.gameModel.spinData.wildSymbols && coreApp.gameModel.spinData.wildSymbols.indexOf(config.symbol.texture) > -1) {
                    this.addLabel();
                } else {
                    this.removeLabel();
                }
            }
            if (config.frontImage && config.frontImage.texture) {
                pixiLib.setProperties(this.frontImage, {
                    texture: config.frontImage.texture
                });
            }
            if (config.backImage && config.backImage.texture) {
                pixiLib.setProperties(this.backImage, {
                    texture: config.backImage.texture
                });
            }
        }
    }

    applyTint(tintValue) {
        if (tintValue == undefined) {
            tintValue = 0xFFFFFF;
        }
        if (this.symbol) {
            this.symbol.tint = tintValue;
        }
        if (this.frontImage) {
            this.frontImage.tint = tintValue;
        }
        if (this.backImage) {
            this.backImage.tint = tintValue;
        }
    }

    removeLabel() {
        if (this.label) {
            this.removeChild(this.label);
        }
    }

    addLabel() {
        this.removeLabel();

        this.label = pixiLib.getElement("Sprite", "wild_label");
        pixiLib.setProperties(this.label, { x: 0, y: 60, scale: 0.6, anchor: { x: 0.5, y: 0.5 } });
        this.addChild(this.label);
    }
}
