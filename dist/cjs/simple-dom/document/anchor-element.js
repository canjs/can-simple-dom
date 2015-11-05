/*can-simple-dom@0.2.21#simple-dom/document/anchor-element*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var Element = _interopRequire(require('./element.js'));
var microLocation = _interopRequire(require('micro-location'));
var extend = _interopRequire(require('../extend.js'));
var Location = microLocation.Location;
function AnchorElement(tagName, ownerDocument) {
    this.elementConstructor(tagName, ownerDocument);
    extend(this, Location.parse(''));
}
AnchorElement.prototype = Object.create(Element.prototype);
AnchorElement.prototype.constructor = AnchorElement;
AnchorElement.prototype.elementConstructor = Element;
AnchorElement.prototype.setAttribute = function (_name, value) {
    Element.prototype.setAttribute.apply(this, arguments);
    if (_name.toLowerCase() === 'href') {
        extend(this, Location.parse(value));
    }
};
module.exports = AnchorElement;