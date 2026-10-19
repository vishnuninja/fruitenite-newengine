// ============================================================================
// ES6 Class Definition: ReplayServiceAdapter
// Dedicated service adapter for game replay / history mode playback.
// Completely decouples replay playback from live casino SlotService.
// ============================================================================

var _ng = _ng || {};

class ReplayServiceAdapter extends _ng.CoreService {
    constructor() {
        super();
        this.isReplayMode = true;
        this.replayRoundId = null;
        this.replayUserLocale = "en";
        this.replayDataArray = [];
        this.currentReplayIndex = 0;
        this.skipInitRequest = false;
        this.requestType = 1;

        // Store reference for legacy controller access
        window.slotService = this;

        this.parseReplayParams();
        this.addEventListeners();
    }

    parseReplayParams() {
        const urlParams = new URLSearchParams(window.location.search);
        this.replayRoundId = urlParams.get('round_id') || "";
        this.replayUserLocale = urlParams.get('user_locale') || "en";
        this.currency = urlParams.get('currency') || sessionStorage.getItem("adaptor_currency") || "try";
    }

    addEventListeners() {
        this._handlers = {
            onInit: this.sendInitReq.bind(this),
            onSpin: this.onReplaySpinRequested.bind(this),
            onFreeSpin: this.onReplaySpinRequested.bind(this),
            onReSpin: this.onReplaySpinRequested.bind(this),
            onRestart: this.restartReplaySequence.bind(this)
        };

        _mediator.subscribe("InitRequest", this._handlers.onInit);
        _mediator.subscribe("callSpinRequest", this._handlers.onSpin);
        _mediator.subscribe("callFreeSpinRequest", this._handlers.onFreeSpin);
        _mediator.subscribe("callReSpinRequest", this._handlers.onReSpin);
        _mediator.subscribe("restartReplay", this._handlers.onRestart);
    }

    removeEventListeners() {
        if (!this._handlers || !_mediator || typeof _mediator.unsubscribe !== "function") return;
        _mediator.unsubscribe("InitRequest", this._handlers.onInit);
        _mediator.unsubscribe("callSpinRequest", this._handlers.onSpin);
        _mediator.unsubscribe("callFreeSpinRequest", this._handlers.onFreeSpin);
        _mediator.unsubscribe("callReSpinRequest", this._handlers.onReSpin);
        _mediator.unsubscribe("restartReplay", this._handlers.onRestart);
    }

    setModel(model) {
        this.slotModel = model;
    }

    sendInitReq() {
        var base = (typeof commonConfig !== "undefined" && commonConfig["serverIP"]) ? commonConfig["serverIP"] : "";
        var spinUrl = commonConfig ? (commonConfig.serverIP + commonConfig.serverURL) : "";
        var mockApiUrl = spinUrl.replace(/ask-server/g, 'mock-ask-server');

        const urlParams = new URLSearchParams(window.location.search);
        const userId = sessionStorage.getItem('rgsUserID') || urlParams.get('user_id') || "";
        const operator = urlParams.get('operator') || sessionStorage.getItem('operator') || "";
        const integrator = urlParams.get('integrator') || sessionStorage.getItem('integrator') || "";

        var payload = "game_id=" + _ng.GameConfig.gameId + 
                      "&request_type=1&amount_type=1" +
                      "&username=" + (sessionStorage.userName || "") +
                      "&user_id=" + userId +
                      "&operator=" + operator +
                      "&integrator=" + integrator +
                      "&currency=" + this.currency +
                      "&user_locale=" + this.replayUserLocale +
                      "&platform=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile") +
                      "&game_name=fruitnite-max" +
                      "&country=TR&is_demo=false" +
                      "&sub_game_id=" + _ng.GameConfig.sub_game_id;

        if (sessionStorage.sessionId) {
            payload += "&session_id=" + sessionStorage.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
        }

        this.requestType = 1;
        this.callServer(mockApiUrl, payload);
    }

    callServer(url, payload) {
        const queryObject = this.parseQueryString(payload);
        const jsonString = JSON.stringify(queryObject, null, 2);

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonString
        })
        .then(res => res.ok ? res.text() : Promise.reject(new Error("Mock init failed")))
        .then(data => {
            this.onInitResponse(data);
        })
        .catch(err => {
            console.warn("⚠️ Replay mock init failed, fetching replay session directly:", err);
            this.getReplayData(() => {
                _mediator.publish(_events.core.initReceived);
            });
        });
    }

    onInitResponse(resObj) {
        try {
            var jsonObj = JSON.parse(resObj);
            if (jsonObj.error_number !== undefined) {
                _mediator.publish(_events.core.error, {
                    code: jsonObj.error_code,
                    message: jsonObj.error_message
                });
                return;
            }

            this.slotModel.saveInitData(resObj);
            _mediator.publish(_events.core.initReceived);

            // Fetch session replay data once init succeeds
            this.getReplayData();
        } catch (error) {
            console.error("❌ Error processing replay init response:", error);
            _mediator.publish(_events.core.error, {
                code: "ERROR_OCCURED",
                message: "Error processing replay initialization."
            });
        }
    }

    getReplayData(callback) {
        this.replayDataArray = [];

        if (!this.replayRoundId) {
            if (callback) callback();
            return;
        }

        // 1. Check local prefetch cache
        try {
            const cached = localStorage.getItem('ng_replay_prefetch');
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed.roundId === String(this.replayRoundId) && parsed.data) {
                    this.processReplayPayload(parsed.data, callback);
                    localStorage.removeItem('ng_replay_prefetch');
                    return;
                }
            }
        } catch (e) { }

        // 2. Fetch from backend /history/session
        var base = (typeof commonConfig !== "undefined" && commonConfig["serverIP"]) ? commonConfig["serverIP"] : "";
        var cleanedBase = base.endsWith("/") ? base.slice(0, -1) : base;
        var url = cleanedBase + "/history/session?round_id=" + encodeURIComponent(this.replayRoundId);

        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(payload => {
                this.processReplayPayload(payload, callback);
            })
            .catch(err => {
                console.error("❌ Failed to fetch replay session:", err);
                if (callback) callback();
            });
    }

    processReplayPayload(payload, callback) {
        let records = [];
        if (Array.isArray(payload)) {
            records = payload;
        } else if (payload && Array.isArray(payload.records)) {
            records = payload.records;
        } else if (payload && Array.isArray(payload.data)) {
            records = payload.data;
        } else if (payload && payload.current_round) {
            records = [payload];
        }

        this.replayDataArray = (records || []).map(rec => {
            const normalized = Object.assign({}, rec, { isHistory: true });
            if (normalized.next_round === null || normalized.next_round === undefined) {
                normalized.next_round = [];
            }
            return normalized;
        });

        if (this.replayDataArray.length > 0) {
            this.setReplayBetAndCurrency(this.replayDataArray[0]);
        }

        if (callback && typeof callback === 'function') {
            callback();
        }
    }

    setReplayBetAndCurrency(record) {
        if (!record || !record.round_info) return;

        var roundInfo = record.round_info;
        var currency = (roundInfo.currency || "try").toLowerCase();
        var coinValue = (roundInfo.wager || 10) / 10;

        if (roundInfo.is_buy_feature) {
            coinValue = coinValue / 100;
        } else if (roundInfo.is_buy_super_feature) {
            coinValue = coinValue / 500;
        } else if (roundInfo.is_ante_bet) {
            coinValue = coinValue / 1.3;
        }

        if (this.slotModel && this.slotModel.userModel) {
            this.slotModel.userModel.currency = currency;
        }
        sessionStorage.setItem("adaptor_currency", currency);

        if (this.slotModel && this.slotModel.panelModel) {
            this.slotModel.panelModel.coinArray.push(coinValue.toString());
            this.slotModel.panelModel.setBetIndex(this.slotModel.panelModel.coinArray.length - 1);

            var displayBet = this.slotModel.getTotalBet();
            if (roundInfo.is_ante_bet) {
                displayBet = displayBet * 1.3;
            }

            if (typeof pixiLib !== "undefined" && pixiLib.getFormattedAmount) {
                const formattedBet = pixiLib.getFormattedAmount(displayBet);
                if (window.externalUi && window.externalUi.call) {
                    window.externalUi.call('bet-amount', 'setText', formattedBet, '');
                }
            }
        }
    }

    onReplaySpinRequested() {
        this.startReplaySequence();
    }

    injectReplayData() {
        this.currentReplayIndex = 0;
        this.startReplaySequence();
    }

    startReplaySequence() {
        if (this.currentReplayIndex >= this.replayDataArray.length) {
            _mediator.publish("onReplayCompleted", {
                roundId: this.replayRoundId,
                userLocale: this.replayUserLocale
            });
            return;
        }

        const currentRecord = this.replayDataArray[this.currentReplayIndex];
        let jsonString = JSON.stringify(currentRecord);
        const dataObj = JSON.parse(jsonString);

        if (dataObj.next_round && dataObj.next_round.type === "freespins") {
            this.requestType = 4;
        } else {
            this.requestType = 2;
        }

        if (dataObj.player && dataObj.round_info) {
            dataObj.player.currency = dataObj.round_info.currency;
        }
        jsonString = JSON.stringify(dataObj);

        this.currentReplayIndex++;
        const isLastReplayRecord = this.currentReplayIndex >= this.replayDataArray.length;

        _mediator.publish("spinStart");

        if (isLastReplayRecord) {
            const roundId = this.replayRoundId;
            const hasWin = Boolean(currentRecord && currentRecord.current_round && Number(currentRecord.current_round.win_amount) > 0);
            if (hasWin) {
                _mediator.once("onTotalWinShown", () => {
                    _mediator.publish("showHistoryModePopup", roundId);
                });
                if (currentRecord.current_round && currentRecord.current_round.post_matrix_info && currentRecord.current_round.post_matrix_info.has_gold) {
                    _mediator.once("showGoldCoinWinAmount", () => {
                        _mediator.publish("showHistoryModePopup", roundId);
                    });
                }
            } else {
                _mediator.once("AllTumbleFinish", () => {
                    _mediator.publish("showHistoryModePopup", roundId);
                });
            }
        }

        setTimeout(() => {
            try {
                if (dataObj.next_round === null || dataObj.next_round === undefined) {
                    dataObj.next_round = [];
                }
                this.slotModel.saveSpinData(jsonString);
                _mediator.publish("onSpinResponse");
            } catch (error) {
                console.error("❌ Error sending replay response:", error);
            }
        }, 300);
    }

    restartReplaySequence() {
        console.log("🎬 Restarting replay sequence");
        this.currentReplayIndex = 0;
        this.startReplaySequence();
    }

    parseQueryString(query) {
        const params = {};
        if (!query) return params;
        query.split('&').forEach(param => {
            let [key, value] = param.split('=');
            if (value === 'null') value = null;
            else if (value === 'true') value = true;
            else if (value === 'false') value = false;
            params[key] = value;
        });
        return params;
    }

    destroy() {
        this.removeEventListeners();
        this.replayDataArray = [];
        this.currentReplayIndex = 0;
    }
}

_ng.ReplayServiceAdapter = ReplayServiceAdapter;
