"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tourpackageController = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _service = require("./service");
var _tourpackageControlle;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var addpackage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _service.tourpackageService.addtourpackage(req, res);
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function addpackage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var addFAQs = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _service.tourpackageService.AddFAQs(req, res);
        case 2:
          data = _context2.sent;
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function addFAQs(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getSingleTourPackages = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.PKID;
          _context3.next = 4;
          return _service.tourpackageService.getSingleTourPackages(id);
        case 4:
          result = _context3.sent;
          if (!(result instanceof Error)) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(500).json({
            error: 'An error occurred while retrieving tour packages'
          }));
        case 7:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'tour packages retrieved successfully',
            data: result
          }));
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: _context3.t0.message
          }));
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function getSingleTourPackages(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var getAllTourPackages = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _service.tourpackageService.getAllTourPackages();
        case 3:
          result = _context4.sent;
          if (!(result instanceof Error)) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(500).json({
            error: 'An error occurred while retrieving tour packages'
          }));
        case 6:
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'tour packages retrieved successfully',
            data: result
          }));
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            success: false,
            message: _context4.t0.message
          }));
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function getAllTourPackages(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
var gettouritenrary = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _service.tourpackageService.gettouritenerary(req, res);
        case 2:
          return _context5.abrupt("return", _context5.sent);
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function gettouritenrary(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();
var getbookingslot = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _service.tourpackageService.getbookingslot(req, res);
        case 2:
          return _context6.abrupt("return", _context6.sent);
        case 3:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getbookingslot(_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();
var getInstallment = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var id, pkid, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.bookingslotid;
          pkid = req.body.tourpackageId;
          console.log(id, pkid);
          _context7.next = 6;
          return _service.tourpackageService.getInstallment(id, pkid);
        case 6:
          result = _context7.sent;
          res.status(200).json({
            success: true,
            data: result
          });
          _context7.next = 13;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            success: false,
            message: _context7.t0.message
          });
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function getInstallment(_x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}();
var deletePAckage = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _service.tourpackageService.deletePackage(req, res);
        case 2:
          return _context8.abrupt("return", _context8.sent);
        case 3:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function deletePAckage(_x17, _x18) {
    return _ref8.apply(this, arguments);
  };
}();
var deleteaddons = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _service.tourpackageService.deleteAddons(req, res);
        case 2:
          return _context9.abrupt("return", _context9.sent);
        case 3:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function deleteaddons(_x19, _x20) {
    return _ref9.apply(this, arguments);
  };
}();
var deleteMainimage = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _service.tourpackageService.deletemainimage(req, res);
        case 2:
          return _context10.abrupt("return", _context10.sent);
        case 3:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function deleteMainimage(_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}();
var updatePackage = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _service.tourpackageService.updateTourPackage(req, res);
        case 2:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function updatePackage(_x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}();
var mainimage = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var PkID, result;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          PkID = req.params.PKID;
          _context12.next = 4;
          return _service.tourpackageService.MainImage(req, PkID);
        case 4:
          result = _context12.sent;
          if (!(result instanceof Error)) {
            _context12.next = 7;
            break;
          }
          return _context12.abrupt("return", res.status(500).json({
            error: 'An error occurred while creating Main Image'
          }));
        case 7:
          return _context12.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'main image  created successfully',
            data: result
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
  return function mainimage(_x25, _x26) {
    return _ref12.apply(this, arguments);
  };
}();
var updateMainImageController = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var imageId, result;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          imageId = req.params.imageId;
          _context13.next = 4;
          return _service.tourpackageService.UpdateMainImage(req, imageId);
        case 4:
          result = _context13.sent;
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
          _context13.next = 12;
          break;
        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);
          console.error(_context13.t0);
          res.status(500).json({
            error: 'An error occurred while updating cover images'
          });
        case 12:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 8]]);
  }));
  return function updateMainImageController(_x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}();
var createPlaceVisit = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var PkID, result;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          PkID = req.params.PKID;
          _context14.next = 4;
          return _service.tourpackageService.createPlaceVisit(req, PkID);
        case 4:
          result = _context14.sent;
          if (!(result instanceof Error)) {
            _context14.next = 7;
            break;
          }
          return _context14.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 7:
          return _context14.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'place to visited image created successfully',
            data: result
          }));
        case 10:
          _context14.prev = 10;
          _context14.t0 = _context14["catch"](0);
          console.error(_context14.t0);
          return _context14.abrupt("return", res.status(500).json({
            success: false,
            message: _context14.t0.message
          }));
        case 14:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 10]]);
  }));
  return function createPlaceVisit(_x29, _x30) {
    return _ref14.apply(this, arguments);
  };
}();
var updateviistedController = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          id = req.params.id;
          _context15.next = 3;
          return _service.tourpackageService.UpdatevisitedImage(req, res, id);
        case 3:
          result = _context15.sent;
        case 4:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function updateviistedController(_x31, _x32) {
    return _ref15.apply(this, arguments);
  };
}();
var createAlbumimage = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var PkID, result;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          PkID = req.params.PKID;
          _context16.next = 3;
          return _service.tourpackageService.createAlbumImage(req, res, PkID);
        case 3:
          result = _context16.sent;
        case 4:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function createAlbumimage(_x33, _x34) {
    return _ref16.apply(this, arguments);
  };
}();
var updateAlbumController = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var AlbumId, result;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          AlbumId = req.params.AlbumId;
          _context17.next = 4;
          return _service.tourpackageService.UpdateAlbumImage(req, AlbumId);
        case 4:
          result = _context17.sent;
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
          _context17.next = 12;
          break;
        case 8:
          _context17.prev = 8;
          _context17.t0 = _context17["catch"](0);
          console.error(_context17.t0);
          res.status(500).json({
            error: 'An error occurred while updating cover images'
          });
        case 12:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 8]]);
  }));
  return function updateAlbumController(_x35, _x36) {
    return _ref17.apply(this, arguments);
  };
}();
var createTourPlan = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return _service.tourpackageService.createTourPlan(req);
        case 3:
          result = _context18.sent;
          res.status(200).json({
            success: true,
            status: 'success',
            message: 'Tour plans updated or inserted successfully',
            data: result
          });
          _context18.next = 11;
          break;
        case 7:
          _context18.prev = 7;
          _context18.t0 = _context18["catch"](0);
          console.error(_context18.t0);
          res.status(500).json({
            status: 'error',
            message: _context18.t0.message
          });
        case 11:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 7]]);
  }));
  return function createTourPlan(_x37, _x38) {
    return _ref18.apply(this, arguments);
  };
}();
var getalladdons = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return _service.tourpackageService.getAAlladdOns(req, res);
        case 2:
          result = _context19.sent;
        case 3:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return function getalladdons(_x39, _x40) {
    return _ref19.apply(this, arguments);
  };
}();
var createInclusion = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var PkID, result;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          PkID = req.params.PKID;
          _context20.next = 4;
          return _service.tourpackageService.createInclusion(req, PkID);
        case 4:
          result = _context20.sent;
          if (!(result instanceof Error)) {
            _context20.next = 7;
            break;
          }
          return _context20.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 7:
          return _context20.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'Inclusion created successfully'
          }));
        case 10:
          _context20.prev = 10;
          _context20.t0 = _context20["catch"](0);
          console.error(_context20.t0);
          return _context20.abrupt("return", res.status(500).json({
            success: false,
            message: _context20.t0.message
          }));
        case 14:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 10]]);
  }));
  return function createInclusion(_x41, _x42) {
    return _ref20.apply(this, arguments);
  };
}();
var deletetourinclusion = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return _service.tourpackageService.deleteinclusion(req, res);
        case 2:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  }));
  return function deletetourinclusion(_x43, _x44) {
    return _ref21.apply(this, arguments);
  };
}();
var deletetHighlight = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return _service.tourpackageService.deleteHighlight(req, res);
        case 2:
        case "end":
          return _context22.stop();
      }
    }, _callee22);
  }));
  return function deletetHighlight(_x45, _x46) {
    return _ref22.apply(this, arguments);
  };
}();
var deleteExclusion = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res) {
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return _service.tourpackageService.deleteexclusion(req, res);
        case 2:
        case "end":
          return _context23.stop();
      }
    }, _callee23);
  }));
  return function deleteExclusion(_x47, _x48) {
    return _ref23.apply(this, arguments);
  };
}();
var createExclusion = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, res) {
    var PKID, result;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          PKID = req.params.PKID;
          _context24.next = 4;
          return _service.tourpackageService.createExclusion(req, PKID);
        case 4:
          result = _context24.sent;
          if (!(result instanceof Error)) {
            _context24.next = 7;
            break;
          }
          return _context24.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 7:
          return _context24.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'Exclusion created successfully'
          }));
        case 10:
          _context24.prev = 10;
          _context24.t0 = _context24["catch"](0);
          console.error(_context24.t0);
          return _context24.abrupt("return", res.status(500).json({
            success: false,
            message: _context24.t0.message
          }));
        case 14:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[0, 10]]);
  }));
  return function createExclusion(_x49, _x50) {
    return _ref24.apply(this, arguments);
  };
}();
var createBookingPolicy = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          id = req.params.PKID;
          _context25.next = 4;
          return _service.tourpackageService.createBookingPolicy(req, id);
        case 4:
          result = _context25.sent;
          if (!(result instanceof Error)) {
            _context25.next = 7;
            break;
          }
          return _context25.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 7:
          return _context25.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'Booking Policy created successfully'
          }));
        case 10:
          _context25.prev = 10;
          _context25.t0 = _context25["catch"](0);
          console.error(_context25.t0);
          return _context25.abrupt("return", res.status(500).json({
            success: false,
            message: _context25.t0.message
          }));
        case 14:
        case "end":
          return _context25.stop();
      }
    }, _callee25, null, [[0, 10]]);
  }));
  return function createBookingPolicy(_x51, _x52) {
    return _ref25.apply(this, arguments);
  };
}();
var updateTourPlanEvents = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(eventsData) {
    var connection, updatedEvents, _iterator, _step, event, id, day_event_title, day_event_time, day_event_location, day_event_description, tourPlanEventsUpdateQuery, tourPlanEventsUpdateValues, _yield$connection$que, _yield$connection$que2, updateResult;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          _context26.next = 2;
          return pool.getConnection();
        case 2:
          connection = _context26.sent;
          _context26.prev = 3;
          _context26.next = 6;
          return connection.beginTransaction();
        case 6:
          updatedEvents = [];
          _iterator = _createForOfIteratorHelper(eventsData);
          _context26.prev = 8;
          _iterator.s();
        case 10:
          if ((_step = _iterator.n()).done) {
            _context26.next = 24;
            break;
          }
          event = _step.value;
          id = event.id, day_event_title = event.day_event_title, day_event_time = event.day_event_time, day_event_location = event.day_event_location, day_event_description = event.day_event_description;
          if (!id) {
            _context26.next = 22;
            break;
          }
          tourPlanEventsUpdateQuery = "\n          UPDATE tour_plan_events\n          SET day_event_title = ?,\n              day_event_time = ?,\n              day_event_location = ?,\n              day_event_description = ?\n          WHERE id = ?\n        ";
          tourPlanEventsUpdateValues = [day_event_title, day_event_time, day_event_location, day_event_description, id];
          _context26.next = 18;
          return connection.query(tourPlanEventsUpdateQuery, tourPlanEventsUpdateValues);
        case 18:
          _yield$connection$que = _context26.sent;
          _yield$connection$que2 = _slicedToArray(_yield$connection$que, 1);
          updateResult = _yield$connection$que2[0];
          if (updateResult.affectedRows > 0) {
            updatedEvents.push({
              id: id
            });
          }
        case 22:
          _context26.next = 10;
          break;
        case 24:
          _context26.next = 29;
          break;
        case 26:
          _context26.prev = 26;
          _context26.t0 = _context26["catch"](8);
          _iterator.e(_context26.t0);
        case 29:
          _context26.prev = 29;
          _iterator.f();
          return _context26.finish(29);
        case 32:
          _context26.next = 34;
          return connection.commit();
        case 34:
          return _context26.abrupt("return", updatedEvents);
        case 37:
          _context26.prev = 37;
          _context26.t1 = _context26["catch"](3);
          _context26.next = 41;
          return connection.rollback();
        case 41:
          throw _context26.t1;
        case 42:
          _context26.prev = 42;
          connection.release();
          return _context26.finish(42);
        case 45:
        case "end":
          return _context26.stop();
      }
    }, _callee26, null, [[3, 37, 42, 45], [8, 26, 29, 32]]);
  }));
  return function updateTourPlanEvents(_x53) {
    return _ref26.apply(this, arguments);
  };
}();
var createCancelationPolicy = /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          id = req.params.PKID;
          _context27.next = 4;
          return _service.tourpackageService.createCancelationPolicy(req, id);
        case 4:
          result = _context27.sent;
          if (!(result instanceof Error)) {
            _context27.next = 7;
            break;
          }
          return _context27.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 7:
          return _context27.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'Cancellation Policy created successfully'
          }));
        case 10:
          _context27.prev = 10;
          _context27.t0 = _context27["catch"](0);
          console.error(_context27.t0);
          return _context27.abrupt("return", res.status(500).json({
            success: false,
            message: _context27.t0.message
          }));
        case 14:
        case "end":
          return _context27.stop();
      }
    }, _callee27, null, [[0, 10]]);
  }));
  return function createCancelationPolicy(_x54, _x55) {
    return _ref27.apply(this, arguments);
  };
}();
var createbookingSlot = /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          id = req.params.PKID;
          _context28.next = 4;
          return _service.tourpackageService.createBookingSlot(req, res, id);
        case 4:
          result = _context28.sent;
          return _context28.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'Bookingslot created successfully'
          }));
        case 8:
          _context28.prev = 8;
          _context28.t0 = _context28["catch"](0);
          console.error(_context28.t0);
          return _context28.abrupt("return", res.status(500).json({
            success: false,
            message: _context28.t0.message
          }));
        case 12:
        case "end":
          return _context28.stop();
      }
    }, _callee28, null, [[0, 8]]);
  }));
  return function createbookingSlot(_x56, _x57) {
    return _ref28.apply(this, arguments);
  };
}();
var addAddOnsController = /*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(req, res) {
    var tour_package_id, result;
    return _regeneratorRuntime().wrap(function _callee29$(_context29) {
      while (1) switch (_context29.prev = _context29.next) {
        case 0:
          _context29.prev = 0;
          tour_package_id = req.params.PKID;
          _context29.next = 4;
          return _service.tourpackageService.createAddOns(tour_package_id, req);
        case 4:
          result = _context29.sent;
          // Respond with the result
          res.status(200).json({
            success: true,
            message: 'Add on created successfully'
          });
          _context29.next = 12;
          break;
        case 8:
          _context29.prev = 8;
          _context29.t0 = _context29["catch"](0);
          console.error(_context29.t0);
          return _context29.abrupt("return", res.status(500).json({
            success: false,
            message: _context29.t0.message
          }));
        case 12:
        case "end":
          return _context29.stop();
      }
    }, _callee29, null, [[0, 8]]);
  }));
  return function addAddOnsController(_x58, _x59) {
    return _ref29.apply(this, arguments);
  };
}();
var deletebookingpolicy = /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(req, res) {
    return _regeneratorRuntime().wrap(function _callee30$(_context30) {
      while (1) switch (_context30.prev = _context30.next) {
        case 0:
          _context30.next = 2;
          return _service.tourpackageService.deletepolicy(req, res);
        case 2:
          return _context30.abrupt("return", _context30.sent);
        case 3:
        case "end":
          return _context30.stop();
      }
    }, _callee30);
  }));
  return function deletebookingpolicy(_x60, _x61) {
    return _ref30.apply(this, arguments);
  };
}();
var deletebookingslot = /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31(req, res) {
    return _regeneratorRuntime().wrap(function _callee31$(_context31) {
      while (1) switch (_context31.prev = _context31.next) {
        case 0:
          _context31.next = 2;
          return _service.tourpackageService.deleteBOOKINGSLOT(req, res);
        case 2:
          return _context31.abrupt("return", _context31.sent);
        case 3:
        case "end":
          return _context31.stop();
      }
    }, _callee31);
  }));
  return function deletebookingslot(_x62, _x63) {
    return _ref31.apply(this, arguments);
  };
}();
var cancellationpolicy = /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32(req, res) {
    return _regeneratorRuntime().wrap(function _callee32$(_context32) {
      while (1) switch (_context32.prev = _context32.next) {
        case 0:
          _context32.next = 2;
          return _service.tourpackageService.cancellationPolicy(req, res);
        case 2:
          return _context32.abrupt("return", _context32.sent);
        case 3:
        case "end":
          return _context32.stop();
      }
    }, _callee32);
  }));
  return function cancellationpolicy(_x64, _x65) {
    return _ref32.apply(this, arguments);
  };
}();
var createHighlights = /*#__PURE__*/function () {
  var _ref33 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33(req, res) {
    var PKID, result;
    return _regeneratorRuntime().wrap(function _callee33$(_context33) {
      while (1) switch (_context33.prev = _context33.next) {
        case 0:
          _context33.prev = 0;
          PKID = req.params.PKID;
          _context33.next = 4;
          return _service.tourpackageService.createHighlights(req, PKID);
        case 4:
          result = _context33.sent;
          console.log(PKID);

          // Check if the result is an error
          if (!(result instanceof Error)) {
            _context33.next = 8;
            break;
          }
          return _context33.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 8:
          return _context33.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'Highlights created successfully'
          }));
        case 11:
          _context33.prev = 11;
          _context33.t0 = _context33["catch"](0);
          console.error(_context33.t0);
          return _context33.abrupt("return", res.status(500).json({
            success: false,
            message: _context33.t0.message
          }));
        case 15:
        case "end":
          return _context33.stop();
      }
    }, _callee33, null, [[0, 11]]);
  }));
  return function createHighlights(_x66, _x67) {
    return _ref33.apply(this, arguments);
  };
}();
var Addinstallemnt = /*#__PURE__*/function () {
  var _ref34 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee34(req, res) {
    var PKID, result;
    return _regeneratorRuntime().wrap(function _callee34$(_context34) {
      while (1) switch (_context34.prev = _context34.next) {
        case 0:
          _context34.prev = 0;
          PKID = req.params.PKID;
          _context34.next = 4;
          return _service.tourpackageService.addInstallment(req, PKID);
        case 4:
          result = _context34.sent;
          console.log(PKID);

          // Check if the result is an erro
          if (!(result instanceof Error)) {
            _context34.next = 8;
            break;
          }
          return _context34.abrupt("return", res.status(500).json({
            success: false,
            message: error.message
          }));
        case 8:
          return _context34.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: 'Installment Added successfully'
          }));
        case 11:
          _context34.prev = 11;
          _context34.t0 = _context34["catch"](0);
          console.error(_context34.t0);
          return _context34.abrupt("return", res.status(500).json({
            success: false,
            message: _context34.t0.message
          }));
        case 15:
        case "end":
          return _context34.stop();
      }
    }, _callee34, null, [[0, 11]]);
  }));
  return function Addinstallemnt(_x68, _x69) {
    return _ref34.apply(this, arguments);
  };
}();
var getTourPlan = /*#__PURE__*/function () {
  var _ref35 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee35(req, res) {
    var tourPlanId, tourPlanDetails;
    return _regeneratorRuntime().wrap(function _callee35$(_context35) {
      while (1) switch (_context35.prev = _context35.next) {
        case 0:
          _context35.prev = 0;
          tourPlanId = req.params.id; // Assuming the tourPlanId is provided as a URL parameter
          // Call the getTourPlan function to retrieve the tour plan details
          _context35.next = 4;
          return _service.tourpackageService.getTourPlan(tourPlanId);
        case 4:
          tourPlanDetails = _context35.sent;
          // Send the tour plan details as a JSON response
          res.status(200).json({
            success: true,
            message: 'Tour plan get successfully',
            data: tourPlanDetails
          });
          _context35.next = 12;
          break;
        case 8:
          _context35.prev = 8;
          _context35.t0 = _context35["catch"](0);
          console.error(_context35.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });
        case 12:
        case "end":
          return _context35.stop();
      }
    }, _callee35, null, [[0, 8]]);
  }));
  return function getTourPlan(_x70, _x71) {
    return _ref35.apply(this, arguments);
  };
}();
// Assuming you have the deleteTourPlanEvents function available

var deleteTourPlanEvents = /*#__PURE__*/function () {
  var _ref36 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee36(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee36$(_context36) {
      while (1) switch (_context36.prev = _context36.next) {
        case 0:
          _context36.prev = 0;
          id = req.params.id;
          _context36.next = 4;
          return _service.tourpackageService.deleteTourPlanEvents(req, id);
        case 4:
          result = _context36.sent;
          res.status(200).json({
            success: true,
            message: 'Deleted successfully'
          });
          _context36.next = 12;
          break;
        case 8:
          _context36.prev = 8;
          _context36.t0 = _context36["catch"](0);
          console.error(_context36.t0);
          res.status(500).json({
            success: false,
            error: 'Internal Server Error'
          });
        case 12:
        case "end":
          return _context36.stop();
      }
    }, _callee36, null, [[0, 8]]);
  }));
  return function deleteTourPlanEvents(_x72, _x73) {
    return _ref36.apply(this, arguments);
  };
}();
var deleteTourItenerary = /*#__PURE__*/function () {
  var _ref37 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee37(req, res) {
    return _regeneratorRuntime().wrap(function _callee37$(_context37) {
      while (1) switch (_context37.prev = _context37.next) {
        case 0:
          _context37.next = 2;
          return _service.tourpackageService.deletTourItenerary(req, res);
        case 2:
        case "end":
          return _context37.stop();
      }
    }, _callee37);
  }));
  return function deleteTourItenerary(_x74, _x75) {
    return _ref37.apply(this, arguments);
  };
}();
var deleteFAQ = /*#__PURE__*/function () {
  var _ref38 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee38(req, res) {
    return _regeneratorRuntime().wrap(function _callee38$(_context38) {
      while (1) switch (_context38.prev = _context38.next) {
        case 0:
          _context38.next = 2;
          return _service.tourpackageService.deleteFAQ(req, res);
        case 2:
        case "end":
          return _context38.stop();
      }
    }, _callee38);
  }));
  return function deleteFAQ(_x76, _x77) {
    return _ref38.apply(this, arguments);
  };
}();
var getAllFAQS = /*#__PURE__*/function () {
  var _ref39 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee39(req, res) {
    return _regeneratorRuntime().wrap(function _callee39$(_context39) {
      while (1) switch (_context39.prev = _context39.next) {
        case 0:
          _context39.next = 2;
          return _service.tourpackageService.getAllfaq(req, res);
        case 2:
        case "end":
          return _context39.stop();
      }
    }, _callee39);
  }));
  return function getAllFAQS(_x78, _x79) {
    return _ref39.apply(this, arguments);
  };
}();
var updateinneralbumiamge = /*#__PURE__*/function () {
  var _ref40 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee40(req, res) {
    return _regeneratorRuntime().wrap(function _callee40$(_context40) {
      while (1) switch (_context40.prev = _context40.next) {
        case 0:
          _context40.next = 2;
          return _service.tourpackageService.updatealbumIinnermage(req, res);
        case 2:
        case "end":
          return _context40.stop();
      }
    }, _callee40);
  }));
  return function updateinneralbumiamge(_x80, _x81) {
    return _ref40.apply(this, arguments);
  };
}();
var tourpackageController = exports.tourpackageController = (_tourpackageControlle = {
  deletetourinclusion: deletetourinclusion,
  getbookingslot: getbookingslot,
  getSingleTourPackages: getSingleTourPackages,
  getInstallment: getInstallment,
  getAllTourPackages: getAllTourPackages,
  getalladdons: getalladdons,
  getAllFAQS: getAllFAQS,
  deleteFAQ: deleteFAQ,
  Addinstallemnt: Addinstallemnt,
  addpackage: addpackage,
  mainimage: mainimage,
  createPlaceVisit: createPlaceVisit,
  createTourPlan: createTourPlan,
  gettouritenrary: gettouritenrary,
  deletetHighlight: deletetHighlight,
  deleteTourItenerary: deleteTourItenerary,
  cancellationpolicy: cancellationpolicy,
  updateTourPlanEvents: updateTourPlanEvents,
  deletebookingpolicy: deletebookingpolicy,
  deleteTourPlanEvents: deleteTourPlanEvents,
  getTourPlan: getTourPlan,
  createInclusion: createInclusion,
  createExclusion: createExclusion,
  deleteExclusion: deleteExclusion,
  createBookingPolicy: createBookingPolicy,
  createCancelationPolicy: createCancelationPolicy,
  deletePAckage: deletePAckage,
  createHighlights: createHighlights,
  addAddOnsController: addAddOnsController
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_tourpackageControlle, "getSingleTourPackages", getSingleTourPackages), "createAlbumimage", createAlbumimage), "updateinneralbumiamge", updateinneralbumiamge), "updateAlbumController", updateAlbumController), "updatePackage", updatePackage), "updateMainImageController", updateMainImageController), "updateviistedController", updateviistedController), "deleteMainimage", deleteMainimage), "addFAQs", addFAQs), "deleteaddons", deleteaddons), _defineProperty(_defineProperty(_tourpackageControlle, "createbookingSlot", createbookingSlot), "deletebookingslot", deletebookingslot));