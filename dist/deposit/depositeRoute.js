"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _imageHandler = require("../tourpackage/imageHandler");
var _imageUpload = require("../tourpackage/imageUpload.midleware");
var _depositeController = require("./depositeController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post('/create-bank-deposit/:id', _imageUpload.upload.single('attachment'), _imageHandler.imageHandler, _depositeController.depositeControlller.createBankDeposit);
router.post('/create-check-deposit/:id', _imageUpload.upload.single('attachment'), _imageHandler.imageHandler, _depositeController.depositeControlller.CheckDepositController);
router.post('/create-mobile-deposit/:id', _imageUpload.upload.single('attachment'), _imageHandler.imageHandler, _depositeController.depositeControlller.createMobilebankDeposit);
router.post('/create-cash-deposit/:id', _imageUpload.upload.single('attachment'), _imageHandler.imageHandler, _depositeController.depositeControlller.createCashDeposit);
router.patch('/approved/cash/:deposit_id', _depositeController.depositeControlller.approvedCashDEposit);
router.patch('/reject/cash/:deposit_id', _depositeController.depositeControlller.rejectCashDeposit);
router.put('/approved/:deposit_id', _depositeController.depositeControlller.approvedBankDEposit);
router.put('/rejectdeposit/:deposit_id', _depositeController.depositeControlller.rejectBankDeposit);
router.put('/rejectcheque/:deposit_id', _depositeController.depositeControlller.rejectChequeDeposit);
router.put('/approved/cash/:deposit_id', _depositeController.depositeControlller.approvedCashDEposit);
router.put('/approved/cheque/:deposit_id', _depositeController.depositeControlller.approvedCheckDeposit);
router.get('/depositlist/:requested_by', _depositeController.depositeControlller.getuserdeposit);
router.get('/alldeposit', _depositeController.depositeControlller.getAlldeposit);
var _default = exports["default"] = router;