var BGViewUiConfig = [
  {
    "image": "BG_Fruitnite-Animation",
    "id": "bgImg",
    "type": "Spine",
    "isSeparatePortraitImage": true,
    "potraitAnimation" : "Basegame_Portrait",        //static image case not added.Update later
    "defaultAnimation": "Basegame_Landscape",
    "isSizeDoubled": false,
    "isAnchored": true,
    "props": {
      "VD": {
        "x": 637, "y": 358,
        anchor: { x: 0.5, y: 0.5 },
        scale: {x: 0.67, y: 0.67}
      },
      "VL": { alignment: 12, scale: { x: 0, y: 0 }},   //Adjust the x and y for VL and VP in GBGView.js 
      "VP": {  alignment: 12, scale: { x: 0, y: 0 }},  //Add Anchor property 0.5 in the case of sprite
    }
  },
  {
    "image": "BG_Fruitnite-Animation",
    "id": "fsImg",
    "type": "Spine",
    "isSeparatePortraitImage": true,
    "potraitAnimation" : "Freegame_Portrait",                 //Portrait seperate sprite image case not added.
    "defaultAnimation": "Freegame_Landscape",
    "isSizeDoubled": false,
    "isAnchored": true,
    "props": {
      "VD": {
        "x": 637, "y": 358,
        anchor: { x: 0.5, y: 0.5 },
        scale: {x: 0.67, y: 0.67}
      },
      "VL": { alignment: 12, scale: { x: 0, y: 0 } },    //Adjust the x and y for VL and VP in GBGView.js 
      "VP": { alignment: 12, scale: { x: 0, y: 0 } },   //Add Anchor property 0.5 in the case of sprite
    }
  }
];
