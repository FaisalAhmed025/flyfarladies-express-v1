
import express from 'express'
import { upload } from '../tourpackage/imageUpload.midleware'
import { handleblogImage, imageHandler, imageHandlerUpdate, optionalImage, updatehandleblogImage } from '../tourpackage/imageHandler'
import {popUPcontroller } from './controller'
const router  = express.Router()

router.post('/add', upload.single('image'),  imageHandler, popUPcontroller.addpopUp)
// router.get('/all', blogcontroller.getallblogs)
// router.delete('/:id', blogcontroller.deleteBlog)
// router.patch('/update/:id',upload.fields([{name:'coverimage', maxCount:1}, {name:'secondimage', maxCount:1}]),  updatehandleblogImage,  blogcontroller.updateBlogcontroller)
// router.patch('/blogid/:id/urlid/:urlid',  upload.single('image'), imageHandlerUpdate,  blogcontroller.updateimages)

export default router;