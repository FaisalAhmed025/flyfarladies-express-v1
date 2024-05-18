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

// Define routes using the router object

router.post('/register', _controller.userController.RegisterUser);
router.post('/login', _controller.userController.loginuser);
router.post('/loginwithgoogle', _controller.userController.loginwithGoogle);
router.post('/forgetpasss/request', _controller.userController.forgetpasswordResetRequest);
router.post('/resetpass', _controller.userController.resetPassword);
router.get('/mydashboard/:id', _controller.userController.userdashbaord);
router.get('/alluser', _controller.userController.alluserdata);
router.put('/update/:id', _imageUpload.upload.single('images'), _imageHandler.imageHandlerUpdate, _controller.userController.updateUser);
router.post('/traveller/add/:id', _controller.userController.addtravlercontroller);
router.put('/traveller/update/:partnerId', _imageUpload.upload.single('images'), _imageHandler.imageHandlerUpdate, _controller.userController.updateTravlercontroller);
router["delete"]('/mytraveller/:partnerId', _controller.userController.deleteTraveller);
router["delete"]('/deleteuser/:id', _controller.userController.deleteUser);
router.get('/alltraveler/test/:user_id', _controller.userController.myTravelerList);
var _default = exports["default"] = router;