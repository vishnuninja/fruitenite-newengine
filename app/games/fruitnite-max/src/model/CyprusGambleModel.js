class CoinTossGambleModel {
    constructor() {
        this.iscoinTossGambleActive = false;
        this.gamebleWinAmount = 0;
        this.balance = 0;
        this.pfrData = {};
    }

    saveCoinTossGambleResponse(obj) {
        this.gamebleWinAmount = obj.win_amount * 100;
        this.iscoinTossGambleActive = obj.success;
        this.balance = obj.balance * 100;
        if (obj.pfr_data) {
            this.pfrData = obj.pfr_data;
        }
    }

    getBalance() {
        return this.balance;
    }

    getGambleWinAmount() {
        return this.gamebleWinAmount;
    }
}


