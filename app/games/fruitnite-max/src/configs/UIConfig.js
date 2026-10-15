
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
            image:"logo"
        },
        "Desktop": { additionIndex: 2, image: "logo", props: { x:1170, y: 60, scale:0.25, anchor:0.5  },delay : 2 }
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
                    "spineName":"logo",
                    "defaultAnimation": "animation",
                    "animationLoop" : true,
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
                   "props": { "x": 810.5, "y": 96, anchor:1, scale: 0 },
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
                "props": { "x": 146, "y": 495.5, anchor: { x: 0, y: 0.5  }, visible: true, scale: 0.6 },
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
               "props": { "x": 340, "y": 291, anchor: 0.5, scale: 0.4, visible: false},
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
                "props": { "x": 168, "y": 486, anchor: { x: 0, y: 0  }, visible: true, scale: 0.6 },
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
                "props": { "x": 346, "y": 495.5, anchor: { x: 0.5, y: 0.5  }, visible: true, scale: 0.6 },
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
                    "props": { "x": 543, "y": 672, anchor: 0.5, visible: true ,scale:0.67},
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
                    "props": { "x": 570, "y": 675, anchor: { x: 0, y: 0.5  }, visible: true, scale: 0.6 },
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
                    "VL": { "x": 640, "y": 333, anchor: 0.5, scale:{x:0,y:0} },
                    "VP": { "x": 360, "y": 540, anchor: 0.5, scale:{x:0,y:0} }
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
                    "VP": { "x": 290, "y": 790, anchor: 0, scale:0}
                },
                    "backgroundImage": "Fill_circle",
                }
            },
            
           
            "Indicator_on1": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                   "props": { 
                    "VL": { "x": 190, "y": 547, anchor: 0,scale:0.7},
                    "VP": { "x": 290, "y": 790, anchor: 0, scale:0.7 }
                    },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off1": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                   "props": {  
                     "VL": { "x": 190, "y": 547, anchor: 0, scale:0.7 },
                   "VP": { "x": 290, "y": 790, anchor: 0, scale:0.7 } },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea1": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    "subscribeToResize": true,

                    w: 17, h: 15.5, color: 0xff0000,
                    props: { 
                        "VL": { "x":200, "y": 555, anchor: 0, scale: 1.5,visible:true },
                        "VP": { "x": 297, "y": 800, anchor: 0, scale:1.3,visible:true }
                     }
                }
            },
            "indicator2": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                   "props": {
                    "VL": { "x": 260, "y": 547, anchor: 0, scale: 0 },
                    "VP": { "x": 344, "y": 790, anchor: 0, scale:0 }
                },
                    "backgroundImage": "Base_circle",
                }
            },
            "Indicator_on2": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                   "props": { 
                    "VL": { "x": 260, "y": 547, anchor: 0 ,scale:0.7},
                    "VP": { "x": 344, "y": 790, anchor: 0, scale:0.7 }
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
                    "VP": { "x": 344, "y": 790, anchor: 0, scale:0.7 }
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
                        "VL": { "x": 270, "y": 555, anchor: 0, scale: 1.5,visible:true },
                        "VP": { "x": 356, "y": 800, anchor: 0, scale:1.3,visible:true }
                     }
                }
            },
            "indicator3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                   "props": {
                    "VL": { "x": 279, "y": 550, anchor: 0, scale: 0 },
                    "VP": { "x": 398, "y": 790, anchor: 0, scale:0 }
                },
                    "backgroundImage": "Base_circle",
                }
            },
            "Indicator_on3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                   "props": {
                    "VL": { "x": 330, "y": 547, anchor: 0, scale:0.7},
                    "VP": { "x": 398, "y": 790, anchor: 0, scale:0.7 }
                    },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                   "props": { 
                    "VL": { "x": 330, "y": 547, anchor: 0, scale:0.7},
                    "VP": { "x": 398, "y": 790, anchor: 0, scale:0.7 }
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
                        "VL": { "x": 340, "y": 555, anchor: 0, scale: 1.5,visible:true },
                        "VP": { "x": 418, "y": 800, anchor: 0, scale:1.3,visible:true }
                     }
                }
            },
            "introGameLogo": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                   "props": {
                    "VL": { "x": 985, "y": 280, anchor: 0.5, scale: 0.67 },
                    "VP": { "x": 360, "y": 130, anchor: 0.5, scale:0.5 }
                },
                    "backgroundImage": "gameLogoVp",
                }
            },
            "screen_3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                   "props": { 
                    "VL": { "x": 37, "y": 85, anchor: 0, scale: 0.5 ,visible:false},
                    "VP": { "x": 360, "y":500, anchor: 0.5, scale:0.5,visible:false }
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
                        "VP": { "x": 360, "y": 732, anchor: 0.5, scale:0.55 }
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
                    "VL": { "x": 42, "y": 76, anchor: 0, scale: 0.5,visible:false },
                    "VP": { "x": 360, "y": 500, anchor: 0.5, scale:0.5,visible:false  }
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
                    "VP": { "x": 225, "y": 710, anchor: {x: 0, y: 0}, scale:0.2 }
                    },
                    "backgroundImage": "s",
                }
            },
            "Text_screen_2": {
                "elementConstructor": "text",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 160, "y": 490, anchor: { x: 0 , y: 0}, scale: 0.5 },
                        "VP": { "x": 201, "y": 732, anchor: { x: 0 , y: 0}, scale:0.55 }
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
                   "VL": { "x": 20, "y": 85, anchor: 0, scale: 0.5},
                   "VP": { "x": 360, "y": 500, anchor: 0.5, scale:0.5 }
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
                    "VP": { "x": 360, "y": 732, anchor: 0.5, scale:0.55 }
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
                   "VL": { "x": 640, "y": 668, anchor: 0.5 ,scale:{x:0,y:0}},
                   "VP": { "x": 280, "y": 930, anchor: 0.5,scale:0 },
               },
                "backgroundImage": "Transperent_Layer 2",
            }
        },
            "radioButtonOff": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 462, "y": 668, anchor: 0.5,scale:0.6  },
                        "VP": { "x": 222, "y": 1100, anchor: 0.5,scale:0.6 },
                    },
                    "backgroundImage": "Tick_box",
                }
            },
            "radioButtonOn": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 462, "y": 668, anchor: 0.5,scale:0.6  },
                        "VP": { "x": 222, "y": 1100, anchor: 0.5,scale: 1},
                    },
                    "backgroundImage": "Tick",
                }
            },
            "bottomText": {
                "elementConstructor": "text",
                "params": {                   
                    "subscribeToResize": true,
                    "props": {
                        "VL": { x: 495, y: 668, anchor: {x: 0, y: 0.5},scale:0.6 },
                        "VP": { x: 251, y: 1100, anchor: {x: 0, y: 0.5},scale:0.6 },
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
                        "VL": { x: 439, y: 653, anchor: 0.5,scale:0.7 },
                        "VP": { x: 208, y: 1085, anchor: 0.5,scale:0.7 },
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

    // "paylinesConfig": 
    //     // {"line": "1", "start": 1, "end": 15, x: 245, y: 328, "scaleX": 1, "scaleY": 1},
    //     // {"line": "2", "start": 1, "end": 15, x: 245, y: 181, "scaleX": 1, "scaleY": 1},
    //     // {"line": "3", "start": 1, "end": 15, x: 245, y: 477, "scaleX": 1, "scaleY": 1},
    //     // {"line": "4", "start": 1, "end": 15, x: 242, y: 150, "scaleX": 1, "scaleY": 1},
    //     // {"line": "5", "start": 1, "end": 15, x: 249, y: 150, "scaleX": 1, "scaleY": 1},
    //     // {"line": "6", "start": 1, "end": 15, x: 245, y: 330, "scaleX": 1, "scaleY": 1},
    //     // {"line": "7", "start": 1, "end": 15, x: 242, y: 149, "scaleX": 1, "scaleY": 1},
    //     // {"line": "8", "start": 1, "end": 15, x: 241, y: 310, "scaleX": 1, "scaleY": 1},
    //     // {"line": "9", "start": 1, "end": 15, x: 244, y: 329, "scaleX": 1, "scaleY": 1},
    //     // {"line": "10", "start": 1, "end": 15, x: 240, y: 310, "scaleX": 1, "scaleY": 1}
    //      {
    //         "1":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_1,2,3", loop: false, props: {x:610, y: 310+40,  scale: 0.6 }, type: "spine" } ],	
    //         "2":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_1,2,3", loop: false, props: {x:610, y: 140+20,   scale: 0.6 }, type: "spine" } ],	
    //         "3":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_1,2,3", loop: false, props: {x:610, y: 500+25,   scale: 0.6 }, type: "spine" } ],	
    //         "4":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_4", loop: false, props: {x:600, y: 350-30, scale: {x:0.6, y:0.6} }, type: "spine" } ],	
    //         "5":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_5", loop: false, props: {x:610, y: 350, scale: {x:0.6, y:0.6} }, type: "spine" } ],	
    //         "6":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_6", loop: false, props: { x:600, y: 300, scale: {x:0.5, y:0.5} }, type: "spine" } ],	
    //         "7":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_7", loop: false, props: {  x:600, y: 350, scale:{x:0.6, y:0.5} }, type: "spine" } ],	
    //         "8":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_8", loop: false, props: {  x:600, y: 350, scale: {x:0.6, y:0.7} }, type: "spine" } ],	
    //         "9":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_9", loop: false, props: {  x:600-20, y: 350, scale: {x:0.6, y:0.7} }, type: "spine" } ],	
    //         "10":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_10", loop: false, props: { x:600-10, y: 350, scale: {x:0.6, y:0.7}}, type: "spine" } ],	
    //         "11":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_11", loop: false, props: { x:600-20, y: 350, scale: {x:0.55, y:0.7} }, type: "spine" } ],	
    //         "12":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_12", loop: false, props: {x:600-20, y: 350, scale: 0.55 }, type: "spine" } ],	
    //         "13":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_13", loop: false, props: {x:600-20, y: 350, scale: {x:0.6, y:0.6}}, type: "spine" } ],	
    //         "14":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_14", loop: false, props: {x:600, y: 350, scale: {x:0.6, y:0.6} }, type: "spine" } ],	
    //         "15":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_15", loop: false, props: {x:600, y: 350, scale: {x:0.6, y:0.7} }, type: "spine" } ],	
    //         "16":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_16", loop: false, props: { x:600, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "17":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_17", loop: false, props: {x:600, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "18":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_18", loop: false, props: {x:600, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "19":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_19", loop: false, props: {x:600, y: 350, scale: {x:0.55, y:0.6} }, type: "spine" } ],	
    //         "20":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_20", loop: false, props: {x:600, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "21":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_21", loop: false, props: {x:600, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "22":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_22", loop: false, props: {x:600-20, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "23":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_23", loop: false, props: {x:600, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "24":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_24", loop: false, props: {x:600-20, y: 350, scale: {x:0.6, y:0.6} }, type: "spine" } ],	
    //         "25":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_25", loop: false, props: {x:600-20, y: 350, scale: {x:0.6, y:0.6} }, type: "spine" } ],	
    //     },
        "reelSymbolConfig": {
            // "a":{symbol: {texture: "a"}, frontImage: {texture: "a"},  backImage: {texture: "a"}},
            "a": { symbol: { texture: "a", scale:{x:0.4,y:0.4} } },
            "b": { symbol: { texture: "b", scale:{x:0.4,y:0.4} } },
            "c": { symbol: { texture: "c", scale:{x:0.4,y:0.4} } },
            "d": { symbol: { texture: "d" , scale:{x:0.4,y:0.4}} },
            "e": { symbol: { texture: "e", scale:{x:0.4,y:0.4} } },
            "f": { symbol: { texture: "f", scale:{x:0.4,y:0.4} } },
            "g": { symbol: { texture: "g", scale:{x:0.4,y:0.4} } },
            "h": { symbol: { texture: "h", scale:{x:0.4,y:0.4} } },
            "i": { symbol: { texture: "i", scale:{x:0.4,y:0.4} } },
            // "l": { symbol: { texture: "l", scale:{x:0.4,y:0.4} } },
            "m": { symbol: { texture: "m", scale:{x:0.4,y:0.4} } },
            // "w": { symbol: { texture: "w", scale:{x:0.4,y:0.4} } },
            "s": { symbol: { texture: "s",scale:{x:0.4,y:0.4} } },
            "z": { symbol: { texture: "z",scale:{x:0.4,y:0.4} } },
            // "y": { symbol: { texture: "",scale:{x:0.4,y:0.4} } },
        },
        // "reelSymbolConfigHit": {
        //     // "a":{symbol: {texture: "a"}, frontImage: {texture: "a"},  backImage: {texture: "a"}},
        //     "a": { spineSymbol: "a" ,"props" :{x:0, y:-4,"scale":{x:0.22,y:0.22}} },
        //     "b": { spineSymbol: "b" ,"props" :{x:0, y:2,"scale":{x:0.22,y:0.22}} },
        //     "c": { spineSymbol: "c" ,"props" :{x:0, y:2,"scale":{x:0.22,y:0.22}} },
        //     "d": { spineSymbol: "d" ,"props" :{x:0, y:1.5,"scale":{x:0.22,y:0.22}} },
        //     "e": { spineSymbol: "e" ,"props" :{x:0, y:2,"scale":{x:0.22,y:0.22}} },
        //     "f": { spineSymbol: "f" ,"props" :{x:2.75, y:2,"scale":{x:0.22,y:0.22}} },
        //     "g": { spineSymbol: "g" ,"props" :{x:1, y:0.75,"scale":{x:0.22,y:0.22}} },
        //     "h": { spineSymbol: "h" ,"props" :{x:0, y:4,"scale":{x:0.22,y:0.22}} },
        //     "i": { spineSymbol: "i" ,"props" :{x:0.5, y:5.5,"scale":{x:0.22,y:0.22}} },
        //     // "j": { spineSymbol: "b" ,"props" :{x:0, y:0,"scale":{x:0.22,y:0.22}} },
        //     // "l": { spineSymbol: "bonus" ,"props" :{x:0, y:0,"scale":{x:0.22,y:0.22}} },
        //     "m": { spineSymbol: "wild" ,"props" :{x:0.5, y:-1,"scale":{x:0.22,y:0.22}} },
        //     "s": { spineSymbol: "Scatter" ,"props" :{x:0.5, y:-4,"scale":{x:0.22,y:0.22}} },
        // },
    // "symbolAnimations": {
    //     "a": [{ animationDuration: 1440, winSound: { name: "aSym" } }, { "prefix": "a_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine", "winAnimation":"win"}],
    //     "b": [{ animationDuration: 1440, winSound: { name: "bSym" } }, { "prefix": "b_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation": "win"}],
    //     "c": [{ animationDuration: 1440, winSound: { name: "cSym" } }, { "prefix": "c_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":"win" }],
    //     "d": [{ animationDuration: 1440, winSound: { name: "dSym" } }, { "prefix": "d_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "e": [{ animationDuration: 1440, winSound: { name: "eSym" } }, { "prefix": "e_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "f": [{ animationDuration: 1440, winSound: { name: "fSym" } }, { "prefix": "f_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "g": [{ animationDuration: 1440, winSound: { name: "gSym" } }, { "prefix": "g_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "h": [{ animationDuration: 1440, winSound: { name: "hSym" } }, { "prefix": "h_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "i": [{ animationDuration: 1440, winSound: { name: "iSym" } }, { "prefix": "i_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "j": [{ animationDuration: 1440, winSound: { name: "jSym" } }, { "prefix": "j_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "k": [{ animationDuration: 1440, winSound: { name: "kSym" } }, { "prefix": "k_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "s": [{ animationDuration: 1440, winSound: { name: "sSym" } }, { "prefix": "s_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "w": [{ animationDuration: 1440, winSound: { name: "wSym" } }, { "prefix": "w_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "loop": false, "type": "spine","winAnimation":""  }],
    //     "wexp": [{ animationDuration: 1440, winSound: { name: "wSymLand" } }, { "prefix": "wexp_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    // },
    "symbolAnimations": {        
        "a": [{ animationDuration: 3000, winSound: { name: "aSym" } }, { "prefix": "a_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation",}],
        "b": [{ animationDuration: 3000, winSound: { name: "bSym" } }, { "prefix": "b_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "c": [{ animationDuration: 3000, winSound: { name: "cSym" } }, { "prefix": "c_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "d": [{ animationDuration: 3000, winSound: { name: "dSym" } }, { "prefix": "d_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "e": [{ animationDuration: 3000, winSound: { name: "eSym" } }, { "prefix": "e_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "f": [{ animationDuration: 3000, winSound: { name: "fSym" } }, { "prefix": "f_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "g": [{ animationDuration: 3000, winSound: { name: "gSym" } }, { "prefix": "g_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "h": [{ animationDuration: 3000, winSound: { name: "hSym" } }, { "prefix": "h_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "i": [{ animationDuration: 3000, winSound: { name: "iSym" } }, { "prefix": "i_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        // "j": [{ animationDuration: 1500, winSound: { name: "jSym" } },   {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "j", "spineName" : "j","props": {x:0, y:0,  "scale":{x:06,y:06}}}],        
        // "l": [{ animationDuration: 1500, winSound: { name: "lSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "Bonus_win", "spineName" : "bonus","props": {x:0, y:0,  "scale":{x:0.5,y:0.5}}}],        
        // "s": [{ animationDuration: 1500, winSound: { name: "sSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "s_win", "spineName" : "scatter","props": {x:0, y:0,  "scale":{x:0,y:0}}}],        
        // "w": [{ animationDuration: 1500, winSound: { name: "wSym" } , offset: { y:-0.5, x: 0.5 } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "w_win", "spineName" : "wild","props": {x:0, y:0,  "scale":{x:0,y:0}}}],    
        //  "s_land": [{ animationDuration: 1500, winSound: { name: "sSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "s_", "spineName" : "scatter","loop":"true","props": {x:0, y:0,  "scale":{x:0,y:0}}}],     
        //  "s_land": [{ animationDuration: 2100, winSound: { name: "sSym" } }, { "prefix": "s_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "loop": false, "type": "spriteAnimation","":""  }],
         // "w": [{ animationDuration: 1440, winSound: { name: "wSym" } }, { "prefix": "w_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "loop": false, "type": "spriteAnimation","":""  }],
    //      "s": [{ animationDuration: 3000, winSound: { name: "sSym" } }, { "prefix": "s_","tween": { "scale": { "x": 0.8, "y": 0.8 } },"tweenDuration":0.1, "startIndex": "0", "endIndex": "47", "digit": "dual", "animationSpeed": "0.3", "props": {x:0, y:10,  "scale": 0.7},"type": "spineAnimation" }],
         "m": [{ animationDuration: 3000, winSound: { name: "sSym" } }, { "prefix": "m_", "startIndex": "0", "endIndex": "47", "digit": "dual", "animationSpeed": "0.3", "props": {x:0, y:8.5,  "scale":  0},"type": "spriteAnimation" }],
    // "s_land": [{ animationDuration: 3000, winSound: { name: "sSymLand" } }, { "prefix": "s_", "startIndex": "0", "endIndex": "24", "digit": "dual", "animationSpeed": "0.2", "props": {x:0, y:10,  "scale":  0.7}, "type": "spriteAnimation" }],
    // "s": [{ animationDuration: 3000, winSound: { name: "sSym" } }, { "prefix": "scatterAnim_", "startIndex": "0", "endIndex": "39", "digit": "dual", "animationSpeed": "0.3","props": {x:7.5, y:-15,  "scale":  {x:0.45,y:0.45}}, "type": "spriteAnimation"}],  
    "s": [{ animationDuration: 2100, winSound: { name: "sLand_4" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "animation", "spineName" : "scatter","props": {x:0, y:0,  "scale":{x:0.5,y:0.5}}}],        
    "s_land": [{ animationDuration: 2100, winSound: { name: "sLand_3" }},{  "animationSpeed": "0.5", "type": "spine", "winAnimation" : "animation", "spineName" : "scatter","props": {x:0, y:0,  "scale":{x:0.5,y:0.5}}}], 
},
    // "symbolAnimations": {        
    //     "a": [{ animationDuration: 2100, winSound: { name: "aSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "a","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     "b": [{ animationDuration: 2100, winSound: { name: "bSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "b","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     "c": [{ animationDuration: 2100, winSound: { name: "cSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "c","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],       
    //     "d": [{ animationDuration: 2100, winSound: { name: "dSym" } },   {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "d","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],       
    //     "e": [{ animationDuration: 2100, winSound: { name: "eSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "A", "spineName" : "lv","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     "f": [{ animationDuration: 2100, winSound: { name: "fSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "k", "spineName" : "lv","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],       
    //     "g": [{ animationDuration: 2100, winSound: { name: "gSym" } },  {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "q", "spineName" : "lv","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     "h": [{ animationDuration: 2100, winSound: { name: "hSym" } },   {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "j", "spineName" : "lv","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     "i": [{ animationDuration: 2100, winSound: { name: "iSym" } },   {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "10", "spineName" : "lv","props": {x:0, y:0,  "scale":{x:0.66,y:0.66}}}],        
    //     // "j": [{ animationDuration: 2100, winSound: { name: "jSym" } },   {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "j", "spineName" : "j","props": {x:0, y:0,  "scale":{x:0.66,y:0.66}}}],        
    //     "l": [{ animationDuration: 2100, winSound: { name: "lSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "bonus","props": {x:0, y:0,  "scale":{x:0.5,y:0.5}}}],        
    //     "s": [{ animationDuration: 2100, winSound: { name: "sSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "scatter","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     "w": [{ animationDuration: 2100, winSound: { name: "wSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "wild","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     // "s_land": [{ animationDuration: 2100, winSound: { name: "wSym" } }, { "prefix": "w_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "loop": false, "type": "spriteAnimation","":""  }],
    //     "s_land": [{ animationDuration: 2100, winSound: { name: "wSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "hit", "spineName" : "scatter","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    
    // },
    menuConfigOffset: {
        Desktop: {
            homeButton: {
                type: "Button",
                props: {
                    img: "mHomeBtn",
                    VD: { x: 40, y: 333, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: 1 } },
                    "options": {
                        hitArea: { type: "circle", params: { x: 0, y: 0, r: 20 } }
                    }
                }
            },
            menuCloseBtn: {
                type: "Button",
                props: {
                    img: "mCloseBtn",
                    VD: { x: 40, y: 675,scale:1 , anchor: { x: 0.5, y: 0.5 } },
                    "options": {
                        hitArea: { type: "circle", params: { x: 0, y: 0, r: 0 } }
                    }
                }
            },
            menuOpenBtn: {
                type: "Button",
                props: {
                    img: "mOpenBtn",
                    VD: { x: 40, y: 675,scale:0.67 , anchor: { x: 0.5, y: 0.5 } },
                    "options": {
                        hitArea: { type: "circle", params: { x: 0, y: 0, r: 0 } }
                    }
                }
            },
            // providerLogo: {
            //     type: "Sprite",
            //     props: {
            //         img: "providerLogo",
            //         VD: { x: 1240, y: 667, anchor: { x: 0.5, y: 0.5 } }
            //     }
            // }
        },
        Mobile: {
            menuButton: {
                type: "Button",
                makeResponsive: true,
                props: {
                    img: "mOpenBtn",
                    HX: 1145, HY: 633,
                    VX: 630, VY: 1100,
                    landScaleX: 1, landScaleY: 1,
                    portScaleX: 1, portScaleY: 1,
                    landAlignX: "RIGHT",
                    landAlignY: "BOTTOM",
                    portAlignX: "RIGHT",
                    portAlignY: "BOTTOM"
                }
            },
            homeButton: {
                type: "Button",
                makeResponsive: true,
                props: {
                    img: "Home",
                    HX: 15, HY: 635,
                    VX: 12, VY: 1178,
                    landScaleX: 1.3, landScaleY: 1.3,
                    portScaleX: 1, portScaleY: 1,
                    landAlignX: "LEFT",
                    landAlignY: "BOTTOM",
                    portAlignX: "LEFT",
                    portAlignY: "BOTTOM"
                }
            }
        }
    },

    "volumeBarConfig": {
        Desktop: {
            
            // volumeBar: {
            //     elementConstructor: "Slider",
            //     params: {
            //         name: "lineValueSlider",
            //         props: { x: 335, y: 205 },
            //         dotImage: "asSliderDot",
            //         BGImage: "sVolumeBarBg",
            //         FGImage: "sVolumeBarFg",
            //         isVerticalSlider: false,
            //         startingValue: 0,
            //         endValue: 1,
            //         currentValue: 0.7,
            //         toFixedValue: 1, //Value After Decimal, give 0 for integers
            //         doMultiplier: 100, //Value After Decimal, give 0 for integers
            //         text: {
            //             prefix: "",
            //             postfix: "%",
            //             attachedToSlider: true,
            //             props: { x: 104, y: -32, anchor: { y: 0.5, x: 0.5 } },
            //             textStyle: { fill: 0xffffff, fontSize: 16 }
            //         },

            //         displayForMinValue: {
            //             elementConstructor: "text",
            //             params: {
            //                 props: { x: -35, y: 0, anchor: 0.5 },
            //                 text: "0%",
            //                 textStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fill: 0xffffff, padding: 10 }
            //             }
            //         },

            //         displayForMaxValue: {
            //             elementConstructor: "text",
            //             params: {
            //                 props: { x: 380, y: 0, anchor: 0.5 },
            //                 text: "100%",
            //                 textStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fill: 0xffffff, padding: 10 }
            //             }
            //         },
            //         // displayForMinValue: {
            //         // 	elementConstructor: "sprite",
            //         // 	params: {
            //         // 		image: "sAudioMin",
            //         // 		props: { x: -35, y: 0, anchor: 0.5, scale: 1 }
            //         // 	}
            //         // },
            //         // displayForMaxValue: {
            //         // 	elementConstructor: "sprite",
            //         // 	params: {
            //         // 		image: "sAudioMax",
            //         // 		props: { x: 235, y: 0, anchor:0.5, scale: 1 }
            //         // 	}
            //         // },
            //         eventToPublish: "settingVolumeChange"
            //     }
            // }
        },
        Mobile: {
            // volumeBar: {
            //     elementConstructor: "Slider",
            //     params: {
            //         name: "lineValueSlider",
            //         props: { x: 335, y: 200 },
            //         dotImage: "asSliderDot",
            //         BGImage: "sVolumeBarBg",
            //         FGImage: "sVolumeBarFg",
            //         isVerticalSlider: false,
            //         startingValue: 0,
            //         endValue: 1,
            //         currentValue: 0.7,
            //         toFixedValue: 1, //Value After Decimal, give 0 for integers
            //         doMultiplier: 100,
            //         text: {
            //             prefix: "",
            //             postfix: "%",
            //             attachedToSlider: true,
            //             props: { x: 104, y: -29, anchor: { y: 0.5, x: 0.5 } },
            //             textStyle: { fill: 0xffffff, fontSize: 16 }
            //         },

            //         displayForMinValue: {
            //             elementConstructor: "text",
            //             params: {
            //                 props: { x: -35, y: 0, anchor: 0.5 },
            //                 text: "0%",
            //                 textStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fill: 0xffffff, padding: 10 }
            //             }
            //         },

            //         displayForMaxValue: {
            //             elementConstructor: "text",
            //             params: {
            //                 props: { x: 380, y: 0, anchor: 0.5 },
            //                 text: "100%",
            //                 textStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fill: 0xffffff, padding: 10 }
            //             }
            //         },
            //         // displayForMinValue: {
            //         // 	elementConstructor: "sprite",
            //         // 	params: {
            //         // 		image: "sAudioMin",
            //         // 		props: { x: -45, y: -10, scale: 1 }
            //         // 	}
            //         // },
            //         // displayForMaxValue: {
            //         // 	elementConstructor: "sprite",
            //         // 	params: {
            //         // 		image: "sAudioMax",
            //         // 		props: { x: 135, y: -10, scale: 2.0 }
            //         // 	}
            //         // },
            //         eventToPublish: "settingVolumeChange"
            //     }
            // }
        }
    },
    "autoPlayWinLimitConfig": {
        Desktop: {
            winLimitBar: {
                elementConstructor: "Slider",
                params: {
                    name: "lineValueSlider",
                    manualCreation: true,
                    props: { x: 60, y: 200 },
                    dotImage: "asSliderDot",
                    BGImage: "asVolumeBarBg",
                    FGImage: "asVolumeBarFill",
                    startingValue: 1,
                    endValue: 200,
                    currentValue: 1,
                    toFixedValue: 0, //Value After Decimal, give 0 for integers
                    text: {
                        prefix: "x",
                        props: { x: 102, y: -26, anchor: { y: 0.5, x: 0.5 } },
                        textStyle: { fill: 0xffffff, fontSize: 18 }
                    },
                    displayForMinValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "1",
                            props: { x: -30, anchor: { y: 0.5, x: 0.5 } }
                        }
                    },
                    displayForMaxValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "200",
                            props: { x: 250, y: 0, anchor: 0.5 }
                        }
                    },
                    eventToPublish: "winLimitChange"
                }
            }
        },
        Mobile: {
            winLimitBar: {
                elementConstructor: "Slider",
                params: {
                    name: "lineValueSlider",
                    manualCreation: true,
                    props: { x: 60, y: 200 },
                    dotImage: "asSliderDot",
                    BGImage: "asVolumeBarBg",
                    FGImage: "asVolumeBarFill",
                    startingValue: 1,
                    endValue: 200,
                    currentValue: 1,
                    toFixedValue: 0, //Value After Decimal, give 0 for integers
                    text: {
                        prefix: "x",

                        props: { x: 104, y: -29, anchor: { y: 0.5, x: 0.5 } },
                        textStyle: { fill: 0xffffff, fontSize: 18 }
                    },
                    displayForMinValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "1",
                            props: { x: -30, anchor: { y: 0.5, x: 0.5 } }
                        }
                    },
                    displayForMaxValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "200",
                            props: { x: 250, y: 0, anchor: 0.5 }
                        }
                    },
                    eventToPublish: "winLimitChange"
                }
            }
        }
    },
    "autoPlayLossLimitConfig": {
        Desktop: {
            lossLimitBar: {
                elementConstructor: "Slider",
                params: {
                    name: "lineValueSlider",
                    manualCreation: true,
                    props: { x: 60, y: 320 },
                    dotImage: "asSliderDot",
                    BGImage: "asVolumeBarBg",
                    FGImage: "asVolumeBarFill",
                    startingValue: 1,
                    endValue: 200,
                    currentValue: 1,
                    toFixedValue: 0, //Value After Decimal, give 0 for integers
                    text: {
                        prefix: "x",

                        props: { x: 103, y: -26, anchor: { y: 0.5, x: 0.5 } },
                        textStyle: { fill: 0xffffff, fontSize: 18 }
                    },
                    displayForMinValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "1",
                            props: { x: -30, anchor: { y: 0.5, x: 0.5 } }
                        }
                    },
                    displayForMaxValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "200",
                            props: { x: 250, y: 0, anchor: 0.5 }
                        }
                    },
                    eventToPublish: "lossLimitChange"
                }
            }
        },
        Mobile: {
            lossLimitBar: {
                elementConstructor: "Slider",
                params: {
                    name: "lineValueSlider",
                    manualCreation: true,
                    props: { x: 60, y: 320 },
                    dotImage: "asSliderDot",
                    BGImage: "asVolumeBarBg",
                    FGImage: "asVolumeBarFill",
                    startingValue: 1,
                    endValue: 200,
                    currentValue: 1,
                    toFixedValue: 0, //Value After Decimal, give 0 for integers
                    text: {
                        prefix: "x",

                        props: { x: 104, y: -31, anchor: { y: 0.5, x: 0.5 } },
                        textStyle: { fill: 0xffffff, fontSize: 18 }
                    },
                    displayForMinValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "1",
                            props: { x: -30, anchor: { y: 0.5, x: 0.5 } }
                        }
                    },
                    displayForMaxValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "200",
                            props: { x: 250, y: 0, anchor: 0.5 }
                        }
                    },
                    eventToPublish: "lossLimitChange"
                }
            }
        }
    },
    "settingsConfig": {
        Desktop: {
            settingsContainer: {
                type: "Container",
                props: {
                    VD: { x: 0, y: 0, visible: false }
                },
                children: {
                    settingsBg: {
                        type: "Rectangle",
                        props: {
                            VD: { x: 0, y: 0, alpha: 0.25 },
                            layout: { w: 1280, h: 720, color: 0x000000 }
                        }
                    },
                    // settingsBgRect: {
                    //     type: "RoundRectangle",
                    //     props: {
                    //         VD: { x: 190, y: 65, alpha: 0.8 },
                    //         layout: { w: 900, h: 600, r: 6, color: 0x000000 }
                    //     }
                    // },
                    settingsBg1: {
                        type: "Sprite",
                        props: {
                            img: "SettingsBg",
                            VD: { x: 640, y: 360, anchor: 0.5, scale: 1.1,alpha:0.9 }
                        }
                    },
                    optionsTabBase: {
                        type: "RoundRectangle",
                        props: {
                            VD: { x: 278, y: 95, alpha: 0.1,scale:0 },
                            layout: { w: 448, h: 60, r: 6, color: 0xffffff }
                        }
                    },
                    autoSpinSettingsTabBase: {
                        type: "RoundRectangle",
                        props: {
                            VD: { x: 660, y: 95, alpha: 0, scale:{x:0,y:0}},
                            layout: { w: 448, h: 60, r: 6, color: 0xffffff }
                        }
                    },
                    settingsIcon: {
                        type: "Sprite",
                        props: {
                            img: "mSettingsBtn_normal",
                            VD: { x: 30, y: 33, alpha: 0 }
                        }
                    },
                    settingsTitle: {
                        type: "Text",
                        props: {
                            VD: { x: 100, y: 30, alpha: 0 },
                            text: "SETTINGS",
                            textStyle: {
                                fontFamily: "Montserrat-ExtraBold",
                                fontSize: 28,
                                fill: 0x000,
                                fontStyle: "bold",
                                padding: 10
                            }
                        }
                    },
                    SettingHeading: {
                        type: "Text",
                        props: {
                            VD: { x: 452, y: 124,scale:1.2, anchor: { x: 0, y: 0.5 } },
                            text: ["system_text"],
                            textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 33, fill:  0x0096FF, padding: 10 }
                        }
                    },
                    settingsCloseBtn: {
                        type: "Button",
                        props: {
                            // img: "btnBg",
                            img: "bet_close",
                            VD: { x: 1075, y: 107, anchor: 0.5, scale:0.8 }
                        }
                    },
                    resumeGameTitle: {
                        type: "Text",
                        props: {
                            VD: { x: 640, y: 625, anchor: 0.5 },
                            text: "",
                            textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 20, fill: 0xffc800 }
                        }//0x000000
                    },
                    // optionsTab: {
                    //     type: "Sprite",
                    //     props: {
                    //         img: "Option_Normal",
                    //         VD: { x: 444, y: 125, scale:0, anchor: 0.5 },
                    //     }
                    // },
                    // optionsTab: {
                    //     type: "Text",
                    //     props: {
                    //         VD: { x: 414, y: 125, anchor: 0.5 },
                    //         text: "Options",
                    //         textStyle: {
                    //             fontFamily: "Montserrat-ExtraBold",
                    //             fontSize: 28,
                    //             maxWidth: 240,
                    //             fill: 0xffffff,
                    //             fontStyle: "bold",
                    //             padding: 10
                    //         }
                    //     }
                    // },
                    // autoSpinSettingsTab: {
                    //     type: "Sprite",
                    //     props: {
                    //         img: "AutoSpin_Normal",
                    //         VD: { x: 828, y: 125, scale:0.8, anchor: 0.5 },
                    //     }
                    // },
                    // autoSpinSettingsTab: {
                    //     type: "Text",
                    //     props: {
                    //         VD: { x: 866, y: 125, anchor: 0.5 },
                    //         text: "Auto Spin",
                    //         textStyle: {
                    //             fontFamily: "Montserrat-ExtraBold",
                    //             fontSize: 28,
                    //             maxWidth: 440,
                    //             fill: 0xffffff,
                    //             fontStyle: "bold",
                    //             padding: 10
                    //         }
                    //     }
                    // },
                    audioContainer: {
                        type: "Container",
                        props: {
                            VD: { x: 300, y: 39 }
                        },
                        children: {
                            // volumeTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 180, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            // volumeText: {
                            //     type: "Text",
                            //     props: {
                            //         VD: { x: 30, y: 200,scale:1.2, anchor: { x: 0, y: 0.5 } },
                            //         text: "Volume",
                            //         textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                            //     }
                            // },
                            // soundEffectsTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 240, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            soundEffectsText: {
                                type: "Text",
                                props: {
                                    VD: { x: 340, y: 410,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["sound"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, padding: 10 }
                                }
                            },
                            soundEffectSubText:{
                                type: "Text",
                                props: {
                                    VD: { x: 345, y: 440,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    // text: "Turn on or off the Game Sound",
                                    text: ["sound1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a, padding: 10 }
                                }

                            },

                            // soundEffectsOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 260, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },

                            soundEffectOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 410, scale:  0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOff"
                                }
                            },
                            soundEffectOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 410, scale:  0.8, anchor: 0.5 },
                                    img: "SwitchOn"
                                }
                            },

                            // ambienceSoundTextSutTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 300, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            ambienceSoundText: {
                                type: "Text",
                                props: {
                                    VD: { x: 340, y: 350, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["ambient"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, padding: 10 }
                                }
                            },
                            ambienceSoundSubText: {
                                type: "Text",
                                props: {
                                    VD: { x: 345, y: 380, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    // text: "Turn on or off the Game Music",
                                    text: ["ambient1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a, padding: 10 }
                                }
                            },
                            

                            // ambienceSoundOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 320, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            ambienceSoundOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 350, scale:  0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOff"
                                }
                            },
                            ambienceSoundOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 350, scale:  0.8, anchor: 0.5 },
                                    img: "SwitchOn"
                                }
                            },
                            // quickSpinTextSubTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 360, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            quickSpinText: {
                                type: "Text",
                                props: {
                                    VD: { x: 340, y: 180, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["quickspin"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },
                            quickSpinSubText: {
                                type: "Text",
                                props: {
                                    VD: { x: 345, y: 210, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    // text: "Play by reducing Total Spin time",
                                    text: ["quickspintxt1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a }
                                }
                            },

                            skipBigwinText: {
                                type: "Text",
                                props: {
                                    VD: { x: 340, y: 263, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["battery"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },
                            skipBigwinSubText: {
                                type: "Text",
                                props: {
                                    VD: { x: 345, y: 295, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    // text: "Save Battery life by reducing Animation \n Speed",
                                    text: ["battery1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a }
                                }
                            },

                            // quickSpinOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 380, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },

                            quickSpinOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 180, scale:  0.8, anchor: 0.5 },
                                    img: "SwitchOff"
                                }
                            },
                            quickSpinOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 180, scale:  0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOn"
                                }
                            },

                            skipBigwinOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 263, scale:  0.8, anchor: 0.5 },
                                    img: "SwitchOff"
                                }
                            },
                            skipBigwinOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 263, scale:  0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOn"
                                }
                            },


                            // pressSpaceTextSubTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 420, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            pressSpaceText: {
                                type: "Text",
                                props: {
                                    VD: { x: 340, y: 477, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["introscreen"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },
                            pressSpaceSubText: {
                                type: "Text",
                                props: {
                                    VD: { x: 345, y: 509, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["introscreen1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a }
                                }
                            },

                            // spaceClickOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 440, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },

                            spaceClickOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 477, scale:0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOff"
                                }
                            },
                            spaceClickOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 477, scale: 0.8, anchor: 0.5 },
                                    img: "SwitchOn"
                                }
                            },

                            // historyTextSubTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 480, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            historyTitle: {
                                type: "Text",
                                props: {
                                    VD: { x: -30, y: 200, scale: 1.2, anchor: { x: 0, y: 0.5 }, visible: true },
                                    text: "GAME REPLAY",
                                    textStyle: { 
                                        fontFamily: "Montserrat-ExtraBold", 
                                        fontSize: 20, 
                                        fill: 0xffffff 
                                    }
                                }
                            },
                            historyTitleIcon: {
                                type: "Button",
                                props: {
                                    VD: { x: 120, y: 200, anchor: 0.5, scale: { x: 0.8, y: 0.8 }, visible: true },
                                    img: "Historybtn",
                                    options: {
                                        hitArea: { type: "circle", params: { x: 0, y: 0, r: 15 } },
                                    },
                                },
                            },
                            gameHistoryButton: {
                                type: "Text",
                                props: {
                                    VD: { x: -30, y: 260, scale: 1.2, anchor: { x: 0, y: 0.5 }, visible: true },
                                    text: "GAME HISTORY",
                                    textStyle: { 
                                        fontFamily: "Montserrat-ExtraBold", 
                                        fontSize: 20, 
                                        fill: 0xffffff 
                                    }
                                }
                            },
                            gameHistoryButtonIcon: {
                                type: "Button",
                                props: {
                                    VD: { x: 120, y: 260, anchor: 0.5, scale: { x: 0.8, y: 0.8 }, visible: true },
                                    img: "Historybtn",
                                    options: {
                                        hitArea: { type: "circle", params: { x: 0, y: 0, r: 15 } },
                                    },
                                },
                            },
                            historyButton: {
                                type: "Button",
                                props: {
                                    VD: { x: 163, y: 255, anchor: 0.5, scale: { x: 1, y: 1 } },
                                    // img: "btnBg",
                                    img: "HistoryBg",
                                    // options: {
                                    //     "hitArea": { "type": "polygon", "params": [-121 * 0.5, -52 * 0.5, 120 * 0.5, -51 * 0.5, 135 * 0.5, -45 * 0.5, 168 * 0.5, -2 * 0.5, 139 * 0.5, 36 * 0.5, 121 * 0.5, 46 * 0.5, -119 * 0.5, 47 * 0.5, -167 * 0.5, - 2 * 0.5,
                                    //         -167 * 0.5, -2 * 0.5, -140 * 0.5, -41 * 0.5,
                                    //         ] }},
                                    "options": {
                        hitArea: { type: "circle", params: { x: 0, y: 0, r: 10 } }
                    },
                                }

                            },
                            seeHistoryTitle: {
                                type: "Sprite",
                                props: {
                                    img: "Historybtn",
                                    VD: { x: 163, y: 255, scale:0.8, anchor: 0.5 },
                                }
                            },
                            lineTop: {
                                type: "Sprite",
                                props: {
                                    img: "Line",
                                    VD: { x: 80, y: 237, scale:0.8, anchor: 0.5 },
                                }
                            },
                            LineBottom: {
                                type: "Sprite",
                                props: {
                                    img: "Line",
                                    VD: { x: 80, y: 283, scale:0.8, anchor: 0.5 },
                                }
                            },
                            // seeHistoryTitle: {
                            //     type: "Text",
                            //     props: {
                            //         VD: { x: 560, y: 560, anchor: 0.5 },
                            //         text: "HISTORY",
                            //         textStyle: { fontFamily: "andadaBold", fontSize: 25, fill: 0xffc800 }
                            //     }
                            // },
                            totalBet: {
                                type: "Text",
                                props: {
                                    VD: { x: 75, y: 365, scale:1.2, anchor: { x: 0.5, y: 0.5 } },
                                    text: ["totalbet"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },
                            totalBetBox: {
                                type: "Sprite",
                                props: {
                                    img: "betBox",
                                    VD: { x: 70, y: 409, anchor: 0.5, scale: { x: 1.23 } }
                                },
                        },
                            PlusBet: {
                                type: "Button",
                                props: {
                                    // img: "btnBg",
                                    img: "Add",
                                    VD: { x: 169, y: 410, anchor: 0.5, scale:0.5 }
                                }
                            },
                            MinusBet: {
                                type: "Button",
                                props: {
                                    // img: "btnBg",
                                    img: "minus",
                                    VD: { x: -30, y: 410, anchor: 0.5, scale:0.5 }
                                }
                            },

                        }
                    },
                    autoPlayContainer: {
                        type: "Container",
                        props: {
                            VD: { x: 300, y: 125 }
                        },
                        children: {
                            // onAnyWinTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 55, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Auto Spin",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            onAnyWinText: {
                                type: "Text",
                                props: {
                                    VD: { x: 30, y: 75, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    text: "Stop on any win",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 18,
                                        fill: 0xffffff,
                                        padding: 10
                                    }
                                }
                            },

                            // onAnyWinOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 75, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            onAnyWinOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 600, y: 75, scale: 0.8, anchor: 0.5 },
                                    img: "sCheckOff"
                                }
                            },
                            onAnyWinOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 600, y: 75, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "sCheckOn"
                                }
                            },

                            // autoSpinWinLimitTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 115, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Auto Spin",
                            // 		textStyle: {
                            // 			fontFamily: "Montserrat-Regular",
                            // 			fontSize: 13,
                            // 			fill: 0xffffff,
                            // 			padding: 10
                            // 		}
                            // 	}
                            // },
                            autoSpinWinLimitText: {
                                type: "Text",
                                props: {
                                    VD: { x: 30, y: 135,scale:1.2, anchor: { y: 0.5 } },
                                    text: "Stop on single win limit",
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, padding: 10 }
                                }
                            },

                            // asWinLimitOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 135, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },

                            autoSpinWinLimitOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 600, y: 135, scale: 0.8, anchor: 0.5 },
                                    img: "sCheckOff"
                                }
                            },
                            autoSpinWinLimitOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 600, y: 135, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "sCheckOn"
                                }
                            },


                            // autoSpinLossLimitTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 235, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Auto Spin",
                            // 		textStyle: {
                            // 			fontFamily: "Montserrat-Regular",
                            // 			fontSize: 13,
                            // 			fill: 0xffffff,
                            // 			padding: 10
                            // 		}
                            // 	}
                            // },
                            autoSpinLossLimitText: {
                                type: "Text",
                                props: {
                                    VD: { x: 30, y: 255,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: "Stop on session loss limit",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 18,
                                        fill: 0xffffff,
                                        padding: 10
                                    }
                                }
                            },

                            // asLossLimitOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 255, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },


                            autoSpinLossLimitOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 600, y: 255, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "sCheckOff"
                                }
                            },
                            autoSpinLossLimitOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 600, y: 255, scale: 0.8, anchor: 0.5 },
                                    img: "sCheckOn"
                                }
                            },

                            inputWinLimitBg: {
                                type: "Sprite",
                                props: {
                                    img: "textField_text",
                                    VD: { x: 585, y: 200, anchor: 0.5, scale: { x: 1.23 } }
                                }
                            },
                            inputLossLimitBg: {
                                type: "Sprite",
                                props: {
                                    img: "textField_text",
                                    VD: { x: 585, y: 320, anchor: 0.5, scale: { x: 1.23 } }
                                }
                            },

                            inputWinLimitText: {
                                type: "Text",
                                props: {
                                    VD: { x: 585, y: 200, scale:1.2,anchor: 0.5 },
                                    text: "100",
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, maxWidth: 105 }
                                }
                            },
                            inputLossLimitText: {
                                type: "Text",
                                props: {
                                    VD: { x: 585, y: 320, scale:1.2,anchor: 0.5 },
                                    text: "",
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, maxWidth: 105 }
                                }
                            }
                        }
                    },
                    autoPlay: {
                        type: "Container",
                        props: {
                            VD: { x: 360, y: 500 }
                        },
                        children: {
                            autoPlayTitle: {
                                type: "Text",
                                props: {
                                    VD: { x: -35, y: -20 + 15, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    text: "Auto Play",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff,
                                        maxWidth: 350,
                                        padding: 10
                                    }
                                }
                            },

                            autoPlayNumBg1: {
                                type: "Button",
                                props: {
                                    VD: { x: 0, y: 51.5, scale: { x:0.1, y: 0.1 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt1: {
                                type: "Text",
                                props: {
                                    VD: { x: 0, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "10",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg2: {
                                type: "Button",
                                props: {
                                    VD: { x: 75, y: 51.5, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt2: {
                                type: "Text",
                                props: {
                                    VD: { x: 75, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "20",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg3: {
                                type: "Button",
                                props: {
                                    VD: { x: 150, y: 51.5, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt3: {
                                type: "Text",
                                props: {
                                    VD: { x: 150, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "30",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg4: {
                                type: "Button",
                                props: {
                                    VD: { x: 225, y: 51.5, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt4: {
                                type: "Text",
                                props: {
                                    VD: { x: 225, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "50",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg5: {
                                type: "Button",
                                props: {
                                    VD: { x: 293.5, y: 51.5, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt5: {
                                type: "Text",
                                props: {
                                    VD: { x: 295, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "100",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },

                            autoPlayButton: {
                                type: "Button",
                                props: {
                                    VD: { x: 530, y: 50, scale: { x: 1, y: 1 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "Start",
                                    options: {
                                        // textField: {
                                        //     props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                                        //     text: "START",
                                        //     textStyle: { fontSize: 25, fontFamily: "andadaBold", fill: 0xffc800, align: "center", maxWidth: 175, padding: 10 }
                                        // },
                                        "hitArea": { "type": "polygon", "params": [-121 * 0.5, -52 * 0.5, 120 * 0.5, -51 * 0.5, 135 * 0.5, -45 * 0.5, 168 * 0.5, -2 * 0.5, 139 * 0.5, 36 * 0.5, 121 * 0.5, 46 * 0.5, -119 * 0.5, 47 * 0.5, -167 * 0.5, - 2 * 0.5,
                                        -167 * 0.5, -2 * 0.5, -140 * 0.5, -41 * 0.5,
                                        ] }
                                    
                                    }
                                }
                            },

                        }
                    }
                }
            }
        },
        Mobile: {
            settingsMContainer: {
                type: "Container",
                props: {
                    VL: { x: 0, y: 0, visible: false },
                    VP: { x: 0, y: 0, visible: false }
                },
                children: {
                    settingsBg: {
                        type: "Rectangle",
                        props: {
                            VL: { x: 0, y: 0, alpha: 0.5 },
                            VP: { x: 0, y: 0, alpha: 0.5 },
                            layout: { w: 1280, h: 720, color: 0x000000 }
                        }
                    },
                    settingsBg1: {
                        type: "Sprite",
                        props: {
                            img: "SettingsBg",
                            // VL: { x: 640, y: 360, anchor: 0.5, scale: 1.1 },
                            // VP: { x: 360, y: 640, anchor: 0.5, scale: 1.1 }
                            VL: { x: 0, y: 0, scale: 0 },
                            // VL: { x: 0, y: 0 },
                            VP: { x: 0, y: 0, scale: 0 }
                        }
                    },
                    settingsBgRect: {
                    	type: "RoundRectangle",
                    	props: {
                    		VL: { x: 0, y: 0, alpha: 0.9 },
                    		VP: { x: 0, y: 0, alpha: 0.9 },
                    		layout: { w: 1435, h: 900, r: 6, color: 0x000000 }
                    	}
                    },



                    gameSettingsTitle: {
                        type: "Text",
                        props: {
                            VL: { x: 100, y: 30, alpha: 0 },
                            VP: { x: 100, y: 30, alpha: 0 },
                            text: "",
                            textStyle: {
                                fontFamily: "Montserrat-ExtraBold",
                                fontSize: 30,
                                fill: 0xffffff,
                                fontStyle: "bold",
                                padding: 10
                            }
                        }
                    },
                    SettingmHeading: {
                        type: "Text",
                        props: {
                            VL: { x: 100, y: 30, alpha: 0 },
                            VP: { x: 100, y: 30, alpha: 0 },
                            text: ["system_text"],
                            textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 33, fill:  0x0096FF, padding: 10 }
                        }
                    },
                    settingsCloseButton: {
                        type: "Button",
                        props: {
                            // img: "btnBg",
                            img: "bet_close",
                            VL: { x: 1352, y: 77, anchor: 0.5, scale: { x: 2, y: 2 } },
                            VP: { x: 1352, y: 77, anchor: 0.5, scale: { x:2, y: 2 } }
                        }
                    },
                    resumeGameTitle: {
                        type: "Text",
                        props: {
                            VL: { x: 530, y: 605, anchor: 0.5 },
                            VP: { x: 530, y: 605, anchor: 0.5 },
                            text: "",
                            textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 20, fill: 0xffc800 }
                        }
                    },

                    optionsTabBase: {
                        type: "RoundRectangle",
                        props: {
                            VL: { x: 285, y: 75, scale:0,alpha: 0.0 },
                            VP: { x: 285, y: 75, scale:0,alpha: 0.0 },
                            layout: { w: 448, h: 60, r: 6, color: 0xffffff }
                        }
                    },
                    autoSpinSettingsTabBase: {
                        type: "RoundRectangle",
                        props: {
                            VL: { x: 765, y: 75,scale:0, alpha: 0.1 },
                            VP: { x: 765, y: 75,scale:0, alpha: 0.1 },
                            layout: { w: 448, h: 60, r: 6, color: 0xffffff }
                        }
                    },
                    // settingsIcon: {
                    // 	type: "Sprite",
                    // 	props: {
                    // 		img: "Option_Normal",
                    // 		VL: { x: 30, y: 33, alpha: 0 },
                    // 		VP: { x: 30, y: 33, alpha: 0 }
                    // 	}
                    // },
                    // optionsTab: {
                    //     type: "Sprite",
                    //     props: {
                    //         img: "Option_Normal",
                    //         VL: { x: 478, y: 102, anchor: 0.5 },
                    //         VP: { x: 478, y: 102, anchor: 0.5 },
                    //     }
                    // },
                    // optionsTab: {
                    //     type: "Text",
                    //     props: {
                    //         VL: { x: 270, y: 102, anchor: 0.5 },
                    //         VP: { x: 270, y: 102, anchor: 0.5 },
                    //         text: "Options",
                    //         textStyle: {
                    //             fontFamily: "Montserrat-ExtraBold",
                    //             fontSize: 28,
                    //             maxWidth: 240,
                    //             fill: 0xffffff,
                    //             fontStyle: "bold",
                    //             padding: 10
                    //         }
                    //     }
                    // },
                    // autoSpinSettingsTab: {
                    //     type: "Sprite",
                    //     props: {
                    //         img: "AutoSpin_Normal",
                    //         VL: { x: 962, y: 102, anchor: 0.5 },
                    //                 VP: { x: 962, y: 102, anchor: 0.5 },
                    //     }
                    // },
                    // autoSpinSettingsTab: {
                    //     type: "Text",
                    //     props: {
                    //         VL: { x: 720, y: 102, anchor: 0.5 },
                    //         VP: { x: 720, y: 102, anchor: 0.5 },
                    //         text: "Auto Spin",
                    //         textStyle: {
                    //             fontFamily: "Montserrat-ExtraBold",
                    //             fontSize: 28,
                    //             maxWidth: 440,
                    //             fill: 0xffffff,
                    //             fontStyle: "bold",
                    //             padding: 10
                    //         }
                    //     }
                    // },
                    audioMContainer: {
                        type: "Container",
                        props: {
                            VL: { x: 180, y: -95, scale:1.6 },
                            VP: { x: 180, y: -95 , scale:1.6}
                        },
                        children: {
                            SettingmHeading: {
                                type: "Text",
                                props: {
                                    VL: { x: 193, y: 136,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 193, y: 136,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["system_text"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 26, fill: 0x0096FF, padding: 10 }
                                }
                            },
                            // volumeTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 180, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 180, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            // volumeText: {
                            //     type: "Text",
                            //     props: {
                            //         VL: { x: 30, y: 200, scale:1.2, anchor: { x: 0, y: 0.5 } },
                            //         VP: { x: 30, y: 200, scale:1.2 , anchor: { x: 0, y: 0.5 } },
                            //         text: "Volume",
                            //         textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                            //     }
                            // },
                            // soundEffectsTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 240, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 240, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            soundEffectsText: {
                                type: "Text",
                                props: {
                                    VL: { x: 360, y: 225,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 360, y: 225,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["sound"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, padding: 10 }
                                }
                            },
                            soundEffectSubText:{
                                type: "Text",
                                props: {
                                    VL: { x: 362, y: 252,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 362, y: 252,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    // text: "Turn on or off the Game Sound",
                                    text: ["sound1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a, padding: 10 }
                                }

                            },
                            soundEffectOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 225, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 646, y: 225, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOff"
                                }
                            },
                            soundEffectOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 225, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 646, y: 225, scale: 0.8, anchor: 0.5 },
                                    img: "SwitchOn"
                                }
                            },

                            // ambienceSoundTextSutTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 300, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 300, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            ambienceSoundText: {
                                type: "Text",
                                props: {
                                    VL: { x: 360, y: 315,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 360, y: 315,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["ambient"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, padding: 10 }
                                }
                            },
                            ambienceSoundSubText: {
                                type: "Text",
                                props: {
                                    VL: { x: 362, y: 342,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 362, y: 342,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    // text: "Turn on or off the Game Music",
                                    text: ["ambient1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a, padding: 10 }
                                }
                            },
                            ambienceSoundOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 315, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 646, y: 315, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOff"
                                }
                            },
                            ambienceSoundOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 315, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 646, y: 315, scale: 0.8, anchor: 0.5 },
                                    img: "SwitchOn"
                                }
                            },
                            // quickSpinTextSubTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 360, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 360, anchor: { x: 0, y: 0.5 } },
                            // 		text: "",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            quickSpinText: {
                                type: "Text",
                                props: {
                                    VL: { x: 360, y: 400, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 360, y: 400, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    text: ["quickspin"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },
                            quickSpinSubText: {
                                type: "Text",
                                props: {
                                    VL: { x: 362, y: 427, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 362, y: 427, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    // text: "Play by reducing Total Spin time",
                                    text: ["quickspintxt1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a }
                                }
                            },


                            quickSpinOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 400, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 646, y: 400, scale: 0.8, anchor: 0.5 },
                                    img: "SwitchOff"
                                }
                            },
                            quickSpinOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 400, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 646, y: 400, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOn"
                                }
                            },

                            skipBigwinText: {
                                type: "Text",
                                props: {
                                    VL: { x: 360, y: 475, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 360, y: 475, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    text: ["battery"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },
                            skipBigwinSubText: {
                                type: "Text",
                                props: {
                                    VL: { x: 362, y: 510, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 362, y: 510, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    // text: "Save Battery life by reducing Animation \n Speed",
                                    text: ["battery1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a }
                                }
                            },

                            skipBigwinOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 475, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 646, y: 475, scale: 0.8, anchor: 0.5 },
                                    img: "SwitchOff"
                                }
                            },
                            skipBigwinOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 475, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 646, y: 475, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOn"
                                }
                            },

                            historyTitle: {
                                type: "Text",
                                props: {
                                    VL: { x: 30, y: 220, scale: 1.2, anchor: { x: 0, y: 0.5 }, visible: true },
                                    VP: { x: 30, y: 220, scale: 1.2, anchor: { x: 0, y: 0.5 }, visible: true },
                                    text: "GAME REPLAY",
                                    textStyle: { 
                                        fontFamily: "Montserrat-ExtraBold", 
                                        fontSize: 20, 
                                        fill: 0xffffff 
                                    }
                                }
                            },
                            historyTitleIcon: {
                                type: "Button",
                                props: {
                                    VL: { x: 180, y: 210, anchor: 0.5, scale: { x: 0.8, y: 0.8 }, visible: true },
                                    VP: { x: 180, y: 210, anchor: 0.5, scale: { x: 0.8, y: 0.8 }, visible: true },
                                    img: "Historybtn",
                                    options: {
                                        hitArea: { type: "circle", params: { x: 0, y: 0, r: 15 } },
                                    },
                                },
                            },
                            gameHistoryButton: {
                                type: "Text",
                                props: {
                                    VL: { x: 30, y: 300, scale: 1.2, anchor: { x: 0, y: 0.5 }, visible: true },
                                    VP: { x: 30, y: 300, scale: 1.2, anchor: { x: 0, y: 0.5 }, visible: true },
                                    text: "GAME HISTORY",
                                    textStyle: { 
                                        fontFamily: "Montserrat-ExtraBold", 
                                        fontSize: 20, 
                                        fill: 0xffffff 
                                    }
                                }
                            },
                            gameHistoryButtonIcon: {
                                type: "Button",
                                props: {
                                    VL: { x: 180, y: 260, anchor: 0.5, scale: { x: 0.8, y: 0.8 }, visible: true },
                                    VP: { x: 180, y: 260, anchor: 0.5, scale: { x: 0.8, y: 0.8 }, visible: true },
                                    img: "Historybtn",
                                    options: {
                                        hitArea: { type: "circle", params: { x: 0, y: 0, r: 15 } },
                                    },
                                },
                            },
                            historyButton: {
                                type: "Button",
                                props: {
                                    VL: { x: 30, y: 280, anchor: 0.5, scale: { x: 1, y: 1 } },
                                    VP: { x: 30, y: 280, anchor: 0.5, scale: { x: 1, y: 1 } },
                                    // img: "btnBg",
                                    img: "Historybtn",
                                },
                               
                            },
                            seeHistoryTitle: {
                                type: "Sprite",
                                props: {
                                    img: "Historybtn",
                                    VL: { x: 223, y: 275,scale:0.8, anchor: 0.5 },
                                    VP: { x: 223, y: 275,scale:0.8, anchor: 0.5 },
                                }
                            },
                            // seeHistoryTitle: {
                            //     type: "Text",
                            //     props: {
                            //         VL: { x: 560, y: 500, anchor: 0.5 },
                            //         VP: { x: 560, y: 500, anchor: 0.5 },
                            //         text: "HISTORY",
                            //         textStyle: { fontFamily: "andadaBold", fontSize: 25, fill: 0xffc800 }
                            //     },
                              
                            // }
                            lineTop: {
                                type: "Sprite",
                                props: {
                                    img: "Line",
                                    VL: { x: 115, y: 235, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 115, y: 235, scale: 0.8, anchor: 0.5 },
                                }
                            },
                            LineBottom: {
                                type: "Sprite",
                                props: {
                                    img: "Line",
                                    VL: { x: 115, y: 322, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 115, y: 322, scale: 0.8, anchor: 0.5 },
                                }
                            },
                            // seeHistoryTitle: {
                            //     type: "Text",
                            //     props: {
                            //         VD: { x: 560, y: 560, anchor: 0.5 },
                            //         text: "HISTORY",
                            //         textStyle: { fontFamily: "andadaBold", fontSize: 25, fill: 0xffc800 }
                            //     }
                            // },

                            pressSpaceText: {
                  type: "Text",
                  props: {
                      VL: { x: 360, y: 545, anchor: { x: 0, y: 0.5 } },
                      VP: { x: 360, y: 545, anchor: { x: 0, y: 0.5 } },
                      text: ["introscreen"],
                      textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 21, fill: 0xffffff }
                  }
                            },
                            pressSpaceSubText: {
                                type: "Text",
                                props: {
                                    VL: { x: 362, y: 572, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 362, y: 572, anchor: { x: 0, y: 0.5 } },
                                    text:["introscreen1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 17, fill: 0x3a3a3a }
                                }
                            },
                            spaceClickOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 545, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 646, y: 545, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOff"
                                }
                            },
                            spaceClickOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 545, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 646, y: 545, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOn"
                                }
                            },

                            totalBet: {
                                type: "Text",
                                props: {
                                    VL: { x: 102, y: 376, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 102, y: 376, scale: 0.8, anchor: 0.5 },
                                    text: ["totalbet"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 25, fill: 0xffffff }
                                }
                            },
                            totalBetBox: {
                                type: "Sprite",
                                props: {
                                    img: "betBox",
                                    VL: { x: 103, y: 421, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 103, y: 421, scale: 0.8, anchor: 0.5 },
                                },
                        },
                            PlusBet: {
                                type: "Button",
                                props: {
                                    // img: "btnBg",
                                    img: "Add",
                                    VL: { x: 178, y: 421, scale: 0.5, anchor: 0.5 },
                                    VP: { x: 178, y: 421, scale: 0.5, anchor: 0.5 },
                                }
                            },
                            MinusBet: {
                                type: "Button",
                                props: {
                                    // img: "btnBg",
                                    img: "minus",
                                    VL: { x: 25, y: 421, scale: 0.5, anchor: 0.5 },
                                    VP: { x: 25, y: 421, scale: 0.5, anchor: 0.5 },
                                }
                            },
                        }
                    },
                    autoPlayMContainer: {
                        type: "Container",
                        props: {
                            VL: { x: 180, y: 75,scale:1.6, },
                            VP: { x: 180, y: 75,scale:1.6, }
                        },
                        children: {
                            // onAnyWinTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 55, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 55, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Auto Spin",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            onAnyWinText: {
                                type: "Text",
                                props: {
                                    VL: { x: 30, y: 75, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 30, y: 75,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: "Stop on any win",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 18,
                                        fill: 0xffffff,
                                        padding: 10
                                    }
                                }
                            },
                            onAnyWinOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 600, y: 75, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 600, y: 75, scale: 0.8, anchor: 0.5 },
                                    img: "sCheckOff"
                                }
                            },
                            onAnyWinOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 600, y: 75, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 600, y: 75, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "sCheckOn"
                                }
                            },

                            // autoSpinWinLimitTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 115, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 115, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Auto Spin",
                            // 		textStyle: {
                            // 			fontFamily: "Montserrat-Regular",
                            // 			fontSize: 13,
                            // 			fill: 0x9a7f3f,
                            // 			padding: 10
                            // 		}
                            // 	}
                            // },
                            autoSpinWinLimitText: {
                                type: "Text",
                                props: {
                                    VL: { x: 30, y: 135, scale:1.2,anchor: { y: 0.5 } },
                                    VP: { x: 30, y: 135, scale:1.2,anchor: { y: 0.5 } },
                                    text: "Stop on single win limit",
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, padding: 10 }
                                }
                            },

                            autoSpinWinLimitOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 600, y: 135, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 600, y: 135, scale: 0.8, anchor: 0.5 },
                                    img: "sCheckOff"
                                }
                            },
                            autoSpinWinLimitOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 600, y: 135, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 600, y: 135, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "sCheckOn"
                                }
                            },


                            // autoSpinLossLimitTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 235, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 235, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Auto Spin",
                            // 		textStyle: {
                            // 			fontFamily: "Montserrat-Regular",
                            // 			fontSize: 13,
                            // 			fill: 0x9a7f3f,
                            // 			padding: 10
                            // 		}
                            // 	}
                            // },
                            autoSpinLossLimitText: {
                                type: "Text",
                                props: {
                                    VL: { x: 30, y: 255, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 30, y: 255,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: "Stop on session loss limit",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 18,
                                        fill: 0xffffff,
                                        padding: 10
                                    }
                                }
                            },
                            // asLossLimitOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 235, anchor: 0.5 },
                            // 		VP: { x: 30, y: 235, anchor: 0.5 },
                            // 		text: "on",
                            // 		textStyle: {
                            // 			fontFamily: "Montserrat-Regular",
                            // 			fontSize: 13,
                            // 			fill: 0x9a7f3f,
                            // 			padding: 10
                            // 		}
                            // 	}
                            // },


                            autoSpinLossLimitOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 600, y: 255, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 600, y: 255, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "sCheckOff"
                                }
                            },
                            autoSpinLossLimitOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 600, y: 255, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 600, y: 255, scale: 0.8, anchor: 0.5 },
                                    img: "sCheckOn"
                                }
                            },

                            inputWinLimitBg: {
                                type: "Sprite",
                                props: {
                                    img: "textField_text",
                                    VL: { x: 575, y: 200, anchor: 0.5, scale: { x: 1 } },
                                    VP: { x: 575, y: 200, anchor: 0.5, scale: { x: 1 } }
                                }
                            },
                            inputLossLimitBg: {
                                type: "Sprite",
                                props: {
                                    img: "textField_text",
                                    VL: { x: 575, y: 320, anchor: 0.5, scale: { x: 1 } },
                                    VP: { x: 575, y: 320, anchor: 0.5, scale: { x: 1 } }
                                }
                            },

                            inputWinLimitText: {
                                type: "Text",
                                props: {
                                    VL: { x: 575, y: 200, scale:1.2,anchor: 0.5 },
                                    VP: { x: 575, y: 200, scale:1.2,anchor: 0.5 },
                                    text: "100",
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, maxWidth: 105 }
                                }
                            },
                            inputLossLimitText: {
                                type: "Text",
                                props: {
                                    VL: { x: 575, y: 320, scale:1.2,anchor: 0.5 },
                                    VP: { x: 575, y: 320,scale:1.2, anchor: 0.5 },
                                    text: "",
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, maxWidth: 105 }
                                }
                            }
                        }
                    },
                    autoMPlay: {
                        type: "Container",
                        props: {
                            VL: { x: 250, y: 669, scale:1.6 },
                            VP: { x: 250, y: 669, scale:1.6 }
                        },
                        children: {
                            autoPlayTitle: {
                                type: "Text",
                                props: {
                                    VL: { x: -35, y: -20 + 15, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: -35, y: -20 + 15, anchor: { x: 0, y: 0.5 } },
                                    text: "Auto Play",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff,
                                        maxWidth: 350,
                                        padding: 10
                                    }
                                }
                            },

                            autoPlayNumBg1: {
                                type: "Button",
                                props: {
                                    VL: { x: 0, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 0, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt1: {
                                type: "Text",
                                props: {
                                    VL: { x: 0, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 0, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "10",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg2: {
                                type: "Button",
                                props: {
                                    VL: { x: 80, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 80, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt2: {
                                type: "Text",
                                props: {
                                    VL: { x: 80, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 80, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "20",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg3: {
                                type: "Button",
                                props: {
                                    VL: { x: 155, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 155, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt3: {
                                type: "Text",
                                props: {
                                    VL: { x: 155, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 155, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "30",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg4: {
                                type: "Button",
                                props: {
                                    VL: { x: 230, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 230, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt4: {
                                type: "Text",
                                props: {
                                    VL: { x: 230, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 230, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "50",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg5: {
                                type: "Button",
                                props: {
                                    VL: { x: 305, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 305, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt5: {
                                type: "Text",
                                props: {
                                    VL: { x: 305, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 305, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "100",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },

                            autoPlayButton: {
                                type: "Button",
                                props: {
                                    VL: { x: 530, y: 50, scale: { x: 0.8, y: 0.8 }, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 530, y: 50, scale: { x: 0.8, y: 0.8 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "Start",
                                    options: {
                                        // textField: {
                                        //     props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                                        //     text: "START",
                                        //     textStyle: { fontSize: 28, fontFamily: "andadaBold", fill: 0xffc800, align: "center", maxWidth: 175, padding: 10 }
                                        // }
                                    }
                                }
                            },

                        }
                    }
                }
            },

            autoSpinSelection: {
                type: "Container",
                props: {
                    img: "buttonsImg",
                    VL: { x: 0, y: 0, visible: false },
                    VP: { x: 0, y: 0, visible: false }
                },
                children: {
                    autoSpinsLabelBg: {
                        type: "Rectangle",
                        props: {
                            VL: { x: 0, y: 0, alpha: 0.001 },
                            VP: { x: 0, y: 0, alpha: 0.001 },
                            layout: {
                                w: 2500,
                                h: 1000,
                                color: 0x000000
                            }
                        }
                    },
                    autoSelectBg: {
                        type: "Rectangle",
                        makeResponsive: true,
                        props: {
                            VL: { x: 0, y: 406, alpha: 0.6 },
                            VP: { x: 0, y: 978, alpha: 0.6 },
                            layout: {
                                w: 2500,
                                h: 1000,
                                color: 0x000000
                            },
                            HX: 0,
                            HY: 320,
                            VX: 0,
                            VY: 600,
                            landScaleX: 1,
                            landScaleY: 1,
                            portScaleX: 1,
                            portScaleY: 1,
                            landAlignX: "LEFT",
                            landAlignY: "CENTER",
                            portAlignX: "LEFT",
                            portAlignY: "CENTER"
                        }
                    },
                    asCancelASBtn: {
                        type: "Button",
                        makeResponsive: true,
                        props: {
                            img: "close",
                            VL: { x: 10, y: 344 },
                            VP: { x: 10, y: 916 },
                            HX: 1200,
                            HY: 350,
                            VX: 650,
                            VY: 630,
                            landScaleX: 1,
                            landScaleY: 1,
                            portScaleX: 1,
                            portScaleY: 1,
                            landAlignX: "RIGHT",
                            landAlignY: "TOP",
                            portAlignX: "RIGHT",
                            portAlignY: "TOP"
                        }
                    },
                    asStartBtn: {
                        type: "Button",
                        /*"makeResponsive":true,*/
                        props: {
                            img: "valueBtn",
                            VL: { x: 1069, y: 344, visible: false },
                            VP: { x: 513, y: 916, visible: false }
                            /*"HX": 1080, "HY": 360, "VX": 518, "VY": 640,
                            "landScaleX": 1, "landScaleY": 1, "portScaleX": 1, "portScaleY": 1,
                            "landAlignX": "RIGHT", "landAlignY": "BOTTOM", "portAlignX": "RIGHT", "portAlignY": "BOTTOM"*/
                        }
                    },
                    autoSpinTitle: {
                        type: "Text",
                        makeResponsive: true,
                        props: {
                            img: "confirmBetSelBtn",
                            VL: { x: 543, y: 348 },
                            VP: { x: 260, y: 920 },
                            text: "AUTO SPIN",
                            textStyle: {
                                fontFamily: "Montserrat-ExtraBold",
                                fontSize: 35,
                                fill: 0xffffff,
                                fontStyle: "bold"
                            },
                            HX: 640,
                            HY: 383,
                            VX: 360,
                            VY: 663,
                            landAnchorX: 0.5,
                            landAnchorY: 0.5,
                            portAnchorX: 0.5,
                            portAnchorY: 0.5,
                            landScaleX: 1,
                            landScaleY: 1,
                            portScaleX: 1,
                            portScaleY: 1,
                            landAlignX: "CENTER",
                            landAlignY: "BOTTOM",
                            portAlignX: "CENTER",
                            portAlignY: "BOTTOM"
                        }
                    }
                }
            }
        }
    },

    "bigWinView": {
        spineImage: "wins.json",
        setSize: true,
        params: {
            desktopParams: { x: 650, y: 360, anchor: 0.5 },
            HX: 640, HY: 360,
            VX: 360, VY: 620,landScaleX: 1.2,landScaleY:1.2,
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
            params: { anchor: { x: 0.5, y: 0.5 }, x: 0, y: 0, scale : { x : 1 , y : 1 } },
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
                props: {scale:0.6, anchor: { x: 0.5, y: 0.5 } }
            },
            descriptionText: {
                props: { x: 0, y: -55,  anchor: { x: 0.5, y: 0.5 } },
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
                props: { x: 0, y: 128, scale:0.6,anchor: { x: 0.5, y: 0.5 } },
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
                inAnimation : "in",
                loopAnimation : "loop",
                outAnimation : "out",
                props: { anchor: { x: 0.5, y: 0.5 }, scale: 0.6 }
            },
            text1: {
                props: { x: 0, y: -21,  anchor: { x: 0.5, y: 0.5 }, scale : {x: 1, y : -1} },
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
                props: { x: 0, y: 0,  anchor: { x: 0.5, y: 0.5 }, scale : {x: 1, y : -1} },
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
                props: { x: 0, y: 15, anchor: { x: 0.5, y: 0.5 }, scale : {x: 1, y : -1} },
                "textStyle":{
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
                props: { x: 0, y: 47,  anchor: { x: 0.5, y: 0.5 }, scale : {x: 1, y : -1} },
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
                props: { x: 0, y: -17,  anchor: { x: 0.5, y: 0.5 }, scale : {x: 1, y : -1} },
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
                    "maxWidth" : "486"      
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
                inAnimation : "in",
                loopAnimation : "loop",
                outAnimation : "out",
                props: { anchor: { x: 0.5, y: 0.5 }, scale: 0.6, x: 0, y: -40 }
            },
              continueButton: {
                props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 },scale : {x: 1, y : -1} },
                bgImage: "Collect"
            },
            doubleButton: {
                props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 },scale : {x: 1, y : -1} },
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
                props: { x: 0, y: -21,  anchor: { x: 0.5, y: 0.5 }, scale : {x: 1, y : -1} },
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
                props: { x: 0, y: 0,  anchor: { x: 0.5, y: 0.5 }, scale : {x: 1, y : -1} },
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
                props: { x: 0, y: 15, anchor: { x: 0.5, y: 0.5 }, scale : {x: 1, y : -1} },

                "textStyle":{
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
                props: { x: 0, y: 47,  anchor: { x: 0.5, y: 0.5 }, scale : {x: 1, y : -1} },
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
                    "maxWidth" : "650"      
                }
            },
            text4: {
                props: { x: 0, y: -17,  anchor: { x: 0.5, y: 0.5 }, scale : {x: 1, y : -1} },
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
                    "maxWidth" : "453"    
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
                desktopParams: { x: 640, y: 360, anchor: { x: 0.5, y: 0.5 }, scale : 1 },
                HX: 640,
                HY: 350,
                VX: 360,
                VY: 560,
                portScaleX: 1,
                portScaleY: 1,
            },
      background: {
        bgImage: "superWinPopupBase",
        props: { anchor: { x: 0.5, y: 0.5 }, scale : 0.67 },
      },
      descriptionText: {
        props: { x: 0, y: -40, anchor: { x: 0.5, y: 0.5 } },
        text : "",
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
      cancelButton : {
        bgImage: "closeSuperWin",
        props: { x: -140, y: 100, anchor: 0.5, scale : 0.6 }
      },
      confirmButton : {
				bgImage: "correct",
				props: { x: 140, y : 100, anchor: 0.5, scale : 0.6 }
      },
        },
         "superBuyFSPopup": {
            params: {
                desktopParams: { x: 640, y: 360, anchor: { x: 0.5, y: 0.5 }, scale : 1 },
                HX: 640,
                HY: 350,
                VX: 360,
                VY: 560,
                portScaleX: 1,
                portScaleY: 1,
            },
      background: {
        bgImage: "superWinPopupBase",
        props: { anchor: { x: 0.5, y: 0.5 }, scale : 0.67 },
      },
      descriptionText: {
        props: { x: 0, y: -40, anchor: { x: 0.5, y: 0.5 } },
        text : "",
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
      cancelButton : {
        bgImage: "closeSuperWin",
        props: { x: -140, y: 100, anchor: 0.5, scale : 0.6 }
      },
      confirmButton : {
        bgImage: "correct",
        props: { x: 140, y : 100, anchor: 0.5, scale : 0.6 }
      },
    },
    "goldWinPopup": {
        params: {
            desktopParams: { x: 640, y: 360, anchor: { x: 0.5, y: 0.5 }, scale : 1 },
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
        desktopParams: { x: 640, y: 360, anchor: { x: 0.5, y: 0.5 }, scale : 1 },
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
        props: { x: 0, y: -20,anchor: { x: 0.5, y: 0.5 }, scale : 0.6 },
        animationState:{
            In: "Intro",
            Idle_L:"Idle_left_basket",
            Idle_R:"Idle_right_basket",
            // LOOP: "loop",
            Blue_Lose: "Looping_left_lose",
            Red_Lose: "Looping_right_lose",
            Blue_Win: "Looping_left_winning",
            Red_Win: "Looping_right_winning",
      }
    },
    headingText: {
        props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
        text : "",
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
      redButton : {
        bgImage: "basket",
        props: { x: 142, y: 2, anchor: 0.5, scale : 0.6, alpha: 0 }
      },
      blueButton : {
        bgImage: "basket",
        props: { x: -118, y: 1, anchor: 0.5, scale : 0.6, alpha: 0 }
      },
      tossButton : {
        bgImage: "TOSS",
        props: { x: 0, y: 173, anchor: 0.5, scale : 0.6 }
      },
      backButton : {
				bgImage: "Back",
				// props: { x: -584, y : -237, anchor: 0.5, scale : 0.6 }
                props: {
                    VD: { x: -580, y : -237, anchor: 0.5, scale : 0.47},
                    VP: { x: -335, y : -400, anchor: 0.5, scale : 0.8},
                    VL: { x: -675, y : -203, anchor: 0.5, scale : 0.6}
                }
      },
        },
        "extraFsPopup": {
            params: {
                desktopParams: { x: 647, y: 345, anchor: { x: 0.5, y: 0.5 }, scale : 0.9 },
                HX: 680,
                HY: 360,
                VX: 360,
                VY: 400,
                portScaleX: 0.9,
                portScaleY: 0.9,
                landScaleX : 0.8,
                landScaleY : 0.8,
            },
            background: {
                bgImage: "Extra Spins_box",
                props: {x:0, y: 0, anchor: { x: 0.5, y: 0.5 }, scale : 0.5 },
            },
            descriptionText: {
                props: { x: 0, y: -20, anchor: { x: 0.5, y: 0.5 } },
                text : "",
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

            "nice" : {name:"nice" },
            "omg"  : {name:"omg" },
            "super_win" : {name:"super" },
            "fantastic_win" : {name:"fantastic"},

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
            "Meter_Amount_Revel":{name: "Meter_Amount_Revel"},
            //freespin appear
            "bgFS": { name: "freespins_theme" , fadeIn: true, fadeOut: true, volume: 1},
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


            "multiplier": { name: "multiplier"},
            "totalmultiplication": { name: "totalmultiplication" },
            "multiplierIncrease": { name: "multiplier_increase"},
            "pop1":{name:"Regular Burst1",volume:0.5},
            "pop2":{name:"Regular Burst1",volume:0.5},
            "pop3":{name:"Regular Burst1",volume:0.5},
            "pop4":{name:"Regular Burst1",volume:0.5},
            "pop5":{name:"Regular Burst1",volume:0.5},
            "pop6":{name:"Regular Burst1",volume:0.5},

            "sLand_0":{name:"scatter_landing_1"},
            "sLand_1":{name:"scatter_landing_2"},
            "sLand_2":{name:"scatter_landing_3"},
            "sLand_3":{name:"scatter_landing_3"},
            "sLand_4":{name:"scatter_landing_3"},
            "sLand_5":{name:"scatter_landing_3"},
            "scatter_play":{name:"scatter"},
            "move_down":{name:"reels_stop"},

            "scatter_Open":{name:"scatter_opening"},
            "symbolAnim" : {name: "symbolAnim1"},
            "Coin_Shoot" : {name: "Coin_ShootV"},
            "tossWin" : {name: "BasketUI_Win"},
            "tossLoss" : {name: "BasketUI_Lose"},
            "gambleBG" : {name: "BasketUI_Loop"},
            "basketShuffle" : {name: "BasketUI_IN"},
            "basketSelect" : {name: "BasketUI_Select"},
            "BasketUI_OUT" : {name: "BasketUI_OUT"},
            "goldReward" : {name: "scatter_landing"},
            "boxOpen" : {name: "Candy_Box"},
            "transition" : {name: "transition"},
            "cannon" : {name: "cannon"}
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
