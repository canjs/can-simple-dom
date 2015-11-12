import Element from './element';
import extend from '../extend';

function InputElement(tagName, ownerDocument) {
  this.elementConstructor(tagName, ownerDocument);
}

InputElement.prototype = Object.create(Element.prototype);
InputElement.prototype.constructor = InputElement;
InputElement.prototype.elementConstructor = Element;

if(Object.defineProperty) {
	Object.defineProperty(InputElement.prototype, 'defaultValue', {
		get: function() { 
			return this.getAttribute('value') || ''; 
		},
		set: function (val) {
			this.setAttribute('value', '' + val);
		}
	});

	Object.defineProperty(InputElement.prototype, 'defaultChecked', {
		get: function() { 
			return this.hasAttribute('checked'); 
		},
		set: function (val) {
			if (val) {
				this.setAttribute("checked", val);
			} else {
				this.removeAttribute("checked");
			}
		}
	});

	Object.defineProperty(InputElement.prototype, 'value', {
		get: function() { 
			return this._value || this.defaultValue || ''; 
		},
		set: function(val){
			this._value = val == null ? '' : '' + val;
		}
	});

	Object.defineProperty(InputElement.prototype, 'checked', {
		get: function() { 
			return this._checked == null ? this.defaultChecked || false : this._checked; 
		},
		set: function(val){
			this._checked = (val == null ? false : !!val);
		}
	});
}

export default InputElement;
