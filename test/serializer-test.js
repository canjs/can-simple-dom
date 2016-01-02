import { element, fragment, text } from './support';
import Serializer from 'can-simple-dom/simple-dom/html-serializer';
import voidMap from 'can-simple-dom/simple-dom/void-map';
import QUnit from 'steal-qunit';

QUnit.module('Serializer', {
  beforeEach: function() {
    this.serializer = new Serializer(voidMap);
  }
});

QUnit.test('serializes text nodes correctly', function (assert) {
  var actual = this.serializer.serialize(fragment(
    element('div', { id:'foo' },
      element('b', {},
        text('Foo & Bar &amp; Baz < Buz > Biz')
      )
    )
  ));
  assert.equal(actual, '<div id="foo"><b>Foo &amp; Bar &amp; Baz &lt; Buz &gt; Biz</b></div>');
});

QUnit.test('serializes attribute values correctly', function (assert) {
  var actual = this.serializer.serialize(fragment(
    element('div', { title:'"foo & bar &amp; baz < buz > biz"' })
  ));
  assert.equal(actual, '<div title="&quot;foo &amp; bar &amp;amp; baz < buz > biz&quot;"></div>');
});

QUnit.test('serializes textContent', function(assert) {
  var el, actual, frag;

  el = element('div', {});
  el.textContent = 'hello > world &amp; goodbye';
  actual = this.serializer.serialize(fragment(el));

  assert.equal(actual, '<div>hello &gt; world &amp;amp; goodbye</div>');
});
