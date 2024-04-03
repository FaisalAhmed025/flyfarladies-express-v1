
import express from 'express';
import { tourpackageController } from './controller';
import { upload } from './imageUpload.midleware';
import { handleMultipleImage, imageHandler, imageHandlerUpdate } from './imageHandler';
const router = express.Router();

router.post('/add', upload.single('coverimage'), imageHandler, tourpackageController.addpackage )
router.put('/update/:PKID', upload.single('coverimage'), imageHandlerUpdate, tourpackageController.updatePackage)

router.post('/mainimage/:PKID', upload.array('images', 10),  handleMultipleImage, tourpackageController.mainimage)

router.put('/mainimage/:imageId', upload.single('images'),  imageHandlerUpdate, tourpackageController.updateMainImageController)

router.post('/placetovisit/:PKID', upload.array('images', 10),  handleMultipleImage, tourpackageController.createPlaceVisit)

router.post('/albumimage/:PKID', upload.array('images', 10),  handleMultipleImage, tourpackageController.createAlbumimage)

router.post('/createTourPlan/:PKID', tourpackageController.createTourPlan)
router.get('/gettourplan/:id', tourpackageController.gettouritenrary)
router.delete('/delete/:id', tourpackageController.deleteTourItenerary)

router.post('/createinclusion/:PKID', tourpackageController.createInclusion)
router.delete('/delete/:id', tourpackageController.deletetourinclusion)
router.post('/createexclusion/:PKID', tourpackageController.createExclusion)
router.post('/createbookingpolicy/:PKID', tourpackageController.createBookingPolicy)
router.delete('/deletepolicy/:id', tourpackageController.deletebookingpolicy)
router.post('/createcancellationpolicy/:PKID', tourpackageController.createCancelationPolicy)
router.post('/createhighlight/:PKID', tourpackageController.createHighlights)
router.post('/createaddons/:PKID', tourpackageController.addAddOnsController)
router.get('/get-tour-package/:PKID', tourpackageController.getSingleTourPackages)
router.get('/get-all-tour', tourpackageController.getAllTourPackages)

router.put(
  '/updatealbum/:AlbumId',
  upload.single('images'),imageHandler,
  tourpackageController.updateAlbumController
);

export default router;