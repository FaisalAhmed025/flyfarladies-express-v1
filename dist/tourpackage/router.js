"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controller = require("./controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/get-tour-package/:PkID', _controller.tourpackageController.getSingleTourPackages);
router.get('/get-all-tour', _controller.tourpackageController.getAllTourPackages);
var _default = exports["default"] = router;