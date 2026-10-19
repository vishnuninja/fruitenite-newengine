var _ng = _ng || {};

// Async fetch helper
function loadFile(path) {
  return fetch(path).then(function (response) {
    if (!response.ok) throw new Error('Failed to load ' + path);
    return response.text();
  });
}

class GameInfoEUI {
  constructor() {
    this.pages = [];
    this.basePath = 'app/games/fruitnite-max/src/controllers/externalUi/game-info/';
    this.addListener();
  }

  addListener() {
    _mediator.subscribe(_events.core.gameCreationCompleted, this.init.bind(this));
  }

  async init() {
    for (var i = 1; i <= 8; i++) {
      try {
        var html = await loadFile(this.basePath + 'page_' + i + '/index.html');
        var css = await loadFile(this.basePath + 'page_' + i + '/style.css');
        this.pages.push({ html: html, css: css });
      } catch (e) {
        console.error('Error loading page', i, e);
      }
    }

    this.createPages();
  }

  createPages() {
    var self = this;
    this.pages.forEach(function (element) {
      var pageData = element.html;

      function getTranslation(key) { 
        return gameLiterals[key];
      }

      pageData = pageData.replace(
        /(<[^>]*localize=["']([^"']+)["'][^>]*>)[^<]*?(<\/[^>]*>)/gi,
        function (match, tag, key, closingTag) {
          return tag + getTranslation(key) + closingTag;
        }
      );

      pageData = self.insertRulesValues(pageData);

      window.externalUi.call('ui-help-popup', 'addPage', {
        html: pageData,
        css: element.css,
      });
    });
  }

  insertRulesValues(html) {
    // 1. Get the actual values from your game engine
    var minWager = coreApp.gameModel.spinData.smCoinValues[0];
    var maxWager = coreApp.gameModel.spinData.smCoinValues[coreApp.gameModel.spinData.smCoinValues.length - 1];

    var formattedMin = pixiLib.getFormattedAmount(minWager);
    var formattedMax = pixiLib.getFormattedAmount(maxWager);

    var ruleVersion = version;
    
    // 2. Find the specific DIV by ID and handle the content inside it
    const regex = /(<[^>]*id="rules_min_bet"[^>]*>)([^<]*)(<\/div>)/gi;
    const regex1 = /(<[^>]*id="rules_version"[^>]*>)([^<]*)(<\/div>)/gi;
    const regex2 = /(<[^>]*id="rules_max_bet"[^>]*>)([^<]*)(<\/div>)/gi;
  
    return html
      .replace(regex, function (match, openingTag, content, closingTag) {
        var updatedContent = content.replace(/XXXX/g, formattedMin);
        return openingTag + updatedContent + closingTag;
      })
      .replace(regex1, function (match, openingTag, content, closingTag) {
        var updatedContent = content.replace(/XXXXX/g, ruleVersion);
        return openingTag + updatedContent + closingTag;
      })
      .replace(regex2, function (match, openingTag, content, closingTag) {
        var updatedContent = content.replace(/XXX/g, formattedMax);
        return openingTag + updatedContent + closingTag;
      });
  }
}


_ng.GameInfoEUI = GameInfoEUI;
