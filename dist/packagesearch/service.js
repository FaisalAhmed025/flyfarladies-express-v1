"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.packageSearch = void 0;
var _db = _interopRequireDefault(require("../database/db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getTourPackageByLocation = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var tourPackages, matchingPackages, _iterator, _step, tourPackage, locations, _iterator2, _step2, location;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return db.query('SELECT * FROM tourpackage');
        case 3:
          tourPackages = _context.sent;
          matchingPackages = []; // Loop through fetched tour packages
          _iterator = _createForOfIteratorHelper(tourPackages);
          _context.prev = 6;
          _iterator.s();
        case 8:
          if ((_step = _iterator.n()).done) {
            _context.next = 33;
            break;
          }
          tourPackage = _step.value;
          _context.next = 12;
          return db.query('SELECT * FROM locations WHERE tourpackageId = ?', [tourPackage.id]);
        case 12:
          locations = _context.sent;
          // Loop through fetched locations
          _iterator2 = _createForOfIteratorHelper(locations);
          _context.prev = 14;
          _iterator2.s();
        case 16:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 23;
            break;
          }
          location = _step2.value;
          if (!(location.country === country || location.city.includes(city))) {
            _context.next = 21;
            break;
          }
          matchingPackages.push(tourPackage);
          return _context.abrupt("break", 23);
        case 21:
          _context.next = 16;
          break;
        case 23:
          _context.next = 28;
          break;
        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](14);
          _iterator2.e(_context.t0);
        case 28:
          _context.prev = 28;
          _iterator2.f();
          return _context.finish(28);
        case 31:
          _context.next = 8;
          break;
        case 33:
          _context.next = 38;
          break;
        case 35:
          _context.prev = 35;
          _context.t1 = _context["catch"](6);
          _iterator.e(_context.t1);
        case 38:
          _context.prev = 38;
          _iterator.f();
          return _context.finish(38);
        case 41:
          return _context.abrupt("return", {
            tourPackages: matchingPackages
          });
        case 44:
          _context.prev = 44;
          _context.t2 = _context["catch"](0);
          console.error('Error fetching tour packages by location:', _context.t2);
          throw _context.t2;
        case 48:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 44], [6, 35, 38, 41], [14, 25, 28, 31]]);
  }));
  return function getTourPackageByLocation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// const getcityAndCountry = async (req, res) => {
//   const { TripType, StartDate } = req.query;
//   const [month, year] = StartDate.split(' ');
//   const startOfMonth = new Date(`${month} 1, ${year}`).toISOString();
//   const endOfMonth = new Date(new Date(startOfMonth).getFullYear(), new Date(startOfMonth).getMonth() + 1, 0).toISOString();
//   const packagequery = `SELECT City, Country FROM tourpackage WHERE TripType = ? AND StartDate >= ? AND StartDate <= ? AND isActive=1`;

//   try {
//     const [data] = await pool.query(packagequery, [TripType, startOfMonth, endOfMonth]);
//     if (data.length === 0) {
//       return res.send({ message: "Package not found" });
//     }
//     return res.send({ data: data });
//   } catch (error) {
//     console.error('Error fetching tour packages:', error);
//     return res.status(500).send({ error: 'Internal server error' });
//   }
// };

var getcityAndCountry = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$query, TripType, StartDate, _StartDate$split, _StartDate$split2, month, year, startOfMonth, endOfMonth, packagequery, _yield$pool$query, _yield$pool$query2, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, TripType = _req$query.TripType, StartDate = _req$query.StartDate;
          _StartDate$split = StartDate.split(' '), _StartDate$split2 = _slicedToArray(_StartDate$split, 2), month = _StartDate$split2[0], year = _StartDate$split2[1];
          startOfMonth = new Date("".concat(month, " 1, ").concat(year)).toISOString();
          endOfMonth = new Date(new Date(startOfMonth).getFullYear(), new Date(startOfMonth).getMonth() + 1, 0).toISOString();
          packagequery = "\n    SELECT tp.City, tp.Country, tp.PKID\n    FROM tourpackage tp\n    INNER JOIN bookingslot bs ON tp.PKID = bs.tour_package_id\n    WHERE tp.TripType = ? \n    AND bs.StartDate >= ? \n    AND bs.EndDate <= ? \n    AND tp.isActive=1\n  ";
          _context2.prev = 5;
          _context2.next = 8;
          return _db["default"].query(packagequery, [TripType, startOfMonth, endOfMonth]);
        case 8:
          _yield$pool$query = _context2.sent;
          _yield$pool$query2 = _slicedToArray(_yield$pool$query, 1);
          data = _yield$pool$query2[0];
          if (!(data.length === 0)) {
            _context2.next = 13;
            break;
          }
          return _context2.abrupt("return", res.send({
            message: "Package not found"
          }));
        case 13:
          return _context2.abrupt("return", res.send({
            data: data
          }));
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](5);
          console.error('Error fetching tour packages:', _context2.t0);
          return _context2.abrupt("return", res.status(500).send({
            error: 'Internal server error'
          }));
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[5, 16]]);
  }));
  return function getcityAndCountry(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// const getTourPackagesByDifferentField = async (req, res) => {
//   try {
//     const { TripType, City, StartDate, Country } = req.query;

//     if (TripType && Country && City && StartDate ) {
//       const [month, year] = StartDate.split(' ');
//       const startOfMonth = new Date(`${month} 1, ${year}`).toISOString();
//       const endOfMonth = new Date(new Date(startOfMonth).getFullYear(), new Date(startOfMonth).getMonth() + 1, 0).toISOString();
//       const packagequery = `SELECT * FROM tourpackage WHERE TripType = ? AND Country LIKE ? AND City LIKE?  AND StartDate >= ? AND StartDate <= ? AND isActive=1`;
//       console.log(packagequery);
//       try {
//         const [data] = await pool.query(packagequery, [TripType, `%${Country}%`, `%${City}%`,startOfMonth, endOfMonth]);
//         if (data.length === 0) {
//           return res.send({ message: "Package not found" });
//         }
//         return res.send({ data: data });
//       } catch (error) {
//         console.error('Error fetching tour packages:', error);
//         return res.status(500).send({ error: 'Internal server error' });
//       }
//     }

//     else if (TripType && Country && StartDate ) {
//       const [month, year] = StartDate.split(' ');
//       const startOfMonth = new Date(`${month} 1, ${year}`).toISOString();
//       const endOfMonth = new Date(new Date(startOfMonth).getFullYear(), new Date(startOfMonth).getMonth() + 1, 0).toISOString();
//       const packagequery = `SELECT * FROM tourpackage WHERE TripType = ? AND Country LIKE ? AND StartDate >= ? AND StartDate <= ? AND isActive=1`;
//       console.log(packagequery);
//       try {
//         const [data] = await pool.query(packagequery, [TripType, `%${Country}%`, startOfMonth, endOfMonth]);
//         if (data.length === 0) {
//           return res.send({ message: "Package not found" });
//         }
//         return res.send({ data: data });
//       } catch (error) {
//         console.error('Error fetching tour packages:', error);
//         return res.status(500).send({ error: 'Internal server error' });
//       }
//     }

//    else if (TripType && City && StartDate) {
//       const [month, year] = StartDate.split(' ');
//       const startOfMonth = new Date(`${month} 1, ${year}`).toISOString();
//       const endOfMonth = new Date(new Date(startOfMonth).getFullYear(), new Date(startOfMonth).getMonth() + 1, 0).toISOString();
//       const packagequery = `SELECT * FROM tourpackage WHERE TripType = ? AND City LIKE ? AND StartDate >= ? AND StartDate <= ? AND isActive=1`;
//       console.log(packagequery);
//       try {
//         const [data] = await pool.query(packagequery, [TripType, `%${City}%`, startOfMonth, endOfMonth]);
//         if (data.length === 0) {
//           return res.send({ message: "Package not found" });
//         }
//         return res.send({ data: data });
//       } catch (error) {
//         console.error('Error fetching tour packages:', error);
//         return res.status(500).send({ error: 'Internal server error' });
//       }
//     }

//    else if (TripType && StartDate) {
//       const [month, year] = StartDate.split(' ');
//       const startOfMonth = new Date(`${month} 1, ${year}`).toISOString();
//       const endOfMonth = new Date(new Date(startOfMonth).getFullYear(), new Date(startOfMonth).getMonth() + 1, 0).toISOString();
//       const packagequery = `SELECT * FROM tourpackage WHERE TripType = ? AND StartDate >= ? AND StartDate <= ? AND isActive=1`;
//       console.log(packagequery);
//       try {
//         const [data] = await pool.query(packagequery, [TripType, startOfMonth, endOfMonth]);
//         if (data.length === 0) {
//           return res.send({ message: "Package not found" });
//         }
//         return res.send({ data: data });
//       } catch (error) {
//         console.error('Error fetching tour packages:', error);
//         return res.status(500).send({ error: 'Internal server error' });
//       }
//     }

//     else if(City && Country){
//       const packagequery = `SELECT * FROM tourpackage WHERE City LIKE? AND Country=? AND isActive=1` ;
//       console.log(packagequery)
//       const [data] = await pool.query(packagequery, [`%${City}%`, Country])
//       if(data.length ===0){
//          return res.send({message:"package not found"})
//       }
//       return res.send({data:data})
//     }

//    else if(TripType && Country){
//       const packagequery = `SELECT * FROM tourpackage WHERE TripType=? AND Country LIKE ? AND isActive=1` ;
//       console.log(packagequery)
//       const [data] = await pool.query(packagequery, [TripType, `%${Country}%`])
//       if(data.length ===0){
//          return res.send({message:"package not found"})
//       }
//       return res.send({data:data})
//     }

//     else if(City && TripType){
//       const packagequery = `SELECT * FROM tourpackage WHERE City LIKE? AND TripType=? AND isActive=1` ;
//       console.log(packagequery)
//       const [data] = await pool.query(packagequery, [`%${City}%`, TripType])
//       if(data.length ===0){
//          return res.send({message:"package not found"})
//       }
//       return res.send({data:data})
//     }

//     else if(City){
//       const packagequery = `SELECT * FROM tourpackage WHERE City LIKE? AND isActive=1` ;
//       console.log(packagequery)
//       const [data] = await pool.query(packagequery, [`%${City}%`])
//       if(data.length ===0){
//          return res.send({message:"package not found"})
//       }
//       return res.send({data:data})
//     }

//     else if(TripType){
//       const packagequery = `SELECT * FROM tourpackage WHERE TripType=? AND isActive=1` ;
//       console.log(packagequery)
//       const [data] = await pool.query(packagequery, [TripType])
//       if(data.length ===0){
//          return res.send({message:"package not found"})
//       }
//       return res.send({data:data})
//     }

//   } catch (error) {
//     console.error('Error fetching tour packages:', error);
//     throw error;
//   }
// }

var getTourPackagesByDifferentField = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$query2, TripType, City, StartDate, Country, _StartDate$split3, _StartDate$split4, month, year, startOfMonth, endOfMonth, packagequery, _yield$pool$query3, _yield$pool$query4, data, _StartDate$split5, _StartDate$split6, _month, _year, _startOfMonth, _endOfMonth, _packagequery, _yield$pool$query5, _yield$pool$query6, _data, _StartDate$split7, _StartDate$split8, _month2, _year2, _startOfMonth2, _endOfMonth2, _packagequery2, _yield$pool$query7, _yield$pool$query8, _data2, _StartDate$split9, _StartDate$split10, _month3, _year3, _startOfMonth3, _endOfMonth3, _packagequery3, _yield$pool$query9, _yield$pool$query10, _data3, _packagequery4, _yield$pool$query11, _yield$pool$query12, _data4, _packagequery5, _yield$pool$query13, _yield$pool$query14, _data5, _packagequery6, _yield$pool$query15, _yield$pool$query16, _data6, _packagequery7, _yield$pool$query17, _yield$pool$query18, _data7, _packagequery8, _yield$pool$query19, _yield$pool$query20, _data8;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query2 = req.query, TripType = _req$query2.TripType, City = _req$query2.City, StartDate = _req$query2.StartDate, Country = _req$query2.Country;
          if (!(TripType && Country && City && StartDate)) {
            _context3.next = 24;
            break;
          }
          _StartDate$split3 = StartDate.split(' '), _StartDate$split4 = _slicedToArray(_StartDate$split3, 2), month = _StartDate$split4[0], year = _StartDate$split4[1];
          startOfMonth = new Date("".concat(month, " 1, ").concat(year)).toISOString();
          endOfMonth = new Date(new Date(startOfMonth).getFullYear(), new Date(startOfMonth).getMonth() + 1, 0).toISOString();
          packagequery = "\n        SELECT * \n        FROM tourpackage tp\n        INNER JOIN bookingslot bs ON tp.PKID = bs.tour_package_id\n        WHERE tp.TripType = ? \n        AND tp.Country LIKE ? \n        AND tp.City LIKE ? \n        AND bs.StartDate >= ? \n        AND bs.EndDate <= ? \n        AND tp.isActive=1\n      ";
          _context3.prev = 7;
          _context3.next = 10;
          return _db["default"].query(packagequery, [TripType, "%".concat(Country, "%"), "%".concat(City, "%"), startOfMonth, endOfMonth]);
        case 10:
          _yield$pool$query3 = _context3.sent;
          _yield$pool$query4 = _slicedToArray(_yield$pool$query3, 1);
          data = _yield$pool$query4[0];
          if (!(data.length === 0)) {
            _context3.next = 15;
            break;
          }
          return _context3.abrupt("return", res.send({
            message: "Package not found"
          }));
        case 15:
          return _context3.abrupt("return", res.send({
            data: data
          }));
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](7);
          console.error('Error fetching tour packages:', _context3.t0);
          return _context3.abrupt("return", res.status(500).send({
            error: 'Internal server error'
          }));
        case 22:
          _context3.next = 183;
          break;
        case 24:
          if (!(TripType && Country && StartDate)) {
            _context3.next = 46;
            break;
          }
          _StartDate$split5 = StartDate.split(' '), _StartDate$split6 = _slicedToArray(_StartDate$split5, 2), _month = _StartDate$split6[0], _year = _StartDate$split6[1];
          _startOfMonth = new Date("".concat(_month, " 1, ").concat(_year)).toISOString();
          _endOfMonth = new Date(new Date(_startOfMonth).getFullYear(), new Date(_startOfMonth).getMonth() + 1, 0).toISOString();
          _packagequery = "\n        SELECT * \n        FROM tourpackage tp\n        INNER JOIN bookingslot bs ON tp.PKID = bs.tour_package_id\n        WHERE tp.TripType = ? \n        AND tp.Country LIKE ? \n        AND bs.StartDate >= ? \n        AND bs.EndDate <= ? \n        AND tp.isActive=1\n      ";
          _context3.prev = 29;
          _context3.next = 32;
          return _db["default"].query(_packagequery, [TripType, "%".concat(Country, "%"), _startOfMonth, _endOfMonth]);
        case 32:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = _slicedToArray(_yield$pool$query5, 1);
          _data = _yield$pool$query6[0];
          if (!(_data.length === 0)) {
            _context3.next = 37;
            break;
          }
          return _context3.abrupt("return", res.send({
            message: "Package not found"
          }));
        case 37:
          return _context3.abrupt("return", res.send({
            data: _data
          }));
        case 40:
          _context3.prev = 40;
          _context3.t1 = _context3["catch"](29);
          console.error('Error fetching tour packages:', _context3.t1);
          return _context3.abrupt("return", res.status(500).send({
            error: 'Internal server error'
          }));
        case 44:
          _context3.next = 183;
          break;
        case 46:
          if (!(TripType && City && StartDate)) {
            _context3.next = 68;
            break;
          }
          _StartDate$split7 = StartDate.split(' '), _StartDate$split8 = _slicedToArray(_StartDate$split7, 2), _month2 = _StartDate$split8[0], _year2 = _StartDate$split8[1];
          _startOfMonth2 = new Date("".concat(_month2, " 1, ").concat(_year2)).toISOString();
          _endOfMonth2 = new Date(new Date(_startOfMonth2).getFullYear(), new Date(_startOfMonth2).getMonth() + 1, 0).toISOString();
          _packagequery2 = "\n        SELECT * \n        FROM tourpackage tp\n        INNER JOIN bookingslot bs ON tp.PKID = bs.tour_package_id\n        WHERE tp.TripType = ? \n        AND tp.City LIKE ? \n        AND bs.StartDate >= ? \n        AND bs.EndDate <= ? \n        AND tp.isActive=1\n      ";
          _context3.prev = 51;
          _context3.next = 54;
          return _db["default"].query(_packagequery2, [TripType, "%".concat(City, "%"), _startOfMonth2, _endOfMonth2]);
        case 54:
          _yield$pool$query7 = _context3.sent;
          _yield$pool$query8 = _slicedToArray(_yield$pool$query7, 1);
          _data2 = _yield$pool$query8[0];
          if (!(_data2.length === 0)) {
            _context3.next = 59;
            break;
          }
          return _context3.abrupt("return", res.send({
            message: "Package not found"
          }));
        case 59:
          return _context3.abrupt("return", res.send({
            data: _data2
          }));
        case 62:
          _context3.prev = 62;
          _context3.t2 = _context3["catch"](51);
          console.error('Error fetching tour packages:', _context3.t2);
          return _context3.abrupt("return", res.status(500).send({
            error: 'Internal server error'
          }));
        case 66:
          _context3.next = 183;
          break;
        case 68:
          if (!(TripType && StartDate)) {
            _context3.next = 90;
            break;
          }
          _StartDate$split9 = StartDate.split(' '), _StartDate$split10 = _slicedToArray(_StartDate$split9, 2), _month3 = _StartDate$split10[0], _year3 = _StartDate$split10[1];
          _startOfMonth3 = new Date("".concat(_month3, " 1, ").concat(_year3)).toISOString();
          _endOfMonth3 = new Date(new Date(_startOfMonth3).getFullYear(), new Date(_startOfMonth3).getMonth() + 1, 0).toISOString();
          _packagequery3 = "\n        SELECT * \n        FROM tourpackage tp\n        INNER JOIN bookingslot bs ON tp.PKID = bs.tour_package_id\n        WHERE tp.TripType = ? \n        AND bs.StartDate >= ? \n        AND bs.EndDate <= ? \n        AND tp.isActive=1\n      ";
          _context3.prev = 73;
          _context3.next = 76;
          return _db["default"].query(_packagequery3, [TripType, _startOfMonth3, _endOfMonth3]);
        case 76:
          _yield$pool$query9 = _context3.sent;
          _yield$pool$query10 = _slicedToArray(_yield$pool$query9, 1);
          _data3 = _yield$pool$query10[0];
          if (!(_data3.length === 0)) {
            _context3.next = 81;
            break;
          }
          return _context3.abrupt("return", res.send({
            message: "Package not found"
          }));
        case 81:
          return _context3.abrupt("return", res.send({
            data: _data3
          }));
        case 84:
          _context3.prev = 84;
          _context3.t3 = _context3["catch"](73);
          console.error('Error fetching tour packages:', _context3.t3);
          return _context3.abrupt("return", res.status(500).send({
            error: 'Internal server error'
          }));
        case 88:
          _context3.next = 183;
          break;
        case 90:
          if (!(City && Country)) {
            _context3.next = 109;
            break;
          }
          _packagequery4 = "\n        SELECT * \n        FROM tourpackage\n        WHERE City LIKE ? \n        AND Country = ? \n        AND isActive=1\n      ";
          _context3.prev = 92;
          _context3.next = 95;
          return _db["default"].query(_packagequery4, ["%".concat(City, "%"), Country]);
        case 95:
          _yield$pool$query11 = _context3.sent;
          _yield$pool$query12 = _slicedToArray(_yield$pool$query11, 1);
          _data4 = _yield$pool$query12[0];
          if (!(_data4.length === 0)) {
            _context3.next = 100;
            break;
          }
          return _context3.abrupt("return", res.send({
            message: "Package not found"
          }));
        case 100:
          return _context3.abrupt("return", res.send({
            data: _data4
          }));
        case 103:
          _context3.prev = 103;
          _context3.t4 = _context3["catch"](92);
          console.error('Error fetching tour packages:', _context3.t4);
          return _context3.abrupt("return", res.status(500).send({
            error: 'Internal server error'
          }));
        case 107:
          _context3.next = 183;
          break;
        case 109:
          if (!(TripType && Country)) {
            _context3.next = 128;
            break;
          }
          _packagequery5 = "\n        SELECT * \n        FROM tourpackage\n        WHERE TripType = ? \n        AND Country LIKE ? \n        AND isActive=1\n      ";
          _context3.prev = 111;
          _context3.next = 114;
          return _db["default"].query(_packagequery5, [TripType, "%".concat(Country, "%")]);
        case 114:
          _yield$pool$query13 = _context3.sent;
          _yield$pool$query14 = _slicedToArray(_yield$pool$query13, 1);
          _data5 = _yield$pool$query14[0];
          if (!(_data5.length === 0)) {
            _context3.next = 119;
            break;
          }
          return _context3.abrupt("return", res.send({
            message: "Package not found"
          }));
        case 119:
          return _context3.abrupt("return", res.send({
            data: _data5
          }));
        case 122:
          _context3.prev = 122;
          _context3.t5 = _context3["catch"](111);
          console.error('Error fetching tour packages:', _context3.t5);
          return _context3.abrupt("return", res.status(500).send({
            error: 'Internal server error'
          }));
        case 126:
          _context3.next = 183;
          break;
        case 128:
          if (!(City && TripType)) {
            _context3.next = 147;
            break;
          }
          _packagequery6 = "\n        SELECT * \n        FROM tourpackage\n        WHERE City LIKE ? \n        AND TripType = ? \n        AND isActive=1\n      ";
          _context3.prev = 130;
          _context3.next = 133;
          return _db["default"].query(_packagequery6, ["%".concat(City, "%"), TripType]);
        case 133:
          _yield$pool$query15 = _context3.sent;
          _yield$pool$query16 = _slicedToArray(_yield$pool$query15, 1);
          _data6 = _yield$pool$query16[0];
          if (!(_data6.length === 0)) {
            _context3.next = 138;
            break;
          }
          return _context3.abrupt("return", res.send({
            message: "Package not found"
          }));
        case 138:
          return _context3.abrupt("return", res.send({
            data: _data6
          }));
        case 141:
          _context3.prev = 141;
          _context3.t6 = _context3["catch"](130);
          console.error('Error fetching tour packages:', _context3.t6);
          return _context3.abrupt("return", res.status(500).send({
            error: 'Internal server error'
          }));
        case 145:
          _context3.next = 183;
          break;
        case 147:
          if (!City) {
            _context3.next = 166;
            break;
          }
          _packagequery7 = "\n        SELECT * \n        FROM tourpackage\n        WHERE City LIKE ? \n        AND isActive=1\n      ";
          _context3.prev = 149;
          _context3.next = 152;
          return _db["default"].query(_packagequery7, ["%".concat(City, "%")]);
        case 152:
          _yield$pool$query17 = _context3.sent;
          _yield$pool$query18 = _slicedToArray(_yield$pool$query17, 1);
          _data7 = _yield$pool$query18[0];
          if (!(_data7.length === 0)) {
            _context3.next = 157;
            break;
          }
          return _context3.abrupt("return", res.send({
            message: "Package not found"
          }));
        case 157:
          return _context3.abrupt("return", res.send({
            data: _data7
          }));
        case 160:
          _context3.prev = 160;
          _context3.t7 = _context3["catch"](149);
          console.error('Error fetching tour packages:', _context3.t7);
          return _context3.abrupt("return", res.status(500).send({
            error: 'Internal server error'
          }));
        case 164:
          _context3.next = 183;
          break;
        case 166:
          if (!TripType) {
            _context3.next = 183;
            break;
          }
          _packagequery8 = "\n        SELECT * \n        FROM tourpackage\n        WHERE TripType = ? \n        AND isActive=1\n      ";
          _context3.prev = 168;
          _context3.next = 171;
          return _db["default"].query(_packagequery8, [TripType]);
        case 171:
          _yield$pool$query19 = _context3.sent;
          _yield$pool$query20 = _slicedToArray(_yield$pool$query19, 1);
          _data8 = _yield$pool$query20[0];
          if (!(_data8.length === 0)) {
            _context3.next = 176;
            break;
          }
          return _context3.abrupt("return", res.send({
            message: "Package not found"
          }));
        case 176:
          return _context3.abrupt("return", res.send({
            data: _data8
          }));
        case 179:
          _context3.prev = 179;
          _context3.t8 = _context3["catch"](168);
          console.error('Error fetching tour packages:', _context3.t8);
          return _context3.abrupt("return", res.status(500).send({
            error: 'Internal server error'
          }));
        case 183:
          _context3.next = 189;
          break;
        case 185:
          _context3.prev = 185;
          _context3.t9 = _context3["catch"](0);
          console.error('Error fetching tour packages:', _context3.t9);
          throw _context3.t9;
        case 189:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 185], [7, 18], [29, 40], [51, 62], [73, 84], [92, 103], [111, 122], [130, 141], [149, 160], [168, 179]]);
  }));
  return function getTourPackagesByDifferentField(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var packageSearch = exports.packageSearch = {
  getcityAndCountry: getcityAndCountry,
  getTourPackagesByDifferentField: getTourPackagesByDifferentField,
  getTourPackageByLocation: getTourPackageByLocation
};