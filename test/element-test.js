import Document from 'can-simple-dom/simple-dom/document';
import Serializer from 'can-simple-dom/simple-dom/html-serializer';
import voidMap from 'can-simple-dom/simple-dom/void-map';
import { element, fragment, text } from './support';
import QUnit from 'steal-qunit';

QUnit.module('Element');

// See http://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-core.html#ID-B63ED1A3
QUnit.test("appending a document fragment appends the fragment's children and not the fragment itself", function(assert) {
  var document = new Document();

  var frag = document.createDocumentFragment();
  var elem = document.createElement('div');
  var body = document.body;

  assert.strictEqual(body.firstChild, null, "body has no children");

  frag.appendChild(elem);
  body.appendChild(frag);

  assert.strictEqual(body.firstChild.tagName, "DIV", "fragment's child is added as child of document");
});

// See http://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-core.html#ID-B63ED1A3
QUnit.test("appending a document fragment (via insertBefore) appends the fragment's children and not the fragment itself", function(assert) {
  var document = new Document();

  var frag = document.createDocumentFragment();
  var elem = document.createElement('div');
  var existing = document.createElement('main');
  var body = document.body;
  body.appendChild(existing);

  assert.strictEqual(body.firstChild.tagName, "MAIN", "sanity check: the main element was actually inserted");
  assert.strictEqual(body.lastChild.tagName, "MAIN", "sanity check: the main element was actually inserted");

  frag.appendChild(elem);
  body.insertBefore(frag, existing);

  assert.strictEqual(body.firstChild.tagName, "DIV", "The body's first child is now DIV");
  assert.strictEqual(body.lastChild.tagName, "MAIN", "The body's last child is now MAIN");
});

// http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-536297177
QUnit.test("child nodes can be access via item()", function(assert) {
  var document = new Document();

  var parent = document.createElement('div');

  var child1 = document.createElement('p');
  var child2 = document.createElement('img');

  assert.strictEqual(parent.childNodes.item(0), null, "attempting to access an item that doesn't exist returns null");

  parent.appendChild(child1);
  parent.appendChild(child2);

  assert.strictEqual(parent.childNodes.item(0), child1);
  assert.strictEqual(parent.childNodes.item(1), child2);
  assert.strictEqual(parent.childNodes.item(2), null);

  parent.removeChild(child1);
  assert.strictEqual(parent.childNodes.item(0), child2);
  assert.strictEqual(parent.childNodes.item(1), null);

  parent.removeChild(child2);

  assert.strictEqual(parent.childNodes.item(0), null);
  assert.strictEqual(parent.childNodes.item(1), null);
});

QUnit.test("child nodes returns an array like object", function(assert) {
  var document = new Document();

  assert.equal(document.documentElement.childNodes.length, 2, "documentElement should have head and body");
});

QUnit.test("insertBefore can insert before the last child node", function(assert) {
  var document = new Document();

  var parent = document.createElement('div');

  var child1 = document.createElement('p');
  var child2 = document.createElement('img');
  var child3 = document.createElement('span');

  parent.appendChild(child1);
  parent.appendChild(child2);

  parent.insertBefore(child3, child2);

  assert.strictEqual(parent.childNodes.item(1), child3);
});

QUnit.test("cloneNode(true) recursively clones nodes", function(assert) {
  var parent = element('div');

  var child1 = element('p');
  var child2 = element('img', { src: "hamster.png" });
  var child3 = element('span');

  parent.appendChild(child1);
  parent.appendChild(child2);
  parent.appendChild(child3);

  var child11 = text('hello');
  var child12 = element('span');
  child12.appendChild(text(' world'));
  var child13 = text('!');

  child1.appendChild(child11);
  child1.appendChild(child12);
  child1.appendChild(child13);

  var clone = parent.cloneNode(true);

  assert.notEqual(parent.firstChild, null);
  assert.notStrictEqual(clone.firstChild, parent.firstChild);

  var clone2 = parent.cloneNode(true);

  assert.notEqual(parent.firstChild, null);
  assert.notStrictEqual(clone2.firstChild, clone.firstChild);
  assert.notStrictEqual(clone2.firstChild, parent.firstChild);

  var actual = new Serializer(voidMap).serialize(fragment(clone));

  assert.equal(actual, '<div><p>hello<span> world</span>!</p><img src="hamster.png"/><span></span></div>');
});

QUnit.test("anchor element is created successfully - micro-location works (see #11)", function (assert) {
  assert.expect(0);

  var document = new Document();

  try {
    document.createElement("a");
  } catch (ex) {
    assert.ok(false, "Anchor throws exception");
  }
});

QUnit.test("style.cssText is two way bound to the style attribute (#13)", function(assert){
  var document = new Document();
  var el = document.createElement('div');
  el.style.cssText = "color: green;";
  assert.equal(el.getAttribute("style"), "color: green;");
});

QUnit.test("hasAttribute works", function (assert) {
  var document = new Document();
  var el = document.createElement('div');

  assert.equal(el.hasAttribute('foo'), false);

  el.setAttribute('foo', 'bar');
  assert.equal(el.hasAttribute('foo'), true);
});

QUnit.test("Input values and defaults work as expected", function (assert) {
  var document = new Document();
  var el = document.createElement('input');

  assert.equal(el.value, "");
  assert.equal(el.checked, false);
  assert.equal(el.defaultValue, "");
  assert.equal(el.defaultChecked, false);

  el.setAttribute("value", "foo");
  assert.equal(el.value, "foo");
  assert.equal(el.defaultValue, "foo");

  el.value = "bar";
  assert.equal(el.defaultValue, "foo");

  el.defaultValue = "asdf";
  assert.equal(el.getAttribute("value"), "asdf", "attribute should follow default value");
  assert.equal(el.value, "bar");

  el.setAttribute("checked", "checked");
  assert.equal(el.checked, true);
  assert.equal(el.defaultChecked, true);

  el.checked = false;
  assert.equal(el.defaultChecked, true);

  el.checked = true;
  el.defaultChecked = false;
  assert.equal(el.hasAttribute("checked"), false);
  assert.equal(el.checked, true);
});
