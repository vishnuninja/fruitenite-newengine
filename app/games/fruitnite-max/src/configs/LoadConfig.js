var _ng = _ng || {};

_ng.LoadConfig = {
    "gameFiles": {
        "common": [
            // "libs/pixi-spine-3.8.js",
            "libs/gsap.min.js",
            "libs/PixiPlugin.min.js",
            "configs/BGUIConfig.js",
            "controllers/GSlotController.js",
            "controllers/GWinController.js",
            "controllers/GPanelController.js",
            "configs/ReelViewUIConfig.js",
            "configs/PaytableViewUIConfig.js",
            "views/GReelSymbol.js",
            "views/GView.js",
            "views/GReelView.js",
            "views/GWinView.js",
            "views/TumbleReelStrip.js",
            "model/gSpinData.js",
            "model/GCoreApp.js",
            "model/GPanelModel.js",
            "model/GfsModel.js",
            "views/GInfoPopupView.js",
            "views/GBGView.js",
            "views/GSoundLib.js",
            "views/GBigWinView.js",
            "views/GIntroView.js",
            "views/RoyalRewardView.js",
             "views/GSlider.js",
             "model/GSlotModel.js",
             "controllers/GreelController.js",
             "controllers/GErrorController.js",
             "views/GErrorView.js",
             "utils/wagerNormalization.js",
             "views/GHistoryPanelView.js",
             "controllers/GHistoryPanelController.js",
             "controllers/GambleController.js",
         
        ],
        "Desktop": [
            "controllers/PanelDesktopController.js",
        ],
        "Mobile": [
            "controllers/PanelMobileController.js",
            "views/GHistoryPanelMobileView.js",
        ]
    },
    'gameLoadingAssets': {
    },
    'gamePrimaryAssets': {
        "common": {
            "allResolutions": [
                "paytable.json", "symbols.json", "menu0.json","zSym.json",
                "winnum-export.xml","featureBitmapFont-export.xml","Numbers-export.xml","m_anim.json","dedeBitmap.xml","reel_frame.json","box-Multiplier.xml",
                "popAnim-0.json","continuebtn.json","companyLogo.json","gold_win.json","liquid_jar_Final.json",
                 "wins.json","tickerbase.json","BuyFreespinPanel.json","betChance.json","sidePanelUI.json","leftPanelAssets.json",
                 "fruitniteMax_Introscreen.json","portraitBuyFeature.json","CoinShower-0.json","CoinShower-1.json","fadingTexts.json","sugarBoxFont-export.xml","extraAssets.json","autoSpinBase.json","panelButtons.json",
                 "newGamePanel.json","autoplaybase.json","autoplayPopup.json","betPopup.json",,"newSetting.json","closesetting.json","autoSpin.json","turboActive.json","volumeBar.json","stopButtonAssets.json","scatter.json","superFreeSpinPopup.json","multiplier_static.json",
                 "buyFeature_VP.json","playstpbtn.json","replay.json",
                    /* NEW */
                 "apple_green.json","apple_red.json","banana.json","grapes.json","kiwi.json","lemon.json","strawberry.json","watermelon.json","orange.json","popup_in.json","buy_free_spins.json",
                 "transition.json","multiplayer.json","character_flying.json","logo.json","gambleAssets.json","Popup_reward.json","character_flying.json","buy_button.json","pomegranate_sym.json",
                 "pomegranate_multipliers.json","popupBG.json","BG_Fruitnite-Animation.json","Fruitnite-BG-Canon.json"
            ],
            "@2x": []
        },
        "Desktop": {
            "allResolutions": ["newGamePanel.json"],
            "@2x": []
        },
        "Mobile": {
            "allResolutions": ["newGamePanel.json"],
            "@2x": []
        }
    },
    "secondaryAssets": [
        {
            "assets": {
                "common": {
                    "allResolutions": [
                       
                        
                    ],
                    "@2x": []
                },
                "Desktop": { "allResolutions": [], "@2x": [] },
                "Mobile": {
                    "allResolutions": [],
                    "@2x": []
                }
            }
        }
    ],
    "fontsToLoad": {
        "primaryFonts": {
            "ProximaNova_Bold": "ProximaNova_XtraConmdcensedBold.woff",
            "ProximaNova": "ProximaNova_XtraConmdcensedRegular.woff",
            "Britanic_Bold": "BRITANIC.ttf",
            "andadaBold": "andadaBold.otf",
            "Saman": "saman.ttf",
            "BodoniModa":"BodoniModa-VariableFont_opsz,wght.ttf",
            "TTMastersDEMOBlack" : "TTMastersDEMOBlack.otf"

        }
    }
};
