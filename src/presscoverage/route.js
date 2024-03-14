import express from 'express'
import { pressCoverageControllerr } from './controller'
import { upload } from '../tourpackage/service';
import { imageHandler, imageHandlerUpdate } from '../tourpackage/imageHandler';
const router = express.Router();

router.post('/add-press-coverage', upload.single('image'), imageHandler, pressCoverageControllerr.addPressCoverage);
router.get('/allpress', pressCoverageControllerr.getAllpresscoverage)
router.put('/update/:id', upload.single('image'), imageHandlerUpdate, pressCoverageControllerr.updatepressCoverage);
export default router;