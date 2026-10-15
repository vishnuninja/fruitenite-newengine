
var pcMaxWidth = 1280, pcMaxHeight = 720;
var preWrapper, pcApp, preApp, pcFillBar, pcLogo = [], pcBgBar, pcFillBar, pcLogoSound, pcLogoSoundisReady = false;

function onPageLoad() {
  addScript(appPath + "games/common/src/preloaderConfig.js", onPreloaderConfigLoad);
}

function onPreloaderConfigLoad() {
  preApp = new PreloaderApp();
}

class PreloaderApp {

  constructor() {
    this.config = preloaderConfig; // from preloaderConfig.js, loaded before calling new PreloaderApp...

    this.w = getWindowWidth();
    this.h = getWindowHeight();
    this.viewType = (this.w > this.h) ? "VL" : "VP";
    var xRatio = getWindowWidth() / pcMaxWidth;
    var yRatio = getWindowHeight() / pcMaxHeight;
    this.viewScale = Math.min(xRatio, yRatio);

    //pcApp is used during loading only after it is made null...
    pcApp = new PIXI.Application({ width: this.w, height: this.h, backgroundColor: 0x000000, autoDensity: true, resolution: 2 });
    preWrapper = document.getElementById("preloaderWrapper");
    preWrapper.appendChild(pcApp.view);
    //Bg...
    this.bg = this.createBackground(this.w, this.h);
    pcApp.stage.addChild(this.bg);

    // preCtnr
    this.preCtnr = new PIXI.Container();
    this.preCtnr.name = "preCtnr";
    pcApp.stage.addChild(this.preCtnr);
    // this.preBg = bg;

    // Progress bar in container
    this.barCtnr = new PIXI.Container();
    this.barCtnr.name = "barCtnr";
    this.preCtnr.addChild(this.barCtnr);
    this.barCtnr.alpha = 0;

    const preloaderLoader = new PIXI.Loader();
    preloaderLoader.add('spritesheet0', appPath + this.config.preloader.path + this.config.preloader.file);
    preloaderLoader.add('spritesheet1', appPath + this.config.preloaderBar.path + this.config.preloaderBar.file);
    preloaderLoader.load(this.onAssetsLoaded.bind(this));
  }

  createBackground() {
    var width = getWindowWidth(), height = getWindowHeight();
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    // Base dark background
    // ctx.fillStyle = "#100A15";
    // ctx.fillRect(0, 0, width, height);
    // // Center glow
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const radius = Math.max(width, height) * 0.55;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, "rgba(55, 15, 70, 0.75)");
    gradient.addColorStop(0.35, "rgba(40, 10, 55, 0.55)");
    gradient.addColorStop(0.7, "rgba(25, 8, 32, 0.25)");
    gradient.addColorStop(1, "rgba(16, 10, 21, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    const texture = PIXI.Texture.from(canvas);
    const background = new PIXI.Sprite(texture);
    background.width = width;
    background.height = height;
    return background;
  }

  onAssetsLoaded(loader, resources) {
    console.log("assets loaded ");

    var barTextures = resources.spritesheet1.textures;
    this.barBg = new PIXI.Sprite(barTextures[this.config.preBar.barBg]);
    this.barBg.name = "barBg";
    this.barCtnr.addChild(this.barBg);
    this.barFill = new PIXI.Sprite(barTextures[this.config.preBar.barFill]);
    this.barFill.name = "barFill";
    this.barCtnr.addChild(this.barFill);
    this.barBg.x = -1;
    this.barBg.scale.set(1);
    this.barFillMask = new PIXI.Sprite(barTextures[this.config.preBar.barFill]);
    this.barFillMask.name = "barFillMask";
    this.barCtnr.addChild(this.barFillMask);
    this.barFill.mask = this.barFillMask;
    this.barFillMask.x = -this.barFillMask.width;

    if (this.config.logoType === "spineAnimation") {
      this.createLogoSpine(resources.spritesheet0.spineData);
    } else {
      this.createSpriteLogo();
      loadGameFile();
    }
    this.onResize();
    this.preloaderListener(0);
  }

  createSpriteLogo() {
    if (!this.config.hideLogo && this.config.preLogo.img != "") {
      this.preLogo = new PIXI.Sprite(PIXI.Texture.from(this.config.preLogo.img)); //pixiLib.getElement("Sprite", this.config.preBar.barBg);
      this.preLogo.name = "preLogo";
      this.preCtnr.addChild(this.preLogo);
    }
  }

  createLogoSpine(spinedata) {
    this.preLogo = new PIXI.spine.Spine(spinedata);
    this.preLogo.name = "preLogo";
    this.preLogo.state.setAnimation(0, 'landscape', false);
    this.preLogo.state.addListener({
      complete: function (entry) {
        if (entry.trackIndex === 0) {
          this.barCtnr.alpha = 1;
          loadGameFile(); //Calling here beacuse parallel loading causing spine frame drops...
        }
      }.bind(this)
    });
    this.preCtnr.addChild(this.preLogo);
  }

  preloaderListener(num) {
    this.barFillMask.x = 0;
    this.barFillMask.scale.x = num /100;
  }

  onResize() {
    if (!pcApp) return;
    if (isDesktop) { 
      let renderer = pcApp.renderer;
      let newWidth, newHeight;
      renderer.view.style.width = "100%";
      renderer.view.style.height = "100%";
      // Get the game resolution (or max size) 
      const maxWidth = pcMaxWidth;
      const maxHeight = pcMaxHeight;
      const wWidth = window.innerWidth;
      const wHeight = window.innerHeight;
      const aspectRatio = maxWidth / maxHeight;
      if (wWidth / wHeight > aspectRatio) {
        newHeight = wHeight;
        newWidth = newHeight * aspectRatio;
      } else {
        newWidth = wWidth;
        newHeight = newWidth / aspectRatio;
      }
      document.getElementById("preloaderWrapper").style.width = `${newWidth}px`;
      document.getElementById("preloaderWrapper").style.height = `${newHeight}px`;

      if (this.preBg) {
        this.preBg.anchor.set(0.5);
        this.preBg.scale.set(1);
        this.preBg.x = (getWindowWidth()/1.45) - (this.preBg.width/5.3);
        this.preBg.y = (getWindowHeight()) - (this.preBg.height/2);
      }
      if (this.preLogo) setProperties(this.preLogo, this.config.preLogo[this.viewType]);
      if (this.preTxt)  setProperties(this.preTxt, this.config.preTxt[this.viewType]);
      this.preCtnr.pivot.set(0.5, 0.5);
      this.preCtnr.scale.set(this.viewScale);
      this.preCtnr.x = getWindowWidth() / 2;
      this.preCtnr.y = getWindowHeight() / 2;
    } else {
      if (!pcApp) return;
      var w = getWindowWidth();
      var h = getWindowHeight();
      pcApp.view.style.width = w + 'px';
      pcApp.view.style.height = h + 'px';
      pcApp.renderer.resize(w, h);
      var xRatio = getWindowWidth() / pcMaxWidth;
      var yRatio = getWindowHeight() / pcMaxHeight;
      this.viewScale = Math.min(xRatio, yRatio);
      this.viewType = (w > h) ? "VL" : "VP";
      if (this.preBg) {
        this.preBg.width = w;
        this.preBg.scale.y = this.preBg.scale.x;
        if (this.preBg.height < h) {
          this.preBg.height = h;
          this.preBg.scale.x = this.preBg.scale.y;
        }
      }
      if (this.preLogo) setProperties(this.preLogo, this.config.preLogo[this.viewType]);
    }
    this.preCtnr.pivot.set(0.5, 0.5);
    this.preCtnr.scale.set(this.viewScale);
    this.preCtnr.x = getWindowWidth() / 2;
    this.preCtnr.y = getWindowHeight() / 2;
    setProperties(this.barCtnr, this.config.preBar[this.viewType]);
    this.bg.width = getWindowWidth();
    this.bg.height = getWindowHeight();
  }
}

function setProperties(element, props, isUpdateText) {
  if (props.x !== undefined) { element.x = props.x; }
  if (props.y !== undefined) { element.y = props.y; }
  if (props.scale !== undefined) {
    if (!isNaN(Number(props.scale))) {
      element.scale.set(props.scale);
    } else {
      if (props.scale.x !== undefined) { element.scale.x = props.scale.x; }
      if (props.scale.y !== undefined) { element.scale.y = props.scale.y; }
    }
  }
  if (props.anchor !== undefined && element.anchor !== undefined) {
    if (!isNaN(Number(props.anchor))) {
      element.anchor.set(props.anchor);
    } else {
      if (props.anchor.x !== undefined) { element.anchor.x = props.anchor.x; }
      if (props.anchor.y !== undefined) { element.anchor.y = props.anchor.y; }
    }
  }
  if (props.skew !== undefined && element.skew !== undefined) {
    if (!isNaN(Number(props.skew))) {
      element.skew.set(props.skew);
    } else {
      if (props.skew.x !== undefined) { element.skew.x = props.skew.x; }
      if (props.skew.y !== undefined) { element.skew.y = props.skew.y; }
    }
  }
  if (props.alpha !== undefined) {
    element.alpha = props.alpha;
  }
  if (props.rotation !== undefined) {
    element.rotation = props.rotation;
  }
  if (props.visible !== undefined) {
    element.visible = props.visible;
  }
  if (props.texture !== undefined) {
    this.setTexture(element, props.texture);
  }
  if (props.tint !== undefined) {
    element.tint = props.tint
  }
  if (element.style && props.textStyle && isUpdateText) {
    var style = element["textStyle" + _viewInfoUtil.viewType];
    element.style = style;
    if (style.strokeThickness) {
      element.style.strokeThickness = style.strokeThickness / 2;
    }
    if (style.dropShadowDistance) {
      element.style.dropShadowDistance = style.dropShadowDistance / 2;
    }
    if (style.dropShadowBlur) {
      element.style.dropShadowBlur = style.dropShadowBlur / 2;
    }
    if (style.lineHeight) {
      element.style.lineHeight = style.lineHeight / 2;
    }
    element.style.defaultFontSize = element.style.fontSize;
    this.setText(element, element.text);
  }
  if (element.textStyles && props.textStyle && isUpdateText) {
    var style = element["textStyle" + _viewInfoUtil.viewType];
    element.styles = style;
    element.style.fontSize = style.fontSize * 2;
    element.scale.set(0.5);
    element.style.defaultFontSize = element.style.fontSize;
    this.setText(element, element.text);
  }
};

function getWindowWidth() {
  if (isDesktop)  return pcMaxWidth;
  return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
}
function getWindowHeight() {
  if (isDesktop)  return pcMaxHeight;
  return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
}

function preloaderListener(num) {
  preApp.preloaderListener(num);
}

function preloaderDestroy() {
  // Remove Dev, Canvas, pixi app, pcFillBar, app
  console.log("preloader Destroy");
  window.removeEventListener('resize', onResizePrelaoderComp.bind(this), true);
  preWrapper.remove();
  pcMaxWidth = pcMaxHeight = pcApp = pcFillBar = pcLogo = pcBgBar = pcFillBar = pcLogoSound = pcLogoSoundisReady = null;
}

window.addEventListener('resize', onResizePrelaoderComp.bind(this), false);

function onResizePrelaoderComp() {
  if (preApp) {
    preApp.onResize();
  }
}