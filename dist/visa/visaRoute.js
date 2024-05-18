"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visaRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _visaController = require("./visaController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/get-visa-info", _visaController.visaController.getVisaController);
router.get("/get-country-name", _visaController.visaController.getCountryController);
router.get("/get-visa-type", _visaController.visaController.getCountryTypeController);
var visaRoutes = exports.visaRoutes = router;