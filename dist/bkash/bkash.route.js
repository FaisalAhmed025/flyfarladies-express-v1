"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bkash = require("./bkash.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/gettoken', _bkash.bkashController.generateToken);
router.post('/createpayment/:id', _bkash.bkashController.createPayment);
router.post('/refund', _bkash.bkashController.refundAmount);
router.get('/bkash-query', _bkash.bkashController.QueryPayment);
router.get('/bkash-search', _bkash.bkashController.bkasSearch);
router.get('/callback/:id', _bkash.bkashController.callback);
var _default = exports["default"] = router;