class FeatureModel {
	constructor() {
		this.isFeatureActive = false;
	}

	isActive() {
		return this.isFeatureActive;
	}

	setFeatureState(bool) {
		this.isFeatureActive = bool;
	}

	getFeatureRoundData() {
		return this.featureData;
	}

	setFeatureRoundData(obj) {
		this.isActive = (obj) ? true : false;
		this.featureData = obj;
	}
}


