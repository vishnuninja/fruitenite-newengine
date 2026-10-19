class UserModel {
	constructor() {
		this.balance = 0;
		this.accountId = 0;
		this.userName = "";
		this.cash = 0;
		this.bonus = 0;
		this.dynamicRTP = "96.01%";
	}

	saveUserInfo(obj) {
		this.userData = obj;
		this.accountId = obj.player.account_id;
		this.balance = obj.player.balance * 100;
		this.currency = obj.player.currency || 'GBP';
		this.currency = this.currency.toLowerCase();
		this.dynamicRTP = obj.game.rtp || '';
		this.dynamicRTPText = this.dynamicRTP + "%.";
	}

	getBalance(argument) {
		return this.balance.toFixed(2);
	}

	setBalance(data) {
		if (data >= 0) {
			this.balance = data;
		}
	}

	getCurrencyCode() {
		return this.currency;
	}

	getPlayerId() {
		return this.accountId;
	}

	updateUserModelWithPFS(PFSData) {
		if (PFSData.amount !== undefined) {
			this.setBalance(PFSData.amount);
		}
		this.currency = "";
	}
}


