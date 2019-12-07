var _registry = {};

var customElements = {
	define: function define(tagName, constructor){
		_registry[tagName] = constructor;
	},
	get: function get(tagName) {
		return _registry[tagName];
	}
};

module.exports = customElements;