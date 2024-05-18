"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depositeService = void 0;
var _db = _interopRequireDefault(require("../database/db"));
var _imageHandler = require("../tourpackage/imageHandler");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
  return "FFLD" + Math.floor(Math.random() * 10000);
};

// Create Bank Deposit
var createBankDeposit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req) {
    var connection, _req$body, deposited_from, deposited_to, transaction_date, transaction_id, amount, requested_by, userquery, _yield$connection$que, _yield$connection$que2, user, image, tableName, status, deposit_id, date, remarks, value, _yield$connection$que3, _yield$connection$que4, results, options, formattedDate, transporter, htmltemplate, usermail, supportmail;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context.sent;
          _context.prev = 3;
          _req$body = req.body, deposited_from = _req$body.deposited_from, deposited_to = _req$body.deposited_to, transaction_date = _req$body.transaction_date, transaction_id = _req$body.transaction_id, amount = _req$body.amount;
          _context.next = 7;
          return connection.beginTransaction();
        case 7:
          // Begin a new database transaction
          requested_by = req.params.id;
          userquery = "SELECT * FROM user WHERE id =?";
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
          throw new Error("User not found");
        case 16:
          image = req.publicImageLink;
          tableName = "bank_transfer";
          status = "pending";
          console.log(tableName);
          if (!(amount < 0)) {
            _context.next = 22;
            break;
          }
          throw new Error("Please check your amount. Negative amount not accepted.");
        case 22:
          // Generate a UUID-like ID for the bank transfer
          deposit_id = generateDepoId();
          date = new Date(); // const formattedDate = transactionDate.toDateString();
          remarks = "Bank Deposit request from ".concat(deposited_from, " to ").concat(deposited_to, ", On ").concat(formattedDate, ".Your TRX ID is ").concat(transaction_id, " & amount ").concat(amount, " only");
          console.log(image);
          value = [deposit_id, deposited_from, deposited_to, transaction_date, status, transaction_id, amount, requested_by, image, remarks];
          _context.next = 29;
          return connection.query("INSERT INTO ".concat(tableName, " ( deposit_id, deposited_from, deposited_to, transaction_date, status, transaction_id, amount, requested_by, attachment,remarks) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?,?)"), value);
        case 29:
          _yield$connection$que3 = _context.sent;
          _yield$connection$que4 = _slicedToArray(_yield$connection$que3, 1);
          results = _yield$connection$que4[0];
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
          formattedDate = date.toLocaleString('en-BD', options);
          transporter = _nodemailer["default"].createTransport({
            host: 'b2b.flyfarint.com',
            // Replace with your email service provider's SMTP host
            port: 465,
            // Replace with your email service provider's SMTP port
            secure: true,
            // Use TLS for secure connection
            auth: {
              user: 'flyfarladies@mailservice.center',
              // Replace with your email address
              pass: 'YVWJCU.?UY^R' // Replace with your email password
            }
          });
          htmltemplate = "<!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\" />\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <title>Deposit Request</title>\n      </head>\n      <body>\n        <div style=\"width: 700px; height: 110vh; margin: 0 auto\">\n          <div style=\"width: 700px; height: 70px; background: #fe99a6\">\n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 700px;\n              \"\n            >\n              <tr>\n                <td\n                  align=\"center\"\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #ffffff;\n                    font-family: sans-serif;\n                    font-size: 15px;\n                    line-height: 38px;\n                    padding: 20px 0 20px 0;\n                    text-transform: uppercase;\n                    letter-spacing: 5px;\n                  \"\n                >\n                  Deposit Confirmation\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 700px;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    background-color: #efefef;\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #584660;\n                    font-family: sans-serif;\n                    font-size: 30px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 20px 40px 0px 55px;\n                  \"\n                >\n                  ".concat(amount, "\n                </td>\n              </tr>\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    background-color: #efefef;\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #bc6277;\n                    font-family: sans-serif;\n                    font-size: 17px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 0px 40px 20px 55px;\n                  \"\n                >\n                BANK\n                </td>\n              </tr>\n            </table>\n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 620px;\n                background-color: #ffffff;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #bc6277;\n                    font-family: sans-serif;\n                    font-size: 15px;\n                    font-weight: 600;\n                    line-height: 38px;\n                    padding: 10px 20px 5px 20px;\n                  \"\n                >\n                  Transaction Details\n                </td>\n              </tr>\n    \n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Transaction ID\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                ").concat(deposit_id, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  DepositFrom\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(deposited_from, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                DepositTo\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(deposited_to, "\n              </td>\n            </tr>\n\n            <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              Payment Status\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              ").concat(status, "\n            </td>\n          </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Transaction Date\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(transaction_date, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Requested BY\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(requested_by, "\n                </td>\n              </tr>\n\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                Transaction Date\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(transaction_date, "\n              </td>\n            </tr>\n            <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                Requested  At\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(formattedDate, "\n              </td>\n            </tr>\n\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 670px;\n                margin-top: 15px;\n                color: #ffffff !important;\n                text-decoration: none !important;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 600;\n                    font-style: italic;\n                  \"\n                >\n                  Please Wait a little while. Your money will be added to your\n                  wallet after verification is complete.\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 670px;\n                background-color: #702c8b;\n                margin-top: 25px;\n                text-align: center;\n                color: #ffffff !important;\n                text-decoration: none !important;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 16px;\n                    font-weight: 500;\n                    padding: 20px 20px 0px 20px;\n                  \"\n                >\n                  Need more help?\n                </td>\n              </tr>\n    \n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 12px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 0px 20px 10px 20px;\n                  \"\n                >\n                  Mail us at\n                  <span style=\"color: #ffffff !important; text-decoration: none\"\n                    >support@flyfarladies.com</span\n                  >\n                  or Call us at +88 01755582111\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"left\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 420px;\n                color: #ffffff;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 13px;\n                    font-weight: 600;\n                    padding: 20px 0px 0px 45px;\n                    color: #767676;\n                  \"\n                >\n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Terms & Conditions</a\n                  >\n    \n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Booking Policy</a\n                  >\n    \n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Privacy Policy</a\n                  >\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                width: 700px;\n                color: #ffffff;\n                margin-top: 85px;\n              \"\n            >\n              <tr>\n                <td style=\"padding-left: 45px\">\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png\"\n                    href=\"https://www.facebook.com/flyfarladies/?ref=page_internal\"\n                    alt=\"\"\n                  />\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png\"\n                    href=\"https://www.linkedin.com/company/fly-far-ladies/\"\n                    alt=\"\"\n                  />\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png\"\n                    href=\"https://wa.me/+88 01755582111\"\n                    alt=\"\"\n                  />\n                </td>\n              </tr>\n    \n              <tr>\n                <td\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 13px;\n                    font-weight: 500;\n                    padding: 5px 0px 0px 45px;\n                    color: #767676;\n                    padding-bottom: 2px;\n                  \"\n                >\n                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.\n                </td>\n    \n                <td\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-weight: 500;\n                    color: #767676;\n                    padding-bottom: 20px;\n                  \"\n                >\n                  <img\n                    width=\"100px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png\"\n                    href=\"https://www.flyfarladies.com/\"\n                    alt=\"\"\n                  />\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n      </body>\n    </html>\n    ");
          usermail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          supportmail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          _context.next = 40;
          return transporter.sendMail(usermail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 40:
          _context.next = 42;
          return transporter.sendMail(supportmail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 42:
          console.log(value);
          _context.next = 45;
          return connection.commit();
        case 45:
          // Commit the transaction when the query is successful
          connection.release();
          return _context.abrupt("return", results);
        case 49:
          _context.prev = 49;
          _context.t0 = _context["catch"](3);
          _context.next = 53;
          return connection.rollback();
        case 53:
          _context.next = 55;
          return (0, _imageHandler.deleteImageFromURL)(req.publicImageLink);
        case 55:
          connection.release();
          throw _context.t0;
        case 57:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 49]]);
  }));
  return function createBankDeposit(_x) {
    return _ref.apply(this, arguments);
  };
}();
var ApprovedBankDeposit = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req) {
    var connection, deposit_id, action_by, depositQuery, _yield$pool$query, _yield$pool$query2, result, amount, updateQuery, status, values, remarks, updateUserWalletQuery, user_id, userquery, _yield$connection$exe, _yield$connection$exe2, updatewallet, _yield$pool$query3, _yield$pool$query4, user, ledgerquery, ledger, date, options, approvedAt, transporter, htmltemplate, usermail, supportmail;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context2.sent;
          _context2.prev = 3;
          deposit_id = req.params.deposit_id;
          if (!(deposit_id.length == 0)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.send({
            status: false,
            message: "deposit not found"
          }));
        case 7:
          action_by = req.body.action_by;
          depositQuery = "SELECT * FROM bank_transfer WHERE deposit_id = ?";
          _context2.next = 11;
          return _db["default"].query(depositQuery, [deposit_id]);
        case 11:
          _yield$pool$query = _context2.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          result = _yield$pool$query2[0];
          amount = result[0].amount;
          updateQuery = "\n    UPDATE bank_transfer\n    SET status = ?,\n    action_by = ?\n    WHERE deposit_id = ?\n  ";
          status = "approved";
          values = [status, action_by, deposit_id];
          remarks = "Bank Deposit request approved from ".concat(result[0].deposited_from, " to ").concat(result[0].deposited_to, ", On ").concat(result[0].transaction_date, ".TRX ID is ").concat(result[0].transaction_id, " & amount ").concat(result[0].amount, " only");
          _context2.next = 21;
          return _db["default"].query(updateQuery, values);
        case 21:
          _context2.next = 23;
          return connection.beginTransaction();
        case 23:
          // If the status is 'approved', update  the user wallet
          updateUserWalletQuery = "UPDATE user SET wallet = wallet+? WHERE id = ?";
          user_id = result[0].requested_by;
          userquery = "SELECT * FROM user WHERE id =?";
          _context2.next = 28;
          return connection.execute(updateUserWalletQuery, [amount, user_id]);
        case 28:
          _yield$connection$exe = _context2.sent;
          _yield$connection$exe2 = _slicedToArray(_yield$connection$exe, 1);
          updatewallet = _yield$connection$exe2[0];
          _context2.next = 33;
          return _db["default"].query(userquery, [user_id]);
        case 33:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          user = _yield$pool$query4[0];
          ledgerquery = "INSERT INTO ledger(user_id, purchase, lastBalance, actionBy, remarks) VALUES (?, ?, ?, ?, ?)";
          _context2.next = 39;
          return connection.execute(ledgerquery, [result[0].requested_by, result[0].amount, user[0].wallet, action_by, remarks]);
        case 39:
          ledger = _context2.sent;
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
          transporter = _nodemailer["default"].createTransport({
            host: 'b2b.flyfarint.com',
            // Replace with your email service provider's SMTP host
            port: 465,
            // Replace with your email service provider's SMTP port
            secure: true,
            // Use TLS for secure connection
            auth: {
              user: 'flyfarladies@mailservice.center',
              // Replace with your email address
              pass: 'YVWJCU.?UY^R' // Replace with your email password
            }
          });
          htmltemplate = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Deposit Request</title>\n  </head>\n  <body>\n    <div style=\"width: 700px; height: 110vh; margin: 0 auto\">\n      <div style=\"width: 700px; height: 70px; background: #fe99a6\">\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 700px;\n          \"\n        >\n          <tr>\n            <td\n              align=\"center\"\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #ffffff;\n                font-family: sans-serif;\n                font-size: 15px;\n                line-height: 38px;\n                padding: 20px 0 20px 0;\n                text-transform: uppercase;\n                letter-spacing: 5px;\n              \"\n            >\n              ".concat(status, "\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 700px;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                background-color: #efefef;\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #584660;\n                font-family: sans-serif;\n                font-size: 30px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 20px 40px 0px 55px;\n              \"\n            >\n              ").concat(result[0].amount, "\n            </td>\n          </tr>\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                background-color: #efefef;\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #bc6277;\n                font-family: sans-serif;\n                font-size: 17px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 0px 40px 20px 55px;\n              \"\n            >\n              BANK\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 620px;\n            background-color: #ffffff;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #bc6277;\n                font-family: sans-serif;\n                font-size: 15px;\n                font-weight: 600;\n                line-height: 38px;\n                padding: 10px 20px 5px 20px;\n              \"\n            >\n              Transaction Details\n            </td>\n          </tr>\n\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              Trasaction ID\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n            ").concat(result[0].deposit_id, "\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              DepositFrom\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              ").concat(result[0].deposited_from, "\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n              width: 180px;\n            \"\n          >\n            Approved At\n          </td>\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n            \"\n          >\n            ").concat(approvedAt, "\n          </td>\n        </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n              width: 180px;\n            \"\n          >\n            DepositTo\n          </td>\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n            \"\n          >\n            ").concat(result[0].deposited_to, "\n          </td>\n        </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              Transaction Date\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              ").concat(result[0].transaction_date, "\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              DepositType\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              BANK\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 670px;\n            margin-top: 15px;\n            color: #ffffff !important;\n            text-decoration: none !important;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 600;\n                font-style: italic;\n              \"\n            >\n              Please Wait a little while. Your money will be added to your\n              wallet after verification is complete.\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 670px;\n            background-color: #702c8b;\n            margin-top: 25px;\n            text-align: center;\n            color: #ffffff !important;\n            text-decoration: none !important;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 16px;\n                font-weight: 500;\n                padding: 20px 20px 0px 20px;\n              \"\n            >\n              Need more help?\n            </td>\n          </tr>\n\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 12px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 0px 20px 10px 20px;\n              \"\n            >\n              Mail us at\n              <span style=\"color: #ffffff !important; text-decoration: none\"\n                >support@flyfarladies.com</span\n              >\n              or Call us at +88 01755582111\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"left\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 420px;\n            color: #ffffff;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 13px;\n                font-weight: 600;\n                padding: 20px 0px 0px 45px;\n                color: #767676;\n              \"\n            >\n              <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                >Terms & Conditions</a\n              >\n\n              <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                >Booking Policy</a\n              >\n\n              <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                >Privacy Policy</a\n              >\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            width: 700px;\n            color: #ffffff;\n            margin-top: 85px;\n          \"\n        >\n          <tr>\n            <td style=\"padding-left: 45px\">\n              <img\n                style=\"padding-right: 5px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png\"\n                href=\"https://www.facebook.com/flyfarladies/?ref=page_internal\"\n                alt=\"\"\n              />\n              <img\n                style=\"padding-right: 5px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png\"\n                href=\"https://www.linkedin.com/company/fly-far-ladies/\"\n                alt=\"\"\n              />\n              <img\n                style=\"padding-right: 5px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png\"\n                href=\"https://wa.me/+88 01755582111\"\n                alt=\"\"\n              />\n            </td>\n          </tr>\n\n          <tr>\n            <td\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 13px;\n                font-weight: 500;\n                padding: 5px 0px 0px 45px;\n                color: #767676;\n                padding-bottom: 2px;\n              \"\n            >\n              Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.\n            </td>\n\n            <td\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-weight: 500;\n                color: #767676;\n                padding-bottom: 20px;\n              \"\n            >\n              <img\n                width=\"100px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png\"\n                href=\"https://www.flyfarladies.com/\"\n                alt=\"\"\n              />\n            </td>\n          </tr>\n        </table>\n      </div>\n    </div>\n  </body>\n</html>\n");
          usermail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          supportmail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: 'support@flyfarladies.com',
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          _context2.next = 49;
          return transporter.sendMail(usermail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 49:
          _context2.next = 51;
          return transporter.sendMail(supportmail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 51:
          _context2.next = 53;
          return connection.commit();
        case 53:
          _context2.next = 58;
          break;
        case 55:
          _context2.prev = 55;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0);
        case 58:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 55]]);
  }));
  return function ApprovedBankDeposit(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var RejectBankDeposit = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req) {
    var connection, deposit_id, _req$body2, action_by, rejected_reason, depositQuery, _yield$pool$query5, _yield$pool$query6, result, amount, updateQuery, status, values, _yield$pool$query7, _yield$pool$query8, data, user_id, userquery, _yield$pool$query9, _yield$pool$query10, user, date, options, approvedAt, transporter, htmltemplate, usermail, supportmail;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context3.sent;
          _context3.prev = 3;
          deposit_id = req.params.deposit_id;
          _req$body2 = req.body, action_by = _req$body2.action_by, rejected_reason = _req$body2.rejected_reason;
          depositQuery = "SELECT * FROM bank_transfer WHERE deposit_id = ?";
          _context3.next = 9;
          return _db["default"].query(depositQuery, [deposit_id]);
        case 9:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = _slicedToArray(_yield$pool$query5, 1);
          result = _yield$pool$query6[0];
          amount = result[0].amount;
          updateQuery = "\n    UPDATE bank_transfer\n    SET status = ?,\n    action_by = ?,\n    rejected_reason=?\n    WHERE deposit_id = ?\n  ";
          status = "rejected";
          values = [status, action_by, rejected_reason, deposit_id];
          console.log(values);
          _context3.next = 19;
          return _db["default"].query(updateQuery, values);
        case 19:
          _yield$pool$query7 = _context3.sent;
          _yield$pool$query8 = _slicedToArray(_yield$pool$query7, 1);
          data = _yield$pool$query8[0];
          // If the status is 'approved', update  the user wallet
          user_id = result[0].requested_by;
          userquery = "SELECT * FROM user WHERE id =?";
          _context3.next = 26;
          return _db["default"].query(userquery, [user_id]);
        case 26:
          _yield$pool$query9 = _context3.sent;
          _yield$pool$query10 = _slicedToArray(_yield$pool$query9, 1);
          user = _yield$pool$query10[0];
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
          transporter = _nodemailer["default"].createTransport({
            host: 'b2b.flyfarint.com',
            // Replace with your email service provider's SMTP host
            port: 465,
            // Replace with your email service provider's SMTP port
            secure: true,
            // Use TLS for secure connection
            auth: {
              user: 'flyfarladies@mailservice.center',
              // Replace with your email address
              pass: 'YVWJCU.?UY^R' // Replace with your email password
            }
          });
          htmltemplate = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Deposit Request</title>\n  </head>\n  <body>\n    <div style=\"width: 700px; height: 110vh; margin: 0 auto\">\n      <div style=\"width: 700px; height: 70px; background: #fe99a6\">\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 700px;\n          \"\n        >\n          <tr>\n            <td\n              align=\"center\"\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #ffffff;\n                font-family: sans-serif;\n                font-size: 15px;\n                line-height: 38px;\n                padding: 20px 0 20px 0;\n                text-transform: uppercase;\n                letter-spacing: 5px;\n              \"\n            >\n              ".concat(status, "\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 700px;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                background-color: #efefef;\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #584660;\n                font-family: sans-serif;\n                font-size: 30px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 20px 40px 0px 55px;\n              \"\n            >\n              ").concat(result[0].amount, "\n            </td>\n          </tr>\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                background-color: #efefef;\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #bc6277;\n                font-family: sans-serif;\n                font-size: 17px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 0px 40px 20px 55px;\n              \"\n            >\n              BANK\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 620px;\n            background-color: #ffffff;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #bc6277;\n                font-family: sans-serif;\n                font-size: 15px;\n                font-weight: 600;\n                line-height: 38px;\n                padding: 10px 20px 5px 20px;\n              \"\n            >\n              Transaction Details\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n              width: 180px;\n            \"\n          >\n            Rejection Reason\n          </td>\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n            \"\n          >\n          ").concat(rejected_reason, "\n          </td>\n        </tr>\n\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              Trasaction ID\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n            ").concat(result[0].deposit_id, "\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              DepositFrom\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              ").concat(result[0].deposited_from, "\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n              width: 180px;\n            \"\n          >\n            Approved At\n          </td>\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n            \"\n          >\n            ").concat(approvedAt, "\n          </td>\n        </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n              width: 180px;\n            \"\n          >\n            DepositTo\n          </td>\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n            \"\n          >\n            ").concat(result[0].deposited_to, "\n          </td>\n        </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              Transaction Date\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              ").concat(result[0].transaction_date, "\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              DepositType\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              BANK\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 670px;\n            margin-top: 15px;\n            color: #ffffff !important;\n            text-decoration: none !important;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 600;\n                font-style: italic;\n              \"\n            >\n              Please Wait a little while. Your money will be added to your\n              wallet after verification is complete.\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 670px;\n            background-color: #702c8b;\n            margin-top: 25px;\n            text-align: center;\n            color: #ffffff !important;\n            text-decoration: none !important;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 16px;\n                font-weight: 500;\n                padding: 20px 20px 0px 20px;\n              \"\n            >\n              Need more help?\n            </td>\n          </tr>\n\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 12px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 0px 20px 10px 20px;\n              \"\n            >\n              Mail us at\n              <span style=\"color: #ffffff !important; text-decoration: none\"\n                >support@flyfarladies.com</span\n              >\n              or Call us at +88 01755582111\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"left\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 420px;\n            color: #ffffff;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 13px;\n                font-weight: 600;\n                padding: 20px 0px 0px 45px;\n                color: #767676;\n              \"\n            >\n              <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                >Terms & Conditions</a\n              >\n\n              <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                >Booking Policy</a\n              >\n\n              <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                >Privacy Policy</a\n              >\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            width: 700px;\n            color: #ffffff;\n            margin-top: 85px;\n          \"\n        >\n          <tr>\n            <td style=\"padding-left: 45px\">\n              <img\n                style=\"padding-right: 5px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png\"\n                href=\"https://www.facebook.com/flyfarladies/?ref=page_internal\"\n                alt=\"\"\n              />\n              <img\n                style=\"padding-right: 5px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png\"\n                href=\"https://www.linkedin.com/company/fly-far-ladies/\"\n                alt=\"\"\n              />\n              <img\n                style=\"padding-right: 5px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png\"\n                href=\"https://wa.me/+88 01755582111\"\n                alt=\"\"\n              />\n            </td>\n          </tr>\n\n          <tr>\n            <td\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 13px;\n                font-weight: 500;\n                padding: 5px 0px 0px 45px;\n                color: #767676;\n                padding-bottom: 2px;\n              \"\n            >\n              Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.\n            </td>\n\n            <td\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-weight: 500;\n                color: #767676;\n                padding-bottom: 20px;\n              \"\n            >\n              <img\n                width=\"100px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png\"\n                href=\"https://www.flyfarladies.com/\"\n                alt=\"\"\n              />\n            </td>\n          </tr>\n        </table>\n      </div>\n    </div>\n  </body>\n</html>\n");
          usermail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          supportmail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: 'support@flyfarladies.com',
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          _context3.next = 38;
          return transporter.sendMail(usermail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 38:
          _context3.next = 40;
          return transporter.sendMail(supportmail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 40:
          _context3.next = 42;
          return connection.commit();
        case 42:
          return _context3.abrupt("return", ksocjocj);
        case 45:
          _context3.prev = 45;
          _context3.t0 = _context3["catch"](3);
          console.log(_context3.t0);
        case 48:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 45]]);
  }));
  return function RejectBankDeposit(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var createCheckDeposit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req) {
    var connection, _req$body3, cheque_number, bank_name, cheque_date, reference, amount, depositType, requested_by, image, tableName, userquery, _yield$connection$que5, _yield$connection$que6, user, deposit_id, transactionDate, status, formattedDate, remarks, value, _yield$connection$que7, _yield$connection$que8, results, transporter, htmltemplate, usermail, supportmail;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context4.sent;
          _context4.prev = 3;
          _req$body3 = req.body, cheque_number = _req$body3.cheque_number, bank_name = _req$body3.bank_name, cheque_date = _req$body3.cheque_date, reference = _req$body3.reference, amount = _req$body3.amount, depositType = _req$body3.depositType;
          _context4.next = 7;
          return connection.beginTransaction();
        case 7:
          // Begin a new database transaction
          requested_by = req.params.id;
          image = req.publicImageLink;
          tableName = "cheque_deposit";
          userquery = "SELECT * FROM user WHERE id =? ";
          _context4.next = 13;
          return connection.query(userquery, [requested_by]);
        case 13:
          _yield$connection$que5 = _context4.sent;
          _yield$connection$que6 = _slicedToArray(_yield$connection$que5, 1);
          user = _yield$connection$que6[0];
          if (!(user.length === 0)) {
            _context4.next = 18;
            break;
          }
          throw new Error("User not found");
        case 18:
          console.log(tableName);
          if (!(amount < 0)) {
            _context4.next = 21;
            break;
          }
          throw new Error("Please check your amount. Negative amount not accepted.");
        case 21:
          // Generate a UUID-like ID for the bank transfer
          deposit_id = generateDepoId();
          transactionDate = new Date(cheque_date);
          status = "pending";
          formattedDate = transactionDate.toDateString();
          remarks = "Cheque Deposit request from ".concat(cheque_number, " to ").concat(bank_name, " amount of ").concat(amount, "deposited on ").concat(formattedDate);
          value = [deposit_id, cheque_number, status, bank_name, amount, image, requested_by, cheque_date, remarks, reference];
          _context4.next = 29;
          return connection.query("INSERT INTO cheque_deposit (deposit_id, cheque_number, status,bank_name, amount, attachment, requested_by, cheque_date,remarks,reference) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?)", value);
        case 29:
          _yield$connection$que7 = _context4.sent;
          _yield$connection$que8 = _slicedToArray(_yield$connection$que7, 1);
          results = _yield$connection$que8[0];
          transporter = _nodemailer["default"].createTransport({
            host: 'b2b.flyfarint.com',
            // Replace with your email service provider's SMTP host
            port: 465,
            // Replace with your email service provider's SMTP port
            secure: true,
            // Use TLS for secure connection
            auth: {
              user: 'flyfarladies@mailservice.center',
              // Replace with your email address
              pass: 'YVWJCU.?UY^R' // Replace with your email password
            }
          });
          htmltemplate = "<!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\" />\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <title>Deposit Request</title>\n      </head>\n      <body>\n        <div style=\"width: 700px; height: 110vh; margin: 0 auto\">\n          <div style=\"width: 700px; height: 70px; background: #fe99a6\">\n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 700px;\n              \"\n            >\n              <tr>\n                <td\n                  align=\"center\"\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #ffffff;\n                    font-family: sans-serif;\n                    font-size: 15px;\n                    line-height: 38px;\n                    padding: 20px 0 20px 0;\n                    text-transform: uppercase;\n                    letter-spacing: 5px;\n                  \"\n                >\n                  Deposit Confirmation\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 700px;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    background-color: #efefef;\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #584660;\n                    font-family: sans-serif;\n                    font-size: 30px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 20px 40px 0px 55px;\n                  \"\n                >\n                  ".concat(amount, "\n                </td>\n              </tr>\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    background-color: #efefef;\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #bc6277;\n                    font-family: sans-serif;\n                    font-size: 17px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 0px 40px 20px 55px;\n                  \"\n                >\n                CHEQUE\n                </td>\n              </tr>\n            </table>\n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 620px;\n                background-color: #ffffff;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #bc6277;\n                    font-family: sans-serif;\n                    font-size: 15px;\n                    font-weight: 600;\n                    line-height: 38px;\n                    padding: 10px 20px 5px 20px;\n                  \"\n                >\n                  Transaction Details\n                </td>\n              </tr>\n    \n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Transaction ID\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                ").concat(deposit_id, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Bank Name\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(bank_name, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                Cheque Number\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(cheque_number, "\n              </td>\n            </tr>\n\n            <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              Payment Status\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              ").concat(status, "\n            </td>\n          </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Transaction Date\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(cheque_date, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Requested BY\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(requested_by, "\n                </td>\n              </tr>\n\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                Reference\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(reference, "\n              </td>\n            </tr>\n            <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                Requested At\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(formattedDate, "\n              </td>\n            </tr>\n\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 670px;\n                margin-top: 15px;\n                color: #ffffff !important;\n                text-decoration: none !important;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 600;\n                    font-style: italic;\n                  \"\n                >\n                  Please Wait a little while. Your money will be added to your\n                  wallet after verification is complete.\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 670px;\n                background-color: #702c8b;\n                margin-top: 25px;\n                text-align: center;\n                color: #ffffff !important;\n                text-decoration: none !important;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 16px;\n                    font-weight: 500;\n                    padding: 20px 20px 0px 20px;\n                  \"\n                >\n                  Need more help?\n                </td>\n              </tr>\n    \n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 12px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 0px 20px 10px 20px;\n                  \"\n                >\n                  Mail us at\n                  <span style=\"color: #ffffff !important; text-decoration: none\"\n                    >support@flyfarladies.com</span\n                  >\n                  or Call us at +88 01755582111\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"left\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 420px;\n                color: #ffffff;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 13px;\n                    font-weight: 600;\n                    padding: 20px 0px 0px 45px;\n                    color: #767676;\n                  \"\n                >\n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Terms & Conditions</a\n                  >\n    \n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Booking Policy</a\n                  >\n    \n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Privacy Policy</a\n                  >\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                width: 700px;\n                color: #ffffff;\n                margin-top: 85px;\n              \"\n            >\n              <tr>\n                <td style=\"padding-left: 45px\">\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png\"\n                    href=\"https://www.facebook.com/flyfarladies/?ref=page_internal\"\n                    alt=\"\"\n                  />\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png\"\n                    href=\"https://www.linkedin.com/company/fly-far-ladies/\"\n                    alt=\"\"\n                  />\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png\"\n                    href=\"https://wa.me/+88 01755582111\"\n                    alt=\"\"\n                  />\n                </td>\n              </tr>\n    \n              <tr>\n                <td\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 13px;\n                    font-weight: 500;\n                    padding: 5px 0px 0px 45px;\n                    color: #767676;\n                    padding-bottom: 2px;\n                  \"\n                >\n                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.\n                </td>\n    \n                <td\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-weight: 500;\n                    color: #767676;\n                    padding-bottom: 20px;\n                  \"\n                >\n                  <img\n                    width=\"100px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png\"\n                    href=\"https://www.flyfarladies.com/\"\n                    alt=\"\"\n                  />\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n      </body>\n    </html>\n    ");
          usermail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          supportmail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: 'support@flyfarladies.com',
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          _context4.next = 38;
          return transporter.sendMail(usermail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 38:
          _context4.next = 40;
          return transporter.sendMail(supportmail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 40:
          _context4.next = 42;
          return connection.commit();
        case 42:
          // Commit the transaction when the query is successful
          connection.release();
          return _context4.abrupt("return", results);
        case 46:
          _context4.prev = 46;
          _context4.t0 = _context4["catch"](3);
          _context4.next = 50;
          return connection.rollback();
        case 50:
          // Rollback the transaction in case of an error
          (0, _imageHandler.deleteImageFromURL)(req.publicImageLink);
          connection.release();
          throw _context4.t0;
        case 53:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 46]]);
  }));
  return function createCheckDeposit(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var ApprovedCheckDeposit = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req) {
    var connection, deposit_id, action_by, updateQuery, status, values, getamount, _yield$connection$exe3, _yield$connection$exe4, result, amount, updateUserWalletQuery, user_id, _yield$connection$exe5, _yield$connection$exe6, _ksocjocj, date, options, approvedAt, userquery, _yield$pool$query11, _yield$pool$query12, user, remarks, ledgerquery, ledger, transporter, htmltemplate, usermail, supportmail;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context5.sent;
          _context5.prev = 3;
          deposit_id = req.params.deposit_id;
          action_by = req.body.action_by;
          updateQuery = "\n    UPDATE cheque_deposit\n    SET status = ?,\n    action_by = ?\n    WHERE deposit_id = ?\n  ";
          status = "approved";
          values = [status, action_by, deposit_id];
          _context5.next = 11;
          return connection.execute(updateQuery, values);
        case 11:
          getamount = "SELECT * FROM cheque_deposit WHERE deposit_id = ?";
          _context5.next = 14;
          return connection.beginTransaction();
        case 14:
          _context5.next = 16;
          return connection.execute(getamount, [deposit_id]);
        case 16:
          _yield$connection$exe3 = _context5.sent;
          _yield$connection$exe4 = _slicedToArray(_yield$connection$exe3, 1);
          result = _yield$connection$exe4[0];
          amount = parseInt(result[0].amount); // If the status is 'approved', update  the user wallet
          updateUserWalletQuery = "UPDATE user SET wallet = IFNULL(wallet, 0) + ? WHERE id = ?";
          user_id = result[0].requested_by;
          _context5.next = 24;
          return connection.execute(updateUserWalletQuery, [amount, user_id]);
        case 24:
          _yield$connection$exe5 = _context5.sent;
          _yield$connection$exe6 = _slicedToArray(_yield$connection$exe5, 1);
          _ksocjocj = _yield$connection$exe6[0];
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
          userquery = "SELECT * FROM user WHERE id=?";
          _context5.next = 33;
          return _db["default"].query(userquery, user_id);
        case 33:
          _yield$pool$query11 = _context5.sent;
          _yield$pool$query12 = _slicedToArray(_yield$pool$query11, 1);
          user = _yield$pool$query12[0];
          remarks = "Mobile Deposit request from ".concat(result[0].accountNumber, ",Reference ").concat(result[0].reference, ", On ").concat(result[0].requestDate, " and  Transaction ID is ").concat(result[0].transactionID, " & amount ").concat(result[0].amount, " only.This action had taken by ").concat(action_by);
          ledgerquery = "INSERT INTO ledger(user_id, purchase, lastBalance, actionBy, remarks, createdAt) VALUES (?,?, ?, ?, ?, ?)";
          _context5.next = 40;
          return connection.execute(ledgerquery, [result[0].requested_by, result[0].amount, user[0].wallet, action_by, remarks, approvedAt]);
        case 40:
          ledger = _context5.sent;
          transporter = _nodemailer["default"].createTransport({
            host: 'b2b.flyfarint.com',
            // Replace with your email service provider's SMTP host
            port: 465,
            // Replace with your email service provider's SMTP port
            secure: true,
            // Use TLS for secure connection
            auth: {
              user: 'flyfarladies@mailservice.center',
              // Replace with your email address
              pass: 'YVWJCU.?UY^R' // Replace with your email password
            }
          });
          htmltemplate = "<!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\" />\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <title>Deposit Request</title>\n      </head>\n      <body>\n        <div style=\"width: 700px; height: 110vh; margin: 0 auto\">\n          <div style=\"width: 700px; height: 70px; background: #fe99a6\">\n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 700px;\n              \"\n            >\n              <tr>\n                <td\n                  align=\"center\"\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #ffffff;\n                    font-family: sans-serif;\n                    font-size: 15px;\n                    line-height: 38px;\n                    padding: 20px 0 20px 0;\n                    text-transform: uppercase;\n                    letter-spacing: 5px;\n                  \"\n                >\n                  ".concat(status, "\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 700px;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    background-color: #efefef;\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #584660;\n                    font-family: sans-serif;\n                    font-size: 30px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 20px 40px 0px 55px;\n                  \"\n                >\n                  ").concat(result[0].amount, "\n                </td>\n              </tr>\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    background-color: #efefef;\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #bc6277;\n                    font-family: sans-serif;\n                    font-size: 17px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 0px 40px 20px 55px;\n                  \"\n                >\n                  CHEQUE\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 620px;\n                background-color: #ffffff;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #bc6277;\n                    font-family: sans-serif;\n                    font-size: 15px;\n                    font-weight: 600;\n                    line-height: 38px;\n                    padding: 10px 20px 5px 20px;\n                  \"\n                >\n                  Transaction Details\n                </td>\n              </tr>\n    \n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Trasaction ID\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                ").concat(result[0].deposit_id, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                cheque_number\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(result[0].cheque_number, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                Approved At\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(approvedAt, "\n              </td>\n            </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                DepositTo\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(result[0].bank_name, "\n              </td>\n            </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Transaction Date\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(result[0].cheque_date, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  DepositType\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                    CHEQUE\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 670px;\n                margin-top: 15px;\n                color: #ffffff !important;\n                text-decoration: none !important;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 600;\n                    font-style: italic;\n                  \"\n                >\n                  Please Wait a little while. Your money will be added to your\n                  wallet after verification is complete.\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 670px;\n                background-color: #702c8b;\n                margin-top: 25px;\n                text-align: center;\n                color: #ffffff !important;\n                text-decoration: none !important;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 16px;\n                    font-weight: 500;\n                    padding: 20px 20px 0px 20px;\n                  \"\n                >\n                  Need more help?\n                </td>\n              </tr>\n    \n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 12px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 0px 20px 10px 20px;\n                  \"\n                >\n                  Mail us at\n                  <span style=\"color: #ffffff !important; text-decoration: none\"\n                    >support@flyfarladies.com</span\n                  >\n                  or Call us at +88 01755582111\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"left\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 420px;\n                color: #ffffff;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 13px;\n                    font-weight: 600;\n                    padding: 20px 0px 0px 45px;\n                    color: #767676;\n                  \"\n                >\n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Terms & Conditions</a\n                  >\n    \n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Booking Policy</a\n                  >\n    \n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Privacy Policy</a\n                  >\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                width: 700px;\n                color: #ffffff;\n                margin-top: 85px;\n              \"\n            >\n              <tr>\n                <td style=\"padding-left: 45px\">\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png\"\n                    href=\"https://www.facebook.com/flyfarladies/?ref=page_internal\"\n                    alt=\"\"\n                  />\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png\"\n                    href=\"https://www.linkedin.com/company/fly-far-ladies/\"\n                    alt=\"\"\n                  />\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png\"\n                    href=\"https://wa.me/+88 01755582111\"\n                    alt=\"\"\n                  />\n                </td>\n              </tr>\n    \n              <tr>\n                <td\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 13px;\n                    font-weight: 500;\n                    padding: 5px 0px 0px 45px;\n                    color: #767676;\n                    padding-bottom: 2px;\n                  \"\n                >\n                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.\n                </td>\n    \n                <td\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-weight: 500;\n                    color: #767676;\n                    padding-bottom: 20px;\n                  \"\n                >\n                  <img\n                    width=\"100px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png\"\n                    href=\"https://www.flyfarladies.com/\"\n                    alt=\"\"\n                  />\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n      </body>\n    </html>\n    ");
          usermail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          supportmail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: 'support@flyfarladies.com',
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          _context5.next = 47;
          return transporter.sendMail(usermail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 47:
          _context5.next = 49;
          return transporter.sendMail(supportmail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 49:
          _context5.next = 51;
          return connection.commit();
        case 51:
          _context5.next = 56;
          break;
        case 53:
          _context5.prev = 53;
          _context5.t0 = _context5["catch"](3);
          console.log(_context5.t0);
        case 56:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 53]]);
  }));
  return function ApprovedCheckDeposit(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
var RejectChequeDeposit = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req) {
    var connection, deposit_id, _req$body4, action_by, rejected_reason, depositQuery, _yield$pool$query13, _yield$pool$query14, result, updateQuery, status, values, _yield$pool$query15, _yield$pool$query16, data, user_id, userquery, _yield$pool$query17, _yield$pool$query18, user, date, options, approvedAt, transporter, htmltemplate, usermail, supportmail;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context6.sent;
          _context6.prev = 3;
          deposit_id = req.params.deposit_id;
          _req$body4 = req.body, action_by = _req$body4.action_by, rejected_reason = _req$body4.rejected_reason;
          depositQuery = "SELECT * FROM cheque_deposit WHERE deposit_id = ?";
          _context6.next = 9;
          return _db["default"].query(depositQuery, [deposit_id]);
        case 9:
          _yield$pool$query13 = _context6.sent;
          _yield$pool$query14 = _slicedToArray(_yield$pool$query13, 1);
          result = _yield$pool$query14[0];
          updateQuery = "\n    UPDATE cheque_deposit\n    SET status = ?,\n    action_by = ?,\n    rejected_reason=?\n    WHERE deposit_id = ?\n  ";
          status = "rejected";
          values = [status, action_by, rejected_reason, deposit_id];
          console.log(values);
          _context6.next = 18;
          return _db["default"].query(updateQuery, values);
        case 18:
          _yield$pool$query15 = _context6.sent;
          _yield$pool$query16 = _slicedToArray(_yield$pool$query15, 1);
          data = _yield$pool$query16[0];
          user_id = result[0].requested_by;
          userquery = "SELECT * FROM user WHERE id =?";
          _context6.next = 25;
          return _db["default"].query(userquery, [user_id]);
        case 25:
          _yield$pool$query17 = _context6.sent;
          _yield$pool$query18 = _slicedToArray(_yield$pool$query17, 1);
          user = _yield$pool$query18[0];
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
          transporter = _nodemailer["default"].createTransport({
            host: 'b2b.flyfarint.com',
            // Replace with your email service provider's SMTP host
            port: 465,
            // Replace with your email service provider's SMTP port
            secure: true,
            // Use TLS for secure connection
            auth: {
              user: 'flyfarladies@mailservice.center',
              // Replace with your email address
              pass: 'YVWJCU.?UY^R' // Replace with your email password
            }
          });
          htmltemplate = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Deposit Request</title>\n  </head>\n  <body>\n    <div style=\"width: 700px; height: 110vh; margin: 0 auto\">\n      <div style=\"width: 700px; height: 70px; background: #fe99a6\">\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 700px;\n          \"\n        >\n          <tr>\n            <td\n              align=\"center\"\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #ffffff;\n                font-family: sans-serif;\n                font-size: 15px;\n                line-height: 38px;\n                padding: 20px 0 20px 0;\n                text-transform: uppercase;\n                letter-spacing: 5px;\n              \"\n            >\n              ".concat(status, "\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 700px;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                background-color: #efefef;\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #584660;\n                font-family: sans-serif;\n                font-size: 30px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 20px 40px 0px 55px;\n              \"\n            >\n              ").concat(result[0].amount, "\n            </td>\n          </tr>\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                background-color: #efefef;\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #bc6277;\n                font-family: sans-serif;\n                font-size: 17px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 0px 40px 20px 55px;\n              \"\n            >\n              CHEQUE\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 620px;\n            background-color: #ffffff;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #bc6277;\n                font-family: sans-serif;\n                font-size: 15px;\n                font-weight: 600;\n                line-height: 38px;\n                padding: 10px 20px 5px 20px;\n              \"\n            >\n              Transaction Details\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n              width: 180px;\n            \"\n          >\n            Rejection Reason\n          </td>\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n            \"\n          >\n          ").concat(rejected_reason, "\n          </td>\n        </tr>\n\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              Trasaction ID\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n            ").concat(result[0].deposit_id, "\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              Cheque Number\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              ").concat(result[0].cheque_number, "\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n              width: 180px;\n            \"\n          >\n            Approved At\n          </td>\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n            \"\n          >\n            ").concat(approvedAt, "\n          </td>\n        </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n              width: 180px;\n            \"\n          >\n            Bank Name\n          </td>\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n            \"\n          >\n            ").concat(result[0].bank_name, "\n          </td>\n        </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              Cheque Date \n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              ").concat(result[0].cheque_date, "\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              DepositType\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              CHEQUE\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 670px;\n            margin-top: 15px;\n            color: #ffffff !important;\n            text-decoration: none !important;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 600;\n                font-style: italic;\n              \"\n            >\n              Please Wait a little while. Your money will be added to your\n              wallet after verification is complete.\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 670px;\n            background-color: #702c8b;\n            margin-top: 25px;\n            text-align: center;\n            color: #ffffff !important;\n            text-decoration: none !important;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 16px;\n                font-weight: 500;\n                padding: 20px 20px 0px 20px;\n              \"\n            >\n              Need more help?\n            </td>\n          </tr>\n\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 12px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 0px 20px 10px 20px;\n              \"\n            >\n              Mail us at\n              <span style=\"color: #ffffff !important; text-decoration: none\"\n                >support@flyfarladies.com</span\n              >\n              or Call us at +88 01755582111\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"left\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 420px;\n            color: #ffffff;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 13px;\n                font-weight: 600;\n                padding: 20px 0px 0px 45px;\n                color: #767676;\n              \"\n            >\n              <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                >Terms & Conditions</a\n              >\n\n              <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                >Booking Policy</a\n              >\n\n              <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                >Privacy Policy</a\n              >\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            width: 700px;\n            color: #ffffff;\n            margin-top: 85px;\n          \"\n        >\n          <tr>\n            <td style=\"padding-left: 45px\">\n              <img\n                style=\"padding-right: 5px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png\"\n                href=\"https://www.facebook.com/flyfarladies/?ref=page_internal\"\n                alt=\"\"\n              />\n              <img\n                style=\"padding-right: 5px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png\"\n                href=\"https://www.linkedin.com/company/fly-far-ladies/\"\n                alt=\"\"\n              />\n              <img\n                style=\"padding-right: 5px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png\"\n                href=\"https://wa.me/+88 01755582111\"\n                alt=\"\"\n              />\n            </td>\n          </tr>\n\n          <tr>\n            <td\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 13px;\n                font-weight: 500;\n                padding: 5px 0px 0px 45px;\n                color: #767676;\n                padding-bottom: 2px;\n              \"\n            >\n              Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.\n            </td>\n\n            <td\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-weight: 500;\n                color: #767676;\n                padding-bottom: 20px;\n              \"\n            >\n              <img\n                width=\"100px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png\"\n                href=\"https://www.flyfarladies.com/\"\n                alt=\"\"\n              />\n            </td>\n          </tr>\n        </table>\n      </div>\n    </div>\n  </body>\n</html>\n");
          usermail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          supportmail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: 'support@flyfarladies.com',
            // Recipient's email address
            subject: 'Deposit request reject',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          _context6.next = 37;
          return transporter.sendMail(usermail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 37:
          _context6.next = 39;
          return transporter.sendMail(supportmail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 39:
          _context6.next = 41;
          return connection.commit();
        case 41:
          _context6.next = 46;
          break;
        case 43:
          _context6.prev = 43;
          _context6.t0 = _context6["catch"](3);
          console.log(_context6.t0);
        case 46:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 43]]);
  }));
  return function RejectChequeDeposit(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
var createMobilebank = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req) {
    var connection, _req$body5, payment_method, accountNumber, transactionID, reference, amount, requested_by, userquery, _yield$connection$que9, _yield$connection$que10, user, attachment, tableName, deposit_id, gatewayFeePercentage, gatewayFee, requestDate, remarks, _yield$connection$que11, _yield$connection$que12, results, date, options, formattedDate, transporter, htmltemplate, usermail, supportmail;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context7.sent;
          _context7.prev = 3;
          _req$body5 = req.body, payment_method = _req$body5.payment_method, accountNumber = _req$body5.accountNumber, transactionID = _req$body5.transactionID, reference = _req$body5.reference, amount = _req$body5.amount;
          _context7.next = 7;
          return connection.beginTransaction();
        case 7:
          // Begin a new database transaction
          requested_by = req.params.id;
          userquery = "SELECT * FROM user WHERE id = ? ";
          _context7.next = 11;
          return connection.query(userquery, [requested_by]);
        case 11:
          _yield$connection$que9 = _context7.sent;
          _yield$connection$que10 = _slicedToArray(_yield$connection$que9, 1);
          user = _yield$connection$que10[0];
          if (!(user.length === 0)) {
            _context7.next = 16;
            break;
          }
          throw new Error("User not found");
        case 16:
          attachment = req.publicImageLink;
          tableName = "mobilebank";
          if (!(amount < 0)) {
            _context7.next = 20;
            break;
          }
          throw new Error("Please check your amount. Negative amount not accepted.");
        case 20:
          // Generate a UUID-like ID for the bank transfer
          deposit_id = generateDepoId();
          gatewayFeePercentage = 1.5; // 1.5%
          gatewayFee = amount * gatewayFeePercentage / 100; // const transactionDate = new Date(cheque_date);
          requestDate = new Date();
          remarks = "mobilebank request from ".concat(accountNumber, " by ").concat(payment_method, " ").concat(reference, " ").concat(amount, " at ").concat(requestDate);
          _context7.next = 27;
          return connection.query("INSERT INTO mobilebank (deposit_id, payment_method, accountNumber, requestDate, gatewayFee,transactionID, requested_by, amount, reference, remarks, attachment) VALUES (?, ?, ?, ?, ?, ?,?,?, ?, ?, ?)", [deposit_id, payment_method, accountNumber, requestDate, gatewayFee, transactionID, requested_by, amount, reference, remarks, attachment]);
        case 27:
          _yield$connection$que11 = _context7.sent;
          _yield$connection$que12 = _slicedToArray(_yield$connection$que11, 1);
          results = _yield$connection$que12[0];
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
          formattedDate = date.toLocaleString('en-BD', options);
          transporter = _nodemailer["default"].createTransport({
            host: 'b2b.flyfarint.com',
            // Replace with your email service provider's SMTP host
            port: 465,
            // Replace with your email service provider's SMTP port
            secure: true,
            // Use TLS for secure connection
            auth: {
              user: 'flyfarladies@mailservice.center',
              // Replace with your email address
              pass: 'YVWJCU.?UY^R' // Replace with your email password
            }
          });
          htmltemplate = "<!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\" />\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <title>Deposit Request</title>\n      </head>\n      <body>\n        <div style=\"width: 700px; height: 110vh; margin: 0 auto\">\n          <div style=\"width: 700px; height: 70px; background: #fe99a6\">\n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 700px;\n              \"\n            >\n              <tr>\n                <td\n                  align=\"center\"\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #ffffff;\n                    font-family: sans-serif;\n                    font-size: 15px;\n                    line-height: 38px;\n                    padding: 20px 0 20px 0;\n                    text-transform: uppercase;\n                    letter-spacing: 5px;\n                  \"\n                >\n                  Deposit Confirmation\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 700px;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    background-color: #efefef;\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #584660;\n                    font-family: sans-serif;\n                    font-size: 30px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 20px 40px 0px 55px;\n                  \"\n                >\n                  ".concat(amount, "\n                </td>\n              </tr>\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    background-color: #efefef;\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #bc6277;\n                    font-family: sans-serif;\n                    font-size: 17px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 0px 40px 20px 55px;\n                  \"\n                >\n                MOBILE BANK\n                </td>\n              </tr>\n            </table>\n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 620px;\n                background-color: #ffffff;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #bc6277;\n                    font-family: sans-serif;\n                    font-size: 15px;\n                    font-weight: 600;\n                    line-height: 38px;\n                    padding: 10px 20px 5px 20px;\n                  \"\n                >\n                  Transaction Details\n                </td>\n              </tr>\n    \n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Transaction ID\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                ").concat(deposit_id, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                AccountNumber\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(accountNumber, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n              TransactionID\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(transactionID, "\n              </td>\n            </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                GatewayFee\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(gatewayFee, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Requested BY\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(requested_by, "\n                </td>\n              </tr>\n\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                Transaction Date\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(formattedDate, "\n              </td>\n            </tr>\n            <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                Requested At\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(requestDate, "\n              </td>\n            </tr>\n\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 670px;\n                margin-top: 15px;\n                color: #ffffff !important;\n                text-decoration: none !important;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 600;\n                    font-style: italic;\n                  \"\n                >\n                  Please Wait a little while. Your money will be added to your\n                  wallet after verification is complete.\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 670px;\n                background-color: #702c8b;\n                margin-top: 25px;\n                text-align: center;\n                color: #ffffff !important;\n                text-decoration: none !important;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 16px;\n                    font-weight: 500;\n                    padding: 20px 20px 0px 20px;\n                  \"\n                >\n                  Need more help?\n                </td>\n              </tr>\n    \n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 12px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 0px 20px 10px 20px;\n                  \"\n                >\n                  Mail us at\n                  <span style=\"color: #ffffff !important; text-decoration: none\"\n                    >support@flyfarladies.com</span\n                  >\n                  or Call us at +88 01755582111\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"left\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 420px;\n                color: #ffffff;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 13px;\n                    font-weight: 600;\n                    padding: 20px 0px 0px 45px;\n                    color: #767676;\n                  \"\n                >\n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Terms & Conditions</a\n                  >\n    \n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Booking Policy</a\n                  >\n    \n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Privacy Policy</a\n                  >\n                </td>\n              </tr>\n            </table>\n            \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                width: 700px;\n                color: #ffffff;\n                margin-top: 85px;\n              \"\n            >\n              <tr>\n                <td style=\"padding-left: 45px\">\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png\"\n                    href=\"https://www.facebook.com/flyfarladies/?ref=page_internal\"\n                    alt=\"\"\n                  />\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png\"\n                    href=\"https://www.linkedin.com/company/fly-far-ladies/\"\n                    alt=\"\"\n                  />\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png\"\n                    href=\"https://wa.me/+88 01755582111\"\n                    alt=\"\"\n                  />\n                </td>\n              </tr>\n    \n              <tr>\n                <td\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 13px;\n                    font-weight: 500;\n                    padding: 5px 0px 0px 45px;\n                    color: #767676;\n                    padding-bottom: 2px;\n                  \"\n                >\n                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.\n                </td>\n    \n                <td\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-weight: 500;\n                    color: #767676;\n                    padding-bottom: 20px;\n                  \"\n                >\n                  <img\n                    width=\"100px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png\"\n                    href=\"https://www.flyfarladies.com/\"\n                    alt=\"\"\n                  />\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n      </body>\n    </html>\n    ");
          usermail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          supportmail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          _context7.next = 39;
          return transporter.sendMail(usermail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 39:
          _context7.next = 41;
          return transporter.sendMail(supportmail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 41:
          _context7.next = 43;
          return connection.commit();
        case 43:
          // Commit the transaction when the query is successful
          connection.release();
          return _context7.abrupt("return", results);
        case 47:
          _context7.prev = 47;
          _context7.t0 = _context7["catch"](3);
          _context7.next = 51;
          return connection.rollback();
        case 51:
          _context7.next = 53;
          return (0, _imageHandler.deleteImageFromURL)(req.publicImageLink);
        case 53:
          connection.release();
          throw _context7.t0;
        case 55:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 47]]);
  }));
  return function createMobilebank(_x7) {
    return _ref7.apply(this, arguments);
  };
}();
var createCashDeposit = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req) {
    var connection, _req$body6, depositor_name, receiver_name, transaction_date, transaction_id, amount, requested_by, userquery, _yield$connection$que13, _yield$connection$que14, user, image, tableName, status, deposit_id, date, remarks, value, _yield$connection$que15, _yield$connection$que16, results, options, formattedDate, transporter, htmltemplate, usermail, supportmail;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context8.sent;
          _context8.prev = 3;
          _req$body6 = req.body, depositor_name = _req$body6.depositor_name, receiver_name = _req$body6.receiver_name, transaction_date = _req$body6.transaction_date, transaction_id = _req$body6.transaction_id, amount = _req$body6.amount;
          _context8.next = 7;
          return connection.beginTransaction();
        case 7:
          // Begin a new database transaction
          requested_by = req.params.id;
          userquery = "SELECT * FROM user WHERE id =? ";
          _context8.next = 11;
          return connection.query(userquery, [requested_by]);
        case 11:
          _yield$connection$que13 = _context8.sent;
          _yield$connection$que14 = _slicedToArray(_yield$connection$que13, 1);
          user = _yield$connection$que14[0];
          if (!(user.length === 0)) {
            _context8.next = 16;
            break;
          }
          throw new Error("User not found");
        case 16:
          image = req.publicImageLink;
          tableName = "cash_deposit";
          status = "pending";
          console.log(tableName);
          if (!(amount < 0)) {
            _context8.next = 22;
            break;
          }
          throw new Error("Please check your amount. Negative amount not accepted.");
        case 22:
          // Generate a UUID-like ID for the bank transfer
          deposit_id = generateDepoId();
          date = new Date(); // const formattedDate = transactionDate.toDateString();
          remarks = "Cash Deposit request from ".concat(depositor_name, " to ").concat(receiver_name, ", On ").concat(formattedDate, ".Your TRX ID is ").concat(transaction_id, " & amount ").concat(amount, " only");
          console.log(image);
          value = [deposit_id, depositor_name, receiver_name, transaction_date, status, transaction_id, amount, requested_by, image, remarks];
          _context8.next = 29;
          return connection.query("INSERT INTO ".concat(tableName, " ( deposit_id, depositor_name, receiver_name, transaction_date, status, transaction_id, amount, requested_by, attachment,remarks) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?,?)"), value);
        case 29:
          _yield$connection$que15 = _context8.sent;
          _yield$connection$que16 = _slicedToArray(_yield$connection$que15, 1);
          results = _yield$connection$que16[0];
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
          formattedDate = date.toLocaleString('en-BD', options);
          transporter = _nodemailer["default"].createTransport({
            host: 'b2b.flyfarint.com',
            // Replace with your email service provider's SMTP host
            port: 465,
            // Replace with your email service provider's SMTP port
            secure: true,
            // Use TLS for secure connection
            auth: {
              user: 'flyfarladies@mailservice.center',
              // Replace with your email address
              pass: 'YVWJCU.?UY^R' // Replace with your email password
            }
          });
          htmltemplate = "<!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\" />\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <title>Deposit Request</title>\n      </head>\n      <body>\n        <div style=\"width: 700px; height: 110vh; margin: 0 auto\">\n          <div style=\"width: 700px; height: 70px; background: #fe99a6\">\n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 700px;\n              \"\n            >\n              <tr>\n                <td\n                  align=\"center\"\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #ffffff;\n                    font-family: sans-serif;\n                    font-size: 15px;\n                    line-height: 38px;\n                    padding: 20px 0 20px 0;\n                    text-transform: uppercase;\n                    letter-spacing: 5px;\n                  \"\n                >\n                  Deposit Confirmation\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 700px;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    background-color: #efefef;\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #584660;\n                    font-family: sans-serif;\n                    font-size: 30px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 20px 40px 0px 55px;\n                  \"\n                >\n                  ".concat(amount, "\n                </td>\n              </tr>\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    background-color: #efefef;\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #bc6277;\n                    font-family: sans-serif;\n                    font-size: 17px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 0px 40px 20px 55px;\n                  \"\n                >\n                CASH\n                </td>\n              </tr>\n            </table>\n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 620px;\n                background-color: #ffffff;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #bc6277;\n                    font-family: sans-serif;\n                    font-size: 15px;\n                    font-weight: 600;\n                    line-height: 38px;\n                    padding: 10px 20px 5px 20px;\n                  \"\n                >\n                  Transaction Details\n                </td>\n              </tr>\n    \n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Transaction ID\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                ").concat(deposit_id, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Depositor Name\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(depositor_name, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                Receiver Name\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(receiver_name, "\n              </td>\n            </tr>\n\n            <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              Payment Status\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              ").concat(status, "\n            </td>\n          </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Transaction Date\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(transaction_date, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Requested BY\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(requested_by, "\n                </td>\n              </tr>\n\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                Transaction Date\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(transaction_date, "\n              </td>\n            </tr>\n            <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                Requested At\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(formattedDate, "\n              </td>\n            </tr>\n\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 670px;\n                margin-top: 15px;\n                color: #ffffff !important;\n                text-decoration: none !important;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 600;\n                    font-style: italic;\n                  \"\n                >\n                  Please Wait a little while. Your money will be added to your\n                  wallet after verification is complete.\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 670px;\n                background-color: #702c8b;\n                margin-top: 25px;\n                text-align: center;\n                color: #ffffff !important;\n                text-decoration: none !important;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 16px;\n                    font-weight: 500;\n                    padding: 20px 20px 0px 20px;\n                  \"\n                >\n                  Need more help?\n                </td>\n              </tr>\n    \n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 12px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 0px 20px 10px 20px;\n                  \"\n                >\n                  Mail us at\n                  <span style=\"color: #ffffff !important; text-decoration: none\"\n                    >support@flyfarladies.com</span\n                  >\n                  or Call us at +88 01755582111\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"left\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 420px;\n                color: #ffffff;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 13px;\n                    font-weight: 600;\n                    padding: 20px 0px 0px 45px;\n                    color: #767676;\n                  \"\n                >\n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Terms & Conditions</a\n                  >\n    \n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Booking Policy</a\n                  >\n    \n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Privacy Policy</a\n                  >\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                width: 700px;\n                color: #ffffff;\n                margin-top: 85px;\n              \"\n            >\n              <tr>\n                <td style=\"padding-left: 45px\">\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png\"\n                    href=\"https://www.facebook.com/flyfarladies/?ref=page_internal\"\n                    alt=\"\"\n                  />\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png\"\n                    href=\"https://www.linkedin.com/company/fly-far-ladies/\"\n                    alt=\"\"\n                  />\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png\"\n                    href=\"https://wa.me/+88 01755582111\"\n                    alt=\"\"\n                  />\n                </td>\n              </tr>\n    \n              <tr>\n                <td\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 13px;\n                    font-weight: 500;\n                    padding: 5px 0px 0px 45px;\n                    color: #767676;\n                    padding-bottom: 2px;\n                  \"\n                >\n                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.\n                </td>\n    \n                <td\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-weight: 500;\n                    color: #767676;\n                    padding-bottom: 20px;\n                  \"\n                >\n                  <img\n                    width=\"100px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png\"\n                    href=\"https://www.flyfarladies.com/\"\n                    alt=\"\"\n                  />\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n      </body>\n    </html>\n    ");
          usermail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          supportmail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          _context8.next = 40;
          return transporter.sendMail(usermail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 40:
          _context8.next = 42;
          return transporter.sendMail(supportmail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 42:
          console.log(value);
          _context8.next = 45;
          return connection.commit();
        case 45:
          // Commit the transaction when the query is successful
          connection.release();
          return _context8.abrupt("return", results);
        case 49:
          _context8.prev = 49;
          _context8.t0 = _context8["catch"](3);
          _context8.next = 53;
          return connection.rollback();
        case 53:
          _context8.next = 55;
          return (0, _imageHandler.deleteImageFromURL)(req.publicImageLink);
        case 55:
          connection.release();
          throw _context8.t0;
        case 57:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[3, 49]]);
  }));
  return function createCashDeposit(_x8) {
    return _ref8.apply(this, arguments);
  };
}();
var ApprovedCashDeposit = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req) {
    var connection, deposit_id, action_by, updateQuery, date, options, approvedAt, status, values, getamount, _yield$connection$exe7, _yield$connection$exe8, result, amount, updateUserWalletQuery, user_id, _yield$connection$exe9, _yield$connection$exe10, updatewallet, userQuery, _yield$pool$query19, _yield$pool$query20, user, remarks, ledgerquery, ledger, transporter, htmltemplate, usermail, supportmail;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context9.sent;
          _context9.prev = 3;
          deposit_id = req.params.deposit_id;
          action_by = req.body.action_by;
          updateQuery = "\n    UPDATE cash_deposit\n    SET status = ?,\n    action_by = ?\n    WHERE deposit_id = ?\n  ";
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
          status = 'approved';
          values = [status, action_by, deposit_id];
          getamount = "SELECT * FROM cash_deposit WHERE deposit_id = ?";
          _context9.next = 15;
          return connection.beginTransaction();
        case 15:
          _context9.next = 17;
          return connection.execute(getamount, [deposit_id]);
        case 17:
          _yield$connection$exe7 = _context9.sent;
          _yield$connection$exe8 = _slicedToArray(_yield$connection$exe7, 1);
          result = _yield$connection$exe8[0];
          amount = result[0].amount;
          _context9.next = 23;
          return connection.execute(updateQuery, values);
        case 23:
          // If the status is 'approved', update  the user wallet
          updateUserWalletQuery = "UPDATE user SET wallet = wallet+ ? WHERE id = ?";
          user_id = result[0].requested_by;
          console.log(user_id);
          _context9.next = 28;
          return connection.execute(updateUserWalletQuery, [amount, user_id]);
        case 28:
          _yield$connection$exe9 = _context9.sent;
          _yield$connection$exe10 = _slicedToArray(_yield$connection$exe9, 1);
          updatewallet = _yield$connection$exe10[0];
          userQuery = "SELECT *  FROm user WHERE id=?";
          _context9.next = 34;
          return _db["default"].query(userQuery, [user_id]);
        case 34:
          _yield$pool$query19 = _context9.sent;
          _yield$pool$query20 = _slicedToArray(_yield$pool$query19, 1);
          user = _yield$pool$query20[0];
          remarks = "Cash Deposit request from ".concat(result[0].depositor_name, ", Receiver ").concat(result[0].receiver_name, ", On ").concat(result[0].transaction_date, " and  TRXID is ").concat(result[0].transaction_id, " & amount ").concat(result[0].amount, " only.This action had taken by ").concat(action_by);
          ledgerquery = "INSERT INTO ledger(user_id, purchase, lastBalance, actionBy, remarks, createdAt) VALUES (?,?, ?, ?, ?, ?)";
          _context9.next = 41;
          return connection.execute(ledgerquery, [result[0].requested_by, result[0].amount, user[0].wallet, action_by, remarks, approvedAt]);
        case 41:
          ledger = _context9.sent;
          transporter = _nodemailer["default"].createTransport({
            host: 'b2b.flyfarint.com',
            // Replace with your email service provider's SMTP host
            port: 465,
            // Replace with your email service provider's SMTP port
            secure: true,
            // Use TLS for secure connection
            auth: {
              user: 'flyfarladies@mailservice.center',
              // Replace with your email address
              pass: 'YVWJCU.?UY^R' // Replace with your email password
            }
          });
          htmltemplate = "<!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\" />\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <title>Deposit Request</title>\n      </head>\n      <body>\n        <div style=\"width: 700px; height: 110vh; margin: 0 auto\">\n          <div style=\"width: 700px; height: 70px; background: #fe99a6\">\n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 700px;\n              \"\n            >\n              <tr>\n                <td\n                  align=\"center\"\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #ffffff;\n                    font-family: sans-serif;\n                    font-size: 15px;\n                    line-height: 38px;\n                    padding: 20px 0 20px 0;\n                    text-transform: uppercase;\n                    letter-spacing: 5px;\n                  \"\n                >\n                  ".concat(status, "\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 700px;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    background-color: #efefef;\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #584660;\n                    font-family: sans-serif;\n                    font-size: 30px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 20px 40px 0px 55px;\n                  \"\n                >\n                  ").concat(result[0].amount, "\n                </td>\n              </tr>\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    background-color: #efefef;\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #bc6277;\n                    font-family: sans-serif;\n                    font-size: 17px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 0px 40px 20px 55px;\n                  \"\n                >\n                  CASH\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 620px;\n                background-color: #ffffff;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #bc6277;\n                    font-family: sans-serif;\n                    font-size: 15px;\n                    font-weight: 600;\n                    line-height: 38px;\n                    padding: 10px 20px 5px 20px;\n                  \"\n                >\n                  Transaction Details\n                </td>\n              </tr>\n    \n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Trasaction ID\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                ").concat(result[0].deposit_id, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                Depositor Name\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(result[0].depositor_name, "\n                </td>\n              </tr>\n\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n              Receiver Name\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(result[0].receiver_name, "\n              </td>\n            </tr>\n\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                  width: 180px;\n                \"\n              >\n                Approved At\n              </td>\n              <td\n                valign=\"top\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  color: #767676;\n                  font-family: sans-serif;\n                  font-size: 14px;\n                  font-weight: 500;\n                  line-height: 38px;\n                  padding: 5px 20px;\n                \"\n              >\n                ").concat(approvedAt, "\n              </td>\n            </tr>\n             \n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  Transaction Date\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                  ").concat(result[0].transaction_date, "\n                </td>\n              </tr>\n              <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 180px;\n                  \"\n                >\n                  DepositType\n                </td>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                  \"\n                >\n                    CASH\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 670px;\n                margin-top: 15px;\n                color: #ffffff !important;\n                text-decoration: none !important;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    color: #767676;\n                    font-family: sans-serif;\n                    font-size: 14px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 5px 20px;\n                    width: 600;\n                    font-style: italic;\n                  \"\n                >\n                  Please Wait a little while. Your money will be added to your\n                  wallet after verification is complete.\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"center\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 670px;\n                background-color: #702c8b;\n                margin-top: 25px;\n                text-align: center;\n                color: #ffffff !important;\n                text-decoration: none !important;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 16px;\n                    font-weight: 500;\n                    padding: 20px 20px 0px 20px;\n                  \"\n                >\n                  Need more help?\n                </td>\n              </tr>\n    \n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 12px;\n                    font-weight: 500;\n                    line-height: 38px;\n                    padding: 0px 20px 10px 20px;\n                  \"\n                >\n                  Mail us at\n                  <span style=\"color: #ffffff !important; text-decoration: none\"\n                    >support@flyfarladies.com</span\n                  >\n                  or Call us at +88 01755582111\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              align=\"left\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                padding: 0;\n                width: 420px;\n                color: #ffffff;\n              \"\n            >\n              <tr>\n                <td\n                  valign=\"top\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 13px;\n                    font-weight: 600;\n                    padding: 20px 0px 0px 45px;\n                    color: #767676;\n                  \"\n                >\n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Terms & Conditions</a\n                  >\n    \n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Booking Policy</a\n                  >\n    \n                  <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                    >Privacy Policy</a\n                  >\n                </td>\n              </tr>\n            </table>\n    \n            <table\n              border=\"0\"\n              cellpadding=\"0\"\n              cellspacing=\"0\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                width: 700px;\n                color: #ffffff;\n                margin-top: 85px;\n              \"\n            >\n              <tr>\n                <td style=\"padding-left: 45px\">\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png\"\n                    href=\"https://www.facebook.com/flyfarladies/?ref=page_internal\"\n                    alt=\"\"\n                  />\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png\"\n                    href=\"https://www.linkedin.com/company/fly-far-ladies/\"\n                    alt=\"\"\n                  />\n                  <img\n                    style=\"padding-right: 5px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png\"\n                    href=\"https://wa.me/+88 01755582111\"\n                    alt=\"\"\n                  />\n                </td>\n              </tr>\n    \n              <tr>\n                <td\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-size: 13px;\n                    font-weight: 500;\n                    padding: 5px 0px 0px 45px;\n                    color: #767676;\n                    padding-bottom: 2px;\n                  \"\n                >\n                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.\n                </td>\n    \n                <td\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    font-family: sans-serif;\n                    font-weight: 500;\n                    color: #767676;\n                    padding-bottom: 20px;\n                  \"\n                >\n                  <img\n                    width=\"100px\"\n                    src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png\"\n                    href=\"https://www.flyfarladies.com/\"\n                    alt=\"\"\n                  />\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n      </body>\n    </html>\n    ");
          usermail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          supportmail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: 'support@flyfarladies.com',
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          _context9.next = 48;
          return transporter.sendMail(usermail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 48:
          _context9.next = 50;
          return transporter.sendMail(supportmail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 50:
          _context9.next = 52;
          return connection.commit();
        case 52:
          _context9.next = 57;
          break;
        case 54:
          _context9.prev = 54;
          _context9.t0 = _context9["catch"](3);
          console.log(_context9.t0);
        case 57:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[3, 54]]);
  }));
  return function ApprovedCashDeposit(_x9) {
    return _ref9.apply(this, arguments);
  };
}();
var RejectCashDeposit = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req) {
    var connection, deposit_id, _req$body7, action_by, rejected_reason, depositQuery, _yield$pool$query21, _yield$pool$query22, result, updateQuery, status, values, _yield$pool$query23, _yield$pool$query24, data, user_id, userquery, _yield$pool$query25, _yield$pool$query26, user, date, options, approvedAt, transporter, htmltemplate, usermail, supportmail;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context10.sent;
          _context10.prev = 3;
          deposit_id = req.params.deposit_id;
          _req$body7 = req.body, action_by = _req$body7.action_by, rejected_reason = _req$body7.rejected_reason;
          depositQuery = "SELECT * FROM cash_deposit WHERE deposit_id = ?";
          _context10.next = 9;
          return _db["default"].query(depositQuery, [deposit_id]);
        case 9:
          _yield$pool$query21 = _context10.sent;
          _yield$pool$query22 = _slicedToArray(_yield$pool$query21, 1);
          result = _yield$pool$query22[0];
          updateQuery = "\n    UPDATE cheque_deposit\n    SET status = ?,\n    action_by = ?,\n    rejected_reason=?\n    WHERE deposit_id = ?\n  ";
          status = "rejected";
          values = [status, action_by, rejected_reason, deposit_id];
          console.log(values);
          _context10.next = 18;
          return _db["default"].query(updateQuery, values);
        case 18:
          _yield$pool$query23 = _context10.sent;
          _yield$pool$query24 = _slicedToArray(_yield$pool$query23, 1);
          data = _yield$pool$query24[0];
          user_id = result[0].requested_by;
          userquery = "SELECT * FROM user WHERE id =?";
          _context10.next = 25;
          return _db["default"].query(userquery, [user_id]);
        case 25:
          _yield$pool$query25 = _context10.sent;
          _yield$pool$query26 = _slicedToArray(_yield$pool$query25, 1);
          user = _yield$pool$query26[0];
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
          transporter = _nodemailer["default"].createTransport({
            host: 'b2b.flyfarint.com',
            // Replace with your email service provider's SMTP host
            port: 465,
            // Replace with your email service provider's SMTP port
            secure: true,
            // Use TLS for secure connection
            auth: {
              user: 'flyfarladies@mailservice.center',
              // Replace with your email address
              pass: 'YVWJCU.?UY^R' // Replace with your email password
            }
          });
          htmltemplate = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Deposit Request</title>\n  </head>\n  <body>\n    <div style=\"width: 700px; height: 110vh; margin: 0 auto\">\n      <div style=\"width: 700px; height: 70px; background: #fe99a6\">\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 700px;\n          \"\n        >\n          <tr>\n            <td\n              align=\"center\"\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #ffffff;\n                font-family: sans-serif;\n                font-size: 15px;\n                line-height: 38px;\n                padding: 20px 0 20px 0;\n                text-transform: uppercase;\n                letter-spacing: 5px;\n              \"\n            >\n              ".concat(status, "\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 700px;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                background-color: #efefef;\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #584660;\n                font-family: sans-serif;\n                font-size: 30px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 20px 40px 0px 55px;\n              \"\n            >\n              ").concat(result[0].amount, "\n            </td>\n          </tr>\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                background-color: #efefef;\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #bc6277;\n                font-family: sans-serif;\n                font-size: 17px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 0px 40px 20px 55px;\n              \"\n            >\n              CASH\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 620px;\n            background-color: #ffffff;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #bc6277;\n                font-family: sans-serif;\n                font-size: 15px;\n                font-weight: 600;\n                line-height: 38px;\n                padding: 10px 20px 5px 20px;\n              \"\n            >\n              Transaction Details\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n              width: 180px;\n            \"\n          >\n            Rejection Reason\n          </td>\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n            \"\n          >\n          ").concat(rejected_reason, "\n          </td>\n        </tr>\n\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              Trasaction ID\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n            ").concat(result[0].deposit_id, "\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n            Depositor Name\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              ").concat(result[0].depositor_name, "\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n              width: 180px;\n            \"\n          >\n            Rejected At\n          </td>\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n            \"\n          >\n            ").concat(approvedAt, "\n          </td>\n        </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n              width: 180px;\n            \"\n          >\n          receiver_name\n          </td>\n          <td\n            valign=\"top\"\n            style=\"\n              border-collapse: collapse;\n              border-spacing: 0;\n              color: #767676;\n              font-family: sans-serif;\n              font-size: 14px;\n              font-weight: 500;\n              line-height: 38px;\n              padding: 5px 20px;\n            \"\n          >\n            ").concat(result[0].receiver_name, "\n          </td>\n        </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n            transaction_date\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              ").concat(result[0].transaction_date, "\n            </td>\n          </tr>\n          <tr style=\"border-bottom: 1px solid #dfdfdf\">\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 180px;\n              \"\n            >\n              DepositType\n            </td>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n              \"\n            >\n              CASH\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 670px;\n            margin-top: 15px;\n            color: #ffffff !important;\n            text-decoration: none !important;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                color: #767676;\n                font-family: sans-serif;\n                font-size: 14px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 5px 20px;\n                width: 600;\n                font-style: italic;\n              \"\n            >\n              Please Wait a little while. Your money will be added to your\n              wallet after verification is complete.\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"center\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 670px;\n            background-color: #702c8b;\n            margin-top: 25px;\n            text-align: center;\n            color: #ffffff !important;\n            text-decoration: none !important;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 16px;\n                font-weight: 500;\n                padding: 20px 20px 0px 20px;\n              \"\n            >\n              Need more help?\n            </td>\n          </tr>\n\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 12px;\n                font-weight: 500;\n                line-height: 38px;\n                padding: 0px 20px 10px 20px;\n              \"\n            >\n              Mail us at\n              <span style=\"color: #ffffff !important; text-decoration: none\"\n                >support@flyfarladies.com</span\n              >\n              or Call us at +88 01755582111\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          align=\"left\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            padding: 0;\n            width: 420px;\n            color: #ffffff;\n          \"\n        >\n          <tr>\n            <td\n              valign=\"top\"\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 13px;\n                font-weight: 600;\n                padding: 20px 0px 0px 45px;\n                color: #767676;\n              \"\n            >\n              <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                >Terms & Conditions</a\n              >\n\n              <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                >Booking Policy</a\n              >\n\n              <a style=\"padding-right: 20px; color: #584660\" href=\"http://\"\n                >Privacy Policy</a\n              >\n            </td>\n          </tr>\n        </table>\n\n        <table\n          border=\"0\"\n          cellpadding=\"0\"\n          cellspacing=\"0\"\n          style=\"\n            border-collapse: collapse;\n            border-spacing: 0;\n            width: 700px;\n            color: #ffffff;\n            margin-top: 85px;\n          \"\n        >\n          <tr>\n            <td style=\"padding-left: 45px\">\n              <img\n                style=\"padding-right: 5px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png\"\n                href=\"https://www.facebook.com/flyfarladies/?ref=page_internal\"\n                alt=\"\"\n              />\n              <img\n                style=\"padding-right: 5px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png\"\n                href=\"https://www.linkedin.com/company/fly-far-ladies/\"\n                alt=\"\"\n              />\n              <img\n                style=\"padding-right: 5px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png\"\n                href=\"https://wa.me/+88 01755582111\"\n                alt=\"\"\n              />\n            </td>\n          </tr>\n\n          <tr>\n            <td\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-size: 13px;\n                font-weight: 500;\n                padding: 5px 0px 0px 45px;\n                color: #767676;\n                padding-bottom: 2px;\n              \"\n            >\n              Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.\n            </td>\n\n            <td\n              style=\"\n                border-collapse: collapse;\n                border-spacing: 0;\n                font-family: sans-serif;\n                font-weight: 500;\n                color: #767676;\n                padding-bottom: 20px;\n              \"\n            >\n              <img\n                width=\"100px\"\n                src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png\"\n                href=\"https://www.flyfarladies.com/\"\n                alt=\"\"\n              />\n            </td>\n          </tr>\n        </table>\n      </div>\n    </div>\n  </body>\n</html>\n");
          usermail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: user[0].email,
            // Recipient's email address
            subject: 'Deposit Details',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          supportmail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: 'support@flyfarladies.com',
            // Recipient's email address
            subject: 'Deposit request reject',
            text: 'Please find the attached file.',
            html: htmltemplate
          };
          _context10.next = 37;
          return transporter.sendMail(usermail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 37:
          _context10.next = 39;
          return transporter.sendMail(supportmail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 39:
          _context10.next = 41;
          return connection.commit();
        case 41:
          _context10.next = 46;
          break;
        case 43:
          _context10.prev = 43;
          _context10.t0 = _context10["catch"](3);
          console.log(_context10.t0);
        case 46:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[3, 43]]);
  }));
  return function RejectCashDeposit(_x10) {
    return _ref10.apply(this, arguments);
  };
}();
var getuserdeposit = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var userid, bankDepoQuery, _yield$pool$query27, _yield$pool$query28, bankDeposit, cheqDepoQuery, _yield$pool$query29, _yield$pool$query30, chequeDeposit, mobileBankDepoQuery, _yield$pool$query31, _yield$pool$query32, mobileDeposit, bkashDeposit, _yield$pool$query33, _yield$pool$query34, bkashdata, combinedResult;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          userid = req.params.requested_by;
          bankDepoQuery = "SELECT * FROM bank_transfer WHERE requested_by = ?";
          _context11.next = 5;
          return _db["default"].query(bankDepoQuery, [userid]);
        case 5:
          _yield$pool$query27 = _context11.sent;
          _yield$pool$query28 = _slicedToArray(_yield$pool$query27, 1);
          bankDeposit = _yield$pool$query28[0];
          cheqDepoQuery = "SELECT * FROM cheque_deposit WHERE requested_by = ?";
          _context11.next = 11;
          return _db["default"].query(cheqDepoQuery, [userid]);
        case 11:
          _yield$pool$query29 = _context11.sent;
          _yield$pool$query30 = _slicedToArray(_yield$pool$query29, 1);
          chequeDeposit = _yield$pool$query30[0];
          mobileBankDepoQuery = "SELECT * FROM mobilebank WHERE requested_by = ?";
          _context11.next = 17;
          return _db["default"].query(mobileBankDepoQuery, [userid]);
        case 17:
          _yield$pool$query31 = _context11.sent;
          _yield$pool$query32 = _slicedToArray(_yield$pool$query31, 1);
          mobileDeposit = _yield$pool$query32[0];
          bkashDeposit = "SELECT * FROM bkaspayment WHERE userid = ?";
          _context11.next = 23;
          return _db["default"].query(bkashDeposit, [userid]);
        case 23:
          _yield$pool$query33 = _context11.sent;
          _yield$pool$query34 = _slicedToArray(_yield$pool$query33, 1);
          bkashdata = _yield$pool$query34[0];
          combinedResult = [].concat(_toConsumableArray(bankDeposit), _toConsumableArray(chequeDeposit), _toConsumableArray(mobileDeposit), _toConsumableArray(bkashdata));
          return _context11.abrupt("return", res.json({
            alldeposit: combinedResult
          }));
        case 30:
          _context11.prev = 30;
          _context11.t0 = _context11["catch"](0);
          console.error("Error fetching user deposits:", _context11.t0);
          return _context11.abrupt("return", res.status(500).json({
            error: "Internal Server Error"
          }));
        case 34:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 30]]);
  }));
  return function getuserdeposit(_x11, _x12) {
    return _ref11.apply(this, arguments);
  };
}();
var getAlldeposit = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var bankDepoQuery, _yield$pool$query35, _yield$pool$query36, bankDeposit, cheqDepoQuery, _yield$pool$query37, _yield$pool$query38, chequeDeposit, mobileBankDepoQuery, _yield$pool$query39, _yield$pool$query40, mobileDeposit, bkashDeposit, _yield$pool$query41, _yield$pool$query42, bkashdata, combinedResult;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          bankDepoQuery = "SELECT * FROM bank_transfer";
          _context12.next = 4;
          return _db["default"].query(bankDepoQuery);
        case 4:
          _yield$pool$query35 = _context12.sent;
          _yield$pool$query36 = _slicedToArray(_yield$pool$query35, 1);
          bankDeposit = _yield$pool$query36[0];
          cheqDepoQuery = "SELECT * FROM cheque_deposit";
          _context12.next = 10;
          return _db["default"].query(cheqDepoQuery);
        case 10:
          _yield$pool$query37 = _context12.sent;
          _yield$pool$query38 = _slicedToArray(_yield$pool$query37, 1);
          chequeDeposit = _yield$pool$query38[0];
          mobileBankDepoQuery = "SELECT * FROM mobilebank";
          _context12.next = 16;
          return _db["default"].query(mobileBankDepoQuery);
        case 16:
          _yield$pool$query39 = _context12.sent;
          _yield$pool$query40 = _slicedToArray(_yield$pool$query39, 1);
          mobileDeposit = _yield$pool$query40[0];
          bkashDeposit = "SELECT * FROM bkaspayment";
          _context12.next = 22;
          return _db["default"].query(bkashDeposit);
        case 22:
          _yield$pool$query41 = _context12.sent;
          _yield$pool$query42 = _slicedToArray(_yield$pool$query41, 1);
          bkashdata = _yield$pool$query42[0];
          combinedResult = [].concat(_toConsumableArray(bankDeposit), _toConsumableArray(chequeDeposit), _toConsumableArray(mobileDeposit), _toConsumableArray(bkashdata));
          return _context12.abrupt("return", res.json({
            alldeposit: combinedResult
          }));
        case 29:
          _context12.prev = 29;
          _context12.t0 = _context12["catch"](0);
          console.error("Error fetching user deposits:", _context12.t0);
          return _context12.abrupt("return", res.status(500).json({
            error: "Internal Server Error"
          }));
        case 33:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 29]]);
  }));
  return function getAlldeposit(_x13, _x14) {
    return _ref12.apply(this, arguments);
  };
}();
var depositeService = exports.depositeService = {
  createBankDeposit: createBankDeposit,
  ApprovedBankDeposit: ApprovedBankDeposit,
  RejectBankDeposit: RejectBankDeposit,
  createCheckDeposit: createCheckDeposit,
  createCashDeposit: createCashDeposit,
  ApprovedCheckDeposit: ApprovedCheckDeposit,
  RejectChequeDeposit: RejectChequeDeposit,
  createMobilebank: createMobilebank,
  ApprovedCashDeposit: ApprovedCashDeposit,
  RejectCashDeposit: RejectCashDeposit,
  getAlldeposit: getAlldeposit,
  getuserdeposit: getuserdeposit
};