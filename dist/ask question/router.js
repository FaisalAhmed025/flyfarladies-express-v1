"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controller = require("./controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post('/ask', _controller.askQuestionController.AskQuestion);
router.get('/all', _controller.askQuestionController.allquery);
var _default = exports["default"] = router;