"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadNidCopy = exports.updateBookingStatusToCancelled = exports.insertMultipleHotelBookings = exports.hotelPrebook = exports.getSingleBookingInfo = exports.getBookingInfo = void 0;
var _moment = _interopRequireDefault(require("moment/moment"));
var _utils = require("../../air/utils/utils");
var _db = _interopRequireDefault(require("../../database/db"));
var _generateUUID = require("../../helper/generateUUID");
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
var hotelPrebook = exports.hotelPrebook = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(requestData) {
    var accessToken, authUrl, headers, response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _utils.fetchTestToken)();
        case 2:
          accessToken = _context.sent;
          authUrl = "https://quickticketsb2b-nodejs.de.r.appspot.com/api/v1/api_agent/hotel_prebook";
          headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(accessToken === null || accessToken === void 0 ? void 0 : accessToken.data)
          };
          _context.prev = 5;
          _context.next = 8;
          return _axios["default"].post(authUrl, requestData, {
            headers: headers
          });
        case 8:
          response = _context.sent;
          return _context.abrupt("return", response.data);
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          return _context.abrupt("return", _context.t0);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 12]]);
  }));
  return function hotelPrebook(_x) {
    return _ref.apply(this, arguments);
  };
}();
var insertMultipleHotelBookings = exports.insertMultipleHotelBookings = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(bookings, req) {
    var insertedIds, partnerOrderId, _iterator, _step, booking, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          insertedIds = [];
          partnerOrderId = (0, _generateUUID.generateUUID)(); // Generate a single partnerOrderId for all bookings
          _iterator = _createForOfIteratorHelper(bookings);
          _context2.prev = 3;
          _iterator.s();
        case 5:
          if ((_step = _iterator.n()).done) {
            _context2.next = 13;
            break;
          }
          booking = _step.value;
          _context2.next = 9;
          return insertHotelBooking(booking.bookingData, req, partnerOrderId);
        case 9:
          data = _context2.sent;
          insertedIds.push(data);
        case 11:
          _context2.next = 5;
          break;
        case 13:
          _context2.next = 18;
          break;
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](3);
          _iterator.e(_context2.t0);
        case 18:
          _context2.prev = 18;
          _iterator.f();
          return _context2.finish(18);
        case 21:
          return _context2.abrupt("return", insertedIds);
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 15, 18, 21]]);
  }));
  return function insertMultipleHotelBookings(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var insertHotelBooking = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(bookingData, req, partnerOrderId) {
    var connection, agentId, id, createdAt, query, values, _yield$connection$exe, _yield$connection$exe2, results, hotelBookingId;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context3.sent;
          _context3.prev = 3;
          agentId = req.user; // Assuming you have agent information in the request
          id = (0, _generateUUID.generateUUID)(); // Generate a unique ID for the booking
          createdAt = (0, _moment["default"])().format("YYYY-MM-DD HH:mm");
          query = "INSERT INTO hotel_booking_data (\n            id,\n            partnerOrderId,\n            amount,\n            type,\n            status,\n            email,\n            phone,\n            userId,\n            createdAt,\n            freeCancellation,\n            roomName,\n            hotelName,\n            bookingCode,\n            hotelImage\n          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          values = [id, partnerOrderId, bookingData.amount, bookingData.type, bookingData.status || "Hold", bookingData.email, bookingData.phone, agentId, createdAt, bookingData.freeCancellation, bookingData.roomName, bookingData.hotelName, bookingData.bookingCode, bookingData.hotelImage];
          _context3.next = 11;
          return connection.execute(query, values);
        case 11:
          _yield$connection$exe = _context3.sent;
          _yield$connection$exe2 = _slicedToArray(_yield$connection$exe, 1);
          results = _yield$connection$exe2[0];
          hotelBookingId = "FFLHB".concat(results.insertId); // Update the record in the database with the generated id
          _context3.next = 17;
          return connection.execute("UPDATE hotel_booking_data SET hotelBookingId = ? WHERE id = ?", [hotelBookingId, id]);
        case 17:
          _context3.next = 19;
          return insertGuestInformation(connection, bookingData.guestDataArray, id, partnerOrderId);
        case 19:
          connection.release(); // Release the connection back to the pool
          return _context3.abrupt("return", id);
        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](3);
          if (connection) {
            connection.release(); // Release the connection in case of an error
          }
          throw _context3.t0;
        case 27:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 23]]);
  }));
  return function insertHotelBooking(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var insertGuestInformation = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(connection, guestDataArray, hotelBookingId, partnerOrderId) {
    var resultsArray, _iterator2, _step2, guestData, id, query, values, _yield$connection$exe3, _yield$connection$exe4, results;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          resultsArray = [];
          _iterator2 = _createForOfIteratorHelper(guestDataArray);
          _context4.prev = 3;
          _iterator2.s();
        case 5:
          if ((_step2 = _iterator2.n()).done) {
            _context4.next = 18;
            break;
          }
          guestData = _step2.value;
          id = (0, _generateUUID.generateUUID)(); // Generate a unique ID for each guest information
          query = "INSERT INTO guestData (\n              id,\n              hotelBookingId,\n              partnerOrderId,\n              passportNumber,\n              dob,\n              passportExpiryDate,\n              firstName,\n              lastName,\n              gender,\n              nationality\n            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          values = [id, hotelBookingId, partnerOrderId, guestData.passportNumber, guestData.dob, guestData.passportExpiryDate, guestData.firstName, guestData.lastName, guestData.gender, guestData.nationality];
          _context4.next = 12;
          return connection.execute(query, values);
        case 12:
          _yield$connection$exe3 = _context4.sent;
          _yield$connection$exe4 = _slicedToArray(_yield$connection$exe3, 1);
          results = _yield$connection$exe4[0];
          resultsArray.push(results.insertId);
        case 16:
          _context4.next = 5;
          break;
        case 18:
          _context4.next = 23;
          break;
        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](3);
          _iterator2.e(_context4.t0);
        case 23:
          _context4.prev = 23;
          _iterator2.f();
          return _context4.finish(23);
        case 26:
          return _context4.abrupt("return", resultsArray);
        case 29:
          _context4.prev = 29;
          _context4.t1 = _context4["catch"](0);
          throw _context4.t1;
        case 32:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 29], [3, 20, 23, 26]]);
  }));
  return function insertGuestInformation(_x7, _x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
var getSingleBookingInfo = exports.getSingleBookingInfo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, bookingId) {
    var agentMainID, query, _yield$pool$execute, _yield$pool$execute2, results, bookingInfo;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          agentMainID = req.user; // Assuming agentMainID is passed in the URL parameters
          // Query to fetch booking information along with guest information based on agentMainID and bookingId
          query = "\n        SELECT\n          hb.id AS hotelBookingId,\n          hb.hotelBookingId AS bookingId,\n          hb.partnerOrderId,\n          hb.amount,\n          hb.roomName,\n          hb.type,\n          hb.status,\n          hb.email,\n          hb.phone,\n          hb.freeCancellation,\n          hb.hotelImage,\n          hb.hotelName,\n          hb.userId,\n          gi.id AS guestId,\n          gi.gender,\n          gi.nationality,\n          gi.passportNumber,\n          gi.dob,\n          gi.passportCopy,\n          gi.passportExpiryDate,\n          gi.firstName,\n          gi.lastName\n        FROM\n        hotel_booking_data hb\n        LEFT JOIN\n          guestData gi ON hb.id = gi.hotelBookingId\n        WHERE\n          hb.userId = ? AND hb.id = ?\n      "; // Execute the query
          _context5.next = 5;
          return _db["default"].execute(query, [agentMainID, bookingId]);
        case 5:
          _yield$pool$execute = _context5.sent;
          _yield$pool$execute2 = _slicedToArray(_yield$pool$execute, 1);
          results = _yield$pool$execute2[0];
          // Organize guest information in an array if multiple guests are associated with the same booking ID
          bookingInfo = {
            hotelBookingId: results[0].hotelBookingId,
            bookingId: results[0].bookingId,
            itemId: results[0].itemId,
            partnerOrderId: results[0].partnerOrderId,
            amount: results[0].amount,
            roomName: results[0].roomName,
            freeCancellation: results[0].freeCancellation,
            type: results[0].type,
            status: results[0].status,
            email: results[0].email,
            phone: results[0].phone,
            userId: results[0].userId,
            guests: results.map(function (guest) {
              return {
                guestId: guest.guestId,
                gender: guest.gender,
                nationality: guest.nationality,
                passportNumber: guest.passportNumber,
                dob: guest.dob,
                passportExpiryDate: guest.passportExpiryDate,
                firstName: guest.firstName,
                lastName: guest.lastName,
                nidCopy: guest.passportCopy
              };
            })
          };
          return _context5.abrupt("return", bookingInfo);
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          // Handle errors
          console.error("Error:", _context5.t0);
          throw _context5.t0;
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return function getSingleBookingInfo(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();
var uploadNidCopy = exports.uploadNidCopy = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, hotelBookingId) {
    var image, query, _yield$pool$execute3, _yield$pool$execute4, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          image = req.publicImageLink;
          query = "\n        UPDATE guestData\n        SET passportCopy = ?\n        WHERE id = ?\n      ";
          _context6.next = 5;
          return _db["default"].execute(query, [image, hotelBookingId]);
        case 5:
          _yield$pool$execute3 = _context6.sent;
          _yield$pool$execute4 = _slicedToArray(_yield$pool$execute3, 1);
          result = _yield$pool$execute4[0];
          if (!(result.affectedRows === 1)) {
            _context6.next = 12;
            break;
          }
          return _context6.abrupt("return", "Passport copy uploaded successfully");
        case 12:
          return _context6.abrupt("return", "Failed to upload passport copy");
        case 13:
          _context6.next = 19;
          break;
        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](0);
          console.error("Error:", _context6.t0);
          return _context6.abrupt("return", "An error occurred while updating passport copy");
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 15]]);
  }));
  return function uploadNidCopy(_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();
var updateBookingStatusToCancelled = exports.updateBookingStatusToCancelled = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, bookingId) {
    var userId, selectQuery, _yield$pool$execute5, _yield$pool$execute6, bookingResults, hotelBookingId, updateQuery, _yield$pool$execute7, _yield$pool$execute8, updateResult;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          // Assuming you have a database connection pool named 'pool'
          userId = req.user; // Select the hotel booking data for the specified userId and bookingId
          selectQuery = "\n        SELECT *\n        FROM hotel_booking_data\n        WHERE userId = ? AND id = ?\n      ";
          _context7.next = 5;
          return _db["default"].execute(selectQuery, [userId, bookingId]);
        case 5:
          _yield$pool$execute5 = _context7.sent;
          _yield$pool$execute6 = _slicedToArray(_yield$pool$execute5, 1);
          bookingResults = _yield$pool$execute6[0];
          if (!(bookingResults.length === 0)) {
            _context7.next = 10;
            break;
          }
          return _context7.abrupt("return", "No hotel booking found for the specified user and ID");
        case 10:
          // Extract the hotel booking ID from the retrieved data
          hotelBookingId = bookingResults[0].hotelBookingId; // Update the status field to 'cancelled' for the selected booking ID
          updateQuery = "\n        UPDATE hotel_booking_data\n        SET status = 'Cancelled'\n        WHERE id = ?\n      ";
          _context7.next = 14;
          return _db["default"].execute(updateQuery, [hotelBookingId]);
        case 14:
          _yield$pool$execute7 = _context7.sent;
          _yield$pool$execute8 = _slicedToArray(_yield$pool$execute7, 1);
          updateResult = _yield$pool$execute8[0];
          if (!(updateResult.affectedRows === 1)) {
            _context7.next = 21;
            break;
          }
          return _context7.abrupt("return", "Booking status updated to 'cancelled'");
        case 21:
          return _context7.abrupt("return", "Failed to update booking status");
        case 22:
          _context7.next = 28;
          break;
        case 24:
          _context7.prev = 24;
          _context7.t0 = _context7["catch"](0);
          console.error("Error:", _context7.t0);
          return _context7.abrupt("return", "An error occurred while updating booking status");
        case 28:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 24]]);
  }));
  return function updateBookingStatusToCancelled(_x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}();
var getBookingInfo = exports.getBookingInfo = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var userId, bookingQuery, _yield$pool$execute9, _yield$pool$execute10, bookingResults, bookings, _iterator3, _step3, booking, guestsQuery, _yield$pool$execute11, _yield$pool$execute12, guestsResults, guests;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          userId = req.user; // Query to fetch booking information based on agentMainID
          bookingQuery = "\n      SELECT\n        hb.id AS hotelBookingId,\n        hb.uId,\n        hb.hotelBookingId AS bookingId,\n        hb.partnerOrderId,\n        hb.amount,\n        hb.type,\n        hb.status,\n        hb.email,\n        hb.phone,\n        hb.roomName,\n        hb.freeCancellation,\n        hb.hotelImage,\n        hb.hotelName,\n        hb.userId\n      FROM\n        hotel_booking_data hb\n      WHERE\n        hb.userId = ?\n        ORDER BY\n        hb.uId\n    "; // Execute the booking query
          _context8.next = 5;
          return _db["default"].execute(bookingQuery, [userId]);
        case 5:
          _yield$pool$execute9 = _context8.sent;
          _yield$pool$execute10 = _slicedToArray(_yield$pool$execute9, 1);
          bookingResults = _yield$pool$execute10[0];
          // Fetch guest information for each booking
          bookings = [];
          _iterator3 = _createForOfIteratorHelper(bookingResults);
          _context8.prev = 10;
          _iterator3.s();
        case 12:
          if ((_step3 = _iterator3.n()).done) {
            _context8.next = 24;
            break;
          }
          booking = _step3.value;
          guestsQuery = "\n        SELECT\n          gi.id AS guestId,\n          gi.passportNumber,\n          gi.dob,\n          gi.partnerOrderId,\n          gi.passportExpiryDate,\n          gi.firstName,\n          gi.lastName\n        FROM\n          guestData gi\n        WHERE\n          gi.hotelBookingId = ?\n      ";
          _context8.next = 17;
          return _db["default"].execute(guestsQuery, [booking.hotelBookingId]);
        case 17:
          _yield$pool$execute11 = _context8.sent;
          _yield$pool$execute12 = _slicedToArray(_yield$pool$execute11, 1);
          guestsResults = _yield$pool$execute12[0];
          guests = guestsResults.map(function (guest) {
            return {
              guestId: guest.guestId,
              passportNumber: guest.passportNumber,
              dob: guest.dob,
              partnerOrderId: guest.partnerOrderId,
              passportExpiryDate: guest.passportExpiryDate,
              firstName: guest.firstName,
              lastName: guest.lastName
            };
          });
          bookings.push(_objectSpread(_objectSpread({}, booking), {}, {
            guests: guests
          }));
        case 22:
          _context8.next = 12;
          break;
        case 24:
          _context8.next = 29;
          break;
        case 26:
          _context8.prev = 26;
          _context8.t0 = _context8["catch"](10);
          _iterator3.e(_context8.t0);
        case 29:
          _context8.prev = 29;
          _iterator3.f();
          return _context8.finish(29);
        case 32:
          return _context8.abrupt("return", bookings);
        case 35:
          _context8.prev = 35;
          _context8.t1 = _context8["catch"](0);
          // Handle errors
          console.error("Error:", _context8.t1);
        case 38:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 35], [10, 26, 29, 32]]);
  }));
  return function getBookingInfo(_x17, _x18) {
    return _ref8.apply(this, arguments);
  };
}();