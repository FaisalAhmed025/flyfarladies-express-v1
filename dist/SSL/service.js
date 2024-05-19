"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sslpaymentService = void 0;
var _sslcommerzLts = _interopRequireDefault(require("sslcommerz-lts"));
var _crypto = require("crypto");
var _db = _interopRequireDefault(require("../database/db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var generateCustomTransactionId = function generateCustomTransactionId() {
  var timestamp = Date.now().toString();
  var randomString = Math.random().toString(36).substr(2, 6); // Generate a random alphanumeric string
  var hash = (0, _crypto.createHash)('sha256').update("".concat(timestamp).concat(randomString)).digest('hex');
  var shortenedHash = hash.substr(0, 16).toUpperCase();
  return shortenedHash;
};
var initpayment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var transactionId, userid, userquery, _yield$pool$query, _yield$pool$query2, user, data, insertQuery, paymentstatus, sslcz, apiResponse;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          transactionId = generateCustomTransactionId();
          userid = req.params.id;
          userquery = "SELECT * FROM user WHERE id=?";
          _context.next = 5;
          return _db["default"].query(userquery, [userid]);
        case 5:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          user = _yield$pool$query2[0];
          data = {
            store_id: process.env.SSL_STORE_ID,
            store_passwd: process.env.SSL_STORE_PASSWORD,
            total_amount: req.body.amount,
            currency: "BDT",
            tran_id: transactionId,
            tran_date: Date(),
            success_url: "https://flyfarladies-express-416405.de.r.appspot.com/api/v1/ssl/success/".concat(transactionId),
            fail_url: "https://flyfarladies-express-416405.de.r.appspot.com/api/v1/ssl/failure/".concat(transactionId),
            cancel_url: "https://flyfarladies-express-416405.de.r.appspot.com/api/v1/ssl/cancel/".concat(transactionId),
            emi_option: 0,
            cus_name: user[0].name,
            cus_email: user[0].email,
            cus_phone: user[0].phone,
            cus_add1: "Dhaka",
            cus_city: "Dhaka",
            cus_country: "Bangladesh",
            shipping_method: "NO",
            product_name: "Sample Product",
            product_category: "Sample Category",
            product_profile: "general",
            value_a: "scfcc" || user.uuid
          };
          insertQuery = "INSERT INTO ssl_commerz_entity (\n    tran_id,\n    value_b,\n    cus_name, cus_email, cus_phone,\n    total_amount, currency, status\n) VALUES (\n    ?, ?, ?, ?, ?, ?,\n    ?, ?\n)\n";
          paymentstatus = "unpaid"; // Execute the SQL query
          _context.next = 13;
          return _db["default"].query(insertQuery, [transactionId, userid, data.cus_name, data.cus_email, data.cus_phone, data.total_amount, data.currency, paymentstatus]);
        case 13:
          console.log(data);
          sslcz = new _sslcommerzLts["default"](process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, false);
          _context.next = 17;
          return sslcz.init(data);
        case 17:
          apiResponse = _context.sent;
          // await this.sslcommerzRepository.save(data)
          res.send(apiResponse);
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function initpayment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var sucesss = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var tran_id, data, _yield$pool$query3, _yield$pool$query4, transactionRows, transaction;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          tran_id = req.params.tran_id; // const uuid = req.params.id;
          data = req.body;
          console.log(req.body);

          // Assuming you have a sslcommerzRepository and UserRepository to handle database operations
          _context2.next = 5;
          return _db["default"].query('SELECT * FROM ssl_commerz_entity WHERE tran_id = ?', [tran_id]);
        case 5:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          transactionRows = _yield$pool$query4[0];
          transaction = transactionRows[0];
          if (transaction) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Transaction ID not found',
            error: true
          }));
        case 11:
          _context2.next = 13;
          return _db["default"].query('UPDATE ssl_commerz_entity SET paymentstatus = ?, store_amount = ?,  status =?, tran_date = ?, val_id = ?, bank_tran_id = ? WHERE tran_id = ?', ['VALIDATED', data.store_amount, data.status, data.tran_date, data.val_id, data.bank_tran_id, tran_id]);
        case 13:
          return _context2.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Payment success'
          }));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function sucesss(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var validatepayment = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var val_id, data, sslcz, validationData;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          val_id = req.params.val_id;
          data = {
            val_id: val_id
          };
          sslcz = new _sslcommerzLts["default"](process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, false);
          _context3.next = 5;
          return sslcz.validate(data);
        case 5:
          validationData = _context3.sent;
          return _context3.abrupt("return", res.send(validationData));
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function validatepayment(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var refundInitiate = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, refund_amount, refund_remarks, bank_tran_id, refe_id, data, sslcz, apiresponse;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, refund_amount = _req$body.refund_amount, refund_remarks = _req$body.refund_remarks, bank_tran_id = _req$body.bank_tran_id, refe_id = _req$body.refe_id;
          data = {
            refund_amount: refund_amount,
            refund_remarks: refund_remarks,
            bank_tran_id: bank_tran_id,
            refe_id: refe_id
          };
          sslcz = new _sslcommerzLts["default"](process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, false);
          _context4.next = 5;
          return sslcz.initiateRefund(data);
        case 5:
          apiresponse = _context4.sent;
          return _context4.abrupt("return", res.send(apiresponse));
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function refundInitiate(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var refundQuery = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var refund_ref_id, data, sslcz;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          refund_ref_id = req.params.refund_ref_id;
          data = {
            refund_ref_id: refund_ref_id
          };
          sslcz = new _sslcommerzLts["default"](process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, false);
          sslcz.refundQuery(data).then(function (data) {
            //process the response that got from sslcommerz
            //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
            return res.send(data);
          });
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function refundQuery(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var transactionStatus = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var tran_id, data, sslcz;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          tran_id = req.params.tran_id;
          data = {
            tran_id: tran_id
          };
          sslcz = new _sslcommerzLts["default"](process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, false);
          sslcz.transactionQueryByTransactionId(data).then(function (data) {
            //process the response that got from sslcommerz
            //https://developer.sslcommerz.com/doc/v4/#by-session-id
            return res.send(data);
          });
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function transactionStatus(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var sslpaymentService = exports.sslpaymentService = {
  initpayment: initpayment,
  sucesss: sucesss,
  validatepayment: validatepayment,
  refundInitiate: refundInitiate,
  refundQuery: refundQuery,
  transactionStatus: transactionStatus
};