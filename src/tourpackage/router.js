
import express from 'express';
import { tourpackageController } from './controller';
import { upload } from './imageUpload.midleware';
import { imageHandler } from './imageHandler';
const router = express.Router();


router.post('/add', upload.single('coverimage'), imageHandler, tourpackageController.addpackage )
router.get('/get-tour-package/:PkID', tourpackageController.getSingleTourPackages)
router.get('/get-all-tour', tourpackageController.getAllTourPackages)

export default router;