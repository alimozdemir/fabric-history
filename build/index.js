"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fabric = _interopRequireDefault(require("fabric"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Canvas =
/*#__PURE__*/
function (_fabric$Canvas) {
  _inherits(Canvas, _fabric$Canvas);

  _createClass(Canvas, [{
    key: "hasUndoItem",
    get: function get() {
      return this._undoList.length;
    }
  }, {
    key: "hasRedoItem",
    get: function get() {
      return this._redoList.length;
    }
  }]);

  function Canvas(el, options) {
    var _this;

    _classCallCheck(this, Canvas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Canvas).call(this, el, options));
    _this._undoList = [];
    _this._redoList = [];
    _this._nextState = _this._historyNext();

    _this.on({
      'object:added': _this._saveHistory,
      'object:removed': _this._saveHistory,
      'object:modified': _this._saveHistory
    });

    return _this;
  }

  _createClass(Canvas, [{
    key: "_historyNext",
    value: function _historyNext() {
      return JSON.stringify(this.toDatalessJSON(this.extraProps));
    }
  }, {
    key: "_historyDispose",
    value: function _historyDispose() {
      this.off({
        'object:added': this._saveHistory,
        'object:removed': this._saveHistory,
        'object:modified': this._saveHistory
      });
    }
  }, {
    key: "_saveHistory",
    value: function _saveHistory() {
      if (this._isProcessing) {
        return;
      }

      this._undoList.push(this._nextState);

      this._nextState = this._historyNext();
    }
  }, {
    key: "undo",
    value: function undo() {
      this._isProcessing = true;

      var history = this._undoList.pop();

      if (history) {
        this._redoList.push(this._historyNext());

        this.loadFromJSON(history).renderAll();
      }

      this._isProcessing = false;
    }
  }, {
    key: "redo",
    value: function redo() {
      this._isProcessing = true;

      var history = this._redoList.pop();

      if (history) {
        this._saveHistory();

        this.loadFromJSON(history).renderAll();
      }

      this._isProcessing = false;
    }
  }]);

  return Canvas;
}(_fabric["default"].Canvas);

exports["default"] = Canvas;