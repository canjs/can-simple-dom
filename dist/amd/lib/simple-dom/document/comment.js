/*lib/simple-dom/document/comment*/
define([
    'exports',
    'module',
    './node'
], function (exports, module, _node) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var Node = _interopRequire(_node);
    function Comment(text, ownerDocument) {
        this.nodeConstructor(8, '#comment', text, ownerDocument);
    }
    Comment.prototype._cloneNode = function () {
        return this.ownerDocument.createComment(this.nodeValue);
    };
    Comment.prototype = Object.create(Node.prototype);
    Comment.prototype.constructor = Comment;
    Comment.prototype.nodeConstructor = Node;
    module.exports = Comment;
});