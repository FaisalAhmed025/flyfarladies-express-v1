
import express from 'express';
import { tourpackageController } from './controller';
import { upload } from './imageUpload.midleware';
import { handleAlbumImage, handleMultipleImage, imageHandler, imageHandlerUpdate } from './imageHandler';
const router = express.Router();
router.post('/add', upload.single('coverImage'), imageHandler, tourpackageController.addpackage )
router.post('/addinstallment/:PKID', tourpackageController.Addinstallemnt)
router.patch('/update/:PKID', upload.single('coverImage'), imageHandlerUpdate, tourpackageController.updatePackage)
router.get('/get-tour-package/:PKID', tourpackageController.getSingleTourPackages)
router.get('/get-bookingslot/:id', tourpackageController.getbookingslot)
router.get('/get-all-tour', tourpackageController.getAllTourPackages)
router.delete('/delete/:PKID', tourpackageController.deletePAckage)

//mainimage
router.post('/mainimage/:PKID', upload.array('images', 10),  handleMultipleImage, tourpackageController.mainimage)
router.put('/mainimage/:imageId', upload.single('images'),  imageHandlerUpdate, tourpackageController.updateMainImageController)
router.delete('/deletemainimage/:imageId', tourpackageController.deleteMainimage)


//viistedimage
router.post('/placetovisit/:PKID', upload.array('images', 10),  handleMultipleImage, tourpackageController.createPlaceVisit)
router.patch(
  '/updatevisited/:id',
  upload.single('image'),imageHandler,
  tourpackageController.updateviistedController
);

//albumimage
router.post('/albumimage/:PKID', upload.fields([{name:'albumimageurl', maxCount:10}, {name:'albumcoverimageurl', maxCount:10}]),  handleAlbumImage, tourpackageController.createAlbumimage)
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


//Tourplan
router.post('/createTourPlan/:PKID', tourpackageController.createTourPlan)
router.get('/gettourplan/:id', tourpackageController.gettouritenrary)
router.delete('/deletetourplan/:id', tourpackageController.deleteTourItenerary)

//creatinclsuion
router.post('/createinclusion/:PKID', tourpackageController.createInclusion)
router.delete('/deleteinclusion/:id', tourpackageController.deletetourinclusion)

//exlclusions
router.post('/createexclusion/:PKID', tourpackageController.createExclusion)
router.delete('/deleteexclusion/:id', tourpackageController.deleteExclusion)

//createbookingpolicy
router.post('/createbookingpolicy/:PKID', tourpackageController.createBookingPolicy)
router.delete('/deletebookingpolicy/:id', tourpackageController.deletebookingpolicy)

//cancellationpolicy
router.post('/createcancellationpolicy/:PKID', tourpackageController.createCancelationPolicy)
router.delete('/cancellationpolicy/:id', tourpackageController.cancellationpolicy)

//highlight 
router.post('/createhighlight/:PKID', tourpackageController.createHighlights)
router.delete('/deletetHighlight/:id', tourpackageController.deletetHighlight)

//Addons
router.post('/createaddons/:PKID', tourpackageController.addAddOnsController)
router.get('/getalladdons', tourpackageController.getalladdons)
router.delete('/deleteaddons/:id', tourpackageController.deleteaddons)

//FAQ
router.post('/addfaqs', tourpackageController.addFAQs)
router.get('/getallfaqs', tourpackageController.getAllFAQS)
router.delete('/deletefaqs/:id', tourpackageController.deleteFAQ)

//bookingSlot
router.post('/createbookingslot/:PKID', tourpackageController.createbookingSlot)
router.delete('/deleteslot/:id', tourpackageController.deletebookingslot)

export default router;