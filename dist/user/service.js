"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _db = _interopRequireDefault(require("../database/db"));
var _zod = require("zod");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
    var _req$body, name, phone, email, password, platform, _yield$pool$query, _yield$pool$query2, existingUser, id, newUser, joinAt, _yield$pool$query3, _yield$pool$query4, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Extract the data from the request body
          _req$body = req.body, name = _req$body.name, phone = _req$body.phone, email = _req$body.email, password = _req$body.password, platform = _req$body.platform; // Do some validation on the data
          if (!(!name || !email || !password || !phone || !platform)) {
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
          id = generateUserId(); // Create a new user object with the provided data
          newUser = {
            id: id,
            name: name,
            phone: phone,
            email: email,
            password: password,
            platform: platform,
            joinAt: joinAt
          };
          joinAt = new Date();
          console.log(joinAt);
          // Save the new user to the database
          _context.next = 17;
          return _db["default"].query("INSERT INTO user (id, name, phone, email, password, platform, joinAt) VALUES (?, ?, ?, ?,?,?,?)", [newUser.id, newUser.name, newUser.phone, newUser.email, newUser.password, newUser.platform, joinAt]);
        case 17:
          _yield$pool$query3 = _context.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          result = _yield$pool$query4[0];
          console.log("User created successfully");
          return _context.abrupt("return", result && res.status(200).send({
            success: true,
            message: 'Register successfully',
            data: result
          }));
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          console.error("Error creating user:", _context.t0);
          res.status(500).json({
            error: "Error creating user"
          });
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 24]]);
  }));
  return function Register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, email, password, _yield$pool$query5, _yield$pool$query6, user, token;
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
          _context2.next = 6;
          return _db["default"].query("SELECT * FROM user WHERE email = ? AND password = ?", [email, password]);
        case 6:
          _yield$pool$query5 = _context2.sent;
          _yield$pool$query6 = _slicedToArray(_yield$pool$query5, 1);
          user = _yield$pool$query6[0];
          console.log(user);
          if (!(user.length === null)) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            error: "Invalid email or password"
          }));
        case 12:
          // Generate JWT token
          token = _jsonwebtoken["default"].sign({
            id: user[0].id,
            email: user[0].email
          }, "helloladies", {
            expiresIn: "1h"
          });
          console.log(token);

          // Update the user table with the token
          _context2.next = 16;
          return _db["default"].query("UPDATE user SET token = ? WHERE id = ?", [token, user[0].id]);
        case 16:
          console.log("User login successful");
          return _context2.abrupt("return", res.status(200).json({
            status: "success",
            message: "Login successful",
            user: user[0],
            token: token
          }));
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          console.error("Error during login:", _context2.t0);
          res.status(500).json({
            error: "Error during login"
          });
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 20]]);
  }));
  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Define a schema for the request body
var userSchema = (0, _zod.object)({
  email: (0, _zod.string)().email(),
  password: (0, _zod.string)(),
  phone: (0, _zod.string)(),
  userType: (0, _zod.string)(),
  dob: (0, _zod.date)(),
  gender: (0, _zod.string)(),
  isactive: (0, _zod["boolean"])(),
  profession: (0, _zod.string)(),
  nationality: (0, _zod.string)(),
  nid: (0, _zod.string)(),
  passportNumber: (0, _zod.string)(),
  passportExpireDate: (0, _zod.date)(),
  facebookId: (0, _zod.string)(),
  whatsApp: (0, _zod.string)(),
  linkedIn: (0, _zod.string)()
}).partial();
var updateUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, table, updateQuery, _yield$pool$query7, _yield$pool$query8, updateData;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          table = 'user'; // Validate the request body against the schema
          req.body = userSchema.parse(req.body);
          if (req.publicImageLink) req.body.passport_copy = req.publicImageLink;
          updateQuery = "\n            UPDATE ".concat(table, "\n            SET ?\n            WHERE id = ?;\n        "); // Execute the update query with the validated data
          _context3.next = 8;
          return _db["default"].query(updateQuery, [req.body, id]);
        case 8:
          _yield$pool$query7 = _context3.sent;
          _yield$pool$query8 = _slicedToArray(_yield$pool$query7, 1);
          updateData = _yield$pool$query8[0];
          console.log(updateData);
          return _context3.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'User updated successfully'
          }));
        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          console.error("Error updating user:", _context3.t0);
          res.status(500).json({
            error: "Error updating user"
          });
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 15]]);
  }));
  return function updateUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var userdashBoard = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, userQuery, _yield$pool$query9, _yield$pool$query10, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          userQuery = "SELECT * FROM user WHERE id=?";
          _context4.next = 5;
          return _db["default"].query(userQuery, [id]);
        case 5:
          _yield$pool$query9 = _context4.sent;
          _yield$pool$query10 = _slicedToArray(_yield$pool$query9, 1);
          result = _yield$pool$query10[0];
          return _context4.abrupt("return", result);
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function userdashBoard(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var addtravler = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req) {
    var userid, travelers, results, _iterator, _step, traveler, partnerId, first_name, last_name, gender, dob, nationality, passport_number, passport_ex_date, email, phone, pax_type, query, values, _yield$pool$query11, _yield$pool$query12, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userid = req.params.id;
          travelers = req.body.travelers; // Assuming req.body.travelers is an array of traveler objects
          results = [];
          _iterator = _createForOfIteratorHelper(travelers);
          _context5.prev = 5;
          _iterator.s();
        case 7:
          if ((_step = _iterator.n()).done) {
            _context5.next = 21;
            break;
          }
          traveler = _step.value;
          partnerId = TravellerId();
          first_name = traveler.first_name, last_name = traveler.last_name, gender = traveler.gender, dob = traveler.dob, nationality = traveler.nationality, passport_number = traveler.passport_number, passport_ex_date = traveler.passport_ex_date, email = traveler.email, phone = traveler.phone, pax_type = traveler.pax_type;
          query = "INSERT INTO travel_partners (\n        partnerId,\n        user_id,\n        first_name,\n        last_name,\n        gender,\n        dob,\n        nationality,\n        passport_number,\n        passport_ex_date,\n        email,\n        phone,\n        pax_type\n      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          values = [partnerId, userid, first_name, last_name, gender, dob, nationality, passport_number, passport_ex_date, email, phone, pax_type];
          _context5.next = 15;
          return _db["default"].query(query, values);
        case 15:
          _yield$pool$query11 = _context5.sent;
          _yield$pool$query12 = _slicedToArray(_yield$pool$query11, 1);
          result = _yield$pool$query12[0];
          results.push(result);
        case 19:
          _context5.next = 7;
          break;
        case 21:
          _context5.next = 26;
          break;
        case 23:
          _context5.prev = 23;
          _context5.t0 = _context5["catch"](5);
          _iterator.e(_context5.t0);
        case 26:
          _context5.prev = 26;
          _iterator.f();
          return _context5.finish(26);
        case 29:
          return _context5.abrupt("return", results);
        case 32:
          _context5.prev = 32;
          _context5.t1 = _context5["catch"](0);
          console.log(_context5.t1);
          throw _context5.t1;
        case 36:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 32], [5, 23, 26, 29]]);
  }));
  return function addtravler(_x9) {
    return _ref5.apply(this, arguments);
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
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var partnerId, table, updateQuery, _yield$pool$query13, _yield$pool$query14, updateData;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          partnerId = req.params.partnerId;
          table = 'travel_partners'; // Validate the request body against the schema
          req.body = travelerSchema.parse(req.body);
          if (req.publicImageLink) req.body.passport_copy = req.publicImageLink;
          console.log(req.publicImageLink);
          updateQuery = "\n        UPDATE ".concat(table, "\n        SET ?\n        WHERE partnerId = ?;\n    "); // Execute the update query with the validated data
          _context6.next = 9;
          return _db["default"].query(updateQuery, [req.body, partnerId]);
        case 9:
          _yield$pool$query13 = _context6.sent;
          _yield$pool$query14 = _slicedToArray(_yield$pool$query13, 1);
          updateData = _yield$pool$query14[0];
          return _context6.abrupt("return", updateData);
        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](0);
          console.error("Error updating user:", _context6.t0);
          res.status(500).json({
            error: "Error updating user"
          });
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 15]]);
  }));
  return function updateTraveler(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
var myTravelerList = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var userid, query, _yield$pool$query15, _yield$pool$query16, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userid = req.params.user_id;
          query = "SELECT * FROM travel_partners WHERE user_id = ?";
          _context7.next = 5;
          return _db["default"].query(query, [userid]);
        case 5:
          _yield$pool$query15 = _context7.sent;
          _yield$pool$query16 = _slicedToArray(_yield$pool$query15, 1);
          result = _yield$pool$query16[0];
          return _context7.abrupt("return", res.status(200).json({
            success: true,
            status: httpStatus.OK,
            data: result
          }));
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.log();
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 11]]);
  }));
  return function myTravelerList(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
var deleteTraveller = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var partnerId, query, _yield$pool$query17, _yield$pool$query18, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          partnerId = req.params.partnerId;
          query = "DELETE FROM travel_partners WHERE  partnerId = ?";
          _context8.next = 5;
          return _db["default"].query(query, [partnerId]);
        case 5:
          _yield$pool$query17 = _context8.sent;
          _yield$pool$query18 = _slicedToArray(_yield$pool$query17, 1);
          result = _yield$pool$query18[0];
          return _context8.abrupt("return", res.status(200).json({
            success: true,
            status: httpStatus.OK,
            data: result
          }));
        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          console.log();
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 11]]);
  }));
  return function deleteTraveller(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var UserService = exports.UserService = {
  Register: Register,
  login: login,
  updateUser: updateUser,
  userdashBoard: userdashBoard,
  addtravler: addtravler,
  updateTraveler: updateTraveler,
  myTravelerList: myTravelerList,
  deleteTraveller: deleteTraveller
};