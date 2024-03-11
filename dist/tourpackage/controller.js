"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tourpackageController = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _service = require("./service");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var addpackage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _service.tourpackageService.addtourpackage(req, res);
        case 2:
          data = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            status: "success",
            messsage: "package added successfully",
            data: data
          }));
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function addpackage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getSingleTourPackages = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.PkID;
          _context2.next = 4;
          return _service.tourpackageService.getSingleTourPackages(id);
        case 4:
          result = _context2.sent;
          if (!(result instanceof Error)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(500).json({
            error: 'An error occurred while retrieving tour packages'
          }));
        case 7:
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'tour packages retrieved successfully',
            data: result
          }));
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: _context2.t0.message
          }));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getSingleTourPackages(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var getAllTourPackages = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _service.tourpackageService.getAllTourPackages();
        case 3:
          result = _context3.sent;
          if (!(result instanceof Error)) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(500).json({
            error: 'An error occurred while retrieving tour packages'
          }));
        case 6:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'tour packages retrieved successfully',
            data: result
          }));
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: _context3.t0.message
          }));
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function getAllTourPackages(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
var updatePackage = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var PkID, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          PkID = req.params.PkID;
          _context4.next = 4;
          return _service.tourpackageService.updateTourPackage(req, PkID);
        case 4:
          result = _context4.sent;
          if (!(result instanceof Error)) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(500).json({
            error: 'An error occurred while creating Main Image'
          }));
        case 7:
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'package updated successfully',
            data: result
          }));
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            success: false,
            message: _context4.t0.message
          }));
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function updatePackage(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
var mainimage = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var PkID, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          PkID = req.params.PkID;
          _context5.next = 4;
          return _service.tourpackageService.MainImage(req, PkID);
        case 4:
          result = _context5.sent;
          if (!(result instanceof Error)) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(500).json({
            error: 'An error occurred while creating Main Image'
          }));
        case 7:
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'main image  created successfully',
            data: result
          }));
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            success: false,
            message: _context5.t0.message
          }));
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function mainimage(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();
var updateMainImageController = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var imageId, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          imageId = req.params.imageId;
          _context6.next = 4;
          return _service.tourpackageService.UpdateMainImage(req, imageId);
        case 4:
          result = _context6.sent;
          // Check if the result is an error
          if (result instanceof Error) {
            res.status(500).json({
              error: 'An error occurred while updating cover images'
            });
          } else {
            res.status(200).json({
              success: true,
              status: 'OK',
              message: 'image updated successfully',
              data: result
            });
          }
          _context6.next = 12;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).json({
            error: 'An error occurred while updating cover images'
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function updateMainImageController(_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();
var createPlaceVisit = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var PkID, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          PkID = req.params.PkID;
          _context7.next = 4;
          return _service.tourpackageService.createPlaceVisit(req, PkID);
        case 4:
          result = _context7.sent;
          if (!(result instanceof Error)) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 7:
          return _context7.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'place to visited image created successfully',
            data: result
          }));
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            success: false,
            message: _context7.t0.message
          }));
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function createPlaceVisit(_x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}();
var createAlbumimage = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var PkID, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          PkID = req.params.PkID;
          _context8.next = 4;
          return _service.tourpackageService.createAlbumImage(req, PkID);
        case 4:
          result = _context8.sent;
          if (!(result instanceof Error)) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 7:
          return _context8.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'album image created successfully',
            data: result
          }));
        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);
          return _context8.abrupt("return", res.status(500).json({
            success: false,
            message: _context8.t0.message
          }));
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 10]]);
  }));
  return function createAlbumimage(_x17, _x18) {
    return _ref8.apply(this, arguments);
  };
}();
var updateAlbumController = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var AlbumId, result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          AlbumId = req.params.AlbumId;
          _context9.next = 4;
          return _service.tourpackageService.UpdateAlbumImage(req, AlbumId);
        case 4:
          result = _context9.sent;
          // Check if the result is an error
          if (result instanceof Error) {
            res.status(500).json({
              error: 'An error occurred while updating cover images'
            });
          } else {
            res.status(200).json({
              success: true,
              status: 'OK',
              message: 'Album images updated successfully',
              data: result
            });
          }
          _context9.next = 12;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);
          res.status(500).json({
            error: 'An error occurred while updating cover images'
          });
        case 12:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return function updateAlbumController(_x19, _x20) {
    return _ref9.apply(this, arguments);
  };
}();
var createTourPlan = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _service.tourpackageService.createTourPlan(req);
        case 3:
          result = _context10.sent;
          res.status(200).json({
            success: true,
            status: 'success',
            message: 'Tour plans updated or inserted successfully',
            data: result
          });
          _context10.next = 11;
          break;
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          console.error(_context10.t0);
          res.status(500).json({
            status: 'error',
            message: _context10.t0.message
          });
        case 11:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function createTourPlan(_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}();
var createInclusion = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var PkID, result;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          PkID = req.params.PkID;
          _context11.next = 4;
          return _service.tourpackageService.createInclusion(req, PkID);
        case 4:
          result = _context11.sent;
          if (!(result instanceof Error)) {
            _context11.next = 7;
            break;
          }
          return _context11.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 7:
          return _context11.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'Inclusion created successfully'
          }));
        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](0);
          console.error(_context11.t0);
          return _context11.abrupt("return", res.status(500).json({
            success: false,
            message: _context11.t0.message
          }));
        case 14:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 10]]);
  }));
  return function createInclusion(_x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}();
var createExclusion = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          id = req.params.PkID;
          _context12.next = 4;
          return _service.tourpackageService.createExclusion(req, id);
        case 4:
          result = _context12.sent;
          if (!(result instanceof Error)) {
            _context12.next = 7;
            break;
          }
          return _context12.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 7:
          return _context12.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'Exclusion created successfully'
          }));
        case 10:
          _context12.prev = 10;
          _context12.t0 = _context12["catch"](0);
          console.error(_context12.t0);
          return _context12.abrupt("return", res.status(500).json({
            success: false,
            message: _context12.t0.message
          }));
        case 14:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 10]]);
  }));
  return function createExclusion(_x25, _x26) {
    return _ref12.apply(this, arguments);
  };
}();
var createBookingPolicy = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          id = req.params.PkID;
          _context13.next = 4;
          return _service.tourpackageService.createBookingPolicy(req, id);
        case 4:
          result = _context13.sent;
          if (!(result instanceof Error)) {
            _context13.next = 7;
            break;
          }
          return _context13.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 7:
          return _context13.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'Booking Policy created successfully'
          }));
        case 10:
          _context13.prev = 10;
          _context13.t0 = _context13["catch"](0);
          console.error(_context13.t0);
          return _context13.abrupt("return", res.status(500).json({
            success: false,
            message: _context13.t0.message
          }));
        case 14:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 10]]);
  }));
  return function createBookingPolicy(_x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}();
var updateTourPlanEvents = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(eventsData) {
    var connection, updatedEvents, _iterator, _step, event, id, day_event_title, day_event_time, day_event_location, day_event_description, tourPlanEventsUpdateQuery, tourPlanEventsUpdateValues, _yield$connection$que, _yield$connection$que2, updateResult;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return pool.getConnection();
        case 2:
          connection = _context14.sent;
          _context14.prev = 3;
          _context14.next = 6;
          return connection.beginTransaction();
        case 6:
          updatedEvents = [];
          _iterator = _createForOfIteratorHelper(eventsData);
          _context14.prev = 8;
          _iterator.s();
        case 10:
          if ((_step = _iterator.n()).done) {
            _context14.next = 24;
            break;
          }
          event = _step.value;
          id = event.id, day_event_title = event.day_event_title, day_event_time = event.day_event_time, day_event_location = event.day_event_location, day_event_description = event.day_event_description;
          if (!id) {
            _context14.next = 22;
            break;
          }
          tourPlanEventsUpdateQuery = "\n          UPDATE tour_plan_events\n          SET day_event_title = ?,\n              day_event_time = ?,\n              day_event_location = ?,\n              day_event_description = ?\n          WHERE id = ?\n        ";
          tourPlanEventsUpdateValues = [day_event_title, day_event_time, day_event_location, day_event_description, id];
          _context14.next = 18;
          return connection.query(tourPlanEventsUpdateQuery, tourPlanEventsUpdateValues);
        case 18:
          _yield$connection$que = _context14.sent;
          _yield$connection$que2 = _slicedToArray(_yield$connection$que, 1);
          updateResult = _yield$connection$que2[0];
          if (updateResult.affectedRows > 0) {
            updatedEvents.push({
              id: id
            });
          }
        case 22:
          _context14.next = 10;
          break;
        case 24:
          _context14.next = 29;
          break;
        case 26:
          _context14.prev = 26;
          _context14.t0 = _context14["catch"](8);
          _iterator.e(_context14.t0);
        case 29:
          _context14.prev = 29;
          _iterator.f();
          return _context14.finish(29);
        case 32:
          _context14.next = 34;
          return connection.commit();
        case 34:
          return _context14.abrupt("return", updatedEvents);
        case 37:
          _context14.prev = 37;
          _context14.t1 = _context14["catch"](3);
          _context14.next = 41;
          return connection.rollback();
        case 41:
          throw _context14.t1;
        case 42:
          _context14.prev = 42;
          connection.release();
          return _context14.finish(42);
        case 45:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[3, 37, 42, 45], [8, 26, 29, 32]]);
  }));
  return function updateTourPlanEvents(_x29) {
    return _ref14.apply(this, arguments);
  };
}();
var createCancelationPolicy = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          id = req.params.PkID;
          _context15.next = 4;
          return _service.tourpackageService.createCancelationPolicy(req, id);
        case 4:
          result = _context15.sent;
          if (!(result instanceof Error)) {
            _context15.next = 7;
            break;
          }
          return _context15.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 7:
          return _context15.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'Cancellation Policy created successfully'
          }));
        case 10:
          _context15.prev = 10;
          _context15.t0 = _context15["catch"](0);
          console.error(_context15.t0);
          return _context15.abrupt("return", res.status(500).json({
            success: false,
            message: _context15.t0.message
          }));
        case 14:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 10]]);
  }));
  return function createCancelationPolicy(_x30, _x31) {
    return _ref15.apply(this, arguments);
  };
}();
var addAddOnsController = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var tour_package_id, result;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          tour_package_id = req.params.PkID;
          _context16.next = 4;
          return _service.tourpackageService.createAddOns(tour_package_id, req);
        case 4:
          result = _context16.sent;
          // Respond with the result
          res.status(200).json({
            success: true,
            message: 'Add on created successfully'
          });
          _context16.next = 12;
          break;
        case 8:
          _context16.prev = 8;
          _context16.t0 = _context16["catch"](0);
          console.error(_context16.t0);
          return _context16.abrupt("return", res.status(500).json({
            success: false,
            message: _context16.t0.message
          }));
        case 12:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 8]]);
  }));
  return function addAddOnsController(_x32, _x33) {
    return _ref16.apply(this, arguments);
  };
}();
var createHighlights = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          id = req.params.PkID;
          _context17.next = 4;
          return _service.tourpackageService.createHighlights(req, id);
        case 4:
          result = _context17.sent;
          if (!(result instanceof Error)) {
            _context17.next = 7;
            break;
          }
          return _context17.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 7:
          return _context17.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'Highlights created successfully'
          }));
        case 10:
          _context17.prev = 10;
          _context17.t0 = _context17["catch"](0);
          console.error(_context17.t0);
          return _context17.abrupt("return", res.status(500).json({
            success: false,
            message: _context17.t0.message
          }));
        case 14:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 10]]);
  }));
  return function createHighlights(_x34, _x35) {
    return _ref17.apply(this, arguments);
  };
}();
var getTourPlan = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var tourPlanId, tourPlanDetails;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          tourPlanId = req.params.id; // Assuming the tourPlanId is provided as a URL parameter
          // Call the getTourPlan function to retrieve the tour plan details
          _context18.next = 4;
          return _service.tourpackageService.getTourPlan(tourPlanId);
        case 4:
          tourPlanDetails = _context18.sent;
          // Send the tour plan details as a JSON response
          res.status(200).json({
            success: true,
            message: 'Tour plan get successfully',
            data: tourPlanDetails
          });
          _context18.next = 12;
          break;
        case 8:
          _context18.prev = 8;
          _context18.t0 = _context18["catch"](0);
          console.error(_context18.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });
        case 12:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 8]]);
  }));
  return function getTourPlan(_x36, _x37) {
    return _ref18.apply(this, arguments);
  };
}();
// Assuming you have the deleteTourPlanEvents function available

var deleteTourPlanEvents = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          id = req.params.id;
          _context19.next = 4;
          return _service.tourpackageService.deleteTourPlanEvents(req, id);
        case 4:
          result = _context19.sent;
          res.status(200).json({
            success: true,
            message: 'Deleted successfully'
          });
          _context19.next = 12;
          break;
        case 8:
          _context19.prev = 8;
          _context19.t0 = _context19["catch"](0);
          console.error(_context19.t0);
          res.status(500).json({
            success: false,
            error: 'Internal Server Error'
          });
        case 12:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 8]]);
  }));
  return function deleteTourPlanEvents(_x38, _x39) {
    return _ref19.apply(this, arguments);
  };
}();
var tourpackageController = exports.tourpackageController = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
  getSingleTourPackages: getSingleTourPackages,
  getAllTourPackages: getAllTourPackages,
  addpackage: addpackage,
  mainimage: mainimage,
  createPlaceVisit: createPlaceVisit,
  createTourPlan: createTourPlan,
  updateTourPlanEvents: updateTourPlanEvents,
  deleteTourPlanEvents: deleteTourPlanEvents,
  getTourPlan: getTourPlan,
  createInclusion: createInclusion,
  createExclusion: createExclusion,
  createBookingPolicy: createBookingPolicy,
  createCancelationPolicy: createCancelationPolicy,
  createHighlights: createHighlights,
  addAddOnsController: addAddOnsController
}, "getSingleTourPackages", getSingleTourPackages), "createAlbumimage", createAlbumimage), "updateAlbumController", updateAlbumController), "updatePackage", updatePackage), "updateMainImageController", updateMainImageController);