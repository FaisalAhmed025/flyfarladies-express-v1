"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controller = require("./controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post('/add', _controller.wishlistcontroller.addWishlist);
router.get('/userwishlist/:id', _controller.wishlistcontroller.userWishlist);
router["delete"]('/remove/:wishid', _controller.wishlistcontroller.removeWishlist);
var _default = exports["default"] = router;