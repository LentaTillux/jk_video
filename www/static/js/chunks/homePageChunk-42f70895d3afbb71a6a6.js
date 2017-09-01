webpackJsonp([0],{

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Webpack will wrap this module as a chunk.
 * Later, it will be loaded async by the main App.
 *
 * @module ChunkExample
 */

var ChunkExample = function () {
  function ChunkExample(pageName) {
    _classCallCheck(this, ChunkExample);

    this.pageName = pageName;
  }

  _createClass(ChunkExample, [{
    key: "consoleLogPageName",
    value: function consoleLogPageName() {
      console.log("This is " + this.pageName + " page");
    }
  }]);

  return ChunkExample;
}();

exports.default = ChunkExample;

/***/ })

});
//# sourceMappingURL=homePageChunk-42f70895d3afbb71a6a6.js.map