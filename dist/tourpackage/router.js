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
router.post('/add', _imageUpload.upload.single('coverImage'), _imageHandler.imageHandler, _controller.tourpackageController.addpackage);
router.post('/addinstallment/:PKID', _controller.tourpackageController.Addinstallemnt);
router.patch('/update/:PKID', _imageUpload.upload.single('coverImage'), _imageHandler.imageHandlerUpdate, _controller.tourpackageController.updatePackage);
router.get('/get-tour-package/:PKID', _controller.tourpackageController.getSingleTourPackages);
router.get('/get-bookingslot/:id', _controller.tourpackageController.getbookingslot);
router.post('/get-installement/:bookingslotid', _controller.tourpackageController.getInstallment);
router.get('/get-all-tour', _controller.tourpackageController.getAllTourPackages);
router["delete"]('/delete/:PKID', _controller.tourpackageController.deletePAckage);

//mainimage
router.post('/mainimage/:PKID', _imageUpload.upload.array('images', 10), _imageHandler.handleMultipleImage, _controller.tourpackageController.mainimage);
router.put('/mainimage/:imageId', _imageUpload.upload.single('images'), _imageHandler.imageHandlerUpdate, _controller.tourpackageController.updateMainImageController);
router["delete"]('/deletemainimage/:imageId', _controller.tourpackageController.deleteMainimage);

//viistedimage
router.post('/placetovisit/:PKID', _imageUpload.upload.array('images', 10), _imageHandler.handleMultipleImage, _controller.tourpackageController.createPlaceVisit);
router.patch('/updatevisited/:id', _imageUpload.upload.single('image'), _imageHandler.imageHandler, _controller.tourpackageController.updateviistedController);

//albumimage
router.post('/albumimage/:PKID', _imageUpload.upload.fields([{
  name: 'albumimageurl',
  maxCount: 10
}, {
  name: 'albumcoverimageurl',
  maxCount: 10
}]), _imageHandler.handleAlbumImage, _controller.tourpackageController.createAlbumimage);
router.patch('/updatealbum/:AlbumId', _imageUpload.upload.single('image'), _imageHandler.imageHandler, _controller.tourpackageController.updateAlbumController);
router.patch('/albumimage/:AlbumId/inner/:id', _imageUpload.upload.single('image'), _imageHandler.imageHandlerUpdate, _controller.tourpackageController.updateinneralbumiamge);

//Tourplan
router.post('/createTourPlan/:PKID', _controller.tourpackageController.createTourPlan);
router.get('/gettourplan/:id', _controller.tourpackageController.gettouritenrary);
router["delete"]('/deletetourplan/:id', _controller.tourpackageController.deleteTourItenerary);

//creatinclsuion
router.post('/createinclusion/:PKID', _controller.tourpackageController.createInclusion);
router["delete"]('/deleteinclusion/:id', _controller.tourpackageController.deletetourinclusion);

//exlclusions
router.post('/createexclusion/:PKID', _controller.tourpackageController.createExclusion);
router["delete"]('/deleteexclusion/:id', _controller.tourpackageController.deleteExclusion);

//createbookingpolicy
router.post('/createbookingpolicy/:PKID', _controller.tourpackageController.createBookingPolicy);
router["delete"]('/deletebookingpolicy/:id', _controller.tourpackageController.deletebookingpolicy);

//cancellationpolicy
router.post('/createcancellationpolicy/:PKID', _controller.tourpackageController.createCancelationPolicy);
router["delete"]('/cancellationpolicy/:id', _controller.tourpackageController.cancellationpolicy);

//highlight 
router.post('/createhighlight/:PKID', _controller.tourpackageController.createHighlights);
router["delete"]('/deletetHighlight/:id', _controller.tourpackageController.deletetHighlight);

//Addons
router.post('/createaddons/:PKID', _controller.tourpackageController.addAddOnsController);
router.get('/getalladdons', _controller.tourpackageController.getalladdons);
router["delete"]('/deleteaddons/:id', _controller.tourpackageController.deleteaddons);

//FAQ
router.post('/addfaqs', _controller.tourpackageController.addFAQs);
router.get('/getallfaqs', _controller.tourpackageController.getAllFAQS);
router["delete"]('/deletefaqs/:id', _controller.tourpackageController.deleteFAQ);

//bookingSlot
router.post('/createbookingslot/:PKID', _controller.tourpackageController.createbookingSlot);
router["delete"]('/deleteslot/:id', _controller.tourpackageController.deletebookingslot);
var _default = exports["default"] = router;