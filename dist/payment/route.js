"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controller = require("./controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post('/wallet/fullpayment', _controller.paymentController.paywithwallet);
router.post('/wallet/bookingamount', _controller.paymentController.paybookingamount);
router.post('/wallet/secondinstallment', _controller.paymentController.paySecondInstallment);
router.post('/wallet/thirdinstallment', _controller.paymentController.paythiredInstallment);
router.post('/wallet/first/second', _controller.paymentController.payfirstAndsecondInstallment);
router.post('/wallet/second/third', _controller.paymentController.paySecondAndthirdInstallment);
router.post('/wallet/second/third', _controller.paymentController.paySecondAndthirdInstallment);
router.post('/ssl/fullamount/payment', _controller.paymentController.initpaywithsslfullamount);
router.post('/ssl/success/fullpayment/:tran_id/:bookingid', _controller.paymentController.succeesssslfullamount);
router.post('/ssl/bookingamount', _controller.paymentController.initpaywithsslbookingAmount);
router.post('/ssl/success/bookingamount/:tran_id/:bookingid', _controller.paymentController.succeesssslbookingAmount);
router.post('/ssl/1stinstallment', _controller.paymentController.initwithssl1stinstallemnt);
router.post('/ssl/success/1stinstallment/:tran_id/:bookingid', _controller.paymentController.succeessssl1stinstallemnt);
router.post('/ssl/2ndinstallment', _controller.paymentController.initwithssl2ndinstallemnt);
router.post('/ssl/success/2ndinstallment/:tran_id/:bookingid', _controller.paymentController.succeessssl2ndinstallemnt);
router.post('/ssl/1nstand2ndinstallment', _controller.paymentController.initwithssl1stAnd2ndinstallemnt);
router.post('/ssl/success/1nstand2ndinstallment/:tran_id/:bookingid', _controller.paymentController.succeessssl1stAnd2ndinstallemnt);
router.post('/ssl/2ndAnd3rdinstallment', _controller.paymentController.initwithssl2ndANd3rdinstallemnt);
router.post('/ssl/success/2ndAnd3rdinstallment/:tran_id/:bookingid', _controller.paymentController.succeessssl2ndANd3rdInstallemnt);
var _default = exports["default"] = router;