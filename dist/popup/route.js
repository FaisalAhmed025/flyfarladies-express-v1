"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _imageUpload = require("../tourpackage/imageUpload.midleware");
var _imageHandler = require("../tourpackage/imageHandler");
var _controller = require("./controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post('/add', _imageUpload.upload.single('file'), _imageHandler.imageHandler, _controller.popUPcontroller.addpopUp);
router.get('/all', _controller.popUPcontroller.getallPopUp);
router.post('/subscription', _controller.popUPcontroller.subscription);
router["delete"]('/delete/:id', _controller.popUPcontroller.deletePOp);
router.patch('/update/:id', _imageUpload.upload.single('file'), _imageHandler.imageHandlerUpdate, _controller.popUPcontroller.updatepopUp);
var _default = exports["default"] = router;