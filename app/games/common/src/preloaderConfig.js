var siteCode = getUrlVar("full_site_code");
var networkCode = "";
if (siteCode) networkCode = siteCode.slice(2, 5);


preloaderConfig = {
  "logoType": "spineAnimation",
  "logoAnimName": "landscape", //Spine state name...
  "preloader": { "file": "loading.json","path": "games/" + gameName + "/dist/"+lang+"/@1x/" },
  "preloaderBar": { "file": "loadingbar.json","path": "games/" + gameName + "/dist/"+lang+"/@1x/" },
  "preBg": {
    "img": "Bg",
    "VD": { x: 0, y: 0, anchor: 0.5, scale: 1},
    "VL": { x: 0, y: -50, anchor: 0.5, scale: 1 },
    "VP": { x: 0, y: -50, anchor: 0.5, scale: 1 }
  },
  "preLogo": {
    // "img": "ninjaLogo",
    "VD": { x: 0, y: 0, anchor: 0.5, scale: 0.6},
    "VL": { x: 0, y: -50, anchor: 0.5, scale: 0.6 },
    "VP": { x: 0, y: 0, anchor: 0.5, scale: 1 }
  },
  "preBar": {
    "barBg": "bar",
    "barFill": "fill",
    "VD": { x: -300, y: 145, scale: 0.6 },
    "VL": { x: -166, y: 40, scale:0.55},
    "VP": { x: -270, y: 160, scale: 0.9 }
  },
  "language": {
    "en": "Loading...",
    "tr": "Yükleniyor..."
  }
}