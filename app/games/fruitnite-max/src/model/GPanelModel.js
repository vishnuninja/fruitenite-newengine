// ============================================================================
// ES6 Class Definition: PanelModel
// ============================================================================

class PanelModel {
    constructor() {
    this.accountId = 1;
    this.balance = 0;

    this.gameId = 1;
    this.minCoinValue = 1;
    this.maxCoinValue = 1;
    this.coinArray = [1];
    this.coinDefaultIndex = 0;
    this.selectedCoinIndex = 0;
    this.selectedCoinValue = 1;
    this.currencyPrecision = 2;
    this.totalBet = 25;
    this.allTotalBet = 0;
    this.totalPaylines = 25;
    this.fsPaylines = 0;
    this.selectedPaylines = 25;

    this.totalWin = 0;
    this.totalFreespinWin = 0;
    this.totalGambleWin = 0;
}

    saveInitData(obj) {
    //Store Values from player key
    var data = obj.player;
    if (data.account_id) {
        this.accountId = data.account_id;
    }
    if (data.balance) {
        this.balance = data.balance;
    }

    //Store Values from game key
    var data = obj.game;
    if (!data) { return; }

    if (data.game_id) {
        this.gameId = data.game_id;
    }
    if (data.coin_values) {
        this.coinArray = data.coin_values.split(';');
        this.minCoinValue = this.coinArray[0];
        this.maxCoinValue = this.coinArray[this.coinArray.length - 1];

        var decimals = pixiLib.countDecimals(this.minCoinValue);
        if (decimals > 0) {
            this.currencyPrecision += decimals;
        }
    }
    if (data.num_coins) {
        this.numCoins = (obj.previous_round && obj.previous_round.num_coins) ? obj.previous_round.num_coins : data.num_coins;
    }

   if (data.default_coin_value) {

        var coinValue = (obj.previous_round && obj.previous_round.coin_value) ? obj.previous_round.coin_value : data.default_coin_value;
        //Used in FruitTwister GData.js
        coinValue = this.updateGameCoinValue(obj, coinValue);

        coinValue = coinValue.toString();
        this.coinDefaultIndex = this.coinArray.indexOf(coinValue);
        if (this.coinDefaultIndex == -1) { this.coinDefaultIndex = 0 };
        this.selectedCoinIndex = this.coinDefaultIndex;
        this.selectedCoinValue = this.coinArray[this.selectedCoinIndex];
        
        const isInHistory = (typeof isHistoryMode !== 'undefined') ? isHistoryMode : (typeof window !== 'undefined' && window.location && new URLSearchParams(window.location.search).has('round_id'));
        if (isInHistory) {
            const urlParams = new URLSearchParams(window.location.search);
            const wagerParam = urlParams.get('wager');
            if (wagerParam) {
                var totalWager = parseFloat(wagerParam);
                var feature = '';
                const isAnteBet = urlParams.get('is_ante_bet');
                const isBuyFeature = urlParams.get('is_buy_feature');
                const isSuperBuyFeature = urlParams.get('is_buy_super_feature');

                // Priority: is_ante_bet > is_buy_feature > is_bonus
                if (isAnteBet && isAnteBet === 'true') {
                    feature = 'anteBet';
                } else if (isBuyFeature && isBuyFeature === 'true') {
                    feature = 'buyFreeSpins';
                } else if (isSuperBuyFeature && isSuperBuyFeature === 'true') {
                    feature = 'superBuyFreeSpins';
                }

                if (typeof getBaseWager === 'function') {
                    coinValue = getBaseWager(totalWager, feature);
                } else {
                    coinValue = totalWager / 10;
                }
                this.selectedCoinValue = coinValue;
            }
        }
    }
    if (data.num_paylines) {
        this.totalPaylines = data.num_paylines;
        this.selectedPaylines = (obj.previous_round && obj.previous_round.num_paylines) ? obj.previous_round.num_paylines : data.num_paylines;
        if (this.selectedPaylines < 1) {
            this.selectedPaylines = obj.game.num_paylines;
        }
    }
    if (data.num_paylines_fs) {
        this.fsPaylines = data.num_paylines_fs;
    }
    if (data.paylines_type) {
        this.paylinesType = data.paylines_type;
    }
    this.addGameElements(data);
    this.setTotalBet();
    this.updateOperatorConfig(obj);
}

    updateOperatorConfig(obj) {
}

    updateGameCoinValue(obj, cValue) {
    return cValue;
}

    updatePanelModelWithPFS(PFSData) {
    if (PFSData.amount !== undefined) {
        this.balance = PFSData.amount;
    }

    if (PFSData.num_coins !== undefined) {
        this.numCoins = PFSData.num_coins;
    }

    if (PFSData.coin_value !== undefined) {
        this.coinArray = [PFSData.coin_value];  //only fixed value for Promo spins
        this.minCoinValue = this.coinArray[0];
        this.maxCoinValue = this.coinArray[this.coinArray.length - 1];

        var coinValue = PFSData.coin_value;

        this.coinDefaultIndex = this.coinArray.indexOf(coinValue);
        if (this.coinDefaultIndex == -1) { this.coinDefaultIndex = 0 };
        this.selectedCoinIndex = this.coinDefaultIndex;
        this.selectedCoinValue = this.coinArray[this.selectedCoinIndex];
    }
    this.setTotalBet();

}

    updatePanelModelWithPrevData(prevData) {
    if (!prevData) {
        console.warn('[CyprusPanelModel] updatePanelModelWithPrevData: prevData is undefined');
        return;
    }
    
    // var coinValue = (prevData.previous_round && prevData.previous_round.coin_value) ? prevData.previous_round.coin_value : prevData.default_coin_value;
    var coinValue = prevData.coin_value;
    
    // If coin_value is not in prevData (e.g., when using meta_data.pfr), try to get it from promo_details or current model
    if (!coinValue && coreApp && coreApp.gameModel && coreApp.gameModel.obj && coreApp.gameModel.obj.promo_details) {
        coinValue = coreApp.gameModel.obj.promo_details.coin_value;
    }
    
    // If still no coin_value, use current selected coin value as fallback
    if (!coinValue && this.selectedCoinValue) {
        coinValue = this.selectedCoinValue;
    }
    
    if (!coinValue) {
        console.warn('[CyprusPanelModel] updatePanelModelWithPrevData: coin_value is undefined, skipping update');
        return;
    }
    
    coinValue = coinValue.toString();
    this.coinDefaultIndex = this.coinArray.indexOf(coinValue);
    if (this.coinDefaultIndex == -1) { this.coinDefaultIndex = 0 };
    this.selectedCoinIndex = this.coinDefaultIndex;
    this.selectedCoinValue = this.coinArray[this.selectedCoinIndex];

    _mediator.publish("coinValueUpdated", { index: this.selectedCoinIndex });
    _mediator.publish("totalBetUpdated");
    if (coreApp && coreApp.gameView && coreApp.gameView.panel && coreApp.gameView.panel.coinValue) {
        coreApp.gameView.panel.coinValue.currentIndex = this.selectedCoinIndex;
        coreApp.gameView.panel.coinValue.checkButtonState();
    }

}

    addGameElements(data) { }

    setPaylineValue(value) {
    if (value > 0 && value <= this.totalPaylines) {
        this.selectedPaylines = value;
        this.setTotalBet();
    }
}

    setBetIndex(index) {
    if (index >= 0 && index < this.coinArray.length) {
        this.selectedCoinIndex = index;
        this.selectedCoinValue = this.coinArray[this.selectedCoinIndex];
        this.setTotalBet();
    }
}

    setTotalBet() {
    if (this.paylinesType == "fixed") {
        this.totalBet = this.numCoins * this.selectedCoinValue;
        _mediator.publish("UpdateBet",this.totalBet);
    } else {
        this.totalBet = this.selectedPaylines * this.selectedCoinValue * this.numCoins;
    }
}

    getAllTotalBet() {
    return this.allTotalBet;
}

    setAllTotalBet(totalBet) {
    this.allTotalBet += totalBet;
}

    getTotalBet() {
    return this.totalBet;
}

    getTotalWin() {
    return this.totalWin;
}

    setTotalWin(win) {
    this.totalWin = win;
}

    getTotalPaylines() {
    return this.totalPaylines;
}

    getLineValue() {
    return this.selectedPaylines;
}

    getCoinArray() {
    return this.coinArray;
}

    getCoinIndex() {
    return this.selectedCoinIndex;
}

    getCoinValue() {
    return this.selectedCoinValue;
}

    setNumCoins(coins) {
    this.numCoins = coins;
}

    getSelectedNumCoins() {
    return this.numCoins;
}

}





