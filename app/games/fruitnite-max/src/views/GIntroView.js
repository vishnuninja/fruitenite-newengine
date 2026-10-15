// ============================================================================
// Consolidated Parent (IntroView.js) and Child (GIntroView.js)
// Base Class Definition & Implementation
// ============================================================================
function IntroView(bgParent, elementParent) {
    //"this" is already added to elementParent.
    //So anything added to this will already be in scalling container
    //For adding BG, use bgParent
    this.bgParent = bgParent;
    this.elementsForResize = [];
    this.elementsForSetSize = [];
    this.dontShowNextTime = false;
    this.elementParent = elementParent;
    ViewContainer.call(this, arguments);
    this.addEvents();
}

IntroView.prototype = Object.create(ViewContainer.prototype);
IntroView.prototype.constructor = IntroView;

var sView = IntroView.prototype;
sView.createView = function () {
    if (!this.isIntroScreen()) { return; }
    this.config = _ng.GameConfig.gameIntroScreen;
    var alpha = (this.config.overlayAlpha !== undefined) ? this.config.overlayAlpha : 0.9;
    this.rectBG = pixiLib.getElement("Graphics", { w: 1280, h: 720, alpha: alpha });
    this.bgParent.addChildAt(this.rectBG, 0);
    this.rectBG.visible = false;


    this.addBG();
    this.addElements();
    this.createContinueButton();

    this.visible = false;
    this.onIntroResize();
}
sView.addEvents = function () {
    _mediator.subscribe("showIntroScreen", this.onShowIntroScreen.bind(this));
    _mediator.subscribe(_events.core.onResize, this.onIntroResize.bind(this));
    _mediator.subscribe("hideIntroScreen", function () {
        this.hideIntroScreen();
    }.bind(this));

}
sView.addSpecificElements = function () { }
sView.addBG = function () { }
sView.addElements = function () {
    this.getLayout(this.config[_viewInfoUtil.device], this);
    this.radioButtonOn.visible = false;
    this.addSpecificElements();
}
sView.createContinueButton = function () {
    if (this.continueButton) {
        pixiLib.addEvent(this.continueButton, this.hideIntroScreen.bind(this));
    }
    if (this.radioButtonHitArea) {
        this.radioButtonHitArea.alpha = 0.0001;
        // this.radioButtonHitArea.alpha = 0.1;
        this.radioButtonHitArea.interactive = true;
        this.radioButtonHitArea.buttonMode = true;
        pixiLib.addEvent(this.radioButtonHitArea, this.onClickRadioButton.bind(this));
    }
}
sView.onClickRadioButton = function () {
    _sndLib.play(_sndLib.sprite.btnClick);
    if (this.dontShowNextTime) {
        this.radioButtonOn.visible = false;
        this.radioButtonOff.visible = true;
        this.dontShowNextTime = false;
        pixiLib.setLocalStorageItem("noIntro", "false");
    } else {
        this.radioButtonOn.visible = true;
        this.radioButtonOff.visible = false;
        this.dontShowNextTime = true;
        pixiLib.setLocalStorageItem("noIntro", "true");
    }
}
sView.onShowIntroScreen = function () {
    if (this.isIntroScreen()) {
        this.visible = true;
        this.rectBG.visible = true;
        _mediator.publish("hidePopupContainer");
        _mediator.publish("hideMainGame");
        this.addIntroAnimation();
        console.log("space bar: hideIntroScreen to be triggered after 3 secs");
        this.spaceBarEventTimer = setTimeout(function () {
            _mediator.publish("setSpaceBarEvent", "hideIntroScreen");
        }, 2500);
    } else {
        _mediator.publish("introScreenHidden");
        _mediator.publish("showMainGame");
        _mediator.publish("showPopupContainer");
    }
}
sView.addIntroAnimation = function () {

}
sView.hideIntroScreen = function () {
    _mediator.publish("setSpaceBarEvent", "idle");
    clearTimeout(this.spaceBarEventTimer);
    //Enabling sound for mobile when player clicks on Intro Screen.
    //onSoundOffHandler is an empty function for desktop
    if (coreApp && coreApp.gameView && coreApp.gameView.settingsPanel && typeof coreApp.gameView.settingsPanel.onSoundOffHandler === "function") {
        coreApp.gameView.settingsPanel.onSoundOffHandler();
    }
    this.bgParent.visible = false;
    // this.rectBG.visible = false;
    _sndLib.play(_sndLib.sprite.btnClick);
    _sndLib.stop(_sndLib.sprite.intro);
    _sndLib.playBg(_sndLib.sprite.bg);
    this.killIntroAnimation();
    _mediator.publish("showMainGame");
    _mediator.publish("showPopupContainer");
    _mediator.publish("introScreenHidden");
}
sView.killIntroAnimation = function () {

}
sView.isIntroScreen = function () {
	// Skip intro screen if round_id exists in URL (unfinished game/resume mode)
	try {
		var urlParams = new URLSearchParams(window.location.search);
		if (urlParams && urlParams.has('round_id')) {
			console.log("🎬 Skipping intro screen - round_id found in URL (unfinished game mode)");
			return false;
		}
	} catch (e) {
		console.warn("⚠️ Error checking URL params:", e);
	}
	
    var localStorageValue = pixiLib.getLocalStorageItem("noIntro");
    if (_ng.GameConfig.showIntro && localStorageValue !== "true") {
        return true;
    }
    return false;
}
sView.onIntroResize = function () {
    if (this.rectBG) {
        this.rectBG.width = _viewInfoUtil.getWindowWidth();
        this.rectBG.height = _viewInfoUtil.getWindowHeight();
    }

    this.resizeLayout();

    if (this.introBG) {
        this.bgParent.addChildAt(this.introBG, 1);
        this.introBG.width = _viewInfoUtil.getWindowWidth();
        this.introBG.scale.y = this.introBG.scale.x;
      ;
        if (this.introBG.height < _viewInfoUtil.getWindowHeight()) {
            this.introBG.height = _viewInfoUtil.getWindowHeight();
            this.introBG.scale.x = this.introBG.scale.y;
        }
    }
}


sView.getLayout = function (config, parent) {
    for (var element in config) {
        var elemConfig = config[element];
        var e = null;
        if (elemConfig.elementConstructor == "parent") {
            e = pixiLib.getContainer();
            this.getLayout(elemConfig.params.children, e);
        } else if (elemConfig.elementConstructor == "sprite") {
            e = pixiLib.getElement("Sprite", elemConfig.params.backgroundImage);
        } else if (elemConfig.elementConstructor == "text") {
            var text = elemConfig.params.text || "";
            var textStyle = elemConfig.params.textStyle || {};
            if (typeof textStyle == "string") {
                textStyle = this.textConfig[textStyle];
            }
            e = pixiLib.getElement("Text", textStyle, text);
        } else if (elemConfig.elementConstructor == "GraphicsRect") {
            e = pixiLib.getElement("Graphics", elemConfig.params);
        } else if (elemConfig.elementConstructor == "spine") {
            e = pixiLib.getElement("Spine", elemConfig.params.spineName);
            if (elemConfig.params.defaultAnimation) {
                var loop = elemConfig.params.animationLoop || false;
                e.state.setAnimation(0, elemConfig.params.defaultAnimation, loop);
            }
        } else if (elemConfig.elementConstructor == "button") {
            e = pixiLib.getButton(elemConfig.params.backgroundImage, elemConfig.params.options);
            if (elemConfig.isDisableByDefault) {
                pixiLib.setInteraction(e, false);
            }
        } else {
            if (elemConfig.elementConstructor == "PanelValueField" ||
                elemConfig.elementConstructor == "PanelBGStrip") {
                e = new _ng[elemConfig.elementConstructor](elemConfig, parent);
            } else if (_ng[elemConfig.elementConstructor]) {
                e = new _ng[elemConfig.elementConstructor](elemConfig.params, parent);
            } else {
                e = new window[elemConfig.elementConstructor](elemConfig.params, parent);
            }
            e = e.container || e;
        }
        e.name = element;
        e.props = elemConfig.params.props;
        if (!elemConfig.params.noResize) {
            if (elemConfig.params.makeResponsive) {
                e.makeResponsive = true;
                _ngFluid.call(e, elemConfig.params.props);
            } else if (elemConfig.params.subscribeToResize) {
                pixiLib.setProperties(e, elemConfig.params.props[_viewInfoUtil.viewType])
            } else {
                pixiLib.setProperties(e, elemConfig.params.props)
            }
        }
        if (elemConfig.params.subscribeToResize) {
            this.elementsForResize.push(element);
        }
        parent.addChild(e);
        this[element] = e;
    }
}



sView.resizeLayout = function () {
    var scaleX, scaleY;
    for (var i = 0; i < this.elementsForResize.length; i++) {
        if (this[this.elementsForResize[i]] && this[this.elementsForResize[i]].makeResponsive) {
            this[this.elementsForResize[i]].setAlignment(this[this.elementsForResize[i]].props);
            if (_viewInfoUtil.viewType === "VL" || _viewInfoUtil.viewType === "VD") {
                scaleX = this[this.elementsForResize[i]].props.landScaleX || 1;
                scaleY = this[this.elementsForResize[i]].props.landScaleY || 1;
            } else {
                scaleX = this[this.elementsForResize[i]].props.portScaleX || 1;
                scaleY = this[this.elementsForResize[i]].props.portScaleY || 1;
            }
            this[this.elementsForResize[i]].setScale(scaleX, scaleY);
        } else {
            pixiLib.setProperties(this[this.elementsForResize[i]], this[this.elementsForResize[i]].props[_viewInfoUtil.viewType]);
        }
    }
    for (var i = 0; i < this.elementsForSetSize.length; i++) {
        this[this.elementsForSetSize[i]].setSize(this[this.elementsForSetSize[i]].setSizeValues[_viewInfoUtil.viewType].w, this[this.elementsForSetSize[i]].setSizeValues[_viewInfoUtil.viewType].h);
    }
    this.specificResizeLayout();
}
sView.specificResizeLayout = function () { }

// ============================================================================
// Game-Specific Extensions & Prototype Overrides (GIntroView.js)
// ============================================================================

var sIntroView = IntroView.prototype;

sIntroView.createView= function () {
    //this.createIndiButton();
    if (!this.isIntroScreen()) { return; }
    this.config = _ng.GameConfig.gameIntroScreen;

    var alpha = (this.config.overlayAlpha !== undefined) ? this.config.overlayAlpha : 0.5;
    this.rectBG = pixiLib.getElement("Graphics", { w: 1280, h: 720, alpha: alpha });
    this.bgParent.addChildAt(this.rectBG, 0);
    this.rectBG.visible = false;
    this.setTimeoutsArr =[];
    this.intervelTime = 3000;
    this.srcHitTime = 6000;
    this.addBG();
    this.addElements();
    this.createContinueButton();

    this.visible = false;
    this.onIntroResize();
    // Initialize a property to keep track of the current step
    this.currentStep = 1;
    //hit area of indi button is turned into button for interactivity
    if (this.indiButtonHitArea1) {
        this.indiButtonHitArea1.alpha = 0;
        this.indiButtonHitArea1.interactive = true;
        this.indiButtonHitArea1.buttonMode = true;
        pixiLib.addEvent(this.indiButtonHitArea1, () => this.onClickIndicator(1));
    }
    
    if (this.indiButtonHitArea2) {
        this.indiButtonHitArea2.alpha = 0;
        this.indiButtonHitArea2.interactive = true;
        this.indiButtonHitArea2.buttonMode = true;
        pixiLib.addEvent(this.indiButtonHitArea2, () => this.onClickIndicator(2));
    }
    if (this.indiButtonHitArea3) {
        this.indiButtonHitArea3.alpha = 0;
        this.indiButtonHitArea3.interactive = true;
        this.indiButtonHitArea3.buttonMode = true;
        pixiLib.addEvent(this.indiButtonHitArea3, () => this.onClickIndicator(3));
       
    }
    this.Indicator_off1.visible=false;
    this.Text_screen_1.visible = true;
    this.Text_screen_2.visible= false;
    this.mSym.visible = false;
    this.Text_screen_3.visible= false;
    this.callTime();
}

sIntroView.onClickRadioButton = function () {
    _sndLib.play(_sndLib.sprite.btnClick);
    if (this.dontShowNextTime) {
        this.radioButtonOn.visible = false;
        this.radioButtonOff.visible = true;
        this.dontShowNextTime = false;
        pixiLib.setLocalStorageItem("noIntro", "false");
    } else {
        this.radioButtonOn.visible = true;
        // this.radioButtonOff.visible = false;
        this.dontShowNextTime = true;
        pixiLib.setLocalStorageItem("noIntro", "true");
    }
}

sIntroView.callTime = function () {
    this.timer = 1;
    if (this.interval) {
        clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
        this.src1Active();
        setTimeout(() => this.src2Active(), this.intervelTime);
        setTimeout(() => this.src3Active(), 2 * this.intervelTime);
        // Updating the current step
        this.currentStep = (this.currentStep % 3) + 1;
    }, this.intervelTime * 3);
}

//function for onCick on indicator buttons
sIntroView.onClickIndicator = function (indicatorNumber) {
    clearInterval(this.interval);
    this.currentStep = indicatorNumber;

    if (indicatorNumber === 1) {
        this.src1Active();
    } else if (indicatorNumber === 2) {
        this.src2Active();
    } else {
        this.src3Active();
    }

    setTimeout(() => {
        this.callTime();
    }, this.srcHitTime);
}

sIntroView.src1Active = function () {
    this.screen_1.alpha = 0;
    TweenMax.to(this.screen_1, 2, { alpha: 1 });
    this.screen_1.visible = true;
    this.screen_2.visible= false;
    this.screen_3.visible= false;
    this.Text_screen_1.visible = true;
    this.Text_screen_2.visible= false;
    this.mSym.visible = false;
    this.Text_screen_3.visible= false;
    this.check1=true;
    this.Indicator_off1.visible= false;
    this.Indicator_off2.visible= true;
    this.Indicator_off3.visible= true;

};

sIntroView.src2Active = function () {  
    this.screen_2.alpha=0;
    TweenMax.to(this.screen_2, 2, { alpha: 1 });
    this.screen_2.visible = true;
    this.screen_1.visible= false;
    this.screen_3.visible= false;
    this.Text_screen_1.visible = false;
    this.Text_screen_2.visible= true;
    this.mSym.visible = true;
    this.Text_screen_3.visible= false;
    this.check2=true;
    this.Indicator_off2.visible= false;
    this.Indicator_off1.visible= true;
    this.Indicator_off3.visible= true;

};

sIntroView.src3Active = function () {  
    this.screen_3.alpha=0;
    TweenMax.to(this.screen_3, 2, { alpha: 1 });
    this.screen_3.visible = true;
    this.screen_2.visible= false;
    this.screen_1.visible= false;
    this.Text_screen_1.visible = false;
    this.Text_screen_2.visible= false;
    this.mSym.visible = false;
    this.Text_screen_3.visible= true;
    this.check3=true;
    this.Indicator_off3.visible= false;
    this.Indicator_off1.visible= true;
    this.Indicator_off2.visible= true;

};

sIntroView.specificResizeLayout = function () { 
    if(!this.isIntroScreen()) return;
    if (this.currentStep === 1) {
        this.src1Active();
    } else if (this.currentStep === 2) {
        this.src2Active();
    } else {
        this.src3Active();
    }
}


// --- Consolidated Exports & Aliases ---
var GIntroView = IntroView;
if (typeof window !== "undefined") { window.GIntroView = IntroView; }
