"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bookingcontroller = require("./bookingcontroller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/book/packid/:PkID/userid/:id", _bookingcontroller.bookingController.Book$Hold);
router.get("/book/allbooking", _bookingcontroller.bookingController.getAllBookings);
router.get("/book/single/:bookingid", _bookingcontroller.bookingController.getSingleBookings);
var _default = exports["default"] = router;