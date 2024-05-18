"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UserService = void 0;
exports.verifyToken = verifyToken;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _db = _interopRequireDefault(require("../database/db"));
var _zod = require("zod");
var _expressSharp = require("express-sharp");
var _httpStatus = _interopRequireDefault(require("http-status"));
var _crypto = _interopRequireDefault(require("crypto"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var generateUserId = function generateUserId() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "FFLU" + Math.floor(Math.random() * 10000);
};
var TravellerId = function TravellerId() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "T" + Math.floor(Math.random() * 10000);
};
var Register = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, name, phone, email, password, platform, _yield$pool$query, _yield$pool$query2, existingUser, id, hashedPassword, newUser, joinAt, _yield$pool$query3, _yield$pool$query4, result, transporter, _date, options, formattedDate, mailOptions;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Extract the data from the request body
          _req$body = req.body, name = _req$body.name, phone = _req$body.phone, email = _req$body.email, password = _req$body.password, platform = _req$body.platform; // Do some validation on the data
          if (!(!name || !email || !password || !platform)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Missing required fields"
          }));
        case 4:
          _context.next = 6;
          return _db["default"].query("SELECT * FROM user WHERE email = ?", [email]);
        case 6:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          existingUser = _yield$pool$query2[0];
          if (!(existingUser.length > 0)) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "User already exists"
          }));
        case 11:
          // Generate user ID
          id = generateUserId(); // Hash the password
          hashedPassword = _crypto["default"].createHash('sha256').update(password).digest('hex'); // Create a new user object with the provided data
          newUser = {
            id: id,
            name: name,
            phone: phone,
            email: email,
            password: hashedPassword,
            platform: platform
          };
          joinAt = new Date();
          console.log(joinAt);
          // Save the new user to the database
          _context.next = 18;
          return _db["default"].query("INSERT INTO user (id, name, phone, email, password, platform, joinAt) VALUES (?, ?, ?, ?,?,?,?)", [newUser.id, newUser.name, newUser.phone, newUser.email, newUser.password, newUser.platform, joinAt]);
        case 18:
          _yield$pool$query3 = _context.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          result = _yield$pool$query4[0];
          console.log("User created successfully");
          transporter = _nodemailer["default"].createTransport({
            host: 'smtp.gmail.com',
            // Replace with your email service provider's SMTP host
            port: 465,
            // Replace with your email service provider's SMTP port
            secure: true,
            // Use TLS for secure connection
            auth: {
              user: 'mailserver@flyfarladies.com',
              // Replace with your email address
              pass: 'xnha yytx rnjc cvcl' // Replace with your email password
            }
          });
          _date = new Date();
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
          formattedDate = _date.toLocaleString('en-BD', options);
          mailOptions = {
            from: 'mailserver@flyfarladies.com',
            // Replace with your email address
            to: email,
            // Recipient's email address
            subject: 'Welcome To Fly Far Ladies',
            text: 'Congrats! your Registration has been Completed ',
            html: "<!DOCTYPE html>\n        <html lang=\"en\">\n          <head>\n            <meta charset=\"UTF-8\" />\n            <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n            <title>Deposit Request</title>\n          </head>\n          <body>\n            <div style=\"width: 700px; height: 100vh; margin: 0 auto\">\n              <div style=\"width: 700px; height: 70px; background: #fe99a6\">\n                <table\n                  border=\"0\"\n                  cellpadding=\"0\"\n                  cellspacing=\"0\"\n                  align=\"center\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    padding: 0;\n                    width: 700px;\n                  \"\n                >\n                  <tr>\n                    <td\n                      align=\"center\"\n                      valign=\"top\"\n                      style=\"\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        color: #ffffff;\n                        font-family: sans-serif;\n                        font-size: 15px;\n                        line-height: 38px;\n                        padding: 20px 0 20px 0;\n                        text-transform: uppercase;\n                        letter-spacing: 5px;\n                      \"\n                    >\n                      Welcome to Fly Far ladies\n                    </td>\n                  </tr>\n                </table>\n        \n                <table\n                  border=\"0\"\n                  cellpadding=\"0\"\n                  cellspacing=\"0\"\n                  align=\"center\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    padding: 0;\n                    width: 700px;\n                  \"\n                >\n                  <tr>\n                    <td\n                      valign=\"top\"\n                      style=\"\n                        background-color: #efefef;\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        color: #584660;\n                        font-family: sans-serif;\n                        font-size: 30px;\n                        font-weight: 500;\n                        line-height: 38px;\n                        padding: 20px 40px 0px 55px;\n                      \"\n                    >\n                      ".concat(name, "\n                    </td>\n                  </tr>\n                  <tr>\n                    <td\n                      valign=\"top\"\n                      style=\"\n                        background-color: #efefef;\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        color: #bc6277;\n                        font-family: sans-serif;\n                        font-size: 17px;\n                        font-weight: 500;\n                        line-height: 38px;\n                        padding: 0px 40px 20px 55px;\n                      \"\n                    >\n                    ").concat(formattedDate, "\n                    </td>\n                  </tr>\n                </table>\n        \n                <table\n                border=\"0\"\n                cellpadding=\"0\"\n                cellspacing=\"0\"\n                align=\"center\"\n                style=\"\n                  border-collapse: collapse;\n                  border-spacing: 0;\n                  padding: 0;\n                  width: 700px;\n                  background: #ffffff\"\n                \"\n              >\n                <tr>\n                  <td\n                    align=\"center\"\n                    valign=\"top\"\n                    style=\"\n                      border-collapse: collapse;\n                      border-spacing: 0;\n                      /* color: #BC6277; */\n                      color: #584660;\n        \n                      font-weight: 600;\n                      font-family: sans-serif;\n                      font-size: 15px;\n                      line-height: 38px;\n                      padding: 20px 0 20px 0;\n                    \"\n                  >\n          \n                  </td>\n                </tr>\n              </table>\n        \n                <table\n                  border=\"0\"\n                  cellpadding=\"0\"\n                  cellspacing=\"0\"\n                  align=\"center\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    padding: 0;\n                    width: 620px;\n                    background-color: #ffffff;\n                  \"\n                >\n                  <tr>\n                    <td\n                      valign=\"top\"\n                      style=\"\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        color: #bc6277;\n                        font-family: sans-serif;\n                        font-size: 15px;\n                        font-weight: 600;\n                        line-height: 38px;\n                        padding: 10px 20px 5px 20px;\n                      \"\n                    >\n                      User Details\n                    </td>\n                  </tr>\n        \n                  <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                    <td\n                      valign=\"top\"\n                      style=\"\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        color: #767676;\n                        font-family: sans-serif;\n                        font-size: 14px;\n                        font-weight: 500;\n                        line-height: 38px;\n                        padding: 5px 20px;\n                        width: 180px;\n                      \"\n                    >\n                      Username\n                    </td>\n                    <td\n                      valign=\"top\"\n                      style=\"\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        color: #767676;\n                        font-family: sans-serif;\n                        font-size: 14px;\n                        font-weight: 500;\n                        line-height: 38px;\n                        padding: 5px 20px;\n                      \"\n                    >\n                      ").concat(name, "\n                    </td>\n                  </tr>\n                  <tr style=\"border-bottom: 1px solid #dfdfdf\">\n                    <td\n                      valign=\"top\"\n                      style=\"\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        color: #767676;\n                        font-family: sans-serif;\n                        font-size: 14px;\n                        font-weight: 500;\n                        line-height: 38px;\n                        padding: 5px 20px;\n                        width: 180px;\n                      \"\n                    >\n                      Password\n                    </td>\n                    <td\n                      valign=\"top\"\n                      style=\"\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        color: #767676;\n                        font-family: sans-serif;\n                        font-size: 14px;\n                        font-weight: 500;\n                        line-height: 38px;\n                        padding: 5px 20px;\n                      \"\n                    >\n                      ").concat(password, "\n                    </td>\n                  </tr>\n                </table>\n        \n                <table\n                  border=\"0\"\n                  cellpadding=\"0\"\n                  cellspacing=\"0\"\n                  align=\"center\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    padding: 0;\n                    width: 670px;\n                    background-color: #702c8b;\n                    margin-top: 25px;\n                    text-align: center;\n                    color: #ffffff !important;\n                    text-decoration: none !important;\n                  \"\n                >\n                  <tr>\n                    <td\n                      valign=\"top\"\n                      style=\"\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        font-family: sans-serif;\n                        font-size: 16px;\n                        font-weight: 500;\n                        padding: 20px 20px 0px 20px;\n                      \"\n                    >\n                      Need more help?\n                    </td>\n                  </tr>\n        \n                  <tr>\n                    <td\n                      valign=\"top\"\n                      style=\"\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        font-family: sans-serif;\n                        font-size: 12px;\n                        font-weight: 500;\n                        line-height: 38px;\n                        padding: 0px 20px 10px 20px;\n                      \"\n                    >\n                      Mail us at\n                      <span style=\"color: #ffffff !important; text-decoration: none\"\n                        >support@flyfarladies.com</span\n                      >\n                      or Call us at +88 01755582111\n                    </td>\n                  </tr>\n                </table>\n        \n                <table\n                  border=\"0\"\n                  cellpadding=\"0\"\n                  cellspacing=\"0\"\n                  align=\"left\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    padding: 0;\n                    width: 420px;\n                    color: #ffffff;\n                  \"\n                >\n                  <tr>\n                    <td\n                      valign=\"top\"\n                      style=\"\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        font-family: sans-serif;\n                        font-size: 13px;\n                        font-weight: 600;\n                        padding: 20px 0px 0px 45px;\n                        color: #767676;\n                      \"\n                    >\n                      <a\n                        style=\"padding-right: 20px; color: #584660\"\n                        href=\"https://www.flyfarladies.com/termsandcondition\"\n                        >Terms & Conditions</a\n                      >\n        \n                      <a\n                        style=\"padding-right: 20px; color: #584660\"\n                        href=\"https://www.flyfarladies.com/bookingpolicy\"\n                        >Booking Policy</a\n                      >\n        \n                      <a\n                        style=\"padding-right: 20px; color: #584660\"\n                        href=\"https://www.flyfarladies.com/privacypolicy\"\n                        >Privacy Policy</a\n                      >\n                    </td>\n                  </tr>\n                </table>\n        \n                <table\n                  border=\"0\"\n                  cellpadding=\"0\"\n                  cellspacing=\"0\"\n                  style=\"\n                    border-collapse: collapse;\n                    border-spacing: 0;\n                    width: 700px;\n                    color: #702c8b;\n                    margin-top: 85px;\n                  \"\n                >\n                  <tr>\n                    <td style=\"padding-left: 45px\">\n                      <img\n                        style=\"padding-right: 5px\"\n                        src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_facebook.png\"\n                        href=\"https://www.facebook.com/flyfarladies/?ref=page_internal\"\n                        alt=\"\"\n                      />\n                      <img\n                        style=\"padding-right: 5px\"\n                        src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_linkedIn.png\"\n                        href=\"https://www.linkedin.com/company/fly-far-ladies/\"\n                        alt=\"\"\n                      />\n                      <img\n                        style=\"padding-right: 5px\"\n                        src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_whatsapp.png\"\n                        href=\"https://wa.me/+88 01755582111\"\n                        alt=\"\"\n                      />\n                    </td>\n                  </tr>\n        \n                  <tr>\n                    <td\n                      style=\"\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        font-family: sans-serif;\n                        font-size: 13px;\n                        font-weight: 500;\n                        padding: 5px 0px 0px 45px;\n                        color: #767676;\n                        padding-bottom: 2px;\n                      \"\n                    >\n                      Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229.\n                    </td>\n        \n                    <td\n                      style=\"\n                        border-collapse: collapse;\n                        border-spacing: 0;\n                        font-family: sans-serif;\n                        font-weight: 500;\n                        color: #767676;\n                        padding-bottom: 20px;\n                      \"\n                    >\n                      <img\n                        width=\"100px\"\n                        src=\"https://ladiescdn.sgp1.cdn.digitaloceanspaces.com/ffl_logo.png\"\n                        href=\"https://www.flyfarladies.com/\"\n                        alt=\"\"\n                      />\n                    </td>\n                  </tr>\n                </table>\n              </div>\n            </div>\n          </body>\n        </html>\n        ")
          };
          _context.next = 29;
          return transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 29:
          ;
          return _context.abrupt("return", result && res.status(200).send({
            success: true,
            message: "Register successfully",
            data: result
          }));
        case 33:
          _context.prev = 33;
          _context.t0 = _context["catch"](0);
          console.error("Error creating user:", _context.t0);
          res.status(500).json({
            error: "Error creating user"
          });
        case 37:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 33]]);
  }));
  return function Register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
function verifyToken(req, res, next) {
  var token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.status(_httpStatus["default"].UNAUTHORIZED).json({
      success: false,
      status: _httpStatus["default"].UNAUTHORIZED,
      error: "Unauthorized",
      message: "Please log in"
    });
  }
  try {
    // Verify the JWT token
    var decoded = _jsonwebtoken["default"].verify(token, "helloladies");
    // Check if the user exists in your database using the decoded token information
    var user = decoded.id; // Replace with your actual function to fetch the user by ID
    if (!user) {
      return res.status(_httpStatus["default"].UNAUTHORIZED).json({
        success: false,
        status: _httpStatus["default"].UNAUTHORIZED,
        error: "Unauthorized",
        message: "User not found"
      });
    }

    // Attach the user information to the request object
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({
        error: "Token is invalid"
      });
    } else if (err.name === "TokenExpiredError") {
      return res.status(403).json({
        error: "Token has expired"
      });
    } else {
      return res.status(500).json({
        error: "Internal server error"
      });
    }
  }
}
var _default = exports["default"] = verifyToken;
var login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, email, password, hashedPassword, _yield$pool$query5, _yield$pool$query6, user, token;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Extract the data from the request body
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Do some validation on the data
          if (!(!email || !password)) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: "Missing required fields"
          }));
        case 4:
          // Hash the password to compare with the stored hashed password
          hashedPassword = _crypto["default"].createHash('sha256').update(password).digest('hex'); // Check if the user exists with the provided email and hashed password
          _context2.next = 7;
          return _db["default"].query("SELECT * FROM user WHERE email = ? AND password = ?", [email, hashedPassword]);
        case 7:
          _yield$pool$query5 = _context2.sent;
          _yield$pool$query6 = _slicedToArray(_yield$pool$query5, 1);
          user = _yield$pool$query6[0];
          if (!(user.length === 0)) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            error: "Invalid email or password"
          }));
        case 12:
          // if (user.isactive == 0) {
          //   return res.status(401).json({ error: " your id has been deactivated" });
          // }
          // Generate JWT token
          token = _jsonwebtoken["default"].sign({
            id: user[0].id,
            email: user[0].email
          }, "helloladies", {
            expiresIn: "15d"
          }); // Update the user table with the token
          _context2.next = 15;
          return _db["default"].query("UPDATE user SET token = ? WHERE id = ?", [token, user[0].id]);
        case 15:
          console.log("User login successful");
          return _context2.abrupt("return", res.status(200).json({
            status: "success",
            message: "Login successful",
            user: user[0],
            token: token
          }));
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          console.error("Error during login:", _context2.t0);
          res.status(500).json({
            error: "Error during login"
          });
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 19]]);
  }));
  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var loginwithGoogle = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var email, _yield$pool$query7, _yield$pool$query8, user, token;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Extract the data from the request body
          email = req.body.email; // Do some validation on the data
          if (email) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: "Missing required fields"
          }));
        case 4:
          _context3.next = 6;
          return _db["default"].query("SELECT * FROM user WHERE email = ?", [email]);
        case 6:
          _yield$pool$query7 = _context3.sent;
          _yield$pool$query8 = _slicedToArray(_yield$pool$query7, 1);
          user = _yield$pool$query8[0];
          if (!(user.length === 0)) {
            _context3.next = 11;
            break;
          }
          return _context3.abrupt("return", res.status(401).json({
            error: "Invalid email or password"
          }));
        case 11:
          // Generate JWT token
          token = _jsonwebtoken["default"].sign({
            id: user[0].id,
            email: user[0].email
          }, "helloladies", {
            expiresIn: "15d"
          }); // Update the user table with the token
          _context3.next = 14;
          return _db["default"].query("UPDATE user SET token = ? WHERE id = ?", [token, user[0].id]);
        case 14:
          console.log("User login successful");
          return _context3.abrupt("return", res.status(200).json({
            status: "success",
            message: "Login successful",
            user: user[0],
            token: token
          }));
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          console.error("Error during login:", _context3.t0);
          res.status(500).json({
            error: "Error during login"
          });
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function loginwithGoogle(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Define a schema for the request body
var userSchema = (0, _zod.object)({
  nameTitle: (0, _zod.string)(),
  name: (0, _zod.string)(),
  firstName: (0, _zod.string)(),
  lastName: (0, _zod.string)(),
  email: (0, _zod.string)().email(),
  password: (0, _zod.string)(),
  phone: (0, _zod.string)(),
  userType: (0, _zod.string)(),
  dob: (0, _zod.string)(),
  gender: (0, _zod.string)(),
  isactive: (0, _zod["boolean"])(),
  profession: (0, _zod.string)(),
  nationality: (0, _zod.string)(),
  nid: (0, _zod.string)(),
  passportNumber: (0, _zod.string)(),
  passportExpireDate: (0, _zod.string)(),
  facebookId: (0, _zod.string)(),
  whatsApp: (0, _zod.string)(),
  linkedIn: (0, _zod.string)()
}).partial();
var updateUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, table, updateQuery, _yield$pool$query9, _yield$pool$query10, updateData;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          table = "user"; // Validate the request body against the schema
          req.body = userSchema.parse(req.body);
          if (req.publicImageLink) req.body.passport_copy = req.publicImageLink;
          updateQuery = "\n            UPDATE ".concat(table, "\n            SET ?\n            WHERE id = ?;\n        "); // Execute the update query with the validated data
          _context4.next = 8;
          return _db["default"].query(updateQuery, [req.body, id]);
        case 8:
          _yield$pool$query9 = _context4.sent;
          _yield$pool$query10 = _slicedToArray(_yield$pool$query9, 1);
          updateData = _yield$pool$query10[0];
          console.log(updateData);
          return _context4.abrupt("return", res.status(200).json({
            status: "success",
            message: "User updated successfully"
          }));
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          console.error("Error updating user:", _context4.t0);
          res.status(500).json({
            error: "Error updating user"
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function updateUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var userdashBoard = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, userQuery, _yield$pool$query11, _yield$pool$query12, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          userQuery = "SELECT * FROM user WHERE id=?";
          _context5.next = 5;
          return _db["default"].query(userQuery, [id]);
        case 5:
          _yield$pool$query11 = _context5.sent;
          _yield$pool$query12 = _slicedToArray(_yield$pool$query11, 1);
          result = _yield$pool$query12[0];
          return _context5.abrupt("return", result);
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function userdashBoard(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var allUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var userQuery, _yield$pool$query13, _yield$pool$query14, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userQuery = "SELECT * FROM user";
          _context6.next = 4;
          return _db["default"].query(userQuery);
        case 4:
          _yield$pool$query13 = _context6.sent;
          _yield$pool$query14 = _slicedToArray(_yield$pool$query13, 1);
          result = _yield$pool$query14[0];
          return _context6.abrupt("return", res.send({
            data: result
          }));
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function allUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var addtravler = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req) {
    var userid, travelers, results, _iterator, _step, traveler, partnerId, first_name, last_name, gender, dob, nationality, passport_number, passport_ex_date, email, phone, pax_type, query, values, _yield$pool$query15, _yield$pool$query16, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userid = req.params.id;
          travelers = req.body.travelers; // Assuming req.body.travelers is an array of traveler objects
          results = [];
          _iterator = _createForOfIteratorHelper(travelers);
          _context7.prev = 5;
          _iterator.s();
        case 7:
          if ((_step = _iterator.n()).done) {
            _context7.next = 21;
            break;
          }
          traveler = _step.value;
          partnerId = TravellerId();
          first_name = traveler.first_name, last_name = traveler.last_name, gender = traveler.gender, dob = traveler.dob, nationality = traveler.nationality, passport_number = traveler.passport_number, passport_ex_date = traveler.passport_ex_date, email = traveler.email, phone = traveler.phone, pax_type = traveler.pax_type;
          query = "INSERT INTO travel_partners (\n        partnerId,\n        user_id,\n        first_name,\n        last_name,\n        gender,\n        dob,\n        nationality,\n        passport_number,\n        passport_ex_date,\n        email,\n        phone,\n        pax_type\n      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          values = [partnerId, userid, first_name, last_name, gender, dob, nationality, passport_number, passport_ex_date, email, phone, pax_type];
          _context7.next = 15;
          return _db["default"].query(query, values);
        case 15:
          _yield$pool$query15 = _context7.sent;
          _yield$pool$query16 = _slicedToArray(_yield$pool$query15, 1);
          result = _yield$pool$query16[0];
          results.push(result);
        case 19:
          _context7.next = 7;
          break;
        case 21:
          _context7.next = 26;
          break;
        case 23:
          _context7.prev = 23;
          _context7.t0 = _context7["catch"](5);
          _iterator.e(_context7.t0);
        case 26:
          _context7.prev = 26;
          _iterator.f();
          return _context7.finish(26);
        case 29:
          return _context7.abrupt("return", results);
        case 32:
          _context7.prev = 32;
          _context7.t1 = _context7["catch"](0);
          console.log(_context7.t1);
          throw _context7.t1;
        case 36:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 32], [5, 23, 26, 29]]);
  }));
  return function addtravler(_x13) {
    return _ref7.apply(this, arguments);
  };
}();
var travelerSchema = (0, _zod.object)({
  first_name: (0, _zod.string)(),
  last_name: (0, _zod.string)(),
  gender: (0, _zod.string)(),
  dob: (0, _zod.date)(),
  nationality: (0, _zod.string)(),
  passport_number: (0, _zod.string)(),
  passport_ex_date: (0, _zod.date)(),
  email: (0, _zod.string)().email(),
  phone: (0, _zod.string)(),
  pax_type: (0, _zod.string)()
}).partial();
var updateTraveler = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var partnerId, table, updateQuery, _yield$pool$query17, _yield$pool$query18, updateData;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          partnerId = req.params.partnerId;
          table = "travel_partners"; // Validate the request body against the schema
          req.body = travelerSchema.parse(req.body);
          if (req.publicImageLink) req.body.passport_copy = req.publicImageLink;
          console.log(req.publicImageLink);
          updateQuery = "\n        UPDATE ".concat(table, "\n        SET ?\n        WHERE partnerId = ?;\n    "); // Execute the update query with the validated data
          _context8.next = 9;
          return _db["default"].query(updateQuery, [req.body, partnerId]);
        case 9:
          _yield$pool$query17 = _context8.sent;
          _yield$pool$query18 = _slicedToArray(_yield$pool$query17, 1);
          updateData = _yield$pool$query18[0];
          return _context8.abrupt("return", updateData);
        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          console.error("Error updating user:", _context8.t0);
          res.status(500).json({
            error: "Error updating user"
          });
        case 19:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 15]]);
  }));
  return function updateTraveler(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var myTravelerList = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var userid, query, _yield$pool$query19, _yield$pool$query20, result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          userid = req.params.user_id;
          query = "SELECT * FROM travel_partners WHERE user_id = ?";
          _context9.next = 5;
          return _db["default"].query(query, [userid]);
        case 5:
          _yield$pool$query19 = _context9.sent;
          _yield$pool$query20 = _slicedToArray(_yield$pool$query19, 1);
          result = _yield$pool$query20[0];
          if (!(result.length === 0)) {
            _context9.next = 10;
            break;
          }
          throw new _expressSharp.HttpException("no traveler list", _httpStatus["default"].BAD_REQUEST);
        case 10:
          return _context9.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            data: result
          }));
        case 13:
          _context9.prev = 13;
          _context9.t0 = _context9["catch"](0);
          console.log();
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 13]]);
  }));
  return function myTravelerList(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();
var deleteTraveller = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var partnerId, query, _yield$pool$query21, _yield$pool$query22, result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          partnerId = req.params.partnerId;
          query = "DELETE FROM travel_partners WHERE  partnerId = ?";
          _context10.next = 5;
          return _db["default"].query(query, [partnerId]);
        case 5:
          _yield$pool$query21 = _context10.sent;
          _yield$pool$query22 = _slicedToArray(_yield$pool$query21, 1);
          result = _yield$pool$query22[0];
          return _context10.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            data: result
          }));
        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](0);
          console.log();
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 11]]);
  }));
  return function deleteTraveller(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();
var deleteUser = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var partnerId, query, _yield$pool$query23, _yield$pool$query24, result;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          partnerId = req.params.id;
          query = "DELETE FROM user WHERE  id = ?";
          console.log(partnerId);
          _context11.next = 6;
          return _db["default"].query(query, [partnerId]);
        case 6:
          _yield$pool$query23 = _context11.sent;
          _yield$pool$query24 = _slicedToArray(_yield$pool$query23, 1);
          result = _yield$pool$query24[0];
          return _context11.abrupt("return", res.status(200).json({
            success: true,
            status: _httpStatus["default"].OK,
            message: "user has deleted"
          }));
        case 12:
          _context11.prev = 12;
          _context11.t0 = _context11["catch"](0);
          console.log();
        case 15:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 12]]);
  }));
  return function deleteUser(_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();
var forgetpasswordResetRequest = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var email, _yield$pool$query25, _yield$pool$query26, user, token, resetLink, mailOptions, transporter;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          email = req.body.email; // Check if the user with the provided email exists
          _context12.next = 4;
          return _db["default"].query("SELECT * FROM user WHERE email = ?", [email]);
        case 4:
          _yield$pool$query25 = _context12.sent;
          _yield$pool$query26 = _slicedToArray(_yield$pool$query25, 1);
          user = _yield$pool$query26[0];
          if (!(user.length === 0)) {
            _context12.next = 9;
            break;
          }
          throw new Error('User not found with this email');
        case 9:
          // Generate a random token
          token = _crypto["default"].randomBytes(32).toString('hex'); // Save the token in the database
          _context12.next = 12;
          return _db["default"].query("INSERT INTO reset_password (email, token) VALUES (?, ?)", [email, token]);
        case 12:
          // Construct the password reset link
          resetLink = "https://www.flyfarladies.com/resetpassword?token=".concat(token);
          mailOptions = {
            from: 'mailserver@flyfarladies.com',
            // Replace with your email address
            to: email,
            // Recipient's email address
            subject: 'password reset',
            text: 'please go through this link and update your password',
            html: "Click <a href=\"".concat(resetLink, "\">here</a> to reset your password")
          };
          transporter = _nodemailer["default"].createTransport({
            host: 'smtp.gmail.com',
            // Replace with your email service provider's SMTP host
            port: 465,
            // Replace with your email service provider's SMTP port
            secure: true,
            // Use TLS for secure connection
            auth: {
              user: 'mailserver@flyfarladies.com',
              // Replace with your email address
              pass: 'xnha yytx rnjc cvcl' // Replace with your email password
            }
          });
          _context12.next = 17;
          return transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 17:
          return _context12.abrupt("return", res.status(200).json({
            status: 'success',
            token: token,
            message: 'Password reset link sent successfully'
          }));
        case 20:
          _context12.prev = 20;
          _context12.t0 = _context12["catch"](0);
          console.error('Error sending password reset link:', _context12.t0);
          return _context12.abrupt("return", res.status(500).json({
            error: 'Internal server error'
          }));
        case 24:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 20]]);
  }));
  return function forgetpasswordResetRequest(_x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}();
var resetPassword = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var _req$body3, token, password, confirm_Password, restequery, _yield$pool$query27, _yield$pool$query28, passwordReset, userquery, _yield$pool$query29, _yield$pool$query30, user, userid, hashedPassword;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _req$body3 = req.body, token = _req$body3.token, password = _req$body3.password, confirm_Password = _req$body3.confirm_Password;
          if (!(password !== confirm_Password)) {
            _context13.next = 4;
            break;
          }
          throw new Error('Passwords do not match');
        case 4:
          // Find password reset request by token
          restequery = "SELECT * FROM reset_password WHERE token = ?";
          _context13.next = 7;
          return _db["default"].query(restequery, [token]);
        case 7:
          _yield$pool$query27 = _context13.sent;
          _yield$pool$query28 = _slicedToArray(_yield$pool$query27, 1);
          passwordReset = _yield$pool$query28[0];
          if (passwordReset) {
            _context13.next = 12;
            break;
          }
          throw new Error('Invalid token');
        case 12:
          console.log(passwordReset);

          // Find user by email
          userquery = "SELECT * FROM user WHERE email = ?";
          _context13.next = 16;
          return _db["default"].query(userquery, [passwordReset[0].email]);
        case 16:
          _yield$pool$query29 = _context13.sent;
          _yield$pool$query30 = _slicedToArray(_yield$pool$query29, 1);
          user = _yield$pool$query30[0];
          if (user) {
            _context13.next = 21;
            break;
          }
          throw new Error('User not found');
        case 21:
          userid = user[0].id; // Hash the new password
          hashedPassword = _crypto["default"].createHash('sha256').update(password).digest('hex'); // Update user's password
          _context13.next = 25;
          return _db["default"].query("UPDATE user SET password = ? WHERE id= ?", [hashedPassword, userid]);
        case 25:
          _context13.next = 27;
          return _db["default"].query("DELETE FROM reset_password WHERE token = ?", [token]);
        case 27:
          return _context13.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Password updated successfully'
          }));
        case 30:
          _context13.prev = 30;
          _context13.t0 = _context13["catch"](0);
          console.error('Error updating password:', _context13.t0);
          return _context13.abrupt("return", res.status(500).json({
            error: 'Internal server error'
          }));
        case 34:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 30]]);
  }));
  return function resetPassword(_x24, _x25) {
    return _ref13.apply(this, arguments);
  };
}();
var UserService = exports.UserService = {
  Register: Register,
  login: login,
  loginwithGoogle: loginwithGoogle,
  deleteUser: deleteUser,
  forgetpasswordResetRequest: forgetpasswordResetRequest,
  resetPassword: resetPassword,
  allUser: allUser,
  updateUser: updateUser,
  userdashBoard: userdashBoard,
  addtravler: addtravler,
  updateTraveler: updateTraveler,
  myTravelerList: myTravelerList,
  deleteTraveller: deleteTraveller
};