"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookingService = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _expressSharp = require("express-sharp");
var _db = _interopRequireDefault(require("../database/db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var generatebookingId = function generatebookingId() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "FFLB" + Math.floor(Math.random() * 10000);
};
var Book$Hold = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var userid, userQuery, _yield$pool$query, _yield$pool$query2, user, _user$, email, wallet, name, phone, packgeId, packgaeQuery, _yield$pool$query3, _yield$pool$query4, tourpackage, _req$body, adult, child, infant, bookingid, adultTravelersValues, _iterator, _step, adulttraveler, afName, alName, adob, passDate, PassportNumber, Nationality, agender, aPaxType, addpassenger, childTravelersValues, _iterator2, _step2, childtraveler, cfName, clName, cdob, cpassDate, cpassportNumber, cnationality, cgender, cpaxType, addChildPassengerQuery, newTravelerResult, newTravelers, infantTravelersValues, _iterator3, _step3, infanttraveler, ipaxType, ifName, ilName, inationality, igender, idob, ipassDate, ipassportNumber, addInfantPassengerQuery, totaladult, totalchild, totalinfant, adultprice, childprice, infantprice, totalpackageprice, values, _yield$pool$query5, _yield$pool$query6, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userid = req.params.id;
          userQuery = "SELECT * FROM user WHERE id = ?";
          _context.next = 5;
          return _db["default"].query(userQuery, [userid]);
        case 5:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          user = _yield$pool$query2[0];
          if (user) {
            _context.next = 10;
            break;
          }
          throw new _expressSharp.HttpException("User not found with this id=".concat(userid), _httpStatus["default"].BAD_REQUEST);
        case 10:
          _user$ = user[0], email = _user$.email, wallet = _user$.wallet, name = _user$.name, phone = _user$.phone;
          packgeId = req.params.PkID;
          packgaeQuery = "SELECT * FROM tourpackage WHERE PkID = ?";
          _context.next = 15;
          return _db["default"].query(packgaeQuery, [packgeId]);
        case 15:
          _yield$pool$query3 = _context.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          tourpackage = _yield$pool$query4[0];
          if (tourpackage) {
            _context.next = 20;
            break;
          }
          throw new _expressSharp.HttpException("TourPackage not found with this id=".concat(packgeId), _httpStatus["default"].BAD_REQUEST);
        case 20:
          _req$body = req.body, adult = _req$body.adult, child = _req$body.child, infant = _req$body.infant;
          bookingid = generatebookingId();
          if (!(Array.isArray(adult) && adult.length > 0)) {
            _context.next = 29;
            break;
          }
          // Prepare an array to hold all adult traveler values
          adultTravelersValues = [];
          _iterator = _createForOfIteratorHelper(adult);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              adulttraveler = _step.value;
              afName = adulttraveler.afName, alName = adulttraveler.alName, adob = adulttraveler.adob, passDate = adulttraveler.passDate, PassportNumber = adulttraveler.PassportNumber, Nationality = adulttraveler.Nationality, agender = adulttraveler.agender, aPaxType = adulttraveler.aPaxType; // Add current adult traveler's values to the array
              adultTravelersValues.push([aPaxType, afName, alName, Nationality, agender, adob, passDate, PassportNumber, bookingid, userid]);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          addpassenger = "\n          INSERT INTO passenger (paxType, fName, lName, nationality, gender, dob, passDate, passportNumber, bookingid, userid)\n          VALUES ?\n      "; // Execute the SQL query to insert all adult travelers
          _context.next = 29;
          return _db["default"].query(addpassenger, [adultTravelersValues]);
        case 29:
          if (!(Array.isArray(child) && child.length > 0)) {
            _context.next = 39;
            break;
          }
          // Prepare an array to hold all adult traveler values
          childTravelersValues = [];
          _iterator2 = _createForOfIteratorHelper(child);
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              childtraveler = _step2.value;
              cfName = childtraveler.cfName, clName = childtraveler.clName, cdob = childtraveler.cdob, cpassDate = childtraveler.cpassDate, cpassportNumber = childtraveler.cpassportNumber, cnationality = childtraveler.cnationality, cgender = childtraveler.cgender, cpaxType = childtraveler.cpaxType; // Add current adult traveler's values to the array
              childTravelersValues.push([cpaxType, cfName, clName, cnationality, cgender, cdob, cpassDate, cpassportNumber, bookingid, userid]);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          addChildPassengerQuery = "\n      INSERT INTO passenger (paxType, fName, lName, nationality, gender, dob, passDate, passportNumber, bookingid, userid)\n      VALUES ?\n  "; // Execute the SQL query to insert all adult travelers
          _context.next = 36;
          return _db["default"].query(addChildPassengerQuery, [childTravelersValues]);
        case 36:
          newTravelerResult = _context.sent;
          console.log(newTravelerResult);

          // Assuming you need to process the result or do something with it
          newTravelers = newTravelerResult.rows; // Assuming you need to update total amount and push travelers to the array
        case 39:
          if (!(Array.isArray(infant) && infant.length > 0)) {
            _context.next = 46;
            break;
          }
          // Prepare an array to hold all adult traveler values
          infantTravelersValues = [];
          _iterator3 = _createForOfIteratorHelper(infant);
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              infanttraveler = _step3.value;
              ipaxType = infanttraveler.ipaxType, ifName = infanttraveler.ifName, ilName = infanttraveler.ilName, inationality = infanttraveler.inationality, igender = infanttraveler.igender, idob = infanttraveler.idob, ipassDate = infanttraveler.ipassDate, ipassportNumber = infanttraveler.ipassportNumber; // Add current adult traveler's values to the array
              infantTravelersValues.push([ipaxType, ifName, ilName, inationality, igender, idob, ipassDate, ipassportNumber, bookingid, userid]);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          addInfantPassengerQuery = "\n      INSERT INTO passenger (paxType, fName, lName, nationality, gender, dob, passDate, passportNumber, bookingid, userid)\n      VALUES ?\n  "; // Execute the SQL query to insert all adult travelers
          _context.next = 46;
          return _db["default"].query(addInfantPassengerQuery, [infantTravelersValues]);
        case 46:
          totaladult = adult.length;
          totalchild = child.length;
          totalinfant = infant.length;
          adultprice = tourpackage[0].adult_base_price * totaladult;
          childprice = tourpackage[0].child_base_price * totalchild;
          infantprice = tourpackage[0].infant_base_price * totalinfant;
          console.log(adultprice, childprice, infantprice);
          totalpackageprice = adultprice + childprice + infantprice;
          console.log(totalpackageprice);
          values = [bookingid, userid, email, name, wallet, tourpackage[0].PkID, tourpackage[0].MainTitle, tourpackage[0].StartDate, tourpackage[0].EndDate, tourpackage[0].TripType, tourpackage[0].TotalDuration, tourpackage[0].adult_base_price, tourpackage[0].child_base_price, tourpackage[0].infant_base_price, tourpackage[0].booking_money, tourpackage[0].first_installment, tourpackage[0].second_installment, tourpackage[0].booking_money_due_date, tourpackage[0].first_installment_due_date, tourpackage[0].second_installment_due_date, totaladult, totalchild, totalinfant, totalpackageprice];
          console.log(values);
          _context.next = 59;
          return _db["default"].query("INSERT INTO booking (\n        bookingid,\n        userid,\n        email,\n        name,\n        wallet,\n        PkID,\n        MainTitle,\n        StartDate,\n        EndDate,\n        TripType,\n        TotalDuration,\n        adult_base_price,\n        child_base_price,\n        infant_base_price,\n        booking_money,\n        first_installment,\n        second_installment,\n        booking_money_due_date,\n        first_installment_due_date,\n        second_installment_due_date,\n        totaladult,\n        totalchild,\n        totalinfant,\n        totalAmount\n\n      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?)", values);
        case 59:
          _yield$pool$query5 = _context.sent;
          _yield$pool$query6 = _slicedToArray(_yield$pool$query5, 1);
          result = _yield$pool$query6[0];
          console.log(result);
          return _context.abrupt("return", res.status(200).json({
            status: "success",
            message: "Travel package added successfully"
          }));
        case 66:
          _context.prev = 66;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
        case 69:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 66]]);
  }));
  return function Book$Hold(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getAllBooking = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var packagequery, _yield$pool$execute, _yield$pool$execute2, bookingresults;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          packagequery = "SELECT * FROM  booking";
          _context2.next = 3;
          return _db["default"].execute(packagequery);
        case 3:
          _yield$pool$execute = _context2.sent;
          _yield$pool$execute2 = _slicedToArray(_yield$pool$execute, 1);
          bookingresults = _yield$pool$execute2[0];
          console.log(bookingresults);
          return _context2.abrupt("return", bookingresults);
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getAllBooking(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getSingleBooking = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var bookingid, bookingequery, _yield$pool$execute3, _yield$pool$execute4, bookingresults, data, passengerquery, _yield$pool$execute5, _yield$pool$execute6, passengerresults;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          bookingid = req.params.bookingid;
          bookingequery = "SELECT * FROM  booking WHERE bookingid =?";
          _context3.next = 4;
          return _db["default"].execute(bookingequery, [bookingid]);
        case 4:
          _yield$pool$execute3 = _context3.sent;
          _yield$pool$execute4 = _slicedToArray(_yield$pool$execute3, 1);
          bookingresults = _yield$pool$execute4[0];
          // JOIN tourpackage ON mainimage.packageId = tourpackage.PkID
          // WHERE mainimage.packageId = ?; 
          data = "SELECT * FROM passenger  WHERE bookingid =?";
          passengerquery = "SELECT * FROM passenger JOIN booking ON passenger.bookingid =  booking.bookingid WHERE passenger.bookingid =?";
          _context3.next = 11;
          return _db["default"].execute(data, [bookingid]);
        case 11:
          _yield$pool$execute5 = _context3.sent;
          _yield$pool$execute6 = _slicedToArray(_yield$pool$execute5, 1);
          passengerresults = _yield$pool$execute6[0];
          console.log(bookingresults);
          return _context3.abrupt("return", {
            bookingresults: bookingresults,
            passengerresults: passengerresults
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getSingleBooking(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var BookingService = exports.BookingService = {
  Book$Hold: Book$Hold,
  getAllBooking: getAllBooking,
  getSingleBooking: getSingleBooking
};