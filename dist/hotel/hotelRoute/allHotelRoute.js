"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _hotelBookingController = require("../hotelBooking/hotelBookingController");
var _service = _interopRequireDefault(require("../../user/service"));
var _preeBookRoute = require("./preeBookRoute");
var _imageUpload = require("../../tourpackage/imageUpload.midleware");
var _imageHandler = require("../../tourpackage/imageHandler");
var _hotelPaymentController = require("../hotelPayment/hotelPaymentController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/price-check", _preeBookRoute.hotelPreBookRoute);
router.post("/hotel-booking-create", _service["default"], _hotelBookingController.hotelBookingDataController.createHotelBooking);
router.get("/get-all-hotel-booking", _service["default"], _hotelBookingController.hotelBookingDataController.getAllBookingInfo);
router.get("/get-single-hotel-booking/:id", _service["default"], _hotelBookingController.hotelBookingDataController.getSingleBooking);
router.put("/upload-image/:id", _imageUpload.upload.single("images"), _imageHandler.imageHandlerUpdate, _service["default"], _hotelBookingController.hotelBookingDataController.uploadNidImage);
router.put("/cancel-hotel-booking/:id", _service["default"], _hotelBookingController.hotelBookingDataController.uploadNidImage);
router.post("/hotel-payment/:id", _service["default"], _hotelPaymentController.hotelPaymentController.hotelPayment);
var hotelRoute = exports.hotelRoute = router;