function BonusView(argument) {
	this.parent = argument.parent;
	ViewContainer.call(this, arguments);
}

BonusView.prototype = Object.create(ViewContainer.prototype);
BonusView.prototype.constructor = BonusView;

var view = BonusView.prototype;

view.createView = function (argument) {
};

view.createAllEvents = function (argument) {
	// body...
};

view.resize = function (argument) {
};

view.show = function (argument) {
	this.visible = true;
};

view.hide = function (argument) {
	this.visible = false;
};

view.destroy = function (argument) {
	this.destroy();
};
view.onCloseBonusRound = function(){

};