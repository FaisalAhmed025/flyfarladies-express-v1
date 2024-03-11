"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultipleImageHandler = void 0;
exports.deleteImageFromURL = deleteImageFromURL;
exports.storeMultipleImage = exports.storeData = exports.imageHandlerUpdate = exports.imageHandler = exports.handleSpecificImage = exports.handlePassportVisa = exports.handleMultipleImage = exports.getCurrentUserInfo = void 0;
var _folderDelete = require("./folderDelete");
var _storage = require("@google-cloud/storage");
var _sharp = _interopRequireDefault(require("sharp"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _db = _interopRequireDefault(require("../database/db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getCurrentUserInfo = exports.getCurrentUserInfo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return storeData(req, res, next, 'createuser', 'id');
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getCurrentUserInfo(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var handleMultipleImage = exports.handleMultipleImage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return MultipleImageHandler(req, res, next, 20);
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function handleMultipleImage(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var storeMultipleImage = exports.storeMultipleImage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return storeData(req, res, next, 'createuser', 'id');
        case 2:
          return _context3.abrupt("return", _context3.sent);
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function storeMultipleImage(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

/*   common function for image handler */
function saveOnGCP(_x10) {
  return _saveOnGCP.apply(this, arguments);
}
/* end of common function */
//   for single image handle
function _saveOnGCP() {
  _saveOnGCP = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req) {
    var uniqueSuffix, webpBuffer, storage, bucket, fileData, publicUrl;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          uniqueSuffix = req.file.originalname.split(' ').join('-');
          req.file.originalname = "".concat(uniqueSuffix, "_").concat(Date.now(), ".pdf");
          // Convert the image buffer to WebP format
          webpBuffer = req.file.buffer;
          if (!(req.file.mimetype !== 'application/pdf')) {
            _context10.next = 11;
            break;
          }
          _context10.next = 6;
          return (0, _sharp["default"])(webpBuffer).webp().toBuffer();
        case 6:
          webpBuffer = _context10.sent;
          // Replace req.file values with the WebP buffer
          req.file.buffer = webpBuffer;
          req.file.mimetype = 'image/webp';
          req.file.originalname = "".concat(uniqueSuffix, "_").concat(Date.now(), ".webp");
          // If you need to set an extension, you can do so here
          req.file.extension = 'webp';
        case 11:
          storage = new _storage.Storage({
            projectId: process.env.PROJECTID,
            keyFilename: 'key.json'
          }); // console.log(env.BUCKET)
          bucket = storage.bucket('b2bnodeimages');
          fileData = bucket.file(req.file.originalname);
          _context10.next = 16;
          return fileData.save(req.file.buffer, {
            contentType: req.file.mimetype,
            "public": true // Make the file publicly accessible
          });
        case 16:
          // Get the publicly accessible URL of the uploaded file
          publicUrl = "https://storage.googleapis.com/".concat(bucket.name, "/").concat(fileData.name);
          req.imageLink = publicUrl;
          // console.log(req.imageLink);
          //console.log('berofe undefine')
          return _context10.abrupt("return", publicUrl);
        case 19:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _saveOnGCP.apply(this, arguments);
}
var imageHandler = exports.imageHandler = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (req.file) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", next(new ErrorResponse('Select file', _httpStatus["default"].BAD_REQUEST)));
        case 3:
          _context4.next = 5;
          return saveOnGCP(req);
        case 5:
          req.publicImageLink = _context4.sent;
          if (saveOnGCP) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", next(new ErrorResponse('failed to save image', _httpStatus["default"].BAD_REQUEST)));
        case 8:
          next();
          _context4.next = 17;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          _context4.next = 16;
          return deleteImageFromURL(req.imageLink);
        case 16:
          next(_context4.t0);
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function imageHandler(_x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();
var imageHandlerUpdate = exports.imageHandlerUpdate = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var output;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!req.file) {
            _context5.next = 5;
            break;
          }
          _context5.next = 3;
          return saveOnGCP(req);
        case 3:
          req.publicImageLink = _context5.sent;
          // Get base URL of the server
          // Remove file extension
          output = req.publicImageLink; // console.log(output);
        case 5:
          // Continue with the next middleware even if req.file is not found
          next();
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function imageHandlerUpdate(_x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();
//delete image
function deleteImageFromURL(_x17) {
  return _deleteImageFromURL.apply(this, arguments);
}
function _deleteImageFromURL() {
  _deleteImageFromURL = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(url) {
    var parsedUrl, bucketName, pathSegments, objectName, storage;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          if (url) {
            _context11.next = 4;
            break;
          }
          console.error('Invalid URL: ', url);
          return _context11.abrupt("return");
        case 4:
          parsedUrl = new URL(url);
          bucketName = parsedUrl.hostname.split('.')[0];
          pathSegments = decodeURIComponent(parsedUrl.pathname).split('/');
          objectName = pathSegments[pathSegments.length - 1]; // Get the last segment
          console.table({
            bucketName: bucketName,
            objectName: objectName
          });
          storage = new _storage.Storage({
            projectId: process.env.gcp.project_id,
            keyFilename: 'key.json'
          });
          _context11.next = 12;
          return storage.bucket(process.env.gcp.bucket).file(objectName)["delete"]();
        case 12:
          _context11.next = 17;
          break;
        case 14:
          _context11.prev = 14;
          _context11.t0 = _context11["catch"](0);
          console.error("Error deleting image: ".concat(_context11.t0));
        case 17:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 14]]);
  }));
  return _deleteImageFromURL.apply(this, arguments);
}
var storeData = exports.storeData = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next, table, id) {
    var connection, _yield$connection$que, _yield$connection$que2, rows, _iterator, _step, imagePath;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _db["default"].getConnection();
        case 3:
          connection = _context6.sent;
          _context6.next = 6;
          return connection.query("SELECT * FROM ".concat(table, " WHERE ").concat(id, "=?"), [req.user.id]);
        case 6:
          _yield$connection$que = _context6.sent;
          _yield$connection$que2 = _slicedToArray(_yield$connection$que, 1);
          rows = _yield$connection$que2[0];
          //console.log(rows[0]);
          req.data = rows[0];
          // console.log(req.data);
          connection.release();
          next();
          _context6.next = 19;
          break;
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          // if a single file
          req.image && (0, _folderDelete.deleteFile)(req.image);
          // if multiple files
          if (req.images) {
            _iterator = _createForOfIteratorHelper(req.images);
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                imagePath = _step.value;
                (0, _folderDelete.deleteFile)(imagePath);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
          next(_context6.t0);
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 14]]);
  }));
  return function storeData(_x18, _x19, _x20, _x21, _x22) {
    return _ref6.apply(this, arguments);
  };
}();
var MultipleImageHandler = exports.MultipleImageHandler = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next, imageNumber) {
    var images, i, file, uniqueSuffix, webpBuffer, storage, bucket, fileData, publicUrl, _i;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          if (req.files) {
            _context7.next = 3;
            break;
          }
          return _context7.abrupt("return", next(new ErrorResponse("Must need ".concat(imageNumber, " images"), _httpStatus["default"].BAD_REQUEST)));
        case 3:
          images = [];
          i = 0;
        case 5:
          if (!(i < req.files.length)) {
            _context7.next = 29;
            break;
          }
          file = req.files[i]; //  console.log( file)
          // console.log(file)
          if (file) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("continue", 26);
        case 9:
          //  let image;
          uniqueSuffix = file.originalname.split(' ').join('-');
          file.originalname = "".concat(uniqueSuffix, "_").concat(Date.now(), ".pdf");
          // Convert the image buffer to WebP format
          webpBuffer = file.buffer;
          if (!(file.mimetype !== 'application/pdf')) {
            _context7.next = 19;
            break;
          }
          _context7.next = 15;
          return (0, _sharp["default"])(file.buffer).webp().toBuffer();
        case 15:
          // Replace req.file values with the WebP buffer
          file.buffer = webpBuffer;
          file.mimetype = 'image/webp';
          file.originalname = "".concat(uniqueSuffix, "_").concat(Date.now(), ".webp");
          // If you need to set an extension, you can do so here
          file.extension = 'webp';
        case 19:
          //  console.log('err')
          // const fileName = req.file.filename;
          storage = new _storage.Storage({
            projectId: process.env.PROJECTID,
            keyFilename: 'key.json'
          }); // console.log(env.BUCKET)
          bucket = storage.bucket('b2bnodeimages'); //  console.log(bucket);
          fileData = bucket.file(file.originalname);
          _context7.next = 24;
          return fileData.save(file.buffer, {
            contentType: file.mimetype,
            "public": true // Make the file publicly accessible
          });
        case 24:
          // Get the publicly accessible URL of the uploaded file
          publicUrl = "https://storage.googleapis.com/".concat(bucket.name, "/").concat(fileData.name);
          images.push(publicUrl);
        case 26:
          i++;
          _context7.next = 5;
          break;
        case 29:
          req.images = images;
          // req.urls = urls;
          next();
          _context7.next = 45;
          break;
        case 33:
          _context7.prev = 33;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          if (!req.images) {
            _context7.next = 44;
            break;
          }
          _i = 0;
        case 38:
          if (!(_i < req.images.length)) {
            _context7.next = 44;
            break;
          }
          _context7.next = 41;
          return deleteImageFromURL(req.images[_i]);
        case 41:
          _i++;
          _context7.next = 38;
          break;
        case 44:
          next(_context7.t0);
        case 45:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 33]]);
  }));
  return function MultipleImageHandler(_x23, _x24, _x25, _x26) {
    return _ref7.apply(this, arguments);
  };
}();
var handleSpecificImage = exports.handleSpecificImage = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
    var _req$files, personal_image, passport_copy;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          //if (req.files.length !== 2) next(new ErrorResponse('You must specify'))
          //console.log(req.files);
          _req$files = req.files, personal_image = _req$files.personal_image, passport_copy = _req$files.passport_copy;
          if (!(!personal_image || !passport_copy)) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", next(new ErrorResponse('You must specify one profile pic and one nid copy', _httpStatus["default"].FORBIDDEN)));
        case 4:
          if (!(personal_image.length !== 1 || passport_copy.length !== 1)) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", next(new ErrorResponse('You must specify one profile pic and one nid copy', _httpStatus["default"].FORBIDDEN)));
        case 6:
          //console.log(profilePic[0], nidCopy[0])

          // use in saveGCP file
          req.file = personal_image[0];
          _context8.next = 9;
          return saveOnGCP(req);
        case 9:
          req.personal_image = _context8.sent;
          req.file = passport_copy[0];
          _context8.next = 13;
          return saveOnGCP(req);
        case 13:
          req.passport_copy = _context8.sent;
          next();
          _context8.next = 20;
          break;
        case 17:
          _context8.prev = 17;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);
        case 20:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 17]]);
  }));
  return function handleSpecificImage(_x27, _x28, _x29) {
    return _ref8.apply(this, arguments);
  };
}();
var handlePassportVisa = exports.handlePassportVisa = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res, next) {
    var _req$files2, passportCopy, visaCopy;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          //if (req.files.length !== 2) next(new ErrorResponse('You must specify'))
          _req$files2 = req.files, passportCopy = _req$files2.passportCopy, visaCopy = _req$files2.visaCopy;
          if (visaCopy) {
            _context9.next = 4;
            break;
          }
          return _context9.abrupt("return", next(new ErrorResponse('You must specify one passport copy and one visa copy', _httpStatus["default"].FORBIDDEN)));
        case 4:
          if (!(visaCopy.length === 0)) {
            _context9.next = 6;
            break;
          }
          return _context9.abrupt("return", next(new ErrorResponse('You must upload visa copy', _httpStatus["default"].FORBIDDEN)));
        case 6:
          // use in saveGCP file
          req.file = passportCopy[0];
          _context9.next = 9;
          return saveOnGCP(req);
        case 9:
          req.passportCopy = _context9.sent;
          req.file = visaCopy[0];
          _context9.next = 13;
          return saveOnGCP(req);
        case 13:
          req.visaCopy = _context9.sent;
          next();
          _context9.next = 20;
          break;
        case 17:
          _context9.prev = 17;
          _context9.t0 = _context9["catch"](0);
          next(_context9.t0);
        case 20:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 17]]);
  }));
  return function handlePassportVisa(_x30, _x31, _x32) {
    return _ref9.apply(this, arguments);
  };
}();