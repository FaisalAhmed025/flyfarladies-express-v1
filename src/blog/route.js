
import express from 'express'
import { upload } from '../tourpackage/imageUpload.midleware'
import { handleblogImage, imageHandler, imageHandlerUpdate, optionalImage, updatehandleblogImage } from '../tourpackage/imageHandler'
import { blogcontroller } from './controller'
import { blogService } from './service'
const router  = express.Router()

router.post('/addblog',  upload.fields([{name:'coverimage', maxCount:1}, {name:'secondimage', maxCount:1}]),  handleblogImage, blogcontroller.addBlog)
router.get('/all', blogcontroller.getallblogs)
router.get('/single/:id', blogcontroller.geBlog)
router.delete('/:id', blogcontroller.deleteBlog)
router.patch('/update/:id',upload.fields([{name:'coverimage', maxCount:1}, {name:'secondimage', maxCount:1}]),  updatehandleblogImage,  blogcontroller.updateBlogcontroller)
router.patch('/blogid/:id/urlid/:urlid',  upload.single('image'), imageHandlerUpdate,  blogcontroller.updateimages)


export default router;