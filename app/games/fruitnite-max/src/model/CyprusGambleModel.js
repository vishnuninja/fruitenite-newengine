CoinTossGambleModel = function () {
    this.iscoinTossGambleActive = false;
    this.gamebleWinAmount = 0;
    this.balance = 0;
    this.pfrData = {};
};

var gambleModel = CoinTossGambleModel.prototype;

gambleModel.saveCoinTossGambleResponse = function (obj) {
    this.gamebleWinAmount = obj.win_amount * 100;
    this.iscoinTossGambleActive = obj.success;
    this.balance = obj.balance * 100;
    if(obj.pfr_data) {
        this.pfrData = obj.pfr_data;
    }
}

gambleModel.getBalance = function(){
    return this.balance;
}

gambleModel.getGambleWinAmount = function (){
    return this.gamebleWinAmount;
}