"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookingStatus = exports.BookingService = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _expressSharp = require("express-sharp");
var _db = _interopRequireDefault(require("../database/db"));
var _service = require("../payment/service");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var bookingStatus = exports.bookingStatus = {
  HOLD: "hold",
  PAID: "paid",
  ISSUE_IN_PROCESS: "issue_in_process",
  CONFIRMED: 'confirmed',
  CANCELLED: "cancelled"
};
var generatebookingId = function generatebookingId() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "FFLB" + Math.floor(Math.random() * 10000);
};
var Book$Hold = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var userid, userQuery, _yield$pool$query, _yield$pool$query2, user, _user$, email, wallet, name, phone, packgeId, packgaeQuery, _yield$pool$query3, _yield$pool$query4, tourpackage, _req$body, adult, child, infant, bookingid, adultTravelersValues, _iterator, _step, adulttraveler, afName, alName, adob, passDate, PassportNumber, Nationality, agender, aPaxType, passportDateValue, passportNumber, addpassenger, childTravelersValues, _iterator2, _step2, childtraveler, cfName, clName, cdob, cpassDate, cpassportNumber, cnationality, cgender, cpaxType, _passportDateValue, _passportNumber, addChildPassengerQuery, newTravelerResult, infantTravelersValues, _iterator3, _step3, infanttraveler, ipaxType, ifName, ilName, inationality, igender, idob, ipassDate, ipassportNumber, _passportDateValue2, _passportNumber2, addInfantPassengerQuery, date, options, bookingAt, totaladult, totalchild, totalinfant, bookingstatus, adultprice, childprice, infantprice, bookingSlotId, installmentQuery, _yield$pool$query5, _yield$pool$query6, installmentdata, bookingslot, _yield$pool$query7, _yield$pool$query8, slot, cancellationDate, startdate, enddate, totalAdultBookingAmount, totalChildBookingAmount, totalInfantBookingAmount, totalAdultFirstInstallmentAmount, totalChildFirstInstallmentAmount, totalInfantFirstInstallmentAmount, totalAdultSecondInstallmentAmount, totalChildSecondInstallmentAmount, totalInfantSecondInstallmentAmount, FirstInstallmentdueDate, SecondInstallmentdueDate, ThirdInstallmentdueDate, totalAdultprice, totalChildprice, totalInfantprice, _yield$pool$query9, _yield$pool$query10, addonServices, selectedAddonsFromRequest, addonTotal, _iterator4, _step4, selectaddn, service, description, cost, insertAddonQuery, totalpackageprice, bookingamount, firstinstallement, secondinstalemnt, paymentstatus, values, _yield$pool$query11, _yield$pool$query12, result, transporter, htmlContent, usermail, supportmail;
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
          if (!(user.length === 0)) {
            _context.next = 10;
            break;
          }
          throw new _expressSharp.HttpException("User not found with this id=".concat(userid), _httpStatus["default"].BAD_REQUEST);
        case 10:
          _user$ = user[0], email = _user$.email, wallet = _user$.wallet, name = _user$.name, phone = _user$.phone;
          packgeId = req.params.PKID;
          packgaeQuery = "SELECT * FROM tourpackage WHERE PKID = ?";
          _context.next = 15;
          return _db["default"].query(packgaeQuery, [packgeId]);
        case 15:
          _yield$pool$query3 = _context.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          tourpackage = _yield$pool$query4[0];
          if (!(tourpackage.length === 0)) {
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
              afName = adulttraveler.afName, alName = adulttraveler.alName, adob = adulttraveler.adob, passDate = adulttraveler.passDate, PassportNumber = adulttraveler.PassportNumber, Nationality = adulttraveler.Nationality, agender = adulttraveler.agender, aPaxType = adulttraveler.aPaxType;
              passportDateValue = passDate ? passDate : null;
              passportNumber = PassportNumber ? PassportNumber : null; // Add current adult traveler's values to the array
              adultTravelersValues.push([aPaxType, afName, alName, Nationality, agender, adob, passportDateValue, passportNumber, bookingid, userid]);
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
            _context.next = 37;
            break;
          }
          // Prepare an array to hold all adult traveler values
          childTravelersValues = [];
          _iterator2 = _createForOfIteratorHelper(child);
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              childtraveler = _step2.value;
              cfName = childtraveler.cfName, clName = childtraveler.clName, cdob = childtraveler.cdob, cpassDate = childtraveler.cpassDate, cpassportNumber = childtraveler.cpassportNumber, cnationality = childtraveler.cnationality, cgender = childtraveler.cgender, cpaxType = childtraveler.cpaxType;
              _passportDateValue = cpassDate ? cpassDate : null;
              _passportNumber = cpassportNumber ? cpassportNumber : null; // Add current adult traveler's values to the array
              childTravelersValues.push([cpaxType, cfName, clName, cnationality, cgender, cdob, _passportDateValue, _passportNumber, bookingid, userid]);
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
        case 37:
          if (!(Array.isArray(infant) && infant.length > 0)) {
            _context.next = 44;
            break;
          }
          // Prepare an array to hold all adult traveler values
          infantTravelersValues = [];
          _iterator3 = _createForOfIteratorHelper(infant);
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              infanttraveler = _step3.value;
              ipaxType = infanttraveler.ipaxType, ifName = infanttraveler.ifName, ilName = infanttraveler.ilName, inationality = infanttraveler.inationality, igender = infanttraveler.igender, idob = infanttraveler.idob, ipassDate = infanttraveler.ipassDate, ipassportNumber = infanttraveler.ipassportNumber;
              _passportDateValue2 = ipassDate ? ipassDate : null;
              _passportNumber2 = ipassportNumber ? ipassportNumber : null; // Add current adult traveler's values to the array
              infantTravelersValues.push([ipaxType, ifName, ilName, inationality, igender, idob, _passportDateValue2, _passportNumber2, bookingid, userid]);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          addInfantPassengerQuery = "\n      INSERT INTO passenger (paxType, fName, lName, nationality, gender, dob, passDate, passportNumber, bookingid, userid)\n      VALUES ?\n  "; // Execute the SQL query to insert all adult travelers
          _context.next = 44;
          return _db["default"].query(addInfantPassengerQuery, [infantTravelersValues]);
        case 44:
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
          bookingAt = date.toLocaleString('en-BD', options);
          totaladult = adult.length;
          totalchild = child.length;
          totalinfant = infant.length;
          bookingstatus = bookingStatus.HOLD;
          adultprice = tourpackage[0].adult_base_price;
          childprice = tourpackage[0].child_base_price;
          infantprice = tourpackage[0].infant_base_price;
          bookingSlotId = req.body.id;
          installmentQuery = "SELECT * FROM installment WHERE tourpackageId =? AND bookingslotid =? ";
          _context.next = 58;
          return _db["default"].query(installmentQuery, [packgeId, bookingSlotId]);
        case 58:
          _yield$pool$query5 = _context.sent;
          _yield$pool$query6 = _slicedToArray(_yield$pool$query5, 1);
          installmentdata = _yield$pool$query6[0];
          bookingslot = "SELECT * FROM bookingslot WHERE  id=?";
          _context.next = 64;
          return _db["default"].query(bookingslot, [bookingSlotId]);
        case 64:
          _yield$pool$query7 = _context.sent;
          _yield$pool$query8 = _slicedToArray(_yield$pool$query7, 1);
          slot = _yield$pool$query8[0];
          cancellationDate = slot[0].cancellationDate;
          startdate = slot[0].StartDate;
          enddate = slot[0].EndDate;
          console.log(slot[0].cancellationDate);
          if (!installmentdata.length) {
            console.log('No installment data found');
            // Set default values or handle the case where installment data is not found
          }

          // let totalAdultprice = 0;
          // let totalChildprice = 0;
          // let totalInfantprice = 0;
          totalAdultBookingAmount = 0;
          totalChildBookingAmount = 0;
          totalInfantBookingAmount = 0;
          totalAdultFirstInstallmentAmount = 0;
          totalChildFirstInstallmentAmount = 0;
          totalInfantFirstInstallmentAmount = 0;
          totalAdultSecondInstallmentAmount = 0;
          totalChildSecondInstallmentAmount = 0;
          totalInfantSecondInstallmentAmount = 0;
          FirstInstallmentdueDate = null;
          SecondInstallmentdueDate = null;
          ThirdInstallmentdueDate = null;
          totalAdultprice = adultprice * totaladult;
          totalChildprice = childprice * totalchild;
          totalInfantprice = infantprice * infantprice;
          if (installmentdata.length > 0) {
            (installmentdata[0].ABookingAmount + installmentdata[0].AFirstInstallmentAmount + installmentdata[0].ASecondInstallmentAmount) * totaladult, _readOnlyError("totalAdultprice");
            (installmentdata[0].CBookingAmount + installmentdata[0].CFirstInstallmentAmount + installmentdata[0].CSecondInstallmentAmount) * totalchild, _readOnlyError("totalChildprice");
            (installmentdata[0].IBookingAmount + installmentdata[0].IFirstInstallmentAmount + installmentdata[0].ISecondInstallmentAmount) * totalinfant, _readOnlyError("totalInfantprice");
            totalAdultBookingAmount = installmentdata[0].ABookingAmount * totaladult;
            totalChildBookingAmount = installmentdata[0].CBookingAmount * totalchild;
            totalInfantBookingAmount = installmentdata[0].IBookingAmount * totalinfant;
            totalAdultFirstInstallmentAmount = installmentdata[0].AFirstInstallmentAmount * totaladult;
            totalChildFirstInstallmentAmount = installmentdata[0].CFirstInstallmentAmount * totalchild;
            totalInfantFirstInstallmentAmount = installmentdata[0].IFirstInstallmentAmount * totalinfant;

            // Total second installment amount calculation
            totalAdultSecondInstallmentAmount = installmentdata[0].ASecondInstallmentAmount * totaladult;
            totalChildSecondInstallmentAmount = installmentdata[0].CSecondInstallmentAmount * totalchild;
            totalInfantSecondInstallmentAmount = installmentdata[0].ISecondInstallmentAmount * totalinfant;
            FirstInstallmentdueDate = installmentdata[0].FirstInstallmentdueDate;
            SecondInstallmentdueDate = installmentdata[0].SecondInstallmentdueDate;
            ThirdInstallmentdueDate = installmentdata[0].ThirdInstallmentdueDate;
          }
          _context.next = 90;
          return _db["default"].query('SELECT * FROM add_ons WHERE tour_package_id = ?', [packgeId]);
        case 90:
          _yield$pool$query9 = _context.sent;
          _yield$pool$query10 = _slicedToArray(_yield$pool$query9, 1);
          addonServices = _yield$pool$query10[0];
          selectedAddonsFromRequest = req.body.selectedAddons || [];
          addonTotal = 0;
          if (!(addonServices && addonServices.length > 0)) {
            _context.next = 116;
            break;
          }
          _iterator4 = _createForOfIteratorHelper(selectedAddonsFromRequest);
          _context.prev = 97;
          _iterator4.s();
        case 99:
          if ((_step4 = _iterator4.n()).done) {
            _context.next = 108;
            break;
          }
          selectaddn = _step4.value;
          service = selectaddn.service, description = selectaddn.description, cost = selectaddn.cost; // Save addon booking
          insertAddonQuery = "\n      INSERT INTO addon_booking (service, description, cost, packageId, userid, bookingId) \n      VALUES (?, ?, ?, ?, ?, ?)\n    ";
          _context.next = 105;
          return _db["default"].query(insertAddonQuery, [service, description, cost, packgeId, userid, bookingid]);
        case 105:
          addonTotal += cost;
        case 106:
          _context.next = 99;
          break;
        case 108:
          _context.next = 113;
          break;
        case 110:
          _context.prev = 110;
          _context.t0 = _context["catch"](97);
          _iterator4.e(_context.t0);
        case 113:
          _context.prev = 113;
          _iterator4.f();
          return _context.finish(113);
        case 116:
          totalpackageprice = totalAdultprice + totalChildprice + totalInfantprice + addonTotal;
          bookingamount = totalAdultBookingAmount + totalChildBookingAmount + totalInfantBookingAmount + addonTotal;
          firstinstallement = totalAdultFirstInstallmentAmount + totalChildFirstInstallmentAmount + totalInfantFirstInstallmentAmount;
          secondinstalemnt = totalAdultSecondInstallmentAmount + totalChildSecondInstallmentAmount + totalInfantSecondInstallmentAmount;
          paymentstatus = _service.payementStatus.UNPAID;
          values = [bookingid, userid, email, name, wallet, tourpackage[0].PKID, tourpackage[0].MainTitle, startdate, enddate, tourpackage[0].TripType, tourpackage[0].TotalDuration, adultprice, childprice, infantprice, tourpackage[0].City, tourpackage[0].Flight, tourpackage[0].Food, tourpackage[0].Transport, tourpackage[0].Hotel, bookingamount, firstinstallement, secondinstalemnt, FirstInstallmentdueDate, SecondInstallmentdueDate, ThirdInstallmentdueDate, totaladult, totalchild, totalinfant, totalAdultprice, totalChildprice, totalInfantprice, phone, totalpackageprice, paymentstatus, bookingstatus, bookingAt, cancellationDate];
          _context.next = 124;
          return _db["default"].query("INSERT INTO booking (\n    bookingid,\n    userid,\n    email,\n    name,\n    wallet,\n    PkID,\n    MainTitle,\n    StartDate,\n    EndDate,\n    TripType,\n    TotalDuration,\n    adult_price,\n    child_price,\n    infant_price,\n    city,\n    flight,\n    food,\n    transport,\n    hotel,\n    booking_money,\n    first_installment,\n    second_installment,\n    booking_money_due_date,\n    first_installment_due_date,\n    second_installment_due_date,\n    totaladult,\n    totalchild,\n    totalinfant,\n    totalAdultprice,\n    totalChildprice,\n    totalInfantprice,\n    phone,\n    totalAmount,\n    paymentStatus,\n    bookingStatus,\n    bookingDate,\n    cancellationDate\n  ) VALUES (?, ?, ?,?, ?,?, ?, ?,?, ?, ?,?, ?, ?, ?,?, ?, ?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?, ?, ?, ?, ?)", values);
        case 124:
          _yield$pool$query11 = _context.sent;
          _yield$pool$query12 = _slicedToArray(_yield$pool$query11, 1);
          result = _yield$pool$query12[0];
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
          htmlContent = "<!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <title>Document</title>\n      </head>\n      <style>\n        body {\n          padding: 0px 25px;\n        }\n        table {\n          border-collapse: collapse;\n          width: 100%;\n        }\n        th {\n          background-color: #ffe3ea;\n          color: #bc6277;\n          font-weight: 500;\n        }\n    \n        th,\n        td {\n          padding: 8px;\n          text-align: left;\n          border-bottom: 1px solid #ddd;\n          font-size: 10px;\n        }\n        p {\n          font-size: 10px;\n        }\n    \n        .title {\n          color: #9c9797;\n          font-style: italic;\n          width: 30%;\n        }\n        h4 {\n          font-size: 12px;\n        }\n      </style>\n      <body>\n        <div class=\"header\" style=\"margin-bottom: 5px;margin-top: 30px\">\n          <div class=\"logo\">\n            <img  style=\"width: 130px\" src=\"https://storage.googleapis.com/cdnflyfarladiesv2/logo%20ladies.png\" alt=\"\" />\n    \n          </div>\n        </div>\n    \n        <div class=\"bookingItenaryDetails\">\n          <h4 style=\"background-color: #bc6277; padding: 5px 10px; color: #ffffff\">\n            BOOKING & TOUR ITENARY DETAILS\n          </h4>\n    \n            \n          <table>\n          <tr>\n            <td class=\"title\">Booking ID</td>\n            <td>".concat(bookingid, "</td>\n          </tr>\n          <tr>\n            <td class=\"title\">Booking Date</td>\n            <td>").concat(bookingAt, "</td>\n          </tr>\n          <tr>\n            <td class=\"title\">Package Type</td>\n            <td>").concat(tourpackage[0].TripType, "</td>\n          </tr>\n          <tr>\n            <td class=\"title\">Package Name</td>\n            <td>").concat(tourpackage[0].MainTitle, "</td>\n          </tr>\n          <tr>\n            <td class=\"title\">Journey Start & End Date</td>\n            <td>").concat(tourpackage[0].StartDate, ",").concat(tourpackage[0].EndDate, "</td>\n          </tr>\n          <tr>\n            <td class=\"title\">Duration</td>\n            <td>").concat(tourpackage[0].TotalDuration, "</td>\n          </tr>\n          <tr>\n            <td class=\"title\">Total Passenger</td>\n            <td>").concat(tourpackage[0].totalseat, "</td>\n          </tr>\n          <tr>\n            <td class=\"title\">Total Cost</td>\n            <td>").concat(totalpackageprice, "</td>\n          </tr>\n        </table>\n    \n        <div class=\"bookingItenaryDetails\" style=\"margin-top: 50px\">\n        <h4 style=\"background-color: #bc6277; padding: 5px 10px; color: #ffffff\">\n          TRAVELLER DETAILS\n        </h4>\n      \n        <table>\n          <tr>\n            <th>Name</th>\n            <th>Type</th>\n            <th>Gender</th>\n            <th>Date of Birth</th>\n            <th>Nationality</th>\n            <th>NID/ Passport No</th>\n          </tr>\n      \n              <tr>\n              ").concat(adult.map(function (traveler) {
            return "\n                <td>".concat(traveler.afName, " ").concat(traveler.alName, "</td>\n                <td>").concat(traveler.aPaxType, "</td>\n                <td>").concat(traveler.agender, "</td>\n                <td>").concat(traveler.adob, "</td>\n                <td>").concat(traveler.Nationality, "</td>\n                <td>").concat(traveler.PassportNumber, "</td>\n              </tr>\n            ");
          }).join(''), "\n      \n          ").concat(child.map(function (traveler) {
            return "\n              <tr>\n                <td>".concat(traveler.cfName, " ").concat(traveler.clName, "</td>\n                <td>").concat(traveler.cpaxType, "</td>\n                <td>").concat(traveler.cgender, "</td>\n                <td>").concat(traveler.cdob, "</td>\n                <td>").concat(traveler.cnationality, "</td>\n                <td>").concat(traveler.cpassportNumber, "</td>\n              </tr>\n            ");
          }).join(''), "\n            \n          ").concat(infant.map(function (traveler) {
            return "\n              <tr>\n                <td>".concat(traveler.ifName, " ").concat(traveler.ilName, "</td>\n                <td>").concat(traveler.ipaxType, "</td>\n                <td>").concat(traveler.igender, "</td>\n                <td>").concat(traveler.idob, "</td>\n                <td>").concat(traveler.inationality, "</td>\n                <td>").concat(traveler.ipassportNumber, "</td>\n              </tr>\n            ");
          }).join(''), "\n        </table>\n      </div>\n      \n          <div class=\"payemnt\" style=\"margin-top: 50px\">\n            <h4\n              style=\"\n                background-color: #bc6277;\n                padding: 5px 10px;\n                color: #ffffff;\n                letter-spacing: 2px;\n              \"\n            >\n              PAYMENT STATUS\n            </h4>\n    \n            <h1\n              style=\"text-transform: uppercase; font-size: 30px; font-weight: 600\"\n            >\n              ").concat(paymentstatus, "\n            </h1>\n          </div>\n        </div>\n        <div class=\"notice\" style=\"border: 1px solid #bc6277\">\n          <p style=\"padding-left: 20px; color: #bc6277\">\n            Kindly remember to bring this document with you on your travel date.\n          </p>\n          <p style=\"padding-left: 20px; color: #bc6277\">\n            Need more help? Mail us at support@flyfarladies.com or Call us at +88\n            01755582111\n          </p>\n        </div>\n      </body>\n  </html>");
          usermail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: 'faisal@flyfar.tech',
            // Recipient's email address
            subject: 'Booking Details',
            text: 'Please find the attached file.',
            html: htmlContent
          };
          supportmail = {
            from: 'flyfarladies@mailservice.center',
            // Replace with your email address
            to: 'support@flyfarladies.com',
            // Recipient's email address
            subject: 'Booking Details',
            text: 'Please find the attached file.',
            html: htmlContent
          };
          _context.next = 133;
          return transporter.sendMail(usermail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 133:
          _context.next = 135;
          return transporter.sendMail(supportmail, function (error, info) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
        case 135:
          return _context.abrupt("return", res.status(200).json({
            status: "success",
            message: "Booking success"
          }));
        case 138:
          _context.prev = 138;
          _context.t1 = _context["catch"](0);
          console.log(_context.t1);
        case 141:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 138], [97, 110, 113, 116]]);
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
    var bookingid, bookingequery, _yield$pool$execute3, _yield$pool$execute4, bookingresults, passengerquery, _yield$pool$execute5, _yield$pool$execute6, passengerresults, addonsquery, _yield$pool$execute7, _yield$pool$execute8, addonsrresults;
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
          passengerquery = "SELECT * FROM passenger  WHERE bookingid =?";
          _context3.next = 10;
          return _db["default"].execute(passengerquery, [bookingid]);
        case 10:
          _yield$pool$execute5 = _context3.sent;
          _yield$pool$execute6 = _slicedToArray(_yield$pool$execute5, 1);
          passengerresults = _yield$pool$execute6[0];
          addonsquery = "SELECT * FROM addon_booking  WHERE bookingid =?";
          _context3.next = 16;
          return _db["default"].execute(addonsquery, [bookingid]);
        case 16:
          _yield$pool$execute7 = _context3.sent;
          _yield$pool$execute8 = _slicedToArray(_yield$pool$execute7, 1);
          addonsrresults = _yield$pool$execute8[0];
          console.log(bookingresults);
          return _context3.abrupt("return", {
            bookingresults: bookingresults,
            passengerresults: passengerresults,
            addonsrresults: addonsrresults
          });
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getSingleBooking(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getBookingsByUserId = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var userId, bookingQuery, _yield$pool$execute9, _yield$pool$execute10, bookingResults, bookingsWithPassengers;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          // Assuming userid is obtained from request parameters or session
          userId = req.params.userid; // Query to fetch bookings for the given user
          bookingQuery = "SELECT * FROM booking WHERE userid = ?";
          _context5.next = 5;
          return _db["default"].execute(bookingQuery, [userId]);
        case 5:
          _yield$pool$execute9 = _context5.sent;
          _yield$pool$execute10 = _slicedToArray(_yield$pool$execute9, 1);
          bookingResults = _yield$pool$execute10[0];
          _context5.next = 10;
          return Promise.all(bookingResults.map( /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(booking) {
              var passengerQuery, _yield$pool$execute11, _yield$pool$execute12, passengerResults;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    passengerQuery = "SELECT * FROM passenger WHERE bookingid = ?";
                    _context4.next = 3;
                    return _db["default"].execute(passengerQuery, [booking.bookingid]);
                  case 3:
                    _yield$pool$execute11 = _context4.sent;
                    _yield$pool$execute12 = _slicedToArray(_yield$pool$execute11, 1);
                    passengerResults = _yield$pool$execute12[0];
                    return _context4.abrupt("return", {
                      booking: booking,
                      passengers: passengerResults
                    });
                  case 7:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x9) {
              return _ref5.apply(this, arguments);
            };
          }()));
        case 10:
          bookingsWithPassengers = _context5.sent;
          res.status(200).json(bookingsWithPassengers);
          _context5.next = 18;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          console.error("Error fetching bookings:", _context5.t0);
          res.status(500).json({
            error: "Failed to fetch bookings"
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 14]]);
  }));
  return function getBookingsByUserId(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var ApprovedBooking = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var bookingid, action_by, connection, status, updateBookingQuery;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          bookingid = req.params.bookingid;
          action_by = req.body.action_by;
          _context6.next = 5;
          return _db["default"].getConnection();
        case 5:
          connection = _context6.sent;
          // Update booking status
          status = bookingStatus.CONFIRMED;
          updateBookingQuery = "UPDATE booking SET bookingStatus = ?, action_by =? WHERE Bookingid = ?";
          _context6.next = 10;
          return connection.execute(updateBookingQuery, [status, action_by, bookingid]);
        case 10:
          connection.release();
          res.status(200).json({
            success: true,
            message: 'Booking  has  confirmed.'
          });
          _context6.next = 18;
          break;
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          console.error('Error updating booking status:', _context6.t0);
          res.status(500).json({
            success: false,
            message: 'Internal server error.'
          });
        case 18:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 14]]);
  }));
  return function ApprovedBooking(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
var CancelledBooking = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var bookingid, _req$body2, action_by, rejected_reason, connection, status, updateBookingQuery;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          bookingid = req.params.bookingid;
          _req$body2 = req.body, action_by = _req$body2.action_by, rejected_reason = _req$body2.rejected_reason;
          _context7.next = 5;
          return _db["default"].getConnection();
        case 5:
          connection = _context7.sent;
          // Update booking status
          status = bookingStatus.CANCELLED;
          updateBookingQuery = "UPDATE booking SET bookingStatus = ?, rejected_reason=?, action_by =? WHERE Bookingid = ?";
          _context7.next = 10;
          return connection.execute(updateBookingQuery, [status, rejected_reason, action_by, bookingid]);
        case 10:
          connection.release();
          res.status(200).json({
            success: true,
            message: 'Booking has been cancelled.'
          });
          _context7.next = 18;
          break;
        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7["catch"](0);
          console.error('Error updating booking status:', _context7.t0);
          res.status(500).json({
            success: false,
            message: 'Internal server error.'
          });
        case 18:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 14]]);
  }));
  return function CancelledBooking(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
var CancelledBookingByuser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var bookingid, id, connection, bookingQuery, _yield$pool$query13, _yield$pool$query14, data, cancellation_date, currentDate, status, updateBookingQuery;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          bookingid = req.params.bookingid;
          id = req.body.id;
          _context8.next = 5;
          return _db["default"].getConnection();
        case 5:
          connection = _context8.sent;
          bookingQuery = "SELECT * FROM booking WHERE bookingid=? AND userid=? ";
          _context8.next = 9;
          return _db["default"].query(bookingQuery, [bookingid, id]);
        case 9:
          _yield$pool$query13 = _context8.sent;
          _yield$pool$query14 = _slicedToArray(_yield$pool$query13, 1);
          data = _yield$pool$query14[0];
          cancellation_date = data[0].cancellationDate; // Check if cancellation date has passed
          currentDate = new Date();
          if (!(new Date(cancellation_date) < currentDate)) {
            _context8.next = 17;
            break;
          }
          connection.release();
          return _context8.abrupt("return", res.status(400).json({
            success: false,
            message: 'Cancellation date has passed. Cannot cancel booking.'
          }));
        case 17:
          // Update booking status
          status = bookingStatus.CANCELLED;
          updateBookingQuery = "UPDATE booking SET bookingStatus = ? WHERE Bookingid = ?";
          _context8.next = 21;
          return connection.execute(updateBookingQuery, [status, bookingid]);
        case 21:
          connection.release();
          res.status(200).json({
            success: true,
            message: 'Booking has been cancelled.'
          });
          _context8.next = 29;
          break;
        case 25:
          _context8.prev = 25;
          _context8.t0 = _context8["catch"](0);
          console.error('Error updating booking status:', _context8.t0);
          res.status(500).json({
            success: false,
            message: 'Internal server error.'
          });
        case 29:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 25]]);
  }));
  return function CancelledBookingByuser(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var BookingService = exports.BookingService = {
  Book$Hold: Book$Hold,
  getAllBooking: getAllBooking,
  getSingleBooking: getSingleBooking,
  getBookingsByUserId: getBookingsByUserId,
  ApprovedBooking: ApprovedBooking,
  CancelledBooking: CancelledBooking,
  CancelledBookingByuser: CancelledBookingByuser
};