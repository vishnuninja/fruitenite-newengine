/********************************************************************
 *  gulpfileNew.js  –  fully updated, gulp-minify → gulp-terser
 *  Works with: npm run build -- --gamename="fruitnite-max"
 ********************************************************************/

var gulp = require("gulp");
var concat = require("gulp-concat");
var yargs = require('yargs/yargs');
var { hideBin } = require('yargs/helpers');
var argv = parseArgv(process.argv.slice(2));
var terser = require('gulp-terser');
var version = require('gulp-version-number');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var fs = require('fs');                     // <-- for missing-file check
var path = require('path');
const replace = require("gulp-replace");


var gConfig = require("./gamesConfig.json");

/* -----------------------------------------------------------------
   File lists – keep them exactly as you had them
   ----------------------------------------------------------------- */
var vgLibList = [
  "app/libs/pixi/pixi.min.js",
  "app/libs/pixi/pixi-legacy.min.js",
  "app/libs/howler/howler.min.js",
  "app/libs/mediator/mediator.min.js",
  "app/libs/stats/stats.min.js",
  "app/libs/impetus/impetus.min.js",
  "app/libs/greensock/TweenMax.min.js",
  "app/libs/screenfull/screenfull.js",
  "app/libs/localeplanet/translate.js",
  "app/libs/currency/currency.min.js",
  "app/libs/fontfaceobserver/fontfaceobserver.standalone.js"
];

var vgCoreList = [
  "app/libs/pixi/PIXI.TextInput.js",
  "app/core/app/PIXIUtil.js",
  "app/core/app/CoreApp.js",
  "app/core/app/ViewInfoUtil.js",
  "app/core/app/ngFluid.js",
  "app/core/app/CoreEvents.js",
  "app/core/app/SoundLib.js",
  "app/core/models/CoreModel.js",
  "app/core/views/ViewContainer.js",
  "app/core/views/CoreView.js",
  "app/core/views/ErrorView.js",
  "app/core/views/CoreErrorView.js",
  "app/core/configs/CoreConfig.js",
  "app/core/controllers/CoreController.js",
  "app/core/controllers/LoadingScreenController.js",
  "app/core/controllers/ErrorController.js",
  "app/core/controllers/CoreErrorController.js",
  "app/core/services/CoreService.js"
];

var vgSlotList = [
  "app/games/" + argv.gamename + "/src/configs/SlotConfig.js",
  "app/games/" + argv.gamename + "/src/app/SlotEvents.js",
  "app/games/" + argv.gamename + "/src/model/UserModel.js",
  "app/games/" + argv.gamename + "/src/model/SettingsModel.js",
  "app/games/" + argv.gamename + "/src/model/AutoSpinModel.js",
  "app/games/" + argv.gamename + "/src/model/FeatureModel.js",
  "app/games/" + argv.gamename + "/src/model/GambleModel.js",
  "app/games/" + argv.gamename + "/src/model/CyprusGambleModel.js",
  "app/games/" + argv.gamename + "/src/model/CyprusPromoFreeSpinModel.js",
  "app/games/" + argv.gamename + "/src/services/DemoSlotService.js",
  "app/games/" + argv.gamename + "/src/controllers/BGController.js",
  "app/games/" + argv.gamename + "/src/controllers/BonusController.js",
  "app/games/" + argv.gamename + "/src/controllers/GambleController.js",
  "app/games/" + argv.gamename + "/src/controllers/PaylineController.js",
  "app/games/" + argv.gamename + "/src/controllers/SettingsController.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/BetUi.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/Music.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/SettingsUi.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/AutoPlay.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/Turbo.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/Ticker.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/CommonPopup.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/history-choice-panel.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/ErrorView.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/Replay.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/ElapsedTime.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/game-info/GameInfo.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/ExternalUiController.js",
  "app/games/" + argv.gamename + "/src/controllers/externalUi/PromoView.js",
  "app/games/" + argv.gamename + "/src/views/BonusView.js",
  "app/games/" + argv.gamename + "/src/views/GambleView.js",
  "app/games/" + argv.gamename + "/src/views/PaylineView.js",
  "app/games/" + argv.gamename + "/src/views/components/ClockView.js",
  "app/games/" + argv.gamename + "/src/views/components/CyprusPromoView.js",
  "app/games/" + argv.gamename + "/src/views/components/PanelBGStrip.js",
  "app/games/" + argv.gamename + "/src/views/components/PanelValueField.js",
  "app/games/" + argv.gamename + "/src/views/components/PanelValueSelector.js",
  "app/games/" + argv.gamename + "/src/views/components/WinSymbol.js",
  "app/games/common/src/commonConfig.js"
];

var vgMobileAddonsList = [];

var vgDesktopAddonsList = [];

/* -----------------------------------------------------------------
   CLI args & globals
   ----------------------------------------------------------------- */
var network   = argv.network || "dev";
var gameName  = argv.gamename;
var isAssets  = argv.assets  || false;
var isLobby   = argv.lobby   || false;
var buildPath = "./build/";
var gList     = [];

/* -----------------------------------------------------------------
   Helper: log missing files (only once per list)
   ----------------------------------------------------------------- */
function logMissing(list, name) {
  var missing = list.filter(f => !fs.existsSync(f));
  if (missing.length) {
    console.warn(`\nWarning: [${name}] – ${missing.length} file(s) not found:`);
    missing.forEach(f => console.warn(`   • ${f}`));
    console.warn("");
  }
}

/* -----------------------------------------------------------------
   Init – called by every bundle task
   ----------------------------------------------------------------- */
function init() {
  console.log("isAssets =", isAssets, "isLobby =", isLobby);
  gConfig = JSON.parse(JSON.stringify(gConfig));
  var gamesList = Object.keys(gConfig.gameFiles);
  gList = gList.concat(gamesList); 
  copyGameLauncher();
  copyPreloader();
  copyHistory();
}

/* -----------------------------------------------------------------
   Version stamp config (unchanged)
   ----------------------------------------------------------------- */
const versionConfig = {
  'value': '%DT%',
  'append': {
    'key': 'v',
    'to': ['css', 'js'],
  },
};

/* -----------------------------------------------------------------
   Copy tasks
   ----------------------------------------------------------------- */
copyGameLauncher = function () {
  const ENV = "stg";
  return (
    gulp
      .src(["./Dockerfile", "./main.js", "style.css", "./index.html", "./webserver.js", "package.json", "config.js"])
      .pipe(replace('var env = "lcl";', `var env = "${ENV}";`))
      .pipe(version(versionConfig))
      .pipe(gulp.dest(buildPath + "/"))
  );
}

function copyPreloader() {
  return gulp
      .src(["./js/**/*"])
      .pipe(version(versionConfig))
    .pipe(gulp.dest(buildPath + "/js/"));
}

function copyHistory() {
  return gulp
    .src(
      [
        "./history/index.html",
        "./history/round.html",
        "./pfrRound/pfr_round.html",
        "./history/history.css",
        "./history/history-*.js",
        "./pfrRound/pfr_round.js"
      ],
      { base: "." }
    )
    .pipe(version(versionConfig))
    .pipe(gulp.dest(buildPath));
}
function copyIndex(gameName) {
  return gulp
      .src(["./index.html"])
    .pipe(gulp.dest(buildPath + "../"));
}

/* -----------------------------------------------------------------
   Bundle tasks – now using terser + rename
   ----------------------------------------------------------------- */
function vgLib() {
  init();
  logMissing(vgLibList, "vgLib");
  return gulp
    .src(vgLibList, { allowEmpty: true })
    .pipe(concat("vgLib.js"))
    .pipe(terser({ warnings: true }))
    .pipe(rename({ suffix: "-min" }))
    .pipe(gulp.dest(buildPath + "/core/"));
}

function vgCore() {
  logMissing(vgCoreList, "vgCore");
  return gulp
    .src(vgCoreList, { allowEmpty: true })
      .pipe(concat("vgCore.js"))
    .pipe(terser({ warnings: true }))
    .pipe(rename({ suffix: "-min" }))
    .pipe(gulp.dest(buildPath + "/core/"));
}

function vgSlot() {
  vgGames();                     // copies assets, rules, etc.
  logMissing(vgSlotList, "vgSlot");
  return gulp
    .src(vgSlotList, { allowEmpty: true })
      .pipe(concat("vgSlot.js"))
    .pipe(terser({ warnings: true }))
    .pipe(rename({ suffix: "-min" }))
    .pipe(gulp.dest(buildPath + "/core/"));
}

function vgDesktop(done) {
  if (!vgDesktopAddonsList || !vgDesktopAddonsList.length) return done();
  logMissing(vgDesktopAddonsList, "vgDesktop");
  return gulp
    .src(vgDesktopAddonsList, { allowEmpty: true })
      .pipe(concat("vgDesktopAddons.js"))
    .pipe(terser({ warnings: true }))
    .pipe(rename({ suffix: "-min" }))
    .pipe(gulp.dest(buildPath + "/core/"));
}

function vgMobile(done) {
  if (!vgMobileAddonsList || !vgMobileAddonsList.length) return done();
  logMissing(vgMobileAddonsList, "vgMobile");
  return gulp
    .src(vgMobileAddonsList, { allowEmpty: true })
      .pipe(concat("vgMobileAddons.js"))
    .pipe(terser({ warnings: true }))
    .pipe(rename({ suffix: "-min" }))
    .pipe(gulp.dest(buildPath + "/core/"));
}

/* -----------------------------------------------------------------
   Game-specific assets & source files
   ----------------------------------------------------------------- */
function vgGames() {
  gameTask(gameName);
  copyRules();
  copyCommonAssets();
  copyGameAssets();
  copySourceAssets();
  copyGameInfoPaytableIndexFiles();
  copyHistoryAssets();
  copyGameInfoPaytableAssets();
}

function copyCommonAssets() {
  return gulp
    .src([gConfig.gamePath + "common/dist*/**/*"], { encoding: false })
    .pipe(gulp.dest(buildPath + "/games/common/"));
}

function copyGameAssets() {
  return gulp
    .src([gConfig.gamePath + "/" + gameName + "/dist*/**/*"], { encoding: false })
    .pipe(gulp.dest(buildPath + "/games/" + gameName + "/"));
}

function copySourceAssets() {
  return gulp
    .src([gConfig.gamePath + "/" + gameName + "/sourceAssets/**/*"], { encoding: false })
    .pipe(gulp.dest(buildPath + "/games/" + gameName + "/sourceAssets/"));
}

function copyGameInfoPaytableIndexFiles() {
  return gulp
    .src([gConfig.slotPath + "/controllers/externalUi/game-info" + "/**/*"], { encoding: false })
    .pipe(gulp.dest(buildPath + "app/slot/controllers/externalUi/game-info/"));
}

function copyGameInfoPaytableAssets() {
  return gulp
    .src(["./paytable" + "/**/*"], { encoding: false })
    .pipe(gulp.dest(buildPath + "paytable/"));
}

function copyHistoryAssets() {
  return gulp
    .src(["./history/assets" + "/**/*"], { encoding: false })
    .pipe(gulp.dest(buildPath + "history/assets"));
}

/* -----------------------------------------------------------------
   Game source → game.js + game-min.js (unchanged, already uses terser)
   ----------------------------------------------------------------- */
function getGameFiles(gameName) {
  var ary = [
    gConfig.gamePath + gameName + "/src/configs/GameConfig.js",
    gConfig.gamePath + gameName + "/src/configs/LoadConfig.js",
    gConfig.gamePath + gameName + "/src/configs/UIConfig.js"
  ];
  var gameArr = gConfig.gameFiles[gameName] || [];
  for (let i = 0; i < gameArr.length; i++) {
    gameArr[i] = gConfig.gamePath + gameName + "/src/" + gameArr[i];
  }
  return ary.concat(gameArr);
}

function copyLobby() {
  return gulp
    .src([gConfig.gamePath + "lobby/**/*", "!" + gConfig.gamePath + "lobby/sourceAssets/**"])
    .pipe(gulp.dest(buildPath + "../lobby"));
}

function copyFavicon() {
  return gulp
      .src(gConfig.gamePath + "favicon.ico")
    .pipe(gulp.dest(buildPath + "/" + gameName + "/"));
} 

function copyCommonSrc() {
  return gulp
    .src([gConfig.gamePath + "common/src/**/*", "!" + gConfig.gamePath + "common/src/commonConfig.js"])
    .pipe(gulp.dest(buildPath + "games/common/src/"));
}

function copyRules() {
  return gulp
      .src(gConfig.gamePath + "rules/**/*")
    .pipe(gulp.dest(buildPath + "games/rules/"));
}

function gameTask(gameName) {
  // if (isAssets) {
    copyFavicon(); 
    copyCommonSrc();
  // }
  // if (isLobby) { copyLobby(); }

  return gulp
    .src(getGameFiles(gameName), { allowEmpty: true })
      .pipe(concat("game.js"))
    .pipe(gulp.dest(buildPath + "/games/" + gameName + "/"))          // unminified
      .pipe(terser({ warnings: true }))
      .pipe(rename("game-min.js"))
    .pipe(gulp.dest(buildPath + "/games/" + gameName + "/"));         // minified
}

/* -----------------------------------------------------------------
   Exported tasks
   ----------------------------------------------------------------- */
exports.vgLib      = vgLib;
exports.vgCore     = vgCore;
exports.vgSlot     = vgSlot;
exports.vgDesktop  = vgDesktop;
exports.vgMobile   = vgMobile;
exports.vgGames    = vgGames;

/* -----------------------------------------------------------------
   Dummy build task (keeps original series structure)
   ----------------------------------------------------------------- */
function build(done) {
  const tasks = gList.map(() => cb => cb());
  return gulp.series(...tasks, final => { final(); done(); })();
}

function parseArgv(args) {
  const out = { network: "dev", gamename: "fruitnite-max", assets: false, lobby: false };
  args.forEach((arg) => {
    if (arg === "--assets") out.assets = true;
    else if (arg === "--lobby") out.lobby = true;
    else if (arg.startsWith("--gamename=")) {
      out.gamename = arg.slice("--gamename=".length).replace(/^["']|["']$/g, "");
    } else if (arg.startsWith("--network=")) {
      out.network = arg.slice("--network=".length);
    }
  });
  return out;
}

/* -----------------------------------------------------------------
   BrowserSync (unchanged)
   ----------------------------------------------------------------- */
gulp.task('browser-sync', function () {
  browserSync.init({ server: { baseDir: "../" } });
  gulp.watch('app/games/*/src/*/*.js').on('change', browserSync.reload);
});

/* -----------------------------------------------------------------
   Default series
   ----------------------------------------------------------------- */
exports.default = gulp.series(vgLib, vgCore, vgSlot, vgDesktop, vgMobile, build);
