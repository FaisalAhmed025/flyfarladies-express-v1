"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteImageFromURL = deleteImageFromURL;
exports.upload = exports.tourpackageService = exports.getHighlights = exports.getFAQs = exports.getExclusion = exports.getCancellationPolicy = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _db = _interopRequireDefault(require("../database/db"));
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _tourpackageService;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
var custommainid = function custommainid() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "MI" + Math.floor(Math.random() * 10000);
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
var cancelationpolicy = function cancelationpolicy() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "c" + Math.floor(Math.random() * 10000);
};
var customHighlight = function customHighlight() {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "H" + Math.floor(Math.random() * 10000);
};
function logMessage() {
  console.log('Cron job executed at:', new Date().toLocaleString());
}
var deactivatePackages = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var connection, currentDate, updateQuery;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _db["default"].getConnection();
        case 3:
          connection = _context.sent;
          currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
          console.log(currentDate);
          updateQuery = "\n      UPDATE tourpackage\n      SET isActive = 0\n      WHERE StartDate < ? AND isActive = 1\n    ";
          _context.next = 9;
          return connection.execute(updateQuery, [currentDate]);
        case 9:
          connection.release();
          console.log('Packages deactivated successfully');
          _context.next = 16;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error('Error deactivating packages:', _context.t0);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function deactivatePackages() {
    return _ref.apply(this, arguments);
  };
}();
_nodeCron["default"].schedule('0 0 * * *', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        console.log('Running package deactivation task...');
        logMessage();
        _context2.next = 4;
        return deactivatePackages();
      case 4:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
var addtourpackage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body, MainTitle, Price, City, Discount, Location, Availability, TripType, TotalDuration, PackageOverview, Showpackage, Flight, Transport, Food, Hotel, Country, MinimumAge, MaximumAge, GirlsTrip, FamilyTrips, Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, adult_base_price, child_base_price, infant_base_price, accommodation, coverImage, packgeId, values, _yield$pool$query, _yield$pool$query2, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Extract tour package details from request body
          _req$body = req.body, MainTitle = _req$body.MainTitle, Price = _req$body.Price, City = _req$body.City, Discount = _req$body.Discount, Location = _req$body.Location, Availability = _req$body.Availability, TripType = _req$body.TripType, TotalDuration = _req$body.TotalDuration, PackageOverview = _req$body.PackageOverview, Showpackage = _req$body.Showpackage, Flight = _req$body.Flight, Transport = _req$body.Transport, Food = _req$body.Food, Hotel = _req$body.Hotel, Country = _req$body.Country, MinimumAge = _req$body.MinimumAge, MaximumAge = _req$body.MaximumAge, GirlsTrip = _req$body.GirlsTrip, FamilyTrips = _req$body.FamilyTrips, Adventure = _req$body.Adventure, FullyGuided = _req$body.FullyGuided, SelfGuided = _req$body.SelfGuided, Guide = _req$body.Guide, CancellationDate = _req$body.CancellationDate, adult_base_price = _req$body.adult_base_price, child_base_price = _req$body.child_base_price, infant_base_price = _req$body.infant_base_price, accommodation = _req$body.accommodation; // Assuming the file field name is 'coverImage'
          // Extract cover image details from the uploaded file
          coverImage = req.publicImageLink;
          packgeId = generatePackageId(); // Check if cover image is present
          if (coverImage) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: "Cover image is required"
          }));
        case 6:
          // Execute raw SQL INSERT query to insert tour package details into database
          values = [packgeId, MainTitle, Price, City, Discount, Location, Availability, TripType, TotalDuration, MinimumAge, MaximumAge, PackageOverview, Showpackage, Flight, Transport, Food, Hotel, Country, GirlsTrip, FamilyTrips, Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, coverImage, adult_base_price, child_base_price, infant_base_price, accommodation];
          _context3.next = 9;
          return _db["default"].query("INSERT INTO tourpackage (PKID,\n        MainTitle, Price,\n        City, Discount, Location, Availability, TripType,\n        TotalDuration, MinimumAge, MaximumAge, PackageOverview,\n        Showpackage, Flight, Transport, Food, Hotel, Country, GirlsTrip, FamilyTrips,\n        Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, coverImage,   adult_base_price, \n        child_base_price,\n        infant_base_price,\n        accommodation \n      ) \n      VALUES (?,?,?,?,?,?,?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)", values);
        case 9:
          _yield$pool$query = _context3.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          result = _yield$pool$query2[0];
          console.log(values);
          return _context3.abrupt("return", res.status(200).json({
            status: "success",
            message: "Travel package added successfully",
            Id: packgeId
          }));
        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          console.error("Error adding travel package:", _context3.t0);
          res.status(500).json({
            error: "Error adding travel package"
          });
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 16]]);
  }));
  return function addtourpackage(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();
var getSingleTourPackages = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(PKID) {
    var tourPackageQuery, _yield$pool$execute, _yield$pool$execute2, tourPackageResults, tourPackagesData, tourPackageData, _yield$Promise$all, _yield$Promise$all2, getmainimg, tour_itinerary, visitedPlaces, inclusions, exclusion, highlights, bookingPolicy, installment, _cancellationPolicy, albumImage, FAQS, add_ons, bookingslot;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          tourPackageQuery = "\n    SELECT *\n    FROM\n      tourpackage\n    WHERE\n      tourpackage.PKID = ?;\n  ";
          _context4.next = 4;
          return _db["default"].execute(tourPackageQuery, [PKID]);
        case 4:
          _yield$pool$execute = _context4.sent;
          _yield$pool$execute2 = _slicedToArray(_yield$pool$execute, 1);
          tourPackageResults = _yield$pool$execute2[0];
          console.log(tourPackageResults);
          if (!(tourPackageResults.length === 0)) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", "Tourpackage not found");
        case 10:
          tourPackagesData = [];
          tourPackageData = {
            PKID: tourPackageResults[0].PKID,
            tourpack_id: tourPackageResults[0].PKID,
            MainTitle: tourPackageResults[0].MainTitle,
            SubTitle: tourPackageResults[0].SubTitle,
            TripType: tourPackageResults[0].TripType,
            Location: tourPackageResults[0].Location,
            StartDate: tourPackageResults[0].StartDate,
            EndDate: tourPackageResults[0].EndDate,
            trip_days: tourPackageResults[0].trip_days,
            trip_nights: tourPackageResults[0].trip_nights,
            AvailableSeats: tourPackageResults[0].AvailableSeats,
            MinimumAge: tourPackageResults[0].MinimumAge,
            MaximumAge: tourPackageResults[0].MaximumAge,
            TotalDuration: tourPackageResults[0].TotalDuration,
            adult_base_price: tourPackageResults[0].adult_base_price,
            child_base_price: tourPackageResults[0].child_base_price,
            infant_base_price: tourPackageResults[0].infant_base_price,
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
            Showpackage: tourPackageResults[0].Showpackage,
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
            Guide: tourPackageResults[0].Guide,
            City: tourPackageResults[0].City,
            Country: tourPackageResults[0].Country,
            CancellationDate: tourPackageResults[0].CancellationDate,
            main_image: [],
            tour_itinerary: [],
            // Change here from tour_itinerary to tour_plan
            booking_policy: [],
            installment: [],
            place_to_visit: [],
            inclusion: [],
            exclusion: [],
            highlights: [],
            cancellation_policy: [],
            albumImage: [],
            FAQs: [],
            add_ons: [],
            bookingslot: []
          };
          _context4.next = 14;
          return Promise.all([getmainimage(tourPackageData.PKID), getTourPlan(tourPackageData.PKID), getVisitedPlace(tourPackageData.PKID), getInclusion(tourPackageData.PKID), getExclusion(tourPackageData.PKID), getHighlights(tourPackageData.PKID), getBookingPolicy(tourPackageData.PKID), getinstallment(tourPackageData.PKID), getCancellationPolicy(tourPackageData.PKID), getalbumImage(tourPackageData.PKID), getFAQs(tourPackageData.PKID), getAddOns(tourPackageData.PKID), getBookingslot(tourPackageData.PKID)]);
        case 14:
          _yield$Promise$all = _context4.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 13);
          getmainimg = _yield$Promise$all2[0];
          tour_itinerary = _yield$Promise$all2[1];
          visitedPlaces = _yield$Promise$all2[2];
          inclusions = _yield$Promise$all2[3];
          exclusion = _yield$Promise$all2[4];
          highlights = _yield$Promise$all2[5];
          bookingPolicy = _yield$Promise$all2[6];
          installment = _yield$Promise$all2[7];
          _cancellationPolicy = _yield$Promise$all2[8];
          albumImage = _yield$Promise$all2[9];
          FAQS = _yield$Promise$all2[10];
          add_ons = _yield$Promise$all2[11];
          bookingslot

          // addOns,
          = _yield$Promise$all2[12];
          tourPackageData.main_image = getmainimg;
          tourPackageData.tour_itinerary = tour_itinerary;
          tourPackageData.place_to_visit = visitedPlaces;
          tourPackageData.inclusion = inclusions;
          tourPackageData.exclusion = exclusion;
          tourPackageData.highlights = highlights;
          tourPackageData.booking_policy = bookingPolicy;
          tourPackageData.installment = installment;
          tourPackageData.cancellation_policy = _cancellationPolicy;
          tourPackageData.albumImage = albumImage;
          tourPackageData.FAQs = FAQS;
          tourPackageData.add_ons = add_ons;
          tourPackageData.bookingslot = bookingslot;
          tourPackagesData.push(tourPackageData);
          return _context4.abrupt("return", tourPackageData);
        case 46:
          _context4.prev = 46;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 49:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 46]]);
  }));
  return function getSingleTourPackages(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
var getinstallment = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(PKID) {
    var installment, _yield$pool$execute3, _yield$pool$execute4, results;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          console.log("id", PKID);
          installment = "\n    SELECT\n    installment.InstallmentId,\n    installment.bookingslotid,\n    installment.tourpackageId,\n    installment.FirstInstallmentdueDate,\n    installment.SecondInstallmentdueDate,\n    installment.ABookingAmount,\n    installment.AFirstInstallmentAmount,\n    installment.ASecondInstallmentAmount,\n    installment.CBookingAmount,\n    installment.CFirstInstallmentAmount,\n    installment.CSecondInstallmentAmount,\n    installment.ISecondInstallmentAmount,\n    installment.IBookingAmount,\n    installment.IFirstInstallmentAmount,\n    installment.ThirdInstallmentdueDate\n  FROM installment\n  JOIN tourpackage ON installment.tourpackageId = tourpackage.PKID\n  WHERE  installment.tourpackageId  = ?;  \n    ";
          _context5.next = 5;
          return _db["default"].execute(installment, [PKID]);
        case 5:
          _yield$pool$execute3 = _context5.sent;
          _yield$pool$execute4 = _slicedToArray(_yield$pool$execute3, 1);
          results = _yield$pool$execute4[0];
          return _context5.abrupt("return", results);
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          throw _context5.t0;
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function getinstallment(_x4) {
    return _ref5.apply(this, arguments);
  };
}();
var getAllfaq = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var getquery, _yield$pool$query3, _yield$pool$query4, data;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          getquery = "SELECT * FROM FAQs";
          _context6.next = 3;
          return _db["default"].query(getquery);
        case 3:
          _yield$pool$query3 = _context6.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          data = _yield$pool$query4[0];
          return _context6.abrupt("return", res.status(200).json({
            status: true,
            data: data
          }));
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getAllfaq(_x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}();
var getmainimage = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(PKID) {
    var mainimage, _yield$pool$execute5, _yield$pool$execute6, results;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          console.log("id", PKID);
          mainimage = "\n    SELECT\n    mainimage.imageId,\n    mainimage.packageId,\n    mainimage.imageurl\n  FROM mainimage\n  JOIN tourpackage ON mainimage.packageId = tourpackage.PKID\n  WHERE mainimage.packageId = ? \n    ";
          _context7.next = 5;
          return _db["default"].execute(mainimage, [PKID]);
        case 5:
          _yield$pool$execute5 = _context7.sent;
          _yield$pool$execute6 = _slicedToArray(_yield$pool$execute5, 1);
          results = _yield$pool$execute6[0];
          return _context7.abrupt("return", results);
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          throw _context7.t0;
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 11]]);
  }));
  return function getmainimage(_x7) {
    return _ref7.apply(this, arguments);
  };
}();
var gettouritenerary = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var id, tourplanquery, _yield$pool$query5, _yield$pool$query6, data;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          tourplanquery = "SELECT * FROM tourplan WHERE id= ?";
          _context8.next = 4;
          return _db["default"].query(tourplanquery, [id]);
        case 4:
          _yield$pool$query5 = _context8.sent;
          _yield$pool$query6 = _slicedToArray(_yield$pool$query5, 1);
          data = _yield$pool$query6[0];
          return _context8.abrupt("return", res.status(200).json({
            status: true,
            data: data
          }));
        case 8:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function gettouritenerary(_x8, _x9) {
    return _ref8.apply(this, arguments);
  };
}();
var getbookingslot = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var id, tourplanquery, _yield$pool$query7, _yield$pool$query8, data;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id;
          tourplanquery = "SELECT * FROM bookingslot WHERE id= ?";
          _context9.next = 4;
          return _db["default"].query(tourplanquery, [id]);
        case 4:
          _yield$pool$query7 = _context9.sent;
          _yield$pool$query8 = _slicedToArray(_yield$pool$query7, 1);
          data = _yield$pool$query8[0];
          return _context9.abrupt("return", res.status(200).json({
            status: true,
            data: data
          }));
        case 8:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function getbookingslot(_x10, _x11) {
    return _ref9.apply(this, arguments);
  };
}();
var getInstallment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(id, pkid) {
    var tourplanquery, _yield$pool$query9, _yield$pool$query10, data;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          tourplanquery = "SELECT * FROM installment WHERE tourpackageId=? AND  bookingslotid= ?";
          _context10.next = 4;
          return _db["default"].query(tourplanquery, [pkid, id]);
        case 4:
          _yield$pool$query9 = _context10.sent;
          _yield$pool$query10 = _slicedToArray(_yield$pool$query9, 1);
          data = _yield$pool$query10[0];
          console.log(data);
          return _context10.abrupt("return", data);
        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](0);
          throw new Error(_context10.t0);
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 11]]);
  }));
  return function getInstallment(_x12, _x13) {
    return _ref10.apply(this, arguments);
  };
}();
var deletePackage = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var id, deletequery;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          id = req.params.PKID;
          deletequery = "DELETE FROM tourpackage WHERE PKID= ? ";
          _context11.next = 4;
          return _db["default"].query(deletequery, [id]);
        case 4:
          return _context11.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'package has removed'
          }));
        case 5:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function deletePackage(_x14, _x15) {
    return _ref11.apply(this, arguments);
  };
}();
var deleteTourPlanEventsouritenerary = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var id, tourplanquery, _yield$pool$query11, _yield$pool$query12, data;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          id = req.params.id;
          tourplanquery = "DELETE FROM tourplan WHERE id= ?";
          _context12.next = 4;
          return _db["default"].query(tourplanquery, [id]);
        case 4:
          _yield$pool$query11 = _context12.sent;
          _yield$pool$query12 = _slicedToArray(_yield$pool$query11, 1);
          data = _yield$pool$query12[0];
          return _context12.abrupt("return", res.status(200).json({
            status: true,
            message: 'Tourplan has removed'
          }));
        case 8:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function deleteTourPlanEventsouritenerary(_x16, _x17) {
    return _ref12.apply(this, arguments);
  };
}();
var deletTourItenerary = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var id, tourplanquery;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          id = req.params.id;
          tourplanquery = "DELETE FROM tour_itinerary WHERE id= ?";
          _context13.next = 4;
          return _db["default"].query(tourplanquery, [id]);
        case 4:
          return _context13.abrupt("return", res.status(200).json({
            status: true,
            message: 'tour plan has deleted.'
          }));
        case 5:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function deletTourItenerary(_x18, _x19) {
    return _ref13.apply(this, arguments);
  };
}();
var getTourPlan = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(PKID) {
    var tourPlanQuery, _yield$pool$query13, _yield$pool$query14, tourPlanResults;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          // Retrieve tour plan details with order by uId in ascending order
          tourPlanQuery = "\n    SELECT\n    tour_itinerary.id,\n    tour_itinerary.tour_package_id,\n    tour_itinerary.day_title,\n    tour_itinerary.day_plan,\n    tour_itinerary.staying_place,\n    tour_itinerary.meal,\n    tour_itinerary.breakFast,\n    tour_itinerary.dinner\n  FROM tour_itinerary\n  JOIN tourpackage ON tour_itinerary.tour_package_id = tourpackage.PKID\n  WHERE tour_itinerary.tour_package_id = ?\n  ORDER BY \n  tour_itinerary.id ASC;    \n      ";
          _context14.next = 4;
          return _db["default"].query(tourPlanQuery, [PKID]);
        case 4:
          _yield$pool$query13 = _context14.sent;
          _yield$pool$query14 = _slicedToArray(_yield$pool$query13, 1);
          tourPlanResults = _yield$pool$query14[0];
          return _context14.abrupt("return", tourPlanResults);
        case 10:
          _context14.prev = 10;
          _context14.t0 = _context14["catch"](0);
          throw _context14.t0;
        case 13:
          _context14.prev = 13;
          return _context14.finish(13);
        case 15:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 10, 13, 15]]);
  }));
  return function getTourPlan(_x20) {
    return _ref14.apply(this, arguments);
  };
}();
var getInclusion = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(PKID) {
    var inclusionQuery, _yield$pool$execute7, _yield$pool$execute8, results;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          inclusionQuery = "\n    SELECT\n    inclusion.id,\n    inclusion.tour_package_id,\n    inclusion.inclusion\n  FROM inclusion\n  JOIN tourpackage ON inclusion.tour_package_id = tourpackage.PKID\n  WHERE inclusion.tour_package_id = ? \n  ORDER BY\n  inclusion.id ASC;  \n";
          _context15.next = 4;
          return _db["default"].execute(inclusionQuery, [PKID]);
        case 4:
          _yield$pool$execute7 = _context15.sent;
          _yield$pool$execute8 = _slicedToArray(_yield$pool$execute7, 1);
          results = _yield$pool$execute8[0];
          return _context15.abrupt("return", results);
        case 10:
          _context15.prev = 10;
          _context15.t0 = _context15["catch"](0);
          throw _context15.t0;
        case 13:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 10]]);
  }));
  return function getInclusion(_x21) {
    return _ref15.apply(this, arguments);
  };
}();
var getBookingslot = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(PKID) {
    var currentDate, inclusionQuery, _yield$pool$execute9, _yield$pool$execute10, results;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          currentDate = new Date().toISOString().split('T')[0];
          inclusionQuery = "\n      SELECT\n        bookingslot.id,\n        bookingslot.tour_package_id,\n        bookingslot.StartDate,\n        bookingslot.EndDate,\n        bookingslot.available_seat,\n        bookingslot.cancellationDate\n      FROM bookingslot\n      JOIN tourpackage ON bookingslot.tour_package_id = tourpackage.PKID\n      WHERE bookingslot.tour_package_id = ? AND bookingslot.StartDate > ?\n      ORDER BY bookingslot.id ASC\n    ";
          console.log(currentDate);
          _context16.next = 6;
          return _db["default"].execute(inclusionQuery, [PKID, currentDate]);
        case 6:
          _yield$pool$execute9 = _context16.sent;
          _yield$pool$execute10 = _slicedToArray(_yield$pool$execute9, 1);
          results = _yield$pool$execute10[0];
          return _context16.abrupt("return", results);
        case 12:
          _context16.prev = 12;
          _context16.t0 = _context16["catch"](0);
          throw _context16.t0;
        case 15:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 12]]);
  }));
  return function getBookingslot(_x22) {
    return _ref16.apply(this, arguments);
  };
}();

// Function to fetch exclusion data
var getExclusion = exports.getExclusion = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(PKID) {
    var exclusionQuery, _yield$pool$execute11, _yield$pool$execute12, results;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          exclusionQuery = "\n    SELECT\n    exclusion.id,\n    exclusion.tour_package_id,\n    exclusion.exclusion\n    FROM exclusion\n  JOIN tourpackage ON exclusion.tour_package_id = tourpackage.PKID\n  WHERE exclusion.tour_package_id = ?\n  ORDER BY exclusion.id;  \n";
          _context17.next = 4;
          return _db["default"].execute(exclusionQuery, [PKID]);
        case 4:
          _yield$pool$execute11 = _context17.sent;
          _yield$pool$execute12 = _slicedToArray(_yield$pool$execute11, 1);
          results = _yield$pool$execute12[0];
          return _context17.abrupt("return", results);
        case 10:
          _context17.prev = 10;
          _context17.t0 = _context17["catch"](0);
          throw _context17.t0;
        case 13:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 10]]);
  }));
  return function getExclusion(_x23) {
    return _ref17.apply(this, arguments);
  };
}();
var getAddOns = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(PKID) {
    var _getAddOns, _yield$pool$execute13, _yield$pool$execute14, results;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _getAddOns = "\n    SELECT\n    add_ons.id,\n    add_ons.tour_package_id,\n    add_ons.services,\n    add_ons.cost,\n    add_ons.description\n  FROM add_ons\n  JOIN tourpackage ON add_ons.tour_package_id = tourpackage.PKID\n  WHERE add_ons.tour_package_id = ?;  \n";
          _context18.next = 4;
          return _db["default"].execute(_getAddOns, [PKID]);
        case 4:
          _yield$pool$execute13 = _context18.sent;
          _yield$pool$execute14 = _slicedToArray(_yield$pool$execute13, 1);
          results = _yield$pool$execute14[0];
          return _context18.abrupt("return", results);
        case 10:
          _context18.prev = 10;
          _context18.t0 = _context18["catch"](0);
          throw _context18.t0;
        case 13:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 10]]);
  }));
  return function getAddOns(_x24) {
    return _ref18.apply(this, arguments);
  };
}();
var getAAlladdOns = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var _getAddOns2, _yield$pool$execute15, _yield$pool$execute16, results;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _getAddOns2 = "\n    SELECT *\n  FROM add_ons\n";
          _context19.next = 4;
          return _db["default"].execute(_getAddOns2);
        case 4:
          _yield$pool$execute15 = _context19.sent;
          _yield$pool$execute16 = _slicedToArray(_yield$pool$execute15, 1);
          results = _yield$pool$execute16[0];
          return _context19.abrupt("return", res.send({
            data: results
          }));
        case 10:
          _context19.prev = 10;
          _context19.t0 = _context19["catch"](0);
          throw _context19.t0;
        case 13:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 10]]);
  }));
  return function getAAlladdOns(_x25, _x26) {
    return _ref19.apply(this, arguments);
  };
}();
var getFAQs = exports.getFAQs = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(PKID) {
    var faqsquery, _yield$pool$execute17, _yield$pool$execute18, results;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          faqsquery = "\n    SELECT \n    FAQs.id,\n    FAQs.question,\n    FAQs.answer\n  FROM FAQs\n  JOIN tourpackage ON FAQs.tour_package_id = tourpackage.PKID\n  WHERE FAQs.tour_package_id = ?;  \n";
          _context20.next = 4;
          return _db["default"].execute(faqsquery, [PKID]);
        case 4:
          _yield$pool$execute17 = _context20.sent;
          _yield$pool$execute18 = _slicedToArray(_yield$pool$execute17, 1);
          results = _yield$pool$execute18[0];
          return _context20.abrupt("return", results);
        case 10:
          _context20.prev = 10;
          _context20.t0 = _context20["catch"](0);
          throw _context20.t0;
        case 13:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 10]]);
  }));
  return function getFAQs(_x27) {
    return _ref20.apply(this, arguments);
  };
}();
// Function to fetch cancellation policy data
var getCancellationPolicy = exports.getCancellationPolicy = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(PKID) {
    var cancellationPolicyQuery, _yield$pool$execute19, _yield$pool$execute20, results;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          cancellationPolicyQuery = "\n    SELECT\n    cancellation_policy.id,\n    cancellation_policy.tour_package_id,\n    cancellation_policy.cancellation_policy\n  FROM cancellation_policy\n  JOIN tourpackage ON cancellation_policy.tour_package_id = tourpackage.PKID\n  WHERE cancellation_policy.tour_package_id = ?;  \n";
          _context21.next = 4;
          return _db["default"].execute(cancellationPolicyQuery, [PKID]);
        case 4:
          _yield$pool$execute19 = _context21.sent;
          _yield$pool$execute20 = _slicedToArray(_yield$pool$execute19, 1);
          results = _yield$pool$execute20[0];
          return _context21.abrupt("return", results);
        case 10:
          _context21.prev = 10;
          _context21.t0 = _context21["catch"](0);
          throw _context21.t0;
        case 13:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[0, 10]]);
  }));
  return function getCancellationPolicy(_x28) {
    return _ref21.apply(this, arguments);
  };
}();
// Function to fetch cancellation place visit data
var getVisitedPlace = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(PKID) {
    var visitedPlace, _yield$pool$execute21, _yield$pool$execute22, results;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          visitedPlace = "\n    SELECT\n    place_to_visit.id,\n    place_to_visit.tour_package_id,\n    place_to_visit.placetovisit_name,\n    place_to_visit.place_image\n  FROM place_to_visit\n  JOIN tourpackage ON place_to_visit.tour_package_id = tourpackage.PKID\n  WHERE place_to_visit.tour_package_id = ?;  \n";
          _context22.next = 4;
          return _db["default"].execute(visitedPlace, [PKID]);
        case 4:
          _yield$pool$execute21 = _context22.sent;
          _yield$pool$execute22 = _slicedToArray(_yield$pool$execute21, 1);
          results = _yield$pool$execute22[0];
          return _context22.abrupt("return", results);
        case 10:
          _context22.prev = 10;
          _context22.t0 = _context22["catch"](0);
          throw _context22.t0;
        case 13:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 10]]);
  }));
  return function getVisitedPlace(_x29) {
    return _ref22.apply(this, arguments);
  };
}();
var getalbumImage = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(PKID) {
    var albumimages, _yield$pool$execute23, _yield$pool$execute24, results;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          albumimages = "\n    SELECT\n  albumimage.AlbumId,\n  albumimage.tourpackageId,\n  albumimage.albumtitle,\n  albumimage.albumcoverimageurl,\n  albumimage.albumimageurl\n  FROM albumimage\n  JOIN tourpackage ON albumimage.tourpackageId = tourpackage.PKID\n  WHERE albumimage.tourpackageId = ?;  \n";
          _context23.next = 4;
          return _db["default"].execute(albumimages, [PKID]);
        case 4:
          _yield$pool$execute23 = _context23.sent;
          _yield$pool$execute24 = _slicedToArray(_yield$pool$execute23, 1);
          results = _yield$pool$execute24[0];
          return _context23.abrupt("return", results);
        case 10:
          _context23.prev = 10;
          _context23.t0 = _context23["catch"](0);
          throw _context23.t0;
        case 13:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[0, 10]]);
  }));
  return function getalbumImage(_x30) {
    return _ref23.apply(this, arguments);
  };
}();
var getHighlights = exports.getHighlights = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(PKID) {
    var highlightsQuery, _yield$pool$execute25, _yield$pool$execute26, results;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          highlightsQuery = "\n      SELECT\n        highlights.id,\n        highlights.tour_package_id,\n        highlights.highlights\n      FROM\n        highlights\n        JOIN tourpackage ON highlights.tour_package_id = tourpackage.PKID\n      WHERE\n        highlights.tour_package_id = ?\n        ORDER BY\n        highlights.id ASC\n    ";
          _context24.next = 4;
          return _db["default"].execute(highlightsQuery, [PKID]);
        case 4:
          _yield$pool$execute25 = _context24.sent;
          _yield$pool$execute26 = _slicedToArray(_yield$pool$execute25, 1);
          results = _yield$pool$execute26[0];
          return _context24.abrupt("return", results);
        case 10:
          _context24.prev = 10;
          _context24.t0 = _context24["catch"](0);
          throw _context24.t0;
        case 13:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[0, 10]]);
  }));
  return function getHighlights(_x31) {
    return _ref24.apply(this, arguments);
  };
}();
var getBookingPolicy = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(PKID) {
    var bookingPolicyQuery, _yield$pool$execute27, _yield$pool$execute28, results;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          bookingPolicyQuery = "\n    SELECT\n    booking_policy.id,\n    booking_policy.tour_package_id,\n    booking_policy.booking_policy\n  FROM booking_policy\n  JOIN tourpackage ON booking_policy.tour_package_id = tourpackage.PKID\n  WHERE booking_policy.tour_package_id = ?;\n";
          _context25.next = 4;
          return _db["default"].execute(bookingPolicyQuery, [PKID]);
        case 4:
          _yield$pool$execute27 = _context25.sent;
          _yield$pool$execute28 = _slicedToArray(_yield$pool$execute27, 1);
          results = _yield$pool$execute28[0];
          return _context25.abrupt("return", results);
        case 10:
          _context25.prev = 10;
          _context25.t0 = _context25["catch"](0);
          throw _context25.t0;
        case 13:
        case "end":
          return _context25.stop();
      }
    }, _callee25, null, [[0, 10]]);
  }));
  return function getBookingPolicy(_x32) {
    return _ref25.apply(this, arguments);
  };
}();
var getAllTourPackages = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26() {
    var tourPackageQuery, _yield$pool$execute29, _yield$pool$execute30, tourPackageResults, formattedResults;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          tourPackageQuery = "\n      SELECT\n        tourpackage.PKID,\n        tourpackage.MainTitle,\n        tourpackage.SubTitle,\n        tourpackage.TripType,\n        tourpackage.Location,\n        tourpackage.StartDate,\n        tourpackage.EndDate,\n        tourpackage.AvailableSeats,\n        tourpackage.MinimumAge,\n        tourpackage.MaximumAge,\n        tourpackage.TotalDuration,\n        tourpackage.adult_base_price,\n        tourpackage.child_base_price,\n        tourpackage.infant_base_price,\n        tourpackage.Discount,\n        tourpackage.PackageOverview,\n        tourpackage.Showpackage,\n        tourpackage.Flight,\n        tourpackage.Transport,\n        tourpackage.Food,\n        tourpackage.Hotel,\n        tourpackage.Country,\n        tourpackage.GirlsTrip,\n        tourpackage.FamilyTrips,\n        tourpackage.Adventure,\n        tourpackage.FullyGuided,\n        tourpackage.SelfGuided,\n        tourpackage.Guide,\n        tourpackage.CancellationDate,\n        tourpackage.coverImage,\n        tourpackage.booking_money_due_date,\n        tourpackage.first_installment_due_date,\n        tourpackage.second_installment_due_date,\n        tourpackage.booking_money,\n        tourpackage.first_installment,\n        tourpackage.second_installment,\n        tourpackage.Nature,\n        tourpackage.couponCode,\n        tourpackage.vipCoupon,\n        tourpackage.universalCoupon,\n        tourpackage.internationalCoupon,\n        tourpackage.domesticCoupon,\n        tourpackage.bucketCoupon,\n        tourpackage.tourType,\n        tourpackage.metatag,\n        tourpackage.metaDescription,\n        tourpackage.accommodation,\n        GROUP_CONCAT(\n          JSON_OBJECT(\n            'id', bookingslot.id,\n            'StartDate', bookingslot.StartDate,\n            'EndDate', bookingslot.EndDate,\n            'available_seat', bookingslot.available_seat\n          )\n        ) AS booking_slots\n      FROM\n        tourpackage\n      LEFT JOIN\n        bookingslot ON tourpackage.PKID = bookingslot.tour_package_id\n      WHERE\n        tourpackage.isActive=1\n      GROUP BY\n        tourpackage.PKID,\n        tourpackage.MainTitle,\n        tourpackage.SubTitle,\n        tourpackage.TripType,\n        tourpackage.Location,\n        tourpackage.StartDate,\n        tourpackage.EndDate,\n        tourpackage.AvailableSeats,\n        tourpackage.MinimumAge,\n        tourpackage.MaximumAge,\n        tourpackage.TotalDuration,\n        tourpackage.adult_base_price,\n        tourpackage.child_base_price,\n        tourpackage.infant_base_price,\n        tourpackage.Discount,\n        tourpackage.PackageOverview,\n        tourpackage.Showpackage,\n        tourpackage.Flight,\n        tourpackage.Transport,\n        tourpackage.Food,\n        tourpackage.Hotel,\n        tourpackage.Country,\n        tourpackage.GirlsTrip,\n        tourpackage.FamilyTrips,\n        tourpackage.Adventure,\n        tourpackage.FullyGuided,\n        tourpackage.SelfGuided,\n        tourpackage.Guide,\n        tourpackage.CancellationDate,\n        tourpackage.coverImage,\n        tourpackage.booking_money_due_date,\n        tourpackage.first_installment_due_date,\n        tourpackage.second_installment_due_date,\n        tourpackage.booking_money,\n        tourpackage.first_installment,\n        tourpackage.second_installment,\n        tourpackage.Nature,\n        tourpackage.couponCode,\n        tourpackage.vipCoupon,\n        tourpackage.universalCoupon,\n        tourpackage.internationalCoupon,\n        tourpackage.domesticCoupon,\n        tourpackage.bucketCoupon,\n        tourpackage.tourType,\n        tourpackage.metatag,\n        tourpackage.metaDescription,\n        tourpackage.accommodation;\n    ";
          _context26.next = 4;
          return _db["default"].execute(tourPackageQuery);
        case 4:
          _yield$pool$execute29 = _context26.sent;
          _yield$pool$execute30 = _slicedToArray(_yield$pool$execute29, 1);
          tourPackageResults = _yield$pool$execute30[0];
          // Parse JSON strings to objects for booking_slots
          formattedResults = tourPackageResults.map(function (result) {
            result.booking_slots = result.booking_slots ? JSON.parse("[".concat(result.booking_slots, "]")) : [];
            return result;
          });
          console.log(formattedResults);
          return _context26.abrupt("return", formattedResults);
        case 12:
          _context26.prev = 12;
          _context26.t0 = _context26["catch"](0);
          throw _context26.t0;
        case 15:
        case "end":
          return _context26.stop();
      }
    }, _callee26, null, [[0, 12]]);
  }));
  return function getAllTourPackages() {
    return _ref26.apply(this, arguments);
  };
}();

// const getAllTourPackages = async () => {
//   try {
//     const tourPackageQuery = `
//     SELECT*
//     FROM
//       tourpackage WHERE isActive=1;
//   `;
//     const [tourPackageResults] = await pool.execute(tourPackageQuery);
//     console.log(tourPackageResults);
//     return tourPackageResults;

//   } catch (error) {
//     throw error;
//   }
// };

var updateTourPackage = /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(req, res) {
    var packageId, packageQuery, _yield$pool$query15, _yield$pool$query16, tourpackage, _req$body2, MainTitle, SubTitle, Price, City, Discount, Location, Availability, StartDate, EndDate, TripType, TotalDuration, PackageOverview, Showpackage, Flight, Transport, Food, Hotel, Country, AvailableSeats, MinimumAge, MaximumAge, GirlsTrip, FamilyTrips, Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, adult_base_price, child_base_price, infant_base_price, accommodation, coverimage, values, _yield$pool$query17, _yield$pool$query18, result;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          packageId = req.params.PKID; // Assuming packageId is passed in the request parameters
          // Extract tour package details from request body
          packageQuery = "SELECT * FROM tourpackage WHERE PKID = ?";
          _context27.next = 5;
          return _db["default"].query(packageQuery, [packageId]);
        case 5:
          _yield$pool$query15 = _context27.sent;
          _yield$pool$query16 = _slicedToArray(_yield$pool$query15, 1);
          tourpackage = _yield$pool$query16[0];
          if (!(tourpackage.length === 0)) {
            _context27.next = 10;
            break;
          }
          return _context27.abrupt("return", res.status(404).json({
            message: 'Tour package not found'
          }));
        case 10:
          _req$body2 = req.body, MainTitle = _req$body2.MainTitle, SubTitle = _req$body2.SubTitle, Price = _req$body2.Price, City = _req$body2.City, Discount = _req$body2.Discount, Location = _req$body2.Location, Availability = _req$body2.Availability, StartDate = _req$body2.StartDate, EndDate = _req$body2.EndDate, TripType = _req$body2.TripType, TotalDuration = _req$body2.TotalDuration, PackageOverview = _req$body2.PackageOverview, Showpackage = _req$body2.Showpackage, Flight = _req$body2.Flight, Transport = _req$body2.Transport, Food = _req$body2.Food, Hotel = _req$body2.Hotel, Country = _req$body2.Country, AvailableSeats = _req$body2.AvailableSeats, MinimumAge = _req$body2.MinimumAge, MaximumAge = _req$body2.MaximumAge, GirlsTrip = _req$body2.GirlsTrip, FamilyTrips = _req$body2.FamilyTrips, Adventure = _req$body2.Adventure, FullyGuided = _req$body2.FullyGuided, SelfGuided = _req$body2.SelfGuided, Guide = _req$body2.Guide, CancellationDate = _req$body2.CancellationDate, adult_base_price = _req$body2.adult_base_price, child_base_price = _req$body2.child_base_price, infant_base_price = _req$body2.infant_base_price, accommodation = _req$body2.accommodation;
          coverimage = req.publicImageLink; // Check if cover image is present
          // Execute raw SQL UPDATE query to update tour package details in the database
          values = [MainTitle, SubTitle, Price, City, Discount, Location, Availability, StartDate, EndDate, TripType, TotalDuration, AvailableSeats, MinimumAge, MaximumAge, PackageOverview, Showpackage, Flight, Transport, Food, Hotel, Country, GirlsTrip, FamilyTrips, Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, coverimage, adult_base_price, child_base_price, infant_base_price, accommodation, packageId // Add packageId for WHERE clause
          ];
          _context27.next = 15;
          return _db["default"].query("UPDATE tourpackage SET \n        MainTitle = COALESCE(?, MainTitle), \n        SubTitle = COALESCE(?, SubTitle), \n        Price = COALESCE(?, Price), \n        City = COALESCE(?, City), \n        Discount = COALESCE(?, Discount), \n        Location = COALESCE(?, Location), \n        Availability = COALESCE(?, Availability), \n        StartDate = COALESCE(?, StartDate), \n        EndDate = COALESCE(?, EndDate), \n        TripType = COALESCE(?, TripType), \n        TotalDuration = COALESCE(?, TotalDuration), \n        AvailableSeats = COALESCE(?, AvailableSeats), \n        MinimumAge = COALESCE(?, MinimumAge), \n        MaximumAge = COALESCE(?, MaximumAge), \n        PackageOverview = COALESCE(?, PackageOverview), \n        Showpackage = COALESCE(?, Showpackage), \n        Flight = COALESCE(?, Flight), \n        Transport = COALESCE(?, Transport), \n        Food = COALESCE(?, Food), \n        Hotel = COALESCE(?, Hotel), \n        Country = COALESCE(?, Country), \n        GirlsTrip = COALESCE(?, GirlsTrip), \n        FamilyTrips = COALESCE(?, FamilyTrips), \n        Adventure = COALESCE(?, Adventure), \n        FullyGuided = COALESCE(?, FullyGuided), \n        SelfGuided = COALESCE(?, SelfGuided), \n        Guide = COALESCE(?, Guide), \n        CancellationDate = COALESCE(?, CancellationDate), \n        coverImage = COALESCE(?, coverImage),\n        adult_base_price = COALESCE(?, adult_base_price),\n        child_base_price = COALESCE(?, child_base_price),\n        infant_base_price = COALESCE(?, infant_base_price),\n        accommodation  =  COALESCE(?, accommodation)\n      WHERE PKID = ?", values);
        case 15:
          _yield$pool$query17 = _context27.sent;
          _yield$pool$query18 = _slicedToArray(_yield$pool$query17, 1);
          result = _yield$pool$query18[0];
          return _context27.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Tour package updated successfully',
            Id: packageId
          }));
        case 21:
          _context27.prev = 21;
          _context27.t0 = _context27["catch"](0);
          console.error("Error updating travel package:", _context27.t0);
          return _context27.abrupt("return", res.status(500).json({
            message: 'Internal server error'
          }));
        case 25:
        case "end":
          return _context27.stop();
      }
    }, _callee27, null, [[0, 21]]);
  }));
  return function updateTourPackage(_x33, _x34) {
    return _ref27.apply(this, arguments);
  };
}();
var MainImage = /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(req, PKID) {
    var connection, _packageResults$, images, packageQuery, _yield$connection$exe, _yield$connection$exe2, packageResults, packageId, insertQuery, insertResults, _iterator, _step, imageurl, imageId, insertValues, _yield$connection$exe3, _yield$connection$exe4, result, _iterator2, _step2, imageUrl;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          console.log(PKID);
          images = req.images;
          _context28.next = 5;
          return _db["default"].getConnection();
        case 5:
          connection = _context28.sent;
          packageQuery = "SELECT PKID  FROM tourpackage WHERE PKID = ?";
          _context28.next = 9;
          return connection.execute(packageQuery, [PKID]);
        case 9:
          _yield$connection$exe = _context28.sent;
          _yield$connection$exe2 = _slicedToArray(_yield$connection$exe, 1);
          packageResults = _yield$connection$exe2[0];
          console.log(packageResults);
          if (!(packageResults.length === 0)) {
            _context28.next = 15;
            break;
          }
          throw new Error("Tour package not found.");
        case 15:
          packageId = (_packageResults$ = packageResults[0]) === null || _packageResults$ === void 0 ? void 0 : _packageResults$.PKID;
          console.log(packageId);

          // Insert each image URL into the cover_image table
          insertQuery = "INSERT INTO  mainimage (imageId, imageurl, packageId) VALUES (?, ?, ?)";
          console.log(insertQuery);
          insertResults = [];
          _iterator = _createForOfIteratorHelper(images);
          _context28.prev = 21;
          _iterator.s();
        case 23:
          if ((_step = _iterator.n()).done) {
            _context28.next = 36;
            break;
          }
          imageurl = _step.value;
          imageId = custommainid();
          insertValues = [imageId, imageurl, packageId];
          console.log(insertValues);
          _context28.next = 30;
          return connection.execute(insertQuery, insertValues);
        case 30:
          _yield$connection$exe3 = _context28.sent;
          _yield$connection$exe4 = _slicedToArray(_yield$connection$exe3, 1);
          result = _yield$connection$exe4[0];
          insertResults.push({
            imageId: imageId,
            packageId: packageId,
            imageurl: imageurl
          });
        case 34:
          _context28.next = 23;
          break;
        case 36:
          _context28.next = 41;
          break;
        case 38:
          _context28.prev = 38;
          _context28.t0 = _context28["catch"](21);
          _iterator.e(_context28.t0);
        case 41:
          _context28.prev = 41;
          _iterator.f();
          return _context28.finish(41);
        case 44:
          connection.release(); // Release the connection back to the pool
          return _context28.abrupt("return", insertResults);
        case 48:
          _context28.prev = 48;
          _context28.t1 = _context28["catch"](0);
          console.error(_context28.t1);
          // Rollback the images if an error occurs
          _iterator2 = _createForOfIteratorHelper(req.images);
          _context28.prev = 52;
          _iterator2.s();
        case 54:
          if ((_step2 = _iterator2.n()).done) {
            _context28.next = 60;
            break;
          }
          imageUrl = _step2.value;
          _context28.next = 58;
          return deleteImageFromURL(imageUrl);
        case 58:
          _context28.next = 54;
          break;
        case 60:
          _context28.next = 65;
          break;
        case 62:
          _context28.prev = 62;
          _context28.t2 = _context28["catch"](52);
          _iterator2.e(_context28.t2);
        case 65:
          _context28.prev = 65;
          _iterator2.f();
          return _context28.finish(65);
        case 68:
          throw new Error(_context28.t1.message);
        case 69:
        case "end":
          return _context28.stop();
      }
    }, _callee28, null, [[0, 48], [21, 38, 41, 44], [52, 62, 65, 68]]);
  }));
  return function MainImage(_x35, _x36) {
    return _ref28.apply(this, arguments);
  };
}();
var UpdateMainImage = /*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(req, imageId) {
    var _packageResults$2;
    var imageUrl, packageQuery, _yield$pool$query19, _yield$pool$query20, packageResults, Id, updateQuery, values, _yield$pool$query21, _yield$pool$query22, result;
    return _regeneratorRuntime().wrap(function _callee29$(_context29) {
      while (1) switch (_context29.prev = _context29.next) {
        case 0:
          imageUrl = req.publicImageLink;
          if (imageUrl) {
            _context29.next = 3;
            break;
          }
          return _context29.abrupt("return", 'No image URL provided');
        case 3:
          // connection = await pool.getConnection();
          packageQuery = "SELECT imageId FROM mainimage WHERE imageId = ?";
          _context29.next = 6;
          return _db["default"].query(packageQuery, [imageId]);
        case 6:
          _yield$pool$query19 = _context29.sent;
          _yield$pool$query20 = _slicedToArray(_yield$pool$query19, 1);
          packageResults = _yield$pool$query20[0];
          if (!(packageResults.length === 0)) {
            _context29.next = 11;
            break;
          }
          throw new Error("image not found.");
        case 11:
          Id = (_packageResults$2 = packageResults[0]) === null || _packageResults$2 === void 0 ? void 0 : _packageResults$2.imageId;
          updateQuery = "UPDATE mainimage  SET imageurl = ?\nWHERE imageId = ?";
          console.log(updateQuery);
          values = [imageUrl, Id];
          _context29.next = 17;
          return _db["default"].query(updateQuery, values);
        case 17:
          _yield$pool$query21 = _context29.sent;
          _yield$pool$query22 = _slicedToArray(_yield$pool$query21, 1);
          result = _yield$pool$query22[0];
          return _context29.abrupt("return", result);
        case 21:
        case "end":
          return _context29.stop();
      }
    }, _callee29);
  }));
  return function UpdateMainImage(_x37, _x38) {
    return _ref29.apply(this, arguments);
  };
}();
var deletemainimage = /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(req, res) {
    var id, deletequery;
    return _regeneratorRuntime().wrap(function _callee30$(_context30) {
      while (1) switch (_context30.prev = _context30.next) {
        case 0:
          id = req.params.imageId;
          deletequery = "DELETE FROM mainimage WHERE  imageId= ? ";
          _context30.next = 4;
          return _db["default"].query(deletequery, [id]);
        case 4:
          return _context30.abrupt("return", res.status(200).json({
            status: true,
            message: 'image has deleted'
          }));
        case 5:
        case "end":
          return _context30.stop();
      }
    }, _callee30);
  }));
  return function deletemainimage(_x39, _x40) {
    return _ref30.apply(this, arguments);
  };
}();
var deleteBOOKINGSLOT = /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31(req, res) {
    var id, deletequery;
    return _regeneratorRuntime().wrap(function _callee31$(_context31) {
      while (1) switch (_context31.prev = _context31.next) {
        case 0:
          id = req.params.id;
          deletequery = "DELETE FROM bookingslot WHERE  id= ? ";
          _context31.next = 4;
          return _db["default"].query(deletequery, [id]);
        case 4:
          return _context31.abrupt("return", res.status(200).json({
            status: true,
            message: 'slot has removed'
          }));
        case 5:
        case "end":
          return _context31.stop();
      }
    }, _callee31);
  }));
  return function deleteBOOKINGSLOT(_x41, _x42) {
    return _ref31.apply(this, arguments);
  };
}();
var createPlaceVisit = /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32(req, PKID) {
    var connection, _req$body3, _packageResults$3, images, placetovisit_names, packageQuery, _yield$connection$exe5, _yield$connection$exe6, packageResults, tourPackageId, insertQuery, insertResults, i, placeVisitId, insertValues, _yield$connection$exe7, _yield$connection$exe8, result, _iterator3, _step3, image;
    return _regeneratorRuntime().wrap(function _callee32$(_context32) {
      while (1) switch (_context32.prev = _context32.next) {
        case 0:
          _context32.prev = 0;
          images = req.images;
          placetovisit_names = (_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.placetovisit_name;
          _context32.next = 5;
          return _db["default"].getConnection();
        case 5:
          connection = _context32.sent;
          packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
          _context32.next = 9;
          return connection.execute(packageQuery, [PKID]);
        case 9:
          _yield$connection$exe5 = _context32.sent;
          _yield$connection$exe6 = _slicedToArray(_yield$connection$exe5, 1);
          packageResults = _yield$connection$exe6[0];
          if (!(packageResults.length === 0)) {
            _context32.next = 14;
            break;
          }
          throw new Error("Tour package not found.");
        case 14:
          tourPackageId = (_packageResults$3 = packageResults[0]) === null || _packageResults$3 === void 0 ? void 0 : _packageResults$3.PKID; // If placetovisit_names is a string, convert it to an array
          if (typeof placetovisit_names === "string") {
            placetovisit_names = placetovisit_names.split(",");
          }

          // Insert each image URL into the place_to_visit table
          insertQuery = "INSERT INTO place_to_visit (id, tour_package_id, placetovisit_name, place_image) VALUES (?, ?, ?, ?)";
          insertResults = [];
          i = 0;
        case 19:
          if (!(i < images.length)) {
            _context32.next = 32;
            break;
          }
          placeVisitId = visitedimageid();
          insertValues = [placeVisitId, tourPackageId, placetovisit_names[i],
          // Use the specific name at index i, or an empty string if not available
          images[i]];
          console.log(insertValues);
          _context32.next = 25;
          return connection.execute(insertQuery, insertValues);
        case 25:
          _yield$connection$exe7 = _context32.sent;
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
          _context32.next = 19;
          break;
        case 32:
          connection.release(); // Release the connection back to the pool
          return _context32.abrupt("return", insertResults);
        case 36:
          _context32.prev = 36;
          _context32.t0 = _context32["catch"](0);
          console.error(_context32.t0);
          // Rollback the images if an error occurs
          _iterator3 = _createForOfIteratorHelper(req.images);
          _context32.prev = 40;
          _iterator3.s();
        case 42:
          if ((_step3 = _iterator3.n()).done) {
            _context32.next = 48;
            break;
          }
          image = _step3.value;
          _context32.next = 46;
          return deleteImageFromURL(image);
        case 46:
          _context32.next = 42;
          break;
        case 48:
          _context32.next = 53;
          break;
        case 50:
          _context32.prev = 50;
          _context32.t1 = _context32["catch"](40);
          _iterator3.e(_context32.t1);
        case 53:
          _context32.prev = 53;
          _iterator3.f();
          return _context32.finish(53);
        case 56:
          throw new Error(_context32.t0.message);
        case 57:
        case "end":
          return _context32.stop();
      }
    }, _callee32, null, [[0, 36], [40, 50, 53, 56]]);
  }));
  return function createPlaceVisit(_x43, _x44) {
    return _ref32.apply(this, arguments);
  };
}();
var UpdatevisitedImage = /*#__PURE__*/function () {
  var _ref33 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33(req, res, id) {
    var _packageResults$4;
    var placetovisit_name, imageUrl, packageQuery, _yield$pool$query23, _yield$pool$query24, packageResults, Id, updateQuery, values, _yield$pool$query25, _yield$pool$query26, result;
    return _regeneratorRuntime().wrap(function _callee33$(_context33) {
      while (1) switch (_context33.prev = _context33.next) {
        case 0:
          placetovisit_name = req.body.placetovisit_name;
          imageUrl = req.publicImageLink;
          if (imageUrl) {
            _context33.next = 4;
            break;
          }
          return _context33.abrupt("return", 'No image URL provided');
        case 4:
          // connection = await pool.getConnection();
          packageQuery = "SELECT id FROM place_to_visit WHERE id = ?";
          _context33.next = 7;
          return _db["default"].query(packageQuery, [id]);
        case 7:
          _yield$pool$query23 = _context33.sent;
          _yield$pool$query24 = _slicedToArray(_yield$pool$query23, 1);
          packageResults = _yield$pool$query24[0];
          if (!(packageResults.length === 0)) {
            _context33.next = 12;
            break;
          }
          throw new Error("Album not found.");
        case 12:
          Id = (_packageResults$4 = packageResults[0]) === null || _packageResults$4 === void 0 ? void 0 : _packageResults$4.id;
          updateQuery = "UPDATE place_to_visit SET place_image = ?,\n  placetovisit_name = ? \n  WHERE  id = ?";
          console.log(updateQuery);
          values = [imageUrl, placetovisit_name, Id];
          _context33.next = 18;
          return _db["default"].query(updateQuery, values);
        case 18:
          _yield$pool$query25 = _context33.sent;
          _yield$pool$query26 = _slicedToArray(_yield$pool$query25, 1);
          result = _yield$pool$query26[0];
          return _context33.abrupt("return", res.send({
            status: 'success',
            message: " image has updated"
          }));
        case 22:
        case "end":
          return _context33.stop();
      }
    }, _callee33);
  }));
  return function UpdatevisitedImage(_x45, _x46, _x47) {
    return _ref33.apply(this, arguments);
  };
}();
var addInstallment = /*#__PURE__*/function () {
  var _ref34 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee34(req, PKID) {
    var connection, updatedOrInsertedInstallments, installment, packageQuery, _yield$connection$exe9, _yield$connection$exe10, packageResults, tour_package_id, InstallmentId, bookingslotid, FirstInstallmentdueDate, SecondInstallmentdueDate, ThirdInstallmentdueDate, ABookingAmount, AFirstInstallmentAmount, ASecondInstallmentAmount, CBookingAmount, CFirstInstallmentAmount, CSecondInstallmentAmount, IBookingAmount, IFirstInstallmentAmount, ISecondInstallmentAmount, updateQuery, insertQuery;
    return _regeneratorRuntime().wrap(function _callee34$(_context34) {
      while (1) switch (_context34.prev = _context34.next) {
        case 0:
          _context34.prev = 0;
          _context34.next = 3;
          return _db["default"].getConnection();
        case 3:
          connection = _context34.sent;
          updatedOrInsertedInstallments = [];
          installment = req.body;
          packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
          _context34.next = 9;
          return connection.execute(packageQuery, [PKID]);
        case 9:
          _yield$connection$exe9 = _context34.sent;
          _yield$connection$exe10 = _slicedToArray(_yield$connection$exe9, 1);
          packageResults = _yield$connection$exe10[0];
          if (!(packageResults.length === 0)) {
            _context34.next = 14;
            break;
          }
          throw new Error("Tour package not found.");
        case 14:
          tour_package_id = packageResults[0].PKID;
          console.log(tour_package_id);
          InstallmentId = installment.InstallmentId, bookingslotid = installment.bookingslotid, FirstInstallmentdueDate = installment.FirstInstallmentdueDate, SecondInstallmentdueDate = installment.SecondInstallmentdueDate, ThirdInstallmentdueDate = installment.ThirdInstallmentdueDate, ABookingAmount = installment.ABookingAmount, AFirstInstallmentAmount = installment.AFirstInstallmentAmount, ASecondInstallmentAmount = installment.ASecondInstallmentAmount, CBookingAmount = installment.CBookingAmount, CFirstInstallmentAmount = installment.CFirstInstallmentAmount, CSecondInstallmentAmount = installment.CSecondInstallmentAmount, IBookingAmount = installment.IBookingAmount, IFirstInstallmentAmount = installment.IFirstInstallmentAmount, ISecondInstallmentAmount = installment.ISecondInstallmentAmount;
          if (!InstallmentId) {
            _context34.next = 24;
            break;
          }
          updateQuery = "UPDATE installment SET \n                            FirstInstallmentdueDate = ?,\n                            SecondInstallmentdueDate = ?,\n                            ThirdInstallmentdueDate = ?,\n                            ABookingAmount = ?,\n                            AFirstInstallmentAmount = ?,\n                            ASecondInstallmentAmount = ?,\n                            CBookingAmount = ?,\n                            CFirstInstallmentAmount = ?,\n                            CSecondInstallmentAmount = ?,\n                            IBookingAmount = ?,\n                            IFirstInstallmentAmount = ?,\n                            ISecondInstallmentAmount = ?,\n                            bookingslotid = ?\n                            WHERE InstallmentId = ?";
          _context34.next = 21;
          return connection.execute(updateQuery, [FirstInstallmentdueDate, SecondInstallmentdueDate, ThirdInstallmentdueDate, ABookingAmount, AFirstInstallmentAmount, ASecondInstallmentAmount, CBookingAmount, CFirstInstallmentAmount, CSecondInstallmentAmount, IBookingAmount, IFirstInstallmentAmount, ISecondInstallmentAmount, bookingslotid, InstallmentId]);
        case 21:
          updatedOrInsertedInstallments.push({
            InstallmentId: InstallmentId,
            status: true,
            message: "Installment updated successfully"
          });
          _context34.next = 28;
          break;
        case 24:
          // Define your function to generate a unique ID for installment
          insertQuery = "INSERT INTO installment (FirstInstallmentdueDate, SecondInstallmentdueDate, \n                          ThirdInstallmentdueDate, ABookingAmount, AFirstInstallmentAmount, ASecondInstallmentAmount,\n                          CBookingAmount, CFirstInstallmentAmount, CSecondInstallmentAmount, IBookingAmount,\n                          IFirstInstallmentAmount, ISecondInstallmentAmount, tourpackageId, bookingslotid) \n                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          _context34.next = 27;
          return connection.execute(insertQuery, [FirstInstallmentdueDate || null, SecondInstallmentdueDate || null, ThirdInstallmentdueDate || null, ABookingAmount || null, AFirstInstallmentAmount || null, ASecondInstallmentAmount || null, CBookingAmount || null, CFirstInstallmentAmount || null, CSecondInstallmentAmount || null, IBookingAmount || null, IFirstInstallmentAmount || null, ISecondInstallmentAmount || null, tour_package_id, bookingslotid]);
        case 27:
          updatedOrInsertedInstallments.push({
            status: true,
            message: "New installment inserted successfully"
          });
        case 28:
          return _context34.abrupt("return", updatedOrInsertedInstallments);
        case 31:
          _context34.prev = 31;
          _context34.t0 = _context34["catch"](0);
          console.error(_context34.t0);
          throw new Error(_context34.t0.message);
        case 35:
          _context34.prev = 35;
          if (connection) {
            connection.release();
          }
          return _context34.finish(35);
        case 38:
        case "end":
          return _context34.stop();
      }
    }, _callee34, null, [[0, 31, 35, 38]]);
  }));
  return function addInstallment(_x48, _x49) {
    return _ref34.apply(this, arguments);
  };
}();
var createAlbumImage = /*#__PURE__*/function () {
  var _ref35 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee35(req, res, PKID) {
    var _packageResults$5;
    var connection, albumtitle, albumimageurl, i, imageUrl, imageId, albumcoverimageurl, packageQuery, _yield$connection$exe11, _yield$connection$exe12, packageResults, tourPackageId, newalbumquery, values;
    return _regeneratorRuntime().wrap(function _callee35$(_context35) {
      while (1) switch (_context35.prev = _context35.next) {
        case 0:
          albumtitle = req.body.albumtitle;
          albumimageurl = [];
          if (req.files.albumimageurl) {
            for (i = 0; i < req.files.albumimageurl.length; i++) {
              // Handle each image here, upload to S3 or save locally
              // Example: const imageUrl = await uploadImageToS3(req.files.blogimages[i]);
              imageUrl = req.imageLink;
              imageId = i + 1; // Assuming you have an id for each image
              albumimageurl.push({
                id: imageId,
                url: imageUrl
              });
            }
          }
          if (req.files.albumcoverimageurl) {
            // Handle second image here
            // Example: const secondImageUrl = await uploadImageToS3(req.files.secondimage[0]);
            albumcoverimageurl = req.imageLink;
          }
          _context35.next = 6;
          return _db["default"].getConnection();
        case 6:
          connection = _context35.sent;
          packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
          _context35.next = 10;
          return connection.execute(packageQuery, [PKID]);
        case 10:
          _yield$connection$exe11 = _context35.sent;
          _yield$connection$exe12 = _slicedToArray(_yield$connection$exe11, 1);
          packageResults = _yield$connection$exe12[0];
          if (!(packageResults.length === 0)) {
            _context35.next = 15;
            break;
          }
          throw new Error("Tour package not found.");
        case 15:
          tourPackageId = (_packageResults$5 = packageResults[0]) === null || _packageResults$5 === void 0 ? void 0 : _packageResults$5.PKID;
          newalbumquery = "INSERT INTO albumimage (albumimageurl, albumcoverimageurl, albumtitle , tourpackageId) values(?,?,?,?)";
          values = [JSON.stringify(albumimageurl), albumcoverimageurl, albumtitle, tourPackageId];
          _context35.next = 20;
          return _db["default"].query(newalbumquery, values);
        case 20:
          return _context35.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'album created successfully'
          }));
        case 21:
        case "end":
          return _context35.stop();
      }
    }, _callee35);
  }));
  return function createAlbumImage(_x50, _x51, _x52) {
    return _ref35.apply(this, arguments);
  };
}();
var UpdateAlbumImage = /*#__PURE__*/function () {
  var _ref36 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee36(req, AlbumId) {
    var _packageResults$6;
    var albumtitle, imageUrl, packageQuery, _yield$pool$query27, _yield$pool$query28, packageResults, Id, updateQuery, values, _yield$pool$query29, _yield$pool$query30, result;
    return _regeneratorRuntime().wrap(function _callee36$(_context36) {
      while (1) switch (_context36.prev = _context36.next) {
        case 0:
          albumtitle = req.body.albumtitle;
          imageUrl = req.publicImageLink;
          if (imageUrl) {
            _context36.next = 4;
            break;
          }
          return _context36.abrupt("return", 'No image URL provided');
        case 4:
          // connection = await pool.getConnection();
          packageQuery = "SELECT AlbumId FROM albumimage WHERE AlbumId = ?";
          _context36.next = 7;
          return _db["default"].query(packageQuery, [AlbumId]);
        case 7:
          _yield$pool$query27 = _context36.sent;
          _yield$pool$query28 = _slicedToArray(_yield$pool$query27, 1);
          packageResults = _yield$pool$query28[0];
          if (!(packageResults.length === 0)) {
            _context36.next = 12;
            break;
          }
          throw new Error("Album not found.");
        case 12:
          Id = (_packageResults$6 = packageResults[0]) === null || _packageResults$6 === void 0 ? void 0 : _packageResults$6.AlbumId;
          updateQuery = "UPDATE albumimage  SET albumcoverimageurl = ?,\n    albumtitle = ? \n  WHERE AlbumId = ?";
          console.log(updateQuery);
          values = [imageUrl, albumtitle, Id];
          _context36.next = 18;
          return _db["default"].query(updateQuery, values);
        case 18:
          _yield$pool$query29 = _context36.sent;
          _yield$pool$query30 = _slicedToArray(_yield$pool$query29, 1);
          result = _yield$pool$query30[0];
          return _context36.abrupt("return", result);
        case 22:
        case "end":
          return _context36.stop();
      }
    }, _callee36);
  }));
  return function UpdateAlbumImage(_x53, _x54) {
    return _ref36.apply(this, arguments);
  };
}();
var updatealbumIinnermage = /*#__PURE__*/function () {
  var _ref37 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee37(req, res) {
    var id, urlid, newImageUrl, _yield$pool$query31, _yield$pool$query32, albumimage, albumimageData, albumimageurls, i, image, _yield$pool$query33, _yield$pool$query34, data;
    return _regeneratorRuntime().wrap(function _callee37$(_context37) {
      while (1) switch (_context37.prev = _context37.next) {
        case 0:
          _context37.prev = 0;
          id = req.params.AlbumId;
          urlid = req.params.id;
          newImageUrl = req.publicImageLink;
          _context37.next = 6;
          return _db["default"].query('SELECT * FROM albumimage WHERE AlbumId = ?', [id]);
        case 6:
          _yield$pool$query31 = _context37.sent;
          _yield$pool$query32 = _slicedToArray(_yield$pool$query31, 1);
          albumimage = _yield$pool$query32[0];
          if (!(albumimage.length === 0)) {
            _context37.next = 11;
            break;
          }
          return _context37.abrupt("return", res.status(404).json({
            message: 'image  not found'
          }));
        case 11:
          albumimageData = albumimage[0];
          albumimageurls = albumimageData.albumimageurl;
          for (i = 0; i < albumimageurls.length; i++) {
            image = albumimageurls[i];
            console.log(image);
            if (image.id === Number(urlid)) {
              console.log('now');
              albumimageurls[i].url = newImageUrl;
            }
          }
          console.log({
            albumimageurls: albumimageurls
          });
          _context37.next = 17;
          return _db["default"].query('UPDATE albumimage SET albumimageurl = ? WHERE  AlbumId = ?', [JSON.stringify(albumimageurls), id]);
        case 17:
          _yield$pool$query33 = _context37.sent;
          _yield$pool$query34 = _slicedToArray(_yield$pool$query33, 1);
          data = _yield$pool$query34[0];
          console.log(data);
          return _context37.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Image URL updated successfully'
          }));
        case 24:
          _context37.prev = 24;
          _context37.t0 = _context37["catch"](0);
          console.error('Error updating image URL:', _context37.t0);
          return _context37.abrupt("return", res.status(500).json({
            status: 'error',
            message: 'An error occurred while updating image URL'
          }));
        case 28:
        case "end":
          return _context37.stop();
      }
    }, _callee37, null, [[0, 24]]);
  }));
  return function updatealbumIinnermage(_x55, _x56) {
    return _ref37.apply(this, arguments);
  };
}();

//delete image
function deleteImageFromURL(_x57) {
  return _deleteImageFromURL.apply(this, arguments);
}
function _deleteImageFromURL() {
  _deleteImageFromURL = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee55(url) {
    var parsedUrl, bucketName, pathSegments, objectName, _storage;
    return _regeneratorRuntime().wrap(function _callee55$(_context55) {
      while (1) switch (_context55.prev = _context55.next) {
        case 0:
          _context55.prev = 0;
          if (url) {
            _context55.next = 4;
            break;
          }
          console.error("Invalid URL: ", url);
          return _context55.abrupt("return");
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
          _context55.next = 12;
          return _storage.bucket("b2bnodeimages").file(objectName)["delete"]();
        case 12:
          _context55.next = 17;
          break;
        case 14:
          _context55.prev = 14;
          _context55.t0 = _context55["catch"](0);
          console.error("Error deleting image: ".concat(_context55.t0));
        case 17:
        case "end":
          return _context55.stop();
      }
    }, _callee55, null, [[0, 14]]);
  }));
  return _deleteImageFromURL.apply(this, arguments);
}
var createTourPlan = /*#__PURE__*/function () {
  var _ref38 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee38(req) {
    var connection, updatedOrInsertedTourPlans, _iterator4, _step4, _packageResults$7, tourPlanData, day_title, day_plan, stayingPlace, breakFast, meal, dinner, id, packageQuery, _yield$connection$exe13, _yield$connection$exe14, packageResults, tourPackageId, generatedId, values, _yield$pool$query35, _yield$pool$query36, result;
    return _regeneratorRuntime().wrap(function _callee38$(_context38) {
      while (1) switch (_context38.prev = _context38.next) {
        case 0:
          _context38.prev = 0;
          _context38.next = 3;
          return _db["default"].getConnection();
        case 3:
          connection = _context38.sent;
          // Iterate over the array of tour plan data
          updatedOrInsertedTourPlans = [];
          _iterator4 = _createForOfIteratorHelper(req.body.tourplanData);
          _context38.prev = 6;
          _iterator4.s();
        case 8:
          if ((_step4 = _iterator4.n()).done) {
            _context38.next = 35;
            break;
          }
          tourPlanData = _step4.value;
          day_title = tourPlanData.day_title, day_plan = tourPlanData.day_plan, stayingPlace = tourPlanData.stayingPlace, breakFast = tourPlanData.breakFast, meal = tourPlanData.meal, dinner = tourPlanData.dinner, id = tourPlanData.id; // Extract ID from tourPlanData
          // Retrieve tour package ID from the database
          packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
          _context38.next = 14;
          return connection.execute(packageQuery, [req.params.PKID]);
        case 14:
          _yield$connection$exe13 = _context38.sent;
          _yield$connection$exe14 = _slicedToArray(_yield$connection$exe13, 1);
          packageResults = _yield$connection$exe14[0];
          if (!(packageResults.length === 0)) {
            _context38.next = 19;
            break;
          }
          throw new Error("Tour package not found.");
        case 19:
          tourPackageId = (_packageResults$7 = packageResults[0]) === null || _packageResults$7 === void 0 ? void 0 : _packageResults$7.PKID;
          if (!id) {
            _context38.next = 25;
            break;
          }
          _context38.next = 23;
          return _db["default"].query("UPDATE tour_itinerary SET day_title = ?, day_plan = ?, staying_place=?, breakFast=?, meal=?, dinner=? WHERE id = ?", [day_title, day_plan, stayingPlace, breakFast, meal, dinner, id]);
        case 23:
          _context38.next = 33;
          break;
        case 25:
          // Generate a unique ID for the tour plan
          generatedId = generatePackageId(); // Prepare values for the INSERT query
          values = [tourPackageId, day_title, day_plan, stayingPlace, breakFast, meal, dinner]; // Execute the INSERT query to add the tour plan to the database
          _context38.next = 29;
          return _db["default"].query("INSERT INTO tour_itinerary (tour_package_id, day_title, day_plan, staying_place, breakFast, meal, dinner) VALUES (?, ?, ?,?,?,?,?)", values);
        case 29:
          _yield$pool$query35 = _context38.sent;
          _yield$pool$query36 = _slicedToArray(_yield$pool$query35, 1);
          result = _yield$pool$query36[0];
          updatedOrInsertedTourPlans.push(result); // Push the inserted record
        case 33:
          _context38.next = 8;
          break;
        case 35:
          _context38.next = 40;
          break;
        case 37:
          _context38.prev = 37;
          _context38.t0 = _context38["catch"](6);
          _iterator4.e(_context38.t0);
        case 40:
          _context38.prev = 40;
          _iterator4.f();
          return _context38.finish(40);
        case 43:
          return _context38.abrupt("return", updatedOrInsertedTourPlans);
        case 46:
          _context38.prev = 46;
          _context38.t1 = _context38["catch"](0);
          console.log(_context38.t1);
        case 49:
          _context38.prev = 49;
          if (connection) {
            connection.release();
          }
          return _context38.finish(49);
        case 52:
        case "end":
          return _context38.stop();
      }
    }, _callee38, null, [[0, 46, 49, 52], [6, 37, 40, 43]]);
  }));
  return function createTourPlan(_x58) {
    return _ref38.apply(this, arguments);
  };
}();
var createInclusion = /*#__PURE__*/function () {
  var _ref39 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee39(req, PKID) {
    var inclusions, connection, updatedOrInsertedInclusions, _iterator5, _step5, inclusion, id, inclusionText, packageQuery, _yield$connection$exe15, _yield$connection$exe16, packageResults, tourPackageId, updateQuery, insertQuery;
    return _regeneratorRuntime().wrap(function _callee39$(_context39) {
      while (1) switch (_context39.prev = _context39.next) {
        case 0:
          _context39.prev = 0;
          inclusions = req.body; // if (!inclusions || !Array.isArray(inclusions) || inclusions.length === 0) {
          //   throw new Error("Inclusion data is required and should be an array.");
          // }
          _context39.next = 4;
          return _db["default"].getConnection();
        case 4:
          connection = _context39.sent;
          updatedOrInsertedInclusions = [];
          _iterator5 = _createForOfIteratorHelper(inclusions);
          _context39.prev = 7;
          _iterator5.s();
        case 9:
          if ((_step5 = _iterator5.n()).done) {
            _context39.next = 36;
            break;
          }
          inclusion = _step5.value;
          id = inclusion.id, inclusionText = inclusion.inclusionText; // Assuming each object in the array has properties named 'id' and 'inclusionText'
          if (inclusionText) {
            _context39.next = 14;
            break;
          }
          throw new Error("Inclusion text is required for each object.");
        case 14:
          packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
          _context39.next = 17;
          return connection.execute(packageQuery, [PKID]);
        case 17:
          _yield$connection$exe15 = _context39.sent;
          _yield$connection$exe16 = _slicedToArray(_yield$connection$exe15, 1);
          packageResults = _yield$connection$exe16[0];
          if (!(packageResults.length === 0)) {
            _context39.next = 22;
            break;
          }
          throw new Error("Tour package not found.");
        case 22:
          tourPackageId = packageResults[0].PKID;
          if (!id) {
            _context39.next = 30;
            break;
          }
          // If ID is provided, update the existing inclusion
          updateQuery = "UPDATE inclusion SET inclusion = ? WHERE id = ?";
          _context39.next = 27;
          return connection.execute(updateQuery, [inclusionText, id]);
        case 27:
          updatedOrInsertedInclusions.push({
            id: id,
            status: true,
            message: "Inclusion updated successfully"
          });
          _context39.next = 34;
          break;
        case 30:
          // If ID is not provided, it's a new inclusion to be inserted
          insertQuery = "INSERT INTO inclusion ( tour_package_id, inclusion) VALUES ( ?, ?)";
          _context39.next = 33;
          return connection.execute(insertQuery, [tourPackageId, inclusionText]);
        case 33:
          updatedOrInsertedInclusions.push({
            status: "success",
            message: "New inclusion inserted successfully"
          });
        case 34:
          _context39.next = 9;
          break;
        case 36:
          _context39.next = 41;
          break;
        case 38:
          _context39.prev = 38;
          _context39.t0 = _context39["catch"](7);
          _iterator5.e(_context39.t0);
        case 41:
          _context39.prev = 41;
          _iterator5.f();
          return _context39.finish(41);
        case 44:
          connection.release();
          return _context39.abrupt("return", updatedOrInsertedInclusions);
        case 48:
          _context39.prev = 48;
          _context39.t1 = _context39["catch"](0);
          console.error(_context39.t1);
          throw new Error(_context39.t1.message);
        case 52:
        case "end":
          return _context39.stop();
      }
    }, _callee39, null, [[0, 48], [7, 38, 41, 44]]);
  }));
  return function createInclusion(_x59, _x60) {
    return _ref39.apply(this, arguments);
  };
}();
var createBookingSlot = /*#__PURE__*/function () {
  var _ref40 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee40(req, res, PKID) {
    var connection, bookingSlotData, packageQuery, _yield$connection$exe17, _yield$connection$exe18, packageResults, tourPackageId, _iterator6, _step6, slotData, StartDate, EndDate, available_seat, cancellationDate, soldOut, id;
    return _regeneratorRuntime().wrap(function _callee40$(_context40) {
      while (1) switch (_context40.prev = _context40.next) {
        case 0:
          _context40.prev = 0;
          _context40.next = 3;
          return _db["default"].getConnection();
        case 3:
          connection = _context40.sent;
          bookingSlotData = req.body.bookingSlotData;
          packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
          _context40.next = 8;
          return connection.execute(packageQuery, [PKID]);
        case 8:
          _yield$connection$exe17 = _context40.sent;
          _yield$connection$exe18 = _slicedToArray(_yield$connection$exe17, 1);
          packageResults = _yield$connection$exe18[0];
          if (!(packageResults.length === 0)) {
            _context40.next = 13;
            break;
          }
          return _context40.abrupt("return", res.send({
            message: "Tour package not found."
          }));
        case 13:
          tourPackageId = packageResults[0].PKID;
          _iterator6 = _createForOfIteratorHelper(bookingSlotData);
          _context40.prev = 15;
          _iterator6.s();
        case 17:
          if ((_step6 = _iterator6.n()).done) {
            _context40.next = 29;
            break;
          }
          slotData = _step6.value;
          StartDate = slotData.StartDate, EndDate = slotData.EndDate, available_seat = slotData.available_seat, cancellationDate = slotData.cancellationDate, soldOut = slotData.soldOut, id = slotData.id;
          if (!id) {
            _context40.next = 25;
            break;
          }
          _context40.next = 23;
          return connection.query("UPDATE bookingslot SET StartDate = ?, EndDate = ?, cancellationDate=?, available_seat=?, soldOut?, WHERE id = ? AND tour_package_id = ?", [StartDate, EndDate, cancellationDate, available_seat, soldOut, id, tourPackageId]);
        case 23:
          _context40.next = 27;
          break;
        case 25:
          _context40.next = 27;
          return connection.query("INSERT INTO bookingslot (tour_package_id, StartDate, EndDate, cancellationDate, available_seat, soldOut) VALUES (?,?, ?,?,?,?)", [tourPackageId, StartDate, EndDate, cancellationDate, available_seat, soldOut]);
        case 27:
          _context40.next = 17;
          break;
        case 29:
          _context40.next = 34;
          break;
        case 31:
          _context40.prev = 31;
          _context40.t0 = _context40["catch"](15);
          _iterator6.e(_context40.t0);
        case 34:
          _context40.prev = 34;
          _iterator6.f();
          return _context40.finish(34);
        case 37:
          console.log('Booking slots added/updated successfully');
          _context40.next = 44;
          break;
        case 40:
          _context40.prev = 40;
          _context40.t1 = _context40["catch"](0);
          console.error('Error creating/updating booking slots:', _context40.t1);
          throw new Error('An error occurred while creating/updating booking slots');
        case 44:
          _context40.prev = 44;
          if (connection) {
            connection.release();
          }
          return _context40.finish(44);
        case 47:
        case "end":
          return _context40.stop();
      }
    }, _callee40, null, [[0, 40, 44, 47], [15, 31, 34, 37]]);
  }));
  return function createBookingSlot(_x61, _x62, _x63) {
    return _ref40.apply(this, arguments);
  };
}();
var createExclusion = /*#__PURE__*/function () {
  var _ref41 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee41(req, PKID) {
    var connection, updatedOrInsertedExclusions, exclusions, packageQuery, _yield$connection$exe19, _yield$connection$exe20, packageResults, tour_package_id, _iterator7, _step7, exclusion, id, exclusionText, _packageQuery, _yield$connection$exe21, _yield$connection$exe22, _packageResults, tourPackageId, updateQuery, insertQuery;
    return _regeneratorRuntime().wrap(function _callee41$(_context41) {
      while (1) switch (_context41.prev = _context41.next) {
        case 0:
          _context41.prev = 0;
          _context41.next = 3;
          return _db["default"].getConnection();
        case 3:
          connection = _context41.sent;
          updatedOrInsertedExclusions = [];
          exclusions = req.body; // if (!exclusions || !Array.isArray(exclusions) || exclusions.length === 0) {
          //   throw new Error("Exclusion data is required as an array of objects.");
          // }
          console.log(exclusions);
          packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
          _context41.next = 10;
          return connection.execute(packageQuery, [PKID]);
        case 10:
          _yield$connection$exe19 = _context41.sent;
          _yield$connection$exe20 = _slicedToArray(_yield$connection$exe19, 1);
          packageResults = _yield$connection$exe20[0];
          if (!(packageResults.length === 0)) {
            _context41.next = 15;
            break;
          }
          throw new Error("Tour package not found.");
        case 15:
          tour_package_id = packageResults[0].PKID;
          _iterator7 = _createForOfIteratorHelper(exclusions);
          _context41.prev = 17;
          _iterator7.s();
        case 19:
          if ((_step7 = _iterator7.n()).done) {
            _context41.next = 46;
            break;
          }
          exclusion = _step7.value;
          id = exclusion.id, exclusionText = exclusion.exclusionText; // Assuming each object in the array has properties named 'id' and 'inclusionText'
          if (exclusionText) {
            _context41.next = 24;
            break;
          }
          throw new Error("exclusion text is required for each object.");
        case 24:
          _packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
          _context41.next = 27;
          return connection.execute(_packageQuery, [PKID]);
        case 27:
          _yield$connection$exe21 = _context41.sent;
          _yield$connection$exe22 = _slicedToArray(_yield$connection$exe21, 1);
          _packageResults = _yield$connection$exe22[0];
          if (!(_packageResults.length === 0)) {
            _context41.next = 32;
            break;
          }
          throw new Error("Tour package not found.");
        case 32:
          tourPackageId = _packageResults[0].PKID;
          if (!id) {
            _context41.next = 40;
            break;
          }
          // If ID is provided, update the existing inclusion
          updateQuery = "UPDATE exclusion SET exclusion = ? WHERE id = ?";
          _context41.next = 37;
          return connection.execute(updateQuery, [exclusionText, id]);
        case 37:
          updatedOrInsertedExclusions.push({
            id: id,
            status: true,
            message: "Inclusion updated successfully"
          });
          _context41.next = 44;
          break;
        case 40:
          // If ID is not provided, it's a new inclusion to be inserted
          insertQuery = "INSERT INTO exclusion ( tour_package_id, exclusion) VALUES (?, ?)";
          _context41.next = 43;
          return connection.execute(insertQuery, [tourPackageId, exclusionText]);
        case 43:
          updatedOrInsertedExclusions.push({
            status: true,
            message: "New exclusion inserted successfully"
          });
        case 44:
          _context41.next = 19;
          break;
        case 46:
          _context41.next = 51;
          break;
        case 48:
          _context41.prev = 48;
          _context41.t0 = _context41["catch"](17);
          _iterator7.e(_context41.t0);
        case 51:
          _context41.prev = 51;
          _iterator7.f();
          return _context41.finish(51);
        case 54:
          _context41.next = 60;
          break;
        case 56:
          _context41.prev = 56;
          _context41.t1 = _context41["catch"](0);
          console.error(_context41.t1);
          throw new Error(_context41.t1.message);
        case 60:
          _context41.prev = 60;
          if (connection) {
            connection.release();
          }
          return _context41.finish(60);
        case 63:
        case "end":
          return _context41.stop();
      }
    }, _callee41, null, [[0, 56, 60, 63], [17, 48, 51, 54]]);
  }));
  return function createExclusion(_x64, _x65) {
    return _ref41.apply(this, arguments);
  };
}();
var deleteexclusion = /*#__PURE__*/function () {
  var _ref42 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee42(req, res) {
    var id, deletequery;
    return _regeneratorRuntime().wrap(function _callee42$(_context42) {
      while (1) switch (_context42.prev = _context42.next) {
        case 0:
          id = req.params.id;
          deletequery = "DELETE FROM exclusion WHERE id= ? ";
          _context42.next = 4;
          return _db["default"].query(deletequery, [id]);
        case 4:
          return _context42.abrupt("return", res.status(200).json({
            status: true,
            message: 'inclusion has removed'
          }));
        case 5:
        case "end":
          return _context42.stop();
      }
    }, _callee42);
  }));
  return function deleteexclusion(_x66, _x67) {
    return _ref42.apply(this, arguments);
  };
}();
var deleteinclusion = /*#__PURE__*/function () {
  var _ref43 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee43(req, res) {
    var id, deletequery;
    return _regeneratorRuntime().wrap(function _callee43$(_context43) {
      while (1) switch (_context43.prev = _context43.next) {
        case 0:
          id = req.params.id;
          deletequery = "DELETE FROM inclusion WHERE id= ? ";
          _context43.next = 4;
          return _db["default"].query(deletequery, [id]);
        case 4:
          return _context43.abrupt("return", res.status(200).json({
            status: true,
            message: 'inclusion has removed'
          }));
        case 5:
        case "end":
          return _context43.stop();
      }
    }, _callee43);
  }));
  return function deleteinclusion(_x68, _x69) {
    return _ref43.apply(this, arguments);
  };
}();
var createBookingPolicy = /*#__PURE__*/function () {
  var _ref44 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee44(req, PKID) {
    var bookingPolicies, connection, updatedOrInsertedPolicies, _iterator8, _step8, policyObj, id, booking_policy, packageQuery, _yield$connection$exe23, _yield$connection$exe24, packageResults, tour_package_id, updateQuery, newId, insertQuery;
    return _regeneratorRuntime().wrap(function _callee44$(_context44) {
      while (1) switch (_context44.prev = _context44.next) {
        case 0:
          _context44.prev = 0;
          bookingPolicies = req.body;
          if (!(!bookingPolicies || !Array.isArray(bookingPolicies) || bookingPolicies.length === 0)) {
            _context44.next = 4;
            break;
          }
          throw new Error("Booking policy data is required as an array of objects.");
        case 4:
          _context44.next = 6;
          return _db["default"].getConnection();
        case 6:
          connection = _context44.sent;
          updatedOrInsertedPolicies = [];
          _iterator8 = _createForOfIteratorHelper(bookingPolicies);
          _context44.prev = 9;
          _iterator8.s();
        case 11:
          if ((_step8 = _iterator8.n()).done) {
            _context44.next = 39;
            break;
          }
          policyObj = _step8.value;
          id = policyObj.id, booking_policy = policyObj.booking_policy;
          if (booking_policy) {
            _context44.next = 16;
            break;
          }
          throw new Error("Booking policy text is required for each object.");
        case 16:
          packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
          _context44.next = 19;
          return connection.execute(packageQuery, [PKID]);
        case 19:
          _yield$connection$exe23 = _context44.sent;
          _yield$connection$exe24 = _slicedToArray(_yield$connection$exe23, 1);
          packageResults = _yield$connection$exe24[0];
          if (!(packageResults.length === 0)) {
            _context44.next = 24;
            break;
          }
          throw new Error("Tour package not found.");
        case 24:
          tour_package_id = packageResults[0].PKID;
          if (!id) {
            _context44.next = 32;
            break;
          }
          // If ID is provided, update the existing booking policy
          updateQuery = "UPDATE booking_policy SET booking_policy = ? WHERE id = ?";
          _context44.next = 29;
          return connection.execute(updateQuery, [booking_policy, id]);
        case 29:
          updatedOrInsertedPolicies.push({
            id: id,
            status: true,
            message: "Booking policy updated successfully"
          });
          _context44.next = 37;
          break;
        case 32:
          // If ID is not provided, it's a new booking policy to be inserted
          newId = customBookingPOlicy();
          insertQuery = "INSERT INTO booking_policy (id, tour_package_id, booking_policy) VALUES (?, ?, ?)";
          _context44.next = 36;
          return connection.execute(insertQuery, [newId, tour_package_id, booking_policy]);
        case 36:
          updatedOrInsertedPolicies.push({
            id: newId,
            status: true,
            message: "New booking policy inserted successfully"
          });
        case 37:
          _context44.next = 11;
          break;
        case 39:
          _context44.next = 44;
          break;
        case 41:
          _context44.prev = 41;
          _context44.t0 = _context44["catch"](9);
          _iterator8.e(_context44.t0);
        case 44:
          _context44.prev = 44;
          _iterator8.f();
          return _context44.finish(44);
        case 47:
          connection.release();
          return _context44.abrupt("return", updatedOrInsertedPolicies);
        case 51:
          _context44.prev = 51;
          _context44.t1 = _context44["catch"](0);
          console.error(_context44.t1);
          throw new Error(_context44.t1.message);
        case 55:
        case "end":
          return _context44.stop();
      }
    }, _callee44, null, [[0, 51], [9, 41, 44, 47]]);
  }));
  return function createBookingPolicy(_x70, _x71) {
    return _ref44.apply(this, arguments);
  };
}();
var deletepolicy = /*#__PURE__*/function () {
  var _ref45 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee45(req, res) {
    var id, deletequery;
    return _regeneratorRuntime().wrap(function _callee45$(_context45) {
      while (1) switch (_context45.prev = _context45.next) {
        case 0:
          id = req.params.id;
          deletequery = "DELETE FROM booking_policy WHERE id= ? ";
          _context45.next = 4;
          return _db["default"].query(deletequery, [id]);
        case 4:
          return _context45.abrupt("return", res.status(200).json({
            status: true,
            message: 'booking policy has deleted'
          }));
        case 5:
        case "end":
          return _context45.stop();
      }
    }, _callee45);
  }));
  return function deletepolicy(_x72, _x73) {
    return _ref45.apply(this, arguments);
  };
}();
var deleteAddons = /*#__PURE__*/function () {
  var _ref46 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee46(req, res) {
    var id, deletequery;
    return _regeneratorRuntime().wrap(function _callee46$(_context46) {
      while (1) switch (_context46.prev = _context46.next) {
        case 0:
          id = req.params.id;
          deletequery = "DELETE FROM add_ons WHERE id= ? ";
          _context46.next = 4;
          return _db["default"].query(deletequery, [id]);
        case 4:
          return _context46.abrupt("return", res.status(200).json({
            status: true,
            message: 'Addons has deleted'
          }));
        case 5:
        case "end":
          return _context46.stop();
      }
    }, _callee46);
  }));
  return function deleteAddons(_x74, _x75) {
    return _ref46.apply(this, arguments);
  };
}();
var createCancelationPolicy = /*#__PURE__*/function () {
  var _ref47 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee47(req, PKID) {
    var connection, cancellationPolicies, packageQuery, _yield$connection$exe25, _yield$connection$exe26, packageResults, tour_package_id, insertResults, _iterator9, _step9, cancellationObj, id, cancellation_policy, updateQuery, newId, insertQuery;
    return _regeneratorRuntime().wrap(function _callee47$(_context47) {
      while (1) switch (_context47.prev = _context47.next) {
        case 0:
          _context47.prev = 0;
          cancellationPolicies = req.body;
          if (!(!cancellationPolicies || !Array.isArray(cancellationPolicies) || cancellationPolicies.length === 0)) {
            _context47.next = 4;
            break;
          }
          throw new Error("Cancellation policies are required as an array of objects.");
        case 4:
          _context47.next = 6;
          return _db["default"].getConnection();
        case 6:
          connection = _context47.sent;
          packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
          _context47.next = 10;
          return connection.execute(packageQuery, [PKID]);
        case 10:
          _yield$connection$exe25 = _context47.sent;
          _yield$connection$exe26 = _slicedToArray(_yield$connection$exe25, 1);
          packageResults = _yield$connection$exe26[0];
          if (!(packageResults.length === 0)) {
            _context47.next = 15;
            break;
          }
          throw new Error("Tour package not found.");
        case 15:
          tour_package_id = packageResults[0].PKID;
          insertResults = [];
          _iterator9 = _createForOfIteratorHelper(cancellationPolicies);
          _context47.prev = 18;
          _iterator9.s();
        case 20:
          if ((_step9 = _iterator9.n()).done) {
            _context47.next = 39;
            break;
          }
          cancellationObj = _step9.value;
          id = cancellationObj.id, cancellation_policy = cancellationObj.cancellation_policy;
          if (cancellation_policy) {
            _context47.next = 25;
            break;
          }
          throw new Error("Cancellation policy text is required for each object.");
        case 25:
          if (!id) {
            _context47.next = 32;
            break;
          }
          // If ID is provided, update the existing cancellation policy
          updateQuery = "UPDATE cancellation_policy SET cancellation_policy = ? WHERE id = ? AND tour_package_id = ?";
          _context47.next = 29;
          return connection.execute(updateQuery, [cancellation_policy, id, tour_package_id]);
        case 29:
          insertResults.push({
            id: id,
            status: true,
            message: "Cancellation policy updated successfully"
          });
          _context47.next = 37;
          break;
        case 32:
          // If ID is not provided, it's a new cancellation policy to be inserted
          newId = cancelationpolicy(); // Assume generateUniqueId is your function to generate unique IDs
          insertQuery = "INSERT INTO cancellation_policy (id, tour_package_id, cancellation_policy) VALUES (?, ?, ?)";
          _context47.next = 36;
          return connection.execute(insertQuery, [newId, tour_package_id, cancellation_policy]);
        case 36:
          insertResults.push({
            status: true,
            message: "New cancellation policy inserted successfully"
          });
        case 37:
          _context47.next = 20;
          break;
        case 39:
          _context47.next = 44;
          break;
        case 41:
          _context47.prev = 41;
          _context47.t0 = _context47["catch"](18);
          _iterator9.e(_context47.t0);
        case 44:
          _context47.prev = 44;
          _iterator9.f();
          return _context47.finish(44);
        case 47:
          _context47.next = 49;
          return connection.commit();
        case 49:
          return _context47.abrupt("return", insertResults);
        case 52:
          _context47.prev = 52;
          _context47.t1 = _context47["catch"](0);
          _context47.next = 56;
          return connection.rollback();
        case 56:
          console.error(_context47.t1);
          throw new Error(_context47.t1.message);
        case 58:
          _context47.prev = 58;
          if (connection) {
            connection.release();
          }
          return _context47.finish(58);
        case 61:
        case "end":
          return _context47.stop();
      }
    }, _callee47, null, [[0, 52, 58, 61], [18, 41, 44, 47]]);
  }));
  return function createCancelationPolicy(_x76, _x77) {
    return _ref47.apply(this, arguments);
  };
}();
var cancellationPolicy = /*#__PURE__*/function () {
  var _ref48 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee48(req, res) {
    var id, deletequery;
    return _regeneratorRuntime().wrap(function _callee48$(_context48) {
      while (1) switch (_context48.prev = _context48.next) {
        case 0:
          id = req.params.id;
          deletequery = "DELETE FROM cancellation_policy WHERE id= ?";
          _context48.next = 4;
          return _db["default"].query(deletequery, [id]);
        case 4:
          return _context48.abrupt("return", res.status(200).json({
            status: true,
            message: 'cancellationPolicy has deleted'
          }));
        case 5:
        case "end":
          return _context48.stop();
      }
    }, _callee48);
  }));
  return function cancellationPolicy(_x78, _x79) {
    return _ref48.apply(this, arguments);
  };
}();
var createHighlights = /*#__PURE__*/function () {
  var _ref49 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee49(req, PKID) {
    var highlights, connection, updatedOrInsertedHighlights, _iterator10, _step10, highlight, id, _highlights, packageQuery, _yield$connection$exe27, _yield$connection$exe28, packageResults, tour_package_id, updateQuery, insertQuery;
    return _regeneratorRuntime().wrap(function _callee49$(_context49) {
      while (1) switch (_context49.prev = _context49.next) {
        case 0:
          _context49.prev = 0;
          highlights = req.body;
          if (!(!highlights || !Array.isArray(highlights) || highlights.length === 0)) {
            _context49.next = 4;
            break;
          }
          throw new Error("Highlights are required as an array of objects.");
        case 4:
          _context49.next = 6;
          return _db["default"].getConnection();
        case 6:
          connection = _context49.sent;
          updatedOrInsertedHighlights = [];
          _iterator10 = _createForOfIteratorHelper(highlights);
          _context49.prev = 9;
          _iterator10.s();
        case 11:
          if ((_step10 = _iterator10.n()).done) {
            _context49.next = 39;
            break;
          }
          highlight = _step10.value;
          id = highlight.id, _highlights = highlight.highlights;
          if (_highlights) {
            _context49.next = 16;
            break;
          }
          throw new Error("Highlight text is required for each object.");
        case 16:
          packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ? ";
          _context49.next = 19;
          return connection.execute(packageQuery, [PKID]);
        case 19:
          _yield$connection$exe27 = _context49.sent;
          _yield$connection$exe28 = _slicedToArray(_yield$connection$exe27, 1);
          packageResults = _yield$connection$exe28[0];
          if (!(packageResults.length === 0)) {
            _context49.next = 24;
            break;
          }
          throw new Error("Tour package not found.");
        case 24:
          tour_package_id = packageResults[0].PKID;
          console.log(PKID);
          if (!id) {
            _context49.next = 33;
            break;
          }
          // If ID is provided, update the existing highlight
          updateQuery = "UPDATE highlights SET highlights = ? WHERE id = ?";
          _context49.next = 30;
          return connection.execute(updateQuery, [_highlights, id]);
        case 30:
          updatedOrInsertedHighlights.push({
            id: id,
            status: true,
            message: "Highlight updated successfully"
          });
          _context49.next = 37;
          break;
        case 33:
          // If ID is not provided, it's a new highlight to be inserted
          insertQuery = "INSERT INTO highlights ( tour_package_id, highlights) VALUES (?, ?)";
          _context49.next = 36;
          return connection.execute(insertQuery, [tour_package_id, _highlights]);
        case 36:
          updatedOrInsertedHighlights.push({
            status: true,
            message: "New highlight inserted successfully"
          });
        case 37:
          _context49.next = 11;
          break;
        case 39:
          _context49.next = 44;
          break;
        case 41:
          _context49.prev = 41;
          _context49.t0 = _context49["catch"](9);
          _iterator10.e(_context49.t0);
        case 44:
          _context49.prev = 44;
          _iterator10.f();
          return _context49.finish(44);
        case 47:
          connection.release();
          return _context49.abrupt("return", updatedOrInsertedHighlights);
        case 51:
          _context49.prev = 51;
          _context49.t1 = _context49["catch"](0);
          console.error(_context49.t1);
          throw new Error(_context49.t1.message);
        case 55:
        case "end":
          return _context49.stop();
      }
    }, _callee49, null, [[0, 51], [9, 41, 44, 47]]);
  }));
  return function createHighlights(_x80, _x81) {
    return _ref49.apply(this, arguments);
  };
}();
var deleteHighlight = /*#__PURE__*/function () {
  var _ref50 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee50(req, res) {
    var id, deletequery;
    return _regeneratorRuntime().wrap(function _callee50$(_context50) {
      while (1) switch (_context50.prev = _context50.next) {
        case 0:
          id = req.params.id;
          deletequery = "DELETE FROM highlights WHERE id= ? ";
          _context50.next = 4;
          return _db["default"].query(deletequery, [id]);
        case 4:
          return _context50.abrupt("return", res.status(200).json({
            status: true,
            message: 'Highlight has deleted'
          }));
        case 5:
        case "end":
          return _context50.stop();
      }
    }, _callee50);
  }));
  return function deleteHighlight(_x82, _x83) {
    return _ref50.apply(this, arguments);
  };
}();
var deleteFAQ = /*#__PURE__*/function () {
  var _ref51 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee51(req, res) {
    var id, deletequery;
    return _regeneratorRuntime().wrap(function _callee51$(_context51) {
      while (1) switch (_context51.prev = _context51.next) {
        case 0:
          id = req.params.id;
          deletequery = "DELETE FROM FAQs WHERE id= ? ";
          _context51.next = 4;
          return _db["default"].query(deletequery, [id]);
        case 4:
          return _context51.abrupt("return", res.status(200).json({
            status: true,
            message: 'FAQs has deleted'
          }));
        case 5:
        case "end":
          return _context51.stop();
      }
    }, _callee51);
  }));
  return function deleteFAQ(_x84, _x85) {
    return _ref51.apply(this, arguments);
  };
}();
var createAddOns = /*#__PURE__*/function () {
  var _ref52 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee52(tour_package_id, req) {
    var addOns, connection, updatedOrInsertedAddOns, _iterator11, _step11, addOn, id, service, description, cost, insertQuery, updateQuery, _yield$connection$exe29, _yield$connection$exe30, result;
    return _regeneratorRuntime().wrap(function _callee52$(_context52) {
      while (1) switch (_context52.prev = _context52.next) {
        case 0:
          _context52.prev = 0;
          addOns = req.body.add_ons; // Corrected key to match the Postman request
          if (!(!addOns || !Array.isArray(addOns) || addOns.length === 0)) {
            _context52.next = 4;
            break;
          }
          throw new Error("Add-ons are required as an array of objects.");
        case 4:
          _context52.next = 6;
          return _db["default"].getConnection();
        case 6:
          connection = _context52.sent;
          updatedOrInsertedAddOns = [];
          _iterator11 = _createForOfIteratorHelper(addOns);
          _context52.prev = 9;
          _iterator11.s();
        case 11:
          if ((_step11 = _iterator11.n()).done) {
            _context52.next = 32;
            break;
          }
          addOn = _step11.value;
          id = addOn.id, service = addOn.service, description = addOn.description, cost = addOn.cost;
          if (!(!service || !description || !cost)) {
            _context52.next = 16;
            break;
          }
          throw new Error("Service, description, and cost are required for each add-on object.");
        case 16:
          insertQuery = "INSERT INTO add_ons (services, description, tour_package_id, cost) VALUES (?, ?, ?, ?)";
          if (!id) {
            _context52.next = 24;
            break;
          }
          // If ID is provided, update the existing add-on
          updateQuery = "UPDATE add_ons SET services = ?, description = ?, cost = ? WHERE id = ?";
          _context52.next = 21;
          return connection.execute(updateQuery, [service, description, cost, id]);
        case 21:
          updatedOrInsertedAddOns.push({
            id: id,
            status: true,
            message: "Add-on updated successfully"
          });
          _context52.next = 30;
          break;
        case 24:
          _context52.next = 26;
          return connection.execute(insertQuery, [service, description, tour_package_id, cost]);
        case 26:
          _yield$connection$exe29 = _context52.sent;
          _yield$connection$exe30 = _slicedToArray(_yield$connection$exe29, 1);
          result = _yield$connection$exe30[0];
          updatedOrInsertedAddOns.push({
            status: true,
            message: "New add-on inserted successfully"
          });
        case 30:
          _context52.next = 11;
          break;
        case 32:
          _context52.next = 37;
          break;
        case 34:
          _context52.prev = 34;
          _context52.t0 = _context52["catch"](9);
          _iterator11.e(_context52.t0);
        case 37:
          _context52.prev = 37;
          _iterator11.f();
          return _context52.finish(37);
        case 40:
          connection.release();
          return _context52.abrupt("return", updatedOrInsertedAddOns);
        case 44:
          _context52.prev = 44;
          _context52.t1 = _context52["catch"](0);
          console.error(_context52.t1);
          throw _context52.t1;
        case 48:
        case "end":
          return _context52.stop();
      }
    }, _callee52, null, [[0, 44], [9, 34, 37, 40]]);
  }));
  return function createAddOns(_x86, _x87) {
    return _ref52.apply(this, arguments);
  };
}();
var deleteTourPlanEvents = /*#__PURE__*/function () {
  var _ref53 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee53(req, id) {
    var connection, eventIds, deletedEvents, _iterator12, _step12, eventId, tourPlanEventsDeleteQuery, _yield$connection$que, _yield$connection$que2, deleteResult;
    return _regeneratorRuntime().wrap(function _callee53$(_context53) {
      while (1) switch (_context53.prev = _context53.next) {
        case 0:
          _context53.next = 2;
          return _db["default"].getConnection();
        case 2:
          connection = _context53.sent;
          _context53.prev = 3;
          _context53.next = 6;
          return connection.beginTransaction();
        case 6:
          eventIds = req.body;
          deletedEvents = [];
          _iterator12 = _createForOfIteratorHelper(eventIds);
          _context53.prev = 9;
          _iterator12.s();
        case 11:
          if ((_step12 = _iterator12.n()).done) {
            _context53.next = 22;
            break;
          }
          eventId = _step12.value;
          tourPlanEventsDeleteQuery = "\n        DELETE FROM tour_plan_events\n        WHERE id = ? AND tour_plan_id =?\n      ";
          _context53.next = 16;
          return connection.query(tourPlanEventsDeleteQuery, [eventId.id, id]);
        case 16:
          _yield$connection$que = _context53.sent;
          _yield$connection$que2 = _slicedToArray(_yield$connection$que, 1);
          deleteResult = _yield$connection$que2[0];
          if (deleteResult.affectedRows > 0) {
            deletedEvents.push({
              id: eventId.id
            });
          }
        case 20:
          _context53.next = 11;
          break;
        case 22:
          _context53.next = 27;
          break;
        case 24:
          _context53.prev = 24;
          _context53.t0 = _context53["catch"](9);
          _iterator12.e(_context53.t0);
        case 27:
          _context53.prev = 27;
          _iterator12.f();
          return _context53.finish(27);
        case 30:
          _context53.next = 32;
          return connection.commit();
        case 32:
          return _context53.abrupt("return", deletedEvents);
        case 35:
          _context53.prev = 35;
          _context53.t1 = _context53["catch"](3);
          _context53.next = 39;
          return connection.rollback();
        case 39:
          throw _context53.t1;
        case 40:
          _context53.prev = 40;
          connection.release();
          return _context53.finish(40);
        case 43:
        case "end":
          return _context53.stop();
      }
    }, _callee53, null, [[3, 35, 40, 43], [9, 24, 27, 30]]);
  }));
  return function deleteTourPlanEvents(_x88, _x89) {
    return _ref53.apply(this, arguments);
  };
}();
var AddFAQs = /*#__PURE__*/function () {
  var _ref54 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee54(req, res) {
    var faqsData, _iterator13, _step13, faqData, pkid, faqs, packagequery, _yield$pool$query37, _yield$pool$query38, tourPackage, _iterator14, _step14, faq, question, answer, insertQuery, _question, _answer, _insertQuery;
    return _regeneratorRuntime().wrap(function _callee54$(_context54) {
      while (1) switch (_context54.prev = _context54.next) {
        case 0:
          _context54.prev = 0;
          faqsData = req.body.faqsData; // Array of objects containing tour package ID and FAQs
          // Validate if faqsData is provided
          if (!(!faqsData || !Array.isArray(faqsData) || faqsData.length === 0)) {
            _context54.next = 4;
            break;
          }
          return _context54.abrupt("return", res.status(400).json({
            message: "Please provide an array of FAQs data."
          }));
        case 4:
          // Insert FAQs for each tour package
          _iterator13 = _createForOfIteratorHelper(faqsData);
          _context54.prev = 5;
          _iterator13.s();
        case 7:
          if ((_step13 = _iterator13.n()).done) {
            _context54.next = 47;
            break;
          }
          faqData = _step13.value;
          pkid = faqData.pkid, faqs = faqData.faqs; // Check if the tour package exists
          packagequery = "SELECT * FROM tourpackage WHERE PKID=?";
          _context54.next = 13;
          return _db["default"].query(packagequery, [pkid]);
        case 13:
          _yield$pool$query37 = _context54.sent;
          _yield$pool$query38 = _slicedToArray(_yield$pool$query37, 1);
          tourPackage = _yield$pool$query38[0];
          if (tourPackage.length) {
            _context54.next = 18;
            break;
          }
          return _context54.abrupt("return", res.status(404).json({
            message: "Tour package with ID ".concat(pkid, " not found.")
          }));
        case 18:
          if (!(Array.isArray(faqs) && faqs.length > 0)) {
            _context54.next = 40;
            break;
          }
          // Insert multiple FAQs for the current tour package
          _iterator14 = _createForOfIteratorHelper(faqs);
          _context54.prev = 20;
          _iterator14.s();
        case 22:
          if ((_step14 = _iterator14.n()).done) {
            _context54.next = 30;
            break;
          }
          faq = _step14.value;
          question = faq.question, answer = faq.answer;
          insertQuery = "INSERT INTO FAQs(tour_package_id, question, answer) VALUES(?,?,?)";
          _context54.next = 28;
          return _db["default"].query(insertQuery, [pkid, question, answer]);
        case 28:
          _context54.next = 22;
          break;
        case 30:
          _context54.next = 35;
          break;
        case 32:
          _context54.prev = 32;
          _context54.t0 = _context54["catch"](20);
          _iterator14.e(_context54.t0);
        case 35:
          _context54.prev = 35;
          _iterator14.f();
          return _context54.finish(35);
        case 38:
          _context54.next = 45;
          break;
        case 40:
          if (!(faqs && _typeof(faqs) === "object")) {
            _context54.next = 45;
            break;
          }
          // Insert single FAQ for the current tour package
          _question = faqs.question, _answer = faqs.answer;
          _insertQuery = "INSERT INTO FAQs(tour_package_id, question, answer) VALUES(?,?,?)";
          _context54.next = 45;
          return _db["default"].query(_insertQuery, [pkid, _question, _answer]);
        case 45:
          _context54.next = 7;
          break;
        case 47:
          _context54.next = 52;
          break;
        case 49:
          _context54.prev = 49;
          _context54.t1 = _context54["catch"](5);
          _iterator13.e(_context54.t1);
        case 52:
          _context54.prev = 52;
          _iterator13.f();
          return _context54.finish(52);
        case 55:
          return _context54.abrupt("return", res.status(200).json({
            status: true,
            message: "FAQs added successfully to tour packages."
          }));
        case 58:
          _context54.prev = 58;
          _context54.t2 = _context54["catch"](0);
          console.error("Error adding FAQs:", _context54.t2);
          return _context54.abrupt("return", res.status(500).json({
            message: "Internal server error."
          }));
        case 62:
        case "end":
          return _context54.stop();
      }
    }, _callee54, null, [[0, 58], [5, 49, 52, 55], [20, 32, 35, 38]]);
  }));
  return function AddFAQs(_x90, _x91) {
    return _ref54.apply(this, arguments);
  };
}();
var tourpackageService = exports.tourpackageService = (_tourpackageService = {
  getbookingslot: getbookingslot,
  getInstallment: getInstallment,
  deleteinclusion: deleteinclusion,
  getSingleTourPackages: getSingleTourPackages,
  deletePackage: deletePackage,
  getAllfaq: getAllfaq,
  addtourpackage: addtourpackage,
  addInstallment: addInstallment,
  AddFAQs: AddFAQs,
  getAllTourPackages: getAllTourPackages,
  updateTourPackage: updateTourPackage,
  MainImage: MainImage,
  deletemainimage: deletemainimage,
  createPlaceVisit: createPlaceVisit,
  createTourPlan: createTourPlan,
  gettouritenerary: gettouritenerary,
  deletTourItenerary: deletTourItenerary,
  deleteHighlight: deleteHighlight,
  getTourPlan: getTourPlan,
  deleteTourPlanEvents: deleteTourPlanEvents,
  createInclusion: createInclusion,
  getAAlladdOns: getAAlladdOns,
  createExclusion: createExclusion,
  deleteFAQ: deleteFAQ,
  deleteexclusion: deleteexclusion,
  createBookingPolicy: createBookingPolicy,
  deletepolicy: deletepolicy,
  deleteAddons: deleteAddons,
  createCancelationPolicy: createCancelationPolicy,
  createHighlights: createHighlights,
  createAddOns: createAddOns
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_tourpackageService, "getSingleTourPackages", getSingleTourPackages), "getBookingPolicy", getBookingPolicy), "createAlbumImage", createAlbumImage), "UpdateAlbumImage", UpdateAlbumImage), "updateTourPackage", updateTourPackage), "cancellationPolicy", cancellationPolicy), "UpdateMainImage", UpdateMainImage), "deleteBOOKINGSLOT", deleteBOOKINGSLOT), "updatealbumIinnermage", updatealbumIinnermage), "UpdatevisitedImage", UpdatevisitedImage), _defineProperty(_tourpackageService, "createBookingSlot", createBookingSlot));