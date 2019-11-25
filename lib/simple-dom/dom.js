import Node from './document/node';
import Element from './document/element';
import Document from './document';
import HTMLElement from './document/html-element';
import HTMLParser from './html-parser';
import HTMLSerializer from './html-serializer';
import voidMap from './void-map';

function createDocument (serializer, parser){
  var doc = new Document();
  doc.__serializer = serializer;
  doc.__parser = parser;
  return doc;
}

export {
  Node,
  Element,
  HTMLElement,
  Document,
  HTMLParser,
  HTMLSerializer,
  voidMap,
  createDocument
};
