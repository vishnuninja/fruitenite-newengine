(function (global) {
  'use strict';

  const STYLES = `
    .history-choice-overlay {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 32px;
      background: rgba(0,0,0,0.65);
      z-index: 10050;
      backdrop-filter: blur(4px);
    }
    .history-choice-overlay.active {
      display: flex;
    }
    .history-choice-card {
      width: min(520px, 92vw);
      background: rgba(18, 18, 28, 0.95);
      border-radius: 26px;
      border: 1px solid rgba(255,255,255,0.15);
      padding: 36px;
      box-shadow: 0 30px 60px rgba(0,0,0,0.6);
      font-family: 'Montserrat', sans-serif;
      color: #fff;
      text-align: center;
      position: relative;
    }
    .history-choice-title {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.15em;
      margin-bottom: 12px;
      color: #fff;
    }
    .history-choice-desc {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: rgba(255,255,255,0.7);
      margin-bottom: 28px;
      line-height: 1.5;
    }
    .history-choice-actions {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    @media (min-width: 600px) {
      .history-choice-actions {
        flex-direction: row;
      }
    }
    .history-choice-btn {
      flex: 1;
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,0.25);
      padding: 16px 20px;
      background: rgba(30,30,45,0.9);
      color: #fff;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 14px;
      font-weight: 700;
      transition: transform 0.15s, border-color 0.15s, background 0.15s;
    }
    .history-choice-btn:hover {
      transform: translateY(-2px);
      border-color: rgba(255,255,255,0.55);
      background: rgba(45,45,65,0.95);
    }
    .history-choice-btn.primary {
      background: #f7c746;
      color: #1d1407;
      border: none;
      box-shadow: 0 16px 36px rgba(247,199,70,0.35);
    }
    .history-choice-btn.primary:hover {
      background: #ffd86b;
      transform: translateY(-2px);
      box-shadow: 0 20px 40px rgba(247,199,70,0.45);
    }
    .history-choice-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(0,0,0,0.4);
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      transition: background 0.15s;
    }
    .history-choice-close:hover {
      background: rgba(255,255,255,0.15);
    }
  `;

  const DEFAULT_STRINGS = {
    game_history_title: 'GAME HISTORY',
    game_history_desc: 'Choose how you want to review your past rounds',
    replay_panel_btn: 'Replay Panel',
    history_tab_btn: 'History Tab'
  };

  function getTranslation(key) {
    if (typeof gameLiterals !== 'undefined' && gameLiterals && gameLiterals[key]) {
      return gameLiterals[key];
    }
    if (typeof window !== 'undefined' && window.gameLiterals && window.gameLiterals[key]) {
      return window.gameLiterals[key];
    }
    return DEFAULT_STRINGS[key] || key;
  }

  function buildHistoryUrl() {
    const userLocale = sessionStorage.getItem('Language') || sessionStorage.Language || 'en';
    const userId = sessionStorage.getItem('rgsUserID') || sessionStorage.rgsUserID || sessionStorage.getItem('userID') || sessionStorage.userID || '';
    const currency = sessionStorage.getItem('adaptor_currency') || '';
    const origin = window.location.origin;
    let pathname = window.location.pathname;

    let basePath = pathname.replace(/\/[^/]*\.[^/]+$/, '');
    basePath = basePath.replace(/\/+$/, '');
    if (basePath.endsWith('/demo')) {
      basePath = basePath.slice(0, -5);
    }

    const url = new URL(basePath + '/history/index.html', origin);
    url.searchParams.set('user_locale', userLocale);
    if (userId) url.searchParams.set('user_id', userId);
    if (currency) url.searchParams.set('currency', currency);
    return url.toString();
  }

  function executeChoice(choice) {
    hide();
    window.dispatchEvent(new CustomEvent('history-choice-selected', { detail: choice }));

    if (choice === 'history') {
      const url = buildHistoryUrl();
      console.log('🌐 Opening History Tab:', url);
      window.open(url, '_blank');
    } else if (choice === 'replay') {
      console.log('🎬 Opening Replay Panel');
      if (typeof _mediator !== 'undefined' && _mediator.publish) {
        _mediator.publish('SHOW_HISTORY_PANEL');
      }
      if (typeof coreApp !== 'undefined' && coreApp.gameView && coreApp.gameView.historyPanelController) {
        coreApp.gameView.historyPanelController.show();
      }
    }
  }

  function updateTexts() {
    const overlay = document.getElementById('history-choice-panel');
    if (!overlay) return;
    overlay.querySelectorAll('[localize]').forEach(function (el) {
      const key = el.getAttribute('localize');
      if (key) el.textContent = getTranslation(key);
    });
  }

  function createPanel() {
    if (document.getElementById('history-choice-panel')) {
      updateTexts();
      return;
    }

    const style = document.createElement('style');
    style.id = 'history-choice-panel-styles';
    style.textContent = STYLES;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'history-choice-panel';
    overlay.className = 'history-choice-overlay';

    const panelHtml = `
      <div class="history-choice-card">
        <button class="history-choice-close" aria-label="Close">×</button>
        <div class="history-choice-title" localize="game_history_title">${getTranslation('game_history_title')}</div>
        <p class="history-choice-desc" localize="game_history_desc">${getTranslation('game_history_desc')}</p>
        <div class="history-choice-actions">
          <button class="history-choice-btn primary" data-choice="replay">
            <span class="history-choice-btn-label" localize="replay_panel_btn">${getTranslation('replay_panel_btn')}</span>
          </button>
          <button class="history-choice-btn" data-choice="history">
            <span class="history-choice-btn-label" localize="history_tab_btn">${getTranslation('history_tab_btn')}</span>
          </button>
        </div>
      </div>
    `;

    overlay.innerHTML = panelHtml;

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) hide();
    });

    overlay.querySelector('.history-choice-close').addEventListener('click', hide);

    overlay.querySelectorAll('[data-choice]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const choice = btn.dataset.choice;
        executeChoice(choice);
      });
    });

    document.body.appendChild(overlay);
  }

  function show() {
    createPanel();
    const el = document.getElementById('history-choice-panel');
    if (el) {
      el.classList.add('active');
    }
    if (typeof _ng !== 'undefined' && _ng.externalUiController) {
      _ng.externalUiController.isHistoryOpen = true;
    }
  }

  function hide() {
    const el = document.getElementById('history-choice-panel');
    if (el) {
      el.classList.remove('active');
    }
    if (typeof _ng !== 'undefined' && _ng.externalUiController) {
      _ng.externalUiController.isHistoryOpen = false;
    }
  }

  global.HistoryChoicePanel = { show, hide, buildHistoryUrl, executeChoice };
})(typeof window !== 'undefined' ? window : this);
