
import express from 'express';
import { tourpackageController } from './controller';
import { upload } from './imageUpload.midleware';
import { handleAlbumImage, handleMultipleImage, imageHandler, imageHandlerUpdate } from './imageHandler';
const router = express.Router();

router.post('/add', upload.single('coverimage'), imageHandler, tourpackageController.addpackage )
router.patch('/update/:PKID', upload.single('coverImage'), imageHandlerUpdate, tourpackageController.updatePackage)

router.delete('/delete/:PKID', tourpackageController.deletePAckage)

router.post('/mainimage/:PKID', upload.array('images', 10),  handleMultipleImage, tourpackageController.mainimage)


router.put('/mainimage/:imageId', upload.single('images'),  imageHandlerUpdate, tourpackageController.updateMainImageController)
router.delete('/deletemainimage/:imageId', tourpackageController.deleteMainimage)

router.post('/placetovisit/:PKID', upload.array('images', 10),  handleMultipleImage, tourpackageController.createPlaceVisit)

router.post('/albumimage/:PKID', upload.fields([{name:'albumimageurl', maxCount:10}, {name:'albumcoverimageurl', maxCount:10}]),  handleAlbumImage, tourpackageController.createAlbumimage)

router.post('/createTourPlan/:PKID', tourpackageController.createTourPlan)
router.get('/gettourplan/:id', tourpackageController.gettouritenrary)
router.delete('/deletetourplan/:id', tourpackageController.deleteTourItenerary)

router.post('/createinclusion/:PKID', tourpackageController.createInclusion)
router.delete('/deleteinclusion/:id', tourpackageController.deletetourinclusion)
router.post('/createexclusion/:PKID', tourpackageController.createExclusion)
router.delete('/deleteexclusion/:id', tourpackageController.deleteExclusion)
router.post('/createbookingpolicy/:PKID', tourpackageController.createBookingPolicy)
router.delete('/deletebookingpolicy/:id', tourpackageController.deletebookingpolicy)
router.post('/createcancellationpolicy/:PKID', tourpackageController.createCancelationPolicy)
router.post('/createhighlight/:PKID', tourpackageController.createHighlights)
router.delete('/deletetHighlight/:id', tourpackageController.deletetHighlight)
router.post('/createaddons/:PKID', tourpackageController.addAddOnsController)
router.post('/addfaqs/:PKID', tourpackageController.addFAQs)
router.get('/get-tour-package/:PKID', tourpackageController.getSingleTourPackages)
router.get('/get-all-tour', tourpackageController.getAllTourPackages)

router.delete('/cancellationpolicy/:id', tourpackageController.cancellationpolicy)
cancellationpolicy

router.patch(
  '/updatevisited/:id',
  upload.single('image'),imageHandler,
  tourpackageController.updateviistedController
);

router.patch(
  '/updatealbum/:AlbumId',
  upload.single('image'),imageHandler,
  tourpackageController.updateAlbumController
);


router.patch(
  '/albumimage/:AlbumId/inner/:id',
  upload.single('image'),imageHandlerUpdate,
  tourpackageController.updateinneralbumiamge
);


export default router;