"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controller = require("./controller");
var _service = require("../tourpackage/service");
var _imageHandler = require("../tourpackage/imageHandler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post('/add-press-coverage', _service.upload.single('image'), _imageHandler.imageHandler, _controller.pressCoverageControllerr.addPressCoverage);
router.get('/allpress', _controller.pressCoverageControllerr.getAllpresscoverage);
router["delete"]('/delete/:id', _controller.pressCoverageControllerr.deletePress);
router.patch('/update/:id', _service.upload.single('image'), _imageHandler.imageHandlerUpdate, _controller.pressCoverageControllerr.updatepressCoverage);
var _default = exports["default"] = router;