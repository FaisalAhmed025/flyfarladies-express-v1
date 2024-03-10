
import { tourpackageController } from "../tourpackage/controller/controller";
import express from 'express';
const router = express.Router();

// import { upload } from "../tourpackage/middleware/imageUpload.midleware";
// import { MultipleImageHandler, handleMultipleImage, imageHandler, imageHandlerUpdate } from "../tourpackage/helper/imageHandler";


// //tourpackage Route
// router.post('/add', upload.single('coverimage'), imageHandler, tourpackageController.addpackage )
// router.put('/update/:PkID', upload.single('coverimage'), imageHandlerUpdate, tourpackageController.updatePackage)
// router.post('/add', upload.single('coverimage'), imageHandler, tourpackageController.addpackage)

// router.post('/mainimage/:PkID', upload.array('images', 10),  handleMultipleImage, tourpackageController.mainimage)
// router.put('/mainimage/:imageId', upload.single('images'),  imageHandlerUpdate, tourpackageController.updateMainImageController)

// router.post('/placetovisit/:PkID', upload.array('images', 10),  handleMultipleImage, tourpackageController.createPlaceVisit)

// router.post('/albumimage/:PkID', upload.array('images', 10),  handleMultipleImage, tourpackageController.createAlbumimage)

// router.post('/createTourPlan/:PkID', tourpackageController.createTourPlan)
// router.post('/createinclusion/:PkID', tourpackageController.createInclusion)
// router.post('/createexclusion/:PkID', tourpackageController.createExclusion)
// router.post('/createbookingpolicy/:PkID', tourpackageController.createBookingPolicy)
// router.post('/createcancellationpolicy/:PkID', tourpackageController.createCancelationPolicy)
// router.post('/createhighlight/:PkID', tourpackageController.createHighlights)
// router.post('/createaddons/:PkID', tourpackageController.addAddOnsController)


router.get('/get-tour-package/:PkID', tourpackageController.getSingleTourPackages)

// router.get('/get-all-tour', tourpackageController.getAllTourPackages)
// router.put(
//   '/updatealbum/:AlbumId',
//   upload.single('images'),imageHandler,
//   tourpackageController.updateAlbumController
// );

export default router;