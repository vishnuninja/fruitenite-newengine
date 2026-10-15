var _ng = _ng || {};

_ng.ReelViewUiConfig = {
    "data": {
        "noOfReels": 6,
        "noOfSymbols": 5,
        "minSpeed":7,
        "maxSpeed":500,
        "spinSpeed":1,
        "anticipationMaxSpeed":50,//reel spinning speed 
		"anticipationDelay":3000, // reel spin duration  
		"anticipationFrames":{
			"frames" : ["anticipation_00","anticipation_01","anticipation_02","anticipation_03","anticipation_04","anticipation_05","anticipation_06","anticipation_07","anticipation_08","anticipation_09","anticipation_10","anticipation_11","anticipation_12"],
			"props" : {x: 240, y:327, scale:{x:0.65,y:0.65}, animationSpeed: 0.3 }			
		},
        "showScatterLand":true,
        "defaultReels": ["dgfcha", "fecfda", "ecddcb","dgfcfb","dgfcgb"],
        "extraAddSymbols": ["y","a","b","c","d","e","f","g","h","i","s"],
        "symbolConfig": {"symbolWidth": 114, "symbolHeight": 100, "symbolXGap": 0, "symbolYGap":0},
        "eachReelPos": [66,182,298,414,530,646],
        "maskInfo": {
            "maskType": "1",
            "maskPosition": {x: 324, y: 81, width: 694, height: 495}
        },
       
        "reelPositionsWRTGrid": {x: 317, y: 130},
        "reelSpinConfig":{
            "useBlur": true,
            "startJerk":false,
            "startJerkSpeed":500,
            "startJerkDistance":30,

            "endJerk":true,
            "endJerkSpeed":5,
            "endJerkDistance":20,

            "reelSpinStartGap":100,
            "reelStopGap":100,

            "scatterAccelerationDelay":1000,
            "scatterAccelarion":true,

            "reelStopAfterResponseDelay":1
        },
        "lineWinAmtPos":{
            x:0, y:50
        },
        "lineWinAmountTextPos": {
            y: 0
        },

        "isSymbolFadeInWins": true

    },
    "reelViewFixedDimensions":{"w":375 , "h": 667},
    "layout": {
        "VD": {"marginLeft": -452.5, "marginTop": -30, "scale": 1},
        "VL": {"marginLeft": -450, "marginTop": -8, "scale": 1},
        "VP": {"marginLeft": -485, "marginTop": -230, "scale": 1}
    },
    "showScatterLand":true,
    "iPadLayout": {
        "VD": {
            "marginLeft": 0,
            "marginTop": 0,
            "scale": 1
        },
        "VL":{
            "marginLeft": -380,
            "marginTop": -80,
            "scale": 1
        },
        "VP": {
            "marginLeft": -460,
            "marginTop": -220,
            "scale":1
        }
    },
    "reelGridBottom": {
        "image": "reel_frame",
        "id": "reelGridBottom",
        "type": "sprite",
        // "image": "reels",
        // "type": "Spine",
        // "defaultAnimation": "animation",
        "props": {
            "VD": { x: 272, y: 36,  scale:{x:0.58,y:0.6}},
            "VL": { x: 650, y: 308, scale: 0.5},
            "VP": { x: 0,   y: 0,   scale: 0.5}
 
        }
    },
//     "reelGridTop": {
//         "image": "frame",
//         "id": "reelGridTop",
//         "type": "sprite",        
//         "props": {
//             "VD": {x: 125, y:  -15.5,  scale:{x:0.67,y:0.677}},
//             "VL": {x: 133, y:   0,  scale: 0.5},
//             "VP": {x: 10,  y: -70,  scale: 0.5}
//         }
//     },
// "fsReelGridTop": {
//         "image": "FrameFg",
//         "id": "fsReelGridTop",
//         "type": "sprite",      
//         "props": {
//             "VD": {x: 125, y:  -15.5,  scale:{x:0.67,y:0.677}},
//             "VL": {x: 133, y:   0,  scale: 0.5},
//             "VP": {x: 10,  y: -70,  scale: 0.5}
//         }
//     }
}