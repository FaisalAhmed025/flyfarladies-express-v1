
import express from 'express'
import { upload } from '../tourpackage/imageUpload.midleware'
import { handleblogImage, imageHandler, imageHandlerUpdate, optionalImage, updatehandleblogImage } from '../tourpackage/imageHandler'
import {popUPcontroller } from './controller'


const router  = express.Router()
router.post('/add', upload.single('file'),  imageHandler, popUPcontroller.addpopUp)
router.get('/all',popUPcontroller.getallPopUp)
router.post('/subscription',popUPcontroller.subscription)
router.delete('/delete/:id',popUPcontroller.deletePOp)
router.patch('/update/:id', upload.single('file'), imageHandlerUpdate, popUPcontroller.updatepopUp)

export default router;