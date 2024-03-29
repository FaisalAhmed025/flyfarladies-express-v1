"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.payemntService = exports.payementStatus = exports.installmentStatus = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _db = _interopRequireDefault(require("../database/db"));
var _bookingservice = require("../booking/bookingservice");
var _expressSharp = require("express-sharp");
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
var payementStatus = exports.payementStatus = {
  PAID: 'paid',
  UNPAID: 'unpaid',
  BOOKINGSTATUS: 'bookingamount paid',
  FIRSTINSTALLMENT: 'first installment paid',
  SECONDINSTALLMENT: 'second installment paid'
};
var installmentStatus = exports.installmentStatus = {
  COMPLETED: 'completed',
  INCOMPLETED: 'incompleted'
};
var paywithwallet = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var userid, bookingid, bookingquery, _yield$pool$query, _yield$pool$query2, booking, userquery, _yield$pool$query3, _yield$pool$query4, user, totalprice, newWalletBalance, walletvalue, updateuserbalancequery, bookingstatus, paymentstatus, value, updatebookingquery, _yield$pool$query5, _yield$pool$query6, updatedBooking, depositby, status, ledgervalue, insertledger;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userid = req.params.id;
          bookingid = req.params.bookingid;
          bookingquery = "SELECT * FROM booking WHERE bookingid=?";
          _context.next = 6;
          return _db["default"].query(bookingquery, [bookingid]);
        case 6:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          booking = _yield$pool$query2[0];
          if (!(!booking || booking.length === 0)) {
            _context.next = 11;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking not found');
        case 11:
          if (!(booking[0].bookingStatus !== 'HOLD')) {
            _context.next = 13;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking request already approved or Rejected');
        case 13:
          userquery = "SELECT * FROM user WHERE id = ?";
          _context.next = 16;
          return _db["default"].query(userquery, [userid]);
        case 16:
          _yield$pool$query3 = _context.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          user = _yield$pool$query4[0];
          if (!(!user || user.length === 0)) {
            _context.next = 21;
            break;
          }
          throw new _expressSharp.NotFoundException('User not found');
        case 21:
          totalprice = booking[0].totalAmount;
          console.log(user[0].wallet);
          console.log(totalprice);

          // Check wallet balance
          if (!(user[0].wallet < totalprice)) {
            _context.next = 26;
            break;
          }
          throw new _expressSharp.HttpException('Insufficient balance! please deposit to your wallet', _httpStatus["default"].BAD_REQUEST);
        case 26:
          newWalletBalance = user[0].wallet - totalprice;
          walletvalue = [newWalletBalance, userid];
          updateuserbalancequery = "UPDATE user SET wallet = ? WHERE id = ?";
          _context.next = 31;
          return _db["default"].query(updateuserbalancequery, walletvalue);
        case 31:
          bookingstatus = _bookingservice.bookingStatus.CONFIRMED;
          paymentstatus = payementStatus.PAID;
          console.log(_bookingservice.bookingStatus);
          value = [bookingstatus, paymentstatus, user[0].wallet, bookingid];
          updatebookingquery = "UPDATE booking SET bookingStatus = ?, paymentStatus = ?, wallet = ? WHERE bookingid = ?";
          _context.next = 38;
          return _db["default"].query(updatebookingquery, value);
        case 38:
          _yield$pool$query5 = _context.sent;
          _yield$pool$query6 = _slicedToArray(_yield$pool$query5, 1);
          updatedBooking = _yield$pool$query6[0];
          depositby = "".concat(user[0].name);
          status = 'purchase';
          ledgervalue = [userid, depositby, paymentstatus, totalprice, bookingid, status];
          insertledger = 'INSERT INTO ledger (userID, depositby, paymentStatus, amount, bookingrefId, Date, status) VALUES (?, ?, ?, ?, ?, NOW(), ?)';
          _context.next = 47;
          return _db["default"].query(insertledger, ledgervalue);
        case 47:
          _context.next = 53;
          break;
        case 49:
          _context.prev = 49;
          _context.t0 = _context["catch"](0);
          console.error("Error making payment with wallet:", _context.t0);
          throw _context.t0;
        case 53:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 49]]);
  }));
  return function paywithwallet(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var paybookingamount = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var bookingid, userid, packagequery, _yield$pool$query7, _yield$pool$query8, booking, userquery, _yield$pool$query9, _yield$pool$query10, user, bookingamount, currentDate, dueDate, updatedwalet, value, updatequery, paymentstatus, bookingamountstatus, lastbalance, bookingamountpaiddate, valuedata, updateBookingquery, _yield$pool$query11, _yield$pool$query12, updatebooing;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          bookingid = req.body.bookingid;
          userid = req.body.id;
          packagequery = "SELECT *  FROM booking WHERE bookingid =?";
          _context2.next = 5;
          return _db["default"].query(packagequery, [bookingid]);
        case 5:
          _yield$pool$query7 = _context2.sent;
          _yield$pool$query8 = _slicedToArray(_yield$pool$query7, 1);
          booking = _yield$pool$query8[0];
          if (!(!booking || booking.length === 0)) {
            _context2.next = 10;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking not found');
        case 10:
          if (!(booking[0].bookingStatus !== 'HOLD')) {
            _context2.next = 12;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking request already approved or Rejected');
        case 12:
          userquery = "SELECT * FROM user WHERE id = ?";
          _context2.next = 15;
          return _db["default"].query(userquery, [userid]);
        case 15:
          _yield$pool$query9 = _context2.sent;
          _yield$pool$query10 = _slicedToArray(_yield$pool$query9, 1);
          user = _yield$pool$query10[0];
          if (!(!user || user.length === 0)) {
            _context2.next = 20;
            break;
          }
          throw new _expressSharp.NotFoundException('User not found');
        case 20:
          bookingamount = booking[0].booking_money;
          console.log(user[0].wallet);
          console.log(bookingamount);
          currentDate = new Date(); // Use JavaScript Date objects
          dueDate = booking.booking_money_due_date;
          if (!(currentDate > dueDate)) {
            _context2.next = 27;
            break;
          }
          throw new _expressSharp.HttpException('The due date for the installment has passed please contact with us', _httpStatus["default"].BAD_REQUEST);
        case 27:
          if (!(user[0].wallet < bookingamount)) {
            _context2.next = 29;
            break;
          }
          throw new _expressSharp.HttpException('Insufficient balance! please deposit to your wallet', _httpStatus["default"].BAD_REQUEST);
        case 29:
          updatedwalet = user[0].wallet - bookingamount;
          console.log(updatedwalet);
          value = [updatedwalet, userid];
          updatequery = "UPDATE user SET wallet = ? WHERE id =? ";
          _context2.next = 35;
          return _db["default"].query(updatequery, value);
        case 35:
          paymentstatus = payementStatus.BOOKINGSTATUS;
          bookingamountstatus = installmentStatus.COMPLETED;
          lastbalance = user[0].wallet;
          bookingamountpaiddate = new Date();
          valuedata = [paymentstatus, bookingamountstatus, bookingamountpaiddate, lastbalance, bookingid];
          updateBookingquery = "UPDATE booking SET paymentStatus = ?, bookingAmountStatus = ? ,bookingamountpaiddate =?,  wallet = ? WHERE bookingid= ? ";
          _context2.next = 43;
          return _db["default"].query(updateBookingquery, valuedata);
        case 43:
          _yield$pool$query11 = _context2.sent;
          _yield$pool$query12 = _slicedToArray(_yield$pool$query11, 1);
          updatebooing = _yield$pool$query12[0];
          return _context2.abrupt("return", updatebooing);
        case 47:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function paybookingamount(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var paySecondInstallment = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var bookingid, userid, packagequery, _yield$pool$query13, _yield$pool$query14, booking, userquery, _yield$pool$query15, _yield$pool$query16, user, first_installment, currentDate, dueDate, updatedwalet, value, updatequery, paymentstatus, firstInstallmentStatus, lastbalance, firstinstallmentpaiddate, valuedata, updateBookingquery, _yield$pool$query17, _yield$pool$query18, updatebooing;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          bookingid = req.body.bookingid;
          userid = req.body.id;
          packagequery = "SELECT *  FROM booking WHERE bookingid =?";
          _context3.next = 5;
          return _db["default"].query(packagequery, [bookingid]);
        case 5:
          _yield$pool$query13 = _context3.sent;
          _yield$pool$query14 = _slicedToArray(_yield$pool$query13, 1);
          booking = _yield$pool$query14[0];
          if (!(!booking || booking.length === 0)) {
            _context3.next = 10;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking not found');
        case 10:
          if (!(booking[0].bookingStatus !== 'HOLD')) {
            _context3.next = 12;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking request already approved or Rejected');
        case 12:
          if (!(booking[0].bookingAmountStatus !== 'completed')) {
            _context3.next = 14;
            break;
          }
          throw new _expressSharp.NotFoundException('booking amount is not paid yet');
        case 14:
          userquery = "SELECT * FROM user WHERE id = ?";
          _context3.next = 17;
          return _db["default"].query(userquery, [userid]);
        case 17:
          _yield$pool$query15 = _context3.sent;
          _yield$pool$query16 = _slicedToArray(_yield$pool$query15, 1);
          user = _yield$pool$query16[0];
          if (!(!user || user.length === 0)) {
            _context3.next = 22;
            break;
          }
          throw new _expressSharp.NotFoundException('User not found');
        case 22:
          first_installment = booking[0].first_installment;
          console.log(user[0].wallet);
          console.log(first_installment);
          currentDate = new Date(); // Use JavaScript Date objects
          dueDate = booking.first_installment_due_date;
          if (!(currentDate > dueDate)) {
            _context3.next = 29;
            break;
          }
          throw new _expressSharp.HttpException('The due date for the installment has passed please contact with us', _httpStatus["default"].BAD_REQUEST);
        case 29:
          if (!(user[0].wallet < first_installment)) {
            _context3.next = 31;
            break;
          }
          throw new _expressSharp.HttpException('Insufficient balance! please deposit to your wallet', _httpStatus["default"].BAD_REQUEST);
        case 31:
          updatedwalet = user[0].wallet - first_installment;
          console.log(updatedwalet);
          value = [updatedwalet, userid];
          updatequery = "UPDATE user SET wallet = ? WHERE id =? ";
          _context3.next = 37;
          return _db["default"].query(updatequery, value);
        case 37:
          paymentstatus = payementStatus.FIRSTINSTALLMENT;
          firstInstallmentStatus = installmentStatus.COMPLETED;
          lastbalance = user[0].wallet;
          firstinstallmentpaiddate = new Date();
          valuedata = [paymentstatus, firstInstallmentStatus, firstinstallmentpaiddate, lastbalance, bookingid];
          updateBookingquery = "UPDATE booking SET paymentStatus = ?, firstInstallmentStatus = ? ,firstinstallmentpaiddate =?,  wallet = ? WHERE bookingid= ? ";
          _context3.next = 45;
          return _db["default"].query(updateBookingquery, valuedata);
        case 45:
          _yield$pool$query17 = _context3.sent;
          _yield$pool$query18 = _slicedToArray(_yield$pool$query17, 1);
          updatebooing = _yield$pool$query18[0];
          return _context3.abrupt("return", updatebooing);
        case 49:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function paySecondInstallment(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var paythiredInstallment = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var bookingid, userid, packagequery, _yield$pool$query19, _yield$pool$query20, booking, userquery, _yield$pool$query21, _yield$pool$query22, user, second_installment, currentDate, dueDate, updatedwalet, value, updatequery, paymentstatus, InstallmentStatus, lastbalance, installmentpaidate, bookingstatus, valuedata, updateBookingquery, _yield$pool$query23, _yield$pool$query24, updatebooing;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          bookingid = req.body.bookingid;
          userid = req.body.id;
          packagequery = "SELECT *  FROM booking WHERE bookingid =?";
          _context4.next = 5;
          return _db["default"].query(packagequery, [bookingid]);
        case 5:
          _yield$pool$query19 = _context4.sent;
          _yield$pool$query20 = _slicedToArray(_yield$pool$query19, 1);
          booking = _yield$pool$query20[0];
          if (!(!booking || booking.length === 0)) {
            _context4.next = 10;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking not found');
        case 10:
          if (!(booking[0].bookingStatus !== 'HOLD')) {
            _context4.next = 12;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking request already approved or Rejected');
        case 12:
          if (!(booking[0].firstInstallmentStatus !== 'completed')) {
            _context4.next = 14;
            break;
          }
          throw new _expressSharp.NotFoundException('first installment is not paid yet');
        case 14:
          userquery = "SELECT * FROM user WHERE id = ?";
          _context4.next = 17;
          return _db["default"].query(userquery, [userid]);
        case 17:
          _yield$pool$query21 = _context4.sent;
          _yield$pool$query22 = _slicedToArray(_yield$pool$query21, 1);
          user = _yield$pool$query22[0];
          if (!(!user || user.length === 0)) {
            _context4.next = 22;
            break;
          }
          throw new _expressSharp.NotFoundException('User not found');
        case 22:
          second_installment = booking[0].second_installment;
          console.log(user[0].wallet);
          console.log(second_installment);
          currentDate = new Date(); // Use JavaScript Date objects
          dueDate = booking.second_installment_due_date;
          if (!(currentDate > dueDate)) {
            _context4.next = 29;
            break;
          }
          throw new _expressSharp.HttpException('The due date for the installment has passed please contact with us', _httpStatus["default"].BAD_REQUEST);
        case 29:
          if (!(user[0].wallet < second_installment)) {
            _context4.next = 31;
            break;
          }
          throw new _expressSharp.HttpException('Insufficient balance! please deposit to your wallet', _httpStatus["default"].BAD_REQUEST);
        case 31:
          updatedwalet = user[0].wallet - second_installment;
          console.log(updatedwalet);
          value = [updatedwalet, userid];
          updatequery = "UPDATE user SET wallet = ? WHERE id =? ";
          _context4.next = 37;
          return _db["default"].query(updatequery, value);
        case 37:
          paymentstatus = payementStatus.PAID;
          InstallmentStatus = installmentStatus.COMPLETED;
          lastbalance = user[0].wallet;
          installmentpaidate = new Date();
          bookingstatus = _bookingservice.bookingStatus.ISSUE_IN_PROCESS;
          valuedata = [paymentstatus, InstallmentStatus, installmentpaidate, bookingstatus, lastbalance, bookingid];
          updateBookingquery = "UPDATE booking SET paymentStatus = ?, secondInstallmentStatus = ? ,secondinstallmentpaidate =?, bookingStatus = ?,  wallet = ? WHERE bookingid= ? ";
          _context4.next = 46;
          return _db["default"].query(updateBookingquery, valuedata);
        case 46:
          _yield$pool$query23 = _context4.sent;
          _yield$pool$query24 = _slicedToArray(_yield$pool$query23, 1);
          updatebooing = _yield$pool$query24[0];
          return _context4.abrupt("return", updatebooing);
        case 50:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function paythiredInstallment(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var payemntService = exports.payemntService = {
  paywithwallet: paywithwallet,
  paybookingamount: paybookingamount,
  paySecondInstallment: paySecondInstallment,
  paythiredInstallment: paythiredInstallment
};