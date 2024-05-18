"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _imageUpload = require("../tourpackage/imageUpload.midleware");
var _imageHandler = require("../tourpackage/imageHandler");
var _controller = require("./controller");
var _service = require("./service");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post('/addblog', _imageUpload.upload.fields([{
  name: 'coverimage',
  maxCount: 1
}, {
  name: 'secondimage',
  maxCount: 1
}]), _imageHandler.handleblogImage, _controller.blogcontroller.addBlog);
router.get('/all', _controller.blogcontroller.getallblogs);
router.get('/single/:id', _controller.blogcontroller.geBlog);
router["delete"]('/:id', _controller.blogcontroller.deleteBlog);
router.patch('/update/:id', _imageUpload.upload.fields([{
  name: 'coverimage',
  maxCount: 1
}, {
  name: 'secondimage',
  maxCount: 1
}]), _imageHandler.updatehandleblogImage, _controller.blogcontroller.updateBlogcontroller);
router.patch('/blogid/:id/urlid/:urlid', _imageUpload.upload.single('image'), _imageHandler.imageHandlerUpdate, _controller.blogcontroller.updateimages);
var _default = exports["default"] = router;