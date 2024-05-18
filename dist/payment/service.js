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
var _crypto = require("crypto");
var _sslcommerzLts = _interopRequireDefault(require("sslcommerz-lts"));
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
var generateCustomTransactionId = function generateCustomTransactionId() {
  var timestamp = Date.now().toString();
  var randomString = Math.random().toString(36).substr(2, 6); // Generate a random alphanumeric string
  var hash = (0, _crypto.createHash)('sha256').update("".concat(timestamp).concat(randomString)).digest('hex');
  var shortenedHash = hash.substr(0, 16).toUpperCase();
  return shortenedHash;
};
var paywithwallet = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _userwallet$, userid, bookingid, bookingquery, _yield$pool$query, _yield$pool$query2, booking, date, options, approvedAt, userquery, _yield$pool$query3, _yield$pool$query4, user, totalprice, data, wallet, newWalletBalance, walletvalue, updateuserbalancequery, _yield$pool$query5, _yield$pool$query6, userwallet, _yield$pool$query7, _yield$pool$query8, updatedwallet, bookingstatus, paymentstatus, value, updatebookingquery, _yield$pool$query9, _yield$pool$query10, updatedBooking, remarks, ledgerquery, lastbalance, ledger;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userid = req.body.id;
          bookingid = req.body.bookingid;
          bookingquery = "SELECT * FROM booking WHERE bookingid=?";
          _context.next = 6;
          return _db["default"].query(bookingquery, [bookingid]);
        case 6:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          booking = _yield$pool$query2[0];
          date = new Date();
          options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'Asia/Dhaka'
          };
          approvedAt = date.toLocaleString('en-BD', options);
          if (!(!booking || booking.length === 0)) {
            _context.next = 14;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking not found');
        case 14:
          if (!(booking[0].bookingStatus !== 'hold')) {
            _context.next = 16;
            break;
          }
          return _context.abrupt("return", res.send({
            status: "error",
            message: "Booking request already approved or Rejected"
          }));
        case 16:
          userquery = "SELECT * FROM user WHERE id = ?";
          _context.next = 19;
          return _db["default"].query(userquery, [userid]);
        case 19:
          _yield$pool$query3 = _context.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          user = _yield$pool$query4[0];
          if (!(!user || user.length === 0)) {
            _context.next = 24;
            break;
          }
          throw new _expressSharp.NotFoundException('User not found');
        case 24:
          totalprice = booking[0].totalAmount;
          console.log(user[0].wallet);
          data = parseInt(totalprice);
          wallet = parseInt(user[0].wallet); // Check wallet balance
          if (!(wallet < data)) {
            _context.next = 30;
            break;
          }
          return _context.abrupt("return", res.send({
            status: "error",
            message: "Insufficient balance! please deposit to your wallet"
          }));
        case 30:
          newWalletBalance = user[0].wallet - totalprice;
          console.log(newWalletBalance);
          walletvalue = [newWalletBalance, userid];
          updateuserbalancequery = "UPDATE user SET wallet = ? WHERE id = ?";
          _context.next = 36;
          return _db["default"].query(updateuserbalancequery, walletvalue);
        case 36:
          _yield$pool$query5 = _context.sent;
          _yield$pool$query6 = _slicedToArray(_yield$pool$query5, 1);
          userwallet = _yield$pool$query6[0];
          _context.next = 41;
          return _db["default"].query(userquery, [userid]);
        case 41:
          _yield$pool$query7 = _context.sent;
          _yield$pool$query8 = _slicedToArray(_yield$pool$query7, 1);
          updatedwallet = _yield$pool$query8[0];
          console.log((_userwallet$ = userwallet[0]) === null || _userwallet$ === void 0 ? void 0 : _userwallet$.wallet);
          bookingstatus = _bookingservice.bookingStatus.CONFIRMED;
          paymentstatus = payementStatus.PAID;
          value = [bookingstatus, paymentstatus, user[0].wallet, bookingid];
          updatebookingquery = "UPDATE booking SET bookingStatus = ?, paymentStatus = ?, wallet = ? WHERE bookingid = ?";
          _context.next = 51;
          return _db["default"].query(updatebookingquery, value);
        case 51:
          _yield$pool$query9 = _context.sent;
          _yield$pool$query10 = _slicedToArray(_yield$pool$query9, 1);
          updatedBooking = _yield$pool$query10[0];
          remarks = "The user ".concat(user[0].name, " has booked a package where bookingid ").concat(bookingid, " and package Id is ").concat(booking[0].PkID, ". Total Amount  is ").concat(totalprice);
          ledgerquery = "INSERT INTO ledger(user_id, purchase, lastBalance, remarks, createdAt) VALUES (?,?, ?, ?, ?)";
          lastbalance = parseInt(updatedwallet[0].wallet);
          _context.next = 59;
          return _db["default"].query(ledgerquery, [userid, totalprice, lastbalance, remarks, approvedAt]);
        case 59:
          ledger = _context.sent;
          _context.next = 66;
          break;
        case 62:
          _context.prev = 62;
          _context.t0 = _context["catch"](0);
          console.error("Error making payment with wallet:", _context.t0);
          throw _context.t0;
        case 66:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 62]]);
  }));
  return function paywithwallet(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var paybookingamount = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var bookingid, userid, packagequery, _yield$pool$query11, _yield$pool$query12, booking, userquery, _yield$pool$query13, _yield$pool$query14, user, bookingamount, currentDate, dueDate, updatedwalet, value, updatequery, paymentstatus, bookingamountstatus, lastbalance, bookingamountpaiddate, valuedata, updateBookingquery, _yield$pool$query15, _yield$pool$query16, updatebooing;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          bookingid = req.body.bookingid;
          userid = req.body.id;
          packagequery = "SELECT *  FROM booking WHERE bookingid =?";
          _context2.next = 5;
          return _db["default"].query(packagequery, [bookingid]);
        case 5:
          _yield$pool$query11 = _context2.sent;
          _yield$pool$query12 = _slicedToArray(_yield$pool$query11, 1);
          booking = _yield$pool$query12[0];
          if (!(!booking || booking.length === 0)) {
            _context2.next = 10;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking not found');
        case 10:
          if (!(booking[0].bookingStatus !== 'hold')) {
            _context2.next = 12;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking request already approved or Rejected');
        case 12:
          userquery = "SELECT * FROM user WHERE id = ?";
          _context2.next = 15;
          return _db["default"].query(userquery, [userid]);
        case 15:
          _yield$pool$query13 = _context2.sent;
          _yield$pool$query14 = _slicedToArray(_yield$pool$query13, 1);
          user = _yield$pool$query14[0];
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
          // Check wallet balance
          console.log(parseInt(user[0].wallet));
          console.log(parseInt(bookingamount));
          if (!(parseInt(user[0].wallet) < parseInt(bookingamount))) {
            _context2.next = 31;
            break;
          }
          throw new _expressSharp.HttpException('Insufficient balance! please deposit to your wallet', _httpStatus["default"].BAD_REQUEST);
        case 31:
          updatedwalet = user[0].wallet - bookingamount;
          console.log(updatedwalet);
          value = [updatedwalet, userid];
          updatequery = "UPDATE user SET wallet = ? WHERE id =? ";
          _context2.next = 37;
          return _db["default"].query(updatequery, value);
        case 37:
          paymentstatus = payementStatus.BOOKINGSTATUS;
          bookingamountstatus = installmentStatus.COMPLETED;
          lastbalance = user[0].wallet;
          bookingamountpaiddate = new Date();
          valuedata = [paymentstatus, bookingamountstatus, bookingamountpaiddate, lastbalance, bookingid];
          updateBookingquery = "UPDATE booking SET paymentStatus = ?, bookingAmountStatus = ? ,bookingamountpaiddate =?,  wallet = ? WHERE bookingid= ? ";
          _context2.next = 45;
          return _db["default"].query(updateBookingquery, valuedata);
        case 45:
          _yield$pool$query15 = _context2.sent;
          _yield$pool$query16 = _slicedToArray(_yield$pool$query15, 1);
          updatebooing = _yield$pool$query16[0];
          return _context2.abrupt("return", updatebooing);
        case 49:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function paybookingamount(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var payFirstandSecondInstallment = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var bookingid, userid, bookingquery, _yield$pool$query17, _yield$pool$query18, booking, userquery, _yield$pool$query19, _yield$pool$query20, user, bookingamount, firstinstalmentAmount, totalAmount, updatedwalet, value, updatequery, paymentstatus, bookingamountstatus, lastbalance, bookingamountpaiddate, firstInstallmentStatus, firstinstallmentpaiddate, valuedata, updateBookingquery, _yield$pool$query21, _yield$pool$query22, updatebooking;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          bookingid = req.body.bookingid;
          userid = req.body.id;
          bookingquery = "SELECT * FROM booking WHERE bookingid = ?";
          _context3.next = 5;
          return _db["default"].query(bookingquery, [bookingid]);
        case 5:
          _yield$pool$query17 = _context3.sent;
          _yield$pool$query18 = _slicedToArray(_yield$pool$query17, 1);
          booking = _yield$pool$query18[0];
          if (!(!booking || booking.length === 0)) {
            _context3.next = 10;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking not found');
        case 10:
          if (!(booking[0].bookingStatus !== 'hold')) {
            _context3.next = 12;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking request already approved or Rejected');
        case 12:
          userquery = "SELECT * FROM user WHERE id = ?";
          _context3.next = 15;
          return _db["default"].query(userquery, [userid]);
        case 15:
          _yield$pool$query19 = _context3.sent;
          _yield$pool$query20 = _slicedToArray(_yield$pool$query19, 1);
          user = _yield$pool$query20[0];
          if (!(!user || user.length === 0)) {
            _context3.next = 20;
            break;
          }
          throw new _expressSharp.NotFoundException('User not found');
        case 20:
          bookingamount = booking[0].booking_money;
          firstinstalmentAmount = booking[0].firstinstalmentAmount;
          totalAmount = bookingamount + firstinstalmentAmount;
          if (!(parseInt(user[0].wallet) < parseInt(totalAmount))) {
            _context3.next = 25;
            break;
          }
          throw new _expressSharp.HttpException('Insufficient balance! please deposit to your wallet', _httpStatus["default"].BAD_REQUEST);
        case 25:
          updatedwalet = parseInt(user[0].wallet) - parseInt(totalAmount);
          console.log(updatedwalet);
          value = [updatedwalet, userid];
          updatequery = "UPDATE user SET wallet = ? WHERE id = ? ";
          _context3.next = 31;
          return _db["default"].query(updatequery, value);
        case 31:
          paymentstatus = payementStatus.UNPAID;
          bookingamountstatus = installmentStatus.COMPLETED;
          lastbalance = user[0].wallet;
          bookingamountpaiddate = new Date();
          firstInstallmentStatus = installmentStatus.COMPLETED;
          firstinstallmentpaiddate = new Date();
          valuedata = [paymentstatus, bookingamountstatus, bookingamountpaiddate, firstInstallmentStatus, firstinstallmentpaiddate, lastbalance, bookingid];
          console.log(lastbalance);
          updateBookingquery = "UPDATE booking SET paymentStatus = ?, bookingAmountStatus = ? ,bookingamountpaiddate =?,  firstInstallmentStatus = ?,  firstinstallmentpaiddate = ?, wallet = ? WHERE bookingid= ? ";
          _context3.next = 42;
          return _db["default"].query(updateBookingquery, valuedata);
        case 42:
          _yield$pool$query21 = _context3.sent;
          _yield$pool$query22 = _slicedToArray(_yield$pool$query21, 1);
          updatebooking = _yield$pool$query22[0];
          return _context3.abrupt("return", updatebooking);
        case 46:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function payFirstandSecondInstallment(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var paySecondandthirdInstallment = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var bookingid, userid, bookingquery, _yield$pool$query23, _yield$pool$query24, booking, userquery, _yield$pool$query25, _yield$pool$query26, user, firstinstalmentAmount, secondinstalmentAmount, totalAmount, updatedwalet, value, updatequery, paymentstatus, firstInstallmentStatus, firstinstallmentpaiddate, secondInstallmentStatus, secondinstallmentpaiddate, bookingstatus, valuedata, updateBookingquery, _yield$pool$query27, _yield$pool$query28, updatebooking;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          bookingid = req.body.bookingid;
          userid = req.body.id;
          bookingquery = "SELECT * FROM booking WHERE bookingid = ?";
          _context4.next = 5;
          return _db["default"].query(bookingquery, [bookingid]);
        case 5:
          _yield$pool$query23 = _context4.sent;
          _yield$pool$query24 = _slicedToArray(_yield$pool$query23, 1);
          booking = _yield$pool$query24[0];
          if (!(!booking || booking.length === 0)) {
            _context4.next = 10;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking not found');
        case 10:
          if (!(booking[0].bookingStatus !== 'hold')) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.send({
            message: 'Booking request already approved or Rejected'
          }));
        case 12:
          if (!(booking[0].bookingAmountStatus !== 'completed')) {
            _context4.next = 14;
            break;
          }
          return _context4.abrupt("return", res.send({
            message: 'please pay your previous installemnt first'
          }));
        case 14:
          userquery = "SELECT * FROM user WHERE id = ?";
          _context4.next = 17;
          return _db["default"].query(userquery, [userid]);
        case 17:
          _yield$pool$query25 = _context4.sent;
          _yield$pool$query26 = _slicedToArray(_yield$pool$query25, 1);
          user = _yield$pool$query26[0];
          if (!(!user || user.length === 0)) {
            _context4.next = 22;
            break;
          }
          throw new _expressSharp.NotFoundException('User not found');
        case 22:
          firstinstalmentAmount = booking[0].first_installment;
          secondinstalmentAmount = booking[0].second_installment;
          totalAmount = secondinstalmentAmount + firstinstalmentAmount;
          if (!(parseInt(user[0].wallet) < parseInt(totalAmount))) {
            _context4.next = 27;
            break;
          }
          throw new _expressSharp.HttpException('Insufficient balance! please deposit to your wallet', _httpStatus["default"].BAD_REQUEST);
        case 27:
          console.log(totalAmount);
          updatedwalet = parseInt(user[0].wallet) - parseInt(totalAmount);
          value = [updatedwalet, userid];
          updatequery = "UPDATE user SET wallet = ? WHERE id = ? ";
          _context4.next = 33;
          return _db["default"].query(updatequery, value);
        case 33:
          paymentstatus = payementStatus.PAID;
          firstInstallmentStatus = installmentStatus.COMPLETED;
          firstinstallmentpaiddate = new Date();
          secondInstallmentStatus = installmentStatus.COMPLETED;
          secondinstallmentpaiddate = new Date();
          bookingstatus = _bookingservice.bookingStatus.ISSUE_IN_PROCESS;
          valuedata = [paymentstatus, firstInstallmentStatus, firstinstallmentpaiddate, secondInstallmentStatus, secondinstallmentpaiddate, bookingstatus, updatedwalet, bookingid];
          console.log(valuedata);
          updateBookingquery = "UPDATE booking SET paymentStatus = ?,  secondInstallmentStatus =?, \n  secondinstallmentpaidate=?, firstInstallmentStatus = ?,   firstinstallmentpaiddate = ?, bookingStatus=?, wallet = ? WHERE bookingid= ? ";
          _context4.next = 44;
          return _db["default"].query(updateBookingquery, valuedata);
        case 44:
          _yield$pool$query27 = _context4.sent;
          _yield$pool$query28 = _slicedToArray(_yield$pool$query27, 1);
          updatebooking = _yield$pool$query28[0];
          return _context4.abrupt("return", updatebooking);
        case 48:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function paySecondandthirdInstallment(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var paySecondInstallment = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var bookingid, userid, packagequery, _yield$pool$query29, _yield$pool$query30, booking, userquery, _yield$pool$query31, _yield$pool$query32, user, first_installment, currentDate, dueDate, updatedwalet, value, updatequery, paymentstatus, firstInstallmentStatus, lastbalance, firstinstallmentpaiddate, valuedata, updateBookingquery, _yield$pool$query33, _yield$pool$query34, updatebooing;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          bookingid = req.body.bookingid;
          userid = req.body.id;
          packagequery = "SELECT *  FROM booking WHERE bookingid =?";
          _context5.next = 5;
          return _db["default"].query(packagequery, [bookingid]);
        case 5:
          _yield$pool$query29 = _context5.sent;
          _yield$pool$query30 = _slicedToArray(_yield$pool$query29, 1);
          booking = _yield$pool$query30[0];
          if (!(!booking || booking.length === 0)) {
            _context5.next = 10;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking not found');
        case 10:
          if (!(booking[0].bookingStatus !== 'hold')) {
            _context5.next = 12;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking request already approved or Rejected');
        case 12:
          if (!(booking[0].bookingAmountStatus !== 'completed' || null)) {
            _context5.next = 14;
            break;
          }
          throw new _expressSharp.NotFoundException('booking amount is not paid yet');
        case 14:
          userquery = "SELECT * FROM user WHERE id = ?";
          _context5.next = 17;
          return _db["default"].query(userquery, [userid]);
        case 17:
          _yield$pool$query31 = _context5.sent;
          _yield$pool$query32 = _slicedToArray(_yield$pool$query31, 1);
          user = _yield$pool$query32[0];
          if (!(!user || user.length === 0)) {
            _context5.next = 22;
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
            _context5.next = 29;
            break;
          }
          throw new _expressSharp.HttpException('The due date for the installment has passed please contact with us', _httpStatus["default"].BAD_REQUEST);
        case 29:
          if (!(user[0].wallet < first_installment)) {
            _context5.next = 31;
            break;
          }
          throw new _expressSharp.HttpException('Insufficient balance! please deposit to your wallet', _httpStatus["default"].BAD_REQUEST);
        case 31:
          updatedwalet = user[0].wallet - first_installment;
          console.log(updatedwalet);
          value = [updatedwalet, userid];
          updatequery = "UPDATE user SET wallet = ? WHERE id =? ";
          _context5.next = 37;
          return _db["default"].query(updatequery, value);
        case 37:
          paymentstatus = payementStatus.FIRSTINSTALLMENT;
          firstInstallmentStatus = installmentStatus.COMPLETED;
          lastbalance = user[0].wallet;
          firstinstallmentpaiddate = new Date();
          valuedata = [paymentstatus, firstInstallmentStatus, firstinstallmentpaiddate, lastbalance, bookingid];
          console.log(valuedata);
          updateBookingquery = "UPDATE booking SET paymentStatus = ?, firstInstallmentStatus = ? ,firstinstallmentpaiddate =?,  wallet = ? WHERE bookingid= ? ";
          _context5.next = 46;
          return _db["default"].query(updateBookingquery, valuedata);
        case 46:
          _yield$pool$query33 = _context5.sent;
          _yield$pool$query34 = _slicedToArray(_yield$pool$query33, 1);
          updatebooing = _yield$pool$query34[0];
          return _context5.abrupt("return", updatebooing);
        case 50:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function paySecondInstallment(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var paythiredInstallment = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var bookingid, userid, packagequery, _yield$pool$query35, _yield$pool$query36, booking, userquery, _yield$pool$query37, _yield$pool$query38, user, second_installment, currentDate, dueDate, updatedwalet, value, updatequery, paymentstatus, InstallmentStatus, lastbalance, installmentpaidate, bookingstatus, valuedata, updateBookingquery, _yield$pool$query39, _yield$pool$query40, updatebooing;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          bookingid = req.body.bookingid;
          userid = req.body.id;
          packagequery = "SELECT *  FROM booking WHERE bookingid =?";
          _context6.next = 5;
          return _db["default"].query(packagequery, [bookingid]);
        case 5:
          _yield$pool$query35 = _context6.sent;
          _yield$pool$query36 = _slicedToArray(_yield$pool$query35, 1);
          booking = _yield$pool$query36[0];
          if (!(!booking || booking.length === 0)) {
            _context6.next = 10;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking not found');
        case 10:
          if (!(booking[0].bookingStatus !== 'hold')) {
            _context6.next = 12;
            break;
          }
          throw new _expressSharp.NotFoundException('Booking request already approved or Rejected');
        case 12:
          if (!(booking[0].firstInstallmentStatus !== 'completed' && booking[0].bookingAmountStatus !== 'completed')) {
            _context6.next = 14;
            break;
          }
          return _context6.abrupt("return", res.send({
            message: "please pay your early installment"
          }));
        case 14:
          userquery = "SELECT * FROM user WHERE id = ?";
          _context6.next = 17;
          return _db["default"].query(userquery, [userid]);
        case 17:
          _yield$pool$query37 = _context6.sent;
          _yield$pool$query38 = _slicedToArray(_yield$pool$query37, 1);
          user = _yield$pool$query38[0];
          if (!(!user || user.length === 0)) {
            _context6.next = 22;
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
            _context6.next = 29;
            break;
          }
          throw new _expressSharp.HttpException('The due date for the installment has passed please contact with us', _httpStatus["default"].BAD_REQUEST);
        case 29:
          if (!(user[0].wallet < second_installment)) {
            _context6.next = 31;
            break;
          }
          throw new _expressSharp.HttpException('Insufficient balance! please deposit to your wallet', _httpStatus["default"].BAD_REQUEST);
        case 31:
          updatedwalet = parseInt(user[0].wallet) - parseInt(second_installment);
          console.log(updatedwalet);
          value = [updatedwalet, userid];
          updatequery = "UPDATE user SET wallet = ? WHERE id =? ";
          _context6.next = 37;
          return _db["default"].query(updatequery, value);
        case 37:
          paymentstatus = payementStatus.PAID;
          InstallmentStatus = installmentStatus.COMPLETED;
          lastbalance = user[0].wallet;
          installmentpaidate = new Date();
          bookingstatus = _bookingservice.bookingStatus.ISSUE_IN_PROCESS;
          valuedata = [paymentstatus, InstallmentStatus, installmentpaidate, bookingstatus, lastbalance, bookingid];
          updateBookingquery = "UPDATE booking SET paymentStatus = ?, secondInstallmentStatus = ? ,secondinstallmentpaidate =?, bookingStatus = ?,  wallet = ? WHERE bookingid= ? ";
          _context6.next = 46;
          return _db["default"].query(updateBookingquery, valuedata);
        case 46:
          _yield$pool$query39 = _context6.sent;
          _yield$pool$query40 = _slicedToArray(_yield$pool$query39, 1);
          updatebooing = _yield$pool$query40[0];
          return _context6.abrupt("return", updatebooing);
        case 50:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function paythiredInstallment(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var initwithsslfullamount = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body, _req$body2;
    var transactionId, bookingid, userid, bookingquery, _yield$pool$query41, _yield$pool$query42, booking, amount, userquery, _yield$pool$query43, _yield$pool$query44, user, data, insertQuery, paymentstatus, sslcz, apiResponse;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          transactionId = generateCustomTransactionId();
          bookingid = (_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.bookingid;
          userid = (_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.id;
          bookingquery = "SELECT * FROM booking WHERE bookingid=?";
          _context7.next = 6;
          return _db["default"].query(bookingquery, [bookingid]);
        case 6:
          _yield$pool$query41 = _context7.sent;
          _yield$pool$query42 = _slicedToArray(_yield$pool$query41, 1);
          booking = _yield$pool$query42[0];
          amount = booking[0].totalAmount;
          console.log(amount);
          userquery = "SELECT * FROM user WHERE id=?";
          _context7.next = 14;
          return _db["default"].query(userquery, [userid]);
        case 14:
          _yield$pool$query43 = _context7.sent;
          _yield$pool$query44 = _slicedToArray(_yield$pool$query43, 1);
          user = _yield$pool$query44[0];
          data = {
            store_id: process.env.SSL_STORE_ID,
            store_passwd: process.env.SSL_STORE_PASSWORD,
            total_amount: amount,
            currency: "BDT",
            tran_id: transactionId,
            tran_date: Date(),
            success_url: "https://flyfarladies-express-416405.appspot.com/api/v1/payment/ssl/success/fullpayment/".concat(transactionId, "/").concat(bookingid),
            fail_url: "https://flyfarladies-express-416405.appspot.com/api/v1/ssl/failure/".concat(transactionId),
            cancel_url: "https://flyfarladies-express-416405.appspot.com/api/v1/ssl/cancel/".concat(transactionId),
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
            value_a: "scfcc" || user[0].userid
          };
          insertQuery = "INSERT INTO ssl_commerz_entity (\n    tran_id,\n    value_b,\n    cus_name, cus_email, cus_phone,\n    total_amount, currency, status\n) VALUES (\n    ?, ?, ?, ?, ?, ?,\n    ?, ?\n)\n";
          paymentstatus = "unpaid"; // Execute the SQL query
          _context7.next = 22;
          return _db["default"].query(insertQuery, [transactionId, userid, data.cus_name, data.cus_email, data.cus_phone, data.total_amount, data.currency, paymentstatus]);
        case 22:
          console.log(data);
          sslcz = new _sslcommerzLts["default"](process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, true);
          _context7.next = 26;
          return sslcz.init(data);
        case 26:
          apiResponse = _context7.sent;
          // await this.sslcommerzRepository.save(data)
          res.send(apiResponse);
        case 28:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function initwithsslfullamount(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var sucesssslfullamount = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var tran_id, bookingid, data, _yield$pool$query45, _yield$pool$query46, transactionRows, transaction, bookingstatus, paymentstatus, value, updatequery, updatebooking;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          tran_id = req.params.tran_id;
          bookingid = req.params.bookingid; // const uuid = req.params.id;
          data = req.body;
          console.log(req.body);

          // Assuming you have a sslcommerzRepository and UserRepository to handle database operations
          _context8.next = 6;
          return _db["default"].query('SELECT * FROM ssl_commerz_entity WHERE tran_id = ?', [tran_id]);
        case 6:
          _yield$pool$query45 = _context8.sent;
          _yield$pool$query46 = _slicedToArray(_yield$pool$query45, 1);
          transactionRows = _yield$pool$query46[0];
          transaction = transactionRows[0];
          if (transaction) {
            _context8.next = 12;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'Transaction ID not found',
            error: true
          }));
        case 12:
          _context8.next = 14;
          return _db["default"].query('UPDATE ssl_commerz_entity SET paymentstatus = ?, store_amount = ?,  status =?, tran_date = ?, val_id = ?, bank_tran_id = ? WHERE tran_id = ?', ['VALIDATED', data.store_amount, data.status, data.tran_date, data.val_id, data.bank_tran_id, tran_id]);
        case 14:
          bookingstatus = _bookingservice.bookingStatus.ISSUE_IN_PROCESS;
          paymentstatus = payementStatus.PAID;
          value = [paymentstatus, bookingstatus, bookingid];
          updatequery = "UPDATE booking SET paymentStatus=?,  bookingStatus = ? WHERE bookingid = ?";
          _context8.next = 20;
          return _db["default"].query(updatequery, value);
        case 20:
          updatebooking = _context8.sent;
          return _context8.abrupt("return", res.redirect("https://flyfarladies.com/dashboard/congratulationmessage"));
        case 22:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function sucesssslfullamount(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var initwithsslbookingmoney = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var transactionId, bookingid, userid, bookingquery, _yield$pool$query47, _yield$pool$query48, booking, amount, userquery, _yield$pool$query49, _yield$pool$query50, user, data, insertQuery, paymentstatus, sslcz, apiResponse;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          transactionId = generateCustomTransactionId();
          bookingid = req.body.bookingid;
          userid = req.body.id;
          bookingquery = "SELECT * FROM booking WHERE bookingid=?";
          _context9.next = 6;
          return _db["default"].query(bookingquery, [bookingid]);
        case 6:
          _yield$pool$query47 = _context9.sent;
          _yield$pool$query48 = _slicedToArray(_yield$pool$query47, 1);
          booking = _yield$pool$query48[0];
          amount = booking[0].booking_money;
          userquery = "SELECT * FROM user WHERE id=?";
          _context9.next = 13;
          return _db["default"].query(userquery, [userid]);
        case 13:
          _yield$pool$query49 = _context9.sent;
          _yield$pool$query50 = _slicedToArray(_yield$pool$query49, 1);
          user = _yield$pool$query50[0];
          console.log(user);
          data = {
            store_id: process.env.SSL_STORE_ID,
            store_passwd: process.env.SSL_STORE_PASSWORD,
            total_amount: amount,
            currency: "BDT",
            tran_id: transactionId,
            tran_date: Date(),
            success_url: "https://flyfarladies-express-416405.appspot.com/api/v1/payment/ssl/success/bookingamount/".concat(transactionId, "/").concat(bookingid),
            fail_url: "https://flyfarladies-express-416405.appspot.com/api/v1/ssl/failure/".concat(transactionId),
            cancel_url: "https://flyfarladies-express-416405.appspot.com/api/v1/ssl/cancel/".concat(transactionId),
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
            value_a: "scfcc" || user[0].userid
          };
          insertQuery = "INSERT INTO ssl_commerz_entity (\n    tran_id,\n    value_b,\n    cus_name, cus_email, cus_phone,\n    total_amount, currency, status\n) VALUES (\n    ?, ?, ?, ?, ?, ?,\n    ?, ?\n)\n";
          paymentstatus = "unpaid"; // Execute the SQL query
          _context9.next = 22;
          return _db["default"].query(insertQuery, [transactionId, userid, data.cus_name, data.cus_email, data.cus_phone, data.total_amount, data.currency, paymentstatus]);
        case 22:
          sslcz = new _sslcommerzLts["default"](process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, true);
          _context9.next = 25;
          return sslcz.init(data);
        case 25:
          apiResponse = _context9.sent;
          // await this.sslcommerzRepository.save(data)
          res.send(apiResponse);
        case 27:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function initwithsslbookingmoney(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var sucess_ssl_bookingAmount = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var tran_id, bookingid, data, _yield$pool$query51, _yield$pool$query52, transactionRows, transaction, bookingamountstatus, paiddate, value, updatequery, updatebooking;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          tran_id = req.params.tran_id;
          bookingid = req.params.bookingid; // const uuid = req.params.id;
          data = req.body;
          console.log(req.body);

          // Assuming you have a sslcommerzRepository and UserRepository to handle database operations
          _context10.next = 6;
          return _db["default"].query('SELECT * FROM ssl_commerz_entity WHERE tran_id = ?', [tran_id]);
        case 6:
          _yield$pool$query51 = _context10.sent;
          _yield$pool$query52 = _slicedToArray(_yield$pool$query51, 1);
          transactionRows = _yield$pool$query52[0];
          transaction = transactionRows[0];
          if (transaction) {
            _context10.next = 12;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            message: 'Transaction ID not found',
            error: true
          }));
        case 12:
          _context10.next = 14;
          return _db["default"].query('UPDATE ssl_commerz_entity SET paymentstatus = ?, store_amount = ?,  status =?, tran_date = ?, val_id = ?, bank_tran_id = ? WHERE tran_id = ?', ['VALIDATED', data.store_amount, data.status, data.tran_date, data.val_id, data.bank_tran_id, tran_id]);
        case 14:
          bookingamountstatus = installmentStatus.COMPLETED;
          paiddate = new Date();
          value = [bookingamountstatus, paiddate, bookingid];
          updatequery = "UPDATE booking SET bookingAmountStatus=?,  bookingamountpaiddate=? WHERE bookingid = ?";
          _context10.next = 20;
          return _db["default"].query(updatequery, value);
        case 20:
          updatebooking = _context10.sent;
          return _context10.abrupt("return", res.redirect("https://flyfarladies.com/dashboard/congratulationmessage"));
        case 22:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function sucess_ssl_bookingAmount(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var initwithssl1stinstallemnt = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var transactionId, bookingid, userid, bookingquery, _yield$pool$query53, _yield$pool$query54, booking, amount, userquery, _yield$pool$query55, _yield$pool$query56, user, data, insertQuery, paymentstatus, sslcz, apiResponse;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          transactionId = generateCustomTransactionId();
          bookingid = req.body.bookingid;
          userid = req.body.id;
          bookingquery = "SELECT * FROM booking WHERE bookingid=?";
          _context11.next = 6;
          return _db["default"].query(bookingquery, [bookingid]);
        case 6:
          _yield$pool$query53 = _context11.sent;
          _yield$pool$query54 = _slicedToArray(_yield$pool$query53, 1);
          booking = _yield$pool$query54[0];
          amount = booking[0].first_installment;
          if (!(booking.length === 0)) {
            _context11.next = 12;
            break;
          }
          return _context11.abrupt("return", res.send({
            message: "booking not found"
          }));
        case 12:
          userquery = "SELECT * FROM user WHERE id=?";
          _context11.next = 15;
          return _db["default"].query(userquery, [userid]);
        case 15:
          _yield$pool$query55 = _context11.sent;
          _yield$pool$query56 = _slicedToArray(_yield$pool$query55, 1);
          user = _yield$pool$query56[0];
          data = {
            store_id: process.env.SSL_STORE_ID,
            store_passwd: process.env.SSL_STORE_PASSWORD,
            total_amount: parseInt(amount),
            currency: "BDT",
            tran_id: transactionId,
            tran_date: Date(),
            success_url: "https://flyfarladies-express-416405.appspot.com/api/v1/payment/ssl/success/1stinstallment/".concat(transactionId, "/").concat(bookingid),
            fail_url: "https://flyfarladies-express-416405.appspot.com/api/v1/ssl/failure/".concat(transactionId),
            cancel_url: "https://flyfarladies-express-416405.appspot.com/api/v1/ssl/cancel/".concat(transactionId),
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
            value_a: "scfcc" || user[0].userid
          };
          insertQuery = "INSERT INTO ssl_commerz_entity (\n    tran_id,\n    value_b,\n    cus_name, cus_email, cus_phone,\n    total_amount, currency, status\n) VALUES (\n    ?, ?, ?, ?, ?, ?,\n    ?, ?\n)\n";
          paymentstatus = "unpaid"; // Execute the SQL query
          _context11.next = 23;
          return _db["default"].query(insertQuery, [transactionId, userid, data.cus_name, data.cus_email, data.cus_phone, data.total_amount, data.currency, paymentstatus]);
        case 23:
          console.log(data);
          sslcz = new _sslcommerzLts["default"](process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, true);
          _context11.next = 27;
          return sslcz.init(data);
        case 27:
          apiResponse = _context11.sent;
          // await this.sslcommerzRepository.save(data)
          res.send(apiResponse);
        case 29:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function initwithssl1stinstallemnt(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
var success_ssl_1stinstallemnt = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var tran_id, bookingid, data, _yield$pool$query57, _yield$pool$query58, transactionRows, transaction, firstinstallemnttstatus, paiddate, value, updatequery, updatebooking;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          tran_id = req.params.tran_id;
          bookingid = req.params.bookingid; // const uuid = req.params.id;
          data = req.body;
          console.log(req.body);

          // Assuming you have a sslcommerzRepository and UserRepository to handle database operations
          _context12.next = 6;
          return _db["default"].query('SELECT * FROM ssl_commerz_entity WHERE tran_id = ?', [tran_id]);
        case 6:
          _yield$pool$query57 = _context12.sent;
          _yield$pool$query58 = _slicedToArray(_yield$pool$query57, 1);
          transactionRows = _yield$pool$query58[0];
          transaction = transactionRows[0];
          if (transaction) {
            _context12.next = 12;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            message: 'Transaction ID not found',
            error: true
          }));
        case 12:
          _context12.next = 14;
          return _db["default"].query('UPDATE ssl_commerz_entity SET paymentstatus = ?, store_amount = ?,  status =?, tran_date = ?, val_id = ?, bank_tran_id = ? WHERE tran_id = ?', ['VALIDATED', data.store_amount, data.status, data.tran_date, data.val_id, data.bank_tran_id, tran_id]);
        case 14:
          firstinstallemnttstatus = installmentStatus.COMPLETED;
          paiddate = new Date();
          value = [firstinstallemnttstatus, paiddate, bookingid];
          updatequery = "UPDATE booking SET firstInstallmentStatus=?,  firstinstallmentpaiddate=? WHERE bookingid = ?";
          _context12.next = 20;
          return _db["default"].query(updatequery, value);
        case 20:
          updatebooking = _context12.sent;
          return _context12.abrupt("return", res.redirect("https://flyfarladies.com/dashboard/congratulationmessage"));
        case 22:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function success_ssl_1stinstallemnt(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
var initwithssl2ndinstallemnt = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var transactionId, bookingid, userid, bookingquery, _yield$pool$query59, _yield$pool$query60, booking, amount, userquery, _yield$pool$query61, _yield$pool$query62, user, data, insertQuery, paymentstatus, sslcz, apiResponse;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          transactionId = generateCustomTransactionId();
          bookingid = req.body.bookingid;
          userid = req.body.id;
          bookingquery = "SELECT * FROM booking WHERE bookingid=?";
          _context13.next = 6;
          return _db["default"].query(bookingquery, [bookingid]);
        case 6:
          _yield$pool$query59 = _context13.sent;
          _yield$pool$query60 = _slicedToArray(_yield$pool$query59, 1);
          booking = _yield$pool$query60[0];
          amount = booking[0].second_installment;
          if (!(booking.length === 0)) {
            _context13.next = 12;
            break;
          }
          return _context13.abrupt("return", res.send({
            message: "booking not found"
          }));
        case 12:
          userquery = "SELECT * FROM user WHERE id=?";
          _context13.next = 15;
          return _db["default"].query(userquery, [userid]);
        case 15:
          _yield$pool$query61 = _context13.sent;
          _yield$pool$query62 = _slicedToArray(_yield$pool$query61, 1);
          user = _yield$pool$query62[0];
          console.log(user);
          data = {
            store_id: process.env.SSL_STORE_ID,
            store_passwd: process.env.SSL_STORE_PASSWORD,
            total_amount: parseInt(amount),
            currency: "BDT",
            tran_id: transactionId,
            tran_date: Date(),
            success_url: "https://flyfarladies-express-416405.appspot.com/api/v1/payment/ssl/success/2ndinstallment/".concat(transactionId, "/").concat(bookingid),
            fail_url: "https://flyfarladies-express-416405.appspot.com/api/v1/ssl/failure/".concat(transactionId),
            cancel_url: "https://flyfarladies-express-416405.appspot.com/api/v1/ssl/cancel/".concat(transactionId),
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
            value_a: "scfcc" || user[0].userid
          };
          insertQuery = "INSERT INTO ssl_commerz_entity (\n    tran_id,\n    value_b,\n    cus_name, cus_email, cus_phone,\n    total_amount, currency, status\n) VALUES (\n    ?, ?, ?, ?, ?, ?,\n    ?, ?\n)\n";
          paymentstatus = "unpaid"; // Execute the SQL query
          _context13.next = 24;
          return _db["default"].query(insertQuery, [transactionId, userid, data.cus_name, data.cus_email, data.cus_phone, data.total_amount, data.currency, paymentstatus]);
        case 24:
          console.log(data);
          sslcz = new _sslcommerzLts["default"](process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, true);
          _context13.next = 28;
          return sslcz.init(data);
        case 28:
          apiResponse = _context13.sent;
          // await this.sslcommerzRepository.save(data)
          res.send(apiResponse);
        case 30:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function initwithssl2ndinstallemnt(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
var success_ssl_2ndinstallemnt = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var tran_id, bookingid, data, _yield$pool$query63, _yield$pool$query64, transactionRows, transaction, secondinstallemnttstatus, paiddate, bookingstatus, paymentstatus, value, updatequery;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          tran_id = req.params.tran_id;
          bookingid = req.params.bookingid; // const uuid = req.params.id;
          data = req.body;
          console.log(req.body);

          // Assuming you have a sslcommerzRepository and UserRepository to handle database operations
          _context14.next = 6;
          return _db["default"].query('SELECT * FROM ssl_commerz_entity WHERE tran_id = ?', [tran_id]);
        case 6:
          _yield$pool$query63 = _context14.sent;
          _yield$pool$query64 = _slicedToArray(_yield$pool$query63, 1);
          transactionRows = _yield$pool$query64[0];
          transaction = transactionRows[0];
          if (transaction) {
            _context14.next = 12;
            break;
          }
          return _context14.abrupt("return", res.status(404).json({
            message: 'Transaction ID not found',
            error: true
          }));
        case 12:
          _context14.next = 14;
          return _db["default"].query('UPDATE ssl_commerz_entity SET paymentstatus = ?, store_amount = ?,  status =?, tran_date = ?, val_id = ?, bank_tran_id = ? WHERE tran_id = ?', ['VALIDATED', data.store_amount, data.status, data.tran_date, data.val_id, data.bank_tran_id, tran_id]);
        case 14:
          secondinstallemnttstatus = installmentStatus.COMPLETED;
          paiddate = new Date();
          bookingstatus = _bookingservice.bookingStatus.ISSUE_IN_PROCESS;
          paymentstatus = payementStatus.PAID;
          value = [paymentstatus, bookingstatus, secondinstallemnttstatus, paiddate, bookingid];
          updatequery = "UPDATE booking SET paymentStatus=?,bookingStatus=?,  secondInstallmentStatus=?,  second_installment_due_date=? WHERE bookingid = ?";
          _context14.next = 22;
          return _db["default"].query(updatequery, value);
        case 22:
          return _context14.abrupt("return", res.redirect("https://flyfarladies.com/dashboard/congratulationmessage"));
        case 23:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function success_ssl_2ndinstallemnt(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
var initwithssl1stAnd2ndinstallment = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var transactionId, bookingid, userid, bookingquery, _yield$pool$query65, _yield$pool$query66, booking, firstamount, bookingAmount, totalAmount, userquery, _yield$pool$query67, _yield$pool$query68, user, data, insertQuery, paymentstatus, sslcz, apiResponse;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          transactionId = generateCustomTransactionId();
          bookingid = req.body.bookingid;
          userid = req.body.id;
          bookingquery = "SELECT * FROM booking WHERE bookingid = ?";
          _context15.next = 6;
          return _db["default"].query(bookingquery, [bookingid]);
        case 6:
          _yield$pool$query65 = _context15.sent;
          _yield$pool$query66 = _slicedToArray(_yield$pool$query65, 1);
          booking = _yield$pool$query66[0];
          firstamount = booking[0].first_installment;
          bookingAmount = booking[0].booking_money;
          totalAmount = firstamount + bookingAmount;
          if (!(booking.length === 0)) {
            _context15.next = 14;
            break;
          }
          return _context15.abrupt("return", res.send({
            message: "booking not found"
          }));
        case 14:
          userquery = "SELECT * FROM user WHERE id=?";
          _context15.next = 17;
          return _db["default"].query(userquery, [userid]);
        case 17:
          _yield$pool$query67 = _context15.sent;
          _yield$pool$query68 = _slicedToArray(_yield$pool$query67, 1);
          user = _yield$pool$query68[0];
          console.log(user);
          data = {
            store_id: process.env.SSL_STORE_ID,
            store_passwd: process.env.SSL_STORE_PASSWORD,
            total_amount: parseInt(totalAmount),
            currency: "BDT",
            tran_id: transactionId,
            tran_date: Date(),
            success_url: "https://flyfarladies-express-416405.appspot.com/api/v1/payment/ssl/success/1nstand2ndinstallment/".concat(transactionId, "/").concat(bookingid),
            fail_url: "https://flyfarladies-express-416405.appspot.com/api/v1/ssl/failure/".concat(transactionId),
            cancel_url: "https://flyfarladies-express-416405.appspot.com/api/v1/ssl/cancel/".concat(transactionId),
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
            value_a: "scfcc" || user[0].userid
          };
          insertQuery = "INSERT INTO ssl_commerz_entity (\n    tran_id,\n    value_b,\n    cus_name, cus_email, cus_phone,\n    total_amount, currency, status\n) VALUES (\n    ?, ?, ?, ?, ?, ?,\n    ?, ?\n)\n";
          paymentstatus = "unpaid"; // Execute the SQL query
          _context15.next = 26;
          return _db["default"].query(insertQuery, [transactionId, userid, data.cus_name, data.cus_email, data.cus_phone, data.total_amount, data.currency, paymentstatus]);
        case 26:
          console.log(data);
          sslcz = new _sslcommerzLts["default"](process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, true);
          _context15.next = 30;
          return sslcz.init(data);
        case 30:
          apiResponse = _context15.sent;
          // await this.sslcommerzRepository.save(data)
          res.send(apiResponse);
        case 32:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function initwithssl1stAnd2ndinstallment(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
var sucess_ssl_1st_and_2nd_booking_Amount = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var tran_id, bookingid, data, _yield$pool$query69, _yield$pool$query70, transactionRows, transaction, paymentstatus, bookingamountstatus, bookingamountpaiddate, firstInstallmentStatus, firstinstallmentpaiddate, valuedata, updateBookingquery;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          tran_id = req.params.tran_id;
          bookingid = req.params.bookingid; // const uuid = req.params.id;
          data = req.body;
          console.log(req.body);

          // Assuming you have a sslcommerzRepository and UserRepository to handle database operations
          _context16.next = 6;
          return _db["default"].query('SELECT * FROM ssl_commerz_entity WHERE tran_id = ?', [tran_id]);
        case 6:
          _yield$pool$query69 = _context16.sent;
          _yield$pool$query70 = _slicedToArray(_yield$pool$query69, 1);
          transactionRows = _yield$pool$query70[0];
          transaction = transactionRows[0];
          if (transaction) {
            _context16.next = 12;
            break;
          }
          return _context16.abrupt("return", res.status(404).json({
            message: 'Transaction ID not found',
            error: true
          }));
        case 12:
          _context16.next = 14;
          return _db["default"].query('UPDATE ssl_commerz_entity SET paymentstatus = ?, store_amount = ?,  status =?, tran_date = ?, val_id = ?, bank_tran_id = ? WHERE tran_id = ?', ['VALIDATED', data.store_amount, data.status, data.tran_date, data.val_id, data.bank_tran_id, tran_id]);
        case 14:
          paymentstatus = payementStatus.UNPAID;
          bookingamountstatus = installmentStatus.COMPLETED;
          bookingamountpaiddate = new Date();
          firstInstallmentStatus = installmentStatus.COMPLETED;
          firstinstallmentpaiddate = new Date();
          valuedata = [paymentstatus, bookingamountstatus, bookingamountpaiddate, firstInstallmentStatus, firstinstallmentpaiddate, bookingid];
          updateBookingquery = "UPDATE booking SET paymentStatus = ?, bookingAmountStatus = ? ,bookingamountpaiddate =?,  firstInstallmentStatus = ?,  firstinstallmentpaiddate = ? WHERE bookingid= ? ";
          _context16.next = 23;
          return _db["default"].query(updateBookingquery, valuedata);
        case 23:
          return _context16.abrupt("return", res.redirect("https://flyfarladies.com/dashboard/congratulationmessage"));
        case 24:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function sucess_ssl_1st_and_2nd_booking_Amount(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();
var initwithssl2ndand3rdinstallment = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var transactionId, bookingid, userid, bookingquery, _yield$pool$query71, _yield$pool$query72, booking, firstamount, secondAmount, totalAmount, userquery, _yield$pool$query73, _yield$pool$query74, user, data, insertQuery, paymentstatus, sslcz, apiResponse;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          transactionId = generateCustomTransactionId();
          bookingid = req.body.bookingid;
          userid = req.body.id;
          bookingquery = "SELECT * FROM booking WHERE bookingid = ?";
          _context17.next = 6;
          return _db["default"].query(bookingquery, [bookingid]);
        case 6:
          _yield$pool$query71 = _context17.sent;
          _yield$pool$query72 = _slicedToArray(_yield$pool$query71, 1);
          booking = _yield$pool$query72[0];
          firstamount = booking[0].first_installment;
          secondAmount = booking[0].secondAmount;
          totalAmount = firstamount + secondAmount;
          if (!(booking.length === 0)) {
            _context17.next = 14;
            break;
          }
          return _context17.abrupt("return", res.send({
            message: "booking not found"
          }));
        case 14:
          if (!(booking[0].bookingAmountStatus !== 'completed')) {
            _context17.next = 16;
            break;
          }
          return _context17.abrupt("return", res.send({
            message: 'please pay your previous installemnt first'
          }));
        case 16:
          userquery = "SELECT * FROM user WHERE id=?";
          _context17.next = 19;
          return _db["default"].query(userquery, [userid]);
        case 19:
          _yield$pool$query73 = _context17.sent;
          _yield$pool$query74 = _slicedToArray(_yield$pool$query73, 1);
          user = _yield$pool$query74[0];
          console.log(user);
          data = {
            store_id: process.env.SSL_STORE_ID,
            store_passwd: process.env.SSL_STORE_PASSWORD,
            total_amount: parseInt(totalAmount),
            currency: "BDT",
            tran_id: transactionId,
            tran_date: Date(),
            success_url: "https://flyfarladies-express-416405.appspot.com/api/v1/payment/ssl/success/2ndAnd3rdinstallment/".concat(transactionId, "/").concat(bookingid),
            fail_url: "https://flyfarladies-express-416405.appspot.com/api/v1/ssl/failure/".concat(transactionId),
            cancel_url: "https://flyfarladies-express-416405.appspot.com/api/v1/ssl/cancel/".concat(transactionId),
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
            value_a: "scfcc" || user[0].userid
          };
          insertQuery = "INSERT INTO ssl_commerz_entity (\n    tran_id,\n    value_b,\n    cus_name, cus_email, cus_phone,\n    total_amount, currency, status\n) VALUES (\n    ?, ?, ?, ?, ?, ?,\n    ?, ?\n)\n";
          paymentstatus = "unpaid";
          _context17.next = 28;
          return _db["default"].query(insertQuery, [transactionId, userid, data.cus_name, data.cus_email, data.cus_phone, data.total_amount, data.currency, paymentstatus]);
        case 28:
          sslcz = new _sslcommerzLts["default"](process.env.SSL_STORE_ID, process.env.SSL_STORE_PASSWORD, true);
          _context17.next = 31;
          return sslcz.init(data);
        case 31:
          apiResponse = _context17.sent;
          // await this.sslcommerzRepository.save(data)
          res.send(apiResponse);
        case 33:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function initwithssl2ndand3rdinstallment(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();
var sucess_ssl_2nd_3rd_installemntAmount = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var tran_id, bookingid, data, _yield$pool$query75, _yield$pool$query76, transactionRows, transaction, paymentstatus, firstInstallmentStatus, firstinstallmentpaiddate, secondInstallmentStatus, secondinstallmentpaiddate, bookingstatus, valuedata, updateBookingquery;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          tran_id = req.params.tran_id;
          bookingid = req.params.bookingid; // const uuid = req.params.id;
          data = req.body;
          console.log(req.body);

          // Assuming you have a sslcommerzRepository and UserRepository to handle database operations
          _context18.next = 6;
          return _db["default"].query('SELECT * FROM ssl_commerz_entity WHERE tran_id = ?', [tran_id]);
        case 6:
          _yield$pool$query75 = _context18.sent;
          _yield$pool$query76 = _slicedToArray(_yield$pool$query75, 1);
          transactionRows = _yield$pool$query76[0];
          transaction = transactionRows[0];
          if (transaction) {
            _context18.next = 12;
            break;
          }
          return _context18.abrupt("return", res.status(404).json({
            message: 'Transaction ID not found',
            error: true
          }));
        case 12:
          _context18.next = 14;
          return _db["default"].query('UPDATE ssl_commerz_entity SET paymentstatus = ?, store_amount = ?,  status =?, tran_date = ?, val_id = ?, bank_tran_id = ? WHERE tran_id = ?', ['VALIDATED', data.store_amount, data.status, data.tran_date, data.val_id, data.bank_tran_id, tran_id]);
        case 14:
          paymentstatus = payementStatus.PAID;
          firstInstallmentStatus = installmentStatus.COMPLETED;
          firstinstallmentpaiddate = new Date();
          secondInstallmentStatus = installmentStatus.COMPLETED;
          secondinstallmentpaiddate = new Date();
          bookingstatus = _bookingservice.bookingStatus.ISSUE_IN_PROCESS;
          valuedata = [paymentstatus, firstInstallmentStatus, firstinstallmentpaiddate, secondInstallmentStatus, secondinstallmentpaiddate, bookingstatus, bookingid];
          console.log(valuedata);
          updateBookingquery = "UPDATE booking SET paymentStatus = ?,  secondInstallmentStatus =?, \n  secondinstallmentpaidate=?, firstInstallmentStatus = ?,   firstinstallmentpaiddate = ?, bookingStatus=? WHERE bookingid= ? ";
          _context18.next = 25;
          return _db["default"].query(updateBookingquery, valuedata);
        case 25:
          return _context18.abrupt("return", res.redirect("https://flyfarladies.com/dashboard/congratulationmessage"));
        case 26:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return function sucess_ssl_2nd_3rd_installemntAmount(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();
var payemntService = exports.payemntService = {
  paywithwallet: paywithwallet,
  paybookingamount: paybookingamount,
  paySecondInstallment: paySecondInstallment,
  paythiredInstallment: paythiredInstallment,
  payFirstandSecondInstallment: payFirstandSecondInstallment,
  paySecondandthirdInstallment: paySecondandthirdInstallment,
  initwithsslfullamount: initwithsslfullamount,
  sucesssslfullamount: sucesssslfullamount,
  initwithsslbookingmoney: initwithsslbookingmoney,
  sucess_ssl_bookingAmount: sucess_ssl_bookingAmount,
  initwithssl1stinstallemnt: initwithssl1stinstallemnt,
  success_ssl_1stinstallemnt: success_ssl_1stinstallemnt,
  initwithssl2ndinstallemnt: initwithssl2ndinstallemnt,
  success_ssl_2ndinstallemnt: success_ssl_2ndinstallemnt,
  sucess_ssl_1st_and_2nd_booking_Amount: sucess_ssl_1st_and_2nd_booking_Amount,
  initwithssl1stAnd2ndinstallment: initwithssl1stAnd2ndinstallment,
  initwithssl2ndand3rdinstallment: initwithssl2ndand3rdinstallment,
  sucess_ssl_2nd_3rd_installemntAmount: sucess_ssl_2nd_3rd_installemntAmount
};