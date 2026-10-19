// ============================================================================
// ES6 Class Definition: SlotView
// ============================================================================

var _ng = _ng || {};
var cv = _ng.CoreView ? _ng.CoreView.prototype : {};

var _ng = _ng || {};

class SlotView extends _ng.CoreView {
    constructor(coreApp) {
        super(coreApp);
        this.counter = 0;
        this.titleIndex = 2;
        this.prevGameTitleHideEffect = false;
    }

    soundsLoaded() {
        var gameWidth = _ng.GameConfig.gameLayout[this.coreApp.viewInfoUtil.viewType].width;
        var gameHeight = _ng.GameConfig.gameLayout[this.coreApp.viewInfoUtil.viewType].height;

        var containers = {
            "bgContainer": { parent: "stage" },
            "mainContainer": { parent: "stage", fluid: true, fluidParams: {}, setSize: { width: gameWidth, height: gameHeight } },
            "featureContainer": { parent: "stage" },
            "responsiveFeatureContainer": { parent: "featureContainer", fluid: true, fluidParams: {}, setSize: { width: gameWidth, height: gameHeight } },
            "decoratorContainer": { parent: "stage" },
            "popupContainer": { parent: "stage" },
            "responsivePopupContainer": { parent: "popupContainer", fluid: true, fluidParams: {}, setSize: { width: gameWidth, height: gameHeight } },
            "introContainer": { parent: "stage" },
            "fluidIntroContainer": { parent: "introContainer", fluid: true, fluidParams: {}, setSize: { width: gameWidth, height: gameHeight } },
        }

        for (var container in containers) {
            var cObj = containers[container];
            this[container] = pixiLib.getElement();
            this[container].name = container;
            if (cObj.fluid) {
                var params = cObj.fluidParams || {};
                _ngFluid.call(this[container], params);
                if (cObj.setSize) {
                    this[container].setSize(cObj.setSize.width, cObj.setSize.height);
                }
            }
            if (cObj.parent === "stage") {
                this.stage.addChildAt(this[container], this.stage.children.length - 1);
            } else {
                this[cObj.parent].addChild(this[container]);
            }
        }

        this.viewConfig = {
            coreViews: {
                bgView: { view: "BGView", controller: "BGContoller" },
                reelView: { view: "ReelView", controller: "ReelController" },
                winView: { view: "PaylineView", controller: "PaylineController" },
                paylineView: { view: "PaylineView", controller: "PaylineController" },
                bonusView: { view: "BonusView", controller: "BonusController" },
                gambleView: { view: "GambleView", controller: "GambleController" }
            },
            deviceSpecificCoreViews: {}
        };
        this.defaultReelViewUiConfig = JSON.parse(JSON.stringify(_ng.GameConfig.ReelViewUiConfig));
        this.defaultReelSymbolConfig = JSON.parse(JSON.stringify(_ng.GameConfig.reelSymbolConfig));
        this.removeCoreErrorPopup();
        this.createGameElements();
    }

    updateReelViewUiConfig(data) { }

    updateReelSymbolConfig(data) {
        // if(coreApp.gameModel.isFullFSActive() && _ng.GameConfig.separateSymbolsForFS){
        if (data.type == "set") {
            _ng.GameConfig.reelSymbolConfig = _ng.GameConfig.reelSymbolConfigFS;
        } else {
            _ng.GameConfig.reelSymbolConfig = this.defaultReelSymbolConfig;
        }
        // }
    }

    onStartCreatingGame() {
        cv.onStartCreatingGame.call(this);
        _ng.GameConfig.soundsAssets.filePath = appPath + _ng.GameConfig.soundsAssets.filePath;
        var obj = Object.assign(_ng.GameConfig.sounds, _ng.GameConfig.soundsAssets);
        // _sndLib.init(_ng.GameConfig.sounds, this.soundsLoaded.bind(this));
        _sndLib.init(obj, this.soundsLoaded.bind(this), "primary");
        // _sndLib.init(obj, this.soundsLoaded.bind(this), "secondary");
    }

    createGameViews() { }

    createGameElements() {

        this.gameRules = document.getElementById('grContent');
        if (_viewInfoUtil.isDesktop) {
            this.gameRules.setAttribute('style', 'height:640px; padding:40px;');
        }

        /*******************************/
        var view = new BGView();
        this.bgController = new BGController();
        this.bgController.setView(view);
        this.bgContainer.addChild(view);
        view.createView();
        /*******************************/
        var view = new ReelView();
        this.reelController = new ReelController();
        this.reelController.setView(view);
        this.mainContainer.addChild(view);
        view.createView();
        view.name = "reelView";
        this.reelView = view;
        /*******************************/
        var view = new WinView();
        this.winController = new WinController();
        this.winController.setView(view);
        this.mainContainer.addChild(view);
        view.createView();
        view.name = "winView";
        /*******************************/
        var view = new PaylineView();
        view.name = "paylines";
        this.paylineController = new PaylineController();
        this.paylineController.setView(view);
        this.mainContainer.addChild(view);
        view.createView();
        /*******************************/
        this.settingsPanel = (typeof DummySettingsView !== "undefined") ? new DummySettingsView() : {};
        this.settingsPanel.name = "SettingsPanelView";
        this.settingsPanel.createView();

        this.SPController = new _ng.SettingsController();
        this.SPController.setView(this.settingsPanel);
        /*******************************/
        var view = new BuyPanelView();
        view.name = "BuyPanelView";
        this.reelView.addChild(view);
        this.reelView._buyPanel = view;
        view.createView();

        this.panel = (typeof DummyPanelView !== "undefined") ? new DummyPanelView() : {};
        this.panel.BuyControl = view;
        this.panel.setVariables(this, this.coreApp);
        this.panel.createView();

        this.CPController = new PanelController();
        this.CPController.setView(this.panel);
        this.CPController.setVariables(this.coreApp);
        var view = new ClockView();
        this.clockView = view;
        view.name = "ClockView";
        var ind = this.stage.getChildIndex(this.featureContainer)
        this.stage.addChildAt(view, ind + 1);
        view.createView();

        var view = new CyprusPromoView();
        this.cyprusPromoView = view;
        view.name = "cyprusPromoView";
        var ind = this.stage.getChildIndex(this.featureContainer);
        this.stage.addChildAt(view, ind + 1);
        view.createView();

        if (commonConfig.isServerTime === "true") {
            this.clockView.alpha = 0;
            this.clockView.visible = false;
        }

        /*******************************/
        var view = new BigWinView();
        this.bigWinView = view;
        view.name = "bigWinView";
        this.decoratorContainer.addChild(view);
        /*******************************/
        var view = new InfoPopupView();
        this.infoPopup = view;
        view.name = "infoPopup";
        this.popupContainer.addChild(view);
        /*******************************/
        var view = new BonusView({ parent: this.featureContainer });
        this.bonusController = new BonusController();
        this.bonusController.setView(view);
        this.featureContainer.addChild(view);
        view.createView();
        view.name = "gameBonus";
        /*******************************/
        var view = new IntroView(this.introContainer, this.fluidIntroContainer);
        this.fluidIntroContainer.addChild(view);
        this.introView = view;
        view.createView();
        view.name = "introView";
        /*******************************/
        var view = new ErrorView({ popupContainer: this.popupContainer, rPopupContainer: this.responsivePopupContainer });
        view.name = "ErrorView";
        this.errorController = new ErrorController();
        this.errorController.setView(view);
        view.createView();
        /*******************************/
        this.createTitle();

        var view = new GambleView();
        view.name = "gambleContainer";
        this.gambleController = (typeof GambleController !== "undefined") ? new GambleController() : { setView: function () { }, onResize: function () { } };
        this.gambleController.setView(view);
        this.featureContainer.addChild(view);
        view.createView();
        /*******************************/
        var view = new RoyalRewardView();
        view.name = "royalRewardView";
        this.featureContainer.addChild(view);
        view.createView();
        /*******************************/

        this.createSwipeScreen();
        this.createExtraElements();
        this.gameCreationCompleted();


        //just for logs
        var textStyle = {
            "fill": "#efff0f",
            "fontFamily": "Verdana",
            "fontSize": 25,
            "stroke": "white",
            "strokeThickness": 1
        };
        this.logTxt = pixiLib.getElement("Text", textStyle, "");
        this.mainContainer.addChild(this.logTxt);
        this.logTxt.visible = false;
        this.logTxt.x = 200;
        this.logTxt.y = 200;
    }

    createSwipeScreen() {
        // if (_viewInfoUtil.viewType !== "VD" && window.location.href.indexOf('localhost') === -1) { // enable swipeup image in local
        if (_viewInfoUtil.checkForSwipeUp()) {
            if (_viewInfoUtil.isAndroid()) {
                this.createSwipeScreenForAndroid();
            } else if (!_viewInfoUtil.isIpad() && _viewInfoUtil.isIOS() && !_viewInfoUtil.isIOSChrome()) {
                this.iosSwipeScreen = document.createElement('div');
                document.body.appendChild(this.iosSwipeScreen);

                this.iosImage = document.createElement("img");
                this.iosSwipeScreen.appendChild(this.iosImage);
                this.iosImage.setAttribute("src", appPath + _ng.GameConfig.coreAssetsPath + "@1x/iosSwipeUp.png");
                this.iosImage.setAttribute("id", "iosSwipeHand");
                this.iosImage.style = "transform: scale(0.5, 0.5);"

                this.iosSwipeScreen.style = "width: 100%; height: 140%; background-color: black; position: absolute; opacity: 0.8; left: 0px; top: 0px; z-index: 100000";
                this.iosSwipeScreen.style.display = 'none';

                window.addEventListener('touchstart', function () {
                    this.onTouchStart();
                }.bind(this));
            }
        }
    }

    onTouchStart() {
        setTimeout(function () {
            window.scrollTo(0, 1);
        }, 500);
    }

    createSwipeScreenForAndroid() {
        this.swipeScreen = pixiLib.getRectangleSprite(1280, 720, 0x000000);
        this.stage.addChild(this.swipeScreen);

        this.swipeParent = pixiLib.getElement();
        this.stage.addChild(this.swipeParent);

        this.swipeScreen.alpha = 0.8;
        this.swipeScreen.interactive = true;
        pixiLib.addEvent(this.swipeScreen, this.onSwipeUp.bind(this));
        screenfull.on('error', event => {
            this.swipeScreen.visible = false;
            this.swipeParent.visible = false;
        });
        screenfull.on('change', event => {
            if (screenfull.isFullscreen) {
                this.swipeScreen.visible = false;
                this.swipeParent.visible = false;
            } else {
                this.swipeScreen.visible = true;
                this.swipeParent.visible = true;
            }
        });

        var circle = pixiLib.getElement('Sprite', 'swipeCircle');
        this.swipeParent.addChild(circle);
        pixiLib.setProperties(circle, { x: 125, y: 125, anchor: { x: 0.5, y: 0.5 }, scale: 0.8 });

        var hand = pixiLib.getElement('Sprite', 'swipeHand');
        pixiLib.setProperties(hand, { x: 270, y: 290 });
        this.swipeParent.addChild(hand);

        this.handTimer = false;
        TweenMax.to(hand, 1, {
            x: 80,
            y: 100,
            repeat: -1,
            onUpdate: function () {
                // console.log(hand.x);
                if (hand.x <= 81) {
                    if (!this.handTimer) {
                        this.handTimer = true;
                        // setTimeout(function(){
                        TweenMax.to(circle.scale, 0.25, {
                            x: 0.5,
                            y: 0.5,
                            repeat: 1,
                            yoyo: true,
                            onComplete: function () {
                                this.handTimer = false;
                            }.bind(this)
                        })
                        // }, 50);
                    }
                }
            }
        })
    }

    onSwipeUp() {
        if (screenfull.enabled) {
            screenfull.request();
        } else {
            this.swipeScreen.visible = false;
            this.swipeParent.visible = false;
        }
    }

    createClock(view) {
        // view.name = "ClockView";
        // // this.responsivePanelContainer.addChild(view);
        // view.createView();
    }

    showFreezeWindow() {
        if (!this.freezeWindowScreen) {
            this.freezeWindowScreen = pixiLib.getRectangleSprite(1280, 720, 0x000000);
            this.freezeWindowScreen.alpha = 0.6;
            this.freezeWindowScreen.interactive = true;
            this.popupContainer.addChild(this.freezeWindowScreen);

            this.resizeFreezeWindow();
        }
    }

    hideFreezeWindow() {
        if (this.freezeWindowScreen) {
            this.popupContainer.removeChild(this.freezeWindowScreen);
            delete this.freezeWindowScreen;
        }
    }

    showNotificationWindow(options) {
        options = options || {};
        this.notificationScreen = pixiLib.getRectangleSprite(1280, 720, 0x000000);
        this.popupContainer.addChild(this.notificationScreen);

        var text = (options.text !== undefined) ? options.text : "Please wait Loading assets...";
        text = pixiLib.getLiteralText(text);
        var textStyle = {
            fontFamily: "arial",
            fontSize: 30,
            fill: 0xFFFFFF,
            align: "center",
            maxWidth: 700
        }
        textStyle.maxWidth = Math.min(_viewInfoUtil.getWindowHeight(), _viewInfoUtil.getWindowWidth()) - 20;
        this.msgText = pixiLib.getElement("Text", textStyle, text);
        pixiLib.setText(this.msgText, text);
        this.msgText.anchor.set(0.5, 0.5);
        this.popupContainer.addChild(this.msgText);

        if (options.alpha) {
            this.notificationScreen.alpha = options.alpha;
        }
        this.resizeNotificationWindow();
    }

    hideNotificationWindow() {
        TweenMax.to(this.notificationScreen, 0.5, {
            alpha: 0,
            onComplete: function () {
                this.popupContainer.removeChild(this.notificationScreen);
                delete this.notificationScreen;
            }.bind(this)
        })
        TweenMax.to(this.msgText, 0.5, {
            alpha: 0,
            onComplete: function () {
                this.popupContainer.removeChild(this.msgText);
                delete this.msgText;
            }.bind(this)
        })
    }

    resizeFreezeWindow() {
        if (this.freezeWindowScreen) {
            this.freezeWindowScreen.width = _viewInfoUtil.getWindowWidth();
            this.freezeWindowScreen.height = _viewInfoUtil.getWindowHeight();
        }
    }

    resizeNotificationWindow() {
        if (this.notificationScreen) {
            this.msgText.x = _viewInfoUtil.getWindowWidth() / 2;
            this.msgText.y = _viewInfoUtil.getWindowHeight() / 2;

            this.notificationScreen.width = _viewInfoUtil.getWindowWidth();
            this.notificationScreen.height = _viewInfoUtil.getWindowHeight();
        }
    }

    createExtraElements() {
        _ng.buyFeaturePopupStatus = false;
        _mediator.publish("SHOW_TICKER");
        _mediator.subscribe("onGameCreated", this.onGameInitGame.bind(this));
        _mediator.publish("fadeTextsSpinClicked");
        _mediator.subscribe("toggleFadeContainer", this.toggleFadeContainer.bind(this));
        _mediator.subscribe("CreateScatterWinAnim", this.CreateScatterWinAnim.bind(this));
        _mediator.subscribe("sliderFalse", this.sliderFalse.bind(this));
        _mediator.subscribe("_hideAndShowOfTwoXButton", this._hideAndShowOfTwoXButton.bind(this));
        _mediator.subscribe(_events.core.onResize, this.onGameViewResize.bind(this));

        this.oldSlid = 0;
        this.NewSlid = 0;
        this.fadeTextArr = [];

        this.createFadingContainer();
        _mediator.subscribe("ResizeGview", this.ResizeGview.bind(this));

        // Add logo and replay animation
        this.addingLogo();


        // this.resizeForIpad();
        try {
            setInterval(() => {
                this.toggleTextVisibility();
            }, 2500);
        } catch (e) { }

        this.volBox = pixiLib.getContainer();
        var blackBg = pixiLib.getRectangleSprite(326, 53.5, 0x000000);
        blackBg.x = 7;
        blackBg.y = 593;
        blackBg.alpha = 0.9;
        blackBg.scale.set(0.95, 0.6);

        var currentVolume = 0.2;


        this.slider = new Slider({
            name: "lineValueSlider",
            props: { x: 17.5, y: 610 },
            dotImage: "asSliderDot",
            BGImage: "VolumeBGSlider",
            FGImage: "VolumeFillSlider",
            isVerticalSlider: false,
            startingValue: 0,
            endValue: 1,
            currentValue: currentVolume,
            toFixedValue: 1, //Value After Decimal, give 0 for integers
            doMultiplier: 100, //Value After Decimal, give 0 for integers
            text: {
                prefix: "",
                postfix: "%",
                attachedToSlider: false,
                props: { x: 270, y: 0, anchor: { y: 0.5, x: 0.5 } },
                textStyle: { fill: 0xffffff, fontSize: 16 }
            },

            displayForMinValue: {
                elementConstructor: "text",
                params: {
                    props: { x: -35, y: 0, anchor: 0.5 },
                    text: "0%",
                    textStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fill: 0xffffff, padding: 10 }
                }
            },

            displayForMaxValue: {
                elementConstructor: "text",
                params: {
                    props: { x: 368, y: 0, anchor: 0.5 },
                    text: "100%",
                    textStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fill: 0xffffff, padding: 10 }
                }
            },
            eventToPublish: "settingVolumeChange"

        })
        this.slider.name = "SliderTEst"
        this.slider.scale.set(1);
        this.volBox.addChild(blackBg);
        this.volBox.addChild(this.slider);
        this.mainContainer.addChild(this.volBox);
        this.volBox.visible = false;
        this.slider.children[4].visible = false;
        this.slider.children[5].visible = false;
        this.slider.children[2].scale.set(1);
        this.slider.children[2].name = "dot";
        _mediator.subscribe("ToggleVolBox", this.ToggleVolPanel.bind(this));
        _mediator.subscribe("SliderMoved", this.SliderMoved.bind(this));
        this.HistoryArray = [];

        this.createCanon();
    }

    createTitle() {
        try {
            if (_ng.GameConfig.gameTitle.type === "spine") {
                var config = _ng.GameConfig.gameTitle[_viewInfoUtil.device];
                this.gameTitle = new PIXI.spine.Spine(PIXI.Loader.shared.resources[config.image + ".json"].spineData);
                this.stage.addChildAt(this.gameTitle, config.additionIndex + 1);
                this.gameTitle.state.setAnimation(0, _ng.GameConfig.gameTitle.defaultAnimation, true);
                if (_viewInfoUtil.device === "Desktop") {
                    pixiLib.setProperties(this.gameTitle, config.props);
                } else {
                    _ngFluid.call(this.gameTitle, config.props);
                }
                var isIPad = navigator.userAgent.match(/iPad/i);
                if (isIPad && config.iPadProps) {
                    _ngFluid.call(this.gameTitle, config.iPadProps);
                }
            }
            else {
                var config = _ng.GameConfig.gameTitle[_viewInfoUtil.device];
                this.gameTitle = pixiLib.getElement("Sprite", config.image);
                this.stage.addChildAt(this.gameTitle, config.additionIndex + 1);

                if (config.isLandScapeLogo) {
                    this.gameTitle2 = pixiLib.getElement("Sprite", config.isLandScapeLogo.image);
                    this.stage.addChildAt(this.gameTitle2, config.additionIndex + 1);
                }


                if (_viewInfoUtil.device === "Desktop") {
                    pixiLib.setProperties(this.gameTitle, config.props);
                } else {
                    _ngFluid.call(this.gameTitle, config.props);
                    _ngFluid.call(this.gameTitle2, config.props);
                }
                var isIPad = navigator.userAgent.match(/iPad/i);
                if (isIPad && config.iPadProps) {
                    _ngFluid.call(this.gameTitle, config.iPadProps);
                    _ngFluid.call(this.gameTitle2, config.iPadProps);
                }
            }
        } catch (e) { }
        this.addExtraTitle();
    }

    addExtraTitle() { }

    gameCreationCompleted(argument) {
        this.onResize();
        //in response of init we will check the session and show login 
        // this.callGameinit();
        this.destroyPreloader();
        _mediator.publish("showIntroScreen");
        _mediator.publish(_events.core.gameCreationCompleted);

        if (_ng.GameConfig.isIntro === true) {
            _sndLib.play(_sndLib.sprite.intro);
        } else {
            _sndLib.playBg(_sndLib.sprite.bg);
        }
        _mediator.publish("DisablePanel");
        _mediator.publish("setSpaceBarEvent", "idle");


        //defaultMute
        // if (_ng.GameConfig.defaultMute) {
        //     _sndLib.mute(true, true);
        // }
        this.addDocumentVisibilityEvent();
    }

    onHideGameTitle(data) {
        if (this.gameTitle) {
            if (data && data.noEffect) {
                this.gameTitle.visible = false;
                this.prevGameTitleHideEffect = false;
                this.gameTitle.alpha = 0;
            } else {
                this.prevGameTitleHideEffect = true;
                TweenMax.to(this.gameTitle, 0.5, {
                    alpha: 0,
                    onComplete: function () {
                        this.gameTitle.visible = false;
                    }.bind(this)
                })
            }
        }
        if (this.gameTitle2) {
            if (data && data.noEffect) {
                this.prevGameTitleHideEffect = false;
                this.gameTitle2.visible = false;
                this.gameTitle2.alpha = 0;
            } else {
                this.prevGameTitleHideEffect = true;
                TweenMax.to(this.gameTitle2, 0.5, {
                    alpha: 0,
                    onComplete: function () {
                        this.gameTitle2.visible = false;
                    }.bind(this)
                })
            }
        }
    }

    onShowGameTitle() {
        if (this.gameTitle) {
            if (this.prevGameTitleHideEffect) {
                this.gameTitle.visible = true;
                TweenMax.to(this.gameTitle, 0.5, {
                    alpha: 1,
                    onComplete: function () {
                        this.gameTitle.visible = true;
                        this.setGameTitleVisibility();
                    }.bind(this)
                });
            } else {
                this.gameTitle.visible = true;
                this.gameTitle.alpha = 1;
            }
        }
        if (this.gameTitle2) {
            if (this.prevGameTitleHideEffect) {
                this.gameTitle2.visible = true;
                TweenMax.to(this.gameTitle2, 0.5, {
                    alpha: 1,
                    onComplete: function () {
                        this.gameTitle2.visible = true;
                        this.setGameTitleVisibility();
                    }.bind(this)
                });
            } else {
                this.gameTitle2.visible = true;
                this.gameTitle2.alpha = 1;
            }
        }
        this.setGameTitleVisibility();
    }

    setGameTitleVisibility() {
        var viewType = this.coreApp.viewInfoUtil.viewType;
        var config = _ng.GameConfig.gameTitle[_viewInfoUtil.device];
        if (config.isLandScapeLogo && this.gameTitle2) {
            if (viewType === "VL") {
                this.gameTitle.visible = false;
                this.gameTitle2.visible = true;
            } else if (viewType === "VP") {
                this.gameTitle.visible = true;
                this.gameTitle2.visible = false;
            }
        }
    }

    onHideMainContainer(data) {
        if (data && data.noEffect) {
            this.mainContainer.visible = false;
        } else {
            TweenMax.to(this.mainContainer, 0.5, {
                alpha: 0,
                onComplete: function () {
                    this.mainContainer.visible = false;
                }.bind(this)
            })
        }

    }

    onShowMainContainer() {
        if (this.mainContainer.alpha == 0) {
            this.mainContainer.visible = true;
            TweenMax.to(this.mainContainer, 0.5, {
                alpha: 1,
                onComplete: function () {
                    this.mainContainer.visible = true;
                }.bind(this)
            });
        } else {
            this.mainContainer.visible = true;
        }
    }

    onHidePanel(data) {
        if (this.panelContainer) {
            if (data && data.noEffect) {
                this.panelContainer.visible = false;
            } else {
                TweenMax.to(this.panelContainer, 0.5, {
                    alpha: 0,
                    onComplete: function () {
                        this.panelContainer.visible = false;
                    }.bind(this)
                });
            }
        }
    }

    onShowPanel() {
        if (this.panelContainer) {
            if (this.panelContainer.alpha == 0) {
                this.panelContainer.visible = true;
                TweenMax.to(this.panelContainer, 0.5, {
                    alpha: 1,
                    onComplete: function () {
                        this.panelContainer.visible = true;
                    }.bind(this)
                });
            } else {
                this.panelContainer.visible = true;
            }
        }
    }

    onHideClockView(data) {
        if (data && data.noEffect) {
            this.clockView.visible = false;
        } else {
            TweenMax.to(this.clockView, 0.5, {
                alpha: 0,
                onComplete: function () {
                    this.clockView.visible = false;
                }.bind(this)
            })
        }
    }

    onShowClockView() {

        if (commonConfig.isServerTime === "true") {

            if (this.clockView.alpha == 0) {
                this.clockView.visible = true;
                TweenMax.to(this.clockView, 0.5, {
                    alpha: 1,
                    onComplete: function () {
                        this.clockView.visible = true;
                    }.bind(this)
                });
            } else {
                this.clockView.visible = true;
            }
        } else {
            this.clockView.alpha = 0;
            this.clockView.visible = false;
        }
    }

    onHidePromoView(data) {
        if (data && data.noEffect) {
            this.cyprusPromoView.visible = false;
        } else {
            TweenMax.to(this.cyprusPromoView, 0.5, {
                alpha: 0,
                onComplete: function () {
                    this.cyprusPromoView.visible = false;
                }.bind(this)
            })
        }
    }

    onShowPromoView() {

        if (this.cyprusPromoView.alpha == 0) {
            this.cyprusPromoView.visible = true;
            TweenMax.to(this.cyprusPromoView, 0.5, {
                alpha: 1,
                onComplete: function () {
                    this.cyprusPromoView.visible = true;
                }.bind(this)
            });
        } else {
            this.cyprusPromoView.visible = true;
        }
    }

    onDestroyPromoView() {
        this.cyprusPromoView.visible = false;
    }

    onHideReelView(data) {
        if (data && data.noEffect) {
            this.reelView.visible = false;
        } else {
            TweenMax.to(this.reelView, 0.5, {
                alpha: 0,
                onComplete: function () {
                    this.reelView.visible = false;
                }.bind(this)
            })
        }
    }

    onShowReelView() {
        if (this.reelView.alpha == 0) {
            this.reelView.visible = true;
            TweenMax.to(this.reelView, 0.5, {
                alpha: 1,
                onComplete: function () {
                    this.reelView.visible = true;
                }.bind(this)
            });
        } else {
            this.reelView.visible = true;
        }
    }

    onHideWinView(data) {
        if (data && data.noEffect) {
            this.winController.view.visible = false;
        } else {
            TweenMax.to(this.winController.view, 0.5, {
                alpha: 0,
                onComplete: function () {
                    this.winController.view.visible = false;
                }.bind(this)
            })
        }
    }

    onShowWinView() {
        if (this.winController.view.alpha == 0) {
            this.winController.view.visible = true;
            TweenMax.to(this.winController.view, 0.5, {
                alpha: 1,
                onComplete: function () {
                    this.winController.view.visible = true;
                }.bind(this)
            });
        } else {
            this.winController.view.visible = true;
        }
    }

    onHidePopupContainer(data) {
        if (data && data.noEffect) {
            this.popupContainer.visible = false;
        } else {
            TweenMax.to(this.popupContainer, 0.5, {
                alpha: 0,
                onComplete: function () {
                    this.popupContainer.visible = false;
                }.bind(this)
            })
        }
    }

    onShowPopupContainer() {
        if (this.popupContainer.alpha == 0) {
            this.popupContainer.visible = true;
            TweenMax.to(this.popupContainer, 0.5, {
                alpha: 1,
                onComplete: function () {
                    this.popupContainer.visible = true;
                }.bind(this)
            });
        } else {
            this.popupContainer.visible = true;
        }
    }

    callGameinit(argument) {
        // console.log(" on game creation called game init!");
        // _mediator.publish("InitRequest");
        _mediator.publish("onGameCreated");

    }

    destroyPreloader(argument) { }

    onResize(argument) {
        cv.onResize.call(this);

        var viewType = this.coreApp.viewInfoUtil.viewType;
        var scaleFactor = this.coreApp.viewInfoUtil.viewScale;
        var baseWidth = _ng.GameConfig.gameLayout[this.coreApp.viewInfoUtil.viewType].width;
        var baseHeight = _ng.GameConfig.gameLayout[this.coreApp.viewInfoUtil.viewType].height;

        if (this.fluidIntroContainer !== undefined) {
            this.fluidIntroContainer.setSize(baseWidth, baseHeight);
            this.fluidIntroContainer.onResize();
        }
        if (this.mainContainer !== undefined) {
            this.mainContainer.setSize(baseWidth, baseHeight);
            this.mainContainer.onResize();
            this.repositionReelView();
        }
        // if(this.responsiveDecoratorContainer !== undefined){
        //     this.responsiveDecoratorContainer.setSize(baseWidth, baseHeight);
        //     this.responsiveDecoratorContainer.onResize();
        // }
        if (this.responsivePopupContainer !== undefined) {
            this.responsivePopupContainer.setSize(baseWidth, baseHeight);
            this.responsivePopupContainer.onResize();
        }
        if (this.swipeScreen) {
            this.swipeScreen.width = _viewInfoUtil.getWindowWidth();
            this.swipeScreen.height = _viewInfoUtil.getWindowHeight();

            this.swipeParent.scale.set(_viewInfoUtil.viewScale);
            this.swipeParent.x = (_viewInfoUtil.getWindowWidth() - this.swipeParent.width) / 2 + 40;
            this.swipeParent.y = (_viewInfoUtil.getWindowHeight() - this.swipeParent.height) / 2 + 40;
        }
        if (this.iosSwipeScreen) {
            this.iosImage.style = "left: " + (_viewInfoUtil.getWindowWidth() / 2 - 128) + "px; position: absolute; top: " + (_viewInfoUtil.getWindowHeight() - 320) / 2 + "px;";
        }
        //title handle for landscape and portraite 
        try {
            if (this.gameTitle || this.gameTitle2) {
                var config = _ng.GameConfig.gameTitle[_viewInfoUtil.device];
                if (config.isLandScapeLogo && this.gameTitle2) {
                    if (viewType === "VL") {
                        this.gameTitle.visible = false;
                        this.gameTitle2.visible = true;
                    } else if (viewType === "VP") {
                        this.gameTitle.visible = true;
                        this.gameTitle2.visible = false;
                    }
                }
                if (this.gameTitle && _viewInfoUtil.device !== "Desktop") {
                    setTimeout(function () {
                        if (this.gameTitle.anchor) {
                            if (this.gameTitle.anchor.x == 0.5) {
                                this.gameTitle.setSize(0, 0);
                            } else if (this.gameTitle.anchor.x == 0) {
                                this.gameTitle.updateSize();
                            }
                        } else {
                            this.gameTitle.setSize(0, 0);
                        }
                    }.bind(this), 0);
                }
                if (this.gameTitle2 && _viewInfoUtil.device !== "Desktop") {
                    setTimeout(function () {
                        if (this.gameTitle2.anchor.x == 0.5) {
                            this.gameTitle2.setSize(0, 0)
                        } else if (this.gameTitle2.anchor.x == 0) {
                            this.gameTitle2.updateSize();
                        }
                    }.bind(this), 0);
                }
            }
        } catch (e) { }

        if (this.iosSwipeScreen) {

            this.gameRules.style.webkitOverflowScrolling = "touch";

            if (this.swipeScreenTimer) {
                clearTimeout(this.swipeScreenTimer);
            }
            this.swipeScreenTimer = setTimeout(function () {
                if (this.coreApp.viewInfoUtil.viewType === "VL") {
                    if (window.innerHeight >= window.screen.width) {
                        this.iosSwipeScreen.style.display = 'none';
                        window.scrollTo(0, 0);
                    } else {
                        this.iosSwipeScreen.style.display = 'block';
                        this.gameRules.style.webkitOverflowScrolling = "unset";
                    }
                }
                if (this.coreApp.viewInfoUtil.viewType === "VP") {
                    this.iosSwipeScreen.style.display = 'none';
                }
                window.scrollTo(0, 0);
            }.bind(this), 500);
        }

        /************************
         * iPhoneX
         * Rotate the device after reaching on last of Game Rules
         * Sometimes Address bar will get minimized 
         * because of that Rules page height was reducing and game was visible
         */
        if (this.iosSwipeScreen) {
            if (!_viewInfoUtil.isIpad() && _viewInfoUtil.isIOS() && !_viewInfoUtil.isIOSChrome()) {
                if (this.coreApp.viewInfoUtil.viewType === "VP") {
                    setTimeout(function () {
                        window.scrollTo(1, 0);
                    }, 300);
                }
            }
        }

        var isIPad = navigator.userAgent.match(/iPad/i);
        if (isIPad && this.gameRules) {
            this.gameRules.style.webkitOverflowScrolling = "touch";
        }

        this.resizeFreezeWindow();
        this.resizeNotificationWindow();
        this.gameSpecificOnResize();
    }

    gameSpecificOnResize() {
        function isiPad() {
            return /iPad/i.test(navigator.userAgent);
        }

        // Check if in history mode - hide buttons if in history mode
        // const urlParams = new URLSearchParams(window.location.search);
        // const hasRoundId = urlParams.has('round_id');
        // const isNormalSpin = urlParams.get('is_normal_spin') === 'true';
        // const isBuyFeature = urlParams.get('is_buy_feature') === 'true';
        // const isSuperBuyFeature = urlParams.get('is_buy_super_feature') === 'true';
        // const isPFR_Feature = urlParams.get('IsPfr') === 'true';

        const isInHistoryMode = (typeof isHistoryMode !== "undefined") ? isHistoryMode : false;
        const viewInfo = (typeof _viewInfoUtil !== "undefined" && _viewInfoUtil) ? _viewInfoUtil : (this.viewInfoUtil || (this.coreApp && this.coreApp.viewInfoUtil));
        if (!viewInfo) {
            return;
        }
        const viewType = viewInfo.viewType;

        if (this.respinText && this.textProperties && this.textProperties[viewType]) {
            pixiLib.setProperties(this.respinText, this.textProperties[viewType]);
        }
        if (viewType === "VD") {
            if (this.replayButton) {
                this.replayButton.scale.set(0.65);
                this.replayButton.position.set(180, 180);
                const urlParamsVD = new URLSearchParams(window.location.search);
                const roundIdVD = urlParamsVD.get('round_id');
                this.replayButton.visible = !!roundIdVD;
            }
            if (this.fadingContainer) {
                this.fadingContainer.position.set(0, 0);
                this.fadingContainer.scale.set(1);
            }
        } else if (viewType === "VP") {
            if (isiPad()) {
                if (this.fadingContainer) this.fadingContainer.position.set(-318, 61);
                if (this.replayButton) {
                    this.replayButton.scale.set(0.85);
                    this.replayButton.position.set(355, 0);
                    const urlParamsVP = new URLSearchParams(window.location.search);
                    const roundIdVP = urlParamsVP.get('round_id');
                    this.replayButton.visible = !!roundIdVP;
                    if (this.logocontainer) this.logocontainer.visible = true;
                }
            } else {
                if (this.fadingContainer) this.fadingContainer.position.set(-312, 81);
                if (this.replayButton) {
                    this.replayButton.scale.set(0.7);
                    const actualWindowWidth = window.innerWidth || 375;
                    const isXSDevice = actualWindowWidth <= 480;
                    const replayY = isXSDevice ? 40 : 0;
                    this.replayButton.position.set(360, replayY);
                    const urlParamsVP = new URLSearchParams(window.location.search);
                    const roundIdVP = urlParamsVP.get('round_id');
                    this.replayButton.visible = !!roundIdVP;
                    if (this.logocontainer) this.logocontainer.visible = true;
                }
            }
            if (this.scatFillAnim) {
                this.scatFillAnim.visible = false;
            }
        } else if (viewType === "VL") {
            if (this.replayButton) {
                this.replayButton.scale.set(0.6);
                this.replayButton.position.set(180, 180);
                const urlParamsVL = new URLSearchParams(window.location.search);
                const roundIdVL = urlParamsVL.get('round_id');
                this.replayButton.visible = !!roundIdVL;
                if (this.logocontainer) this.logocontainer.visible = true;
            }
            if (this.fadingContainer) {
                if (isiPad())
                    this.fadingContainer.position.set(41, -78);
                else
                    this.fadingContainer.position.set(-2, 21);
            }
            if (this.scatFillAnim) {
                this.scatFillAnim.visible = false;
            }
        }
    }

    removeReelView() {
        for (var i = 0; i < this.reelView.length; i++) {
            delete this.reelView.children[i];
        }
        this.reelView.removeChildren();
    }

    repositionReelView() {
        if (this.reelController && this.reelView) {
            var isIPad = navigator.userAgent.match(/iPad/i);
            var reelLayout = _ng.GameConfig.ReelViewUiConfig.layout[_viewInfoUtil.viewType];
            if (isIPad) {
                reelLayout = _ng.GameConfig.ReelViewUiConfig.iPadLayout[_viewInfoUtil.viewType];
            }

            var baseWidth = _ng.GameConfig.gameLayout[this.coreApp.viewInfoUtil.viewType].width;
            var baseHeight = _ng.GameConfig.gameLayout[this.coreApp.viewInfoUtil.viewType].height;

            this.reelView.scale.set(reelLayout.scale);
            this.winController.view.scale.set(reelLayout.scale);
            this.paylineController.view.scale.set(reelLayout.scale);


            //to be used when reelview have some dynamic w/h element
            //using in DaVinci because of spine attached to ReelView
            if (_ng.GameConfig.ReelViewUiConfig.reelViewFixedDimensions) {
                var reelViewContainerX = (baseWidth - _ng.GameConfig.ReelViewUiConfig.reelViewFixedDimensions.w * reelLayout.scale) / 2;
                var reelViewContainerY = (baseHeight - _ng.GameConfig.ReelViewUiConfig.reelViewFixedDimensions.h * reelLayout.scale) / 2;
            } else {
                var reelViewContainerX = (baseWidth - this.reelView.width) / 2;
                var reelViewContainerY = (baseHeight - this.reelView.height) / 2;
            }

            var reelViewContainerMarginLeft = reelLayout.marginLeft;
            var reelViewContainerMarginTop = reelLayout.marginTop;

            this.reelView.x = reelViewContainerX + reelViewContainerMarginLeft;
            this.reelView.y = reelViewContainerY + reelViewContainerMarginTop;

            this.winController.view.x = reelViewContainerX + reelViewContainerMarginLeft;
            this.winController.view.y = reelViewContainerY + reelViewContainerMarginTop;


            this.paylineController.view.x = reelViewContainerX + reelViewContainerMarginLeft;
            this.paylineController.view.y = reelViewContainerY + reelViewContainerMarginTop;
        }
    }

    addDocumentVisibilityEvent() {
        var hidden, visibilityChange;
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }
        document.addEventListener(visibilityChange, this.handleVisibilityChange.bind(this, hidden), false);
    }

    handleVisibilityChange(hiddenVar) {
        /********************************
         * Utility: to stop callNextGameState from executing if window is not fucused
         * return from the function and run again when window is coming into focus.
         * Not needed for local symtems
         * because with the functionality game will stop(for autospin, freespin, respin etc) even if we click on chrome inspector
         * windowFocusChanged is used in slotController
         * 
         */
        if (document[hiddenVar]) {
            _mediator.publish("windowFocusChanged", false);
        } else {
            _mediator.publish("windowFocusChanged", true);
        }
    }

    createCanon() {
        this.canon = pixiLib.getElement("Spine", "Fruitnite-BG-Canon");
        this.mainContainer.addChild(this.canon);
        this.canon.name = "canon";
        this.onGameViewResize();
    }

    playCanonWin() {
        return new Promise((resolve) => {
            var cannonSound = _sndLib.sprite.cannon;
            cannonSound.delay = 500;
            _sndLib.play(_sndLib.sprite.cannon);
            var anim = _viewInfoUtil.viewType == "VP" ? "portrait_win" : "landscape_win";
            var track = this.canon.state.setAnimation(0, anim, false);
            track.onComplete = function () {
                var idleAnim = _viewInfoUtil.viewType == "VP" ? "portrait_idle" : "landscape_idle";
                this.canon.state.setAnimation(0, idleAnim, true);
                resolve();
            }.bind(this);
        });
    }

    sliderFalse() {
        // if (this.volBox) {
        this.volBox.visible = false;
        // this.graBGfrVolumeBar.visible = false;
        // }
        // if (this.blackBg) {
        // this.blackBg.visible= false;
        // }
        // if (this.graBGfrVolumeBar) {
        // this.graBGfrVolumeBar.visible = false;	
        // }

    }

    TweenLogo() {
        TweenMax.to(this.gameTitle, 0.5, {
            width: this.gameTitle.width + 10,
            height: this.gameTitle.height + 10,
            ease: Linear.easeInOut,
            yoyo: true,
            repeat: -1
        })
    }

    addingLogo() {
        // Create logo container (like dede5000) - only create once
        if (!this.logocontainer) {
            this.logocontainer = pixiLib.getContainer();
            this.logocontainer.visible = true; // Ensure container is visible
            this.mainContainer.addChildAt(this.logocontainer, 0);
        }

        // Don't create replay button if it already exists
        if (this.replayButton) {
            return;
        }

        // Add replay animation to logo container (only visible in history mode, no click action - just visual)
        // Check if Spine resource is loaded before creating
        if (PIXI.Loader && PIXI.Loader.shared && PIXI.Loader.shared.resources) {
            const replayResource = PIXI.Loader.shared.resources["replay.json"] || PIXI.Loader.shared.resources["replay"];
            if (!replayResource || !replayResource.spineData) {
                // Try again after a delay
                setTimeout(() => {
                    if (!this.replayButton) {
                        this.addingLogo();
                    }
                }, 1000);
                return;
            }
        }

        try {
            this.replayButton = pixiLib.getElement("Spine", "replay");
            this.replayButton.name = "Replay Animation";
            this.replayButton.state.setAnimation(0, "replay", true);
            this.replayButton.interactive = false; // No interaction, just visual
            this.replayButton.buttonMode = false; // Not a button
            this.logocontainer.addChild(this.replayButton);

            // Check if in history mode (round_id in URL)
            const urlParams = new URLSearchParams(window.location.search);
            const roundId = urlParams.get('round_id');
            const isHistoryMode = !!roundId;
            this.replayButton.visible = isHistoryMode;

        } catch (e) {
            // Try again after a delay
            setTimeout(() => {
                if (!this.replayButton) {
                    this.addingLogo();
                }
            }, 1000);
        }
    }

    toggleFadeContainer(flag) {
        this.fadingContainer.visible = flag;
    }

    resizeForIpad() {
        function isiPad() {
            return /iPad/i.test(navigator.userAgent);
        }
        if (isiPad() && _viewInfoUtil.viewType === "VP") {
            this.fadingContainer.position.set(-316, 38);
            this.gameTitle.visible = true;
        }
        else if (isiPad() && _viewInfoUtil.viewType === "VL") {
            this.fadingContainer.x = -10;
            this.fadingContainer.y = -105;
            this.gameTitle.visible = true;
        }
    }

    toggleTextVisibility() {
        // Check if the spin_type is "freespin" or not
        // In this case, the functionality is the same for both cases.
        this.playFading(this.counter % 5);
        this.counter++;
        if (this.counter == 100) {
            this.counter = 0;
        }
    }

    playFading(val) {

        if (coreApp.gameController.isWindowFocused == false)
            return;

        //setting all the text alpha to 0
        this.fadeTextArr.forEach(text => {
            text.alpha = 0;
        });

        TweenMax.to(this.fadeTextArr[val], 1.2, {
            alpha: 1,
            ease: Power1.easeInOut,
            onComplete: function () {
                for (let index = 0; index < this.fadeTextArr.length; index++) {
                    TweenMax.to(this.fadeTextArr[index], 1.2, {
                        alpha: 0,
                        ease: Power1.easeInOut,
                    });
                }
            }.bind(this)
        });
    }

    onGameInitGame() {
        var multiplier = (coreApp.gameModel.isFreeSpinActive() == false && coreApp.gameModel.getIsFreeSpinEnded() == false) ? _ng.normalMultiplier : _ng.fsMultiplier;
        _mediator.publish('showMultipler', multiplier);
        if (_viewInfoUtil.viewType == "VD") {
            _mediator.publish("SHOW_TICKER_MESSAGE", gameLiterals.tickertext3);
        }
        else {
            _mediator.publish("SHOW_TICKER_MESSAGE", gameLiterals.placeurbet_text);
        }
        // _ng.externalUiController.betUi.updateUi(coreApp.gameModel.getTotalBet());
        // Initialize History Panel View and Controller after game is fully created
        if (!this.historyPanelController) {
            this.createHistoryPanelView();
        }
    }

    showMultiplier() {
        this.multiContainer.visible = true;
        this.gameTitle.visible = false;
    }

    updateMultiplier(id) {
        this.multiContainer.visible = true;

    }

    hideMultiplier() {
        this.multiContainer.visible = false;
        this.gameTitle.visible = true;
    }


    ToggleVolPanel(directlyClose) {
        if (directlyClose == false) {
            this.volBox.visible = directlyClose;
            // this.graBGfrVolumeBar.visible = false;
        }
        else {
            this.volBox.visible = !this.volBox.visible;
            if (this.volBox.visible == false) {
                // this.graBGfrVolumeBar.visible = false;
            }
            else {
                // this.graBGfrVolumeBar.visible = true;
            }
        }
    }

    SliderMoved() {
        var bool;
        if (this.oldSlid == this.NewSlid) {
            _mediator.publish("boolSlid", false);
        }
        else {
            _mediator.publish("boolSlid", true);
        }
    }

    ResizeGview() {
        // this.resizeFadingContainer();
        // this.resizeForIpad();

        if (this.BuyBtnVL) {
            if (_viewInfoUtil.viewType === "VL") {
                this.BuyBtnVL.x = 30;
                this.BuyBtnVL.y = 435;
                this.BuyBtnVL.scale.set(0.6);
                this.BuyBtnVL.visible = true;
            }
            else {
                this.BuyBtnVL.visible = false;
            }
        }

        if (coreApp.gameView.infoPopup.BuypopupPanelCon && coreApp.gameView.infoPopup.returnPopupStatus().visible == true) {
            _mediator.publish("hideandShowBuyfeature", false);
        }
        else if (coreApp.gameView.infoPopup.BuypopupPanelCon && coreApp.gameView.infoPopup.returnPopupStatus().visible == false) {
            _mediator.publish("hideandShowBuyfeature", true);
        }
    }

    onGameViewResize() {
        //Canon resize...
        if (_viewInfoUtil.viewType == "VP") {
            this.canon.state.setAnimation(0, "portrait_idle", true);
            this.canon.scale.set(.5);
            this.canon.position.set((_viewInfoUtil.getWindowWidth() * .5) / this.mainContainer.scale.x, (_viewInfoUtil.getWindowHeight() * .8) / this.mainContainer.scale.y);
        }
        else {
            this.canon.state.setAnimation(0, "landscape_idle", true);
            // this.canon.position.set(1180, 600);
            this.canon.scale.set(.5);
            this.canon.position.set(((_viewInfoUtil.getWindowWidth() - this.mainContainer.x) / this.mainContainer.scale.x) - 100, 600);
            /**
             * Positioning logic...
             * as maincontainer is based on fit by height, the width of container goes outside...
             * the extra width gone out the screen is equal to mainContainer.x...
             * Hence, (_viewInfoUtil.getWindowWidth()-this.mainContainer.x) dividing by mainContainer.scale.x gives values based on 1280x720...
             * -100 -> as canon scale is always .5 and anchor point is on middle of cannon, we have to move it 100px to the left from right border...
             */
        }
    }

    disableBuyFeature() {
        if (this.reelView && this.reelView._buyPanel) {
            this.reelView._buyPanel.disableBuyFeature();
        }
    }

    enableBuyFeature() {
        if (this.reelView && this.reelView._buyPanel) {
            this.reelView._buyPanel.enableBuyFeature();
        }
    }
    CreateScatterWinAnim() {

        _sndLib.play(_sndLib.sprite.transition);
        if (_viewInfoUtil.viewType === "VD" || _viewInfoUtil.viewType === "VL") {
            this.scatFillAnim = pixiLib.getElement("Spine", "transition");
            this.scatFillAnim.position.set(_viewInfoUtil.getWindowWidth() / 2, _viewInfoUtil.getWindowHeight() / 2);
            this.scatFillAnim.width = _viewInfoUtil.getWindowWidth();
            this.scatFillAnim.height = _viewInfoUtil.getWindowHeight();
            this.scatFillAnim.state.setAnimation(0, 'des', false);
        }
        else if (_viewInfoUtil.viewType === "VP") {
            this.scatFillAnim = pixiLib.getElement("Spine", "transition");
            this.scatFillAnim.position.set(_viewInfoUtil.getWindowWidth() / 2, _viewInfoUtil.getWindowHeight() / 2);
            this.scatFillAnim.state.setAnimation(0, 'mob', false);
        }
        this.stage.addChild(this.scatFillAnim);

        setTimeout(function () {
            this.stage.removeChild(this.scatFillAnim);
        }.bind(this), 2500)
    }


    createFadingContainer() {
        const style = {
            align: "center",
            fill: ["#FFFF33", "#ffc927", "#FFFF33"],
            fontFamily: "TTMastersDEMOBlack",
            fontSize: 22,
            stroke: "#8e4121",
            strokeThickness: 6,
            dropShadow: true,
            dropShadowColor: "#3E2723",
        }
        this.fadingContainer = pixiLib.getContainer();
        this.mainContainer.addChild(this.fadingContainer);
        this.fadingContainer.name = "fadingContainer";

        //symbol pay anywhere on the screen
        this.text1 = pixiLib.getContainer();
        this.txt1 = pixiLib.getElement("Text", style);
        this.txt1.name = "symbol pay anywhere on the screen";
        this.txt1.anchor.set(0.5);
        this.txt1.position.set(0, 0);
        pixiLib.setText(this.txt1, gameLiterals.sympay_any);
        this.text1.addChild(this.txt1);
        this.text1.position.set(695, 55);
        this.text1.alpha = 0;
        this.fadingContainer.addChild(this.text1);
        this.fadeTextArr.push(this.text1);

        //MULTIPLIER(symbol) win upto 1000x mutliplier
        this.text3 = pixiLib.getContainer();
        this.txt3 = pixiLib.getElement("Text", style);
        this.txt3.name = "win upto 5000x mutliplier";
        this.txt3.anchor.set(0, 0.5);
        this.txt3.position.set(-224, 0);
        pixiLib.setText(this.txt3, gameLiterals.winupto);
        this.text3.addChild(this.txt3);
        this.fadingContainer.addChild(this.text3);
        this.text3.position.set(755, 55);
        this.text3.alpha = 0;

        //multiplier symbol
        var mSym = pixiLib.getElement("Sprite", "100x");
        mSym.name = "multiplierSymbol";
        mSym.scale.set(0.2);
        mSym.anchor.set(0, 0.5);
        mSym.position.set(-304, 0);
        this.text3.addChild(mSym);

        this.fadeTextArr.push(this.text3);

        //WIN UPTO 25000X  BET
        this.text2 = pixiLib.getContainer();
        this.txt2 = pixiLib.getElement("Text", style);
        this.txt2.name = "WIN UPTO 25000X  BET";
        this.txt2.anchor.set(0.5, 0.5);
        this.txt2.position.set(-60, 0);
        this.text2.addChild(this.txt2);
        pixiLib.setText(this.txt2, gameLiterals.text_screen4);
        this.fadingContainer.addChild(this.text2);
        this.text2.position.set(755, 55);
        // this.text2.visible=false;
        this.text2.alpha = 0;
        this.fadeTextArr.push(this.text2);

        //MULTIPLIER(symbol) MULTIPLIES FINAL TUMBLE WIN
        this.text4 = pixiLib.getContainer();

        this.mSymtxt4 = pixiLib.getElement("Sprite", "100x");
        this.mSymtxt4.name = "multiplierSymbol";
        this.mSymtxt4.scale.set(0.2);
        this.mSymtxt4.anchor.set(0.5, 0.5);
        this.text4.addChild(this.mSymtxt4);

        this.txt4 = pixiLib.getElement("Text", style);
        this.txt4.name = "MULTIPLIES FINAL TUMBLE WIN";
        this.txt4.anchor.set(0.5, 0.5);
        this.txt4.position.set(-60 + this.mSymtxt4.width / 4, 0);
        pixiLib.setText(this.txt4, gameLiterals.multHeading);
        this.text4.addChild(this.txt4);

        this.mSymtxt4.position.x = this.txt4.x - this.txt4.width / 2 - 20;

        this.fadingContainer.addChild(this.text4);
        this.text4.position.set(755, 55);
        this.text4.alpha = 0;


        this.fadeTextArr.push(this.text4);


        //4X SCATTER(symbol) WINS FREE SPINS
        this.text5 = pixiLib.getContainer();
        this.txt5 = pixiLib.getElement("Text", style);
        this.txt5.name = "4X SCATTER WINS FREE SPINS";
        this.txt5.position.set(0, 0);
        this.txt5.anchor.set(0.5);
        pixiLib.setText(this.txt5, gameLiterals.winfree);
        this.text5.addChild(this.txt5);
        this.fadingContainer.addChild(this.text5);
        this.text5.position.set(695, 55);
        this.text5.alpha = 0;

        //scatter symbol
        var scatterSymbol = pixiLib.getElement("Sprite", "s");
        scatterSymbol.name = "scatterSymbol";
        scatterSymbol.scale.set(0.2);
        scatterSymbol.anchor.set(0.5);
        scatterSymbol.x = this.txt5.x - (this.txt5.width / 2) + 57;
        this.text5.addChild(scatterSymbol);

        this.fadeTextArr.push(this.text5);


        // //Game title
        // this.text6 = pixiLib.getContainer();
        // this.fadingTitle = pixiLib.getElement("Sprite","logo_small");
        // this.fadingTitle.name = "SYMBOLS PAY ANYWHERE ON THE SCREEN";
        // this.fadingTitle.position.set(-437,-25);
        // this.text6.addChild(this.fadingTitle);
        // this.fadingContainer.addChild(this.text6);
        // this.text6.scale.set(0.67);
        // this.text6.position.set(686,24);
        // // this.text6.visible=false;
        // this.text6.alpha = 0;
        // this.fadeTextArr.push(this.text6);
        this.FSend = false;

    }

    _hideAndShowOfTwoXButton(bool) {
        if (this.reelView && this.reelView._buyPanel && this.reelView._buyPanel.twoXBetButton) {
            this.reelView._buyPanel.twoXBetButton.visible = bool;
        }
    }

    setRemainingFSpins(count) {
        if (this.reelView && this.reelView._buyPanel) {
            this.reelView._buyPanel.setRemainingFSpins(count);
        }
    }

    hideAndShowBuyControlls(bool) {
        if (this.reelView && this.reelView._buyPanel) {
            this.reelView._buyPanel.showBuyPanelElements(bool);
        }
    }

    checkBalanceForBuyFeature() {
        if (this.reelView && this.reelView._buyPanel) {
            this.reelView._buyPanel.checkBalanceForBuyFeature();
        }
    }

    createHistoryPanelView() {
        // Create History Panel View
        var historyView = new HistoryPanelView();
        historyView.name = "historyPanelView";

        // Add to popup container so it appears on top
        var targetContainer = null;
        if (this.popupContainer) {
            targetContainer = this.popupContainer;
        } else if (coreApp && coreApp.gameView && coreApp.gameView.popupContainer) {
            targetContainer = coreApp.gameView.popupContainer;
        } else {
            return;
        }

        targetContainer.addChild(historyView);

        // Create and connect controller
        this.historyPanelController = new HistoryPanelController();
        this.historyPanelController.setView(historyView);

        // Initialize the view
        historyView.createView();
    }

}


var _ng = _ng || {};
_ng.SlotView = SlotView;
var _ng = _ng || {};
_ng.GView = SlotView;

var GView = SlotView;


function onUnfocus() {
    if (_sndLib.curVolume > 0) {
        _sndLib.focusSound(false);
        _sndLib.focusSoundOff();
    }
}

;

function onFocus() {
    if (_sndLib.curVolume == 0) {
        _sndLib.focusSound(true);
        _sndLib.focusSoundOn();
    }
    if (isMobile && _mediator) {
        _mediator.publish(_events.core.onResize);
    }
}

;

if ( /*@cc_on!@*/ false) { // check for Internet Explorer
    document.onfocusin = onFocus;
    document.onfocusout = onUnfocus;
} else {
    window.onfocus = onFocus;
    window.onblur = onUnfocus;
}

;

if (typeof GView === "undefined") { GView = _ng.SlotView; }
