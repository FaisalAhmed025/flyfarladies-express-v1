"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controller = require("./controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post('/wallet/userid/:id/bookingid/:bookingid', _controller.paymentController.paywithwallet);
router.post('/wallet/bookingamount', _controller.paymentController.paybookingamount);
router.post('/wallet/secondinstallment', _controller.paymentController.paySecondInstallment);
router.post('/wallet/thirdinstallment', _controller.paymentController.paythiredInstallment);
var _default = exports["default"] = router;