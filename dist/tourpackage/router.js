"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controller = require("./controller");
var _imageUpload = require("./imageUpload.midleware");
var _imageHandler = require("./imageHandler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post('/add', _imageUpload.upload.single('coverimage'), _imageHandler.imageHandler, _controller.tourpackageController.addpackage);
router.put('/update/:PkID', _imageUpload.upload.single('coverimage'), _imageHandler.imageHandlerUpdate, _controller.tourpackageController.updatePackage);
router.post('/mainimage/:PkID', _imageUpload.upload.array('images', 10), _imageHandler.handleMultipleImage, _controller.tourpackageController.mainimage);
router.put('/mainimage/:imageId', _imageUpload.upload.single('images'), _imageHandler.imageHandlerUpdate, _controller.tourpackageController.updateMainImageController);
router.post('/placetovisit/:PkID', _imageUpload.upload.array('images', 10), _imageHandler.handleMultipleImage, _controller.tourpackageController.createPlaceVisit);
router.post('/albumimage/:PkID', _imageUpload.upload.array('images', 10), _imageHandler.handleMultipleImage, _controller.tourpackageController.createAlbumimage);
router.post('/createTourPlan/:PkID', _controller.tourpackageController.createTourPlan);
router.post('/createinclusion/:PkID', _controller.tourpackageController.createInclusion);
router.post('/createexclusion/:PkID', _controller.tourpackageController.createExclusion);
router.post('/createbookingpolicy/:PkID', _controller.tourpackageController.createBookingPolicy);
router.post('/createcancellationpolicy/:PkID', _controller.tourpackageController.createCancelationPolicy);
router.post('/createhighlight/:PkID', _controller.tourpackageController.createHighlights);
router.post('/createaddons/:PkID', _controller.tourpackageController.addAddOnsController);
router.get('/get-tour-package/:PkID', _controller.tourpackageController.getSingleTourPackages);
router.get('/get-all-tour', _controller.tourpackageController.getAllTourPackages);
router.put('/updatealbum/:AlbumId', _imageUpload.upload.single('images'), _imageHandler.imageHandler, _controller.tourpackageController.updateAlbumController);
var _default = exports["default"] = router;