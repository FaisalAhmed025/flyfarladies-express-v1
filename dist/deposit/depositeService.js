"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depositeService = void 0;
var _db = _interopRequireDefault(require("../database/db"));
var _imageHandler = require("../tourpackage/imageHandler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var generateDepoId = function generateDepoId() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return 'FFLD' + Math.floor(Math.random() * 10000);
};

// Create Bank Deposit
var createBankDeposit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req) {
    var connection, _req$body, deposited_from, deposited_to, transaction_date, transaction_id, _amount, requested_by, userquery, _yield$connection$que, _yield$connection$que2, user, image, tableName, status, deposit_id, transactionDate, formattedDate, remarks, value, _yield$connection$que3, _yield$connection$que4, results;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context.sent;
          _context.prev = 3;
          _req$body = req.body, deposited_from = _req$body.deposited_from, deposited_to = _req$body.deposited_to, transaction_date = _req$body.transaction_date, transaction_id = _req$body.transaction_id, _amount = _req$body.amount;
          _context.next = 7;
          return connection.beginTransaction();
        case 7:
          // Begin a new database transaction
          requested_by = req.params.id;
          userquery = "SELECT * FROM user WHERE id =? ";
          _context.next = 11;
          return connection.query(userquery, [requested_by]);
        case 11:
          _yield$connection$que = _context.sent;
          _yield$connection$que2 = _slicedToArray(_yield$connection$que, 1);
          user = _yield$connection$que2[0];
          if (!(user.length === 0)) {
            _context.next = 16;
            break;
          }
          throw new Error('User not found');
        case 16:
          image = req.publicImageLink;
          tableName = 'bank_transfer';
          status = 'pending';
          console.log(tableName);
          if (!(_amount < 0)) {
            _context.next = 22;
            break;
          }
          throw new Error('Please check your amount. Negative amount not accepted.');
        case 22:
          // Generate a UUID-like ID for the bank transfer
          deposit_id = generateDepoId();
          transactionDate = new Date(transaction_date);
          formattedDate = transactionDate.toDateString();
          remarks = "Bank Deposit request from ".concat(deposited_from, " to ").concat(deposited_to, ", On ").concat(formattedDate, ".Your TRX ID is ").concat(transaction_id, " & amount ").concat(_amount, " only");
          console.log(image);
          value = [deposit_id, deposited_from, deposited_to, transaction_date, status, transaction_id, _amount, requested_by, image, remarks];
          _context.next = 30;
          return connection.query("INSERT INTO ".concat(tableName, " ( deposit_id, deposited_from, deposited_to, transaction_date, status, transaction_id, amount, requested_by, attachment,remarks) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?,?)"), value);
        case 30:
          _yield$connection$que3 = _context.sent;
          _yield$connection$que4 = _slicedToArray(_yield$connection$que3, 1);
          results = _yield$connection$que4[0];
          console.log(value);
          _context.next = 36;
          return connection.commit();
        case 36:
          // Commit the transaction when the query is successful
          connection.release();
          return _context.abrupt("return", results);
        case 40:
          _context.prev = 40;
          _context.t0 = _context["catch"](3);
          _context.next = 44;
          return connection.rollback();
        case 44:
          _context.next = 46;
          return (0, _imageHandler.deleteImageFromURL)(req.publicImageLink);
        case 46:
          connection.release();
          throw _context.t0;
        case 48:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 40]]);
  }));
  return function createBankDeposit(_x) {
    return _ref.apply(this, arguments);
  };
}();
var createCheckDeposit = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req) {
    var connection, _req$body2, cheque_number, bank_name, cheque_date, reference, _amount2, requested_by, image, tableName, userquery, _yield$connection$que5, _yield$connection$que6, user, deposit_id, transactionDate, formattedDate, remarks, value, _yield$connection$que7, _yield$connection$que8, results;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context2.sent;
          _context2.prev = 3;
          _req$body2 = req.body, cheque_number = _req$body2.cheque_number, bank_name = _req$body2.bank_name, cheque_date = _req$body2.cheque_date, reference = _req$body2.reference, _amount2 = _req$body2.amount;
          _context2.next = 7;
          return connection.beginTransaction();
        case 7:
          // Begin a new database transaction
          requested_by = req.params.id;
          image = req.publicImageLink;
          tableName = 'cheque_deposit';
          userquery = "SELECT * FROM user WHERE id =? ";
          _context2.next = 13;
          return connection.query(userquery, [requested_by]);
        case 13:
          _yield$connection$que5 = _context2.sent;
          _yield$connection$que6 = _slicedToArray(_yield$connection$que5, 1);
          user = _yield$connection$que6[0];
          if (!(user.length === 0)) {
            _context2.next = 18;
            break;
          }
          throw new Error('User not found');
        case 18:
          console.log(tableName);
          if (!(_amount2 < 0)) {
            _context2.next = 21;
            break;
          }
          throw new Error('Please check your amount. Negative amount not accepted.');
        case 21:
          // Generate a UUID-like ID for the bank transfer
          deposit_id = generateDepoId();
          transactionDate = new Date(cheque_date);
          formattedDate = transactionDate.toDateString();
          remarks = "Cheque Deposit request from ".concat(cheque_number, " to ").concat(bank_name, " amount of ").concat(_amount2, "deposited on ").concat(formattedDate);
          value = [deposit_id, cheque_number, bank_name, _amount2, image, requested_by, cheque_date, remarks, reference];
          _context2.next = 28;
          return connection.query('INSERT INTO cheque_deposit (deposit_id, cheque_number, bank_name, amount, attachment, requested_by, cheque_date,remarks,reference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', value);
        case 28:
          _yield$connection$que7 = _context2.sent;
          _yield$connection$que8 = _slicedToArray(_yield$connection$que7, 1);
          results = _yield$connection$que8[0];
          console.log(value);
          _context2.next = 34;
          return connection.commit();
        case 34:
          // Commit the transaction when the query is successful
          connection.release();
          return _context2.abrupt("return", results);
        case 38:
          _context2.prev = 38;
          _context2.t0 = _context2["catch"](3);
          _context2.next = 42;
          return connection.rollback();
        case 42:
          // Rollback the transaction in case of an error
          (0, _imageHandler.deleteImageFromURL)(req.publicImageLink);
          connection.release();
          throw _context2.t0;
        case 45:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 38]]);
  }));
  return function createCheckDeposit(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var createCashDeposit = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req) {
    var connection, _req$body3, depositor_name, receiver_name, cheque_date, reference, _amount3, requested_by, userquery, _yield$connection$que9, _yield$connection$que10, user, attachment, tableName, status, deposit_id, transactionDate, formattedDate, remarks, _yield$connection$que11, _yield$connection$que12, results;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context3.sent;
          _context3.prev = 3;
          _req$body3 = req.body, depositor_name = _req$body3.depositor_name, receiver_name = _req$body3.receiver_name, cheque_date = _req$body3.cheque_date, reference = _req$body3.reference, _amount3 = _req$body3.amount;
          _context3.next = 7;
          return connection.beginTransaction();
        case 7:
          // Begin a new database transaction
          requested_by = req.params.id;
          userquery = "SELECT * FROM user WHERE id = ? ";
          _context3.next = 11;
          return connection.query(userquery, [requested_by]);
        case 11:
          _yield$connection$que9 = _context3.sent;
          _yield$connection$que10 = _slicedToArray(_yield$connection$que9, 1);
          user = _yield$connection$que10[0];
          if (!(user.length === 0)) {
            _context3.next = 16;
            break;
          }
          throw new Error('User not found');
        case 16:
          attachment = req.publicImageLink;
          tableName = 'cash_deposit';
          status = 'pending';
          console.log(tableName);
          if (!(_amount3 < 0)) {
            _context3.next = 22;
            break;
          }
          throw new Error('Please check your amount. Negative amount not accepted.');
        case 22:
          // Generate a UUID-like ID for the bank transfer
          deposit_id = generateDepoId();
          transactionDate = new Date(cheque_date);
          formattedDate = transactionDate.toDateString();
          remarks = "Cash Deposit request from ".concat(depositor_name, " to ").concat(receiver_name, " ").concat(reference, " ").concat(_amount3);
          _context3.next = 28;
          return connection.query('INSERT INTO cash_deposit (deposit_id, depositor_name, receiver_name, status, requested_by, amount, reference, remarks, attachment) VALUES (?, ?, ?, ?, ?, ?,?,?, ?)', [deposit_id, depositor_name, receiver_name, status, requested_by, _amount3, reference, remarks, attachment]);
        case 28:
          _yield$connection$que11 = _context3.sent;
          _yield$connection$que12 = _slicedToArray(_yield$connection$que11, 1);
          results = _yield$connection$que12[0];
          _context3.next = 33;
          return connection.commit();
        case 33:
          // Commit the transaction when the query is successful
          connection.release();
          return _context3.abrupt("return", results);
        case 37:
          _context3.prev = 37;
          _context3.t0 = _context3["catch"](3);
          _context3.next = 41;
          return connection.rollback();
        case 41:
          _context3.next = 43;
          return (0, _imageHandler.deleteImageFromURL)(req.publicImageLink);
        case 43:
          connection.release();
          throw _context3.t0;
        case 45:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 37]]);
  }));
  return function createCashDeposit(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var ApprovedCashDeposit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req) {
    var connection, deposit_id, currentStatusQuery, _req$body4, rejected_reason, status, approved_by, _yield$connection$que13, _yield$connection$que14, result, updateQuery, values, getamount, _yield$connection$exe, _yield$connection$exe2, amountdata, _yield$connection$exe3, _yield$connection$exe4, results, updateUserWalletQuery, user_id, _yield$connection$exe5, _yield$connection$exe6, ksocjocj;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context4.sent;
          _context4.prev = 3;
          deposit_id = req.params.deposit_id;
          currentStatusQuery = 'SELECT status, requested_by FROM cash_deposit WHERE deposit_id = ?';
          _req$body4 = req.body, rejected_reason = _req$body4.rejected_reason, status = _req$body4.status, approved_by = _req$body4.approved_by;
          _context4.next = 9;
          return connection.query(currentStatusQuery, [deposit_id]);
        case 9:
          _yield$connection$que13 = _context4.sent;
          _yield$connection$que14 = _slicedToArray(_yield$connection$que13, 1);
          result = _yield$connection$que14[0];
          if (!(result.length == 0)) {
            _context4.next = 14;
            break;
          }
          throw new Error('id not found');
        case 14:
          updateQuery = "\n    UPDATE cash_deposit\n    SET status = ?,\n    rejected_reason = ?,\n    approved_by = ?\n    WHERE deposit_id = ?\n  ";
          values = [status, status === 'approved' ? rejected_reason !== undefined ? rejected_reason : null : rejected_reason, approved_by, deposit_id];
          getamount = 'SELECT amount FROM bank_transfer WHERE deposit_id = ?';
          _context4.next = 19;
          return connection.beginTransaction();
        case 19:
          _context4.next = 21;
          return connection.execute(getamount, [deposit_id]);
        case 21:
          _yield$connection$exe = _context4.sent;
          _yield$connection$exe2 = _slicedToArray(_yield$connection$exe, 1);
          amountdata = _yield$connection$exe2[0];
          amount = amountdata[0].amount;
          _context4.next = 27;
          return connection.execute(updateQuery, values);
        case 27:
          _yield$connection$exe3 = _context4.sent;
          _yield$connection$exe4 = _slicedToArray(_yield$connection$exe3, 1);
          results = _yield$connection$exe4[0];
          // If the status is 'approved', update  the user wallet
          updateUserWalletQuery = "UPDATE user SET wallet = ? WHERE id = ?";
          user_id = result[0].requested_by;
          console.log("Update Query:", updateUserWalletQuery);
          console.log("Values:", [amount, user_id]);
          _context4.next = 36;
          return connection.execute(updateUserWalletQuery, [amount, user_id]);
        case 36:
          _yield$connection$exe5 = _context4.sent;
          _yield$connection$exe6 = _slicedToArray(_yield$connection$exe5, 1);
          ksocjocj = _yield$connection$exe6[0];
          console.log(ksocjocj);
          _context4.next = 42;
          return connection.commit();
        case 42:
          return _context4.abrupt("return", ksocjocj);
        case 45:
          _context4.prev = 45;
          _context4.t0 = _context4["catch"](3);
          console.log(_context4.t0);
        case 48:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 45]]);
  }));
  return function ApprovedCashDeposit(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var ApprovedBankDeposit = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req) {
    var connection, deposit_id, currentStatusQuery, _req$body5, rejected_reason, status, approved_by, _yield$connection$que15, _yield$connection$que16, result, updateQuery, values, getamount, _yield$connection$exe7, _yield$connection$exe8, amountdata, _yield$connection$exe9, _yield$connection$exe10, results, updateUserWalletQuery, user_id, _yield$connection$exe11, _yield$connection$exe12, ksocjocj;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context5.sent;
          _context5.prev = 3;
          deposit_id = req.params.deposit_id;
          currentStatusQuery = 'SELECT status, requested_by FROM bank_transfer WHERE deposit_id = ?';
          _req$body5 = req.body, rejected_reason = _req$body5.rejected_reason, status = _req$body5.status, approved_by = _req$body5.approved_by;
          _context5.next = 9;
          return connection.query(currentStatusQuery, [deposit_id]);
        case 9:
          _yield$connection$que15 = _context5.sent;
          _yield$connection$que16 = _slicedToArray(_yield$connection$que15, 1);
          result = _yield$connection$que16[0];
          if (!(result.length == 0)) {
            _context5.next = 14;
            break;
          }
          throw new Error('id not found');
        case 14:
          updateQuery = "\n    UPDATE bank_transfer\n    SET status = ?,\n    rejected_reason = ?,\n    approved_by = ?\n    WHERE deposit_id = ?\n  ";
          values = [status, status === 'approved' ? rejected_reason !== undefined ? rejected_reason : null : rejected_reason, approved_by, deposit_id];
          getamount = 'SELECT amount FROM bank_transfer WHERE deposit_id = ?';
          _context5.next = 19;
          return connection.beginTransaction();
        case 19:
          _context5.next = 21;
          return connection.execute(getamount, [deposit_id]);
        case 21:
          _yield$connection$exe7 = _context5.sent;
          _yield$connection$exe8 = _slicedToArray(_yield$connection$exe7, 1);
          amountdata = _yield$connection$exe8[0];
          amount = amountdata[0].amount;
          _context5.next = 27;
          return connection.execute(updateQuery, values);
        case 27:
          _yield$connection$exe9 = _context5.sent;
          _yield$connection$exe10 = _slicedToArray(_yield$connection$exe9, 1);
          results = _yield$connection$exe10[0];
          // If the status is 'approved', update  the user wallet
          updateUserWalletQuery = "UPDATE user SET wallet = ? WHERE id = ?";
          console.log(updateUserWalletQuery);
          user_id = result[0].requested_by;
          console.log("Update Query:", updateUserWalletQuery);
          console.log("Values:", [amount, user_id]);
          _context5.next = 37;
          return connection.execute(updateUserWalletQuery, [amount, user_id]);
        case 37:
          _yield$connection$exe11 = _context5.sent;
          _yield$connection$exe12 = _slicedToArray(_yield$connection$exe11, 1);
          ksocjocj = _yield$connection$exe12[0];
          console.log(ksocjocj);
          _context5.next = 43;
          return connection.commit();
        case 43:
          return _context5.abrupt("return", ksocjocj);
        case 46:
          _context5.prev = 46;
          _context5.t0 = _context5["catch"](3);
          console.log(_context5.t0);
        case 49:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 46]]);
  }));
  return function ApprovedBankDeposit(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
var ApprovedCheckDeposit = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req) {
    var connection, _amountdata$, deposit_id, currentStatusQuery, _req$body6, rejected_reason, status, approved_by, _yield$connection$que17, _yield$connection$que18, result, updateQuery, values, getamount, _yield$connection$exe13, _yield$connection$exe14, amountdata, _amount4, _yield$connection$exe15, _yield$connection$exe16, results, updateUserWalletQuery, user_id, _yield$connection$exe17, _yield$connection$exe18, ksocjocj;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context6.sent;
          _context6.prev = 3;
          deposit_id = req.params.deposit_id;
          currentStatusQuery = 'SELECT status, requested_by FROM cheque_deposit WHERE deposit_id = ?';
          _req$body6 = req.body, rejected_reason = _req$body6.rejected_reason, status = _req$body6.status, approved_by = _req$body6.approved_by;
          _context6.next = 9;
          return connection.query(currentStatusQuery, [deposit_id]);
        case 9:
          _yield$connection$que17 = _context6.sent;
          _yield$connection$que18 = _slicedToArray(_yield$connection$que17, 1);
          result = _yield$connection$que18[0];
          if (!(result.length == 0)) {
            _context6.next = 14;
            break;
          }
          throw new Error('id not found');
        case 14:
          updateQuery = "\n    UPDATE cheque_deposit\n    SET status = ?,\n    rejected_reason = ?,\n    approved_by = ?\n    WHERE deposit_id = ?\n  ";
          values = [status, status === 'approved' ? rejected_reason !== undefined ? rejected_reason : null : rejected_reason, approved_by, deposit_id];
          getamount = 'SELECT amount FROM cheque_deposit WHERE deposit_id = ?';
          _context6.next = 19;
          return connection.beginTransaction();
        case 19:
          _context6.next = 21;
          return connection.execute(getamount, [deposit_id]);
        case 21:
          _yield$connection$exe13 = _context6.sent;
          _yield$connection$exe14 = _slicedToArray(_yield$connection$exe13, 1);
          amountdata = _yield$connection$exe14[0];
          _amount4 = (_amountdata$ = amountdata[0]) === null || _amountdata$ === void 0 ? void 0 : _amountdata$.amount;
          _context6.next = 27;
          return connection.execute(updateQuery, values);
        case 27:
          _yield$connection$exe15 = _context6.sent;
          _yield$connection$exe16 = _slicedToArray(_yield$connection$exe15, 1);
          results = _yield$connection$exe16[0];
          // If the status is 'approved', update  the user wallet
          updateUserWalletQuery = "UPDATE user SET wallet = ? WHERE id = ?";
          user_id = result[0].requested_by;
          console.log("Update Query:", updateUserWalletQuery);
          console.log("Values:", [_amount4, user_id]);
          _context6.next = 36;
          return connection.execute(updateUserWalletQuery, [_amount4, user_id]);
        case 36:
          _yield$connection$exe17 = _context6.sent;
          _yield$connection$exe18 = _slicedToArray(_yield$connection$exe17, 1);
          ksocjocj = _yield$connection$exe18[0];
          _context6.next = 41;
          return connection.commit();
        case 41:
          return _context6.abrupt("return", ksocjocj);
        case 44:
          _context6.prev = 44;
          _context6.t0 = _context6["catch"](3);
          console.log(_context6.t0);
        case 47:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 44]]);
  }));
  return function ApprovedCheckDeposit(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
var depositeService = exports.depositeService = {
  createBankDeposit: createBankDeposit,
  createCheckDeposit: createCheckDeposit,
  createCashDeposit: createCashDeposit,
  ApprovedBankDeposit: ApprovedBankDeposit,
  ApprovedCashDeposit: ApprovedCashDeposit,
  ApprovedCheckDeposit: ApprovedCheckDeposit
};