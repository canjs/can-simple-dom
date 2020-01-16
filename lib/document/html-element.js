var Element = require('./element');

function HTMLElement() {}

HTMLElement.prototype = Object.create(Element.prototype);
HTMLElement.prototype.constructor = HTMLElement;

module.exports = HTMLElement;