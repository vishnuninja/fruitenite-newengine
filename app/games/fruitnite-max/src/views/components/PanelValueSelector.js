// ============================================================================
// ES6 Class Definition: PanelValueSelector
// ============================================================================

var _ng = _ng || {};

class PanelValueSelector extends PIXI.Container {
    constructor(params, parent) {
    super();

    this.params = params.params;
    this.currentIndex = 3;
    this.defaultIndex = 3;
    this.options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    if(!this.params.makeResponsive) {
        this.params.props[_viewInfoUtil.viewType].x = this.params.props[_viewInfoUtil.viewType].x || 0;
        this.params.props[_viewInfoUtil.viewType].y = this.params.props[_viewInfoUtil.viewType].y || 0;
        pixiLib.setProperties(this, this.params.props[_viewInfoUtil.viewType]);
    } else {
        _ngFluid.call(this, this.params.props);
    }
    if(this.params.backgroundImage !== undefined) {
        var sprite = pixiLib.getElement("Sprite", this.params.backgroundImage);
        this.addChild(sprite);
        if(this.params.BGProps){
            pixiLib.setProperties(sprite, this.params.BGProps[_viewInfoUtil.viewType]);            
        }
    }


    if(this.params.minusButton){
        this.minusButton = pixiLib.getButton(this.params.minusButton.backgroundImage, this.params.minusButton.options);
        this.addChild(this.minusButton);
        pixiLib.addEvent(this.minusButton, this.selectPrevious.bind(this));
        pixiLib.setProperties(this.minusButton, this.params.minusButton.props[_viewInfoUtil.viewType]);
    }
	
    if(this.params.plusButton){
        this.plusButton = pixiLib.getButton(this.params.plusButton.backgroundImage, this.params.plusButton.options);
        this.addChild(this.plusButton);
        pixiLib.addEvent(this.plusButton, this.selectNext.bind(this));
        pixiLib.setProperties(this.plusButton, this.params.plusButton.props[_viewInfoUtil.viewType]);
    }

    this.value = pixiLib.getElement("Text", this.params.value.valueStyle, '');
    this.addChild(this.value);
    pixiLib.setProperties(this.value, this.params.value.props[_viewInfoUtil.viewType])

    if(this.params.title) {
        var config = this.params.title;
        this.title = pixiLib.getElement("Text", config.style, config.text);
        pixiLib.setProperties(this.title, config.props[_viewInfoUtil.viewType]);
        this.addChild(this.title);
    }

    parent.addChild(this);

    this.setValue();
    Object.defineProperties(this, {
        "interactive": {
            set: function(bool){
                if(bool){
                    this.enableAll();
                }else{
                    this.disableAll();
                }
            }.bind(this)
        }
    });
    if(this.params.makeResponsive) {
        this.updateSize();
    }
    _mediator.subscribe(_events.core.onResize, this.onResize.bind(this));
}

    setOptionsArray(options) {
    this.options = options;
}

    setDefaultIndex(index) {
    this.defaultIndex = index;
    this.currentIndex = index;
}

    setValue(str) {
    if(str !== undefined){
        pixiLib.setText(this.value, str);
    }else{
        var optionValue = this.options[this.currentIndex];
        if(this.params.valueFormatter !== undefined){
            optionValue = pixiLib[this.params.valueFormatter](optionValue);
        }
        pixiLib.setText(this.value, optionValue);
        this.checkButtonState();
    }
}

    selectNext() {
    this.currentIndex++;
    if(this.currentIndex == this.options.length){
        this.currentIndex--;
        return;
    }
    this.setValue();
}

    selectPrevious() {
    this.currentIndex--;
    if(this.currentIndex < 0){
        this.currentIndex++;
        return;
    }
    this.setValue();
}

    getCurrentIndex() {
    return this.currentIndex;
}

    getMaxIndex() {
    return (this.options.length - 1);
}

    setMaxIndex() {
    this.currentIndex = this.getMaxIndex();
    this.setValue();
}

    checkButtonState() {
    if(this.minusButton){
        pixiLib.setInteraction(this.minusButton, true);
    }
    if(this.plusButton){
        pixiLib.setInteraction(this.plusButton, true);
    }
    
    if(this.currentIndex === 0){
        if(this.minusButton){
            pixiLib.setInteraction(this.minusButton, false);
        }
    }
    if(this.currentIndex === this.options.length - 1){
        if(this.plusButton){
		    pixiLib.setInteraction(this.plusButton, false);
        }
    }
}

    disableAll() {
    if(this.minusButton){
        pixiLib.setInteraction(this.minusButton, false);
    }
    if(this.plusButton){
        pixiLib.setInteraction(this.plusButton, false);
    }
}

    enableAll() {
    this.checkButtonState();
}

    onResize() {
    var viewType = _viewInfoUtil.viewType;
    var elements = ['minusButton', 'plusButton', 'value', 'title'];

    for(var i = 0; i < elements.length; i++) {
        if(elements[i] in this.params) {
            var element = elements[i];
            pixiLib.setProperties(this[element], this.params[element].props[viewType]);
        }
    }

    if(this.params.makeResponsive) {
        this.setAlignment(this.params.props);
    }
}

}


var _ng = _ng || {};
_ng.PanelValueSelector = PanelValueSelector;

