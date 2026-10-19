// ============================================================================
// ES6 Class Definition: PanelValueField
// ============================================================================

var _ng = _ng || {};

class PanelValueField extends PIXI.Container {
    constructor(params, parent) {
    super();
    this.params = params.params;
    var viewType = _viewInfoUtil.viewType;

    if(!this.params.makeResponsive) {
        this.params.props[viewType].x = this.params.props[viewType].x || 0;
        this.params.props[viewType].y = this.params.props[viewType].y || 0;
        pixiLib.setProperties(this, this.params.props[viewType]);
    } else {
        _ngFluid.call(this, this.params.props);
    }

    if('backgroundImage' in this.params) {
        var config = this.params.backgroundImage;
        this.backgroundImage = pixiLib.getElement("Sprite", config.image);
        this.backgroundImage.name = config.image;
        pixiLib.setProperties(this.backgroundImage, config.props[viewType]);
        this.addChild(this.backgroundImage);
    }

    if('icon' in this.params) {
        var config = this.params.icon;

        this.icon = pixiLib.getElement("Sprite", config.image);
        this.icon.name = config.image;
        pixiLib.setProperties(this.icon, config.props[viewType]);
        this.addChild(this.icon);
    }

    if('title' in this.params) {
        var config = this.params.title;
        var title = _(config.text);
        if(config.separator){
            title += config.separator;
        }
        this.title = pixiLib.getElement("Text", config.style, title);
        this.title.name = title;
        pixiLib.setProperties(this.title, config.props[viewType]);
        this.addChild(this.title);
    }

    if('value' in this.params) {
        var config = this.params.value;
        this.value = pixiLib.getElement("Text", config.style, '');
        pixiLib.setProperties(this.value, config.props[viewType]);
        this.addChild(this.value);
    }

    parent.addChild(this);

    if(this.params.makeResponsive) {
        this.updateSize();
    }
    _mediator.subscribe(_events.core.onResize, this.onElementResize.bind(this));
}

    setVisibility(bool) {
    this.visible = bool;
}

    setValue(value) {
    if(this.params.valueFormatter !== undefined){
        value = pixiLib[this.params.valueFormatter](value);
    }
    pixiLib.setText(this.value, value);
}

    onElementResize() {
    var viewType = _viewInfoUtil.viewType;
    var elements = ['icon', 'title', 'value'];

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
_ng.PanelValueField = PanelValueField;

