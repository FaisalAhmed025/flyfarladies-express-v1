"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteImageFromURL = deleteImageFromURL;
exports.upload = exports.tourpackageService = exports.getHighlights = exports.getExclusion = exports.getCancellationPolicy = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _db = _interopRequireDefault(require("../database/db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
// define image type
var FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "application/pdf": "pdf"
};
var storage = _multer["default"].memoryStorage({
  destination: function destination(req, file, cb) {
    //console.log(file);
    //  console.log(file.mimetype);
    var isValid = FILE_TYPE_MAP[file.mimetype];
    var uploadError = new Error("invalid image type");
    if (isValid) uploadError = null;
    cb(uploadError, null);
  }
});
var upload = exports.upload = (0, _multer["default"])({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});
var generatePackageId = function generatePackageId() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "FFLPK" + Math.floor(Math.random() * 10000);
};
var visitedimageid = function visitedimageid() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "VI" + Math.floor(Math.random() * 10000);
};
var customiteneirary = function customiteneirary() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "IT" + Math.floor(Math.random() * 10000);
};
var custominclusion = function custominclusion() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "I" + Math.floor(Math.random() * 10000);
};
var customEXclusion = function customEXclusion() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "E" + Math.floor(Math.random() * 10000);
};
var customcancId = function customcancId() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "C" + Math.floor(Math.random() * 10000);
};
var customBookingPOlicy = function customBookingPOlicy() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "B" + Math.floor(Math.random() * 10000);
};
var AlbumImageID = function AlbumImageID() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "A" + Math.floor(Math.random() * 10000);
};
var customHighlight = function customHighlight() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "H" + Math.floor(Math.random() * 10000);
};
var Addonservice = function Addonservice() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "A" + Math.floor(Math.random() * 10000);
};
var addtourpackage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, MainTitle, SubTitle, Price, City, Discount, Location, Availability, StartDate, EndDate, TripType, TotalDuration, PackageOverview, Showpackage, Flight, Transport, Food, Hotel, Country, AvailableSeats, MinimumAge, MaximumAge, PricePerAdult, PricePerChild, PricePerInfant, GirlsTrip, FamilyTrips, Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, adult_base_price, child_base_price, infant_base_price, booking_money_due_date, first_installment_due_date, second_installment_due_date, booking_money, first_installment, second_installment, coverImage, packgeId, values, _yield$pool$query, _yield$pool$query2, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Extract tour package details from request body
          _req$body = req.body, MainTitle = _req$body.MainTitle, SubTitle = _req$body.SubTitle, Price = _req$body.Price, City = _req$body.City, Discount = _req$body.Discount, Location = _req$body.Location, Availability = _req$body.Availability, StartDate = _req$body.StartDate, EndDate = _req$body.EndDate, TripType = _req$body.TripType, TotalDuration = _req$body.TotalDuration, PackageOverview = _req$body.PackageOverview, Showpackage = _req$body.Showpackage, Flight = _req$body.Flight, Transport = _req$body.Transport, Food = _req$body.Food, Hotel = _req$body.Hotel, Country = _req$body.Country, AvailableSeats = _req$body.AvailableSeats, MinimumAge = _req$body.MinimumAge, MaximumAge = _req$body.MaximumAge, PricePerAdult = _req$body.PricePerAdult, PricePerChild = _req$body.PricePerChild, PricePerInfant = _req$body.PricePerInfant, GirlsTrip = _req$body.GirlsTrip, FamilyTrips = _req$body.FamilyTrips, Adventure = _req$body.Adventure, FullyGuided = _req$body.FullyGuided, SelfGuided = _req$body.SelfGuided, Guide = _req$body.Guide, CancellationDate = _req$body.CancellationDate, adult_base_price = _req$body.adult_base_price, child_base_price = _req$body.child_base_price, infant_base_price = _req$body.infant_base_price, booking_money_due_date = _req$body.booking_money_due_date, first_installment_due_date = _req$body.first_installment_due_date, second_installment_due_date = _req$body.second_installment_due_date, booking_money = _req$body.booking_money, first_installment = _req$body.first_installment, second_installment = _req$body.second_installment; // Assuming the file field name is 'coverImage'
          // Extract cover image details from the uploaded file
          coverImage = req.publicImageLink;
          packgeId = generatePackageId(); // Check if cover image is present
          if (coverImage) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Cover image is required"
          }));
        case 6:
          // Execute raw SQL INSERT query to insert tour package details into database
          values = [packgeId, MainTitle, SubTitle, Price, PricePerAdult, PricePerChild, PricePerInfant, City, Discount, Location, Availability, StartDate, EndDate, TripType, TotalDuration, AvailableSeats, MinimumAge, MaximumAge, PackageOverview, Showpackage, Flight, Transport, Food, Hotel, Country, GirlsTrip, FamilyTrips, Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, coverImage, adult_base_price, child_base_price, infant_base_price, booking_money_due_date, first_installment_due_date, second_installment_due_date, booking_money, first_installment, second_installment];
          _context.next = 9;
          return _db["default"].query("INSERT INTO tourpackage (PkId,\n        MainTitle, SubTitle, Price, PricePerAdult, PricePerChild, PricePerInfant,\n        City, Discount, Location, Availability, StartDate, EndDate, TripType,\n        TotalDuration, AvailableSeats, MinimumAge, MaximumAge, PackageOverview,\n        Showpackage, Flight, Transport, Food, Hotel, Country, GirlsTrip, FamilyTrips,\n        Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, coverImage,   adult_base_price, \n        child_base_price, \n        infant_base_price, \n        booking_money_due_date, \n        first_installment_due_date, \n        second_installment_due_date,\n        booking_money, \n        first_installment, \n        second_installment\n      ) \n      VALUES (?, ?,?,?,?,?,?,?,?,?,?,?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)", values);
        case 9:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          result = _yield$pool$query2[0];
          console.log(values);
          return _context.abrupt("return", res.status(200).json({
            status: "success",
            message: "Travel package added successfully"
          }));
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error("Error adding travel package:", _context.t0);
          res.status(500).json({
            error: "Error adding travel package"
          });
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 16]]);
  }));
  return function addtourpackage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getSingleTourPackages = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(PkID) {
    var tourPackageQuery, _yield$pool$execute, _yield$pool$execute2, tourPackageResults, tourPackagesData, tourPackageData, _yield$Promise$all, _yield$Promise$all2, getmainimg, tourPlan, visitedPlaces, inclusions, exclusion, highlights, bookingPolicy, cancellationPolicy, albumImage, addOns;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          tourPackageQuery = "\n    SELECT\n      tourpackage.PkID AS tour_package_id,\n      tourpackage.PkID,\n      tourpackage.MainTitle,\n      tourpackage.TripType,\n      tourpackage.Location,\n      tourpackage.StartDate,\n      tourpackage.EndDate,\n      tourpackage.AvailableSeats,\n      tourpackage.PricePerAdult,\n      tourpackage.PricePerChild,\n      tourpackage.PricePerInfant,\n      tourpackage.GirlsTrip,\n      tourpackage.PackageOverview,\n      tourpackage.MinimumAge,\n      tourpackage.MaximumAge,\n      tourpackage.Price,\n      tourpackage.City,\n      tourpackage.Discount,\n      tourpackage.SelfGuided,\n      tourpackage.Flight,\n      tourpackage.Food,\n      tourpackage.Transport,\n      tourpackage.FullyGuided,\n      tourpackage.coverImage  -- Assuming there's a column in main_image for the image URL\n    FROM\n      tourpackage\n\n    WHERE\n      tourpackage.PkID = ?;\n  ";
          _context2.next = 4;
          return _db["default"].execute(tourPackageQuery, [PkID]);
        case 4:
          _yield$pool$execute = _context2.sent;
          _yield$pool$execute2 = _slicedToArray(_yield$pool$execute, 1);
          tourPackageResults = _yield$pool$execute2[0];
          console.log(tourPackageResults);
          if (!(tourPackageResults.length === 0)) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", null);
        case 10:
          tourPackagesData = [];
          tourPackageData = {
            PkID: tourPackageResults[0].PkID,
            tourpack_id: tourPackageResults[0].tourpack_id,
            MainTitle: tourPackageResults[0].MainTitle,
            TripType: tourPackageResults[0].TripType,
            Location: tourPackageResults[0].Location,
            StartDate: tourPackageResults[0].StartDate,
            EndDate: tourPackageResults[0].EndDate,
            trip_days: tourPackageResults[0].trip_days,
            trip_nights: tourPackageResults[0].trip_nights,
            AvailableSeats: tourPackageResults[0].AvailableSeats,
            MinimumAge: tourPackageResults[0].MinimumAge,
            MaximumAge: tourPackageResults[0].MaximumAge,
            PricePerAdult: tourPackageResults[0].PricePerAdult,
            PricePerChild: tourPackageResults[0].PricePerChild,
            PricePerInfant: tourPackageResults[0].PricePerInfant,
            Discount: tourPackageResults[0].Discount,
            PackageOverview: tourPackageResults[0].PackageOverview,
            booking_money_due_date: tourPackageResults[0].booking_money_due_date,
            first_installment_due_date: tourPackageResults[0].first_installment_due_date,
            second_installment_due_date: tourPackageResults[0].second_installment_due_date,
            booking_money: tourPackageResults[0].booking_money,
            first_installment: tourPackageResults[0].first_installment,
            second_installment: tourPackageResults[0].second_installment,
            total_booking_money: parseInt(tourPackageResults[0].adult_base_price + tourPackageResults[0].infant_base_price + tourPackageResults[0].child_base_price) * parseFloat(tourPackageResults[0].booking_money) / 100,
            total_first_installment: parseInt(tourPackageResults[0].adult_base_price + tourPackageResults[0].infant_base_price + tourPackageResults[0].child_base_price) * parseFloat(tourPackageResults[0].first_installment) / 100,
            total_second_installment: parseInt(tourPackageResults[0].adult_base_price + tourPackageResults[0].infant_base_price + tourPackageResults[0].child_base_price) * parseFloat(tourPackageResults[0].second_installment) / 100,
            GirlsTrip: tourPackageResults[0].GirlsTrip,
            Flight: tourPackageResults[0].Flight,
            accommodation: tourPackageResults[0].accommodation,
            Food: tourPackageResults[0].Food,
            Transport: tourPackageResults[0].Transport,
            guide: tourPackageResults[0].guide,
            Availability: tourPackageResults[0].Availability,
            show_on_this_on_home_page: tourPackageResults[0].show_on_this_on_home_page,
            popular_destination: tourPackageResults[0].popular_destination,
            day_trip: tourPackageResults[0].day_trip,
            night_out_trip: tourPackageResults[0].night_out_trip,
            FullyGuided: tourPackageResults[0].FullyGuided,
            family: tourPackageResults[0].family,
            SelfGuided: tourPackageResults[0].SelfGuided,
            friendly: tourPackageResults[0].friendly,
            child: tourPackageResults[0].child,
            aged: tourPackageResults[0].aged,
            adt_tax: tourPackageResults[0].adt_tax,
            chd_tax: tourPackageResults[0].chd_tax,
            inf_tax: tourPackageResults[0].inf_tax,
            coverImage: tourPackageResults[0].coverImage,
            total_price: parseInt(tourPackageResults[0].adult_base_price + tourPackageResults[0].infant_base_price + tourPackageResults[0].child_base_price),
            country: tourPackageResults[0].country && tourPackageResults[0].country[0].country ? tourPackageResults[0].country[0].country.map(function (entry) {
              return {
                city: entry.city,
                country: entry.country
              };
            }) : [],
            main_image: [],
            tour_plan: [],
            // Change here from tour_itinerary to tour_plan
            booking_policy: [],
            place_to_visit: [],
            inclusion: [],
            exclusion: [],
            highlights: [],
            cancellation_policy: [],
            albumImage: []
          };
          _context2.next = 14;
          return Promise.all([getmainimage(tourPackageData.PkID), getTourPlan(tourPackageData.PkID), getVisitedPlace(tourPackageData.PkID), getInclusion(tourPackageData.PkID), getExclusion(tourPackageData.PkID), getHighlights(tourPackageData.PkID), getBookingPolicy(tourPackageData.PkID), getCancellationPolicy(tourPackageData.PkID), getalbumImage(tourPackageData.PkID)

          // getAddOns(tourPackageData.id),
          ]);
        case 14:
          _yield$Promise$all = _context2.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 10);
          getmainimg = _yield$Promise$all2[0];
          tourPlan = _yield$Promise$all2[1];
          visitedPlaces = _yield$Promise$all2[2];
          inclusions = _yield$Promise$all2[3];
          exclusion = _yield$Promise$all2[4];
          highlights = _yield$Promise$all2[5];
          bookingPolicy = _yield$Promise$all2[6];
          cancellationPolicy = _yield$Promise$all2[7];
          albumImage = _yield$Promise$all2[8];
          addOns = _yield$Promise$all2[9];
          tourPackageData.main_image = getmainimg;
          tourPackageData.tour_plan = tourPlan;
          tourPackageData.place_to_visit = visitedPlaces;
          tourPackageData.inclusion = inclusions;
          tourPackageData.exclusion = exclusion;
          tourPackageData.highlights = highlights;
          tourPackageData.booking_policy = bookingPolicy;
          tourPackageData.cancellation_policy = cancellationPolicy;
          tourPackageData.albumImage = albumImage;
          // tourPackageData.add_ons = addOns;
          tourPackagesData.push(tourPackageData);
          return _context2.abrupt("return", tourPackageData);
        case 39:
          _context2.prev = 39;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;
        case 42:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 39]]);
  }));
  return function getSingleTourPackages(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var getmainimage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(PkID) {
    var mainimage, _yield$pool$execute3, _yield$pool$execute4, results;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          console.log("id", PkID);
          mainimage = "\n    SELECT\n    mainimage.imageId,\n    mainimage.packageId,\n    mainimage.imageurl\n  FROM mainimage\n  JOIN tourpackage ON mainimage.packageId = tourpackage.PkID\n  WHERE mainimage.packageId = ?;  \n    ";
          _context3.next = 5;
          return _db["default"].execute(mainimage, [PkID]);
        case 5:
          _yield$pool$execute3 = _context3.sent;
          _yield$pool$execute4 = _slicedToArray(_yield$pool$execute3, 1);
          results = _yield$pool$execute4[0];
          return _context3.abrupt("return", results);
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function getmainimage(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
var getTourPlan = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(PkID) {
    var tourPlanQuery, _yield$pool$query3, _yield$pool$query4, tourPlanResults;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          // Retrieve tour plan details with order by uId in ascending order
          tourPlanQuery = "\n    SELECT\n    tourplan.id,\n    tourplan.tour_package_id,\n    tourplan.day_title,\n    tourplan.day_plan\n  FROM tourplan\n  JOIN tourpackage ON tourplan.tour_package_id = tourpackage.PkID\n  WHERE tourplan.tour_package_id = ?;  \n      ";
          _context4.next = 4;
          return _db["default"].query(tourPlanQuery, [PkID]);
        case 4:
          _yield$pool$query3 = _context4.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          tourPlanResults = _yield$pool$query4[0];
          return _context4.abrupt("return", tourPlanResults);
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 13:
          _context4.prev = 13;
          return _context4.finish(13);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10, 13, 15]]);
  }));
  return function getTourPlan(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var getInclusion = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(PkID) {
    var inclusionQuery, _yield$pool$execute5, _yield$pool$execute6, results;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          inclusionQuery = "\n    SELECT\n    inclusion.id,\n    inclusion.tour_package_id,\n    inclusion.inclusion\n  FROM inclusion\n  JOIN tourpackage ON inclusion.tour_package_id = tourpackage.PkID\n  WHERE inclusion.tour_package_id = ?;  \n";
          _context5.next = 4;
          return _db["default"].execute(inclusionQuery, [PkID]);
        case 4:
          _yield$pool$execute5 = _context5.sent;
          _yield$pool$execute6 = _slicedToArray(_yield$pool$execute5, 1);
          results = _yield$pool$execute6[0];
          return _context5.abrupt("return", results);
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          throw _context5.t0;
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function getInclusion(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
// Function to fetch exclusion data
var getExclusion = exports.getExclusion = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(PkID) {
    var exclusionQuery, _yield$pool$execute7, _yield$pool$execute8, results;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          exclusionQuery = "\n    SELECT\n    exclusion.id,\n    exclusion.tour_package_id,\n    exclusion.exclusion\n  FROM exclusion\n  JOIN tourpackage ON exclusion.tour_package_id = tourpackage.PkID\n  WHERE exclusion.tour_package_id = ?;  \n";
          _context6.next = 4;
          return _db["default"].execute(exclusionQuery, [PkID]);
        case 4:
          _yield$pool$execute7 = _context6.sent;
          _yield$pool$execute8 = _slicedToArray(_yield$pool$execute7, 1);
          results = _yield$pool$execute8[0];
          return _context6.abrupt("return", results);
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          throw _context6.t0;
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function getExclusion(_x7) {
    return _ref6.apply(this, arguments);
  };
}();
// Function to fetch cancellation policy data
var getCancellationPolicy = exports.getCancellationPolicy = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(PkID) {
    var cancellationPolicyQuery, _yield$pool$execute9, _yield$pool$execute10, results;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          cancellationPolicyQuery = "\n    SELECT\n    cancellation_policy.id,\n    cancellation_policy.tour_package_id,\n    cancellation_policy.cancellation_policy\n  FROM cancellation_policy\n  JOIN tourpackage ON cancellation_policy.tour_package_id = tourpackage.PkID\n  WHERE cancellation_policy.tour_package_id = ?;  \n";
          _context7.next = 4;
          return _db["default"].execute(cancellationPolicyQuery, [PkID]);
        case 4:
          _yield$pool$execute9 = _context7.sent;
          _yield$pool$execute10 = _slicedToArray(_yield$pool$execute9, 1);
          results = _yield$pool$execute10[0];
          return _context7.abrupt("return", results);
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          throw _context7.t0;
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function getCancellationPolicy(_x8) {
    return _ref7.apply(this, arguments);
  };
}();
// Function to fetch cancellation place visit data
var getVisitedPlace = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(PkID) {
    var visitedPlace, _yield$pool$execute11, _yield$pool$execute12, results;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          visitedPlace = "\n    SELECT\n    place_to_visit.id,\n    place_to_visit.tour_package_id,\n    place_to_visit.placetovisit_name,\n    place_to_visit.place_image\n  FROM place_to_visit\n  JOIN tourpackage ON place_to_visit.tour_package_id = tourpackage.PkID\n  WHERE place_to_visit.tour_package_id = ?;  \n";
          _context8.next = 4;
          return _db["default"].execute(visitedPlace, [PkID]);
        case 4:
          _yield$pool$execute11 = _context8.sent;
          _yield$pool$execute12 = _slicedToArray(_yield$pool$execute11, 1);
          results = _yield$pool$execute12[0];
          return _context8.abrupt("return", results);
        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          throw _context8.t0;
        case 13:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 10]]);
  }));
  return function getVisitedPlace(_x9) {
    return _ref8.apply(this, arguments);
  };
}();
var getalbumImage = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(PkID) {
    var albumimages, _yield$pool$execute13, _yield$pool$execute14, results;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          albumimages = "\n    SELECT\n  albumimage.AlbumId,\n  albumimage.tourpackageId,\n  albumimage.albumtitle,\n  albumimage.albumcoverimageurl\n  FROM albumimage\n  JOIN tourpackage ON albumimage.tourpackageId = tourpackage.PkID\n  WHERE albumimage.tourpackageId = ?;  \n";
          _context9.next = 4;
          return _db["default"].execute(albumimages, [PkID]);
        case 4:
          _yield$pool$execute13 = _context9.sent;
          _yield$pool$execute14 = _slicedToArray(_yield$pool$execute13, 1);
          results = _yield$pool$execute14[0];
          return _context9.abrupt("return", results);
        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](0);
          throw _context9.t0;
        case 13:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 10]]);
  }));
  return function getalbumImage(_x10) {
    return _ref9.apply(this, arguments);
  };
}();
var getHighlights = exports.getHighlights = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(PkID) {
    var highlightsQuery, _yield$pool$execute15, _yield$pool$execute16, results;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          highlightsQuery = "\n      SELECT\n        highlights.id,\n        highlights.tour_package_id,\n        highlights.highlights\n      FROM\n        highlights\n        JOIN tourpackage ON highlights.tour_package_id = tourpackage.PkID\n      WHERE\n        highlights.tour_package_id = ?\n    ";
          _context10.next = 4;
          return _db["default"].execute(highlightsQuery, [PkID]);
        case 4:
          _yield$pool$execute15 = _context10.sent;
          _yield$pool$execute16 = _slicedToArray(_yield$pool$execute15, 1);
          results = _yield$pool$execute16[0];
          return _context10.abrupt("return", results);
        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](0);
          throw _context10.t0;
        case 13:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 10]]);
  }));
  return function getHighlights(_x11) {
    return _ref10.apply(this, arguments);
  };
}();
var getBookingPolicy = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(PkID) {
    var bookingPolicyQuery, _yield$pool$execute17, _yield$pool$execute18, results;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          bookingPolicyQuery = "\n    SELECT\n    booking_policy.id,\n    booking_policy.tour_package_id,\n    booking_policy.booking_policy\n  FROM booking_policy\n  JOIN tourpackage ON booking_policy.tour_package_id = tourpackage.PkID\n  WHERE booking_policy.tour_package_id = ?;\n";
          _context11.next = 4;
          return _db["default"].execute(bookingPolicyQuery, [PkID]);
        case 4:
          _yield$pool$execute17 = _context11.sent;
          _yield$pool$execute18 = _slicedToArray(_yield$pool$execute17, 1);
          results = _yield$pool$execute18[0];
          return _context11.abrupt("return", results);
        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](0);
          throw _context11.t0;
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 10]]);
  }));
  return function getBookingPolicy(_x12) {
    return _ref11.apply(this, arguments);
  };
}();
var getAllTourPackages = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
    var tourPackageQuery, _yield$pool$execute19, _yield$pool$execute20, tourPackageResults;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          tourPackageQuery = "\n    SELECT\n      tourpackage.PkID AS tour_package_id,\n      tourpackage.MainTitle,\n      tourpackage.TripType,\n      tourpackage.Location,\n      tourpackage.StartDate,\n      tourpackage.EndDate,\n      tourpackage.AvailableSeats,\n      tourpackage.PricePerAdult,\n      tourpackage.PricePerChild,\n      tourpackage.PricePerInfant,\n      tourpackage.GirlsTrip,\n      tourpackage.PackageOverview,\n      tourpackage.MinimumAge,\n      tourpackage.MaximumAge,\n      tourpackage.Price,\n      tourpackage.City,\n      tourpackage.Discount,\n      tourpackage.SelfGuided,\n      tourpackage.Flight,\n      tourpackage.Food,\n      tourpackage.Transport,\n      tourpackage.FullyGuided,\n      tourpackage.coverImage\n    FROM\n      tourpackage;\n  ";
          _context12.next = 4;
          return _db["default"].execute(tourPackageQuery);
        case 4:
          _yield$pool$execute19 = _context12.sent;
          _yield$pool$execute20 = _slicedToArray(_yield$pool$execute19, 1);
          tourPackageResults = _yield$pool$execute20[0];
          console.log(tourPackageResults);
          return _context12.abrupt("return", tourPackageResults);
        case 11:
          _context12.prev = 11;
          _context12.t0 = _context12["catch"](0);
          throw _context12.t0;
        case 14:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 11]]);
  }));
  return function getAllTourPackages() {
    return _ref12.apply(this, arguments);
  };
}();
var updateTourPackage = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var packgeId, _req$body2, MainTitle, SubTitle, Price, City, Discount, Location, Availability, StartDate, EndDate, TripType, TotalDuration, PackageOverview, Showpackage, Flight, Transport, Food, Hotel, Country, AvailableSeats, MinimumAge, MaximumAge, PricePerAdult, PricePerChild, PricePerInfant, GirlsTrip, FamilyTrips, Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, coverImage, values, _yield$pool$query5, _yield$pool$query6, result;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          packgeId = req.params.PkID; // Assuming packageId is passed in the request parameters
          // Extract tour package details from request body
          _req$body2 = req.body, MainTitle = _req$body2.MainTitle, SubTitle = _req$body2.SubTitle, Price = _req$body2.Price, City = _req$body2.City, Discount = _req$body2.Discount, Location = _req$body2.Location, Availability = _req$body2.Availability, StartDate = _req$body2.StartDate, EndDate = _req$body2.EndDate, TripType = _req$body2.TripType, TotalDuration = _req$body2.TotalDuration, PackageOverview = _req$body2.PackageOverview, Showpackage = _req$body2.Showpackage, Flight = _req$body2.Flight, Transport = _req$body2.Transport, Food = _req$body2.Food, Hotel = _req$body2.Hotel, Country = _req$body2.Country, AvailableSeats = _req$body2.AvailableSeats, MinimumAge = _req$body2.MinimumAge, MaximumAge = _req$body2.MaximumAge, PricePerAdult = _req$body2.PricePerAdult, PricePerChild = _req$body2.PricePerChild, PricePerInfant = _req$body2.PricePerInfant, GirlsTrip = _req$body2.GirlsTrip, FamilyTrips = _req$body2.FamilyTrips, Adventure = _req$body2.Adventure, FullyGuided = _req$body2.FullyGuided, SelfGuided = _req$body2.SelfGuided, Guide = _req$body2.Guide, CancellationDate = _req$body2.CancellationDate; // Assuming the file field name is 'coverImage'
          // Extract cover image details from the uploaded file
          coverImage = req.publicImageLink; // Check if cover image is present
          // Execute raw SQL UPDATE query to update tour package details in the database
          values = [MainTitle, SubTitle, Price, PricePerAdult, PricePerChild, PricePerInfant, City, Discount, Location, Availability, StartDate, EndDate, TripType, TotalDuration, AvailableSeats, MinimumAge, MaximumAge, PackageOverview, Showpackage, Flight, Transport, Food, Hotel, Country, GirlsTrip, FamilyTrips, Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, coverImage, packgeId // Add packageId for WHERE clause
          ];
          _context13.next = 7;
          return _db["default"].query("UPDATE tourpackage SET \n        MainTitle = ?, \n        SubTitle = ?, \n        Price = ?, \n        PricePerAdult = ?, \n        PricePerChild = ?, \n        PricePerInfant = ?, \n        City = ?, \n        Discount = ?, \n        Location = ?, \n        Availability = ?, \n        StartDate = ?, \n        EndDate = ?, \n        TripType = ?, \n        TotalDuration = ?, \n        AvailableSeats = ?, \n        MinimumAge = ?, \n        MaximumAge = ?, \n        PackageOverview = ?, \n        Showpackage = ?, \n        Flight = ?, \n        Transport = ?, \n        Food = ?, \n        Hotel = ?, \n        Country = ?, \n        GirlsTrip = ?, \n        FamilyTrips = ?, \n        Adventure = ?, \n        FullyGuided = ?, \n        SelfGuided = ?, \n        Guide = ?, \n        CancellationDate = ?, \n        coverImage = ? \n      WHERE PkId = ?", values);
        case 7:
          _yield$pool$query5 = _context13.sent;
          _yield$pool$query6 = _slicedToArray(_yield$pool$query5, 1);
          result = _yield$pool$query6[0];
          return _context13.abrupt("return", result);
        case 13:
          _context13.prev = 13;
          _context13.t0 = _context13["catch"](0);
          console.error("Error updating travel package:", _context13.t0);
          res.status(500).json({
            error: "Error updating travel package"
          });
        case 17:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 13]]);
  }));
  return function updateTourPackage(_x13, _x14) {
    return _ref13.apply(this, arguments);
  };
}();
var MainImage = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, PkID) {
    var connection, _packageResults$, images, packageQuery, _yield$connection$exe, _yield$connection$exe2, packageResults, packageId, insertQuery, insertResults, _iterator, _step, imageurl, imageId, insertValues, _yield$connection$exe3, _yield$connection$exe4, result, _iterator2, _step2, imageUrl;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          console.log(PkID);
          images = req.images;
          _context14.next = 5;
          return _db["default"].getConnection();
        case 5:
          connection = _context14.sent;
          packageQuery = "SELECT PkID  FROM tourpackage WHERE PkID = ?";
          _context14.next = 9;
          return connection.execute(packageQuery, [PkID]);
        case 9:
          _yield$connection$exe = _context14.sent;
          _yield$connection$exe2 = _slicedToArray(_yield$connection$exe, 1);
          packageResults = _yield$connection$exe2[0];
          console.log(packageResults);
          if (!(packageResults.length === 0)) {
            _context14.next = 15;
            break;
          }
          throw new Error("Tour package not found.");
        case 15:
          packageId = (_packageResults$ = packageResults[0]) === null || _packageResults$ === void 0 ? void 0 : _packageResults$.PkID;
          console.log(packageId);

          // Insert each image URL into the cover_image table
          insertQuery = "INSERT INTO  mainimage (imageId, imageurl, packageId) VALUES (?, ?, ?)";
          console.log(insertQuery);
          insertResults = [];
          _iterator = _createForOfIteratorHelper(images);
          _context14.prev = 21;
          _iterator.s();
        case 23:
          if ((_step = _iterator.n()).done) {
            _context14.next = 36;
            break;
          }
          imageurl = _step.value;
          imageId = customcancId();
          insertValues = [imageId, imageurl, packageId];
          console.log(insertValues);
          _context14.next = 30;
          return connection.execute(insertQuery, insertValues);
        case 30:
          _yield$connection$exe3 = _context14.sent;
          _yield$connection$exe4 = _slicedToArray(_yield$connection$exe3, 1);
          result = _yield$connection$exe4[0];
          insertResults.push({
            imageId: imageId,
            packageId: packageId,
            imageurl: imageurl
          });
        case 34:
          _context14.next = 23;
          break;
        case 36:
          _context14.next = 41;
          break;
        case 38:
          _context14.prev = 38;
          _context14.t0 = _context14["catch"](21);
          _iterator.e(_context14.t0);
        case 41:
          _context14.prev = 41;
          _iterator.f();
          return _context14.finish(41);
        case 44:
          connection.release(); // Release the connection back to the pool
          return _context14.abrupt("return", insertResults);
        case 48:
          _context14.prev = 48;
          _context14.t1 = _context14["catch"](0);
          console.error(_context14.t1);
          // Rollback the images if an error occurs
          _iterator2 = _createForOfIteratorHelper(req.images);
          _context14.prev = 52;
          _iterator2.s();
        case 54:
          if ((_step2 = _iterator2.n()).done) {
            _context14.next = 60;
            break;
          }
          imageUrl = _step2.value;
          _context14.next = 58;
          return deleteImageFromURL(imageUrl);
        case 58:
          _context14.next = 54;
          break;
        case 60:
          _context14.next = 65;
          break;
        case 62:
          _context14.prev = 62;
          _context14.t2 = _context14["catch"](52);
          _iterator2.e(_context14.t2);
        case 65:
          _context14.prev = 65;
          _iterator2.f();
          return _context14.finish(65);
        case 68:
          throw new Error(_context14.t1.message);
        case 69:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 48], [21, 38, 41, 44], [52, 62, 65, 68]]);
  }));
  return function MainImage(_x15, _x16) {
    return _ref14.apply(this, arguments);
  };
}();
var UpdateMainImage = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, imageId) {
    var _packageResults$2;
    var imageUrl, packageQuery, _yield$pool$query7, _yield$pool$query8, packageResults, Id, updateQuery, values, _yield$pool$query9, _yield$pool$query10, result;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          imageUrl = req.publicImageLink;
          if (imageUrl) {
            _context15.next = 3;
            break;
          }
          return _context15.abrupt("return", 'No image URL provided');
        case 3:
          // connection = await pool.getConnection();
          packageQuery = "SELECT imageId FROM mainimage WHERE imageId = ?";
          _context15.next = 6;
          return _db["default"].query(packageQuery, [imageId]);
        case 6:
          _yield$pool$query7 = _context15.sent;
          _yield$pool$query8 = _slicedToArray(_yield$pool$query7, 1);
          packageResults = _yield$pool$query8[0];
          if (!(packageResults.length === 0)) {
            _context15.next = 11;
            break;
          }
          throw new Error("image not found.");
        case 11:
          Id = (_packageResults$2 = packageResults[0]) === null || _packageResults$2 === void 0 ? void 0 : _packageResults$2.imageId;
          updateQuery = "UPDATE mainimage  SET imageurl = ?\nWHERE imageId = ?";
          console.log(updateQuery);
          values = [imageUrl, Id];
          _context15.next = 17;
          return _db["default"].query(updateQuery, values);
        case 17:
          _yield$pool$query9 = _context15.sent;
          _yield$pool$query10 = _slicedToArray(_yield$pool$query9, 1);
          result = _yield$pool$query10[0];
          return _context15.abrupt("return", result);
        case 21:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function UpdateMainImage(_x17, _x18) {
    return _ref15.apply(this, arguments);
  };
}();
var createPlaceVisit = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, PkID) {
    var connection, _req$body3, _packageResults$3, images, placetovisit_names, packageQuery, _yield$connection$exe5, _yield$connection$exe6, packageResults, tourPackageId, insertQuery, insertResults, i, placeVisitId, insertValues, _yield$connection$exe7, _yield$connection$exe8, result, _iterator3, _step3, image;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          images = req.images;
          placetovisit_names = (_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.placetovisit_name;
          _context16.next = 5;
          return _db["default"].getConnection();
        case 5:
          connection = _context16.sent;
          packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
          _context16.next = 9;
          return connection.execute(packageQuery, [PkID]);
        case 9:
          _yield$connection$exe5 = _context16.sent;
          _yield$connection$exe6 = _slicedToArray(_yield$connection$exe5, 1);
          packageResults = _yield$connection$exe6[0];
          if (!(packageResults.length === 0)) {
            _context16.next = 14;
            break;
          }
          throw new Error("Tour package not found.");
        case 14:
          tourPackageId = (_packageResults$3 = packageResults[0]) === null || _packageResults$3 === void 0 ? void 0 : _packageResults$3.PkID; // If placetovisit_names is a string, convert it to an array
          if (typeof placetovisit_names === "string") {
            placetovisit_names = placetovisit_names.split(",");
          }

          // Insert each image URL into the place_to_visit table
          insertQuery = "INSERT INTO place_to_visit (id, tour_package_id, placetovisit_name, place_image) VALUES (?, ?, ?, ?)";
          insertResults = [];
          i = 0;
        case 19:
          if (!(i < images.length)) {
            _context16.next = 32;
            break;
          }
          placeVisitId = visitedimageid();
          insertValues = [placeVisitId, tourPackageId, placetovisit_names[i],
          // Use the specific name at index i, or an empty string if not available
          images[i]];
          console.log(insertValues);
          _context16.next = 25;
          return connection.execute(insertQuery, insertValues);
        case 25:
          _yield$connection$exe7 = _context16.sent;
          _yield$connection$exe8 = _slicedToArray(_yield$connection$exe7, 1);
          result = _yield$connection$exe8[0];
          insertResults.push({
            id: placeVisitId,
            tour_package_id: tourPackageId,
            placetovisit_name: placetovisit_names[i] || "",
            // Use the specific name at index i, or an empty string if not available
            place_image: images[i]
          });
        case 29:
          i++;
          _context16.next = 19;
          break;
        case 32:
          connection.release(); // Release the connection back to the pool
          return _context16.abrupt("return", insertResults);
        case 36:
          _context16.prev = 36;
          _context16.t0 = _context16["catch"](0);
          console.error(_context16.t0);
          // Rollback the images if an error occurs
          _iterator3 = _createForOfIteratorHelper(req.images);
          _context16.prev = 40;
          _iterator3.s();
        case 42:
          if ((_step3 = _iterator3.n()).done) {
            _context16.next = 48;
            break;
          }
          image = _step3.value;
          _context16.next = 46;
          return deleteImageFromURL(image);
        case 46:
          _context16.next = 42;
          break;
        case 48:
          _context16.next = 53;
          break;
        case 50:
          _context16.prev = 50;
          _context16.t1 = _context16["catch"](40);
          _iterator3.e(_context16.t1);
        case 53:
          _context16.prev = 53;
          _iterator3.f();
          return _context16.finish(53);
        case 56:
          throw new Error(_context16.t0.message);
        case 57:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 36], [40, 50, 53, 56]]);
  }));
  return function createPlaceVisit(_x19, _x20) {
    return _ref16.apply(this, arguments);
  };
}();
var createAlbumImage = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, PkID) {
    var connection, _packageResults$4, images, albumtitle, packageQuery, _yield$connection$exe9, _yield$connection$exe10, packageResults, tourPackageId, insertResults, newalbumquery, i, id, insertValues, _yield$connection$exe11, _yield$connection$exe12, result;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          images = req.images;
          albumtitle = req.body.albumtitle;
          _context17.next = 5;
          return _db["default"].getConnection();
        case 5:
          connection = _context17.sent;
          packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
          _context17.next = 9;
          return connection.execute(packageQuery, [PkID]);
        case 9:
          _yield$connection$exe9 = _context17.sent;
          _yield$connection$exe10 = _slicedToArray(_yield$connection$exe9, 1);
          packageResults = _yield$connection$exe10[0];
          if (!(packageResults.length === 0)) {
            _context17.next = 14;
            break;
          }
          throw new Error("Tour package not found.");
        case 14:
          tourPackageId = (_packageResults$4 = packageResults[0]) === null || _packageResults$4 === void 0 ? void 0 : _packageResults$4.PkID;
          insertResults = [];
          newalbumquery = "INSERT INTO albumimage (AlbumId, albumcoverimageurl, albumtitle , tourpackageId) values(?,?,?,?)";
          i = 0;
        case 18:
          if (!(i < images.length)) {
            _context17.next = 31;
            break;
          }
          id = visitedimageid();
          insertValues = [id, images[i], albumtitle, tourPackageId
          // Use the specific name at index i, or an empty string if not available
          ];
          console.log(insertValues);
          _context17.next = 24;
          return connection.execute(newalbumquery, insertValues);
        case 24:
          _yield$connection$exe11 = _context17.sent;
          _yield$connection$exe12 = _slicedToArray(_yield$connection$exe11, 1);
          result = _yield$connection$exe12[0];
          insertResults.push({
            AlbumId: id,
            tourpackageId: tourPackageId,
            albumtitle: albumtitle || "",
            // Use the specific name at index i, or an empty string if not available
            albumcoverimageurl: images[i]
          });
        case 28:
          i++;
          _context17.next = 18;
          break;
        case 31:
          connection.release(); // Release the connection back to the pool
          return _context17.abrupt("return", insertResults);
        case 35:
          _context17.prev = 35;
          _context17.t0 = _context17["catch"](0);
          console.log(_context17.t0);
        case 38:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 35]]);
  }));
  return function createAlbumImage(_x21, _x22) {
    return _ref17.apply(this, arguments);
  };
}();
var UpdateAlbumImage = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, AlbumId) {
    var _packageResults$5;
    var albumtitle, imageUrl, packageQuery, _yield$pool$query11, _yield$pool$query12, packageResults, Id, updateQuery, values, _yield$pool$query13, _yield$pool$query14, result;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          albumtitle = req.body.albumtitle;
          imageUrl = req.publicImageLink;
          if (imageUrl) {
            _context18.next = 4;
            break;
          }
          return _context18.abrupt("return", 'No image URL provided');
        case 4:
          // connection = await pool.getConnection();
          packageQuery = "SELECT AlbumId FROM albumimage WHERE AlbumId = ?";
          _context18.next = 7;
          return _db["default"].query(packageQuery, [AlbumId]);
        case 7:
          _yield$pool$query11 = _context18.sent;
          _yield$pool$query12 = _slicedToArray(_yield$pool$query11, 1);
          packageResults = _yield$pool$query12[0];
          if (!(packageResults.length === 0)) {
            _context18.next = 12;
            break;
          }
          throw new Error("Album not found.");
        case 12:
          Id = (_packageResults$5 = packageResults[0]) === null || _packageResults$5 === void 0 ? void 0 : _packageResults$5.AlbumId;
          updateQuery = "UPDATE albumimage  SET albumcoverimageurl = ?,\n    albumtitle = ? \nWHERE AlbumId = ?";
          console.log(updateQuery);
          values = [imageUrl, albumtitle, Id];
          _context18.next = 18;
          return _db["default"].query(updateQuery, values);
        case 18:
          _yield$pool$query13 = _context18.sent;
          _yield$pool$query14 = _slicedToArray(_yield$pool$query13, 1);
          result = _yield$pool$query14[0];
          return _context18.abrupt("return", result);
        case 22:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return function UpdateAlbumImage(_x23, _x24) {
    return _ref18.apply(this, arguments);
  };
}();

//delete image
function deleteImageFromURL(_x25) {
  return _deleteImageFromURL.apply(this, arguments);
}
function _deleteImageFromURL() {
  _deleteImageFromURL = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(url) {
    var parsedUrl, bucketName, pathSegments, objectName, _storage;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          if (url) {
            _context27.next = 4;
            break;
          }
          console.error("Invalid URL: ", url);
          return _context27.abrupt("return");
        case 4:
          parsedUrl = new URL(url);
          bucketName = parsedUrl.hostname.split(".")[0];
          pathSegments = decodeURIComponent(parsedUrl.pathname).split("/");
          objectName = pathSegments[pathSegments.length - 1]; // Get the last segment
          console.table({
            bucketName: bucketName,
            objectName: objectName
          });
          _storage = new Storage({
            projectId: "quickticketsb2b-nodejs",
            keyFilename: "key.json"
          });
          _context27.next = 12;
          return _storage.bucket("b2bnodeimages").file(objectName)["delete"]();
        case 12:
          _context27.next = 17;
          break;
        case 14:
          _context27.prev = 14;
          _context27.t0 = _context27["catch"](0);
          console.error("Error deleting image: ".concat(_context27.t0));
        case 17:
        case "end":
          return _context27.stop();
      }
    }, _callee27, null, [[0, 14]]);
  }));
  return _deleteImageFromURL.apply(this, arguments);
}
var createTourPlan = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req) {
    var connection, updatedOrInsertedTourPlans, _iterator4, _step4, _packageResults$6, tourPlanData, day_title, day_plan, id, packageQuery, _yield$connection$exe13, _yield$connection$exe14, packageResults, tourPackageId, generatedId, values, _yield$pool$query15, _yield$pool$query16, result;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return _db["default"].getConnection();
        case 3:
          connection = _context19.sent;
          updatedOrInsertedTourPlans = []; // Iterate over the array of tour plan data
          _iterator4 = _createForOfIteratorHelper(req.body.tourplanData);
          _context19.prev = 6;
          _iterator4.s();
        case 8:
          if ((_step4 = _iterator4.n()).done) {
            _context19.next = 36;
            break;
          }
          tourPlanData = _step4.value;
          day_title = tourPlanData.day_title, day_plan = tourPlanData.day_plan, id = tourPlanData.id; // Extract ID from tourPlanData
          // Retrieve tour package ID from the database
          packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
          _context19.next = 14;
          return connection.execute(packageQuery, [req.params.PkID]);
        case 14:
          _yield$connection$exe13 = _context19.sent;
          _yield$connection$exe14 = _slicedToArray(_yield$connection$exe13, 1);
          packageResults = _yield$connection$exe14[0];
          if (!(packageResults.length === 0)) {
            _context19.next = 19;
            break;
          }
          throw new Error("Tour package not found.");
        case 19:
          tourPackageId = (_packageResults$6 = packageResults[0]) === null || _packageResults$6 === void 0 ? void 0 : _packageResults$6.PkID;
          if (!id) {
            _context19.next = 26;
            break;
          }
          _context19.next = 23;
          return _db["default"].query("UPDATE tourplan SET day_title = ?, day_plan = ? WHERE id = ?", [day_title, day_plan, id]);
        case 23:
          updatedOrInsertedTourPlans.push({
            id: id,
            status: "sucesss",
            message: "tourplan updated successfully"
          }); // Push info about the update
          _context19.next = 34;
          break;
        case 26:
          // Generate a unique ID for the tour plan
          generatedId = generatePackageId(); // Prepare values for the INSERT query
          values = [generatedId, tourPackageId, day_title, day_plan]; // Execute the INSERT query to add the tour plan to the database
          _context19.next = 30;
          return _db["default"].query("INSERT INTO tourplan (id, tour_package_id, day_title, day_plan) VALUES (?, ?, ?, ?)", values);
        case 30:
          _yield$pool$query15 = _context19.sent;
          _yield$pool$query16 = _slicedToArray(_yield$pool$query15, 1);
          result = _yield$pool$query16[0];
          updatedOrInsertedTourPlans.push(result); // Push the inserted record
        case 34:
          _context19.next = 8;
          break;
        case 36:
          _context19.next = 41;
          break;
        case 38:
          _context19.prev = 38;
          _context19.t0 = _context19["catch"](6);
          _iterator4.e(_context19.t0);
        case 41:
          _context19.prev = 41;
          _iterator4.f();
          return _context19.finish(41);
        case 44:
          return _context19.abrupt("return", updatedOrInsertedTourPlans);
        case 47:
          _context19.prev = 47;
          _context19.t1 = _context19["catch"](0);
          console.log(_context19.t1);
        case 50:
          _context19.prev = 50;
          if (connection) {
            connection.release();
          }
          return _context19.finish(50);
        case 53:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 47, 50, 53], [6, 38, 41, 44]]);
  }));
  return function createTourPlan(_x26) {
    return _ref19.apply(this, arguments);
  };
}();
var createInclusion = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, PkID) {
    var inclusions, connection, updatedOrInsertedInclusions, _iterator5, _step5, inclusion, id, inclusionText, packageQuery, _yield$connection$exe15, _yield$connection$exe16, packageResults, tourPackageId, updateQuery, newId, insertQuery;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          inclusions = req.body; // if (!inclusions || !Array.isArray(inclusions) || inclusions.length === 0) {
          //   throw new Error("Inclusion data is required and should be an array.");
          // }
          _context20.next = 4;
          return _db["default"].getConnection();
        case 4:
          connection = _context20.sent;
          updatedOrInsertedInclusions = [];
          _iterator5 = _createForOfIteratorHelper(inclusions);
          _context20.prev = 7;
          _iterator5.s();
        case 9:
          if ((_step5 = _iterator5.n()).done) {
            _context20.next = 37;
            break;
          }
          inclusion = _step5.value;
          id = inclusion.id, inclusionText = inclusion.inclusionText; // Assuming each object in the array has properties named 'id' and 'inclusionText'
          if (inclusionText) {
            _context20.next = 14;
            break;
          }
          throw new Error("Inclusion text is required for each object.");
        case 14:
          packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
          _context20.next = 17;
          return connection.execute(packageQuery, [PkID]);
        case 17:
          _yield$connection$exe15 = _context20.sent;
          _yield$connection$exe16 = _slicedToArray(_yield$connection$exe15, 1);
          packageResults = _yield$connection$exe16[0];
          if (!(packageResults.length === 0)) {
            _context20.next = 22;
            break;
          }
          throw new Error("Tour package not found.");
        case 22:
          tourPackageId = packageResults[0].PkID;
          if (!id) {
            _context20.next = 30;
            break;
          }
          // If ID is provided, update the existing inclusion
          updateQuery = "UPDATE inclusion SET inclusion = ? WHERE id = ?";
          _context20.next = 27;
          return connection.execute(updateQuery, [inclusionText, id]);
        case 27:
          updatedOrInsertedInclusions.push({
            id: id,
            status: "success",
            message: "Inclusion updated successfully"
          });
          _context20.next = 35;
          break;
        case 30:
          // If ID is not provided, it's a new inclusion to be inserted
          newId = custominclusion();
          insertQuery = "INSERT INTO inclusion (id, tour_package_id, inclusion) VALUES (?, ?, ?)";
          _context20.next = 34;
          return connection.execute(insertQuery, [newId, tourPackageId, inclusionText]);
        case 34:
          updatedOrInsertedInclusions.push({
            id: newId,
            status: "success",
            message: "New inclusion inserted successfully"
          });
        case 35:
          _context20.next = 9;
          break;
        case 37:
          _context20.next = 42;
          break;
        case 39:
          _context20.prev = 39;
          _context20.t0 = _context20["catch"](7);
          _iterator5.e(_context20.t0);
        case 42:
          _context20.prev = 42;
          _iterator5.f();
          return _context20.finish(42);
        case 45:
          connection.release();
          return _context20.abrupt("return", updatedOrInsertedInclusions);
        case 49:
          _context20.prev = 49;
          _context20.t1 = _context20["catch"](0);
          console.error(_context20.t1);
          throw new Error(_context20.t1.message);
        case 53:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 49], [7, 39, 42, 45]]);
  }));
  return function createInclusion(_x27, _x28) {
    return _ref20.apply(this, arguments);
  };
}();
var createExclusion = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, PkID) {
    var connection, updatedOrInsertedExclusions, exclusions, packageQuery, _yield$connection$exe17, _yield$connection$exe18, packageResults, tour_package_id, _iterator6, _step6, exclusionObj, exclusionId, existingExclusionQuery, _yield$connection$exe19, _yield$connection$exe20, existingExclusionResults, pack_id, insertQuery;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return _db["default"].getConnection();
        case 3:
          connection = _context21.sent;
          updatedOrInsertedExclusions = [];
          exclusions = req.body;
          if (!(!exclusions || !Array.isArray(exclusions) || exclusions.length === 0)) {
            _context21.next = 8;
            break;
          }
          throw new Error("Exclusion data is required as an array of objects.");
        case 8:
          packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
          _context21.next = 11;
          return connection.execute(packageQuery, [PkID]);
        case 11:
          _yield$connection$exe17 = _context21.sent;
          _yield$connection$exe18 = _slicedToArray(_yield$connection$exe17, 1);
          packageResults = _yield$connection$exe18[0];
          if (!(packageResults.length === 0)) {
            _context21.next = 16;
            break;
          }
          throw new Error("Tour package not found.");
        case 16:
          tour_package_id = packageResults[0].PkID;
          _iterator6 = _createForOfIteratorHelper(exclusions);
          _context21.prev = 18;
          _iterator6.s();
        case 20:
          if ((_step6 = _iterator6.n()).done) {
            _context21.next = 42;
            break;
          }
          exclusionObj = _step6.value;
          exclusionId = exclusionObj.id;
          existingExclusionQuery = "SELECT id FROM exclusion WHERE id = ?";
          _context21.next = 26;
          return connection.execute(existingExclusionQuery, [exclusionId]);
        case 26:
          _yield$connection$exe19 = _context21.sent;
          _yield$connection$exe20 = _slicedToArray(_yield$connection$exe19, 1);
          existingExclusionResults = _yield$connection$exe20[0];
          if (!(existingExclusionResults.length > 0)) {
            _context21.next = 35;
            break;
          }
          _context21.next = 32;
          return connection.execute("UPDATE exclusion SET exclusion = ? WHERE id = ?", [exclusionObj.exclusion, exclusionId]);
        case 32:
          updatedOrInsertedExclusions.push({
            id: exclusionId,
            status: "success",
            message: "Exclusion updated successfully"
          });
          _context21.next = 40;
          break;
        case 35:
          // If the exclusion ID doesn't exist, insert a new record
          pack_id = custominclusion();
          insertQuery = "INSERT INTO exclusion (id, tour_package_id, exclusion) VALUES (?, ?, ?)";
          _context21.next = 39;
          return connection.execute(insertQuery, [pack_id, tour_package_id, exclusionObj.exclusion]);
        case 39:
          updatedOrInsertedExclusions.push({
            id: pack_id,
            status: "success",
            message: "Exclusion inserted successfully"
          });
        case 40:
          _context21.next = 20;
          break;
        case 42:
          _context21.next = 47;
          break;
        case 44:
          _context21.prev = 44;
          _context21.t0 = _context21["catch"](18);
          _iterator6.e(_context21.t0);
        case 47:
          _context21.prev = 47;
          _iterator6.f();
          return _context21.finish(47);
        case 50:
          return _context21.abrupt("return", updatedOrInsertedExclusions);
        case 53:
          _context21.prev = 53;
          _context21.t1 = _context21["catch"](0);
          console.error(_context21.t1);
          throw new Error(_context21.t1.message);
        case 57:
          _context21.prev = 57;
          if (connection) {
            connection.release();
          }
          return _context21.finish(57);
        case 60:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[0, 53, 57, 60], [18, 44, 47, 50]]);
  }));
  return function createExclusion(_x29, _x30) {
    return _ref21.apply(this, arguments);
  };
}();
var createBookingPolicy = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, PkID) {
    var bookingPolicies, connection, updatedOrInsertedPolicies, _iterator7, _step7, policyObj, id, booking_policy, packageQuery, _yield$connection$exe21, _yield$connection$exe22, packageResults, tour_package_id, updateQuery, newId, insertQuery;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          bookingPolicies = req.body;
          if (!(!bookingPolicies || !Array.isArray(bookingPolicies) || bookingPolicies.length === 0)) {
            _context22.next = 4;
            break;
          }
          throw new Error("Booking policy data is required as an array of objects.");
        case 4:
          _context22.next = 6;
          return _db["default"].getConnection();
        case 6:
          connection = _context22.sent;
          updatedOrInsertedPolicies = [];
          _iterator7 = _createForOfIteratorHelper(bookingPolicies);
          _context22.prev = 9;
          _iterator7.s();
        case 11:
          if ((_step7 = _iterator7.n()).done) {
            _context22.next = 39;
            break;
          }
          policyObj = _step7.value;
          id = policyObj.id, booking_policy = policyObj.booking_policy;
          if (booking_policy) {
            _context22.next = 16;
            break;
          }
          throw new Error("Booking policy text is required for each object.");
        case 16:
          packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
          _context22.next = 19;
          return connection.execute(packageQuery, [PkID]);
        case 19:
          _yield$connection$exe21 = _context22.sent;
          _yield$connection$exe22 = _slicedToArray(_yield$connection$exe21, 1);
          packageResults = _yield$connection$exe22[0];
          if (!(packageResults.length === 0)) {
            _context22.next = 24;
            break;
          }
          throw new Error("Tour package not found.");
        case 24:
          tour_package_id = packageResults[0].PkID;
          if (!id) {
            _context22.next = 32;
            break;
          }
          // If ID is provided, update the existing booking policy
          updateQuery = "UPDATE booking_policy SET booking_policy = ? WHERE id = ?";
          _context22.next = 29;
          return connection.execute(updateQuery, [booking_policy, id]);
        case 29:
          updatedOrInsertedPolicies.push({
            id: id,
            status: "success",
            message: "Booking policy updated successfully"
          });
          _context22.next = 37;
          break;
        case 32:
          // If ID is not provided, it's a new booking policy to be inserted
          newId = customBookingPolicy();
          insertQuery = "INSERT INTO booking_policy (id, tour_package_id, booking_policy) VALUES (?, ?, ?)";
          _context22.next = 36;
          return connection.execute(insertQuery, [newId, tour_package_id, booking_policy]);
        case 36:
          updatedOrInsertedPolicies.push({
            id: newId,
            status: "success",
            message: "New booking policy inserted successfully"
          });
        case 37:
          _context22.next = 11;
          break;
        case 39:
          _context22.next = 44;
          break;
        case 41:
          _context22.prev = 41;
          _context22.t0 = _context22["catch"](9);
          _iterator7.e(_context22.t0);
        case 44:
          _context22.prev = 44;
          _iterator7.f();
          return _context22.finish(44);
        case 47:
          connection.release();
          return _context22.abrupt("return", updatedOrInsertedPolicies);
        case 51:
          _context22.prev = 51;
          _context22.t1 = _context22["catch"](0);
          console.error(_context22.t1);
          throw new Error(_context22.t1.message);
        case 55:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 51], [9, 41, 44, 47]]);
  }));
  return function createBookingPolicy(_x31, _x32) {
    return _ref22.apply(this, arguments);
  };
}();
var createCancelationPolicy = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, PkID) {
    var cancellationPolicies, connection, packageQuery, _yield$connection$exe23, _yield$connection$exe24, packageResults, tour_package_id, insertQuery, insertResults, _iterator8, _step8, cancellationObj, id, insertValues, _yield$connection$exe25, _yield$connection$exe26, result;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          cancellationPolicies = req.body;
          if (!(!cancellationPolicies || !Array.isArray(cancellationPolicies) || cancellationPolicies.length === 0)) {
            _context23.next = 4;
            break;
          }
          throw new Error("Cancellation policies are required as an array of objects.");
        case 4:
          _context23.next = 6;
          return _db["default"].getConnection();
        case 6:
          connection = _context23.sent;
          packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
          _context23.next = 10;
          return connection.execute(packageQuery, [PkID]);
        case 10:
          _yield$connection$exe23 = _context23.sent;
          _yield$connection$exe24 = _slicedToArray(_yield$connection$exe23, 1);
          packageResults = _yield$connection$exe24[0];
          if (!(packageResults.length === 0)) {
            _context23.next = 15;
            break;
          }
          throw new Error("Tour package not found.");
        case 15:
          tour_package_id = packageResults[0].PkID;
          insertQuery = "INSERT INTO cancellation_policy (id, tour_package_id, cancellation_policy) VALUES (?, ?, ?)";
          insertResults = []; // Insert each cancellation policy object as a separate row
          _iterator8 = _createForOfIteratorHelper(cancellationPolicies);
          _context23.prev = 19;
          _iterator8.s();
        case 21:
          if ((_step8 = _iterator8.n()).done) {
            _context23.next = 33;
            break;
          }
          cancellationObj = _step8.value;
          id = customcancId();
          insertValues = [id, tour_package_id, cancellationObj.cancellation_policy];
          _context23.next = 27;
          return connection.execute(insertQuery, insertValues);
        case 27:
          _yield$connection$exe25 = _context23.sent;
          _yield$connection$exe26 = _slicedToArray(_yield$connection$exe25, 1);
          result = _yield$connection$exe26[0];
          insertResults.push(result);
        case 31:
          _context23.next = 21;
          break;
        case 33:
          _context23.next = 38;
          break;
        case 35:
          _context23.prev = 35;
          _context23.t0 = _context23["catch"](19);
          _iterator8.e(_context23.t0);
        case 38:
          _context23.prev = 38;
          _iterator8.f();
          return _context23.finish(38);
        case 41:
          connection.release();
          return _context23.abrupt("return", insertResults);
        case 45:
          _context23.prev = 45;
          _context23.t1 = _context23["catch"](0);
          console.error(_context23.t1);
          throw new Error(_context23.t1.message);
        case 49:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[0, 45], [19, 35, 38, 41]]);
  }));
  return function createCancelationPolicy(_x33, _x34) {
    return _ref23.apply(this, arguments);
  };
}();
var createHighlights = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, PkID) {
    var highlights, connection, updatedOrInsertedHighlights, _iterator9, _step9, highlightObj, id, _highlights, packageQuery, _yield$connection$exe27, _yield$connection$exe28, packageResults, tour_package_id, updateQuery, newId, insertQuery;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          highlights = req.body;
          if (!(!highlights || !Array.isArray(highlights) || highlights.length === 0)) {
            _context24.next = 4;
            break;
          }
          throw new Error("Highlights are required as an array of objects.");
        case 4:
          _context24.next = 6;
          return _db["default"].getConnection();
        case 6:
          connection = _context24.sent;
          updatedOrInsertedHighlights = [];
          _iterator9 = _createForOfIteratorHelper(highlights);
          _context24.prev = 9;
          _iterator9.s();
        case 11:
          if ((_step9 = _iterator9.n()).done) {
            _context24.next = 39;
            break;
          }
          highlightObj = _step9.value;
          id = highlightObj.id, _highlights = highlightObj.highlights;
          if (_highlights) {
            _context24.next = 16;
            break;
          }
          throw new Error("Highlight text is required for each object.");
        case 16:
          packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
          _context24.next = 19;
          return connection.execute(packageQuery, [PkID]);
        case 19:
          _yield$connection$exe27 = _context24.sent;
          _yield$connection$exe28 = _slicedToArray(_yield$connection$exe27, 1);
          packageResults = _yield$connection$exe28[0];
          if (!(packageResults.length === 0)) {
            _context24.next = 24;
            break;
          }
          throw new Error("Tour package not found.");
        case 24:
          tour_package_id = packageResults[0].PkID;
          if (!id) {
            _context24.next = 32;
            break;
          }
          // If ID is provided, update the existing highlight
          updateQuery = "UPDATE highlights SET highlights = ? WHERE id = ?";
          _context24.next = 29;
          return connection.execute(updateQuery, [_highlights, id]);
        case 29:
          updatedOrInsertedHighlights.push({
            id: id,
            status: "success",
            message: "Highlight updated successfully"
          });
          _context24.next = 37;
          break;
        case 32:
          // If ID is not provided, it's a new highlight to be inserted
          newId = customHighlight();
          insertQuery = "INSERT INTO highlights (id, tour_package_id, highlights) VALUES (?, ?, ?)";
          _context24.next = 36;
          return connection.execute(insertQuery, [newId, tour_package_id, _highlights]);
        case 36:
          updatedOrInsertedHighlights.push({
            id: newId,
            status: "success",
            message: "New highlight inserted successfully"
          });
        case 37:
          _context24.next = 11;
          break;
        case 39:
          _context24.next = 44;
          break;
        case 41:
          _context24.prev = 41;
          _context24.t0 = _context24["catch"](9);
          _iterator9.e(_context24.t0);
        case 44:
          _context24.prev = 44;
          _iterator9.f();
          return _context24.finish(44);
        case 47:
          connection.release();
          return _context24.abrupt("return", updatedOrInsertedHighlights);
        case 51:
          _context24.prev = 51;
          _context24.t1 = _context24["catch"](0);
          console.error(_context24.t1);
          throw new Error(_context24.t1.message);
        case 55:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[0, 51], [9, 41, 44, 47]]);
  }));
  return function createHighlights(_x35, _x36) {
    return _ref24.apply(this, arguments);
  };
}();
var createAddOns = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(tour_package_id, req) {
    var addOns, connection, updatedOrInsertedAddOns, _iterator10, _step10, addOn, id, service, description, title, insertQuery, updateQuery, newId, _yield$connection$exe29, _yield$connection$exe30, result;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          addOns = req.body;
          if (!(!addOns || !Array.isArray(addOns) || addOns.length === 0)) {
            _context25.next = 4;
            break;
          }
          throw new Error("Add-ons are required as an array of objects.");
        case 4:
          _context25.next = 6;
          return _db["default"].getConnection();
        case 6:
          connection = _context25.sent;
          updatedOrInsertedAddOns = [];
          _iterator10 = _createForOfIteratorHelper(addOns);
          _context25.prev = 9;
          _iterator10.s();
        case 11:
          if ((_step10 = _iterator10.n()).done) {
            _context25.next = 33;
            break;
          }
          addOn = _step10.value;
          id = addOn.id, service = addOn.service, description = addOn.description, title = addOn.title;
          if (!(!service || !description || !title)) {
            _context25.next = 16;
            break;
          }
          throw new Error("Service, description, and title are required for each add-on object.");
        case 16:
          insertQuery = "INSERT INTO add_ons (id, services, description, tour_package_id, title) VALUES (?, ?, ?, ?, ?)";
          if (!id) {
            _context25.next = 24;
            break;
          }
          // If ID is provided, update the existing add-on
          updateQuery = "UPDATE add_ons SET services = ?, description = ?, title = ? WHERE id = ?";
          _context25.next = 21;
          return connection.execute(updateQuery, [service, description, title, id]);
        case 21:
          updatedOrInsertedAddOns.push({
            id: id,
            status: "success",
            message: "Add-on updated successfully"
          });
          _context25.next = 31;
          break;
        case 24:
          // If ID is not provided, it's a new add-on to be inserted
          newId = Addonservice(); // Assuming Addonservice generates a new ID
          _context25.next = 27;
          return connection.execute(insertQuery, [newId, service, description, tour_package_id, title]);
        case 27:
          _yield$connection$exe29 = _context25.sent;
          _yield$connection$exe30 = _slicedToArray(_yield$connection$exe29, 1);
          result = _yield$connection$exe30[0];
          updatedOrInsertedAddOns.push({
            id: newId,
            status: "success",
            message: "New add-on inserted successfully"
          });
        case 31:
          _context25.next = 11;
          break;
        case 33:
          _context25.next = 38;
          break;
        case 35:
          _context25.prev = 35;
          _context25.t0 = _context25["catch"](9);
          _iterator10.e(_context25.t0);
        case 38:
          _context25.prev = 38;
          _iterator10.f();
          return _context25.finish(38);
        case 41:
          connection.release();
          return _context25.abrupt("return", updatedOrInsertedAddOns);
        case 45:
          _context25.prev = 45;
          _context25.t1 = _context25["catch"](0);
          console.error(_context25.t1);
          throw _context25.t1;
        case 49:
        case "end":
          return _context25.stop();
      }
    }, _callee25, null, [[0, 45], [9, 35, 38, 41]]);
  }));
  return function createAddOns(_x37, _x38) {
    return _ref25.apply(this, arguments);
  };
}();
var deleteTourPlanEvents = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(req, id) {
    var connection, eventIds, deletedEvents, _iterator11, _step11, eventId, tourPlanEventsDeleteQuery, _yield$connection$que, _yield$connection$que2, deleteResult;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          _context26.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context26.sent;
          _context26.prev = 3;
          _context26.next = 6;
          return connection.beginTransaction();
        case 6:
          eventIds = req.body;
          deletedEvents = [];
          _iterator11 = _createForOfIteratorHelper(eventIds);
          _context26.prev = 9;
          _iterator11.s();
        case 11:
          if ((_step11 = _iterator11.n()).done) {
            _context26.next = 22;
            break;
          }
          eventId = _step11.value;
          tourPlanEventsDeleteQuery = "\n        DELETE FROM tour_plan_events\n        WHERE id = ? AND tour_plan_id =?\n      ";
          _context26.next = 16;
          return connection.query(tourPlanEventsDeleteQuery, [eventId.id, id]);
        case 16:
          _yield$connection$que = _context26.sent;
          _yield$connection$que2 = _slicedToArray(_yield$connection$que, 1);
          deleteResult = _yield$connection$que2[0];
          if (deleteResult.affectedRows > 0) {
            deletedEvents.push({
              id: eventId.id
            });
          }
        case 20:
          _context26.next = 11;
          break;
        case 22:
          _context26.next = 27;
          break;
        case 24:
          _context26.prev = 24;
          _context26.t0 = _context26["catch"](9);
          _iterator11.e(_context26.t0);
        case 27:
          _context26.prev = 27;
          _iterator11.f();
          return _context26.finish(27);
        case 30:
          _context26.next = 32;
          return connection.commit();
        case 32:
          return _context26.abrupt("return", deletedEvents);
        case 35:
          _context26.prev = 35;
          _context26.t1 = _context26["catch"](3);
          _context26.next = 39;
          return connection.rollback();
        case 39:
          throw _context26.t1;
        case 40:
          _context26.prev = 40;
          connection.release();
          return _context26.finish(40);
        case 43:
        case "end":
          return _context26.stop();
      }
    }, _callee26, null, [[3, 35, 40, 43], [9, 24, 27, 30]]);
  }));
  return function deleteTourPlanEvents(_x39, _x40) {
    return _ref26.apply(this, arguments);
  };
}();
var tourpackageService = exports.tourpackageService = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
  getSingleTourPackages: getSingleTourPackages,
  addtourpackage: addtourpackage,
  getAllTourPackages: getAllTourPackages,
  updateTourPackage: updateTourPackage,
  MainImage: MainImage,
  createPlaceVisit: createPlaceVisit,
  createTourPlan: createTourPlan,
  getTourPlan: getTourPlan,
  deleteTourPlanEvents: deleteTourPlanEvents,
  createInclusion: createInclusion,
  createExclusion: createExclusion,
  createBookingPolicy: createBookingPolicy,
  createCancelationPolicy: createCancelationPolicy,
  createHighlights: createHighlights,
  createAddOns: createAddOns
}, "getSingleTourPackages", getSingleTourPackages), "getBookingPolicy", getBookingPolicy), "createAlbumImage", createAlbumImage), "UpdateAlbumImage", UpdateAlbumImage), "updateTourPackage", updateTourPackage), "UpdateMainImage", UpdateMainImage);