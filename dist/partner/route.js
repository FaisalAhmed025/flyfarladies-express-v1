"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controller = require("./controller");
var _imageHandler = require("../tourpackage/imageHandler");
var _imageUpload = require("../tourpackage/imageUpload.midleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/all', _controller.partnerController.getAllpartner);
router["delete"]('/delete/:id', _controller.partnerController.deletePartner);
router.post('/add', _imageUpload.upload.fields([{
  name: 'firstImage',
  maxCount: 1
}, {
  name: 'secondImage',
  maxCount: 1
}, {
  name: 'thirdImage',
  maxCount: 1
}]), _imageHandler.handlePartnerImage, _controller.partnerController.Addpartner);
router.patch('/update/:id', _imageUpload.upload.fields([{
  name: 'firstImage',
  maxCount: 1
}, {
  name: 'secondImage',
  maxCount: 1
}, {
  name: 'thirdImage',
  maxCount: 1
}]), _imageHandler.updatePartnerImage, _controller.partnerController.updatePartner);
var _default = exports["default"] = router;