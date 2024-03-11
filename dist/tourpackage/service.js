"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.tourpackageService = exports.getHighlights = exports.getExclusion = exports.getCancellationPolicy = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _db = _interopRequireDefault(require("../database/db"));
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
          console.log("i am id", PkID);
          _context2.prev = 1;
          tourPackageQuery = "\n    SELECT\n      tourpackage.PkID AS tour_package_id,\n      tourpackage.PkID,\n      tourpackage.MainTitle,\n      tourpackage.TripType,\n      tourpackage.Location,\n      tourpackage.StartDate,\n      tourpackage.EndDate,\n      tourpackage.AvailableSeats,\n      tourpackage.PricePerAdult,\n      tourpackage.PricePerChild,\n      tourpackage.PricePerInfant,\n      tourpackage.GirlsTrip,\n      tourpackage.PackageOverview,\n      tourpackage.MinimumAge,\n      tourpackage.MaximumAge,\n      tourpackage.Price,\n      tourpackage.City,\n      tourpackage.Discount,\n      tourpackage.SelfGuided,\n      tourpackage.Flight,\n      tourpackage.Food,\n      tourpackage.Transport,\n      tourpackage.FullyGuided,\n      tourpackage.coverImage  -- Assuming there's a column in main_image for the image URL\n    FROM\n      tourpackage\n\n    WHERE\n      tourpackage.PkID = ?;\n  ";
          _context2.next = 5;
          return _db["default"].execute(tourPackageQuery, [PkID]);
        case 5:
          _yield$pool$execute = _context2.sent;
          _yield$pool$execute2 = _slicedToArray(_yield$pool$execute, 1);
          tourPackageResults = _yield$pool$execute2[0];
          console.log(tourPackageResults);
          if (!(tourPackageResults.length === 0)) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", null);
        case 11:
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
          _context2.next = 15;
          return Promise.all([getmainimage(tourPackageData.PkID), getTourPlan(tourPackageData.PkID), getVisitedPlace(tourPackageData.PkID), getInclusion(tourPackageData.PkID), getExclusion(tourPackageData.PkID), getHighlights(tourPackageData.PkID), getBookingPolicy(tourPackageData.PkID), getCancellationPolicy(tourPackageData.PkID), getalbumImage(tourPackageData.PkID)

          // getAddOns(tourPackageData.id),
          ]);
        case 15:
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
        case 40:
          _context2.prev = 40;
          _context2.t0 = _context2["catch"](1);
          throw _context2.t0;
        case 43:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 40]]);
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
    var tourPackageQuery, _yield$pool$execute19, _yield$pool$execute20, tourPackageResults, tourPackagesData, tourPackageData, _yield$Promise$all3, _yield$Promise$all4, getmainimg, tourPlan, visitedPlaces, inclusions, exclusion, highlights, bookingPolicy, cancellationPolicy, albumImage;
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
          if (!(tourPackageResults.length === 0)) {
            _context12.next = 10;
            break;
          }
          return _context12.abrupt("return", []);
        case 10:
          tourPackagesData = [];
          tourPackageData = tourPackageResults.map(function (tourPackage) {
            return {
              PkID: tourPackage.tour_package_id,
              MainTitle: tourPackage.MainTitle,
              TripType: tourPackage.TripType,
              Location: tourPackage.Location,
              StartDate: tourPackage.StartDate,
              EndDate: tourPackage.EndDate,
              AvailableSeats: tourPackage.AvailableSeats,
              MinimumAge: tourPackage.MinimumAge,
              MaximumAge: tourPackage.MaximumAge,
              PricePerAdult: tourPackage.PricePerAdult,
              PricePerChild: tourPackage.PricePerChild,
              PricePerInfant: tourPackage.PricePerInfant,
              Discount: tourPackage.Discount,
              PackageOverview: tourPackage.PackageOverview,
              coverImage: tourPackage.coverImage
              // Add other fields as needed
            };
          });
          _context12.next = 14;
          return Promise.all([getmainimage(tourPackageData.PkID), getTourPlan(tourPackageData.PkID), getVisitedPlace(tourPackageData.PkID), getInclusion(tourPackageData.PkID), getExclusion(tourPackageData.PkID), getHighlights(tourPackageData.PkID), getBookingPolicy(tourPackageData.PkID), getCancellationPolicy(tourPackageData.PkID), getalbumImage(tourPackageData.PkID)

          // getAddOns(tourPackageData.id),
          ]);
        case 14:
          _yield$Promise$all3 = _context12.sent;
          _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 9);
          getmainimg = _yield$Promise$all4[0];
          tourPlan = _yield$Promise$all4[1];
          visitedPlaces = _yield$Promise$all4[2];
          inclusions = _yield$Promise$all4[3];
          exclusion = _yield$Promise$all4[4];
          highlights = _yield$Promise$all4[5];
          bookingPolicy = _yield$Promise$all4[6];
          cancellationPolicy = _yield$Promise$all4[7];
          albumImage
          // addOns,
          = _yield$Promise$all4[8];
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
          return _context12.abrupt("return", tourPackageData);
        case 38:
          _context12.prev = 38;
          _context12.t0 = _context12["catch"](0);
          throw _context12.t0;
        case 41:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 38]]);
  }));
  return function getAllTourPackages() {
    return _ref12.apply(this, arguments);
  };
}();
var tourpackageService = exports.tourpackageService = {
  getSingleTourPackages: getSingleTourPackages,
  addtourpackage: addtourpackage
};