
var _ng = _ng || {};

_ng.UIConfig = {
    "gameTitle": {
        "type": "spine",
        "defaultAnimation": "animation",
        "Mobile": {
            additionIndex: 2,
            props: {
                "HX": 1160, "HY": 100, "VX": 110, "VY": 50,
                "landScaleX": 0.2, "landScaleY": 0.2, "landAlignX": "RIGHT", "landAlignY": "TOP",
                "portScaleX": 0.2, "portScaleY": 0.2, "portAlignX": "LEFT", "portAlignY": "TOP",
                "portAnchorX": 0.5, "landAnchorX": 0.5,
            },
            // image: { "prefix": "logo_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": ".7", "type": "spriteAnimation", "loop": false},
            image: "logo"
        },
        "Desktop": { additionIndex: 2, image: "logo", props: { x: 1170, y: 60, scale: 0.25, anchor: 0.5 }, delay: 2 }
    },
    "bonusGames": {
        "100": { "symbol": "s" }
    },
    "showIntro": true,

    "gameIntroScreen": {
        //DESKTOP VIEW
        "Desktop": {

            "introImg1": {
                "elementConstructor": "spine",
                "params": {
                    "spineName": "logo",
                    "defaultAnimation": "animation",
                    "animationLoop": true,
                    "props": { "x": 955, "y": 212, anchor: 0.5, scale: { x: 0.4, y: 0.4 } },
                }
            },

            "Transperent_Layer": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 1280, "y": 608, anchor: 1, scale: 0 },
                    "backgroundImage": "Transperent_Layer",
                }
            },

            "indicator1": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 282, "y": 560, anchor: 0.5, scale: 0.8 },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_on1": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 282, "y": 560, anchor: 0.5, scale: 0.8 },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off1": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 282, "y": 560, anchor: 0.5, scale: 0.8 },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea1": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    w: 17, h: 15.5, color: 0xff0000,
                    props: { x: 265, y: 545, scale: 2.05, visible: true }
                }
            },
            "indicator2": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 332, "y": 560, anchor: 0.5, scale: 0.8 },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_on2": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 332, "y": 560, anchor: 0.5, scale: 0.8 },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off2": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 332, "y": 560, anchor: 0.5, scale: 0.8 },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea2": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    w: 17, h: 15.5, color: 0xff2500,
                    props: { x: 314, y: 545, scale: 2.05, visible: true }
                }
            },
            "indicator3": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 382, "y": 560, anchor: 0.5, scale: 0.8 },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_on3": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 382, "y": 560, anchor: 0.5, scale: 0.8 },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off3": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 382, "y": 560, anchor: 0.5, scale: 0.8 },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea3": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    w: 17, h: 15.5, color: 0xff3500,
                    props: { x: 364, y: 545, scale: 2.05, visible: true }
                }
            },
            "introGameLogo": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 810.5, "y": 96, anchor: 1, scale: 0 },
                    "backgroundImage": "Intro_Logo",
                }
            },



            "screen_3": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 340, "y": 291, anchor: 0.5, scale: 0.4, visible: false },
                    "backgroundImage": "Layer 8",
                }
            },
            "Text_screen_3": {
                "elementConstructor": "text",
                "params": {
                    "props": { "x": 146, "y": 495.5, anchor: { x: 0, y: 0.5 }, visible: true, scale: 0.6 },
                    "text": ["text_screen3"],
                    "textStyle": {
                        "fontFamily": "TTMastersDEMOBlack",
                        "fontSize": 32,
                        "fill": "#FFFFFF",
                        "align": "center",
                        "stroke": "#000000",
                        "strokeThickness": 1,
                        "dropShadow": true,
                        "dropShadowAngle": 0.785,
                        "dropShadowDistance": 4,
                        "dropShadowBlur": 4,
                        "dropShadowColor": "#000000",
                        "letterSpacing": 1
                    }
                }
            },

            "screen_2": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 340, "y": 291, anchor: 0.5, scale: 0.4, visible: false },
                    "backgroundImage": "Layer 6",
                }
            },
            "mSym": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 196, "y": 460, anchor: 0, scale: 0.2 },
                    "backgroundImage": "s",
                }
            },
            "Text_screen_2": {
                "elementConstructor": "text",
                "params": {
                    "props": { "x": 168, "y": 486, anchor: { x: 0, y: 0 }, visible: true, scale: 0.6 },
                    "text": ["text_screen1"],
                    "textStyle": {
                        "fontFamily": "TTMastersDEMOBlack",
                        "fontSize": 32,
                        "fill": "#FFFFFF",
                        "align": "center",
                        "stroke": "#000000",
                        "strokeThickness": 1,
                        "dropShadow": true,
                        "dropShadowAngle": 0.785,
                        "dropShadowDistance": 4,
                        "dropShadowBlur": 4,
                        "dropShadowColor": "#000000",
                        "letterSpacing": 1
                    }
                }
            },

            "screen_1": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 340, "y": 291, anchor: 0.5, scale: 0.4 },
                    "backgroundImage": "Layer 7",
                }
            },
            "Text_screen_1": {
                "elementConstructor": "text",
                "params": {
                    "props": { "x": 346, "y": 495.5, anchor: { x: 0.5, y: 0.5 }, visible: true, scale: 0.6 },
                    "text": ["text_screen2"],
                    "textStyle": {
                        "fontFamily": "TTMastersDEMOBlack",
                        "fontSize": 32,
                        "fill": "#FFFFFF",
                        "align": "center",
                        "stroke": "#000000",
                        "strokeThickness": 1,
                        "dropShadow": true,
                        "dropShadowAngle": 0.785,
                        "dropShadowDistance": 4,
                        "dropShadowBlur": 4,
                        "dropShadowColor": "#000000",
                        "letterSpacing": 1
                    }
                }
            },


            //    "Transperent_Layer2": {
            //     "elementConstructor": "sprite",
            //     "params": {
            //        "props": { "x": 1280, "y": 694, anchor: 1, scale:{x:1,y:0.9} },
            //         "backgroundImage": "Transperent_Layer 2",
            //     }
            // },

            "radioButtonOff": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 543, "y": 672, anchor: 0.5, visible: true, scale: 0.67 },
                    "backgroundImage": "Tick_box",
                }
            },
            "radioButtonOn": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 543, "y": 672, anchor: 0.5, visible: true },
                    "backgroundImage": "Tick",
                }
            },
            "bottomText": {
                "elementConstructor": "text",
                "params": {
                    "props": { "x": 570, "y": 675, anchor: { x: 0, y: 0.5 }, visible: true, scale: 0.6 },
                    "text": ["dontshow"],
                    "textStyle": {
                        "fontFamily": "TTMastersDEMOBlack",
                        "fontSize": 32,
                        "fill": "#FFFFFF",
                        "align": "center",
                        "stroke": "#000000",
                        "strokeThickness": 1,
                        "dropShadow": true,
                        "dropShadowAngle": 0.785,
                        "dropShadowDistance": 4,
                        "dropShadowBlur": 4,
                        "dropShadowColor": "#000000",
                        "letterSpacing": 1
                    }
                }
            },
            "radioButtonHitArea": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    w: 35, h: 27.5, color: 0xff0000,
                    props: { x: 521, y: 653, scale: 1.3, visible: true }
                }
            },
            "continueButton": {
                "elementConstructor": "button",
                "params": {
                    "props": { "x": 962, "y": 545, anchor: 0.5, scale: 0.45 },
                    "backgroundImage": "play",
                    options: {
                        textField: {
                            text: ["playBtnText"],
                            props: { x: 0, y: 0, anchor: 0.5 },
                            textStyle: {
                                "fontFamily": "TTMastersDEMOBlack",
                                "fontSize": 60,
                                "fill": "#FFFFFF",
                                "align": "center",
                                "stroke": "#000000",
                                "strokeThickness": 1,
                                "dropShadow": true,
                                "dropShadowAngle": 0.785,
                                "dropShadowDistance": 4,
                                "dropShadowBlur": 4,
                                "dropShadowColor": "#000000",
                                "letterSpacing": 1
                            }
                        },
                        // "hitArea": { "type": "polygon", "params": [-179 * 0.5, -69.049 * 0.5, 178 * 0.5, -72.49 * 0.5, 178 * 0.5, 63.95099999999999 * 0.5, -178 * 0.5, 69.951 * 0.5,] }, 
                    }
                }
            },

        },
        //MOBILE VIEW
        "Mobile": {
            // "introBG": {
            //     "elementConstructor": "sprite",
            //     "params": {
            //         "subscribeToResize": true,
            //         "props": {
            //             "VL": { "x": 0, "y": 0, anchor: 0, scale: 0 },
            //             "VP": { "x": 0, "y": -90, anchor: 0, scale:0 }
            //         },
            //         "backgroundImage": "Intro_Logo",
            //     }
            // },

            "Transperent_Layer": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 640, "y": 333, anchor: 0.5, scale: { x: 0, y: 0 } },
                        "VP": { "x": 360, "y": 540, anchor: 0.5, scale: { x: 0, y: 0 } }
                    },
                    "backgroundImage": "Transperent_Layer",
                }
            },
            "indicator1": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 189, "y": 547, anchor: 0, scale: 0 },
                        "VP": { "x": 290, "y": 790, anchor: 0, scale: 0 }
                    },
                    "backgroundImage": "Fill_circle",
                }
            },


            "Indicator_on1": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                    "props": {
                        "VL": { "x": 190, "y": 547, anchor: 0, scale: 0.7 },
                        "VP": { "x": 290, "y": 790, anchor: 0, scale: 0.7 }
                    },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off1": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                    "props": {
                        "VL": { "x": 190, "y": 547, anchor: 0, scale: 0.7 },
                        "VP": { "x": 290, "y": 790, anchor: 0, scale: 0.7 }
                    },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea1": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    "subscribeToResize": true,

                    w: 17, h: 15.5, color: 0xff0000,
                    props: {
                        "VL": { "x": 200, "y": 555, anchor: 0, scale: 1.5, visible: true },
                        "VP": { "x": 297, "y": 800, anchor: 0, scale: 1.3, visible: true }
                    }
                }
            },
            "indicator2": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 260, "y": 547, anchor: 0, scale: 0 },
                        "VP": { "x": 344, "y": 790, anchor: 0, scale: 0 }
                    },
                    "backgroundImage": "Base_circle",
                }
            },
            "Indicator_on2": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                    "props": {
                        "VL": { "x": 260, "y": 547, anchor: 0, scale: 0.7 },
                        "VP": { "x": 344, "y": 790, anchor: 0, scale: 0.7 }
                    },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off2": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                    "props": {
                        "VL": { "x": 260, "y": 547, anchor: 0, scale: 0.7 },
                        "VP": { "x": 344, "y": 790, anchor: 0, scale: 0.7 }
                    },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea2": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    "subscribeToResize": true,

                    w: 17, h: 15.5, color: 0xff2500,
                    props: {
                        "VL": { "x": 270, "y": 555, anchor: 0, scale: 1.5, visible: true },
                        "VP": { "x": 356, "y": 800, anchor: 0, scale: 1.3, visible: true }
                    }
                }
            },
            "indicator3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 279, "y": 550, anchor: 0, scale: 0 },
                        "VP": { "x": 398, "y": 790, anchor: 0, scale: 0 }
                    },
                    "backgroundImage": "Base_circle",
                }
            },
            "Indicator_on3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                    "props": {
                        "VL": { "x": 330, "y": 547, anchor: 0, scale: 0.7 },
                        "VP": { "x": 398, "y": 790, anchor: 0, scale: 0.7 }
                    },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                    "props": {
                        "VL": { "x": 330, "y": 547, anchor: 0, scale: 0.7 },
                        "VP": { "x": 398, "y": 790, anchor: 0, scale: 0.7 }
                    },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea3": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    "subscribeToResize": true,

                    w: 17, h: 15.5, color: 0xff3500,
                    props: {
                        "VL": { "x": 340, "y": 555, anchor: 0, scale: 1.5, visible: true },
                        "VP": { "x": 418, "y": 800, anchor: 0, scale: 1.3, visible: true }
                    }
                }
            },
            "introGameLogo": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 985, "y": 280, anchor: 0.5, scale: 0.67 },
                        "VP": { "x": 360, "y": 130, anchor: 0.5, scale: 0.5 }
                    },
                    "backgroundImage": "gameLogoVp",
                }
            },
            "screen_3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 37, "y": 85, anchor: 0, scale: 0.5, visible: false },
                        "VP": { "x": 360, "y": 500, anchor: 0.5, scale: 0.5, visible: false }
                    },
                    "backgroundImage": "Layer 8",
                }
            },
            "Text_screen_3": {
                "elementConstructor": "text",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 280, "y": 502, anchor: 0.5, scale: 0.5 },
                        "VP": { "x": 360, "y": 732, anchor: 0.5, scale: 0.55 }
                    },
                    "text": ["text_screen3"],
                    "textStyle": {
                        "fontFamily": "TTMastersDEMOBlack",
                        "fontSize": 32,
                        "fill": "#FFFFFF",
                        "align": "center",
                        "stroke": "#000000",
                        "strokeThickness": 1,
                        "dropShadow": true,
                        "dropShadowAngle": 0.785,
                        "dropShadowDistance": 4,
                        "dropShadowBlur": 4,
                        "dropShadowColor": "#000000",
                        "letterSpacing": 1
                    }
                },
            },
            "screen_2": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 42, "y": 76, anchor: 0, scale: 0.5, visible: false },
                        "VP": { "x": 360, "y": 500, anchor: 0.5, scale: 0.5, visible: false }
                    },
                    "backgroundImage": "Layer 6",
                }
            },
            "mSym": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 182, "y": 468, anchor: 0, scale: 0.2 },
                        "VP": { "x": 225, "y": 710, anchor: { x: 0, y: 0 }, scale: 0.2 }
                    },
                    "backgroundImage": "s",
                }
            },
            "Text_screen_2": {
                "elementConstructor": "text",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 160, "y": 490, anchor: { x: 0, y: 0 }, scale: 0.5 },
                        "VP": { "x": 201, "y": 732, anchor: { x: 0, y: 0 }, scale: 0.55 }
                    },
                    "text": ["text_screen1"],
                    "textStyle": {
                        "fontFamily": "TTMastersDEMOBlack",
                        "fontSize": 32,
                        "fill": "#FFFFFF",
                        "align": "center",
                        "stroke": "#000000",
                        "strokeThickness": 1,
                        "dropShadow": true,
                        "dropShadowAngle": 0.785,
                        "dropShadowDistance": 4,
                        "dropShadowBlur": 4,
                        "dropShadowColor": "#000000",
                        "letterSpacing": 1
                    }
                },
            },
            "screen_1": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 20, "y": 85, anchor: 0, scale: 0.5 },
                        "VP": { "x": 360, "y": 500, anchor: 0.5, scale: 0.5 }
                    },
                    "backgroundImage": "Layer 7",
                }
            },
            "Text_screen_1": {
                "elementConstructor": "text",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 280, "y": 502, anchor: 0.5, scale: 0.5 },
                        "VP": { "x": 360, "y": 732, anchor: 0.5, scale: 0.55 }
                    },
                    "text": ["text_screen2"],
                    "textStyle": {
                        "fontFamily": "TTMastersDEMOBlack",
                        "fontSize": 32,
                        "fill": "#FFFFFF",
                        "align": "center",
                        "stroke": "#000000",
                        "strokeThickness": 1,
                        "dropShadow": true,
                        "dropShadowAngle": 0.785,
                        "dropShadowDistance": 4,
                        "dropShadowBlur": 4,
                        "dropShadowColor": "#000000",
                        "letterSpacing": 1
                    }
                },
            },
            "Transperent_Layer2": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 640, "y": 668, anchor: 0.5, scale: { x: 0, y: 0 } },
                        "VP": { "x": 280, "y": 930, anchor: 0.5, scale: 0 },
                    },
                    "backgroundImage": "Transperent_Layer 2",
                }
            },
            "radioButtonOff": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 462, "y": 668, anchor: 0.5, scale: 0.6 },
                        "VP": { "x": 222, "y": 1100, anchor: 0.5, scale: 0.6 },
                    },
                    "backgroundImage": "Tick_box",
                }
            },
            "radioButtonOn": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 462, "y": 668, anchor: 0.5, scale: 0.6 },
                        "VP": { "x": 222, "y": 1100, anchor: 0.5, scale: 1 },
                    },
                    "backgroundImage": "Tick",
                }
            },
            "bottomText": {
                "elementConstructor": "text",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { x: 495, y: 668, anchor: { x: 0, y: 0.5 }, scale: 0.6 },
                        "VP": { x: 251, y: 1100, anchor: { x: 0, y: 0.5 }, scale: 0.6 },
                    },
                    "text": ["dontshow"],
                    "textStyle": {
                        align: "center",
                        dropShadowAlpha: 0.1,
                        dropShadowAngle: 0,
                        // dropShadowColor: "#FF4500",
                        fill: "#d6f043",
                        fontWeight: "900",
                        letterSpacing: 1,
                        lineJoin: "round",
                        miterLimit: 20,
                        // stroke: "#FF4500",
                        strokeThickness: 10,
                        trim: true,
                        fontSize: 40
                    }
                }
            },
            "radioButtonHitArea": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    w: 40, h: 38, color: 0xff0000,
                    "subscribeToResize": true,
                    "props": {
                        "VL": { x: 439, y: 653, anchor: 0.5, scale: 0.7 },
                        "VP": { x: 208, y: 1085, anchor: 0.5, scale: 0.7 },
                    },

                }
            },
            "continueButton": {
                "elementConstructor": "button",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 623.5, "y": 590, anchor: 0.5, scale: 0.6 },
                        "VP": { "x": 360, "y": 930, anchor: 0.5, scale: 0.6 }
                    },
                    "backgroundImage": "play",
                    options: {
                        textField: {
                            text: ["playBtnText"],
                            props: { x: 0, y: 0, anchor: 0.5 },
                            textStyle: {
                                "fontFamily": "TTMastersDEMOBlack",
                                "fontSize": 60,
                                "fill": "#FFFFFF",
                                "align": "center",
                                "stroke": "#000000",
                                "strokeThickness": 1,
                                "dropShadow": true,
                                "dropShadowAngle": 0.785,
                                "dropShadowDistance": 4,
                                "dropShadowBlur": 4,
                                "dropShadowColor": "#000000",
                                "letterSpacing": 1
                            }
                        },
                    }
                }
            }
        }
    },

    "reelSymbolConfig": {
        // "a":{symbol: {texture: "a"}, frontImage: {texture: "a"},  backImage: {texture: "a"}},
        "a": { symbol: { texture: "a", scale: { x: 0.4, y: 0.4 } } },
        "b": { symbol: { texture: "b", scale: { x: 0.4, y: 0.4 } } },
        "c": { symbol: { texture: "c", scale: { x: 0.4, y: 0.4 } } },
        "d": { symbol: { texture: "d", scale: { x: 0.4, y: 0.4 } } },
        "e": { symbol: { texture: "e", scale: { x: 0.4, y: 0.4 } } },
        "f": { symbol: { texture: "f", scale: { x: 0.4, y: 0.4 } } },
        "g": { symbol: { texture: "g", scale: { x: 0.4, y: 0.4 } } },
        "h": { symbol: { texture: "h", scale: { x: 0.4, y: 0.4 } } },
        "i": { symbol: { texture: "i", scale: { x: 0.4, y: 0.4 } } },
        // "l": { symbol: { texture: "l", scale:{x:0.4,y:0.4} } },
        "m": { symbol: { texture: "m", scale: { x: 0.4, y: 0.4 } } },
        // "w": { symbol: { texture: "w", scale:{x:0.4,y:0.4} } },
        "s": { symbol: { texture: "s", scale: { x: 0.4, y: 0.4 } } },
        "z": { symbol: { texture: "z", scale: { x: 0.4, y: 0.4 } } },
        // "y": { symbol: { texture: "",scale:{x:0.4,y:0.4} } },
    },
    "symbolAnimations": {
        "a": [{ animationDuration: 3000, winSound: { name: "aSym" } }, { "prefix": "a_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3", "props": { x: 0, y: 8.5, "scale": 0 }, "type": "spriteAnimation", }],
        "b": [{ animationDuration: 3000, winSound: { name: "bSym" } }, { "prefix": "b_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3", "props": { x: 0, y: 8.5, "scale": 0 }, "type": "spriteAnimation" }],
        "c": [{ animationDuration: 3000, winSound: { name: "cSym" } }, { "prefix": "c_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3", "props": { x: 0, y: 8.5, "scale": 0 }, "type": "spriteAnimation" }],
        "d": [{ animationDuration: 3000, winSound: { name: "dSym" } }, { "prefix": "d_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3", "props": { x: 0, y: 8.5, "scale": 0 }, "type": "spriteAnimation" }],
        "e": [{ animationDuration: 3000, winSound: { name: "eSym" } }, { "prefix": "e_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3", "props": { x: 0, y: 8.5, "scale": 0 }, "type": "spriteAnimation" }],
        "f": [{ animationDuration: 3000, winSound: { name: "fSym" } }, { "prefix": "f_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": "0.3", "props": { x: 0, y: 8.5, "scale": 0 }, "type": "spriteAnimation" }],
        "g": [{ animationDuration: 3000, winSound: { name: "gSym" } }, { "prefix": "g_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": "0.3", "props": { x: 0, y: 8.5, "scale": 0 }, "type": "spriteAnimation" }],
        "h": [{ animationDuration: 3000, winSound: { name: "hSym" } }, { "prefix": "h_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": "0.3", "props": { x: 0, y: 8.5, "scale": 0 }, "type": "spriteAnimation" }],
        "i": [{ animationDuration: 3000, winSound: { name: "iSym" } }, { "prefix": "i_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": "0.3", "props": { x: 0, y: 8.5, "scale": 0 }, "type": "spriteAnimation" }],
        // "j": [{ animationDuration: 1500, winSound: { name: "jSym" } },   {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "j", "spineName" : "j","props": {x:0, y:0,  "scale":{x:06,y:06}}}],        
        // "l": [{ animationDuration: 1500, winSound: { name: "lSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "Bonus_win", "spineName" : "bonus","props": {x:0, y:0,  "scale":{x:0.5,y:0.5}}}],        
        // "s": [{ animationDuration: 1500, winSound: { name: "sSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "s_win", "spineName" : "scatter","props": {x:0, y:0,  "scale":{x:0,y:0}}}],        
        // "w": [{ animationDuration: 1500, winSound: { name: "wSym" } , offset: { y:-0.5, x: 0.5 } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "w_win", "spineName" : "wild","props": {x:0, y:0,  "scale":{x:0,y:0}}}],    
        //  "s_land": [{ animationDuration: 1500, winSound: { name: "sSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "s_", "spineName" : "scatter","loop":"true","props": {x:0, y:0,  "scale":{x:0,y:0}}}],     
        //  "s_land": [{ animationDuration: 2100, winSound: { name: "sSym" } }, { "prefix": "s_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "loop": false, "type": "spriteAnimation","":""  }],
        // "w": [{ animationDuration: 1440, winSound: { name: "wSym" } }, { "prefix": "w_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "loop": false, "type": "spriteAnimation","":""  }],
        //      "s": [{ animationDuration: 3000, winSound: { name: "sSym" } }, { "prefix": "s_","tween": { "scale": { "x": 0.8, "y": 0.8 } },"tweenDuration":0.1, "startIndex": "0", "endIndex": "47", "digit": "dual", "animationSpeed": "0.3", "props": {x:0, y:10,  "scale": 0.7},"type": "spineAnimation" }],
        "m": [{ animationDuration: 3000, winSound: { name: "sSym" } }, { "prefix": "m_", "startIndex": "0", "endIndex": "47", "digit": "dual", "animationSpeed": "0.3", "props": { x: 0, y: 8.5, "scale": 0 }, "type": "spriteAnimation" }],
        // "s_land": [{ animationDuration: 3000, winSound: { name: "sSymLand" } }, { "prefix": "s_", "startIndex": "0", "endIndex": "24", "digit": "dual", "animationSpeed": "0.2", "props": {x:0, y:10,  "scale":  0.7}, "type": "spriteAnimation" }],
        // "s": [{ animationDuration: 3000, winSound: { name: "sSym" } }, { "prefix": "scatterAnim_", "startIndex": "0", "endIndex": "39", "digit": "dual", "animationSpeed": "0.3","props": {x:7.5, y:-15,  "scale":  {x:0.45,y:0.45}}, "type": "spriteAnimation"}],  
        "s": [{ animationDuration: 2100, winSound: { name: "sLand_4" } }, { "animationSpeed": "0.3", "type": "spine", "winAnimation": "animation", "spineName": "scatter", "props": { x: 0, y: 0, "scale": { x: 0.5, y: 0.5 } } }],
        "s_land": [{ animationDuration: 2100, winSound: { name: "sLand_3" } }, { "animationSpeed": "0.5", "type": "spine", "winAnimation": "animation", "spineName": "scatter", "props": { x: 0, y: 0, "scale": { x: 0.5, y: 0.5 } } }],
    },


    "bigWinView": {
        spineImage: "wins.json",
        setSize: true,
        params: {
            desktopParams: { x: 650, y: 360, anchor: 0.5 },
            HX: 640, HY: 360,
            VX: 360, VY: 620, landScaleX: 1.2, landScaleY: 1.2,
            portScaleX: 0.9, portScaleY: 0.9
        },
        nice: {
            // params: {anchor: {x: 0.5, y: 0.5}, x: 0, y: 0},
            In: "nice_in",
            Loop: "nice_loop",
            Out: "nice_out",
        },
        omg: {
            // params: {anchor: {x: 0.5, y: 0.5}, x: 0, y: 0},
            In: "omg_in",
            Loop: "omg_loop",
            Out: "omg_out"
        },
        super_win: {
            // params: {anchor: {x: 0.5, y: 0.5}, x: 0, y: 0},
            In: "super_in",
            Loop: "super_loop",
            Out: "super_out"
        },
        fantastic_win: {
            // params: {anchor: {x: 0.5, y: 0.5}, x: 0, y: -20, scale: {x: 0.8, y: 0.8}},
            In: "fantastic_in",
            Loop: "fantastic_loop",
            Out: "fantastic_out"
        },
        max_win: {
            // params: {anchor: {x: 0.5, y: 0.5}, x: 0, y: 0},
            In: "max_in",
            Loop: "max_loop",
            Out: "max_out"
        },
        totalWinAmount: {
            params: { anchor: { x: 0.5, y: 0.5 }, x: 0, y: 0, scale: { x: 1, y: 1 } },
            finalPositionY: 0,
            textStyle: {
                "fontFamily": "TTMastersDEMOBlack",
                "dropShadow": true,
                "dropShadowAngle": 0.4,
                "dropShadowBlur": 2,
                "dropShadowColor": "#18181a",
                "dropShadowDistance": 5,
                "fill": "#ffc900",
                "fontSize": 90,
                "fontWeight": 600,
                "miterLimit": 0,
                "stroke": "#e12500",
                "strokeThickness": 8,
                "wordWrap": true,
                "wordWrapWidth": 500,
                "align": "center",
                "lineHeight": 42,
                "letterSpacing": 4,
                "maxWidth": 370,
            }
        }
    },
    "infoPopupView": {
        "errorPopup": {
            params: {
                desktopParams: { x: 640, y: 330, anchor: { x: 0.5, y: 0.5 } },
                HX: 640, HY: 350,
                VX: 360, VY: 560, portScaleX: 0.85, portScaleY: 0.85
            },
            background: {
                bgImage: "panelBgIn",
                props: { scale: 0.6, anchor: { x: 0.5, y: 0.5 } }
            },
            descriptionText: {
                props: { x: 0, y: -55, anchor: { x: 0.5, y: 0.5 } },
                text: "Freespins Awarded",
                textStyle: {
                    "dropShadow": true,
                    "dropShadowDistance": 2,
                    "fontFamily": "Arial",
                    "fill": "#ffc800",
                    "fontSize": 60,
                    "maxWidth": 540,
                    "fontWeight": "bold",
                    "align": "center",
                    "strokeThickness": 1
                }
            },
            fsValue: {
                props: { x: -195, y: -100, anchor: { x: 0.5, y: 0.5 } },
                "textStyle": {
                    "dropShadow": true,
                    "dropShadowDistance": 2,
                    "fill": "#ffec3e",
                    "fontSize": 40,
                    "fontWeight": "bolder",
                    "strokeThickness": 1
                }
            },

            "continueButton": {
                props: { x: 0, y: 128, scale: 0.6, anchor: { x: 0.5, y: 0.5 } },
                bgImage: "Collect",
            },

            continueText: {
                props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                text: "",
                "textStyle": {
                    fill: "#af0000c7",
                    fontFamily: "Arial Black",
                    fontSize: 46,
                    fontWeight: "bolder",
                    stroke: "#f7a94f",
                    strokeThickness: 6,
                }
            },

        },
        //start freespin popup
        "freeSpinPopup": {
            params: {
                desktopParams: { x: 640, y: 360, anchor: { x: 0.5, y: 0.5 } },
                HX: 640, HY: 350,
                VX: 360, VY: 560, portScaleX: 0.85, portScaleY: 0.85
            },
            background: {
                bgImage: "popup_in",
                inAnimation: "in",
                loopAnimation: "loop",
                outAnimation: "out",
                props: { anchor: { x: 0.5, y: 0.5 }, scale: 0.6 }
            },
            text1: {
                props: { x: 0, y: -21, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: ["freespin_text1"],
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 70,
                    "fill": ["#ffd401"],
                    "fillGradientType": 0,
                    "fillGradientStops": [1, 0.83, 0.69, 0.62, 0.5, 0.37, 0.11],
                    "stroke": "#d43b06",
                    "strokeThickness": 5,
                    "dropShadow": true,
                    "dropShadowDistance": 9,
                    "dropShadowBlur": 7,
                    "dropShadowColor": "#350000",
                    "letterSpacing": 4,
                    "align": "center"
                }
            },
            text2: {
                props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: ["freespin_text2"],
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 70,
                    "fill": ["#ffd401"],
                    "fillGradientType": 0,
                    "fillGradientStops": [1, 0.83, 0.69, 0.62, 0.5, 0.37, 0.11],
                    "stroke": "#d43b06",
                    "strokeThickness": 5,
                    "dropShadow": true,
                    "dropShadowDistance": 9,
                    "dropShadowBlur": 7,
                    "dropShadowColor": "#350000",
                    "letterSpacing": 4,
                    "align": "center"
                }
            },
            fsValue: {
                props: { x: 0, y: 15, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                "textStyle": {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 110,
                    "fill": ["#f6edc3"],
                    "stroke": "#d43b06",
                    "strokeThickness": 5,
                    "dropShadow": true,
                    "dropShadowDistance": 9,
                    "dropShadowBlur": 7,
                    "dropShadowColor": "#670c0b",
                    "letterSpacing": 4,
                    "align": "center"
                }
            },
            text3: {
                props: { x: 0, y: 47, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: ["freespin_text3"],
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 70,
                    "fill": ["#ffd401"],
                    "fillGradientType": 0,
                    "fillGradientStops": [1, 0.83, 0.69, 0.62, 0.5, 0.37, 0.11],
                    "stroke": "#d43b06",
                    "strokeThickness": 5,
                    "dropShadow": true,
                    "dropShadowDistance": 9,
                    "dropShadowBlur": 7,
                    "dropShadowColor": "#350000",
                    "letterSpacing": 4,
                    "align": "center"
                }
            },
            text4: {
                props: { x: 0, y: -17, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: ["freespin_text4"],
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 33,
                    "fill": ["#fc972e", "#fff83b", "#fefda5", "#fffb46", "#fda633", "#fffb48", "#ff6600"],
                    "fillGradientType": 0,
                    "fillGradientStops": [1, 0.83, 0.69, 0.62, 0.5, 0.37, 0.11],
                    "stroke": "#000000",
                    "strokeThickness": 1,
                    "dropShadow": true,
                    "dropShadowAngle": 1.57079,
                    "dropShadowDistance": 6,
                    "dropShadowBlur": 4,
                    "dropShadowColor": "#350000",
                    "letterSpacing": 0,
                    "align": "center",
                    "maxWidth": "486"
                }
            },
        },
        //end freespin popup
        "freeSpinEndPopup": {
            params: {
                desktopParams: { x: 640, y: 360, anchor: { x: 0.5, y: 0.5 } },
                HX: 640, HY: 350,
                VX: 360, VY: 560, portScaleX: 0.85, portScaleY: 0.85
            },
            background: {
                bgImage: "popup_in",
                inAnimation: "in",
                loopAnimation: "loop",
                outAnimation: "out",
                props: { anchor: { x: 0.5, y: 0.5 }, scale: 0.6, x: 0, y: -40 }
            },
            continueButton: {
                props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                bgImage: "Collect"
            },
            doubleButton: {
                props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                bgImage: "X2"
            },

            collectText: {
                props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                text: "",
                "textStyle": {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 53,
                    "fill": ["#ffd401"],
                    "fillGradientType": 0,
                    "fillGradientStops": [1, 0.83, 0.69, 0.62, 0.5, 0.37, 0.11],
                    "stroke": "#471313",
                    "strokeThickness": 5,
                    "dropShadow": true,
                    "dropShadowDistance": 9,
                    // "dropShadowBlur": 7,
                    // "dropShadowColor": "#471313",
                    "align": "center"
                }
            },
            rewardText: {
                props: { x: 0, y: 46, anchor: { x: 0.5, y: 0.5 } },
                text: "",
                "textStyle": {
                    fill: "#f7fb03",
                    fontFamily: "TTMastersDEMOBlack",
                    fontSize: 24,
                    stroke: "#311c03",
                    strokeThickness: 4,
                    maxWidth: 185,
                }
            },
            text1: {
                props: { x: 0, y: -21, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: ["freespin_text1"],
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 70,
                    "fill": ["#ffd401"],
                    "fillGradientType": 0,
                    "fillGradientStops": [1, 0.83, 0.69, 0.62, 0.5, 0.37, 0.11],
                    "stroke": "#d43b06",
                    "strokeThickness": 5,
                    "dropShadow": true,
                    "dropShadowDistance": 9,
                    "dropShadowBlur": 7,
                    "dropShadowColor": "#350000",
                    "letterSpacing": 4,
                    "align": "center"
                }
            },
            text2: {
                props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: ["freespin_text5"],
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 70,
                    "fill": ["#ffd401"],
                    "fillGradientType": 0,
                    "fillGradientStops": [1, 0.83, 0.69, 0.62, 0.5, 0.37, 0.11],
                    "stroke": "#d43b06",
                    "strokeThickness": 5,
                    "dropShadow": true,
                    "dropShadowDistance": 9,
                    "dropShadowBlur": 7,
                    "dropShadowColor": "#350000",
                    "letterSpacing": 4,
                    "align": "center"
                }
            },
            winAmountTxt: {
                props: { x: 0, y: 15, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },

                "textStyle": {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 70,
                    "fill": ["#f6edc3"],
                    "stroke": "#d43b06",
                    "strokeThickness": 5,
                    "dropShadow": true,
                    "dropShadowDistance": 9,
                    "dropShadowBlur": 7,
                    "dropShadowColor": "#670c0b",
                    "letterSpacing": 4,
                    "align": "center"
                }
            },
            text3: {
                props: { x: 0, y: 47, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: ["freespin_text6"],
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 70,
                    "fill": ["#ffd401"],
                    "fillGradientType": 0,
                    "fillGradientStops": [1, 0.83, 0.69, 0.62, 0.5, 0.37, 0.11],
                    "stroke": "#d43b06",
                    "strokeThickness": 5,
                    "dropShadow": true,
                    "dropShadowDistance": 9,
                    "dropShadowBlur": 7,
                    "dropShadowColor": "#350000",
                    "letterSpacing": 4,
                    "align": "center",
                    "maxWidth": "650"
                }
            },
            text4: {
                props: { x: 0, y: -17, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: ["freespin_text4"],
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 33,
                    "fill": ["#fc972e", "#fff83b", "#fefda5", "#fffb46", "#fda633", "#fffb48", "#ff6600"],
                    "fillGradientType": 0,
                    "fillGradientStops": [1, 0.83, 0.69, 0.62, 0.5, 0.37, 0.11],
                    "stroke": "#000000",
                    "strokeThickness": 1,
                    "dropShadow": true,
                    "dropShadowAngle": 1.57079,
                    "dropShadowDistance": 6,
                    "dropShadowBlur": 4,
                    "dropShadowColor": "#350000",
                    "letterSpacing": 0,
                    "align": "center",
                    "maxWidth": "453"
                }
            },
        },
        "realityCheckPopup": {
            params: {
                desktopParams: { x: 640, y: 330, anchor: { x: 0.5, y: 0.5 } },
                HX: 640, HY: 320,
                VX: 360, VY: 560, portScaleX: 0.85, portScaleY: 0.85
            },
            background: {
                bgImage: "panelBgIn",
                props: { anchor: { x: 0.5, y: 0.5 } }
            },
            fsTitle: {
                bgImage: "txt_Congratulations_YourWon",
                props: { x: 0, y: -60, anchor: { x: 0.5, y: 0.5 } }
            },
            fsWinValue: {
                props: { x: 0, y: 70, anchor: { x: 0.5, y: 0.5 } },
                "textStyle": {
                    "type": "BitmapFont",
                    // "font": "45px digitsIn-export"
                    "fontName": "winnum-export",
                    "fontSize": 45
                }
            },

            "continueButton": {
                props: { x: 0, y: 135, anchor: { x: 0.5, y: 0.5 } },
                bgImage: "Cntinue",
                options: {
                    textField: {
                        text: "CONTINUE",
                        props: { x: 0, y: 15, anchor: { x: 0.5, y: 0.5 } },
                        textStyle: {
                            fill: "#6F4000",
                            fontSize: 25,
                            fontFamily: "COPRGTB"
                        }
                    }
                }
            },

            "closeButton": {
                props: { x: 0, y: 124, anchor: { x: 0.5, y: 0.5 } },
                bgImage: "Cntinue",
                options: {
                    textField: {
                        text: "CONTINUE",
                        props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                        textStyle: {
                            fill: "#6F4000",
                            fontSize: 25,
                            fontFamily: "COPRGTB"
                        }
                    }
                }
            },


            continueText: {
                props: { x: 0, y: 127, anchor: { x: 0.5, y: 0.5 } },
                text: "CONTINUE",
                "textStyle": {
                    fontSize: 38,
                    fontFamily: "ProximaNova_Bold",
                    fill: 0x5d2202,
                    stroke: 0xFFFFFF,
                    strokeThickness: 6,
                    align: 'center'
                }
            },
        },
        "BuyFSPopup": {
            params: {
                desktopParams: { x: 640, y: 360, anchor: { x: 0.5, y: 0.5 }, scale: 1 },
                HX: 640,
                HY: 350,
                VX: 360,
                VY: 560,
                portScaleX: 1,
                portScaleY: 1,
            },
            background: {
                bgImage: "superWinPopupBase",
                props: { anchor: { x: 0.5, y: 0.5 }, scale: 0.67 },
            },
            descriptionText: {
                props: { x: 0, y: -40, anchor: { x: 0.5, y: 0.5 } },
                text: "",
                textStyle: {
                    dropShadow: false,
                    dropShadowColor: "#ef0aff",
                    fill: "#ffffff",
                    // fontFamily: "Tahoma",
                    fontFamily: "Arial",
                    fontSize: 30,
                    fontWeight: "bold",
                    stroke: "#ef0aff",
                    strokeThickness: 6,
                    align: "center",
                    lineHeight: 90,
                }
            },
            buyAmountText: {
                props: { x: 0, y: 26, anchor: 0.5 },
                text: "",
                textStyle: {
                    fill: "#F5BB0F",
                    fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                    fontSize: 52,
                    fontWeight: "bolder",
                    stroke: "#F5BB0F",
                    strokeThickness: 4,
                }
            },
            cancelButton: {
                bgImage: "closeSuperWin",
                props: { x: -140, y: 100, anchor: 0.5, scale: 0.6 }
            },
            confirmButton: {
                bgImage: "correct",
                props: { x: 140, y: 100, anchor: 0.5, scale: 0.6 }
            },
        },
        "superBuyFSPopup": {
            params: {
                desktopParams: { x: 640, y: 360, anchor: { x: 0.5, y: 0.5 }, scale: 1 },
                HX: 640,
                HY: 350,
                VX: 360,
                VY: 560,
                portScaleX: 1,
                portScaleY: 1,
            },
            background: {
                bgImage: "superWinPopupBase",
                props: { anchor: { x: 0.5, y: 0.5 }, scale: 0.67 },
            },
            descriptionText: {
                props: { x: 0, y: -40, anchor: { x: 0.5, y: 0.5 } },
                text: "",
                textStyle: {
                    dropShadow: false,
                    dropShadowColor: "#ef0aff",
                    fill: "#ffffff",
                    // fontFamily: "Tahoma",
                    fontFamily: "Arial",
                    fontSize: 29,
                    fontWeight: "bold",
                    stroke: "#ef0aff",
                    strokeThickness: 6,
                    align: "center",
                    lineHeight: 90,
                }
            },
            buyAmountText: {
                props: { x: 0, y: 26, anchor: 0.5 },
                text: "",
                textStyle: {
                    fill: "#F5BB0F",
                    fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                    fontSize: 52,
                    fontWeight: "bolder",
                    stroke: "#F5BB0F",
                    strokeThickness: 4,
                }
            },
            cancelButton: {
                bgImage: "closeSuperWin",
                props: { x: -140, y: 100, anchor: 0.5, scale: 0.6 }
            },
            confirmButton: {
                bgImage: "correct",
                props: { x: 140, y: 100, anchor: 0.5, scale: 0.6 }
            },
        },
        "goldWinPopup": {
            params: {
                desktopParams: { x: 640, y: 360, anchor: { x: 0.5, y: 0.5 }, scale: 1 },
                HX: 640,
                HY: 350,
                VX: 360,
                VY: 460,
                portScaleX: 1,
                portScaleY: 1,
            },
            multiplierText: {
                props: { x: 0, y: -100, anchor: 0.5 },
                text: "",
                textStyle: {
                    "type": "BitmapFont",
                    "fontName": "box-Multiplier",
                    "fontSize": 100,
                    "align": "center"
                }
            },
        },
        "gamblePopup": {
            params: {
                desktopParams: { x: 640, y: 360, anchor: { x: 0.5, y: 0.5 }, scale: 1 },
                HX: 640,
                HY: 350,
                VX: 360,
                VY: 560,
                portScaleX: 0.85,
                portScaleY: 0.85,
                landScaleX: 0.85,
                landScaleY: 0.85
            },
            background: {
                spineImage: "Popup_reward",
                props: { x: 0, y: -20, anchor: { x: 0.5, y: 0.5 }, scale: 0.6 },
                animationState: {
                    In: "Intro",
                    Idle_L: "Idle_left_basket",
                    Idle_R: "Idle_right_basket",
                    // LOOP: "loop",
                    Blue_Lose: "Looping_left_lose",
                    Red_Lose: "Looping_right_lose",
                    Blue_Win: "Looping_left_winning",
                    Red_Win: "Looping_right_winning",
                }
            },
            headingText: {
                props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                text: "",
                textStyle: {
                    dropShadowColor: "#e0dbe0",
                    fill: "#ffffff",
                    fontFamily: 'TTMastersDEMOBlack',
                    fontSize: 50,
                    stroke: "#55039d",
                    align: "center",
                }
            },
            subHeadText: {
                props: { x: 0, y: 0, anchor: 0.5 },
                text: "",
                textStyle: {
                    dropShadowColor: "#e0dbe0",
                    fill: "#ffffff",
                    fontFamily: 'TTMastersDEMOBlack',
                    fontSize: 36,
                    stroke: "#55039d",
                    align: "center",
                }
            },
            anywhereText: {
                props: { x: 0, y: 190, anchor: 0.5 },
                text: "",
                textStyle: {
                    dropShadowColor: "#e0dbe0",
                    fill: "#ffffff",
                    fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                    fontSize: 18,
                    fontWeight: "bolder",

                    align: "center",
                }
            },
            tossBtnText: {
                props: { x: 0, y: 0, anchor: 0.5 },
                text: "",
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 65,
                    "fill": ["#fed52f"],
                    "fillGradientType": 0,
                    "fillGradientStops": [1, 0.83, 0.69, 0.62, 0.5, 0.37, 0.11],
                    "stroke": "#be0808",
                    "strokeThickness": 5,
                    "dropShadow": true,
                    "dropShadowDistance": 9,
                    // "dropShadowBlur": 7,
                    // "dropShadowColor": "#550c0c",
                    "align": "center"
                }
            },
            amountText: {
                props: { x: 0, y: 0, anchor: 0.5 },
                text: "",
                textStyle: {
                    "type": "BitmapFont",
                    "fontName": "dedeBitmap",
                    "fontSize": 56,
                    "align": "center"

                }
            },
            redButton: {
                bgImage: "basket",
                props: { x: 142, y: 2, anchor: 0.5, scale: 0.6, alpha: 0 }
            },
            blueButton: {
                bgImage: "basket",
                props: { x: -118, y: 1, anchor: 0.5, scale: 0.6, alpha: 0 }
            },
            tossButton: {
                bgImage: "TOSS",
                props: { x: 0, y: 173, anchor: 0.5, scale: 0.6 }
            },
            backButton: {
                bgImage: "Back",
                // props: { x: -584, y : -237, anchor: 0.5, scale : 0.6 }
                props: {
                    VD: { x: -580, y: -237, anchor: 0.5, scale: 0.47 },
                    VP: { x: -335, y: -400, anchor: 0.5, scale: 0.8 },
                    VL: { x: -675, y: -203, anchor: 0.5, scale: 0.6 }
                }
            },
        },
        "extraFsPopup": {
            params: {
                desktopParams: { x: 647, y: 345, anchor: { x: 0.5, y: 0.5 }, scale: 0.9 },
                HX: 680,
                HY: 360,
                VX: 360,
                VY: 400,
                portScaleX: 0.9,
                portScaleY: 0.9,
                landScaleX: 0.8,
                landScaleY: 0.8,
            },
            background: {
                bgImage: "Extra Spins_box",
                props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 }, scale: 0.5 },
            },
            descriptionText: {
                props: { x: 0, y: -20, anchor: { x: 0.5, y: 0.5 } },
                text: "",
                textStyle: {
                    align: "center",
                    fill: ["#FFFF33", "#ffc927", "#FFFF33"],
                    fontFamily: "TTMastersDEMOBlack",
                    fontSize: 52,
                    stroke: "#8e4121",
                    strokeThickness: 6,
                    dropShadow: true,
                    dropShadowColor: "#3E2723",
                }
            }
        },
        "buyConfig": {
            params: {
                desktopParams: { x: 640, y: 360, anchor: { x: 0.5, y: 0.5 } },
                HX: 640, HY: 300,
                VX: 360, VY: 560, portScaleX: 1, portScaleY: 1
            },
            background: {
                bgImage: "buy_free_spins",
                inAnimation: "in",
                loopAnimation: "loop",
                outAnimation: "out",
                props: { scale: 0.6, anchor: { x: 0.5, y: 0.5 } }
            },
            yesButton: {
                bgImage: "yes-btn-popup",
                props: { scale: { x: 0.9, y: -0.9 }, anchor: { x: 0.5, y: 0.5 }, x: -61, y: 0 }
            },
            noButton: {
                bgImage: "no-button",
                props: { scale: { x: 0.9, y: -0.9 }, anchor: { x: 0.5, y: 0.5 }, x: 68, y: 0 }
            },
            text1: {
                props: { x: 0, y: -21, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: ["buy_feature_text1"],
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 45,
                    "fill": "#fffef9",
                    "align": "center",
                    "leading": 11.72,
                    "stroke": "#1c156b",
                    "strokeThickness": 5,
                    "wordWrap": true,
                    "wordWrapWidth": 850,
                    "letterSpacing": 4,
                    "fontWeight": "bold",
                    "dropShadow": true,
                    "dropShadowAngle": 1.8,
                    "dropShadowColor": "#d43b06",
                    "dropShadowDistance": 6
                }
            },
            text2: {
                props: { x: -62, y: -63, anchor: { x: 0, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: ["buy_feature_text2"],
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 45,
                    "fill": "#fffef9",
                    "align": "center",
                    "leading": 11.72,
                    "stroke": "#1c156b",
                    "strokeThickness": 5,
                    "wordWrap": true,
                    "wordWrapWidth": 850,
                    "letterSpacing": 4,
                    "fontWeight": "bold",
                    "dropShadow": true,
                    "dropShadowAngle": 1.8,
                    "dropShadowColor": "#d43b06",
                    "dropShadowDistance": 6
                }
            },
            text3: {
                props: { x: 0, y: -35, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: ["buy_feature_text3"],
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 45,
                    "fill": "#fffef9",
                    "align": "center",
                    "leading": 11.72,
                    "stroke": "#1c156b",
                    "strokeThickness": 5,
                    "wordWrap": true,
                    "wordWrapWidth": 850,
                    "letterSpacing": 4,
                    "fontWeight": "bold",
                    "dropShadow": true,
                    "dropShadowAngle": 1.8,
                    "dropShadowColor": "#d43b06",
                    "dropShadowDistance": 6,
                    "maxWidth": 700,
                }
            },
            fsValue: {
                props: { x: -129, y: 76, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: "10",
                "textStyle": {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 60,
                    "fill": ["#ffda28"],
                    "fillGradientType": 0,
                    "fillGradientStops": [1, 0.83, 0.69, 0.62, 0.5, 0.37, 0.11],
                    "stroke": "#000000",
                    "strokeThickness": 1,
                    "dropShadow": true,
                    "dropShadowAngle": 1.57079,
                    "dropShadowDistance": 6,
                    "dropShadowBlur": 1,
                    "dropShadowColor": "#350000",
                    "letterSpacing": 4,
                    "align": "center"
                }
            }
        },
        "superbuyConfig": {
            params: {
                desktopParams: { x: 640, y: 360, anchor: { x: 0.5, y: 0.5 } },
                HX: 640, HY: 300,
                VX: 360, VY: 560, portScaleX: 1, portScaleY: 1
            },
            background: {
                bgImage: "buy_free_spins",
                inAnimation: "in",
                loopAnimation: "loop",
                outAnimation: "out",
                props: { scale: 0.6, anchor: { x: 0.5, y: 0.5 } }
            },
            yesButton: {
                bgImage: "yes-btn-popup",
                props: { scale: { x: 0.9, y: -0.9 }, anchor: { x: 0.5, y: 0.5 }, x: -61, y: 0 }
            },
            noButton: {
                bgImage: "no-button",
                props: { scale: { x: 0.9, y: -0.9 }, anchor: { x: 0.5, y: 0.5 }, x: 68, y: 0 }
            },
            text1: {
                props: { x: 0, y: -40, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: ["super_buy_feature_text1"],
                textStyle: {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 36,
                    "fill": "#fffef9",
                    "align": "center",
                    "leading": 11.72,
                    "stroke": "#1c156b",
                    "strokeThickness": 5,
                    "wordWrap": true,
                    "wordWrapWidth": 850,
                    "letterSpacing": 4,
                    "fontWeight": "bold",
                    "dropShadow": true,
                    "dropShadowAngle": 1.8,
                    "dropShadowColor": "#d43b06",
                    "dropShadowDistance": 6,
                    // "maxWidth":650,
                }
            },
            fsValue: {
                props: { x: -129, y: 76, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: -1 } },
                text: "10",
                "textStyle": {
                    "fontFamily": "TTMastersDEMOBlack",
                    "fontSize": 60,
                    "fill": ["#ffda28"],
                    "fillGradientType": 0,
                    "fillGradientStops": [1, 0.83, 0.69, 0.62, 0.5, 0.37, 0.11],
                    "stroke": "#000000",
                    "strokeThickness": 1,
                    "dropShadow": true,
                    "dropShadowAngle": 1.57079,
                    "dropShadowDistance": 6,
                    "dropShadowBlur": 1,
                    "dropShadowColor": "#350000",
                    "letterSpacing": 4,
                    "align": "center"
                }
            }
        },
    },
    "intervals": { "eachLineWinDelay": 1440 },
    //SOUNDS ADDING...
    "sounds": {
        "filePath": "dist/slots/treasuresofegypt/sounds/",
        "fileName": "GameSounds.json",
        "bgMinVolume": 0.4,

        "sprite": {

            /********************************************/


            "intro": { name: "intro" },
            "bg": { name: "main_theme", volume: 1 },


            "spinStartBtn": { name: "reels_start_button" },
            "spinStopBtn": { name: "reels_stop" },
            "reelStart": { name: "reels_start_button" },
            "reelSpinning": { name: "reels_run", volume: 0 },
            "reelStop": { name: "reels_stop" },
            "anticipation": { name: "anticipation" },


            /*********** Big Win Animation ************/
            "counterLoop": { name: "counterLoop" },
            "counterBigWinLoop": { name: "counterLoop" },
            "counterMegaWinLoop": { name: "counterLoop" },
            "counterSuperMegaWinLoop": { name: "counterLoop" },
            "counterEnd": { name: "counterEnd" },

            "nice": { name: "nice" },
            "omg": { name: "omg" },
            "super_win": { name: "super" },
            "fantastic_win": { name: "fantastic" },

            "bigWinDisappear": { name: "superMegaWinDissapear" },
            "megaWinDisappear": { name: "superMegaWinDissapear" },
            "superMegaWinDisappear": { name: "superMegaWinDissapear" },


            /********************************************/

            //button clicks
            "btnClick": { name: "commonBtn" },

            //notification
            "notification": { name: "notification" },

            // Panel 
            "coinValueChange": { name: "commonBtn" },
            "maxbetBtnClick": { name: "commonBtn" },
            "autoSpinBtnClick": { name: "commonBtn" },
            "autoSpinSelClick": { name: "commonBtn" },

            // Menu
            "menuBtnClick": { name: "commonBtn" },// done
            "menuBtnCloseClick": { name: "commonBtn" },    // done        
            "paytableBtnClick": { name: "commonBtn" },// done
            "settingsBtnClick": { name: "commonBtn" },// done
            "gRulesBtnClick": { name: "commonBtn" },// done
            "fullScreenBtnClick": { name: "commonBtn" },// done
            "soundBtnClick": { name: "commonBtn" },// done

            // Settings window
            "sCloseBtnClick": { name: "commonBtn" },  // done
            "sSoundSelBtnClick": { name: "commonBtn" }, // done
            "sAmbienceBtnClick": { name: "commonBtn" }, // done
            "sQuickSpinBtnClick": { name: "commonBtn" }, // done
            "sAnyWinBtnClick": { name: "commonBtn" }, // done
            "sWinLimitBtnClick": { name: "commonBtn" }, // done
            "sWinLimitSelBtnClick": { name: "commonBtn" }, // done
            "sLossLimitBtnClick": { name: "commonBtn" }, // done
            "sLossLimitSelBtnClick": { name: "commonBtn" }, // done 

            // Paytable window            
            "pArrowBtnClick": { name: "commonBtn" },  // done
            "pCloseBtnClick": { name: "commonBtn" }, // done
            "pIndicatorBtnClick": { name: "commonBtn" }, // done

            /********************************************/


            //Popup Sounds            
            "showPopup": { name: "showPopup" },//done
            "hidePopup": { name: "hidePopup" },//done
            "errorPopup": { name: "notification" },//done
            "Meter_Amount_Revel": { name: "Meter_Amount_Revel" },
            //freespin appear
            "bgFS": { name: "freespins_theme", fadeIn: true, fadeOut: true, volume: 1 },
            "fsAwardPopup": { name: "freespins_intro_window_open" },
            "fsWinPopup": { name: "freespin_outro_window_open" },

            /********************************************/
            "aSym": { name: "red_apple" },
            "bSym": { name: "green_apple" },
            "cSym": { name: "grape" },
            "dSym": { name: "lemon" },
            "eSym": { name: "kiwi" },
            "fSym": { name: "banana" },
            "gSym": { name: "strawberry" },
            "hSym": { name: "orange" },
            "iSym": { name: "mellon" },
            "jSym": { name: "lowPaySym" },
            "kSym": { name: "lowPaySym" },
            "lSym": { name: "bonus" },
            "wSym": { name: "wildSym" },
            "sSym": { name: "scatter" }, // bonusSym
            "sSymLand": { name: "bonusSym_land" },

            //features settings            
            "symbolsFireEnergyShots": { name: "symbolsFireEnergyShots" },
            "progressBarFill1": { name: "progressBarFill1" },
            "progressBarFill2": { name: "progressBarFill2" },
            "progressBarFill3": { name: "progressBarFill3" },
            "progressBarFill4": { name: "progressBarFill4" },
            "progressBarFill5": { name: "progressBarFill5" },
            "stickyWildReelAppear": { name: "stickyWildReelAppear" },
            "goldenFrameOnReel": { name: "goldenFrameOnReel" },
            "goldenFrameOnReel2": { name: "goldenFrameOnReel2" },


            "multiplier": { name: "multiplier" },
            "totalmultiplication": { name: "totalmultiplication" },
            "multiplierIncrease": { name: "multiplier_increase" },
            "pop1": { name: "Regular Burst1", volume: 0.5 },
            "pop2": { name: "Regular Burst1", volume: 0.5 },
            "pop3": { name: "Regular Burst1", volume: 0.5 },
            "pop4": { name: "Regular Burst1", volume: 0.5 },
            "pop5": { name: "Regular Burst1", volume: 0.5 },
            "pop6": { name: "Regular Burst1", volume: 0.5 },

            "sLand_0": { name: "scatter_landing_1" },
            "sLand_1": { name: "scatter_landing_2" },
            "sLand_2": { name: "scatter_landing_3" },
            "sLand_3": { name: "scatter_landing_3" },
            "sLand_4": { name: "scatter_landing_3" },
            "sLand_5": { name: "scatter_landing_3" },
            "scatter_play": { name: "scatter" },
            "move_down": { name: "reels_stop" },

            "scatter_Open": { name: "scatter_opening" },
            "symbolAnim": { name: "symbolAnim1" },
            "Coin_Shoot": { name: "Coin_ShootV" },
            "tossWin": { name: "BasketUI_Win" },
            "tossLoss": { name: "BasketUI_Lose" },
            "gambleBG": { name: "BasketUI_Loop" },
            "basketShuffle": { name: "BasketUI_IN" },
            "basketSelect": { name: "BasketUI_Select" },
            "BasketUI_OUT": { name: "BasketUI_OUT" },
            "goldReward": { name: "scatter_landing" },
            "boxOpen": { name: "Candy_Box" },
            "transition": { name: "transition" },
            "cannon": { name: "cannon" }
        }
    },

    realityCheck: {
        isRealiyCheck: false,
        timeOut: 60,                 //in Minutes
        homePath: "../",
        params: {
            desktopParams: { x: 640, y: 300, anchor: { x: 0.5, y: 0.5 } },
            HX: 640,
            HY: 350,
            VX: 360,
            VY: 560,
            portScaleX: 0.8,
            portScaleY: 0.8
        },
        background: {
            bgImage: "alertBox",
            props: { anchor: { x: 0.5, y: 0.5 } }
        },
        contentTxt: {
            props: { x: 0, y: -90, anchor: { x: 0.5, y: 0.5 } },
            text: "contentMsg",
            textStyle: { fontFamily: "ProximaNova", fontSize: 40, fill: "#000000", align: "center", lineHeight: 90, maxWidth: 600 }
        },
        totalBetTxt: {
            props: { x: 0, y: 4, anchor: { x: 0.5, y: 0.5 } },
            text: "total_loss",
            textStyle: { fontFamily: "ProximaNova", fontSize: 40, fill: "#000000", align: "left", lineHeight: 90, maxWidth: 600, padding: 10 }
        },
        totalWinTxt: {
            props: { x: 0, y: 52, anchor: { x: 0.5, y: 0.5 } },
            text: "total_win",
            textStyle: { fontFamily: "ProximaNova", fontSize: 40, fill: "#000000", align: "left", lineHeight: 90, maxWidth: 600, padding: 10 }
        },

        closeBtn: {
            props: { x: -140, y: 125, anchor: { x: 0.5, y: 0.5 }, scale: { x: 0.8, y: 0.8 } },
            bgImage: "alertCancelBtn",
            options: {
                textField: {
                    props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                    text: "close_txt",
                    textStyle: { fontSize: 30, fontFamily: "ProximaNova_Bold", fill: 0x000000, align: "center" }
                }
            }
        },
        historyBtn: { //UKGC
            props: { x: 0, y: 125, anchor: { x: 0.5, y: 0.5 }, scale: { x: 0.8, y: 0.8 } },
            bgImage: "alertOkBtn",
            options: {
                textField: {
                    props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                    text: "History",
                    textStyle: { fontSize: 30, fontFamily: "ProximaNova_Bold", fill: 0x000000, align: "center", maxWidth: 150 }
                }
            }
        },
        continueBtn: {
            bgImage: "alertOkBtn",
            props: { x: 140, y: 125, anchor: { x: 0.5, y: 0.5 }, scale: { x: 0.8, y: 0.8 } },
            options: {
                textField: {
                    props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                    text: "continue_txt",
                    textStyle: { fontSize: 30, fontFamily: "ProximaNova_Bold", fill: 0x000000, align: "center" }
                }
            }
        }
    },
};
