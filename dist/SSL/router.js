"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controller = require("./controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/init/:id', _controller.sslpaymentController.initpayment);
router.post('/success/:tran_id', _controller.sslpaymentController.success);
router.get('/validate/:val_id', _controller.sslpaymentController.validate);
router.post('/refund-request', _controller.sslpaymentController.RefundRequest);
router.get('/refund-query/:refund_ref_id', _controller.sslpaymentController.RefundQuery);
router.get('/transaction-status/:tran_id', _controller.sslpaymentController.TransactionStatus);
var _default = exports["default"] = router;