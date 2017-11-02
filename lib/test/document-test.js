import Document from 'can-simple-dom/simple-dom/document';
import unit from 'steal-qunit';

unit.module('can-simple-dom - Document');

unit.test('Document should contain appended Elements', function (assert) {
	var document = new Document();
	var element = document.createElement('div');
	document.body.appendChild(element);
	assert.ok(document.contains(element), 'document should contain element');

	document.body.removeChild(element);
	assert.notOk(document.contains(element), 'document should not contain element');
});
