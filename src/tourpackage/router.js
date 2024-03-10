
import express from 'express';
import { tourpackageController } from './controller';
const router = express.Router();

router.get('/get-tour-package/:PkID', tourpackageController.getSingleTourPackages)
router.get('/get-all-tour', tourpackageController.getAllTourPackages)

export default router;