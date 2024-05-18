"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bkashService = void 0;
exports.getFormatDateTimeWithSpace = getFormatDateTimeWithSpace;
var _axios = _interopRequireDefault(require("axios"));
var _zod = require("zod");
var _crypto = require("crypto");
var _bkashPayment = require("bkash-payment");
var _db = _interopRequireDefault(require("../database/db"));
var _moment = _interopRequireDefault(require("moment/moment"));
var _expressSharp = require("express-sharp");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var generateCustomTransactionId = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var timestamp, randomString, hash, shortenedHash;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          timestamp = Date.now().toString();
          randomString = Math.random().toString(36).substr(2, 6); // Generate a random alphanumeric string
          hash = (0, _crypto.createHash)('sha256').update("TX".concat(timestamp).concat(randomString)).digest('hex');
          shortenedHash = hash.substr(0, 16).toUpperCase();
          return _context.abrupt("return", shortenedHash);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function generateCustomTransactionId() {
    return _ref.apply(this, arguments);
  };
}();
var generateCustomorderId = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var timestamp, randomString, hash, shortenedHash;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          timestamp = Date.now().toString();
          randomString = Math.random().toString(36).substr(2, 6); // Generate a random alphanumeric string
          hash = (0, _crypto.createHash)('sha256').update("OI".concat(timestamp).concat(randomString)).digest('hex');
          shortenedHash = hash.substr(0, 12).toUpperCase();
          return _context2.abrupt("return", shortenedHash);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function generateCustomorderId() {
    return _ref2.apply(this, arguments);
  };
}();
function getFormatDateTimeWithSpace(date) {
  return (0, _moment["default"])(date, 'YYYY-MM-DDTHH:mm:ss:SSS [GMT]Z').format('YYYY-MM-DD HH:mm:ss');
}
var bkashConfig = {
  base_url: 'https://tokenized.pay.bka.sh/v1.2.0-beta',
  username: '01755572096',
  password: '(4G&85PThG!',
  app_key: 'qsva78y6yL4wvTBKVkllhuditc',
  app_secret: 'fzEl2yrbGpQOQ5UdS50hWADPUWgyccRdh24fJKuVaiuynJGBODpS'

  // base_url : 'https://tokenized.sandbox.bka.sh/v1.2.0-beta',
  // username: '01619777283',
  // password: 'sandboxTokenizedUser02@12345',
  // app_key: '4f6o0cjiki2rfm34kfdadl1eqq',
  // app_secret: '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b'
};
var generateToken = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var headers, url, data, response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          headers = {
            username: "sandboxTokenizedUser02",
            password: "sandboxTokenizedUser02@12345",
            "Content-Type": "application/json",
            accept: 'application/json'
          };
          url = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant";
          data = {
            app_key: '4f6o0cjiki2rfm34kfdadl1eqq',
            app_secret: '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b'
          };
          _context3.next = 6;
          return _axios["default"].post(url, data, {
            headers: headers
          });
        case 6:
          response = _context3.sent;
          if (!(response.data.status === 'fail')) {
            _context3.next = 9;
            break;
          }
          throw new Error('Invalid API Credentials Provided');
        case 9:
          return _context3.abrupt("return", response.data.id_token);
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          throw new Error('An error occurred while fetching the token');
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function generateToken(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();
var CreatePayment = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var userid, id, _req$body, amount, callbackURL, reference, paymentDetails, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userid = req.params.id;
          _context4.next = 4;
          return generateCustomorderId();
        case 4:
          id = _context4.sent;
          _req$body = req.body, amount = _req$body.amount, callbackURL = _req$body.callbackURL, reference = _req$body.reference;
          paymentDetails = {
            amount: amount || 1,
            // your product price
            callbackURL: callbackURL || "https://flyfarladies-express-416405.de.r.appspot.com/api/v1/bkash/callback/".concat(userid),
            // your callback route
            orderID: id || 'Order_101',
            // your orderID
            reference: reference || '1' // your reference
          };
          console.log(paymentDetails);
          _context4.next = 10;
          return (0, _bkashPayment.createPayment)(bkashConfig, paymentDetails);
        case 10:
          result = _context4.sent;
          res.send(result);
          _context4.next = 17;
          break;
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return function CreatePayment(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();
var callback = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _result, _result2, _result3, _req$query, status, paymentID, userid, result, response, userquery, _yield$pool$query, _yield$pool$query2, user, insertQuery, datetime, currentWallet, newValue, updateQuery, paymentmethod, insertParams, ledgerVAlue;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$query = req.query, status = _req$query.status, paymentID = _req$query.paymentID;
          userid = req.params.id;
          console.log(userid);
          console.log(paymentID);
          response = {
            statusCode: '4000',
            statusMessage: 'Payment Failed'
          };
          userquery = "SELECT * FROM user WHERE  id = ?";
          _context5.next = 9;
          return _db["default"].query(userquery, [userid]);
        case 9:
          _yield$pool$query = _context5.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          user = _yield$pool$query2[0];
          if (!(user.length === 0)) {
            _context5.next = 14;
            break;
          }
          throw new _expressSharp.NotFoundException("user not found");
        case 14:
          if (!(status === 'success')) {
            _context5.next = 18;
            break;
          }
          _context5.next = 17;
          return (0, _bkashPayment.executePayment)(bkashConfig, paymentID);
        case 17:
          result = _context5.sent;
        case 18:
          if (!(((_result = result) === null || _result === void 0 ? void 0 : _result.transactionStatus) === 'Completed')) {
            _context5.next = 35;
            break;
          }
          insertQuery = "\n          INSERT INTO bkaspayment (paymentID, trxID, transactionStatus, amount, currency, paymentExecuteTime, merchantInvoiceNumber, payerReference, customerMsisdn, statusCode, statusMessage,payment_method, userid) \n          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?,?)\n        ";
          datetime = getFormatDateTimeWithSpace(result.paymentExecuteTime);
          currentWallet = parseInt(user[0].wallet);
          console.log(currentWallet);
          newValue = currentWallet + parseInt(result.amount);
          console.log(newValue);
          updateQuery = "UPDATE user SET wallet =? WHERE id = ?";
          _context5.next = 28;
          return _db["default"].query(updateQuery, [newValue, userid]);
        case 28:
          paymentmethod = 'Bkash';
          insertParams = [result.paymentID, result.trxID, result.transactionStatus, result.amount, result.currency, datetime, result.merchantInvoiceNumber, result.payerReference, result.customerMsisdn, result.statusCode, result.statusMessage, paymentmethod, userid];
          console.log(insertParams);
          // Execute the insertion query
          _context5.next = 33;
          return _db["default"].query(insertQuery, insertParams);
        case 33:
          ledgerVAlue = [result.paymentID, result.trxID, result.transactionStatus, result.amount, result.currency, datetime, result.merchantInvoiceNumber, result.payerReference, result.customerMsisdn, result.statusCode, result.statusMessage, paymentmethod, userid];
          return _context5.abrupt("return", res.redirect("https://www.flyfarladies.com/dashboard/myWallet/statusMessage=".concat(encodeURIComponent(result.statusMessage), "&status=").concat(status, "$ statusCode =").concat(result.statusCode)));
        case 35:
          if (result) response = {
            statusCode: (_result2 = result) === null || _result2 === void 0 ? void 0 : _result2.statusCode,
            statusMessage: (_result3 = result) === null || _result3 === void 0 ? void 0 : _result3.statusMessage
          };
          return _context5.abrupt("return", res.redirect("https://www.flyfarladies.com/dashboard/myWallet/statusMessage=".concat(encodeURIComponent(response.statusMessage), "$ statusCode =").concat(response.statusCode)));
        case 39:
          _context5.prev = 39;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
        case 42:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 39]]);
  }));
  return function callback(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();
var getTransaction = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var trxID, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          trxID = req.query.trxID;
          _context6.next = 4;
          return (0, _bkashPayment.searchTransaction)(bkashConfig, trxID);
        case 4:
          result = _context6.sent;
          res.send(result);
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function getTransaction(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();
var QueryPayment = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var paymentID, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          paymentID = req.query.paymentID;
          _context7.next = 4;
          return (0, _bkashPayment.queryPayment)(bkashConfig, paymentID);
        case 4:
          result = _context7.sent;
          res.send(result);
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function QueryPayment(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();
var refundAmount = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body2, paymentID, amount, trxID, sku, reason, refundDetails, result, updatequery, isRefundable, values;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          // Extract required data from request body
          _req$body2 = req.body, paymentID = _req$body2.paymentID, amount = _req$body2.amount, trxID = _req$body2.trxID, sku = _req$body2.sku, reason = _req$body2.reason; // Request body
          refundDetails = {
            paymentID: paymentID,
            amount: amount,
            trxID: trxID,
            sku: sku,
            reason: reason
          }; // Make HTTP request
          _context8.next = 5;
          return (0, _bkashPayment.refundTransaction)(bkashConfig, refundDetails);
        case 5:
          result = _context8.sent;
          if (!(result.statusMessage === "Successful" && result.statusCode === "0000")) {
            _context8.next = 12;
            break;
          }
          updatequery = "UPDATE bkaspayment SET refundTrxID =?, isRefundable =? WHERE trxID=?";
          isRefundable = true;
          values = [result.refundTrxID, isRefundable, trxID];
          _context8.next = 12;
          return _db["default"].query(updatequery, values);
        case 12:
          return _context8.abrupt("return", res.send(result));
        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          console.error('Error creating refund:', _context8.t0);
          res.status(500).json({
            error: 'An error occurred while processing the refund.'
          });
        case 19:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 15]]);
  }));
  return function refundAmount(_x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();
var bkashService = exports.bkashService = {
  generateToken: generateToken,
  CreatePayment: CreatePayment,
  callback: callback,
  getTransaction: getTransaction,
  QueryPayment: QueryPayment,
  refundAmount: refundAmount
};