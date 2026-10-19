class PromoFreeSpinModel {
	constructor() {
		this.canPlayPFS = false;
		this.isPFSTriggered = false;
		this.isPFSEnded = false;
		this.isPFSActive = false;
		this.isFullPFSActive = false; // will be set false only on listening on onFSEndShown

		this.totalPromoFreeSpins = 0;
		this.totalFSTriggered = 0;
		this.remainingPromoFreeSpins = 0;

		this.totalPFSWins = 0;

		this.PFSData = {};
	}

	saveInitData(obj) {
		if (isHistoryMode || (obj.gamble_recovery_data && obj.gamble_recovery_data.gamble_feature_active)) return;

		if (obj.promo_details && obj.promo_details.coin_value) {
			this.canPlayPFS = true;
		} 
		
		if (obj.meta_data && obj.meta_data.pfr && obj.promo_details && obj.promo_details.type == "promospins") {
			this.isPFSTriggered = true;
			this.isPFSEnded = false;
			this.isPFSActive = true;
			this.isFullPFSActive = true;

			if (obj.meta_data && obj.meta_data.pfr) {
				this.totalPromoFreeSpins = obj.meta_data.pfr.total_pfr_count || 0;
				this.remainingPromoFreeSpins = obj.meta_data.pfr.remain_pfr_count || 0;
				this.totalPFSWins = obj.meta_data.pfr.total_pfr_win || 0;
				this.PFSData = obj.meta_data.pfr;
			} else if (obj.promo_details) {
				this.totalPromoFreeSpins = obj.promo_details.num_spins || 0;
				this.remainingPromoFreeSpins = obj.promo_details.spins_left || 0;
				this.totalPFSWins = obj.promo_details.pfs_win_amount || obj.promo_details.win_amount || 0;
				this.PFSData = obj.promo_details;
			}
		}
		if (obj.previous_round)
			this.previousData = obj;
	}

	saveSpinData(obj) {
		if (isHistoryMode) return;
		if (_ng.GameConfig.PFSUseLater || this.canPlayPFS === false) {
			return;
		}

		var pfsData = null;
		var spinsLeft = 0;
		
		if (obj.meta_data && obj.meta_data.pfr) {
			pfsData = obj.meta_data.pfr;
			spinsLeft = obj.meta_data.pfr.remain_pfr_count || 0;
		} else if (obj.promo_details && obj.promo_details.spins_left !== undefined) {
			pfsData = obj.promo_details;
			spinsLeft = obj.promo_details.spins_left;
		}

		if (pfsData !== null && spinsLeft !== undefined) {
			var wasInPFS = this.isPFSActive && this.remainingPromoFreeSpins > 0;
			var responseHasRemaining = (spinsLeft > 0);

			if (!wasInPFS && !responseHasRemaining) {
				return;
			}

			this.isPFSTriggered = false;
			this.isPFSEnded = false;
			this.isPFSActive = true;
			this.isFullPFSActive = true;

			if (obj.meta_data && obj.meta_data.pfr) {
				this.totalPromoFreeSpins = obj.meta_data.pfr.total_pfr_count || 0;
				this.remainingPromoFreeSpins = obj.meta_data.pfr.remain_pfr_count || 0;
				this.totalPFSWins = obj.meta_data.pfr.total_pfr_win || 0;
				this.PFSData = obj.meta_data.pfr;
			} else {
				this.totalPromoFreeSpins = obj.promo_details.num_spins || 0;
				this.remainingPromoFreeSpins = obj.promo_details.spins_left || 0;
				this.totalPFSWins = obj.promo_details.pfs_win_amount || obj.promo_details.win_amount || 0;
				this.PFSData = obj.promo_details;
			}
			
			if (wasInPFS && spinsLeft == 0) {
				this.isPFSEnded = true;
				this.isPFSActive = false;
			}
		}
	}

	getPFSData() {
		return this.PFSData;
	}

	getPreviousInitData() {
		return this.previousData.previous_round;
	}

	resetPFSData() {
		this.isPFSActive = false;
	}

	updateTotalPFSWin(amount) {
		if (amount < 0) {
			amount = 0;
		}
		this.totalPFSWins = amount;
	}
}


class CyprusPromoFreeSpinModel extends PromoFreeSpinModel {}
