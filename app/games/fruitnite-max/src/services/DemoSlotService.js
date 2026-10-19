// ============================================================================
// ES6 Class Definition: SlotService
// ============================================================================

var _ng = _ng || {};

var _HAS_PROMO_ = false;

var _Four_scatters_;

class SlotService extends _ng.CoreService {
    constructor() {
	super();
	this.sessionId = sessionStorage.sessionId;
	// hardcode for back office by avinash
	var isBo = getUrlVar('isBO');

	// if (env === "lcl" || env === "bld" || env === "dev") {
	// 	// if (env === "dev") commonConfig.serverDevIP = "";
	// 	this.spinUrl = commonConfig.serverDevIP + commonConfig.serverDevURL;
	// 	this.callBackUrl = commonConfig.serverDevIP + "/gameengine/casino/casino.php";
	// } else if (isBo) {
	// 	this.spinUrl = commonConfig.serverIP + commonConfig.serverURL_BO;
	// 	this.callBackUrl = commonConfig.serverIP + "/gameengine/casino/casino.php";
	// } else {
	// 	this.spinUrl = commonConfig.serverIP + commonConfig.serverURL;
	// 	this.callBackUrl = commonConfig.serverIP + "/gameengine/casino/casino.php";
	// }

	this.spinUrl = commonConfig.serverIP + commonConfig.serverURL;
	this.callBackUrl = commonConfig.serverIP + "/gameengine/casino/casino.php";
	this.sessionId = sessionStorage.sessionId;
	this.isNewUrl = (this.sessionId || this.sessionId == "");
	_ng.superBuyEnabled = false;
	_ng.BuyFSenabled = false;
	_ng.twoXBetEnabled = false;
	_mediator.subscribe("InitRequest", this.sendInitReq.bind(this));
	_mediator.subscribe("SM_COLLECT", this.sendSMCollectReq.bind(this));
	_mediator.subscribe("callReSpinRequest", this.sendReSpinReq.bind(this));
	_mediator.subscribe("callFreeSpinRequest", this.sendFSSpinReq.bind(this));
	_mediator.subscribe("callSpinRequest", this.sendSpinReq.bind(this));
	_mediator.subscribe("callFeatureRequest", this.sendFeatureReq.bind(this));
	_mediator.subscribe("sendCoinFlipReq", this.sendCoinFlipReq.bind(this));
	_mediator.subscribe("callGambleRequest", this.sendGambleReq.bind(this));
	_mediator.subscribe("callBuyFreeSpinRequest", this.BuyFreeSpinRequest.bind(this));
	_mediator.subscribe("callSuperBuyRequest", this.superBuyFreeSpinRequest.bind(this));

	// Store instance globally for access from other modules
	window.slotService = this;

	this.isDemoMode = coreApp.getUrlVar("demoMode");
	if (this.isDemoMode) {
		this.demoUrl = "demoserver/" + _ng.GameConfig.gameName + ".json";
		this.loadDemoServer({});
		this.spinCounter = 0, this.featureCounter = 0, this.fsCounter = 0, this.respinCounter = 0;
	}


	this.amountType = coreApp.gameModel.amountType;

}

    setModel(model) { this.slotModel = model; }

    sendInitReq(obj) {
	const urlParams = new URLSearchParams(window.location.search);
	const getParamValue = function(paramName, sessionStorageKey, defaultValue) {
		if (urlParams && urlParams.has(paramName)) {
			return urlParams.get(paramName);
		}
		if (sessionStorageKey) {
			return sessionStorage.getItem(sessionStorageKey) || sessionStorage[sessionStorageKey] || defaultValue;
		}
		return defaultValue;
	};

	const userName = getParamValue("username", "userName", "");
	var payload = "game_id=" + _ng.GameConfig.gameId + "&request_type=1&amount_type=" + this.amountType + "&username=" + userName;
	if (_ng.GameConfig.gameName === "terracottawarrior" || _ng.GameConfig.gameName === "fruitnite-max") {
		payload += "&sub_game_id=" + _ng.GameConfig.sub_game_id;
	}

	if (this.isNewUrl) {
		payload += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
	}
	const userId = getParamValue("user_id", "userID", "");
	const operator = getParamValue("operator", "operator", "");
	const integrator = getParamValue("integrator", "integrator", "");
	const currency = getParamValue("currency", "adaptor_currency", "try");
	const userLocale = getParamValue("user_locale", "Language", "en");

	payload += "&user_id=" + userId;
	payload += "&operator=" + operator;
	payload += "&integrator=" + integrator;
	payload += "&currency=" + currency;
	payload += "&user_locale=" + userLocale;
	payload += "&platform=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
	payload += "&game_name=fruitnite-max";
	payload += "&country=TR";
	payload += "&is_demo=false";

	this.requestType = 1;
	this.callServer(this.spinUrl, payload);
}

    sendSMCollectReq(obj) {
	var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=7&amount_type=" + this.amountType + "&username=" + sessionStorage.userName;
	if (this.isNewUrl) {
		obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
	}
	this.requestType = 7;
	this.callServer(this.spinUrl, obj);
}

    async sendCoinFlipReq(actionName, color, callback) {
    var apiURL = commonConfig.serverIP + "/gambleOrCollect";
    var obj = {
        action: actionName,
		coin_side_selected: color,
        round_id: coreApp.gameModel.spinData.roundId,
		session_token: sessionStorage.sessionToken,
    };
    const response = await this.gambleRequestServer(apiURL, obj);

    if (!response) return;

    this.slotModel.gambleResultData.saveCoinTossGambleResponse(response);
    coreApp.gameModel.setBalance(
        coreApp.gameModel.gambleResultData.getBalance()
    );

    if (typeof callback === "function") {
        callback(response);
    }
}

    sendReSpinReq(obj) {
	this.requestType = 5;
	var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + this.amountType + "&username=" + sessionStorage.userName;
	if (this.isNewUrl) {
		obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
	}

	if (isGermanUI && coreApp.gameModel.spinData.smBalance>0) {
		obj += "&coin_value2=" + _ng.selectedCoinValue2;
	} else {
		obj += "&coin_value2=0";
	}

	this.callServer(this.spinUrl, obj);
}

    sendFSSpinReq(obj) {
	// MOCK: Intercept freespin requests during PFS mock session
	if (_ng && _ng.GameConfig && _ng.GameConfig.MOCK_PFS_FREESPINS && 
	    coreApp && coreApp.gameModel && coreApp.gameModel.PFSData && 
	    coreApp.gameModel.PFSData._inMockFreespins && 
	    coreApp.gameModel.PFSData._mockFreespinResponses && 
	    coreApp.gameModel.PFSData._mockFreespinResponses.length > 0) {
		
		var mockResponse = coreApp.gameModel.PFSData._mockFreespinResponses.shift();
		
		// Check if this is the last freespin (next_round is empty array or spins_left = 0)
		var isLastFreespin = !mockResponse.next_round || 
		                     (Array.isArray(mockResponse.next_round) && mockResponse.next_round.length === 0) ||
		                     (mockResponse.next_round.spins_left && mockResponse.next_round.spins_left == "0");
		
		// Build full response with player/game data from current model
		var fullResponse = {
			player: coreApp.gameModel.userModel.userData.player,
			game: coreApp.gameModel.userModel.userData.game,
			misc: coreApp.gameModel.userModel.userData.misc,
			current_round: mockResponse.current_round,
			next_round: mockResponse.next_round,
			// During freespins: no promo_details (is_promo = false)
			// After last freespin: restore promo_details (is_promo = true)
			promo_details: isLastFreespin ? coreApp.gameModel.PFSData.PFSData : null
		};
		
		// Simulate server response
		setTimeout(function() {
			this.slotModel.saveSpinData(JSON.stringify(fullResponse));
			_mediator.publish("onSpinResponse");
		}.bind(this), 100);
		
		return; // Don't call the actual server
	}
	if (_ng.superBuyEnabled === true) { _ng.BuyFSenabled = false; }
	if (_ng.BuyFSenabled === true) { _ng.superBuyEnabled = false; }
	this.requestType = 4;
	var amountType = this.amountType;
	var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLinesFS() + "&amount_type=" + this.amountType + "&username=" + sessionStorage.userName;
	if (this.isNewUrl) {
		obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
	}
	//terra
	if(_ng.GameConfig.gameName === "terracottawarrior"){
		var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + amountType + "&username=" + sessionStorage.userName + "&sub_game_id="+_ng.GameConfig.sub_game_id;
		obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
	}
	if(_ng.GameConfig.gameName === "fruitnite-max"){
		if(_ng.BuyFSenabled===true) {
			var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + amountType + "&username=" + sessionStorage.userName + "&sub_game_id="+4;
			obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
		}
		else if(_ng.GameConfig.superBuyEnabled===true){
			var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + amountType + "&username=" + sessionStorage.userName + "&sub_game_id="+8;
			obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
		}
		else if(_ng.twoXBetEnabled===true){
			var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + amountType + "&username=" + sessionStorage.userName + "&sub_game_id="+6;
		
			obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
		}		
		else {
			// var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + amountType + "&username=" + sessionStorage.userName + "&sub_game_id=" + _ng.GameConfig.FG_sub_game_id;
			// obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
			if(_Four_scatters_ === undefined || _Four_scatters_ === false){
				var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + amountType + "&username=" + sessionStorage.userName + "&sub_game_id=" + _ng.GameConfig.FG_sub_game_id;
				obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
				}
				else{
				var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + amountType + "&username=" + sessionStorage.userName + "&sub_game_id=" + 2;
				obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
				}
		}



	}
	if (isGermanUI && coreApp.gameModel.spinData.smBalance > 0) {
		obj += "&coin_value2=" + _ng.selectedCoinValue2;
	} else {
		obj += "&coin_value2=0";
	}

	this.callServer(this.spinUrl, obj);
}

    sendSpinReq(obj) {
	this.requestType = 2;
	var amountType = this.amountType;
	if (coreApp.gameModel.getIsPFSActive()) {
		amountType = 3;
	}

	var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + amountType + "&username=" + sessionStorage.userName;
	if(_ng.GameConfig.gameName === "queensakura"){
		var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=40&num_betlines=40&amount_type=" + amountType + "&username=" + sessionStorage.userName;
	}
	if(_ng.GameConfig.gameName === "terracottawarrior"||_ng.GameConfig.gameName === "fruitnite-max"){
		if(_ng.GameConfig.gameName === "fruitnite-max" && _ng.twoXBetEnabled===true){
			var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + amountType + "&username=" + + sessionStorage.userName  + "&sub_game_id="+5;
		}
		else{
			// debugger
		var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=2&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + amountType + "&username=" + sessionStorage.userName + "&sub_game_id="+_ng.GameConfig.spin_sub_game_id;
		}
	
	}
	if (this.isNewUrl) {
		obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
	}

	if (isGermanUI && coreApp.gameModel.spinData.smBalance > 0) {
		obj += "&coin_value2=" + _ng.selectedCoinValue2;
	} else {
		obj += "&coin_value2=0";
	}

	this.callServer(this.spinUrl, obj);
}

    sendFeatureReq(obj) {
	//terra
	this.requestType = 3;
	this.featureId = obj.id;
	var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=3&amount_type=" + this.amountType + "&username=" + sessionStorage.userName + "&&bonus_game_id=" + obj.id + "&pick_position=" + obj.position + "&sub_game_id=" + obj.subGameId;
	if (this.isNewUrl) {
		obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
	}
	this.callServer(this.spinUrl, obj);
}

    sendGambleReq(obj) {
	this.requestType = 6;
	var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=4&amount_type=" + this.amountType + "&username=" + sessionStorage.userName + "&pick_position=" + obj.position + "&bet_amount=" + obj.betAmount;
	if (this.isNewUrl) {
		obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
	}
	this.callServer(this.spinUrl, obj);
}

    sendFreeSpinReq(obj) { }

    sendBonusReq(obj) { }

    callDemoServer(obj) {
	switch (this.requestType) {
		case 1:
			this.slotModel.saveInitData(JSON.stringify(this.demoData.init));
			_mediator.publish(_events.core.initReceived);
			_mediator.publish("onGameInitResponse");
			break;
		case 2:
			this.slotModel.saveSpinData(JSON.stringify(this.demoData.spin[this.spinCounter]));
			this.spinCounter++;
			_mediator.publish("onSpinResponse");
			break;
		case 3:
			var featureObj = this.demoData["feature_" + this.featureId];
			var objData = featureObj[this.featureCounter];
			this.slotModel.saveFeatureData(JSON.stringify(objData));
			this.featureCounter++;
			if (objData.current_round.state == 1) {
				this.featureCounter = 0;
			}
			_mediator.publish("onFeatureResponse");
			break;
		case 4:
			this.slotModel.saveSpinData(JSON.stringify(this.demoData.fs[this.fsCounter]));
			this.fsCounter++;
			_mediator.publish("onSpinResponse");
			break;
		case 5:
			this.slotModel.saveSpinData(JSON.stringify(this.demoData.respin[this.respinCounter]));
			this.respinCounter++;
			_mediator.publish("onSpinResponse");
			break;
		case 6:
			this.slotModel.saveGambleResponse(JSON.stringify(this.demoData.spin[this.spinCounter]));
			this.spinCounter++;
			_mediator.publish("onGambleResponse");
			break;
		default:
			break;
	};
}

    	callServer(url, obj) {
    obj += "&session_token=" + sessionStorage.sessionToken;
	if (this.isDemoMode) {
		setTimeout(this.callDemoServer.bind(this, obj), 500);
		return;
	}
	const queryObject = parseQueryString(obj);

	queryObject.is_promo = coreApp.gameModel.getIsPFSActive();

	const jsonString = JSON.stringify(queryObject, null, 2);
	var parent = this;
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: jsonString
	})
		.then(response => {
			if (response.ok) {
				return response.text();
			} else {
				_mediator.publish(_events.core.error, { code: "ERROR_OCCURED" });
				throw new Error("Server error");
			}
		})
		.then(data => {
			parent.onServerResponse(data);
		})
		.catch(error => {
			_mediator.publish(_events.core.error, { code: "NO_INTERNET" });
		});
}

    callServerAfterSpin() {
	if (commonConfig.isGameEndService !== "true") {
		return;
	}
	if (this.isDemoMode) {
		return;
	}

	var url = this.callBackUrl;
	var obj = {
		game_id: _ng.GameConfig.gameId,
		amount_type: this.amountType,
		request_type: 5,
		session_id: this.sessionId,
		username: sessionStorage.userName
	};

	var parent = this;

	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: obj
	})
		.then(response => {
			if (response.ok) {
				return response.text();
			}
		})
		.then(data => {
			if (data) {
				parent.onServerResCallBackEvent(data);
			}
		})
		.catch(error => {
			// Skip error publishing as in original code
		});
}

    onServerResCallBackEvent() {
}

    loadDemoServer(obj) {
	var parent = this;
	fetch(this.demoUrl, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Failed to load demo data");
			}
		})
		.then(data => {
			parent.demoData = data;
		})
		.catch(error => {
			console.error("Error loading demo server:", error);
		});
}

    onServerResponse(resObj) {
	var jsonObj = JSON.parse(resObj);

	if (jsonObj.error_number !== undefined) {
		_mediator.publish(_events.core.error, {
			code: jsonObj.error_code,
			message: jsonObj.error_message,
			extraInfo: jsonObj.extra_info
		});
		return;
	}

	// Only set _Four_scatters_ = true when entering freespins from normal game or PFS (4 scatter trigger)
	// Do NOT set it for returning to promospins
	// 4 scatters during normal game OR during PFS should trigger sub_game_id=2
	if ((jsonObj.next_round.parent_type === "normal" || jsonObj.next_round.parent_type === "promospins") 
	     && jsonObj.next_round.type === "freespins") {
		_Four_scatters_ = true;
	} else {
		_Four_scatters_ = false;
	}
	
	switch (this.requestType) {
		case 1:
			try {
				this.slotModel.saveInitData(resObj);

				_mediator.publish(_events.core.initReceived);

				const isHistoryMode = this.isInHistoryMode;
				if (!isHistoryMode && jsonObj.state) {
					if (jsonObj.state.session_token) {
						sessionStorage.sessionToken = jsonObj.state.session_token;
					}
					if (jsonObj.state.user_id) {
						sessionStorage.rgsUserID = jsonObj.state.user_id;
					}
				} else {

				}
			} catch (error) {
				_mediator.publish(_events.core.error, {
					code: "ERROR_OCCURED",
					message: "Error processing game initialization. Please reload the game."
				});
				return;
			}
			break;
		case 2:
			this.slotModel.saveSpinData(resObj);
			_mediator.publish("onSpinResponse");
			this.callServerAfterSpin();
			break;
		case 3:
			this.slotModel.saveFeatureData(resObj);
			_mediator.publish("onFeatureResponse");
			this.callServerAfterSpin();
			break;
		case 4:
			this.slotModel.saveSpinData(resObj);
			_mediator.publish("onSpinResponse");
			this.callServerAfterSpin();
			break;
		case 5:
			this.slotModel.saveSpinData(resObj);
			_mediator.publish("onSpinResponse");
			this.callServerAfterSpin();
			break;
		case 6:
			this.slotModel.saveGambleResponse(resObj);
			_mediator.publish("onGambleResponse");
			this.callServerAfterSpin();
			break;
		case 7:
			this.slotModel.saveBalanceInfoSM(resObj);
			_mediator.publish("onSMCollectResponse");
			this.callServerAfterSpin();
			break;
		case 8:
			this.slotModel.saveSpinData(resObj);
			_mediator.publish("onSpinResponse");
			this.callServerAfterSpin();
			break;
		default:
			break;
	};
}

    BuyFreeSpinRequest(obj) {
	this.requestType = 8;
	var amountType = this.amountType;
	_ng.BuyFSenabled = true;
	_ng.superBuyEnabled = false
	if (coreApp.gameModel.getIsPFSActive()) {
		amountType = 3;
	}
	if(_ng.GameConfig.gameName === "fruitnite-max"){
		var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=8&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + amountType + "&username=" + + sessionStorage.userName  + "&sub_game_id="+3;
			obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
		
	
		if (isGermanUI && coreApp.gameModel.spinData.smBalance > 0) {
			obj += "&coin_value2=" + _ng.selectedCoinValue2;
		} else {
			obj += "&coin_value2=0";
		}
	}
	this.callServer(this.spinUrl, obj);
}

    superBuyFreeSpinRequest(obj) {
	this.requestType = 8;
	var amountType = this.amountType;
	_ng.superBuyEnabled = true;
	_ng.BuyFSenabled = false
	if (coreApp.gameModel.getIsPFSActive()) {
		amountType = 3;
	}
	if(_ng.GameConfig.gameName === "fruitnite-max"){
		var obj = "game_id=" + _ng.GameConfig.gameId + "&request_type=8&coin_value=" + coreApp.gameModel.getSelectedCoinValue() + "&num_coins=" + coreApp.gameModel.getSelectedNumCoins() + "&num_betlines=" + coreApp.gameModel.getSelectedLines() + "&amount_type=" + amountType + "&username=" + + sessionStorage.userName  + "&sub_game_id="+7;
			obj += "&session_id=" + this.sessionId + "&platform_type=" + (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
		
	
		if (isGermanUI && coreApp.gameModel.spinData.smBalance > 0) {
			obj += "&coin_value2=" + _ng.selectedCoinValue2;
		} else {
			obj += "&coin_value2=0";
		}
	}
	this.callServer(this.spinUrl, obj);
}

    fetchReplayData() {

	this.getReplayData(() => {
		if (this.replayDataArray && this.replayDataArray.length > 0) {
			this.injectReplayData();
		}
	});

}

}


var _ng = _ng || {};
_ng.SlotService = SlotService;


function parseQueryString(query) {
	const params = {};
	query.split('&').forEach(param => {
		let [key, value] = param.split('=');
		// Handle null or boolean values appropriately
		if (value === 'null') {
			value = null;
		} else if (value === 'true') {
			value = true;
		} else if (value === 'false') {
			value = false;
		}
		params[key] = value;
	});
	return params;
}

if (!_ng.promoState) {
	_ng.promoState = {
		nextRequestPromoFreeSpin: false
	};
}
