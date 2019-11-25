import Element from './element';

function HTMLElement() {
}

HTMLElement.prototype = Object.create(Element.prototype);
HTMLElement.prototype.constructor = HTMLElement;
// TODO: need this?
// HTMLElement.prototype.nodeConstructor???

export default HTMLElement;
