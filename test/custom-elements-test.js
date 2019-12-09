var customElements = require('../lib/document/custom-elements');
var HTMLElement = require('../lib/document/html-element');
//var Document = require('../lib/document');
var unit = require('steal-qunit');

unit.module('can-simple-dom - Custom Elements');

unit.test('customElements & HTMLElement have basic expected shape', function(assert) {
	assert.ok(customElements && customElements.define && customElements.get);
	assert.ok(typeof HTMLElement === 'function');
});

// TODO: next task is getting something like this to pass
// unit.test('customElement lifecycle basics work', function(assert) {
// 	var document = new Document();
// 	var doneConstruct = assert.async();
// 	var doneCallback = assert.async();
// 	assert.expect(2);
//
// 	var TestElement = function() {
// 		assert.ok('Called element constructor at creation');
// 		doneCallback();
// 	};
// 	TestElement.prototype = Object.create(document.HTMLElement.prototype);
// 	TestElement.prototype.constructor = TestElement;
// 	TestElement.connectedCallback = function () {
// 		assert.ok('Called element constructor at creation');
// 		doneConstruct();
// 	};
//
// 	document.customElements.define('test-el', TestElement);
// 	var el = document.createElement('test-el');
// 	document.body.appendChild(el);
// });