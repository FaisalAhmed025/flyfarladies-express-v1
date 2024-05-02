
import express from 'express'
import { partnerController } from './controller';
import { handlePartnerImage, updatePartnerImage } from '../tourpackage/imageHandler';
import { upload } from '../tourpackage/imageUpload.midleware';
const router  = express.Router()

router.get('/all', partnerController.getAllpartner)
router.delete('/delete/:id', partnerController.deletePartner)
router.post('/add',  upload.fields([{name:'firstImage', maxCount:1}, {name:'secondImage', maxCount:1}, {name:'thirdImage', maxCount:1}]),  handlePartnerImage, partnerController.Addpartner)

router.patch('/update/:id',  upload.fields([{name:'firstImage', maxCount:1}, {name:'secondImage', maxCount:1}, {name:'thirdImage', maxCount:1}]),  updatePartnerImage, partnerController.updatePartner)
export default router;